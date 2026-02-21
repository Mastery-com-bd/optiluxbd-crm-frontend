import AllUsers from "@/components/pages/dashboard/admin/users/all-users";
import { GetAllRolesForOrganization } from "@/service/rolesAndPermission";
import {
  getAllOrganizationUser,
  getOrganizationUserById,
} from "@/service/user";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const userId = params.userId;
  const userData = await getAllOrganizationUser({
    role: params.role,
    is_active: params.is_active,
    status: params.status,
    search: params.search,
    page: params.page,
    limit: params.limit,
    sort: params.sort,
    sortBy: params.sortBy,
  });
  const rolesData = await GetAllRolesForOrganization();
  let userDetails = null;

  if (userId) {
    userDetails = await getOrganizationUserById(userId?.toString() || "");
  }

  return (
    <div>
      <AllUsers
        userData={userData}
        rolesData={rolesData}
        userDetails={userDetails}
      />
    </div>
  );
};

export default Page;
