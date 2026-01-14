'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
    useAddComplainMutation,
    useDeleteComplainMutation,
    useGetAllComplainQuery,
    useUpdateComplainMutation,
    useUpdateComplainStatusMutation,
} from '@/redux/features/complain/complainApi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Loading from '@/components/pages/shared/Loading';
import { useGetAllCustomerQuery } from '@/redux/features/customers/cutomersApi';
import { debounce } from '@/utills/debounce';
import { TCustomer } from '@/types/customer.types';
import { useGetUser, useHasPermission } from '@/utills/permission';

type Complaint = {
    id: number;
    customer_id: number;
    agent_id: number;
    subject: string;
    description: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
    isDeleted: boolean;
    created_at: string;
    updated_at: string;
    customer: {
        id: number;
        name: string;
        phone: string;
        email: string;
    };
};

// Zod schema
const updateSchema = z.object({
    agent_id: z.number(),
    customer_id: z.number(),
    subject: z.string().min(1, 'Subject is required'),
    description: z.string().min(1, 'Description is required'),
});

const Page = () => {
    const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [deleteComplain] = useDeleteComplainMutation();
    const [updateComplain] = useUpdateComplainMutation();
    const [addComplain] = useAddComplainMutation();
    const [updateStatus, { isLoading: loadingStatus }] = useUpdateComplainStatusMutation();
    const { data: complainData, isLoading: loadingComplaints } = useGetAllComplainQuery(undefined);
    const hasCreatePermission = useHasPermission("COMPLAIN CREATE");
    const hasUpdatePermission = useHasPermission("COMPLAIN UPDATE");
    const hasDeletePermission = useHasPermission("COMPLAIN DELETE");
    const hasStatusPermission = useHasPermission("COMPLAIN STATUS UPDATE");
    const [searchInputs, setSearchInputs] = useState({ customer: "", });
    const complaints = complainData?.data;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control,
    } = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            subject: '',
            description: '',
        },
    });

    // Customer API
    const [customerFilters, setCustomerFilters] = useState({
        search: "",
        limit: 5,
        page: 1,
    });

    const { data: customerData, isLoading: loadingCustomers } =
        useGetAllCustomerQuery(customerFilters);

    const customerDebounce = debounce((v: string) => {
        setCustomerFilters((prev) => ({ ...prev, search: v }));
    }, 2000);

    const customers = customerData?.data || [];

    const handleUpdate = (complaint: Complaint) => {
        setSelectedComplaint(complaint);
        setValue('subject', complaint?.subject);
        setValue('description', complaint?.description);
        setValue('customer_id', complaint?.customer_id);
        setValue('agent_id', complaint?.agent_id);
        setIsFormOpen(true);
    };
    const user = useGetUser();
    const handleAdd = () => {
        if (user?.id !== undefined) {
            setValue('agent_id', user.id);
        }
        setIsFormOpen(true);
        setIsAdd(true);
    }
    const handleDelete = async (id: number) => {
        const toastId = toast.loading('Deleting complaint...');
        try {
            await deleteComplain(id).unwrap();
            toast.success('Complaint deleted successfully.', { id: toastId });
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete complaint.', { id: toastId });
        }
    };

    const onSubmit = async (data: z.infer<typeof updateSchema>) => {

        const isUpdate = !isAdd;
        const toastId = toast.loading(`${isUpdate ? 'Updating' : 'Submitting'} complaint...`);

        try {
            if (isUpdate) {
                await updateComplain({
                    id: selectedComplaint?.id, body: {
                        subject: data.subject,
                        description: data.description,
                    },
                }).unwrap();
                toast.success('Complaint updated successfully.', { id: toastId });
            } else {
                await addComplain(data).unwrap();
                toast.success('Complaint submitted successfully.', { id: toastId });
            }
            setIsFormOpen(false);
            setSelectedComplaint(null);
            reset();
            setIsAdd(false);
        } catch (error) {
            console.error(error);
            toast.error(
                `Failed to ${isUpdate ? 'update' : 'submit'} complaint.`,
                { id: toastId }
            );
        }
    };

    const handleStatus = async (complaintId: number, newStatus: Complaint["status"]) => {
        const toastId = toast.loading('Updating complaint...');
        try {
            await updateStatus({
                id: complaintId,
                body: { status: newStatus },
            }).unwrap();

            toast.success('Status updated successfully.', { id: toastId });
        } catch (error) {
            console.error(error);
            toast.error('Failed to update status.', { id: toastId });
        }
    };

    if (loadingComplaints)
        return <Loading />;

    return (
        <div className="p-6">
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold mb-4">Complaints</h1>
                {
                    hasCreatePermission ? <Button onClick={handleAdd}>
                        <Plus /> Complain
                    </Button> : <></>
                }
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Customer Name</TableHead>
                        <TableHead className="text-left">Phone</TableHead>
                        <TableHead className="text-left">Email</TableHead>
                        <TableHead className="text-left">Complain Date</TableHead>
                        <TableHead className="text-left">Status</TableHead>
                        <TableHead className="text-left">Subject</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {complaints.map((complaint: Complaint) => (
                        <TableRow key={complaint?.id}>
                            <TableCell className="text-left">{complaint?.customer?.name}</TableCell>
                            <TableCell className="text-left">{complaint?.customer?.phone}</TableCell>
                            <TableCell className="text-left">{complaint?.customer?.email}</TableCell>
                            <TableCell className="text-left">
                                {new Date(complaint?.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-left">
                                {
                                    loadingStatus ? <p>loading status....</p> :
                                        <>
                                            {hasStatusPermission ? (
                                                <Select
                                                    name='status'
                                                    value={complaint?.status}
                                                    onValueChange={(value) => {
                                                        handleStatus(complaint?.id, value as Complaint["status"])
                                                    }
                                                    }
                                                    disabled={complaint.status === 'CLOSED'}
                                                >
                                                    <SelectTrigger className="w-[140px]" disabled={complaint.status === 'CLOSED'}>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="PENDING">Pending</SelectItem>
                                                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                                        <SelectItem value="RESOLVED">Resolved</SelectItem>
                                                        <SelectItem value="CLOSED">Closed</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <Badge
                                                    variant={
                                                        complaint.status === 'PENDING'
                                                            ? 'destructive'
                                                            : complaint.status === 'IN_PROGRESS'
                                                                ? 'secondary'
                                                                : complaint.status === 'RESOLVED'
                                                                    ? 'default'
                                                                    : 'outline'
                                                    }
                                                >
                                                    {complaint.status}
                                                </Badge>
                                            )}
                                        </>
                                }
                            </TableCell>
                            <TableCell className="text-left">{complaint.subject}</TableCell>
                            <TableCell className="text-right flex justify-end gap-4">
                                <Eye
                                    className="w-4 h-4 cursor-pointer"
                                    onClick={() => {
                                        setSelectedComplaint(complaint);
                                        setIsViewOpen(true);
                                    }}
                                />
                                {
                                    hasUpdatePermission ?
                                        <Pencil
                                            className="w-4 h-4 cursor-pointer"
                                            onClick={() => handleUpdate(complaint)}
                                        /> : ""
                                }
                                <AlertDialog>
                                    {hasDeletePermission ?
                                        <AlertDialogTrigger asChild>
                                            <Trash2 className="w-4 h-4 hover:text-red-600 cursor-pointer" />
                                        </AlertDialogTrigger> : ""
                                    }
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your complaint.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(complaint?.id)}>
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* View Dialog */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Complaint Details</DialogTitle>
                        <DialogDescription>
                            <p>
                                <strong>Name:</strong> {selectedComplaint?.customer.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {selectedComplaint?.customer.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {selectedComplaint?.customer.phone}
                            </p>
                            <p>
                                <strong>Status:</strong> {selectedComplaint?.status}
                            </p>
                            <p>
                                <strong>Subject:</strong> {selectedComplaint?.subject}
                            </p>
                            <p>
                                <strong>Description:</strong> {selectedComplaint?.description}
                            </p>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            {/* Update Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Complaint</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            {/* Customer */}
                            <div className={`${!isAdd ? "hidden" : "block"}`}>
                                <Label>Customer</Label>
                                <Controller
                                    control={control}
                                    name="customer_id"
                                    rules={{ required: "Customer is required" }}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={(val) => field.onChange(Number(val))}
                                            value={field.value?.toString()}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose Customer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <div>
                                                    <Input
                                                        placeholder="Search customer..."
                                                        value={searchInputs.customer}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setSearchInputs((p) => ({
                                                                ...p,
                                                                customer: val,
                                                            }));
                                                            customerDebounce(val);
                                                        }}
                                                    />
                                                </div>
                                                {loadingCustomers ? (
                                                    <p className="px-3 py-2 text-sm">
                                                        Loading customers...
                                                    </p>
                                                ) : customers.length === 0 ? (
                                                    <p className="px-3 py-2 text-sm text-muted-foreground">
                                                        No customers found.
                                                    </p>
                                                ) : (
                                                    customers.map((c: TCustomer) => (
                                                        <SelectItem key={c?.id} value={c?.id?.toString()}>
                                                            {c?.name}
                                                        </SelectItem>
                                                    ))
                                                )}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.customer_id && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.customer_id.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="subject" className="text-right">
                                    Subject
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="subject"
                                        {...register('subject')}
                                        className={errors.subject ? 'border-red-500' : ''}
                                    />
                                    {errors.subject && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.subject.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="description"
                                        {...register('description')}
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Page;