"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Label } from "@/components/ui/label";
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import CornerGlowSvg from "@/components/svgIcon/CornerGlowSvg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type TAgentList = {
  name: string;
  agentId: string;
  profileImage: string;
};

export const agentList: TAgentList[] = [
  {
    name: "karim Hossain",
    agentId: "AG23894",
    profileImage:
      "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
  {
    name: "Salim Hossain",
    agentId: "AG23895",
    profileImage:
      "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
  {
    name: "Halim Hossain",
    agentId: "AG23896",
    profileImage:
      "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
  {
    name: "Jamil Hossain",
    agentId: "AG23897",
    profileImage:
      "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
  {
    name: "Jalil Hossain",
    agentId: "AG23898",
    profileImage:
      "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
  {
    name: "Akhil Hossain",
    agentId: "AG23899",
    profileImage:
      "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
];
const AddLeadsModal = () => {
  const [source, setSource] = useState("All");
  const [priority, setPriority] = useState("All");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`relative cursor-pointer bg-white/5 rounded-2xl py-2 flex items-center justify-center px-4 overflow-hidden`}
        >
          {/* Button text */}
          <p className="flex items-center gap-2">
            <Plus size={18} />
            <span className="text-sm">Add Leads</span>
          </p>

          {/* top and bottom line */}
          <div className="absolute top-0 left-px inset-3 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-px inset-3 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

          {/* bottom yellow glow line */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
            <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
          </div>
          <CornerGlowSvg />
        </button>
      </DialogTrigger>
      <DialogContent className="px-6 py-4 w-[40vw] gap-2">
        <DialogHeader className="flex flex-row items-center justify-between mt-4 ">
          <DialogTitle className="text-xl font-semibold text-white">
            Add New Lead
          </DialogTitle>
          <LiquidGlass
            glowIntensity="xs"
            shadowIntensity="xs"
            borderRadius="16px"
          >
            <Button
              variant="yellow"
              className="p-3 flex rounded-2xl border-none cursor-pointer"
            >
              Add Lead
            </Button>
          </LiquidGlass>
        </DialogHeader>
        <div className="space-y-4">
          {/* upper section */}
          <div className="flex items-start justify-between gap-4 ">
            {/* left side */}
            <div className="space-y-4 w-full ">
              {/* customer Name */}
              <div className="space-y-1">
                <Label className="text-xs font-normal text-white">
                  Full Name
                </Label>
                <input
                  placeholder="Enter full name"
                  className="w-full py-2 rounded-lg text-sm bg-white/10 placeholder:text-sm px-4"
                />
              </div>

              {/* interrested product */}
              <div className="space-y-1">
                <Label className="text-xs font-normal text-white">
                  Interested Product
                </Label>
                <input
                  placeholder="Write product SKU"
                  className="w-full py-2 rounded-lg text-sm bg-white/10 placeholder:text-sm px-4"
                />
              </div>
            </div>

            {/* right side */}
            <div className="space-y-4 w-full">
              <div className="flex items-center gap-4">
                {/* source dropdown */}
                <div className="space-y-1">
                  <Label className="text-xs font-normal text-white">
                    Lead Source
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <LiquidGlass
                        glowIntensity="xs"
                        shadowIntensity="xs"
                        borderRadius="12px"
                      >
                        <Button
                          variant="default"
                          className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent"
                        >
                          <p className="flex items-center gap-2">
                            <span className="text-xs">
                              {" "}
                              {source === "All" ? "Select A Source" : source}
                            </span>
                            <ChevronDown size={18} />
                          </p>
                        </Button>
                      </LiquidGlass>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-white/5 backdrop-blur-2xl"
                    >
                      {[
                        "All",
                        "Referral",
                        "Organic",
                        "Facebook",
                        "LinkedIn",
                        "Cold Call",
                      ].map((item) => (
                        <DropdownMenuItem
                          key={item}
                          onClick={() => {
                            setSource(item);
                          }}
                          className={item === source ? "font-medium" : ""}
                        >
                          {item}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* priority dropdown */}
                <div className="space-y-1">
                  <Label className="text-xs font-normal text-white">
                    Lead Priority
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <LiquidGlass
                        glowIntensity="xs"
                        shadowIntensity="xs"
                        borderRadius="12px"
                      >
                        <Button
                          variant="default"
                          className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent"
                        >
                          <p className="flex items-center gap-2">
                            <span className="text-xs">
                              {" "}
                              {priority === "All"
                                ? "Select A Priority"
                                : priority}
                            </span>
                            <ChevronDown size={18} />
                          </p>
                        </Button>
                      </LiquidGlass>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-white/5 backdrop-blur-2xl"
                    >
                      {["All", "High", "Medium", "Low"].map((item) => (
                        <DropdownMenuItem
                          key={item}
                          onClick={() => {
                            setPriority(item);
                          }}
                          className={item === priority ? "font-medium" : ""}
                        >
                          {item}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* phone number */}
              <div className="space-y-1">
                <Label className="text-xs font-normal text-white">
                  Phone Number
                </Label>
                <input
                  placeholder="+8801754******"
                  className="w-full py-2 rounded-lg text-sm bg-white/10 placeholder:text-sm px-4"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-normal text-white">
              Initial Notes
            </Label>
            <Textarea
              placeholder="Optional notes about the leads"
              className="bg-white/10 resize-none rounded-xl px-4 py-3 placeholder:text-[#B1B1B1] placeholder:text-sm h-[15vh] "
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadsModal;
