import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MoreVerticalIcon, Search } from "lucide-react";

const ReturnTable = () => {
  return (
    <div className="py-7">
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-full max-w-[340px]">
          <Input
            placeholder="Search Order by ID"
            className="w-full "
            icon={<Search size={16} />}
          />
        </div>
        
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {[
              "Order ID",
              "Customer",
              "Mobile Number",
              "Address",
              "Interested Product",
              "Reason",
              "Amount",
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
                John Doe
              </TableCell>
              <TableCell className="text-center">AGT-00{i + 1}</TableCell>
              <TableCell className="text-center">Alpha Squad</TableCell>
              <TableCell className="text-center">42</TableCell>
              <TableCell className="text-center">23%</TableCell>
              <TableCell className="text-center">Gold</TableCell>
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

export default ReturnTable;
