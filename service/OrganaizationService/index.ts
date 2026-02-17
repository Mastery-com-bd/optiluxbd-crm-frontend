import { TOrgPayload } from "@/types/organization/organization.type";
import { createPublicData, readData } from "../apiService/crud";

//public api call
export async function createOrganization(data: TOrgPayload) {
  try {
    const res = await createPublicData<TOrgPayload>(
      "/organizations/register",
      "/admin/organizations",
      data,
    );
    return res;
  } catch (e) {
    return e;
  }
}

//private api call
export async function getMyOrganization() {
  const res = await readData("/organizations/me", ["Organization"]);
  return res;
}
