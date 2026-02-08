/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPublicData } from "../apiService/crud";

export async function initiatePayment(purchasePayload: any) {
    try {
        const res = await createPublicData("/payments/sslcommerz/initiate", "", purchasePayload);
        console.log("payment res ->> ", res);
        return res;
    } catch (error: any) {
        return error;
    }
}