"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star, Trophy } from "lucide-react";

type TLeaderBoard = {
  rank: string;
  name: string;
  calls: string;
  conversions: number;
};

const LeaderBoardTable = () => {
  const leaderBoardData: TLeaderBoard[] = [
    { rank: "1", name: "Rafiq Ahmed", calls: "123", conversions: 98 },
    { rank: "2", name: "Sadia Khan", calls: "115", conversions: 92 },
    { rank: "3", name: "Arif Hossain", calls: "110", conversions: 85 },
    { rank: "4", name: "Nabila Rahman", calls: "108", conversions: 80 },
    { rank: "5", name: "Fahim Alam", calls: "105", conversions: 78 },
    { rank: "6", name: "Lamia Akter", calls: "102", conversions: 75 },
    { rank: "7", name: "Tariq Aziz", calls: "100", conversions: 70 },
    { rank: "8", name: "Mim Rashid", calls: "98", conversions: 68 },
    { rank: "9", name: "Shawon Mia", calls: "95", conversions: 65 },
    { rank: "10", name: "Rumana Sultana", calls: "90", conversions: 60 },
  ];
  const keys = ["Rank", "Agent Name", "Calls", "Conversions", "Conv Rate"];

  return (
    <div className="rounded-3xl border border-[rgba(255,255,255,0.15)]  bg-[rgba(255,255,255,0.03)] p-5 overflow-hidden relative w-full">
      <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/30 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/30 rounded-br-3xl pointer-events-none" />

      {/* headers */}
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Team Leaderboards</h1>
        <div className="overflow-x-auto w-full">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                {keys.map((label, ind) => (
                  <TableHead
                    first={ind === 0}
                    last={ind === keys.length - 1}
                    key={label}
                    className="text-left text-xs font-semibold uppercase text-muted-foreground"
                  >
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderBoardData?.map((item: TLeaderBoard, i) => {
                const rate = (item?.conversions / Number(item?.calls)) * 100;

                return (
                  <TableRow
                    key={i}
                    className="border-muted hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {item?.rank == "1" && (
                          <Trophy size={18} className="text-brand" />
                        )}
                        {item?.rank == "2" && <Star size={18} />}
                        {item?.rank == "3" && (
                          <Star size={18} className="text-[#7F5FFF]" />
                        )}
                        {item?.rank}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-center">
                      {item?.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-center">
                      {item?.calls}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm font-medium text-center">
                      <h1 className="text-lg text-success font-medium">
                        {item?.conversions}
                      </h1>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm font-semibold text-center">
                      {rate.toFixed(2)} %
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardTable;
