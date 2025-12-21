'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PaymentDetails from '@/components/PDF/PaymentDetails';

const InvoiceDetails = () => {
    const invoiceData = {
        invoiceNo: 'INV-2025-004582',
        orderId: 'ORD-4532',
        issuedDate: 'November 5, 2025',
        dueDate: 'November 15, 2025',
        store: {
            name: 'Optilux',
            address:
                'Sunglasses & Eyewear Store · 44 Muzib Sorok, Jessore, Khulna Division, Bangladesh',
        },
        customer: {
            name: 'Ahmed',
            phone: '+8801704985731',
            address: 'House 12, Road 5, Dhanmondi, Dhaka-1205',
        },
        products: [
            {
                name: 'Premium Cotton T-Shirt',
                quantity: 1,
                unitPrice: 850,
                total: 850,
            },
            {
                name: 'Denim Jeans',
                quantity: 1,
                unitPrice: 1200,
                total: 1200,
            },
        ],
        subtotal: 2050,
        deliveryCharge: 100,
        discount: 50,
        total: 2200,
        paymentMethod: 'Online Payment',
    };
    const keys = [
        "Product name",
        "Quantity",
        "Unit price",
        "Total",
    ]
    return (
        <div className="w-full p-6 shadow-md text-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Invoice Details</h2>
                    <p className="text-sm text-muted-foreground">
                        Invoice No: {invoiceData.invoiceNo}
                    </p>
                </div>

                <div className="flex gap-2">
                    <PDFDownloadLink
                        document={<PaymentDetails invoiceData={invoiceData} />}
                        fileName="order_details.pdf"
                        style={{ textDecoration: 'none' }}
                    >
                        {({ loading }) =>
                            loading ? (
                                <Button variant={"yellow"} className="cursor-pointer">Loading PDF...</Button>
                            ) : (
                                <Button variant={"yellow"} className="cursor-pointer">Export PDF</Button>
                            )
                        }
                    </PDFDownloadLink>
                    <Button variant="yellow" className='cursor-pointer'>
                        <Printer className="w-4 h-4 mr-2" />
                        Print
                    </Button>
                </div>
            </div>

            <Card className='bgGlass p-0 pb-16'>
                {/* Invoice & Store details */}
                <div className="bg-yellow-500/10 p-5 rounded-lg flex justify-between flex-col md:flex-row gap-5 md:gap-0 mb-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="bg-yellow-400 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-black">
                                O
                            </div>
                            <div>
                                <p className="font-semibold">{invoiceData.store.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {invoiceData.store.address}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-right flex flex-col gap-4">
                        <h2 className="text-6xl ">Invoice</h2>
                        <p className="text-sm">Invoice No: {invoiceData.invoiceNo}</p>
                        <p className="text-sm">Order: {invoiceData.orderId}</p>
                        <p className="text-sm">
                            ISSUED on: <span className="font-medium">{invoiceData.issuedDate}</span>
                        </p>
                        <p className="text-sm">
                            Payment Due: <span className="font-medium">{invoiceData.dueDate}</span>
                        </p>
                    </div>
                </div>
                <div className='p-6'>
                    {/* Billing Info */}
                    <div className="mb-4 flex flex-col gap-2">
                        <h3 className="text-3xl font-semibold mb-1">Bill To</h3>
                        <p>{invoiceData.customer.name}</p>
                        <p>{invoiceData.customer.phone}</p>
                        <p>{invoiceData.customer.address}</p>
                    </div>

                    {/* Table using Shadcn */}
                    <div className="rounded-md overflow-hidden mb-6 ">
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
                                {invoiceData.products.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell className="text-center">{item.quantity}</TableCell>
                                        <TableCell className="text-center">{item.unitPrice} BDT</TableCell>
                                        <TableCell className="text-right">{item.total} BDT</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter className='bg-transparent'>
                                <TableRow>
                                    <TableCell className='border-none' />
                                    <TableCell className='border-none' />
                                    <TableCell className="text-center font-medium">
                                        Subtotal
                                    </TableCell>
                                    <TableCell className="text-right">{invoiceData.subtotal} BDT</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='border-none' />
                                    <TableCell className='border-none' />
                                    <TableCell className="text-center font-medium">
                                        Delivery Charge
                                    </TableCell>
                                    <TableCell className="text-right">{invoiceData.deliveryCharge} BDT</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='border-none' />
                                    <TableCell className='border-none' />
                                    <TableCell className="text-center font-medium">
                                        Discount
                                    </TableCell>
                                    <TableCell className="text-right">{invoiceData.discount} BDT</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='border-none' />
                                    <TableCell className='border-none' />
                                    <TableCell className="text-center font-bold">
                                        Grand Total
                                    </TableCell>
                                    <TableCell className="text-right font-bold">
                                        {invoiceData.total} BDT
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>

                    {/* Payment Info */}
                    <div className="text-sm text-right text-muted-foreground mb-6  border-b ">
                        Payment Method: {invoiceData.paymentMethod}
                    </div>

                    {/* Footer */}
                    <div className="text-center text-xs text-muted-foreground mt-10">
                        <p>Thank you for your business!</p>
                        <p>
                            For any queries, contact us at{' '}
                            <span className="underline">support@yourstore.com</span>
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default InvoiceDetails;