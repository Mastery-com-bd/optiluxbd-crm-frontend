/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ButtonComponent from "@/components/ui/ButtonComponent";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculatePrice, validateCouponCode } from "@/service/coupon/couonService";
import { createOrganization } from "@/service/OrganaizationService";
import { getAllPlan } from "@/service/planService";
import { initiatePayment } from "@/service/sslCommerze/ssl";
import { OrgFormValues, orgSchema } from "@/types/organization/organization.type";
import { TPlan } from "@/types/plans/plans.type";
import { debounce } from "@/utills/debounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


interface PriceData {
    basePrice: number;
    discount: number;
    finalPrice: number;
    billingCycle: string;
}

export default function OrganizationRegisterForm({ planData }: { planData?: { planId: number, slug: string } }) {

    const [plans, setPlans] = useState<TPlan[]>([]);
    const [couponValidationResult, setCouponValidationResult] = useState<any>(null);
    const [priceData, setPriceData] = useState<PriceData | null>(null);
    const [isLoadingPrice, setIsLoadingPrice] = useState(false);

    useEffect(() => {
        async function fetchPlans() {
            const res = await getAllPlan();
            if (res && !res.error) {
                setPlans(res.data);
            }
        }
        fetchPlans();
    }, []);
    const form = useForm<OrgFormValues>({
        resolver: zodResolver(orgSchema()),
        defaultValues: {
            name: "",
            email: "",
            ownerName: "",
            ownerEmail: "",
            ownerPassword: "",
            phone: "",
            website: "",
            slug: "",
            address: "",
            city: "",
            country: "",
            couponCode: "",
            billingCycle: undefined,
            planId: planData?.planId || undefined,
            planSlug: planData?.slug || "",
        },
    });

    const selectedPlan = form.watch("planId");
    const billingCycle = form.watch("billingCycle");
    const couponCode = form.watch("couponCode");

    // Function to fetch price
    const fetchPrice = useCallback(async (planId: string | number, cycle: string, coupon?: string) => {
        if (!planId || !cycle) return;

        setIsLoadingPrice(true);
        try {
            const res = await calculatePrice({
                planId,
                billingCycle: cycle,
                couponCode: coupon || undefined,
            });

            if (res.success) {
                setPriceData(res.data);
            } else {
                setPriceData(null);
            }
        } catch (error) {
            console.error("Error fetching price:", error);
            setPriceData(null);
        } finally {
            setIsLoadingPrice(false);
        }
    }, []);

    // Debounced coupon validation
    const debouncedValidateCoupon = useMemo(
        () =>
            debounce(async (coupon: string) => {
                if (!coupon) {
                    setCouponValidationResult(null);
                    if (selectedPlan && billingCycle) {
                        fetchPrice(selectedPlan, billingCycle);
                    }
                    return;
                }

                const res = await validateCouponCode(coupon);
                if (res.success) {
                    setCouponValidationResult({ valid: true, message: "Coupon is valid!" });
                    if (selectedPlan && billingCycle) {
                        fetchPrice(selectedPlan, billingCycle, coupon);
                    }
                } else {
                    setCouponValidationResult({ valid: false, message: res.message || "Invalid coupon code" });
                    if (selectedPlan && billingCycle) {
                        fetchPrice(selectedPlan, billingCycle);
                    }
                }
            }, 500),
        [selectedPlan, billingCycle, fetchPrice]
    );

    // Watch coupon code changes
    useEffect(() => {
        debouncedValidateCoupon(couponCode || "");
        return () => {
            debouncedValidateCoupon.cancel();
        };
    }, [couponCode, debouncedValidateCoupon]);

    // Watch plan and billing cycle changes
    useEffect(() => {
        if (selectedPlan && billingCycle) {
            fetchPrice(selectedPlan, billingCycle, couponCode || undefined);
        } else {
            setPriceData(null);
        }
    }, [selectedPlan, billingCycle, fetchPrice, couponCode]);

    const onFormSubmit = async (data: OrgFormValues) => {
        const toastId = toast.loading("Processing organization registration...");

        try {
            // --- Step 1: Data Organize for Organization Creation ---
            const orgPayload = {
                name: data.name,
                slug: data.slug,
                email: data.email,
                phone: data.phone,
                address: data.address,
                city: data.city,
                country: data.country,
                ownerName: data.ownerName,
                ownerEmail: data.ownerEmail,
                ownerPassword: data.ownerPassword,
                plan: data.planSlug,
                billingCycle: data.billingCycle,
            };

            // Organization Create call
            const orgRes = await createOrganization(orgPayload);

            if (!orgRes.success) {
                toast.error(orgRes.message || "Failed to create organization", { id: toastId });
                return;
            }

            // --- Step 2: Update toast and prepare for payment ---
            toast.loading("Organization created! Processing payment...", { id: toastId });

            const createdOrgId = orgRes?.data?.organization?.id;

            const purchasePayload = {
                planId: data.planId,
                billingCycle: data.billingCycle,
                customerName: data.ownerName,
                customerEmail: data.ownerEmail,
                customerPhone: data.phone,
                customerAddress: data.address,
                customerCity: data.city,
                customerPostcode: data.postCode,
                customerCountry: data.country,
                couponCode: data.couponCode || undefined,
                organizationId: createdOrgId,
            };

            // --- Step 3: Manual Purchase Function Call ---
            const purchaseRes = await initiatePayment(purchasePayload);

            if (purchaseRes.success) {
                toast.success("Organization & Subscription completed successfully!", {
                    id: toastId,
                    duration: 5000,
                });
                window.location.href = purchaseRes.data.paymentUrl;
                form.reset();
                setPriceData(null);
                setCouponValidationResult(null);
            } else {
                toast.error(`Organization created but payment failed: ${purchaseRes.message}`, {
                    id: toastId,
                });
            }

        } catch (error: any) {
            console.error("Submission Error:", error);
            toast.error(error.message || "An unexpected error occurred", { id: toastId });
        }
    };

    return (
        <div className="effect p-6 rounded-2xl my-6 border bg-card shadow-sm">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Organization Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Organization Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="habi jabi Corporation" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Slug */}
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input placeholder="habi-jabi" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Organization Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="twaha@acme.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Phone */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+8801712345678" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Website */}
                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://acme.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Address */}
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123 Main Street" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Dhaka" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Bangladesh" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="col-span-1 md:col-span-2 border-t pt-4 mt-2">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase">Owner Information</h3>
                        </div>

                        <FormField
                            control={form.control}
                            name="ownerName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Owner Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Twaha Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="ownerEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Owner Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="twaha@acme.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="ownerPassword"
                            render={({ field }) => (
                                <FormItem className="col-span-1 md:col-span-2">
                                    <FormLabel>Owner Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="postCode"
                            render={({ field }) => (
                                <FormItem className="col-span-1 md:col-span-2">
                                    <FormLabel>Post Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="1205" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="col-span-1 md:col-span-2 border-t pt-4 mt-2">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase">Billing Information</h3>
                        </div>


                        {/* Subscription Row */}
                        <FormField
                            control={form.control}
                            name="planId"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Subscription Plan</FormLabel>
                                    <Select
                                        value={field.value?.toString()}
                                        onValueChange={(id) => {
                                            const selectedPlan = plans.find((p) => p.id.toString() === id);

                                            if (selectedPlan) {
                                                field.onChange(selectedPlan.id);
                                                form.setValue("planSlug", selectedPlan.slug, {
                                                    shouldValidate: true,
                                                    shouldDirty: true,
                                                });
                                            }
                                        }}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a plan" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {plans.map((plan) => (
                                                <SelectItem key={plan.id} value={plan.id.toString()}>
                                                    {plan.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="billingCycle"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Billing Cycle</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={"Select cycle"} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="MONTHLY">Monthly</SelectItem>
                                            <SelectItem value="YEARLY">Yearly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="couponCode"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Coupon Code (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter coupon code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    {couponValidationResult && (
                                        <p className={`mt-1 text-sm ${couponValidationResult.valid ? "text-green-600" : "text-red-600"}`}>
                                            {couponValidationResult.message}
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Price Display Card */}
                    {(selectedPlan && billingCycle) && (
                        <div className="col-span-1 md:col-span-2">
                            <Card>
                                <CardContent className="pt-6">
                                    {isLoadingPrice ? (
                                        <p className="text-center text-muted-foreground">Calculating price...</p>
                                    ) : priceData ? (
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-muted-foreground flex items-center gap-2">
                                                    <DollarSign className="h-4 w-4" />
                                                    Base Price ({priceData.billingCycle})
                                                </span>
                                                <span className="font-medium">${priceData.basePrice.toFixed(2)}</span>
                                            </div>
                                            {priceData.discount > 0 && (
                                                <div className="flex justify-between items-center text-green-600">
                                                    <span className="text-sm flex items-center gap-2">
                                                        Discount
                                                    </span>
                                                    <span className="font-medium">-${priceData.discount.toFixed(2)}</span>
                                                </div>
                                            )}
                                            <div className="border-t pt-3 flex justify-between items-center">
                                                <span className="font-semibold">Final Price</span>
                                                <span className="text-2xl font-bold text-primary">
                                                    ${priceData.finalPrice.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-center text-muted-foreground">Select plan and billing cycle to see price</p>
                                    )}
                                </CardContent>
                            </Card>

                        </div>
                    )}
                    <ButtonComponent
                        type="submit"
                        clasName="w-full h-11"
                        varient="yellow"
                        buttonName={form.formState.isSubmitting ? "Processing..." : "Create Organization"}
                        disabled={form.formState.isSubmitting}
                    />
                </form>
            </Form>
        </div>
    );
}