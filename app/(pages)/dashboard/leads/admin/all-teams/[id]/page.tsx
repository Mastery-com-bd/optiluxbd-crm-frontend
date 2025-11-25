import TeamDetails from "@/components/pages/dashboard/leads/admin/teamDetails/TeamDetails";

const LeaderDetailsPage = async ({
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

export default LeaderDetailsPage;
