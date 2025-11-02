'use client'
import LiveAgentSnapshot from "@/components/pages/dashboard/admin/landing/LiveAgentSnapshot";
import LiveCallMonitoring from "@/components/pages/dashboard/admin/landing/LiveCallMonitoring";
import SingleTeam from "@/components/pages/dashboard/admin/landing/SingleTeam";
import TeamPerformanceOverview from "@/components/pages/dashboard/admin/landing/TeamPerformanceOverview";
import TeamPieChart from "@/components/pages/dashboard/admin/landing/TeamPieChart";
import TeamStatsChart from "@/components/pages/dashboard/admin/landing/TeamStatsChart";
import TodaySummaryMetrics from "@/components/pages/dashboard/admin/landing/TodaySummaryMetrics";
const page = () => {
    return (
        <div className="m-4">
            {/* <DateRangeSelector onChange={(val) => { console.log(val) }} /> */}
            <TeamPerformanceOverview />
            <TodaySummaryMetrics />
            <div className="mt-4 flex gap-6">
                <TeamStatsChart />
                <TeamPieChart />
            </div>
            <div className="flex gap-6">
                <LiveAgentSnapshot />
                <LiveCallMonitoring />
            </div>
            <SingleTeam />

        </div>
    );
};

export default page;