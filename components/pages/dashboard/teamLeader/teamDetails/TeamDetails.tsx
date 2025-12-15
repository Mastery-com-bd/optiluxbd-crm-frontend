"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import ButtonSvgGlow from "@/components/svgIcon/ButtonSvgGlow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/ui/ImageUploader";
import { SquarePen, Target, Trash2, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import Members from "./members/Members";
import Leads from "./leads/Leads";
import TeamOverview from "./overview/TeamOverview";

const buttons = ["OverView", "Member", "Leads"];

const TeamDetails = ({ id }: { id: string }) => {
  const [current, setCurrent] = useState(buttons[0]);

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

  return (
    <section className=" bg-transparent text-foreground space-y-4 w-full">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Team Profile</h1>
          <p className="text-[#A1A1A1] leading-5">
            See the details of a specific team
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
                <span className="text-[14px]">Edit Team</span>
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
                <span className="text-[14px]">Delete Team</span>
              </p>
            </Button>
          </LiquidGlass>
        </div>
      </div>

      {/* main content */}
      <div className="flex justify-between items-start gap-6">
        {/* left side */}

        {/* <LiquidGlass
          glowIntensity="xs"
          shadowIntensity="xs"
          borderRadius="16px"
          className="w-[25vw]"
        >
        </LiquidGlass> */}
        <Card className="bg-white/10 w-[30vw] px-6 py-6 rounded-4xl relative gap-4">
          {/* border section */}
          <div className="absolute top-0 left-px inset-5.5 border-l border-t border-white/20 rounded-tl-4xl pointer-events-none" />
          <div className="absolute bottom-0 right-px inset-5.5 border-r border-b border-white/20 rounded-br-4xl pointer-events-none" />

          {/* upper section */}
          <div className="flex gap-4">
            <div className="h-7 w-20 relative bg-transparent rounded-[6px] flex items-center justify-center p-1">
              <div className="absolute top-0 left-px inset-2 border-l-[1.5px] border-t-[1.5px] border-white/30 rounded-tl-[6px] pointer-events-none" />
              <div className="absolute bottom-0 right-px inset-2 border-r-[1.5px] border-b-[1.5px] border-white/30 rounded-br-[6px] pointer-events-none" />
              <span className="text-sm"> Diamond</span>
            </div>
            <ImageUploader
              handleChange={handleChange}
              id={id}
              clasName="w-30 h-30 rounded-full shadow-md"
            />
          </div>

          {/* name section */}
          <div className="text-center space-y-1 ">
            <h1 className="text-3xl leading-6">Sales Team Alpha</h1>
            <p className="text-sm">Senior Sales Agent</p>
            <p className="text-xs text-[#B1B1B1]">Team Alpha</p>
          </div>

          {/* info section */}
          <div className=" rounded-2xl bg-white/10 relative p-4 mt-20">
            {/* top and bottom border effect */}
            <div className="absolute top-0 left-px inset-5.5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-px inset-5.5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />
            <div>
              <h1 className="text-lg font-medium">Quick Stats</h1>
              <div className="grid grid-cols-[3fr_1fr] gap-2">
                <p className="text-sm text-[#B1B1B1] flex items-center gap-2">
                  <Users size={14} className="text-[#51A2FF]" /> Members
                </p>
                <p className="text-xl font-semibold text-right">8</p>
                <p className="text-sm text-[#B1B1B1] flex items-center gap-2">
                  <Target size={14} className="text-[#FDC700]" /> Total Leads
                </p>
                <p className="text-xl font-semibold text-right">156</p>
                <p className="text-sm text-[#B1B1B1] flex items-center gap-2 w-full ">
                  <TrendingUp size={14} className="text-[#05DF72]" /> Monthly
                  Conversion
                </p>
                <p className="text-xl font-semibold text-right text-[#05DF72] ">
                  32.5 %
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* right side */}
        <div className="w-full space-y-4">
          {/* <LiquidGlass
            glowIntensity="xs"
            shadowIntensity="xs"
            borderRadius="16px"
          >
          </LiquidGlass> */}
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

          {current === "OverView" && <TeamOverview />}
          {current === "Member" && <Members />}
          {current === "Leads" && <Leads />}
        </div>
      </div>
    </section>
  );
};

export default TeamDetails;
