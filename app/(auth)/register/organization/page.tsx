import LoginText from "@/components/auth/login/LoginText";
import OrganizationRegisterForm from "@/components/auth/register/organization/OrganizationRegisterForm";
import { TSearchParams } from "@/types/shared";

type Query = {
    planId: string;
    slug: string;
}

export default async function OrganizationRegister({
    searchParams,
}: {
    searchParams: TSearchParams;
}) {
    const query = await searchParams;
    console.log(query)
    return (
        <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-x-6 lg:gap-x-56">
            <LoginText />
            <OrganizationRegisterForm planData={query as Query} />
        </section>
    )
}
