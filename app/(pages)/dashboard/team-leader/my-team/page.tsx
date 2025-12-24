'use client'
import StatsCard from "@/components/pages/dashboard/shared/StatsCard";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { debounce } from "@/utills/debounce";
import { Eye, MoreVertical, Pencil, Search, Trash2, X } from "lucide-react";
import { useState } from "react";
const myAgents = [
    { id: 1, name: "Ayaan Khan", agentId: "AG101", todaysCalls: 40, monthsConversion: "25%", todaysConversion: "25%", level: "Bronze", status: "Deactive" },
    { id: 2, name: "Fatima Ali", agentId: "AG202", todaysCalls: 30, monthsConversion: "25%", todaysConversion: "25%", level: "Silver", status: "Active" },
    { id: 3, name: "Samir Patel", agentId: "AG303", todaysCalls: 78, monthsConversion: "25%", todaysConversion: "25%", level: "Gold", status: "Active" },
    { id: 4, name: "Layla Rahman", agentId: "AG404", todaysCalls: 76, monthsConversion: "25%", todaysConversion: "25%", level: "Platinum", status: "Active" },
    { id: 5, name: "Omar Siddiqui", agentId: "AG505", todaysCalls: 45, monthsConversion: "25%", todaysConversion: "25%", level: "Diamond", status: "Deactive" },
    { id: 6, name: "Nadia Hussain", agentId: "AG606", todaysCalls: 82, monthsConversion: "25%", todaysConversion: "25%", level: "Legend", status: "Active" },
    { id: 7, name: "Rashid Khan", agentId: "AG707", todaysCalls: 91, monthsConversion: "25%", todaysConversion: "25%", level: "Sales Samurai", status: "Active" },
    { id: 8, name: "Zara Iqbal", agentId: "AG808", todaysCalls: 53, monthsConversion: "25%", todaysConversion: "25%", level: "Call Machine", status: "Deactive" },
];

const keys = [
    "checkbox",
    "Agent Name",
    "Agent ID",
    "Today's Calls",
    "This Month's Conversion",
    "Today's Conversion",
    "Level",
    "Status",
    "Action"
];

const MyTeam = () => {
    const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [filters, setFilters] = useState({
        limit: 10,
        page: 1,
        search: "",
        status: "",
        priority: "",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSearch = async (val: any) => {
        setFilters({ ...filters, search: val });
    };
    const debouncedLog = debounce(handleSearch, 1000, { leading: false });
    const toggleSelection = (agentId: string) => {
        setSelectedAgents((prev) =>
            prev.includes(agentId)
                ? prev.filter((id) => id !== agentId)
                : [...prev, agentId]
        );
    };

    const toggleSelectAll = () => {
        const currentOrderIds = myAgents.map((agent: Agent) => agent.agentId);
        const allSelected = currentOrderIds.every((id: string) =>
            selectedAgents.includes(id)
        );
        if (allSelected) {
            setSelectedAgents((prev) =>
                prev.filter((id) => !currentOrderIds.includes(id))
            );
        } else {
            const newSelections = currentOrderIds.filter(
                (id: string) => !selectedAgents.includes(id)
            );
            setSelectedAgents((prev) => [...prev, ...newSelections]);
        }
    };
    const allPageAgentsSelected =
        myAgents.length > 0 &&
        myAgents.every((agent: Agent) => selectedAgents.includes(agent.agentId));
    return (
        <div className="p-6 ">
            <h3 className="text-xl font-semibold mb-6">My agents</h3>
            <StatsCard />
            {/* Bulk Actions */}
            {selectedAgents.length > 0 && (
                <div className="mb-2 flex items-center gap-4 text-sm text-muted-foreground  justify-end my-4">
                    <Button
                        variant="outline"
                        className="border border-yellow-600! cursor-pointer py-6 rounded-2xl"
                        size="sm"
                        onClick={() => setSelectedAgents([])}
                    >
                        <X className="w-4 h-4 mr-1" />
                        Selected agents {selectedAgents.length}
                    </Button>
                    {/* <Button
                        variant="outline"
                        onClick={() => console.log('clicked')}
                        className="cursor-pointer py-6 rounded-2xl"
                    >
                        Assign to Agent
                    </Button> */}
                    {/* <AssignagentsToTeam selectedAgents={selectedAgents} /> */}
                </div>
            )}
            {/* Filter Options */}
            <div className="flex justify-between gap-4 my-4 ">
                <Input
                    placeholder="Search product by id name sku...."
                    className="w-[40%]"
                    value={inputValue}
                    icon={<Search />}
                    onChange={(e) => {
                        debouncedLog(e.target.value);
                        setInputValue(e.target.value);
                    }}
                />

                <div className="flex  gap-4">
                    <Select
                        onValueChange={(val) =>
                            setFilters((f) => ({ ...f, status: val }))
                        }
                        defaultValue="orderDate"
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="orderDate">Order Date</SelectItem>
                            <SelectItem value="commission">Commission</SelectItem>
                            <SelectItem value="totalAmount">Total Amount</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={(val) =>
                            setFilters((f) => ({ ...f, priority: val }))
                        }
                        defaultValue="orderDate"
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="orderDate">Order Date</SelectItem>
                            <SelectItem value="commission">Commission</SelectItem>
                            <SelectItem value="totalAmount">Total Amount</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

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
                                            checked={allPageAgentsSelected}
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
                        {myAgents.map((agent) => (
                            <TableRow key={agent.id} className="border-muted hover:bg-muted/50 transition-colors">
                                <TableCell className="px-4 py-3">
                                    <input
                                        className="cursor-pointer"
                                        type="checkbox"
                                        checked={selectedAgents.includes(agent.agentId)}
                                        onChange={() => toggleSelection(agent.agentId)}
                                    />
                                </TableCell>
                                <TableCell className="px-4 py-3">{agent.name}</TableCell>
                                <TableCell className="px-4 py-3">{agent.agentId}</TableCell>
                                <TableCell className="px-4 py-3 text-center">{agent.todaysCalls}</TableCell>
                                <TableCell className="px-4 py-3 text-center">{agent.monthsConversion}</TableCell>
                                <TableCell className="px-4 py-3 text-center">{agent.todaysConversion}</TableCell>
                                <TableCell className="px-4 py-3 text-center">{agent.level}</TableCell>
                                <TableCell className="px-4 py-3 text-center">
                                    <span className={`px-4 py-1 text-sm font-medium rounded-md ${agent.status === "Active" ? "bg-green-800/30 text-green-400" : "bg-red-800/30 text-red-400"}`}>
                                        {agent.status}
                                    </span>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="cursor-pointer">
                                            <MoreVertical className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-[180px] flex flex-col">
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Eye className="w-4 h-4 mr-2" /> View
                                            </DropdownMenuItem>
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

export default MyTeam;