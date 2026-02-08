import { TOrgPayload } from "@/types/organization/organization.type";
import { createPublicData } from "../apiService/crud";


export async function createOrganization(data: TOrgPayload) {
    try {
        const res = await createPublicData<TOrgPayload>("/organizations/register", "/admin/organizations", data);
        console.log("organization create res->> ",res)
        return res;
    }
    catch (e) { return e }
}