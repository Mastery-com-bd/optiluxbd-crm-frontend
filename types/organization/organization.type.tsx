import * as z from "zod";

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
    postCode:z.string().min(2,"Post code is required"), //
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