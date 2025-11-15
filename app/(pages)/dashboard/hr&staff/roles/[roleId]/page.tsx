import RoleForm from "@/components/pages/dashboard/hr&staff/roles/roleForm";
import { allPermissions } from "@/constants/roles";

const Page = async ({ params }: { params: Promise<{ roleId: string }> }) => {
  const roleId = await params.then((params) => params.roleId);

  return (
    <div>
      <RoleForm
        mode={`${roleId === "add" ? "create" : "edit"}`}
        roleId={roleId}
        allPermissions={allPermissions}
      />
    </div>
  );
};

export default Page;
