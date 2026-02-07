'use client';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';
import { MoreVertical, Eye } from 'lucide-react';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/pages/dashboard/shared/pageHeader';
import { OverviewCard } from '@/components/pages/dashboard/shared/overviewCard';
import { FileText, FileCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import ButtonComponent from '@/components/ui/ButtonComponent';

const stats = [
  {
    icon: FileText,
    label: "Drafts Invoices",
    value: "128",
    isPositive: true,
    change: "36.8%",
    highlight: false,
  },
  {
    icon: FileCheck,
    label: "Issued Invoices",
    value: "52",
    isPositive: true,
    change: "36.8%",
    highlight: false,
  },
  {
    icon: CheckCircle2,
    label: "Paid Invoices",
    value: "512",
    isPositive: false,
    change: "36.8%",
    highlight: true,
    highlightColor: "text-emerald-500" // Design-e Paid status green color-e ache
  },
  {
    icon: AlertCircle,
    label: "Overdue Invoices",
    value: "12",
    isPositive: true,
    change: "36.8%",
    highlight: true,
    highlightColor: "text-orange-500" // Design-e Overdue status orange color-e ache
  },
];
const InvoiceAndPayments = () => {
    const keys = [
        'Invoice No.',
        'Order ID',
        'Customer',
        'Payment method',
        'Status',
        'Date',
        'Refund Amount',
        'Action',
    ];

    const paymentsData = [
        {
            id: '1',
            invoiceNo: 'INV-2025-004582',
            orderId: 'ORD-001',
            customer: 'Tahsan khan',
            paymentMethod: 'Online',
            status: 'Issued',
            date: '2025-03-08',
            amount: 'TK 500.00',
        },
        {
            id: '2',
            invoiceNo: 'INV-2025-004582',
            orderId: 'ORD-002',
            customer: 'Tahsan khan',
            paymentMethod: 'COD',
            status: 'Paid',
            date: '2025-03-09',
            amount: 'TK 870.00',
        },
        {
            id: '3',
            invoiceNo: 'INV-2025-004582',
            orderId: 'ORD-003',
            customer: 'Tahsan khan',
            paymentMethod: 'COD',
            status: 'Issued',
            date: '2025-03-10',
            amount: 'TK 500.00',
        },
        {
            id: '4',
            invoiceNo: 'INV-2025-004582',
            orderId: 'ORD-004',
            customer: 'Tahsan khan',
            paymentMethod: 'Bank Transfer',
            status: 'Overdue',
            date: '2025-03-12',
            amount: 'TK 500.00',
        },
        {
            id: '5',
            invoiceNo: 'INV-2025-004582',
            orderId: 'ORD-005',
            customer: 'Tahsan khan',
            paymentMethod: 'Online',
            status: 'Issued',
            date: '2025-03-08',
            amount: 'TK 500.00',
        },
        {
            id: '6',
            invoiceNo: 'INV-2025-004582',
            orderId: 'ORD-006',
            customer: 'Tahsan khan',
            paymentMethod: 'COD',
            status: 'Draft',
            date: '2025-03-09',
            amount: 'TK 900.00',
        },
        {
            id: '7',
            invoiceNo: 'INV-2025-004582',
            orderId: 'ORD-007',
            customer: 'Tahsan khan',
            paymentMethod: 'Bank Transfer',
            status: 'Paid',
            date: '2025-03-10',
            amount: 'TK 550.00',
        },
        {
            id: '8',
            invoiceNo: 'INV-2025-004582',
            orderId: 'ORD-008',
            customer: 'Tahsan khan',
            paymentMethod: 'Online',
            status: 'Overdue',
            date: '2025-03-12',
            amount: 'TK 300.00',
        },
    ];

    return (
        <div className="mx-auto">
            <PageHeader title="Invoice & Payments" description='Manage incoices, payments and recipts'/>

            <div className='my-6'>
                <OverviewCard stats={stats}/>
            </div>
            <div className="overflow-x-auto">
                <Table>
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
                        {paymentsData.map((row) => (
                            <TableRow key={row.id} className="hover:bg-muted/50 border-muted transition-colors">
                                <TableCell className="px-4 py-3 text-sm">{row.invoiceNo}</TableCell>
                                <TableCell className="px-4 py-3 text-sm">{row.orderId}</TableCell>
                                <TableCell className="px-4 py-3 text-sm">{row.customer}</TableCell>
                                <TableCell className="px-4 py-3 text-sm text-center">
                                    <span className="inline-block px-3 py-1 bgGlass text-xs rounded-md">
                                        {row.paymentMethod}
                                    </span>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-sm">
                                    <span
                                        className={`px-3 py-1 bgGlass text-xs  ${row.status === "Issued"
                                            ? "text-yellow-600"
                                            : row.status === "Paid"
                                                ? " text-green-600"
                                                : row.status === "Draft"
                                                    ? "text-gray-400"
                                                    : " text-red-600"
                                            }`}
                                    >
                                        {row.status}
                                    </span>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-sm">
                                    {new Date(row.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit',
                                    })}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-sm text-center">{row.amount}</TableCell>
                                <TableCell className="px-4 py-3">
                                    <Link href={`/dashboard/admin/orders/payments/${row.id}`}>
                                        <ButtonComponent buttonName='View details' varient='yellow' icon={Eye} />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default InvoiceAndPayments;