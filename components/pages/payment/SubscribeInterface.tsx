'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { calculatePrice } from "@/service/coupon/couonService";
import { validateCouponCode } from "@/service/coupon/couonService"; // Add this import
import { initiatePayment } from "@/service/sslCommerze/ssl";
import { TOrganization } from "@/types/organization/organization.type";
import { TPlan } from "@/types/plan.types";
import { debounce } from "@/utills/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

interface PriceData {
    basePrice: number;
    discount: number;
    finalPrice: number;
    billingCycle: string;
}

export default function SubscribeInterface({
    plan,
    organization,
}: {
    plan: TPlan;
    organization: TOrganization;
}) {
    const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY" |"">("");
    const [couponCode, setCouponCode] = useState("");
    const [couponValidationResult, setCouponValidationResult] = useState<any>(null);
    const [priceData, setPriceData] = useState<PriceData | null>(null);
    const [isLoadingPrice, setIsLoadingPrice] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchPrice = useCallback(
        async (planId: string | number, cycle: string, coupon?: string) => {
            if (!planId || !cycle) return;

            setIsLoadingPrice(true);
            try {
                const res = await calculatePrice({
                    planId: Number(planId),
                    billingCycle: cycle,
                    couponCode: coupon || undefined,
                });
                console.log("planId->", planId, " ", cycle);
                console.log("res from fetch price->> ", res);
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
        },
        []
    );

    // Debounced coupon validation
    const debouncedValidateCoupon = useMemo(
        () =>
            debounce(async (coupon: string) => {
                if (!coupon) {
                    setCouponValidationResult(null);
                    if (plan?.id && billingCycle) {
                        fetchPrice(plan.id, billingCycle);
                    }
                    return;
                }

                const res = await validateCouponCode(coupon);
                if (res.success) {
                    setCouponValidationResult({ valid: true, message: "Coupon is valid!" });
                    if (plan?.id && billingCycle) {
                        fetchPrice(plan.id, billingCycle, coupon);
                    }
                } else {
                    setCouponValidationResult({
                        valid: false,
                        message: res.message || "Invalid coupon code",
                    });
                    if (plan?.id && billingCycle) {
                        fetchPrice(plan.id, billingCycle);
                    }
                }
            }, 500),
        [plan?.id, billingCycle, fetchPrice]
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
        if (plan?.id && billingCycle) {
            fetchPrice(plan.id, billingCycle, couponCode || undefined);
        } else {
            setPriceData(null);
        }
    }, [plan?.id, billingCycle, fetchPrice, couponCode]);

    const handleNext = () => {
        if (!billingCycle) return;
        // Next step logic here
        console.log("Proceeding with:", { plan, billingCycle, priceData });
    };


    const handleSubmit = async () => {
        if (!billingCycle) {
            toast.error("Please select a billing cycle");
            return;
        }

        const toastId = toast.loading("Processing payment...");
        setIsSubmitting(true);

        try {
            // Prepare purchase payload
            const purchasePayload = {
                planId: plan.id,
                billingCycle: billingCycle,
                customerName: organization.owner.name,
                customerEmail: organization.owner.email,
                customerPhone: organization.phone,
                customerAddress: organization.owner.address,
                customerCity: organization.owner.city,
                customerPostcode: "", // Add if you have this field
                customerCountry: organization.owner.country,
                couponCode: couponCode || undefined,
                organizationId: organization.id,
            };

            console.log("Purchase Payload:", purchasePayload);

            // Initiate payment
            const purchaseRes = await initiatePayment(purchasePayload);

            if (purchaseRes.success) {
                toast.success("Subscription initiated successfully!", {
                    id: toastId,
                    duration: 5000,
                });

                // Redirect to payment URL
                window.location.href = purchaseRes.data.paymentUrl;

                // Reset form
                setBillingCycle("");
                setCouponCode("");
                setPriceData(null);
                setCouponValidationResult(null);
            } else {
                toast.error(`Payment failed: ${purchaseRes.message}`, {
                    id: toastId,
                });
            }
        } catch (error: any) {
            console.error("Payment error:", error);
            toast.error(`Error: ${error.message || "Something went wrong"}`, {
                id: toastId,
            });
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div className="mx-auto w-full p-6 space-y-6 ">
            <div className="grid grid-cols-2 gap-6">
                {/* Plan Information */}
                <div className="effect rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-4">{plan.name} Plan</h2>
                    {plan.description && (
                        <p className="text-gray-600 mb-4">{plan.description}</p>
                    )}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-semibold">Max Users:</span> {plan.maxUsers}
                        </div>
                        <div>
                            <span className="font-semibold">Max Customers:</span> {plan.maxCustomers}
                        </div>
                        <div>
                            <span className="font-semibold">Max Products:</span> {plan.maxProducts}
                        </div>
                        <div>
                            <span className="font-semibold">Max Storage:</span> {plan.maxStorage} MB
                        </div>
                    </div>
                </div>

                {/* Organization & Owner Information */}
                <div className="effect rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold mb-4">Organization Details</h3>
                    <div className="space-y-2 text-sm">
                        <div>
                            <span className="font-semibold">Organization:</span> {organization.name}
                        </div>
                        <div>
                            <span className="font-semibold">Email:</span> {organization.email}
                        </div>
                        <div>
                            <span className="font-semibold">Owner:</span> {organization?.owner?.name}
                        </div>
                        <div>
                            <span className="font-semibold">Current Plan:</span> {organization?.plan?.name}
                        </div>
                    </div>
                </div>

                {/* Billing Cycle Selection */}
                <div className="effect rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold mb-4">Select Billing Cycle *</h3>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer ">
                            <input
                                type="radio"
                                name="billingCycle"
                                value="MONTHLY"
                                checked={billingCycle === "MONTHLY"}
                                onChange={(e) => setBillingCycle(e.target.value as "MONTHLY")}
                                className="w-4 h-4"
                            />
                            <div className="flex-1">
                                <span className="font-semibold">Monthly</span>
                                <p className="text-sm text-gray-600">
                                    ${plan.priceMonthly}/month
                                </p>
                            </div>
                        </label>

                        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer ">
                            <input
                                type="radio"
                                name="billingCycle"
                                value="YEARLY"
                                checked={billingCycle === "YEARLY"}
                                onChange={(e) => setBillingCycle(e.target.value as "YEARLY")}
                                className="w-4 h-4"
                            />
                            <div className="flex-1">
                                <span className="font-semibold">Yearly</span>
                                <p className="text-sm text-gray-600">
                                    ${plan.priceYearly}/year (Save{" "}
                                    {(
                                        ((Number(plan.priceMonthly) * 12 -
                                            Number(plan.priceYearly)) /
                                            (Number(plan.priceMonthly) * 12)) *
                                        100
                                    ).toFixed(0)}
                                    %)
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Coupon Code */}
                <div className="effect rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold mb-4">Apply Coupon Code</h3>
                    <div className="space-y-2">
                        <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter coupon code"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {couponValidationResult && (
                            <p
                                className={`text-sm ${couponValidationResult.valid
                                    ? "text-green-600"
                                    : "text-red-600"
                                    }`}
                            >
                                {couponValidationResult.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Price Summary */}
            {isLoadingPrice ? (
                <div className="effect rounded-lg shadow p-6">
                    <p className="text-center text-gray-500">Calculating price...</p>
                </div>
            ) : (
                priceData && (
                    <div className="effect rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold mb-4">Price Summary</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Base Price:</span>
                                <span className="font-semibold">
                                    ${priceData.basePrice.toFixed(2)}
                                </span>
                            </div>
                            {priceData.discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount:</span>
                                    <span className="font-semibold">
                                        -${priceData.discount.toFixed(2)}
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between text-xl font-bold border-t pt-2">
                                <span>Total:</span>
                                <span>${priceData.finalPrice.toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                                Billing Cycle: {priceData.billingCycle}
                            </p>
                        </div>
                    </div>
                )
            )}

            {/* Next Button */}
            <div className="flex justify-end gap-4">
                <button
                    onClick={handleSubmit}
                    disabled={!billingCycle || isSubmitting}
                    className={`px-6 py-3 rounded-lg font-semibold transition ${billingCycle && !isSubmitting
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    {isSubmitting ? "Processing..." : "Proceed to Payment"}
                </button>
            </div>
        </div>
    );
}