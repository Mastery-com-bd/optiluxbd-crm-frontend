"use client";

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

  return (
    <div className="space-y-4">
      <Card className="bg-white/5 px-6 py-4 w-full rounded-4xl gap-4 border border-white/10">
        <h1 className="text-xl font-medium">Add New Note</h1>
        <Textarea
          placeholder="Write a note about this customer..."
          className="bg-white/10 resize-none rounded-3xl px-4 py-3 placeholder:text-[#B1B1B1] h-[20vh] placeholder:text-base"
        />
        <div className="flex items-center justify-end">
          <Button
            variant="yellow"
            className="p-3 flex rounded-2xl border-none cursor-pointer"
          >
            <p className="flex items-center gap-2">
              <Plus />
              <span className="text-[14px]">Add New Note</span>
            </p>
          </Button>
        </div>
      </Card>
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
