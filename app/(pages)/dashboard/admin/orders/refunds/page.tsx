import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pageHeader } from "@/styles/headerAndDecription";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ReturnAndRefunds = () => {
    const keys = [
        "Request ID",
        "Order ID",
        "Customer",
        "Products",
        "Items",
        "Reason",
        "Status",
        "Date",
        "Refund Amount",
        "Action",
    ];

    const refundRequest = [
        {
            id: "4",
            orderId: "ORD-001",
            customer: "Tahsan Khan",
            products: "Wireless Bluetooth Earbuds",
            items: 4,
            reason: "Product defective",
            status: "Pending",
            created_at: "2025-03-08",
            price: "TK 500.00",
            image_url: "https://i.ibb.co.com/3WV8B3r/836.jpg", // Replace with actual image URL if needed
        },
        {
            id: "1",
            orderId: "ORD-002",
            customer: "Tahsan Khan",
            products: "Yoga Mat Premium",
            items: 1,
            reason: "Wrong item received",
            status: "Refunded",
            created_at: "2025-03-09",
            price: "TK 870.00",
            image_url: "https://i.ibb.co.com/3WV8B3r/836.jpg",
        },
        {
            id: "2",
            orderId: "ORD-003",
            customer: "Tahsan Khan",
            products: "Smart Watch Series 5",
            items: 2,
            reason: "Wrong item received",
            status: "Pending",
            created_at: "2025-03-10",
            price: "TK 500.00",
            image_url: "https://i.ibb.co.com/3WV8B3r/836.jpg",
        },
        {
            id: "3",
            orderId: "ORD-004",
            customer: "Tahsan Khan",
            products: "Yoga Mat Premium",
            items: 3,
            reason: "Customer changed mind",
            status: "Rejected",
            created_at: "2025-03-12",
            price: "TK 500.00",
            image_url: "https://i.ibb.co.com/3WV8B3r/836.jpg",
        },
        {
            id: "7",
            orderId: "ORD-005",
            customer: "Tahsan Khan",
            products: "Wireless Bluetooth Earbuds",
            items: 7,
            reason: "Product defective",
            status: "Pending",
            created_at: "2025-03-08",
            price: "TK 500.00",
            image_url: "https://i.ibb.co.com/3WV8B3r/836.jpg",
        },
        {
            id: "6",
            orderId: "ORD-006",
            customer: "Tahsan Khan",
            products: "Wireless Bluetooth Earbuds",
            items: 1,
            reason: "Product defective",
            status: "Refunded",
            created_at: "2025-03-09",
            price: "TK 900.00",
            image_url: "https://i.ibb.co.com/3WV8B3r/836.jpg",
        },
        {
            id: "8",
            orderId: "ORD-007",
            customer: "Tahsan Khan",
            products: "Smart Watch Series 5",
            items: 8,
            reason: "Product defective",
            status: "Refunded",
            created_at: "2025-03-10",
            price: "TK 550.00",
            image_url: "https://i.ibb.co.com/3WV8B3r/836.jpg",
        },
        {
            id: "9",
            orderId: "ORD-008",
            customer: "Tahsan Khan",
            products: "Smart Watch Series 5",
            items: 3,
            reason: "Customer changed mind",
            status: "Rejected",
            created_at: "2025-03-12",
            price: "TK 300.00",
            image_url: "https://i.ibb.co.com/3WV8B3r/836.jpg",
        },
    ];

    return (
        <div>
            <h3 className={`${pageHeader.pageHeader}`}>Return & Refunds</h3>
            <p className={`${pageHeader.pageDes}`}>Process customer and refund request</p>
            <Card className="bg-transparent text-card-foreground shadow-sm overflow-hidden mb-5 border-none">
                <div className="overflow-x-auto w-full">
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
                                        {label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {refundRequest.map((refund) => (
                                <TableRow
                                    key={refund.id}
                                    className="border-muted hover:bg-muted/50 transition-colors"
                                >
                                    <TableCell className="px-4 py-3">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={
                                                        refund.image_url ||
                                                        "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png"
                                                    }
                                                    alt={refund.products}
                                                    width={48}
                                                    height={48}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <p className="font-medium">{refund.products}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        by {refund.customer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-sm text-center">
                                        {refund.orderId}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-sm text-center">
                                        {refund.customer}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-sm font-medium text-center">
                                        {refund.items}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-sm font-semibold text-center">
                                        {refund.price}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        <span className={`px-6 bg-white/10 border border-white/20 py-1 text-sm font-medium rounded-md
                                                  ${refund.status === "ACTIVE"
                                                ? "text-green-500"
                                                : "text-red-500"
                                            }`}
                                        >
                                            {refund.status.toLowerCase()}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {new Date(refund.created_at).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "2-digit",
                                        })}
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
                                                <Link href={`/dashboard/admin/refunds/all-refunds/${refund.id}`}>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Eye className="w-4 h-4 mr-2" /> view
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Pencil className="w-4 h-4 mr-2" />
                                                    Update
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        // setDeleterefundId(refund.id);
                                                        // setDeleteDialogOpen(true);
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
            </Card>
        </div>
    );
};
export default ReturnAndRefunds;