
import TeamPerformanceOverview from "@/components/pages/dashboard/admin/landing/TeamPerformanceOverview";
import TeamStatsChart from "@/components/pages/dashboard/admin/landing/TeamStatsChart";
const page = () => {
    return (
        <div className="mt-4 ml-4">
            <TeamPerformanceOverview />
            <div className="mt-4">
                <TeamStatsChart />
            </div>
        </div>
    );
};

export default page;