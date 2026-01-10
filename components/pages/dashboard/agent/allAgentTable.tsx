'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVerticalIcon, Search } from "lucide-react";
import { useState } from "react";

const AllAgentTable = () => {
  const [teamValue, setTeamValue] = useState("all");
  const [levelValue,setLevelValue] = useState("all");
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
        <div className="flex flex-wrap items-center gap-3">
  {/* Team Select */}
  <Select
    value={teamValue} // Apnar state variable (e.g., const [teamValue, setTeamValue] = useState(""))
    onValueChange={(value) => {
      setTeamValue(value);
      // Jodi filter thake tahole niche set korun
      // setFilters((prev) => ({
      //   ...prev,
      //   team: value === "all" ? undefined : value,
      //   page: 1,
      // }));
    }}
  >
    <SelectTrigger className="w-40" aria-label="Team Filter">
      <SelectValue placeholder="Team" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All Teams</SelectItem>
      <SelectItem value="Profile">Profile</SelectItem>
      <SelectItem value="Billing">Billing</SelectItem>
      <SelectItem value="Team">Team</SelectItem>
      <SelectItem value="Subscription">Subscription</SelectItem>
    </SelectContent>
  </Select>

  {/* Level Select */}
  <Select
    value={levelValue} 
    onValueChange={(value) => {
      setLevelValue(value);
      // setFilters((prev) => ({
      //   ...prev,
      //   level: value === "all" ? undefined : value,
      //   page: 1,
      // }));
    }}
  >
    <SelectTrigger className="w-40" aria-label="Level Filter">
      <SelectValue placeholder="Level" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All Levels</SelectItem>
      <SelectItem value="Profile">Profile</SelectItem>
      <SelectItem value="Billing">Billing</SelectItem>
      <SelectItem value="Team">Team</SelectItem>
      <SelectItem value="Subscription">Subscription</SelectItem>
    </SelectContent>
  </Select>

  {/* Grid View Toggle Button */}
  {/* <Button
    variant="default"
    className="rounded-full cursor-pointer effect size-10 flex items-center justify-center"
    onClick={() => setIsGridView((prev) => !prev)}
  >
    <Grid2X2 className="size-4" />
  </Button> */}
</div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {[
              "Agent Name",
              "Agent ID",
              "Team Name",
              "Today’s Calls",
              "Conversion Rate",
              "Level",
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

export default AllAgentTable;
