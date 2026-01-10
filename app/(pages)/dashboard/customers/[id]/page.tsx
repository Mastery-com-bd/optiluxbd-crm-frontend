import CustomerProfile from "@/components/pages/dashboard/admin/customers/CustomerDetails/CustomerProfile";

const CustomerDetailsPage = async ({
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

export default CustomerDetailsPage;
