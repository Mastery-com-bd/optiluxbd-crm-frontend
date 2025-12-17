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
import { ImageIcon, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import CornerGlowSvg from "@/components/svgIcon/CornerGlowSvg";

const teamLeaders = [
  { label: "Ruhul Khan", value: "ruhul" },
  { label: "Ayesha Akter", value: "ayesha" },
  { label: "Sabbir Ahmed", value: "sabbir" },
];

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
  const [image, setImage] = useState<File | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [selectedLeader, setSelectedLeader] = useState<string>("");
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
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
            Create New Team
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
              Create Team
            </Button>
          </LiquidGlass>
        </DialogHeader>
        <>
          {/* upper section */}
          <div className="flex items-center justify-between gap-4 ">
            {/* left side */}
            <div className="flex flex-col gap-2 w-full h-full ">
              {/* profile Image */}
              <div className="flex flex-col gap-1 ">
                <label className="text-white text-sm">Profile Photo</label>
                <div
                  className={` flex flex-col items-center justify-center border border-dashed border-white rounded-2xl w-full h-[24vh] py-6 bg-white/20 text-center cursor-pointer hover:bg-white/25 transition-colors`}
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/png, image/jpeg";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        setImage(file);
                      }
                    };
                    input.click();
                  }}
                >
                  {image ? (
                    <div className="relative ">
                      <button
                        className="absolute top-0 right-0 border border-white rounded-full bg-rose-500 cursor-pointer z-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImage(null);
                        }}
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                      <Image
                        src={URL.createObjectURL(image)}
                        height={400}
                        width={400}
                        alt="customer image"
                        className="w-40 h-40 object-cover rounded-xl"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center ">
                      <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <ImageIcon className="size-5 text-white/70" />
                      </div>
                      <p className="text-sm text-white/90">
                        Upload Team image.
                      </p>
                      <p className="text-[10px] text-white/40">
                        Only PNG, JPG format allowed.
                      </p>
                      <p className="text-[10px] text-white/40">
                        500x500 pixels are recommended.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* customer Name */}
              <div className="space-y-1">
                <Label className="text-sm font-normal text-white">
                  Team Name
                </Label>
                <input
                  placeholder="Enter team name"
                  className="w-full py-2 rounded-lg text-sm bg-white/10 placeholder:text-sm px-4"
                />
              </div>

              {/* agent dropdoen */}
              <div className="space-y-1">
                <Label className="text-sm font-normal text-white">
                  Assign Members
                </Label>
                <Select
                  value={selectedAgent}
                  onValueChange={(val) => setSelectedAgent(val)}
                >
                  <SelectTrigger className="w-full py-2 rounded-lg text-sm bg-white/10 placeholder:text-sm px-4">
                    <SelectValue placeholder="Search and Select Agnets" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/15 backdrop-blur-2xl z-100">
                    {teamLeaders.map((leader) => (
                      <SelectItem key={leader.value} value={leader.value}>
                        {leader.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* right side */}
            <div className="flex flex-col h-full justify-between gap-2 w-full">
              {/* target calls / day */}
              <div className="space-y-1">
                <Label className="text-sm font-normal text-white">
                  Target Calls/Day
                </Label>
                <input
                  type="number"
                  placeholder="enter target"
                  className="w-full py-2 rounded-lg text-sm bg-white/10 placeholder:text-sm px-4"
                />
              </div>

              {/* target conversion */}
              <div className="space-y-1">
                <Label className="text-sm font-normal text-white">
                  Target Conversion %
                </Label>
                <input
                  type="number"
                  placeholder="%"
                  className="w-full py-2 rounded-lg text-sm bg-white/10 placeholder:text-sm  px-4"
                />
              </div>

              {/* assign team leader */}
              <div className="space-y-1">
                <Label className="text-sm font-normal text-white">
                  Team Leader
                </Label>
                <Select
                  value={selectedLeader}
                  onValueChange={(val) => setSelectedLeader(val)}
                >
                  <SelectTrigger className="w-full py-2 rounded-lg text-sm bg-white/10 placeholder:text-sm px-4">
                    <SelectValue placeholder="Select Team Leader" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/15 backdrop-blur-2xl z-100">
                    {teamLeaders.map((leader) => (
                      <SelectItem key={leader.value} value={leader.value}>
                        {leader.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-normal text-white">
                  Team Description
                </Label>
                <Textarea
                  placeholder="Write a team description"
                  className="bg-white/10 resize-none rounded-xl px-4 py-3 placeholder:text-[#B1B1B1] placeholder:text-sm h-[15vh] "
                />
              </div>
            </div>
          </div>

          {/* Lower section agent list */}
          <div className="bg-white/10 relative rounded-xl px-4 pt-2 w-1/2 h-[35vh] ">
            {/* top and bottom border */}
            <div className="absolute top-0 left-px inset-4 border-l-[1.5px] border-t-[1.5px] border-white/30 rounded-tl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-px inset-4 border-r-[1.5px] border-b-[1.5px] border-white/30 rounded-br-xl pointer-events-none" />

            {/* main content */}
            <div className="space-y-1 h-full overflow-y-auto no-scrollbar">
              <input
                placeholder="Search agent by ID or Name"
                className="w-full py-2 rounded-xl text-sm bg-white/10 placeholder:text-sm px-4 outline-none border border-white/5"
              />
              <p className="text-sm text-white/70 flex items-center justify-between">
                <span>All Agents</span> <span>0 selected</span>
              </p>

              <div className="space-y-2">
                {agentList.map((data, i) => {
                  return (
                    <div
                      key={i}
                      className="relative bg-white/10 rounded-xl py-1 px-3"
                    >
                      {/* top and bottom border */}
                      <div className="absolute top-0 left-px inset-4 border-l-[1.5px] border-t-[1.5px] border-white/20 rounded-tl-xl pointer-events-none" />
                      <div className="absolute bottom-0 right-px inset-4 border-r-[1.5px] border-b-[1.5px] border-white/20 rounded-br-xl pointer-events-none" />

                      {/* main content */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Image
                            src={
                              data?.profileImage ??
                              "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
                            }
                            alt="Agent Avatar"
                            width={500}
                            height={500}
                            className="object-cover h-7 w-7 rounded-full"
                          />
                          <div className="text-xs">
                            <h1 className="font-medium ">{data?.name}</h1>
                            <p className="text-[#B1B1B1] flex items-center gap-1">
                              <span>Agent ID:</span> {data?.agentId}
                            </p>
                          </div>
                        </div>
                        <Checkbox
                          checked={selectedAgents.includes(data.agentId)}
                          onCheckedChange={(checked) => {
                            setSelectedAgents((prev) =>
                              checked
                                ? [...prev, data.agentId]
                                : prev.filter((id) => id !== data.agentId)
                            );
                          }}
                          className="h-3 w-3 rounded-none border border-white/30 data-[state=checked]:border-brand [&>span]:flex [&>span]:items-center [&>span]:justify-center [&_svg]:h-3 [&_svg]:w-3 data-[state=checked]:text-brand cursor-pointer"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadsModal;
