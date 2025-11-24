/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useGetAllPackageQuery } from "@/redux/features/package/packageApi";

const orderSchema = z.object({
    agentId: z.number(),
    addressId: z.number(),
    productId: z.string().optional(),
    packageId: z.string().optional(),
    quantity: z.number().min(1),
});
type OrderFormValues = z.infer<typeof orderSchema>;

const CreateOrderForm = () => {
    const user = useAppSelector(currentUser);

    const [customerIdState, setCustomerIdState] = useState<number | null>(null);
    const [productIdState, setProductIdState] = useState<number | null>(null);
    const [packageIdState, setPackageIdState] = useState<number | null>(null);
    const [addressIdState, setAddressIdState] = useState<number | null>(null);

    const [customerName, setCustomerName] = useState("");
    const [productName, setProductName] = useState("");
    const [packageName, setPackageName] = useState("");
    const [addressLabel, setAddressLabel] = useState("");

    const [customerInputValue, setCustomerInputValue] = useState("");
    const [productSearch, setProductSearch] = useState("");
    const [packageSearch, setPackageSearch] = useState("");

    const [showCustomerSuggestions, setShowCustomerSuggestions] = useState(false);
    const [showProductSuggestions, setShowProductSuggestions] = useState(false);
    const [showPackageSuggestions, setShowPackageSuggestions] = useState(false);

    const [orderType, setOrderType] = useState<"product" | "package">("product");
    const [id, setId] = useState<string | undefined>("");
    const { customerId } = useParams();

    useEffect(() => {
        if (typeof customerId === "string") {
            Promise.resolve().then(() => setId(customerId));
        }
    }, [customerId]);

    const {
        data: customerData,
        isLoading: customerLoading,
        refetch: refetchCustomer,
    } = useGetCustomerByIdQuery(id, { skip: id == "0" });

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
            quantity: 1,
        },
    });

    useEffect(() => {
        if (user?.id) {
            setValue("agentId", user.id);
        }
    }, [user?.id]);

    // Customer Search
    const [customerFilters, setCustomerFilters] = useState({
        search: "",
        limit: 5,
        page: 1,
    });
    const { data: customerListData } = useGetAllCustomerQuery(customerFilters);
    const handleCustomerSearch = debounce((val: string) => {
        setCustomerFilters((prev) => ({ ...prev, search: val }));
    }, 1000);

    // Product Search
    const [productFilters, setProductFilters] = useState({
        search: "",
        limit: 5,
        page: 1,
    });
    const { data: productData, isLoading: productLoading } = useGetAllProductQuery(productFilters);
    const handleProductSearch = debounce((val: string) => {
        setProductFilters((prev) => ({ ...prev, search: val }));
    }, 1000);

    // Package Search
    const [packageFilters, setPackageFilters] = useState({
        search: "",
        limit: 5,
        page: 1,
    });
    const { data: packageData } = useGetAllPackageQuery(packageFilters);
    const handlePackageSearch = debounce((val: string) => {
        setPackageFilters((prev) => ({ ...prev, search: val }));
    }, 1000);

    const [createOrder] = useCreateOrderMutation();

    const onSubmit = async (formData: OrderFormValues) => {
        if (!customerIdState) {
            toast.error("Please select a customer.");
            return;
        }

        const baseData = {
            agentId: user?.id ?? 0,
            customerId: customerIdState,
            addressId: formData.addressId,
            quantity: formData.quantity,
        };

        const data =
            orderType === "product"
                ? { ...baseData, productId: Number(formData.productId) }
                : { ...baseData, packageId: Number(formData.packageId) };
        const toastId = toast.loading("Creating order...");
        try {
            await createOrder(data).unwrap();
            toast.success("Order created successfully!", { id: toastId });
            reset();
            setProductSearch("");
            setProductName("");
            setProductIdState(null);
            setPackageSearch("");
            setPackageName("");
            setPackageIdState(null);
        } catch (error: any) {
            toast.error("Failed to create order.", { id: toastId });
            console.error("Create order error:", error);
        }
    };

    if (customerLoading) return <Loading />;

    return (
        <>
            <div className="max-w-4xl mx-auto py-4 flex justify-end gap-4">
                <CreateCustomer setId={setId} refetch={refetchCustomer} />
                {customerIdState && (
                    <CreateAddress id={customerIdState} refetch={refetchCustomer} />
                )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="max-w-4xl mx-auto py-6">
                    <Card className="border dark:border-zinc-700 shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Create New Order</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">

                                {/* Order Type */}
                                <div className="md:col-span-2">
                                    <Label>Order Type</Label>
                                    <div className="flex gap-6 mt-2">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                value="product"
                                                checked={orderType === "product"}
                                                onChange={() => setOrderType("product")}
                                            />
                                            Product Order
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                value="package"
                                                checked={orderType === "package"}
                                                onChange={() => setOrderType("package")}
                                            />
                                            Package Order
                                        </label>
                                    </div>
                                </div>

                                {/* Customer */}
                                <div className="relative">
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
                                                        {customerListData.data.map((cust: any) => (
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
                                <div>
                                    <Label>Shipping Address</Label>
                                    {addresses.length > 0 ? (
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
                                    ) : customerIdState ? (
                                        <div className="mt-4 text-red-600">
                                            No addresses found. Please add an address.
                                        </div>
                                    ) : null}
                                    {errors.addressId && (
                                        <p className="text-sm text-red-500">
                                            {errors.addressId.message}
                                        </p>
                                    )}
                                </div>

                                {/* Product or Package */}
                                {orderType === "product" ? (
                                    <div className="relative">
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
                                        <Input className="hidden" {...register("productId")} />
                                        {showProductSuggestions &&
                                            productData?.data?.products?.length > 0 && (
                                                <div className="absolute z-50 w-full bg-white dark:bg-zinc-900 shadow border dark:border-zinc-700 max-h-60 overflow-y-auto rounded-md mt-2">
                                                    {productData.data.products.map((product: Product) => (
                                                        <div
                                                            key={product.id}
                                                            className="flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                                                            onClick={() => {
                                                                setValue("productId", product.id.toString());
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
                                                    ))}
                                                </div>
                                            )}
                                        {errors.productId && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {errors.productId.message}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <Label>Package</Label>
                                        <Input
                                            placeholder="Search package..."
                                            value={packageSearch}
                                            onChange={(e) => {
                                                setPackageSearch(e.target.value);
                                                setShowPackageSuggestions(true);
                                                handlePackageSearch(e.target.value);
                                            }}
                                        />
                                        <Input className="hidden" {...register("packageId")} />
                                        {showPackageSuggestions &&
                                            packageData?.data?.packages?.length > 0 && (
                                                <div className="absolute z-50 w-full bg-white dark:bg-zinc-900 shadow border dark:border-zinc-700 max-h-60 overflow-y-auto rounded-md mt-2">
                                                    {packageData.data.packages.map((pkg: any) => (
                                                        <div
                                                            key={pkg.id}
                                                            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                                                            onClick={() => {
                                                                setValue("packageId", pkg.id.toString());
                                                                setPackageName(pkg.name);
                                                                setPackageIdState(pkg.id);
                                                                setPackageSearch(pkg.name);
                                                                setShowPackageSuggestions(false);
                                                            }}
                                                        >
                                                            {pkg.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        {errors.packageId && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {errors.packageId.message}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Quantity */}
                                <div>
                                    <Label>Quantity</Label>
                                    <Input
                                        type="number"
                                        {...register("quantity", { valueAsNumber: true })}
                                    />
                                    {errors.quantity && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.quantity.message}
                                        </p>
                                    )}
                                </div>
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