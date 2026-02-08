import { createPublicData } from "../apiService/crud";

export async function validateCouponCode(code: string,) {
    const res = await createPublicData(`/subscriptions/coupons/validate`, "Coupon", {
        "couponCode": code
    });
    return res;
}

export async function calculatePrice(data: { planId: number | string; billingCycle: string; couponCode?: string }) {
  const res = await createPublicData(`/subscriptions/calculate-price`, "PriceCalculation", data);
  return res;
}