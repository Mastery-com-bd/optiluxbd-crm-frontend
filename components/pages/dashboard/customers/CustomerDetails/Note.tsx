"use client";

import CornerGlowSvg from "@/components/svgIcon/CornerGlowSvg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

type TNoteData = {
  title: string;
  role: string;
  date: string;
};

const Note = () => {
  const nodeData: TNoteData[] = [
    { title: "Interested in bulk orders", role: "Admin", date: "Dec 1, 2025" },
    {
      title: "Requested call before delivery",
      role: "Admin",
      date: "Nov 29, 2025",
    },
    { title: "Interested in bulk orders", role: "Admin", date: "Nov 3, 2025" },
  ];

  const handleSubmit = async () => {
    console.log("this is handle submit");
  };

  return (
    <div className="space-y-4">
      {/* add note */}
      <Card className="bg-white/5 px-6 py-4 w-full rounded-4xl gap-4 border border-white/10">
        <h1 className="text-xl font-medium">Add New Note</h1>
        <Textarea
          placeholder="Write a note about this customer..."
          className="bg-white/10 resize-none rounded-3xl px-4 py-3 placeholder:text-[#B1B1B1] h-[20vh] placeholder:text-base"
        />
        <div className="flex items-center justify-end bg-transparent">
          <button
            onClick={handleSubmit}
            className={`relative cursor-pointer bg-white/5 rounded-2xl py-2 flex items-center justify-center px-4 overflow-hidden`}
          >
            {/* Button text */}
            <p className="flex items-center gap-2">
              <Plus size={18} />
              <span className="text-sm">Add New Note</span>
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
        </div>
      </Card>

      {/* previous note */}
      <Card className="bg-white/5 px-6 py-4 w-full rounded-4xl gap-4 border border-white/10">
        <h1 className="text-xl font-medium">Previous Notes (3)</h1>
        {nodeData.map((data, i) => (
          <div
            key={i}
            className="bg-white/5 rounded-2xl space-y-4 border border-white/10 px-4 py-3 flex justify-between"
          >
            <div className="space-y-3">
              <h1 className="text-base text-[#FDFDFD]">{data?.title}</h1>
              <p className="text-[#B1B1B1] flex items-center gap-1 text-sm leading-4">
                <span>{data?.role}</span>
                <span className="h-[3px] w-[3px] rounded-full bg-[#B1B1B1]" />
                <span>{data?.date}</span>
              </p>
            </div>
            <div>
              <Trash2 size={18} className="text-red-700" />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default Note;
