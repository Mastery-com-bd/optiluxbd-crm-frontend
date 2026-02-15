
import CreateCoupon from "./CreateScratchCard";
import BulkUploadCoupon from "./BulkUploadCoupon";

export default function HeaderActions() {
  return (
    <div className="flex gap-3">
      <CreateCoupon />
      <BulkUploadCoupon />
    </div>
  )
}