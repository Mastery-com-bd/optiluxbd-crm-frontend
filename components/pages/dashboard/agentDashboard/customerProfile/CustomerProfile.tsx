"use client";

import ButtonSvgGlow from "@/components/svgIcon/ButtonSvgGlow";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/ui/ImageUploader";
import { useGetCustomerByIdQuery } from "@/redux/features/customers/cutomersApi";
import { SquarePen, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import Overview from "../../customers/CustomerDetails/Overview";
import OrderHistory from "../../customers/CustomerDetails/OrderHistory";
import Note from "../../customers/CustomerDetails/Note";
import AdvanceProfile from "./AdvanceProfile";

const buttons = ["Overview", "Order History", "Note", "Advance Profile"];
const CustomerProfile = ({ id }: { id: string }) => {
  const [enabled, setEnabled] = useState(false);
  const [current, setCurrent] = useState(buttons[0]);
  const { data, isLoading } = useGetCustomerByIdQuery(id);
  const customerData = data?.data;

  const handleChange = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("avatar", imageFile as File);
    // const toastId = toast.loading("profile picture uploading", {
    //   duration: 3000,
    // });
    // try {
    //   // const res = await userImageUpload(id, imageFile);
    //   const res = await imageUpload({ id, formData }).unwrap();
    //   if (res?.success) {
    //     toast.success(res?.message, { id: toastId, duration: 3000 });
    //   }
    // } catch (error: any) {
    //   const errorInfo =
    //     error?.error ||
    //     error?.data?.message ||
    //     error?.data?.errors[0]?.message ||
    //     "Something went wrong!";
    //   toast.error(errorInfo, { id: toastId, duration: 3000 });
    // }
  };
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <section className="bg-transparent text-foreground space-y-4 w-full">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Customer Profile</h1>
          <p className="text-[#A1A1A1] leading-5">
            View add and edit customer details
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <ButtonComponent
            buttonName="Edit Profile"
            icon={SquarePen}
            varient="green"
          />
          <ButtonComponent
            buttonName="Delete Profile"
            icon={Trash2}
            varient="red"
          />
        </div>
      </div>

      {/* main content */}
      <div className="flex justify-between items-start gap-6">
        {/* left side */}

        <Card className="bg-white/10 w-[30vw] px-6 py-6 rounded-4xl relative gap-4">
          {/* border section */}
          <div className="absolute top-0 left-px inset-5.5 border-l border-t border-white/20 rounded-tl-4xl pointer-events-none" />
          <div className="absolute bottom-0 right-px inset-5.5 border-r border-b border-white/20 rounded-br-4xl pointer-events-none" />

          {/* upper section */}
          <div className="flex justify-between ">
            <div className="h-10 w-20 border-2 border-[#F0B10080] rounded-full bg-[linear-gradient(90deg,#F0B1004D_0%,#D0870066_100%)] flex items-center justify-center gap-1">
              <p className="text-[#FDC700] flex items-center gap-1 text-sm">
                <Star size={14} />
                Gold
              </p>
            </div>
            <ImageUploader
              handleChange={handleChange}
              id={id}
              clasName="w-32 h-32 rounded-full shadow-md"
            />

            <button
              type="button"
              onClick={() => setEnabled(!enabled)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition cursor-pointer ${
                enabled ? "bg-blue-600" : "bg-white/10"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                  enabled ? "translate-x-9" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* name section */}
          <div className="text-center space-y-1 ">
            <h1 className="text-3xl leading-6">Karim Khan</h1>
            <p className="text-sm">Member since June 2025</p>
            <p className="text-xs text-[#B1B1B1]">2,200 pts</p>
          </div>

          {/* info section */}
          <div className="space-y-3 px-4 w-full text-sm">
            <h1 className="text-xl">Customer Info</h1>
            <div className=" px-4 py-2 rounded-2xl bg-white/5">
              <h3 className="text-white/50">Email Address </h3>
              <p>karim.khan@example.com</p>
            </div>
            <div className=" px-4 py-2 rounded-2xl bg-white/5">
              <h3 className="text-white/50">Phone Number </h3>
              <p>+880 1783155183</p>
            </div>
            <div className=" px-4 py-2 rounded-2xl bg-white/5">
              <h3 className="text-white/50">Source </h3>
              <p>Website</p>
            </div>
            <div className=" px-4 py-2 rounded-2xl bg-white/5">
              <h3 className="text-white/50">Address </h3>
              <p>House 12,Road 02, Mirpur,Dhaka</p>
            </div>
          </div>
        </Card>

        {/* right side */}
        <div className="w-full space-y-4">
          <Card className="bg-white/10 px-3 rounded-2xl flex flex-row items-center justify-between gap-1 py-1.5 relative">
            {/* top and bottom border */}
            <div className="absolute top-0 left-px inset-2.5 border-l border-t border-white/20 rounded-tl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-px inset-2.5 border-r border-b border-white/20 rounded-br-xl pointer-events-none" />

            {/* upper section */}
            {buttons.map((item, i) => {
              const active = item === current;
              return (
                <button
                  key={i}
                  onClick={() => setCurrent(item)}
                  className={`relative w-full py-2 flex items-center justify-center cursor-pointer ${
                    active && "bg-white/5 rounded-xl"
                  }`}
                >
                  {/* Button text */}
                  <span className="relative z-10">{item}</span>

                  {active && (
                    <div className="absolute top-0 left-px inset-2.5 border-l border-t border-white/30 rounded-tl-xl pointer-events-none" />
                  )}
                  {active && (
                    <div className="absolute bottom-0 right-px inset-2.5 border-r border-b border-white/30 rounded-br-xl pointer-events-none" />
                  )}

                  {active && (
                    <div className="absolute z-20 bottom-0 left-0 w-full">
                      <span
                        className="block w-full h-[1.5px]"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(255,177,63,0) 0%, #FFB13F 50%, rgba(255,177,63,0) 100%)",
                        }}
                      />
                    </div>
                  )}

                  {active && <ButtonSvgGlow />}
                </button>
              );
            })}
          </Card>

          {current === "Overview" && <Overview />}
          {current === "Order History" && <OrderHistory />}
          {current === "Note" && <Note />}
          {current === "Advance Profile" && <AdvanceProfile />}
        </div>
      </div>
    </section>
  );
};

export default CustomerProfile;
