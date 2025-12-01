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
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
    useDeleteComplainMutation,
    useGetAllComplainQuery,
    useUpdateComplainMutation,
} from '@/redux/features/complain/complainApi';

type Complaint = {
    id: number;
    customer_id: number;
    agent_id: number;
    subject: string;
    description: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
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

// Demo complaints array
const complaints: Complaint[] = [
    {
        id: 1,
        customer_id: 1,
        agent_id: 2,
        subject: 'Product Issue',
        description: 'Detailed description of the issue',
        status: 'PENDING',
        isDeleted: false,
        created_at: '2024-01-01T10:00:00Z',
        updated_at: '2024-01-01T10:00:00Z',
        customer: {
            id: 1,
            name: 'John Doe',
            phone: '+1234567890',
            email: 'john@example.com',
        },
    },
];

// Zod schema
const updateSchema = z.object({
    subject: z.string().min(1, 'Subject is required'),
    description: z.string().min(1, 'Description is required'),
});

const Page = () => {
    const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [deleteComplain] = useDeleteComplainMutation();
    const [updateComplain] = useUpdateComplainMutation();
    const { data: complainData } = useGetAllComplainQuery(undefined);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            subject: '',
            description: '',
        },
    });

    const handleUpdate = (complaint: Complaint) => {
        setSelectedComplaint(complaint);
        setValue('subject', complaint.subject);
        setValue('description', complaint.description);
        setIsFormOpen(true);
    };

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
        const id = selectedComplaint?.id;
        const toastId = toast.loading('Updating complaint...');
        if (!id) {
            toast.error('Invalid complaint', { id: toastId });
            return;
        }
        try {
            await updateComplain({ id, data }).unwrap();
            toast.success('Complaint updated successfully.', { id: toastId });
            setIsFormOpen(false);
            setSelectedComplaint(null);
            reset();
        } catch (error) {
            console.error(error);
            toast.error('Failed to update complaint.', { id: toastId });
        }
    };

    return (
        <div className="p-6">
            <div>
                <h1 className="text-2xl font-bold mb-4">Complaints</h1>

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
                    {complaints.map((complaint) => (
                        <TableRow key={complaint.id}>
                            <TableCell className="text-left">{complaint.customer.name}</TableCell>
                            <TableCell className="text-left">{complaint.customer.phone}</TableCell>
                            <TableCell className="text-left">{complaint.customer.email}</TableCell>
                            <TableCell className="text-left">
                                {new Date(complaint.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-left">
                                <Badge
                                    variant={
                                        complaint.status === 'PENDING'
                                            ? 'destructive'
                                            : complaint.status === 'IN_PROGRESS'
                                                ? 'secondary'
                                                : 'default'
                                    }
                                >
                                    {complaint.status}
                                </Badge>
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
                                <Pencil
                                    className="w-4 h-4 cursor-pointer"
                                    onClick={() => handleUpdate(complaint)}
                                />
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Trash2 className="w-4 h-4 hover:text-red-600 cursor-pointer" />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your complaint.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(complaint.id)}>
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