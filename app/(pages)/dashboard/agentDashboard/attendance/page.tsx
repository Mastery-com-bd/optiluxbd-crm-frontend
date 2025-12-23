import AgentDashboardAttendance from "@/components/pages/dashboard/agentDashboard/attendance/agentDashboardAttendance";
import AttendanceStatus from "@/components/pages/dashboard/agentDashboard/attendance/attendanceStatus";

const Page = () => {
  return (
    <div>
      <AttendanceStatus />
      <AgentDashboardAttendance />
    </div>
  );
};

export default Page;
