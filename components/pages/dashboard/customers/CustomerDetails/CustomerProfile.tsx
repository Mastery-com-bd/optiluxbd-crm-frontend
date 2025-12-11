"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import ButtonSvgGlow from "@/components/svgIcon/ButtonSvgGlow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/ui/ImageUploader";

import { useGetCustomerByIdQuery } from "@/redux/features/customers/cutomersApi";
import { SquarePen, Star, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const buttons = ["OverView", "Member", "Leads"];

const CustomerProfile = () => {
  const [enabled, setEnabled] = useState(false);
  const [current, setCurrent] = useState(buttons[0]);
  const params = useParams();
  const customerId = params.id;
  const { data, isLoading } = useGetCustomerByIdQuery(customerId);
  const customerData = data?.data;
  //   const [imageUpload] = useUserImageUploadMutation();

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
    <section className=" bg-transparent text-foreground space-y-4 w-full">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Customer Profile</h1>
          <p className="text-[#A1A1A1] leading-5">
            View add and edit customer details
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <LiquidGlass
            glowIntensity="xs"
            shadowIntensity="xs"
            borderRadius="16px"
          >
            <Button
              variant="green"
              className="p-3 flex rounded-2xl border-none cursor-pointer"
            >
              <p className="flex items-center gap-2">
                <SquarePen className="text-green-300" />
                <span className="text-[14px]">Edit Profile</span>
              </p>
            </Button>
          </LiquidGlass>
          <LiquidGlass
            glowIntensity="xs"
            shadowIntensity="xs"
            borderRadius="16px"
          >
            <Button
              variant="red"
              className="p-3 flex rounded-2xl border-none cursor-pointer"
            >
              <p className="flex items-center gap-2">
                <Trash2 className="text-red-400" />
                <span className="text-[14px]">Delete Profile</span>
              </p>
            </Button>
          </LiquidGlass>
        </div>
      </div>

      {/* main content */}
      <div className="flex justify-between items-start gap-6">
        {/* left side */}
        <LiquidGlass
          glowIntensity="xs"
          shadowIntensity="xs"
          borderRadius="16px"
          className="w-[25vw]"
        >
          <Card className="bg-transparent w-[25vw] p-4 rounded-2xl">
            {/* upper section */}
            <div className="flex justify-between ">
              <div className="h-10 w-20 border-2 border-[#F0B10080] rounded-full bg-[linear-gradient(90deg,#F0B1004D_0%,#D0870066_100%)] flex items-center justify-center gap-1">
                <p className="text-[#FDC700] flex items-center gap-1">
                  <Star size={16} />
                  Gold
                </p>
              </div>
              <ImageUploader
                handleChange={handleChange}
                id={Number(customerId)}
                clasName="w-24 h-24 rounded-full shadow-md"
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
            <div className="text-center space-y-2 ">
              <h1 className="text-3xl">Karim Khan</h1>
              <p className="text-sm">Member since June 2025</p>
              <p className="text-xs">2,200 pts</p>
            </div>

            {/* info section */}
            <div className="space-y-3 px-10 ">
              <h1 className="text-xl">Customer Info</h1>
              <div className=" px-4 py-2 rounded-3xl bg-white/5">
                <h3 className="text-white/50">Email Address </h3>
                <p>karim.khan@example.com</p>
              </div>
              <div className=" px-4 py-2 rounded-3xl bg-white/5">
                <h3 className="text-white/50">Phone Number </h3>
                <p>+880 1783155183</p>
              </div>
              <div className=" px-4 py-2 rounded-3xl bg-white/5">
                <h3 className="text-white/50">Source </h3>
                <p>Website</p>
              </div>
              <div className=" px-4 py-2 rounded-3xl bg-white/5">
                <h3 className="text-white/50">Address </h3>
                <p>House 12,Road 02, Mirpur,Dhaka</p>
              </div>
            </div>
          </Card>
        </LiquidGlass>

        {/* right side */}
        <div className="w-full">
          <LiquidGlass
            glowIntensity="xs"
            shadowIntensity="xs"
            borderRadius="16px"
          >
            <Card className="bg-transparent px-3 rounded-2xl flex flex-row items-center justify-between gap-1 py-1.5">
              {/* upper section */}
              {buttons.map((item, i) => {
                const active = item === current;
                return (
                  <button
                    key={i}
                    onClick={() => setCurrent(item)}
                    className={`relative w-full py-2 flex items-center justify-center cursor-pointer  ${
                      active && "border-2 border-white/20 rounded-xl "
                    }`}
                  >
                    {active && (
                      <div className="absolute flex w-full bottom-0 left-3">
                        <span
                          className="w-36 h-[0.5px] block"
                          style={{
                            background: `linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0) 100%
    )`,
                          }}
                        />
                      </div>
                    )}

                    {active && <ButtonSvgGlow />}

                    {/* Button text */}
                    <span className="relative z-10">{item}</span>
                  </button>
                );
              })}
            </Card>
          </LiquidGlass>
        </div>
      </div>
    </section>
  );
};

export default CustomerProfile;
