import AllUsers from "@/components/pages/dashboard/admin/users/all-users";
import { GetAllRolesForOrganization } from "@/service/rolesAndPermission";
import { getAllOrganizationUser } from "@/service/user";

const Page = async () => {
  const userData = await getAllOrganizationUser();
  const rolesData = await GetAllRolesForOrganization();

  console.log("All Users Data :", userData)

  return (
    <div>
      <AllUsers userData={userData} rolesData={rolesData} />
    </div>
  );
};

export default Page;
