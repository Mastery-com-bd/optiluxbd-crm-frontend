import AllUsers from "@/components/pages/dashboard/admin/users/all-users";
import { GetAllRolesForOrganization } from "@/service/rolesAndPermission";
import {
  getAllOrganizationUser,
  getOrganizationUserById,
  getUserById,
} from "@/service/user";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const userId = params.userId;
  const userData = await getAllOrganizationUser();
  const rolesData = await GetAllRolesForOrganization();
  let userDetails = null;

  if (userId) {
    userDetails = await getOrganizationUserById(userId?.toString() || "");
  }

  return (
    <div>
      {/* {userDetails && <p>User Details: {JSON.stringify(userDetails)}</p>} */}
      <AllUsers userData={userData} rolesData={rolesData} userDetails={userDetails} />
    </div>
  );
};

export default Page;
