import TeamDetails from "@/components/pages/dashboard/admin/teamLeader/teamDetails/TeamDetails";

const TeamDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <section>
      <TeamDetails id={id} />
    </section>
  );
};

export default TeamDetailsPage;
