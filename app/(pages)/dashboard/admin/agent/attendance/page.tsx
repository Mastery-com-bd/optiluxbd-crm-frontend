import AttendanceChart from "@/components/pages/dashboard/agent/attendence/attendenceChart";
import AttendenceOverview from "@/components/pages/dashboard/agent/attendence/attendenceOverview";
import AttendenceTable from "@/components/pages/dashboard/agent/attendence/attendenceTable";
import WeeklyAttendanceChart from "@/components/pages/dashboard/agent/attendence/weeklyAttendence";


const Page = () => {
  return (
    <div className=" min-h-screen ">
      <AttendenceOverview />
      <div className="flex gap-8 items-center justify-center mt-8">
        <AttendanceChart />
        <WeeklyAttendanceChart />
      </div>
      <AttendenceTable />
    </div>
  );
};

export default Page;
