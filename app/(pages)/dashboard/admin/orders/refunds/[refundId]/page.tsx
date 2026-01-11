import PageHeader from "@/components/pages/dashboard/shared/pageHeader";
import ButtonComponent from "@/components/ui/ButtonComponent";
import Image from "next/image";

const RefundDetails = () => {
    return (
        <div className="w-full ">
            <div className="flex justify-between">
                <PageHeader title="Request Details" description={`Request ID: ${"request idd..."}`} />
                <div className="flex items-center justify-center gap-4">
                    <ButtonComponent buttonName="Reject Request" varient="purple" />
                    <ButtonComponent buttonName="Approve Request" varient="yellow" />
                </div>
            </div>
            <div className="flex gap-6 mt-6">
                <div className="effect rounded-[8px] p-6 w-[60%]">
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
                <div className="effect rounded-[8px] w-[40%] p-6">
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
                <div className="effect rounded-[8px] p-6 w-1/2 ">
                    <h3>Return Reason</h3>
                    <div className="my-4">
                        return reason........
                    </div>
                </div>
                {/* evidence photos */}
                <div className="effect rounded-[8px] p-6 w-1/2">
                    <h3>Evidence Photos</h3>
                    <div className="flex gap-3 my-6">

                        <div className="effect rounded-[8px] p-6 h-[272px]! w-[250px]!">
                            <Image src={"https://i.ibb.co.com/D5Bx5SZ/3.png"} height={272} width={250} alt="product image" />
                        </div>
                        <div className="effect rounded-[8px] p-4 h-[272px]! w-[250px]!">
                            <Image src={"https://i.ibb.co.com/D5Bx5SZ/3.png"} height={272} width={250} alt="product image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundDetails;