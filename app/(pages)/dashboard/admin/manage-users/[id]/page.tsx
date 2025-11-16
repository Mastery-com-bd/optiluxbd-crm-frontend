import UserProfile from "@/components/pages/dashboard/admin/manageUsers/singleUSer/UserProfile";

const UserProfilePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <UserProfile id={id} />
    </div>
  );
};

export default UserProfilePage;
