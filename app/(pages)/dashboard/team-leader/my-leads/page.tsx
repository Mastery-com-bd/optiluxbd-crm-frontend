'use client'
// app/page.tsx (or any component file)
import CustomPagination from "@/components/ui/CustomPagination";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lead } from "@/types/teamleader.types";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { User, Users, Phone, Mail, MoreVertical, Pencil, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const statsFromBackend = [
    { id: 1, title: "Total Leads", value: 38, description: "Total leads received" },
    { id: 2, title: "Active Leads", value: 18, description: "Currently active leads" },
    { id: 3, title: "Contacted", value: 22, description: "Leads already contacted" },
    { id: 4, title: "Email Leads", value: 12, description: "Leads contacted via email" },
];

const styleConfig = [
    {
        from: "from-[#2a86ff34]", text: "#2A85FF",
        icon: <Users className="text-[#2A85FF] w-6 h-6" />
    },
    {
        from: "from-[#00a65633]", text: "#00A656",
        icon: <User className="text-[#00A656] w-6 h-6" />
    },
    {
        from: "from-[#ff9d3426]", text: "#FF9D34",
        icon: <Phone className="text-[#FF9D34] w-6 h-6" />
    },
    {
        from: "from-[#7f5fff34]", text: "#7F5FFF",
        icon: <Mail className="text-[#7F5FFF] w-6 h-6" />
    },
];
const myLeads = [
    {
        id: 0,
        "leadId": "LD-98989",
        "leadName": "Aminul Islam",
        "mobileNumber": "01780530300",
        "leadSource": "Facebook",
        "interestedProduct": "RB3025",
        "status": "Assigned",
        "priority": "High"
    },
    {
        id: 1,
        "leadId": "LD-98989",
        "leadName": "Fatema Rahman",
        "mobileNumber": "01518660316",
        "leadSource": "Website",
        "interestedProduct": "RB3025",
        "status": "Assigned",
        "priority": "Medium"
    },
    {
        id: 2,
        "leadId": "LD-98989",
        "leadName": "Shakib Al Hasan",
        "mobileNumber": "01518660316",
        "leadSource": "Organic",
        "interestedProduct": "PR17WS",
        "status": "Assigned",
        "priority": "Low"
    },
    {
        id: 3,
        "leadId": "LD-98989",
        "leadName": "Nusrat Jahan",
        "mobileNumber": "01518660316",
        "leadSource": "Referral",
        "interestedProduct": "BLBOO1",
        "status": "Unassigned",
        "priority": "High"
    },
    {
        id: 4,
        "leadId": "LD-98989",
        "leadName": "Rashidul Karim",
        "mobileNumber": "01518660316",
        "leadSource": "Whatsapp",
        "interestedProduct": "BLBOO1",
        "status": "Unassigned",
        "priority": "Low"
    },
    {
        id: 5,
        "leadId": "LD-98989",
        "leadName": "Sadia Begum",
        "mobileNumber": "01780530300",
        "leadSource": "Facebook",
        "interestedProduct": "RB3025",
        "status": "Unassigned",
        "priority": "Low"
    },
    {
        id: 6,
        "leadId": "LD-98989",
        "leadName": "Tariq Ahmed",
        "mobileNumber": "01780530300",
        "leadSource": "Organic",
        "interestedProduct": "PR17WS",
        "status": "Assigned",
        "priority": "High"
    },
    {
        id: 7,
        "leadId": "LD-98989",
        "leadName": "Zainab Sultana",
        "mobileNumber": "01780530300",
        "leadSource": "Facebook",
        "interestedProduct": "PR17WS",
        "status": "Assigned",
        "priority": "High"
    }
]
const keys = [
    "checkbox", "LeadID", "Lead Name", "Mobile Number", "Lead Source", "Interested Product", "Status", "Priority", "Action",
]
const Page = () => {
    const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
    const toggleSelection = (leadId: number) => {
        setSelectedLeads((prev) =>
            prev.includes(leadId)
                ? prev.filter((id) => id !== leadId)
                : [...prev, leadId]
        );
    };

    const toggleSelectAll = () => {
        const currentOrderIds = myLeads.map((lead: Lead) => lead.id);
        const allSelected = currentOrderIds.every((id: number) =>
            selectedLeads.includes(id)
        );
        if (allSelected) {
            setSelectedLeads((prev) =>
                prev.filter((id) => !currentOrderIds.includes(id))
            );
        } else {
            const newSelections = currentOrderIds.filter(
                (id: number) => !selectedLeads.includes(id)
            );
            setSelectedLeads((prev) => [...prev, ...newSelections]);
        }
    };

    const allPageLeadsSelected =
        myLeads.length > 0 &&
        myLeads.every((lead: Lead) => selectedLeads.includes(lead.id));
    return (
        <div className="p-6 ">
            <h3 className="text-xl font-semibold mb-6">My Leads</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsFromBackend.map((card, index) => {
                    const styles = styleConfig[index % styleConfig.length];
                    return (
                        <div key={card.id} className="bgGlass rounded-2xl! overflow-hidden">
                            <div
                                className={`bg-linear-to-br ${styles.from} to-[#7f5fff04] text-white p-4 shadow-md`}
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className={`text-lg font-semibold `}>{card.title}</h4>
                                    {styles.icon}
                                </div>
                                <p className={`text-3xl mt-4 font-bold text-[${styles.text}]`}>{card.value}</p>
                                <p className="text-sm mt-2 text-gray-300">{card.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="my-4">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            {keys.map((label, ind) => (
                                <TableHead
                                    first={ind === 0}
                                    last={ind === keys.length - 1}
                                    key={label}
                                    className="text-left text-xs font-semibold uppercase text-muted-foreground"
                                >
                                    {label === "checkbox" ? (
                                        <input
                                            className="cursor-pointer"
                                            type="checkbox"
                                            checked={allPageLeadsSelected}
                                            onChange={toggleSelectAll}
                                        />
                                    ) : (
                                        label
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {myLeads?.map((lead: Lead) => (
                            <TableRow
                                key={lead.id}
                                className="border-muted hover:bg-muted/50 transition-colors"
                            >
                                <TableCell className="px-4 py-3">
                                    <input
                                        className="cursor-pointer"
                                        type="checkbox"
                                        checked={selectedLeads.includes(lead.id)}
                                        onChange={() => toggleSelection(lead.id)}
                                    />
                                </TableCell>
                                <TableCell className="px-4 py-3">{lead.leadId}</TableCell>
                                <TableCell className="px-4 py-3">{lead.leadName}</TableCell>
                                <TableCell className="px-4 py-3 text-sm text-center">{lead.mobileNumber}</TableCell>
                                <TableCell className="px-4 py-3 text-sm text-center">{lead.leadSource}</TableCell>
                                <TableCell className="px-4 py-3 text-sm font-medium text-center">{lead.interestedProduct}</TableCell>

                                {/* ✅ Styled Status Pill */}
                                <TableCell className="px-4 py-3 text-sm font-semibold text-center">
                                    <span
                                        className={`px-4 py-1 text-sm font-medium rounded-md
                                                         ${lead.status === "Assigned"
                                                ? "bg-green-800/30 text-green-400 border border-green-500/30"
                                                : "bg-red-800/30 text-red-400 border border-red-500/30"
                                            }`}
                                    >
                                        {lead.status}
                                    </span>
                                </TableCell>

                                {/* ✅ Styled Priority Pill */}
                                <TableCell className="px-4 py-3 text-center">
                                    <span
                                        className={`px-4 py-1 text-sm font-medium rounded-md border ${lead.priority === "High"
                                            ? "bg-red-800/30 text-red-400 border-red-500/30"
                                            : lead.priority === "Medium"
                                                ? "bg-yellow-800/30 text-yellow-300 border-yellow-400/30"
                                                : "bg-blue-800/30 text-blue-300 border-blue-400/30"
                                            }`}
                                    >
                                        {lead.priority}
                                    </span>
                                </TableCell>

                                {/* Action Dropdown */}
                                <TableCell className="px-4 py-3 text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="cursor-pointer">
                                            <MoreVertical className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-[180px] flex flex-col">
                                            <Link href={`/dashboard/admin/products/all-products/${lead.id}`}>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Eye className="w-4 h-4 mr-2" /> View
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Pencil className="w-4 h-4 mr-2" /> Update
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Trash2 className="w-4 h-4 text-destructive mr-2" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* <CustomPagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={(page) => setFilters({ ...filters, page })}
                /> */}
            </div>
        </div>
    );
};

export default Page;