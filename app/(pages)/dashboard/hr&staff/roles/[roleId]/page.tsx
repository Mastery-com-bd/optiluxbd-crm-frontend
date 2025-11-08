import RoleForm from "@/components/pages/dashboard/hr&staff/roles/roleForm";
import { allPermissions, roles } from "@/constants/roles";

const Page = async ({ params }: { params: Promise<{ roleId: string }> }) => {
  const roleId = await params.then((params) => params.roleId);

  const existingRole = roles.find((role) => role.id === Number(roleId));

  console.log("existingRole :", existingRole);

    return (
    <div>
      <RoleForm
        mode={`${roleId === "add" ? "create" : "edit"}`}
        allPermissions={allPermissions}
        existingRole={existingRole}
      />
    </div>
  );
};

export default Page;
