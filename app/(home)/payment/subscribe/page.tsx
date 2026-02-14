import SubscribeInterface from "@/components/pages/payment/SubscribeInterface";
import { getMyOrganization } from "@/service/OrganaizationService";
import { getPlanById } from "@/service/planService";
import { TSearchParams } from "@/types/shared";

export default async function Subscribe({
    searchParams,
}: {
    searchParams: TSearchParams;
}) {
    const query = await searchParams;
    const [plan, organization] = await Promise.all([
        getPlanById(Number(query.planId)),
        getMyOrganization(),
    ]);
    console.log("plan:-> ", plan);
    console.log("organization:-> ", organization);
    return (
        <div className="min-h-screen flex max-w-[1444px] mx-auto justify-between items-center ">
            <SubscribeInterface plan={plan.data} organization={organization.success ? organization.data : null} />
        </div>
    )
}