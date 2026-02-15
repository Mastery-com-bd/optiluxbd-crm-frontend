/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Copy,
    Eye,
    Funnel,
    MoreVertical,
    Pencil,
    Search,
    Trash2,
} from "lucide-react";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Link from "next/link";
import { TScratchCard, TScratchCardsList } from "@/types/scratch-cards/scratch-cards.type";
import CustomPagination from "@/components/ui/CustomPagination";
import { TPagination } from "@/types/shared";
import useFilters from "@/hooks/useFilters";
import ResetButton from "@/components/ui/ResetButton";

export default function ScratchCardList({ scratchCards, pagination }: { scratchCards: TScratchCardsList, pagination: TPagination }) {
    const [statusFilter, setStatusFilter] = useState("all");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteCouponId, setDeleteCouponId] = useState<number | null>(null);


    const CARDS = scratchCards || [];

    const handleDelete = async (id: number) => {
        try {
            // Server action call korben ekhane
            toast.success("Scratch card deleted successfully!");
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error("Error deleting scratch card:", error);
            toast.error("Failed to delete scratch card");
        }
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        toast.success("Coupon code copied!");
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return "text-green-500";
            case "INACTIVE":
                return "text-gray-500";
            case "EXPIRED":
                return "text-red-500";
            case "USED":
                return "text-blue-500";
            default:
                return "text-gray-500";
        }
    };

    const keys = [
        "Code",
        "Amount",
        "Status",
        "Batch ID",
        "Expiry Date",
        "Visibility",
        "Created At",
        "Actions",
    ];
    const { handleChange, show, setShow, currentPage, setCurrentPage } = useFilters();
    return (
        <div className="bg-transparent text-foreground my-4">
            <div className="w-full">
                {/* Filters */}
                <Card className="bg-transparent border-none text-card-foreground border shadow-sm p-0">
                    <div className="flex flex-col lg:flex-row gap-4 my-7 justify-between">
                        <div className="flex gap-3 items-center">
                            <Input
                                className="w-64 text-sm bg-transparent"
                                onChange={(e) => handleChange("search", e.target.value)}
                                placeholder="Search organizations..."
                            />
                            <Button className="w-9 h-9 p-2.5 rounded-[12px] bg-transparent effect cursor-pointer">
                                <Funnel size={16} />
                            </Button>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Select value={useFilters().getParam("status") || "all"} onValueChange={(value) => handleChange("status", value)}>
                                <SelectTrigger className="w-36" aria-label="Status Filter">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                                    <SelectItem value="EXPIRED">Expired</SelectItem>
                                    <SelectItem value="USED">Used</SelectItem>
                                </SelectContent>
                            </Select>
                            <ResetButton setLimit={setShow} setCurrPage={setCurrentPage} />
                        </div>
                    </div>
                </Card>

                {/* Coupon Table */}
                <Card className="bg-transparent text-card-foreground shadow-sm overflow-hidden mb-5 p-0 pt-2 border-none">
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    {keys.map((label, ind) => (
                                        <TableHead
                                            first={ind === 0}
                                            last={ind === keys.length - 1}
                                            key={label}
                                            className="text-left text-xs font-semibold uppercase text-muted-foreground">
                                            {label}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {CARDS.map((card: TScratchCard) => (
                                    <TableRow
                                        key={card.id}
                                        className="border-muted hover:bg-muted/50 transition-colors"
                                    >
                                        {/* Code Column */}
                                        <TableCell className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <code className="font-mono font-semibold text-sm bg-muted px-3 py-1 rounded">
                                                    {card.code}
                                                </code>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => handleCopyCode(card.code)}
                                                >
                                                    <Copy className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>

                                        {/* Amount Column */}
                                        <TableCell className="px-4 py-3 text-sm font-semibold text-center">
                                            ${card.amount}
                                        </TableCell>

                                        {/* Status Column */}
                                        <TableCell className="px-4 py-3 text-center">
                                            <span
                                                className={`px-6 bg-white/10 border border-white/20 py-1 text-sm font-medium rounded-md ${getStatusColor(
                                                    card.status
                                                )}`}
                                            >
                                                {card.status.toLowerCase()}
                                            </span>
                                        </TableCell>

                                        {/* Batch ID Column */}
                                        <TableCell className="px-4 py-3 text-sm text-center">
                                            {card.batchId}
                                        </TableCell>

                                        {/* Expiry Date Column */}
                                        <TableCell className="px-4 py-3 text-sm text-center">
                                            {new Date(card.expiryDate).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                            })}
                                        </TableCell>

                                        {/* Visibility Column */}
                                        <TableCell className="px-4 py-3 text-center">
                                            <span
                                                className={`px-4 py-1 text-xs font-medium rounded-full ${card.isPublic
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {card.isPublic ? "Public" : "Private"}
                                            </span>
                                        </TableCell>

                                        {/* Created At Column */}
                                        <TableCell className="px-4 py-3 text-sm text-center">
                                            {new Date(card.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                            })}
                                        </TableCell>

                                        {/* Actions Column */}
                                        <TableCell className="px-4 py-3 text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="cursor-pointer">
                                                    <MoreVertical className="h-4 w-4" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="w-[180px] flex flex-col"
                                                >
                                                    <Link href={`/dashboard/admin/ScratchCards/${card.id}`}>
                                                        <DropdownMenuItem className="cursor-pointer">
                                                            <Eye className="w-4 h-4 mr-2" /> View
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Pencil className="w-4 h-4 mr-2" />
                                                        Update
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setDeleteCouponId(card.id);
                                                            setDeleteDialogOpen(true);
                                                        }}
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
                    {/* Pagination */}
                    <CustomPagination
                        totalPage={pagination?.totalPages}
                        show={show}
                        currentPage={currentPage}
                        setShow={setShow}
                        setCurrentPage={setCurrentPage}
                        handleChange={handleChange}
                    />
                </Card>
            </div>

            {/* Delete Confirm Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this
                            coupon and remove the data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (deleteCouponId) {
                                    handleDelete(deleteCouponId);
                                    setDeleteDialogOpen(false);
                                }
                            }}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}