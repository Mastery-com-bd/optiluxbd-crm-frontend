"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";

interface TeamMember {
  name: string;
  role: string;
  conversion: string;
  calls: string;
  avatar: string;
}

interface Team {
  name: string;
  members: number;
  avgConv: string;
  callsToday: number;
  memberList: TeamMember[];
}

const teamsData: Team[] = [
  {
    name: "Team Alpha",
    members: 3,
    avgConv: "68.7%",
    callsToday: 115,
    memberList: [
      {
        name: "Karim Hossain",
        role: "Agent",
        conversion: "68.5%",
        calls: "45 calls",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Fatima Rahman",
        role: "Agent",
        conversion: "62.3%",
        calls: "38 calls",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Amina Begum",
        role: "Agent",
        conversion: "75.4%",
        calls: "32 calls",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    name: "Team Beta",
    members: 2,
    avgConv: "63.0%",
    callsToday: 80,
    memberList: [
      {
        name: "Karim Hossain",
        role: "Agent",
        conversion: "68.5%",
        calls: "45 calls",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Fatima Rahman",
        role: "Agent",
        conversion: "62.3%",
        calls: "38 calls",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Amina Begum",
        role: "Agent",
        conversion: "75.4%",
        calls: "32 calls",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    name: "Team Gamma",
    members: 1,
    avgConv: "58.9%",
    callsToday: 0,
    memberList: [],
  },
  {
    name: "Team Beta1",
    members: 1,
    avgConv: "63.0%",
    callsToday: 80,
    memberList: [],
  },
  {
    name: "Team Beta3",
    members: 2,
    avgConv: "63.0%",
    callsToday: 80,
    memberList: [
      {
        name: "Karim Hossain",
        role: "Agent",
        conversion: "68.5%",
        calls: "45 calls",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Fatima Rahman",
        role: "Agent",
        conversion: "62.3%",
        calls: "38 calls",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    name: "Team Gamma",
    members: 1,
    avgConv: "58.9%",
    callsToday: 0,
    memberList: [],
  },
  {
    name: "Team Beta",
    members: 1,
    avgConv: "63.0%",
    callsToday: 80,
    memberList: [],
  },
  {
    name: "Team Gamma",
    members: 1,
    avgConv: "58.9%",
    callsToday: 0,
    memberList: [],
  },
  {
    name: "Team Beta",
    members: 1,
    avgConv: "63.0%",
    callsToday: 80,
    memberList: [],
  },
  {
    name: "Team Gamma",
    members: 1,
    avgConv: "58.9%",
    callsToday: 0,
    memberList: [],
  },
];

export function TeamCards() {
  const [expandedTeam, setExpandedTeam] = useState<string | null>("Team Alpha");

  return (
    <div className="grid grid-cols-3 mx-auto gap-6 justify-items-center">
      {teamsData.map((team, i) => (
        <div
          key={i}
          className={`rounded-4xl overflow-hidden p-4 neumorphism ${
            expandedTeam === team.name ? "h-auto" : "h-56"
          }`}
        >
          {/* Header */}
          <div
            className="flex items-center gap-10 justify-between p-4 cursor-pointer"
            onClick={() =>
              setExpandedTeam(expandedTeam === team.name ? null : team.name)
            }
          >
            <div className="flex items-center gap-2">
              <ChevronRight
                className={`w-4 h-4 text-white transition-transform ${
                  expandedTeam === team.name ? "rotate-90" : ""
                }`}
              />
              <span className="text-white font-semibold text-lg">
                {team.name}
              </span>
            </div>
            <span
              className="text-xs text-[#9a9099] px-3 py-1 rounded-full"
              style={{ border: "1px solid rgba(120, 100, 140, 0.4)" }}
            >
              {team.members} members
            </span>
          </div>

          {/* Stats Card */}
          <div className="px-4 pb-4">
            <div className="rounded-3xl p-4 effect">
              <div className="h-20 flex justify-between items-center">
                <div className="text-center">
                  <p className="text-[28px] font-semibold text-[#FDFDFD]">
                    {team.members}
                  </p>
                  <p className="text-[#7a7580] text-xs">Members</p>
                </div>
                <div className="text-center">
                  <p className="text-[28px] font-semibold text-[#FDFDFD]">
                    {team.avgConv}
                  </p>
                  <p className="text-[#7a7580] text-xs">Avg Conv.</p>
                </div>
                <div className="text-center">
                  <p className="text-[28px] font-semibold text-[#FDFDFD]">
                    {team.callsToday}
                  </p>
                  <p className="text-[#7a7580] text-xs">Calls Today</p>
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Member List */}
          {expandedTeam === team.name && team.memberList.length > 0 && (
            <div className="px-4 pb-4 space-y-3">
              {team.memberList.map((member, index) => (
                <LiquidGlass
                  borderRadius="24px"
                  key={index}
                  className="flex items-center justify-between p-3 rounded-[24px]"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(45, 35, 60, 0.4) 0%, rgba(30, 22, 40, 0.3) 100%)",
                    border: "1px solid rgba(80, 60, 100, 0.2)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-white font-medium text-sm">
                        {member.name}
                      </p>
                      <p className="text-[#7a7580] text-xs">{member.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium text-sm">
                        {member.conversion}
                      </p>
                      <p className="text-[#7a7580] text-xs">{member.calls}</p>
                    </div>
                  </div>
                </LiquidGlass>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
