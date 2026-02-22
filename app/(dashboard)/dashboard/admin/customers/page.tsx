import Customers from "@/components/pages/dashboard/admin/customers/customers/Customers";
import { getAllCustomer } from "@/service/custoemr";
import { Query, TSearchParams } from "@/types/shared";

const AllCustomersPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const result = await getAllCustomer(query as Query);
  const custoemrs = result?.data || [];
  const meta = result?.pagination;
  return (
    <div>
      <Customers customers={custoemrs} meta={meta} />
    </div>
  );
};

export default AllCustomersPage;
