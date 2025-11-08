import AllCustomersPage from "@/components/pages/dashboard/customers/allCustomers";
import { Customers } from "@/constants/customers";


const customers = Customers;

const Page = () => {
  return (
    <div>
      <AllCustomersPage AllCustomers={customers} />
    </div>
  );
};

export default Page;
