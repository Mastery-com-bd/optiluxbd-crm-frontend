import { Button } from "@/components/ui/button";
import { pageHeader } from "@/styles/headerAndDecription";
import Image from "next/image";

const RefundDetails = () => {
    return (
        <div className="w-full max-w-[1133px] mx-auto">
            <div className="flex justify-between">
                <div>
                    <h3 className={`${pageHeader.pageHeader}`}>Request Details</h3>
                    <p>
                        <span className={`${pageHeader.pageDes}`} >Request ID: </span>
                        <span>request idd...</span>
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant={"purple"} className="py-3 px-4 text-[14px]! rounded-2xl cursor-pointer">
                        Reject Request
                    </Button>
                    <Button variant={"yellow"} className="py-3 px-4 text-[14px]! rounded-2xl cursor-pointer">
                        Approve Request
                    </Button>
                </div>
            </div>
            <div className="flex gap-6 mt-6">
                <div className="bgGlass p-6 w-[60%]">
                    <h3>Customer</h3>
                    <div>
                        <div className="flex gap-6 my-6">
                            <Image src={"https://i.ibb.co.com/3WV8B3r/836.jpg"} height={60} width={60} alt="customer image" className="rounded-full" />
                            <p className="flex flex-col">
                                <span>Customer Name</span>
                                <span className="text-gray-400">Phone number</span>
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="flex flex-col gap-3">
                                <span className="text-gray-400">Address</span>
                                <span>Customer address </span>
                            </p>
                            <p className="flex flex-col gap-3">
                                <span className="text-gray-400">Invoice ID</span>
                                <span>Customer Invoice ID.... </span>
                            </p>
                        </div>
                    </div>
                </div>
                {/* order summary */}
                <div className="bgGlass w-[40%] p-6">
                    <h3>order Summary</h3>
                    <div className="flex  justify-between my-6">
                        <div className="flex flex-col">
                            <span className="text-gray-400">Payment Method</span>
                            <span>COD</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Courier</span>
                            <span>Pathao</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Items</span>
                            <span>1</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Image
                            src={"https://i.ibb.co.com/3WV8B3r/836.jpg"}
                            alt="product image"
                            height={60}
                            width={60}
                            className="rounded-2xl"
                        />
                        <p className="flex flex-col" >
                            <span>Product Name</span>
                            <span className="text-gray-400">Product Price</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex gap-6 mt-6">
                {/* return reason */}
                <div className="bgGlass p-6 w-1/2 ">
                    <h3>Return Reason</h3>
                    <div className="my-4">
                        return reason........
                    </div>
                </div>
                {/* evidence photos */}
                <div className="bgGlass p-6 w-1/2">
                    <h3>Evidence Photos</h3>
                    <div className="flex gap-3 my-6">

                        <div className="bgGlass p-6 h-[272px]! w-[250px]!">
                            <Image src={"https://i.ibb.co.com/D5Bx5SZ/3.png"} height={272} width={250} alt="product image" />
                        </div>
                        <div className="bgGlass p-4 h-[272px]! w-[250px]!">
                            <Image src={"https://i.ibb.co.com/D5Bx5SZ/3.png"} height={272} width={250} alt="product image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundDetails;