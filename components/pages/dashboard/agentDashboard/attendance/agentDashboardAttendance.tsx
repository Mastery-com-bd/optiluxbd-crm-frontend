import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import {
  GLDropdownMenu,
  GLDropdownMenuContent,
  GLDropdownMenuItem,
  GLDropdownMenuLabel,
  GLDropdownMenuSeparator,
  GLDropdownMenuTrigger,
} from "@/components/ui/glass-dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDownIcon, Search } from "lucide-react";

const AgentDashboardAttendance = () => {
  return (
    <div>
      {" "}
      <div className="py-7">
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-full max-w-[340px]">
            <Input
              placeholder="Search by date"
              className="w-full "
              icon={<Search size={16} />}
            />
          </div>
          <div className="flex items-center gap-8">
            <GLDropdownMenu>
              <GLDropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center gap-2 focus:outline-none">
                  <span>Status</span> <ChevronDownIcon size={16} />
                </div>
              </GLDropdownMenuTrigger>
              <GLDropdownMenuContent>
                <GLDropdownMenuLabel>My Account</GLDropdownMenuLabel>
                <GLDropdownMenuSeparator />
                <GLDropdownMenuItem>Profile</GLDropdownMenuItem>
                <GLDropdownMenuItem>Billing</GLDropdownMenuItem>
                <GLDropdownMenuItem>Team</GLDropdownMenuItem>
                <GLDropdownMenuItem>Subscription</GLDropdownMenuItem>
              </GLDropdownMenuContent>
            </GLDropdownMenu>
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
                )
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
                <TableCell className="text-center">
                  <LiquidGlass
                    borderRadius="8px"
                    className="inline-block px-6 py-1.5 rounded-lg text-[#22c55e] font-medium"
                  >
                    Present
                  </LiquidGlass>
                </TableCell>
                <TableCell className="text-center">42</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AgentDashboardAttendance;
