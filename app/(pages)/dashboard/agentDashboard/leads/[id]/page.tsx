import CustomerProfile from "@/components/pages/dashboard/agentDashboard/customerProfile/CustomerProfile";

const CustomerProfilePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <section>
      <CustomerProfile id={id} />
    </section>
  );
};

export default CustomerProfilePage;
