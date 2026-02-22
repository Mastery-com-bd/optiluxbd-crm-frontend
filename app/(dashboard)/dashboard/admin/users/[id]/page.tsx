import UserDetails from "@/components/pages/dashboard/admin/users/details/user-details";
import { getOrganizationUserById } from "@/service/user";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;


  const userDetails = await getOrganizationUserById(id);


  return <UserDetails userDetails={userDetails} />;
};

export default Page;
