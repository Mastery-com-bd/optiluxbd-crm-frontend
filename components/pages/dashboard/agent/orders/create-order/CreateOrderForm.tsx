"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import { debounce } from "@/utills/debounce";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useParams } from "next/navigation";
import {
    useGetCustomerByIdQuery,
    useGetAllCustomerQuery,
} from "@/redux/features/customers/cutomersApi";
import { useGetAllProductQuery } from "@/redux/features/products/productsApi";
import { CreateCustomer } from "./CreateCustomer";
import CreateAddress from "./CreateAddress";
import Loading from "@/components/pages/shared/Loading";
import { Address, Product } from "@/types/orders";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { toast } from "sonner";

const orderSchema = z.object({
    agentId: z.number(),
    addressId: z.number(),
    productId: z.number(),
    packageId: z.number().nullable().optional(),
    quantity: z.number().min(1),
    batchId: z.number().nullable().optional(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

const CreateOrderForm = () => {
    const user = useAppSelector(currentUser);

    const [customerIdState, setCustomerIdState] = useState<number | null>(null);
    const [productIdState, setProductIdState] = useState<number | null>(null);
    const [addressIdState, setAddressIdState] = useState<number | null>(null);
    const [customerName, setCustomerName] = useState("");
    const [productName, setProductName] = useState("");
    const [addressLabel, setAddressLabel] = useState("");
    const [customerInputValue, setCustomerInputValue] = useState("");
    const [productSearch, setProductSearch] = useState("");
    const [showCustomerSuggestions, setShowCustomerSuggestions] = useState(false);
    const [showProductSuggestions, setShowProductSuggestions] = useState(false);

    const [id, setId] = useState<string | undefined>("");
    const { customerId } = useParams();

    useEffect(() => {
        if (typeof customerId === "string") {
            Promise.resolve().then(() => {
                setId(customerId);
            });
        }
    }, [customerId]);

    const {
        data: customerData,
        isLoading: customerLoading,
        refetch: refetchCustomer,
    } = useGetCustomerByIdQuery(id);

    const addresses: Address[] = customerData?.data?.addresses ?? [];

    useEffect(() => {
        if (customerData?.data?.id) {
            Promise.resolve().then(() => {
                setCustomerIdState(customerData.data.id);
                setCustomerName(customerData.data.name);
            });
        }
    }, [customerData?.data?.id]);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<OrderFormValues>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            quantity: 10,
        },
    });

    useEffect(() => {
        if (user?.id) {
            setValue("agentId", user.id);
        }
    }, [user?.id]);

    // Customer search
    const [customerFilters, setCustomerFilters] = useState({
        search: "",
        limit: 5,
        page: 1,
    });

    const { data: customerListData } = useGetAllCustomerQuery(customerFilters);

    const handleCustomerSearch = debounce((val: string) => {
        setCustomerFilters((prev) => ({ ...prev, search: val }));
    }, 300);

    // Product search
    const [productFilters, setProductFilters] = useState({
        search: "",
        limit: 5,
        page: 1,
    });

    const { data: productData, isLoading: productLoading } = useGetAllProductQuery(productFilters);

    const handleProductSearch = debounce((val: string) => {
        setProductFilters((prev) => ({
            ...prev,
            search: val,
        }));
    }, 300);
    const [createOrder] = useCreateOrderMutation();
    const onSubmit = async (formData: OrderFormValues) => {
        if (!customerIdState) {
            toast.error("Please select a customer before submitting.");
            return;
        }

        const data = {
            ...formData,
            agentId: user?.id ?? 0,
            customerId: customerIdState,
        };
        console.log(data);
        const toastId = toast.loading("Creating order...");

        try {
            const response = await createOrder(data).unwrap();
            toast.success("Order created successfully!", {
                id: toastId,
            });
            reset();
            console.log("Final Order:", response);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error("Failed to create order.", {
                id: toastId,
            });

            console.error("Create order error:", error);
        }
    };

    if (customerLoading) return <Loading />;

    return (
        <>
            {/* Upper right action buttons */}
            <div className="max-w-4xl mx-auto py-4 flex justify-end gap-4">
                <CreateCustomer setId={setId} refetch={refetchCustomer} />
                {customerIdState && (
                    <CreateAddress id={customerIdState} refetch={refetchCustomer} />
                )}
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="max-w-4xl mx-auto py-6">
                    <Card className="border dark:border-zinc-700 shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Create New Order</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Customer */}
                                <div className="md:col-span-2 relative">
                                    <Label>Customer</Label>
                                    {customerIdState ? (
                                        <div className="flex gap-2">
                                            <Input value={customerName} readOnly />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() => {
                                                    setCustomerIdState(null);
                                                    setCustomerName("");
                                                    setCustomerInputValue("");
                                                    setId("0");
                                                }}
                                            >
                                                Change
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Input
                                                placeholder="Search customer"
                                                value={customerInputValue}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setCustomerInputValue(val);
                                                    setShowCustomerSuggestions(true);
                                                    handleCustomerSearch(val);
                                                }}
                                            />
                                            {showCustomerSuggestions &&
                                                customerListData?.data?.length > 0 && (
                                                    <div className="absolute z-50 w-full bg-white dark:bg-zinc-900 shadow border dark:border-zinc-700 max-h-60 overflow-y-auto rounded-md mt-2">
                                                        {customerListData.data.map((cust) => (
                                                            <div
                                                                key={cust.id}
                                                                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                                                                onClick={() => {
                                                                    setCustomerIdState(cust.id);
                                                                    setCustomerName(cust.name);
                                                                    setCustomerInputValue(cust.name);
                                                                    setShowCustomerSuggestions(false);
                                                                    setId(cust.id.toString());
                                                                }}
                                                            >
                                                                {cust.name} ({cust.mobile})
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                        </div>
                                    )}
                                </div>

                                {/* Address */}
                                <div className="md:col-span-2">
                                    <Label>Shipping Address</Label>
                                    {addresses.length > 0 ? (
                                        <div>
                                            <Select
                                                onValueChange={(val) => {
                                                    setAddressIdState(Number(val));
                                                    setValue("addressId", Number(val));
                                                    const found = addresses.find((a) => a.id === Number(val));
                                                    if (found) {
                                                        setAddressLabel(`${found.city}, ${found.street}`);
                                                    }
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select address..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {addresses.map((a) => (
                                                        <SelectItem key={a.id} value={String(a.id)}>
                                                            {a.city}, {a.street}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {addressIdState && (
                                                <Input value={addressLabel} readOnly className="mt-2" />
                                            )}
                                        </div>
                                    ) : (
                                        customerIdState && (
                                            <div className="mt-4">
                                                No address is provided. Please add address....
                                            </div>
                                        )
                                    )}
                                    {errors.addressId && (
                                        <p className="text-sm text-red-500">{errors.addressId.message}</p>
                                    )}
                                </div>

                                {/* Product */}
                                <div className="md:col-span-2 relative">
                                    <Label>Product</Label>
                                    <Input
                                        placeholder="Search product..."
                                        value={productSearch}
                                        onChange={(e) => {
                                            setProductSearch(e.target.value);
                                            setShowProductSuggestions(true);
                                            handleProductSearch(e.target.value);
                                        }}
                                    />
                                    <input type="hidden" {...register("productId", { valueAsNumber: true })} />
                                    {productIdState && (
                                        <Input value={productName} readOnly className="mt-2" />
                                    )}
                                    {showProductSuggestions &&
                                        productData?.data?.products?.length > 0 && (
                                            <div className="absolute z-50 w-full bg-white dark:bg-zinc-900 shadow border dark:border-zinc-700 max-h-60 overflow-y-auto rounded-md mt-2">
                                                {productLoading ? (
                                                    <div className="text-muted-foreground text-sm text-center p-4">
                                                        Loading...
                                                    </div>
                                                ) : (
                                                    productData.data.products.map((product: Product) => (
                                                        <div
                                                            key={product.id}
                                                            className="flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                                                            onClick={() => {
                                                                setValue("productId", product.id);
                                                                setProductName(product.name);
                                                                setProductIdState(product.id);
                                                                setProductSearch(product.name);
                                                                setShowProductSuggestions(false);
                                                            }}
                                                        >
                                                            <img
                                                                src={product.image_url}
                                                                alt={product.name}
                                                                className="w-10 h-10 object-cover rounded"
                                                            />
                                                            <span>{product.name}</span>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    {errors.productId && (
                                        <p className="text-sm text-red-500 mt-1">{errors.productId.message}</p>
                                    )}
                                </div>

                                {/* Package ID */}
                                <div>
                                    <Label>Package ID</Label>
                                    <Input type="number" {...register("packageId", { valueAsNumber: true })} />
                                </div>

                                {/* Quantity */}
                                <div>
                                    <Label>Quantity</Label>
                                    <Input type="number" {...register("quantity", { valueAsNumber: true })} />
                                    {errors.quantity && (
                                        <p className="text-sm text-red-500 mt-1">{errors.quantity.message}</p>
                                    )}
                                </div>

                                {/* Batch ID */}
                                {/* <div>
                                    <Label>Batch ID</Label>
                                    <Input type="number" {...register("batchId", { valueAsNumber: true })} />
                                </div> */}
                            </div>

                            <div className="text-end pt-8">
                                <Button type="submit">Submit Order</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </>
    );
};

export default CreateOrderForm;