"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { Checkbox } from "@/components/ui/checkbox";

type TLeadsData = {
  leadId: string;
  leadName: string;
  phone: string;
  source: string;
  interested: string;
  tag: "Hot" | "Warm" | "Cold";
  priority: "Low" | "Medium" | "High";
};

type TLeadsTableProps = {
  selectedLeads: string[];
  setSelectedLeads: Dispatch<SetStateAction<string[]>>;
};

const AssignLeadsTable = ({
  selectedLeads,
  setSelectedLeads,
}: TLeadsTableProps) => {
  const headers = [
    "Lead ID",
    "Lead Name",
    "Mobile Number",
    "Lead Source",
    "Interested Product",
    "Tag",
    "Priority",
    "Action",
  ];

  const leadsdata: TLeadsData[] = [
    {
      leadId: "LD-98989",
      leadName: "Aminul Islam",
      phone: "01785847874",
      source: "Facebook",
      interested: "RB3025",
      tag: "Hot",
      priority: "High",
    },
    {
      leadId: "LD-98990",
      leadName: "Sabbir Ahmed",
      phone: "01876453219",
      source: "Website",
      interested: "RB4010",
      tag: "Warm",
      priority: "Medium",
    },
    {
      leadId: "LD-98991",
      leadName: "Nusrat Jahan",
      phone: "01983214567",
      source: "Instagram",
      interested: "RB3025",
      tag: "Hot",
      priority: "High",
    },
    {
      leadId: "LD-98992",
      leadName: "Tanvir Hasan",
      phone: "01694567832",
      source: "Google Ads",
      interested: "RB5090",
      tag: "Cold",
      priority: "Low",
    },
    {
      leadId: "LD-98993",
      leadName: "Mahi Akter",
      phone: "01745678921",
      source: "Facebook",
      interested: "RB4010",
      tag: "Warm",
      priority: "Medium",
    },
    {
      leadId: "LD-98994",
      leadName: "Imran Hossain",
      phone: "01567893421",
      source: "Referral",
      interested: "RB3025",
      tag: "Hot",
      priority: "High",
    },
    {
      leadId: "LD-98995",
      leadName: "Jannatul Ferdous",
      phone: "01834567982",
      source: "Instagram",
      interested: "RB5090",
      tag: "Warm",
      priority: "Medium",
    },
    {
      leadId: "LD-98996",
      leadName: "Rifat Khan",
      phone: "01956473829",
      source: "Website",
      interested: "RB4010",
      tag: "Cold",
      priority: "Low",
    },
    {
      leadId: "LD-98997",
      leadName: "Sadia Rahman",
      phone: "01678923456",
      source: "Facebook",
      interested: "RB3025",
      tag: "Hot",
      priority: "High",
    },
    {
      leadId: "LD-98998",
      leadName: "Arif Hossain",
      phone: "01793456128",
      source: "Google Ads",
      interested: "RB5090",
      tag: "Warm",
      priority: "Medium",
    },
  ];

  const allSelected = selectedLeads.length === leadsdata.length;

  return (
    <div className="overflow-x-auto w-full ">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead first>
              <div className="flex items-center justify-between px-6">
                {/* Select all checkbox */}
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) => {
                    setSelectedLeads(
                      checked ? leadsdata.map((l) => l.leadId) : []
                    );
                  }}
                  className="h-4 w-4 rounded-none border border-white/30 data-[state=checked]:border-brand [&>span]:flex [&>span]:items-center [&>span]:justify-center [&_svg]:h-3 [&_svg]:w-3 data-[state=checked]:text-brand cursor-pointer"
                />
                <span className="text-left text-xs font-semibold uppercase text-muted-foreground">
                  Lead ID
                </span>
              </div>
            </TableHead>

            {headers.slice(1).map((label, ind) => (
              <TableHead
                key={label}
                first={false}
                last={ind === headers.length - 2}
              >
                <div className="flex items-center justify-center">
                  <span className="text-left text-xs font-semibold uppercase text-muted-foreground">
                    {" "}
                    {label}
                  </span>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {leadsdata.map((lead, i) => (
            <TableRow key={i} className="group">
              <TableCell>
                <div className="text-sm flex items-center justify-between w-full px-8">
                  <Checkbox
                    checked={selectedLeads.includes(lead.leadId)}
                    onCheckedChange={(checked) => {
                      setSelectedLeads((prev) =>
                        checked
                          ? [...prev, lead.leadId]
                          : prev.filter((id) => id !== lead.leadId)
                      );
                    }}
                    className="h-4 w-4 rounded-none border border-white/30 data-[state=checked]:border-brand [&>span]:flex [&>span]:items-center [&>span]:justify-center [&_svg]:h-3 [&_svg]:w-3 data-[state=checked]:text-brand cursor-pointer"
                  />
                  {lead?.leadId}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {lead?.leadName}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {lead?.phone}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {lead?.source}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {lead?.interested}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {lead?.tag}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {lead?.priority}
                </div>
              </TableCell>
              <TableCell className="px-4 py-3 text-center ">
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer">
                    <MoreVertical className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-[180px] flex flex-col "
                  >
                    <Link href={`/dashboard/customers/${2}`}>
                      <DropdownMenuItem className="cursor-pointer">
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <Pencil className="w-4 h-4 mr-2" />
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      //   onClick={() => {
                      //     setDeleteProductId(product.id);
                      //     setDeleteDialogOpen(true);
                      //   }}
                      className="cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 text-destructive mr-2" />
                      Delete
                    </DropdownMenuItem>
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

export default AssignLeadsTable;
