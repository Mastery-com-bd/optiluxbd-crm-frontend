import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ChevronDownIcon, MoreVerticalIcon, Search } from "lucide-react";

const AgentLeadsTable = () => {
  return (
    <div>
      <div className="py-7">
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-full max-w-[340px]">
            <Input
              placeholder="Search Task ID"
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
              {[
                "Task ID",
                "Lead Name",
                "Phone",
                "Last Call Date",
                "Next Action Date",
                "Interested Product",
                "Status",
                "Action",
              ].map((label, ind) => (
                <TableHead
                  first={ind === 0}
                  last={ind === 7}
                  key={label}
                  className="text-left text-xs font-semibold uppercase text-muted-foreground"
                >
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }, (_, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium text-center">
                  AG10${i + 1}
                </TableCell>
                <TableCell className="text-center">Ayaan Khan</TableCell>
                <TableCell className="text-center">01780530300</TableCell>
                <TableCell className="text-center">Dec-01-2025</TableCell>
                <TableCell className="text-center">Dec-01-2025</TableCell>
                <TableCell className="text-center">RB3025</TableCell>
                <TableCell className="text-center">
                  <LiquidGlass
                    borderRadius="8px"
                    className="inline-block px-4 py-1.5 rounded-lg text-[#22c55e] font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <span>Interested</span> <ChevronDownIcon size={16} />
                    </div>
                  </LiquidGlass>
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                      <MoreVerticalIcon size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AgentLeadsTable;
