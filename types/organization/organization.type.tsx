/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import { TPlan } from "../plan.types";
import { TOwner } from "../user/user.types";

export const orgSchema = () => z.object({
    name: z.string().min(2, "Name is required"), //
    email: z.string().email("Invalid email"), //
    ownerName: z.string().min(2, "Owner name is required"), //
    ownerEmail: z.string().email("Invalid owner email"), //
    ownerPassword: z.string().min(8, "Password must be at least 8 characters"), //
    phone: z.string().min(10, "Phone number is required"), //
    address: z.string().min(5, "Address is required"), //
    city: z.string().min(2, "City is required"), //
    country: z.string().min(2, "Country is required"), //
    website: z.string().url("Invalid website URL").optional(), //
    slug: z.string().min(2, "Slug is required"), //
    couponCode: z.string().optional(), //
    planId: z.number().or(z.string()), //
    planSlug: z.string().min(1, "Plan name is required"), //
    postCode: z.string().min(2, "Post code is required"), //
    billingCycle: z.enum(["MONTHLY", "YEARLY"], {
        message: "Please select a billing cycle",
    }), //
});

export type OrgFormValues = z.infer<ReturnType<typeof orgSchema>>;


export type TOrgPayload = {
    name: string;
    slug: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    ownerName: string;
    ownerEmail: string;
    ownerPassword: string;
    plan: string;
    billingCycle: "MONTHLY" | "YEARLY";
}


export interface TOrganization {
    id: number;
    name: string;
    slug: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    logo_url: string | null;
    logo_public_id: string | null;
    website: string | null;
    planId: number;
    planExpiresAt: string;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    maxUsers: number;
    maxCustomers: number;
    maxLocations: number;
    maxProducts: number;
    maxOrdersPerMonth: number;
    maxApiCalls: number;
    featureOverrides: Record<string, any>;
    timezone: string;
    currency: string;
    dateFormat: string;
    allowedDomains: string[];
    ipWhitelist: string[];
    isActive: boolean;
    isSuspended: boolean;
    suspendedAt: string | null;
    suspendedReason: string | null;
    onboardingStep: number;
    isOnboardingComplete: boolean;
    createdAt: string;
    updatedAt: string;
    trialEndsAt: string | null;
    plan: TPlan;
    owner: TOwner;
}