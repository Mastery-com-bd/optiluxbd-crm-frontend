"use client";
import CornerGlowSvg from "@/components/svgIcon/CornerGlowSvg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { agentList } from "../../team/CreateTeam";
import Image from "next/image";
import ButtonSvgGlow from "@/components/svgIcon/ButtonSvgGlow";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const AssignMembers = () => {
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
            <span className="text-sm">Add New Member</span>
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
      <DialogContent className="px-6 py-3 w-[20vw] gap-4">
        <DialogHeader className="flex flex-row items-center justify-between ">
          <DialogTitle className="text-lg font-medium">
            Assign New Agent
          </DialogTitle>
        </DialogHeader>

        {/* Lower section agent list */}
        <div className=" w-full h-[60vh] ">
          {/* main content */}
          <div className="space-y-3 h-full overflow-y-auto no-scrollbar">
            <input
              placeholder="Search agent by ID or Name"
              className="w-full py-2 rounded-xl text-sm bg-white/10 placeholder:text-sm px-4 outline-none border border-white/5"
            />
            <p className="text-sm text-white/70 flex items-center justify-between">
              <span>All Agents</span>{" "}
              <span>{selectedAgents.length} selected</span>
            </p>

            <div className="space-y-3">
              {agentList.map((data, i) => {
                return (
                  <div
                    key={i}
                    className="relative bg-white/10 rounded-xl py-2 px-3"
                  >
                    {/* top and bottom border */}
                    <div className="absolute top-0 left-px inset-4 border-l-[1.5px] border-t-[1.5px] border-white/20 rounded-tl-xl pointer-events-none" />
                    <div className="absolute bottom-0 right-px inset-4 border-r-[1.5px] border-b-[1.5px] border-white/20 rounded-br-xl pointer-events-none" />

                    {/* main content */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 ">
                        <Image
                          src={
                            data?.profileImage ??
                            "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
                          }
                          alt="Agent Avatar"
                          width={500}
                          height={500}
                          className="object-cover h-10 w-10 rounded-full"
                        />
                        <div className="text-xs space-y-1">
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
                        className="h-4 w-4 rounded-none border border-white/30 data-[state=checked]:border-brand [&>span]:flex [&>span]:items-center [&>span]:justify-center [&_svg]:h-3 [&_svg]:w-3 data-[state=checked]:text-brand cursor-pointer"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button
            className={`relative cursor-pointer bg-white/5 rounded-2xl py-2 flex items-center justify-center px-4 overflow-hidden`}
          >
            {/* Button text */}
            <p className="flex items-center gap-2">
              <Plus size={18} />
              <span className="text-sm">Assign</span>
            </p>

            {/* top and bottom line */}
            <div className="absolute top-0 left-px inset-3 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-px inset-3 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

            {/* bottom yellow glow line */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
              <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
            </div>
            <ButtonSvgGlow />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignMembers;
