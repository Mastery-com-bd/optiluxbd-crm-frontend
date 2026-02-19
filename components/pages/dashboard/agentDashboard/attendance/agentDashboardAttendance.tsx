import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

const AgentDashboardAttendance = () => {
  return (
    <div className="py-7">
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-full max-w-[340px]">
          <Input
            placeholder="Search by date"
            className="w-full "
            icon={<Search size={16} />}
          />
        </div>
        <div className="flex  gap-4">
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Absent">Absent</SelectItem>
              <SelectItem value="Present">Present</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="Leave">Leave</SelectItem>
              <SelectItem value="Late">Late</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {["Date", "Check In", "Check Out", "Working Hours", "Status"].map(
              (label, ind) => (
                <TableHead
                  first={ind === 0}
                  last={ind === 4}
                  key={label}
                  className="text-left text-xs font-semibold uppercase text-muted-foreground"
                >
                  {label}
                </TableHead>
              ),
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }, (_, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium text-center">
                15 Mar 2027
              </TableCell>
              <TableCell className="text-center">9:15 AM</TableCell>
              <TableCell className="text-center">5:15 PM</TableCell>
              <TableCell className="text-center">8 h 0 m</TableCell>
              <TableCell className="text-center">
                <LiquidGlass
                  borderRadius="8px"
                  className="inline-block px-6 py-1.5 rounded-lg text-[#22c55e] font-medium"
                >
                  Present
                </LiquidGlass>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AgentDashboardAttendance;
