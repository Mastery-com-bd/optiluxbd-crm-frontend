import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CalendarClock, Clock, LogOut } from "lucide-react";
import React from "react";

const AgentAttendance = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        {/* Today's Status Card */}
        <LiquidGlass className="w-[365px] ">
          <Card className="rounded-4xl">
            <CardContent className="space-y-6">
              <div className="flex justify-between items-start">
                <span className="text-white/90 font-semibold text-[16px]">
                  Today&apos;s Status
                </span>
                <Calendar className="w-6 h-6 text-green-500" />
              </div>

              <div className="space-y-4 border-b border-gray-700 pb-5">
                <div className="flex justify-between items-center">
                  <span className="text-[#B1B1B1]">Check In</span>
                  <span className="text-[#00A656] font-medium text-[16px]">
                    09:05 AM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#B1B1B1]">Check Out</span>
                  <span className="text-[#00A656] font-medium">-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#B1B1B1]">Working Hours</span>
                  <span className="text-[#00A656] font-medium text-[16px]">
                    5h 30m
                  </span>
                </div>
              </div>

              <Button className="w-full -mt-3 rounded-full bg-white/5 hover:bg-white/10 border-2 border-white/20 text-white/90 h-12">
                <LogOut className="w-4 h-4 mr-2 inline" />
                Check Out Now
              </Button>
            </CardContent>
          </Card>
        </LiquidGlass>

        {/* Monthly Stats Card */}
        <LiquidGlass className="w-[365px]">
          <Card className="rounded-4xl shadow-none border-none">
            <CardContent className=" space-y-6">
              <div className="flex justify-between items-start">
                <span className="text-white/90 font-semibold text-[16px]">
                  November 2024
                </span>
                <CalendarClock className="w-6 h-6 text-[#7F5FFF]" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#B1B1B1]">Total Days</span>
                  <span className="text-[#00A656] font-medium text-[16px]">
                    22
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#B1B1B1]">Present</span>
                  <span className="text-[#00A656] font-medium">20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#B1B1B1]">Absent</span>
                  <span className="text-[#00A656] font-medium text-[16px]">
                    2
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#B1B1B1]">Attendance Rate</span>
                  <span className="text-[#2A85FF] font-medium text-[16px]">
                    90.9%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </LiquidGlass>

        {/* Working Hours Card */}
        <LiquidGlass className="w-[365px] ">
          <Card className="rounded-4xl shadow-none border-none">
            <div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-transparent pointer-events-none" />
            <CardContent className=" space-y-6 relative">
              <div className="flex justify-between items-start">
                <span className="text-white/90 font-semibold text-[16px]">
                  Working Hours
                </span>
                <Clock className="w-6 h-6 text-[#2A85FF]" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#B1B1B1]">Today</span>
                  <span className="text-[#00A656] font-medium text-[16px]">
                    5h 30m
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#B1B1B1]">This Week</span>
                  <span className="text-[#00A656] font-medium">44h 15m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#B1B1B1]">Avg. Daily</span>
                  <span className="text-[#2A85FF] font-medium text-[16px]">
                    8h 51m
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#B1B1B1]">Target</span>
                  <span className="text-[#00A656] font-medium text-[16px]">
                    9h 00m
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </LiquidGlass>
      </div>
    </div>
  );
};

export default AgentAttendance;
