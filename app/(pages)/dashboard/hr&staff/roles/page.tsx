import AccessManagement from "@/components/pages/dashboard/hr&staff/roles/accessManagement";
import { roles } from "@/constants/roles";



const Page = () => {
  return (
    <div>
      <AccessManagement roles={roles} />
    </div>
  );
};

export default Page;
