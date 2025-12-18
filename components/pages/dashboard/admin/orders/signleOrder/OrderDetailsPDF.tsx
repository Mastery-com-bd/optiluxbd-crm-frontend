import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from "@/components/ui/table";
import { OrderItem } from "@/types/orders";

const OrderDetailsPDF = () => {
    const order: OrderItem = {
        id: 1,
        agentId: 101,
        customerId: 201,
        productId: 301,
        packageId: null,
        quantity: 2,
        totalAmount: "150.00",
        commissionRate: "10%",
        commission: "15.00",
        orderDate: "2023-10-01T10:30:00Z",
        addressId: 401,
        status: "Shipped",
        shipping_address_tag: "Home",
        shipping_address_line1: "123 Main St",
        shipping_address_line2: "Apt 4B",
        shipping_address_city: "New York",
        shipping_address_postcode: "10001",
        shipping_address_geo_lat: 40.7128,
        shipping_address_geo_lng: -74.0060,
        customer: {
            id: 201,
            name: "John Doe",
            phone: "+1234567890",
            email: "johndoe@example.com"
        },
        products: [
            {
                id: 301,
                name: "Product A",
                price: "75.00",
                sku: "PROD-A-001",
                image_url: "https://example.com/images/product_a.jpg",
                quantity: 1,
            },
            {
                id: 302,
                name: "Product B",
                price: "75.00",
                sku: "PROD-B-001",
                image_url: "https://example.com/images/product_b.jpg",
                quantity: 1,
            }
        ],
        package: null,
        courier: {
            id: 501,
            name: "DHL",
            status: "In Transit"
        },
        payment: {
            method: "Credit Card",
            provider: "Visa",
            trxId: "TX123456789",
            amount: 250.00,
            paidAt: "2023-10-01T10:30:00Z"
        }
    };
    const { name, email, phone, } = order.customer;
    const products = order.products;
    const orderTax = 0;
    const discount = 0;
    const shipping = 0;
    const totalAmount = Number(order.totalAmount) + orderTax - discount + shipping;
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="purple">Print Order Details</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[1320px]! w-full!">
                <div className="flex justify-between">
                    <h3>Order Details</h3>
                    <div className="flex gap-3">
                        <Button variant={"yellow"} className="cursor-pointer">Export PDF</Button>
                        <Button variant={"purple"} className="cursor-pointer">Print</Button>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between gap-5">
                        <div className="w-1/3 p-6 bgGlass">
                            <h3 className="text-[18px] font-semibold">Order Info:</h3>
                            <div className="flex flex-col gap-4 mt-4">
                                <p className="flex justify-between">
                                    <span className="text-[14px] font-normal">Order Date:</span>
                                    <span>{new Date(order?.orderDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-[14px] font-normal">Delivery Date:</span>
                                    <span>not provided</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-[14px] font-normal">Product ID:</span>
                                    <span>ID</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-[14px] font-normal">Status:</span>
                                    <span>pending</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-[14px] font-normal">Payment Status</span>
                                    <span>paid</span>
                                </p>
                            </div>
                        </div>
                        <div className="w-1/3 p-6 bgGlass">
                            <h3 className="text-[18px] font-semibold">Customer Info:</h3>
                            <div className="flex flex-col gap-4 mt-4">
                                <p className="flex justify-between">
                                    <span className="text-[14px] font-normal">Name:</span>
                                    <span>{name}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-[14px] font-normal">Email:</span>
                                    <span>{email}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-[14px] font-normal">Call:</span>
                                    <span>{phone}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-[14px] font-normal">Address:</span>
                                    <span>{"not provided..."}</span>
                                </p>
                            </div>
                        </div>
                        <div className="w-1/3 p-6 bgGlass">
                            <h3 className="text-[18px] font-semibold">Company Details:</h3>
                            <div className="flex flex-col gap-4 mt-4">
                                <p className="flex justify-between">
                                    <span className="text-[14px] font-normal">Name:</span>
                                    <span>OptiluxBD</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-[14px] font-normal">Email:</span>
                                    <span>OptiluxBD.com</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-[14px] font-normal">Call:</span>
                                    <span>019.....</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-[14px] font-normal">Address:</span>
                                    <span>{"not provided..."}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mt-5">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bgGlass">
                                        <TableCell>Product ID</TableCell>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Tax</TableCell>
                                        <TableCell>Subtotal</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products && products.map(product => (
                                        <TableRow key={product.id}>
                                            <TableCell className="border border-white">
                                                {product.sku}
                                            </TableCell>
                                            <TableCell className="border border-white">
                                                {product.name}
                                            </TableCell>
                                            <TableCell className="border border-white">
                                                {product.quantity}
                                            </TableCell>
                                            <TableCell className="border border-white">
                                                {product.price}
                                            </TableCell>
                                            <TableCell className="border border-white">
                                                ৳0.00
                                            </TableCell>
                                            <TableCell className="border border-white">
                                                {Number(product.price) * product.quantity}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter className="bg-transparent">
                                    <TableRow className="">
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border border-white">total:</TableCell>
                                        <TableCell className="border border-white">fjdkfjsdj</TableCell>
                                    </TableRow>
                                    <TableRow className="">
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border border-white">total:</TableCell>
                                        <TableCell className="border border-white">fjdkfjsdj</TableCell>
                                    </TableRow>
                                    <TableRow className="">
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border border-white">total:</TableCell>
                                        <TableCell className="border border-white">fjdkfjsdj</TableCell>
                                    </TableRow>
                                    <TableRow className="">
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border border-white">total:</TableCell>
                                        <TableCell className="border border-white">fjdkfjsdj</TableCell>
                                    </TableRow>
                                    <TableRow className="">
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border-none!"></TableCell>
                                        <TableCell className="border border-white">total:</TableCell>
                                        <TableCell className="border border-white">fjdkfjsdj</TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OrderDetailsPDF;