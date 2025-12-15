import CustomerProfile from "@/components/pages/dashboard/customers/CustomerDetails/CustomerProfile";
import EditCustomerPage from "@/components/pages/dashboard/customers/CustomerDetails/EditCustomerPage";

const CustomerdetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      {/* <EditCustomerPage /> */}
      <CustomerProfile id={id} />
    </div>
  );
};

export default CustomerdetailsPage;
