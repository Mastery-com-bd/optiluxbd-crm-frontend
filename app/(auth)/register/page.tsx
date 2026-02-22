import LoginText from "@/components/auth/login/LoginText";
import OrganizationRegisterForm from "@/components/auth/register/organization/OrganizationRegisterForm";
import { TSearchParams } from "@/types/shared";
import authOptions from "@/utills/authOptions";
import { getServerSession } from "next-auth";

type Query = {
  planId: string;
  slug: string;
};

const RegistrationPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const session = await getServerSession(authOptions);

  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-x-6 lg:gap-x-56">
      <LoginText />
      {/* <RegisterComponent user={session?.user as TSocialUser} /> */}
      <OrganizationRegisterForm planData={query as Query} />
    </section>
  );
};

export default RegistrationPage;
