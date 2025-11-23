import SteadfastStatusByConsignmentId from "@/components/pages/dashboard/couriar/steadfast-status/steadfastStatusConsignmentId";
import SteadfastStatusByInvoice from "@/components/pages/dashboard/couriar/steadfast-status/steadfastStatusInvoice";
import SteadfastStatusByTrackingCode from "@/components/pages/dashboard/couriar/steadfast-status/steadfastStatusTrackingCode";

const Page = () => {
  return (
    <div className="space-y-4">
      <SteadfastStatusByInvoice />
      <SteadfastStatusByConsignmentId />
      <SteadfastStatusByTrackingCode />
    </div>
  );
};

export default Page;
