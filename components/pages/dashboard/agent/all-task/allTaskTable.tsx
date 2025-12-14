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

const AllTaskTable = () => {
  return (
    <div className="py-7">
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-full max-w-[340px]">
          <Input
            placeholder="Search Agent by name or ID"
            className="w-full "
            icon={<Search size={16} />}
          />
        </div>
        <div className="flex items-center gap-8">
          <GLDropdownMenu>
            <GLDropdownMenuTrigger className="focus:outline-none">
              <div className="flex items-center gap-2 focus:outline-none">
                <span>Team</span> <ChevronDownIcon size={16} />
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
          <GLDropdownMenu>
            <GLDropdownMenuTrigger className="focus:outline-none">
              <div className="flex items-center gap-2 focus:outline-none">
                <span>Level</span> <ChevronDownIcon size={16} />
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
              "Assigned Agent",
              "Last Call Date",
              "Next Action Date",
              "Interested Product ",
              "Status",
              "Action",
            ].map((label, ind) => (
              <TableHead
                first={ind === 0}
                last={ind === 8}
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
                John Doe
              </TableCell>
              <TableCell className="text-center">AGT-00{i + 1}</TableCell>
              <TableCell className="text-center">Alpha Squad</TableCell>
              <TableCell className="text-center">42</TableCell>
              <TableCell className="text-center">23%</TableCell>
              <TableCell className="text-center">Gold</TableCell>
              <TableCell className="text-center">Active</TableCell>
              <TableCell className="text-center">Active</TableCell>
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
  );
};

export default AllTaskTable;
