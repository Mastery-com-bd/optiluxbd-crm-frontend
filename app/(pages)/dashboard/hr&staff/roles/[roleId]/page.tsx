import RoleForm from "@/components/pages/dashboard/hr&staff/roles/roleForm";

const Page = async ({ params }: { params: Promise<{ roleId: string }> }) => {
  const roleId = await params.then((params) => params.roleId);

  return (
    <div>
      <RoleForm
        mode={`${roleId === "add" ? "create" : "edit"}`}
        roleId={roleId}
      />
    </div>
  );
};

export default Page;
