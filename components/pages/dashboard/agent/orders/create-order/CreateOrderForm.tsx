/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Input
} from "@/components/ui/input";
import {
    Label
} from "@/components/ui/label";
import {
    Button
} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { debounce } from "@/utills/debounce";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import {
    useGetAllCustomerQuery
} from "@/redux/features/customers/cutomersApi";
import {
    useGetCustomerAddressQuery
} from "@/redux/features/address/customerAddress";
import { useGetAllProductQuery } from "@/redux/features/products/productsApi";
import { useGetAllPackageQuery } from "@/redux/features/package/packageApi";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { CreateCustomer } from "./CreateCustomer";
import CreateAddress from "./CreateAddress";
import { toast } from "sonner";
import { Address, Package, Product } from "@/types/orders";
import { TCustomer } from "@/types/customer.types";


// Zod Schema
const orderSchema = z.object({
    agentId: z.number(),
    customerId: z.number(),
    addressId: z.number(),
    productId: z.string().optional(),
    packageId: z.string().optional(),
    quantity: z.number().min(1)
});

type OrderFormValues = z.infer<typeof orderSchema>;

const CreateOrderForm = () => {
    const user = useAppSelector(currentUser);

    const [searchInputs, setSearchInputs] = useState({
        customer: "",
        product: "",
        pack: ""
    });

    const [orderType, setOrderType] = useState<"product" | "package">("product");

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        control,
        formState: { errors }
    } = useForm<OrderFormValues>({
        resolver: zodResolver(orderSchema),
        defaultValues: { quantity: 1 }
    });

    // Agent set
    useEffect(() => {
        if (user?.id) {
            setValue("agentId", user.id);
        }
    }, [user?.id]);

    // Watch for selected customerId
    const customerId = watch("customerId");

    // Customer API
    const [customerFilters, setCustomerFilters] = useState({
        search: "",
        limit: 5,
        page: 1
    });

    const {
        data: customerData,
        isLoading: loadingCustomers
    } = useGetAllCustomerQuery(customerFilters);

    const customerDebounce = debounce((v: string) => {
        setCustomerFilters(prev => ({ ...prev, search: v }));
    }, 500);

    const customers = customerData?.data || [];

    // Address API (Dynamic by selected customer)
    const {
        data: addressData,
        isLoading: loadingAddresses
    } = useGetCustomerAddressQuery(customerId, {
        skip: !customerId,
        refetchOnMountOrArgChange: true
    });

    const addresses = addressData?.data || [];

    // Product API
    const [productFilters, setProductFilters] = useState({
        search: "",
        limit: 5,
        page: 1
    });

    const {
        data: productData,
        isLoading: loadingProducts
    } = useGetAllProductQuery(productFilters);

    const productDebounce = debounce((v: string) => {
        setProductFilters(prev => ({ ...prev, search: v }));
    }, 500);

    const products = productData?.data?.products || [];

    // Package API
    const [packageFilters, setPackageFilters] = useState({
        search: "",
        limit: 5,
        page: 1
    });

    const {
        data: packageData,
        isLoading: loadingPackages
    } = useGetAllPackageQuery(packageFilters, {
        skip: orderType === "product"
    });

    const packageDebounce = debounce((v: string) => {
        setPackageFilters(prev => ({ ...prev, search: v }));
    }, 500);

    const packages = packageData?.data?.packages || [];

    // Place Order
    const [createOrder] = useCreateOrderMutation();

    const onSubmit = async (data: OrderFormValues) => {
        const toastId = toast.loading("Creating order...");
        
        const baseData = {
            agentId: data.agentId,
            customerId: data.customerId,
            addressId: data.addressId,
            quantity: data.quantity
        };

        const finalData =
            orderType === "product"
                ? { ...baseData, productId: data.productId ? Number(data.productId) : undefined }
                : { ...baseData, packageId: data.packageId ? Number(data.packageId) : undefined };
        console.log(finalData);
        try {
            await createOrder(finalData).unwrap();
            toast.success("Order placed successfully", { id: toastId });
            reset();
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong", { id: toastId });
        }
    };

    return (
        <>
            {/* Top bar */}
            <div className="max-w-4xl mx-auto py-4 flex justify-end gap-4">
                <CreateCustomer
                    setCustomerFilters={setCustomerFilters}
                    filters={customerFilters}
                    onSelectCustomer={(id: number) => setValue("customerId", id)}
                />
                {customerId && <CreateAddress id={customerId} />}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="max-w-4xl mx-auto py-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Order</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">

                                {/* Order Type */}
                                <div className="md:col-span-2">
                                    <Label>Order Type</Label>
                                    <div className="flex gap-4 mt-2">
                                        <label className="flex items-center gap-1">
                                            <input
                                                type="radio"
                                                value="product"
                                                checked={orderType === "product"}
                                                onChange={() => setOrderType("product")}
                                            />
                                            Product
                                        </label>
                                        <label className="flex items-center gap-1">
                                            <input
                                                type="radio"
                                                value="package"
                                                checked={orderType === "package"}
                                                onChange={() => setOrderType("package")}
                                            />
                                            Package
                                        </label>
                                    </div>
                                </div>

                                {/* Customer */}
                                <div>
                                    <Label>Customer</Label>
                                    <Controller
                                        control={control}
                                        name="customerId"
                                        rules={{ required: "Customer is required" }}
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={val => field.onChange(Number(val))}
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
                                                            onChange={e => {
                                                                const val = e.target.value;
                                                                setSearchInputs(p => ({ ...p, customer: val }));
                                                                customerDebounce(val);
                                                            }}
                                                        />
                                                    </div>
                                                    {loadingCustomers ? (
                                                        <p className="px-3 py-2 text-sm">Loading customers...</p>
                                                    ) : customers.length === 0 ? (
                                                        <p className="px-3 py-2 text-sm text-muted-foreground">No customers found.</p>
                                                    ) : (
                                                        customers.map((c: TCustomer) => (
                                                            <SelectItem key={c.id} value={c.id.toString()}>
                                                                {c.name}
                                                            </SelectItem>
                                                        ))
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.customerId && (
                                        <p className="text-red-500 text-sm mt-1">{errors.customerId.message}</p>
                                    )}
                                </div>

                                {/* Address */}
                                <div>
                                    <Label>Shipping Address</Label>
                                    <Controller
                                        control={control}
                                        name="addressId"
                                        rules={{ required: "Address is required" }}
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={val => field.onChange(Number(val))}
                                                value={field.value?.toString()}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose Address" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {loadingAddresses ? (
                                                        <p className="px-3 py-2 text-sm">Loading addresses...</p>
                                                    ) : addresses.length === 0 ? (
                                                        <p className="px-3 py-2 text-sm text-muted-foreground">No address found.</p>
                                                    ) : (
                                                        addresses.map((a: Address) => (
                                                            <SelectItem key={a.id} value={a.id.toString()}>
                                                                {a.city}, {a.thana}, {a.street}
                                                            </SelectItem>
                                                        ))
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.addressId && (
                                        <p className="text-red-500 text-sm mt-1">{errors.addressId.message}</p>
                                    )}
                                </div>

                                {/* Product */}
                                {orderType === "product" && (
                                    <div>
                                        <Label>Product</Label>
                                        <Controller
                                            control={control}
                                            name="productId"
                                            rules={{ required: "Product is required" }}
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choose Product" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <div>
                                                            <Input
                                                                placeholder="Search product..."
                                                                value={searchInputs.product}
                                                                onChange={e => {
                                                                    const val = e.target.value;
                                                                    setSearchInputs(p => ({ ...p, product: val }));
                                                                    productDebounce(val);
                                                                }}
                                                            />
                                                        </div>
                                                        {loadingProducts ? (
                                                            <p className="px-3 py-2 text-sm">Loading products...</p>
                                                        ) : products.length === 0 ? (
                                                            <p className="text-sm text-muted-foreground px-3 py-2">No product found.</p>
                                                        ) : (
                                                            products.map((product: Product) => (
                                                                <SelectItem key={product.id} value={product.id.toString()}>
                                                                    {product.name}
                                                                </SelectItem>
                                                            ))
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors.productId && (
                                            <p className="text-sm text-red-500 mt-1">{errors.productId.message}</p>
                                        )}
                                    </div>
                                )}

                                {/* Package */}
                                {orderType === "package" && (
                                    <div>
                                        <Label>Package</Label>
                                        <Controller
                                            control={control}
                                            name="packageId"
                                            rules={{ required: "Package is required" }}
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choose Package" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <div>
                                                            <Input
                                                                placeholder="Search package..."
                                                                value={searchInputs.pack}
                                                                onChange={e => {
                                                                    const val = e.target.value;
                                                                    setSearchInputs(p => ({ ...p, pack: val }));
                                                                    packageDebounce(val);
                                                                }}
                                                            />
                                                        </div>
                                                        {loadingPackages ? (
                                                            <p className="px-3 py-2 text-sm">Loading packages...</p>
                                                        ) : packages.length === 0 ? (
                                                            <p className="text-sm text-muted-foreground px-3 py-2">No package found.</p>
                                                        ) : (
                                                            packages.map((p: Package) => (
                                                                <SelectItem key={p.id} value={p.id.toString()}>
                                                                    {p.name}
                                                                </SelectItem>
                                                            ))
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors.packageId && (
                                            <p className="text-sm text-red-500 mt-1">{errors.packageId.message}</p>
                                        )}
                                    </div>
                                )}

                                {/* Quantity */}
                                <div>
                                    <Label>Quantity</Label>
                                    <Input type="number" {...register("quantity", { valueAsNumber: true })} />
                                    {errors.quantity && (
                                        <p className="text-sm text-red-500 mt-1">{errors.quantity.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="text-end pt-6">
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