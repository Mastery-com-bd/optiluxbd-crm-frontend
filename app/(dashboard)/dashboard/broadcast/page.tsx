import AllBroadcast from "@/components/pages/dashboard/broadcast/AllBroadcast";
import { getAllBroadcast } from "@/service/broadcast";

const BroadcastPage = async () => {
  const result = await getAllBroadcast();
  const boradcasts = result?.data || [];

  return (
    <div>
      <AllBroadcast broadcasts={boradcasts} />
    </div>
  );
};

export default BroadcastPage;
