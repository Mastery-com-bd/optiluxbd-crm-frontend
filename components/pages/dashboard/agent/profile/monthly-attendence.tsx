"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type AttendanceStatus = "PRESENT" | "LATE" | "ABSENT" | "LEAVE" | null;

interface DayData {
  day: number;
  status: AttendanceStatus;
}

const attendanceData: DayData[] = [
  // Week 1 (starts from Sunday Dec 1)
  { day: 1, status: "PRESENT" },
  { day: 2, status: "PRESENT" },
  { day: 3, status: "PRESENT" },
  { day: 4, status: "PRESENT" },
  { day: 5, status: "LATE" },
  { day: 6, status: null }, // Friday
  { day: 7, status: null }, // Saturday
  // Week 2
  { day: 8, status: "PRESENT" },
  { day: 9, status: "PRESENT" },
  { day: 10, status: "PRESENT" },
  { day: 11, status: "PRESENT" },
  { day: 12, status: "ABSENT" },
  { day: 13, status: null }, // Friday
  { day: 14, status: null }, // Saturday
  // Week 3
  { day: 15, status: "PRESENT" },
  { day: 16, status: "PRESENT" },
  { day: 17, status: "PRESENT" },
  { day: 18, status: "LATE" },
  { day: 19, status: "PRESENT" },
  { day: 20, status: null }, // Friday
  { day: 21, status: null }, // Saturday
  // Week 4
  { day: 22, status: "PRESENT" },
  { day: 23, status: "PRESENT" },
  { day: 24, status: "LEAVE" },
  { day: 25, status: "PRESENT" },
  { day: 26, status: "PRESENT" },
  { day: 27, status: null }, // Friday
  { day: 28, status: null }, // Saturday
  // Week 5
  { day: 29, status: "PRESENT" },
  { day: 30, status: "PRESENT" },
];

const getStatusColor = (status: AttendanceStatus) => {
  switch (status) {
    case "PRESENT":
      return {
        border: "#22c55e",
        dot: "#22c55e",
        bg: "rgba(34, 197, 94, 0.1)",
      };
    case "LATE":
      return {
        border: "#f97316",
        dot: "#f97316",
        bg: "rgba(249, 115, 22, 0.1)",
      };
    case "ABSENT":
      return {
        border: "#ef4444",
        dot: "#ef4444",
        bg: "rgba(239, 68, 68, 0.1)",
      };
    case "LEAVE":
      return {
        border: "#3b82f6",
        dot: "#3b82f6",
        bg: "rgba(59, 130, 246, 0.15)",
      };
    default:
      return { border: "transparent", dot: "transparent", bg: "transparent" };
  }
};

export function MonthlyAttendance() {
  const [selectedMonth, setSelectedMonth] = useState("December 2025");
  const days = [
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];

  // Simpler approach based on image layout
  const calendarGrid = [
    [
      null,
      null,
      { day: 1, status: "PRESENT" as AttendanceStatus },
      { day: 2, status: "PRESENT" as AttendanceStatus },
      { day: 3, status: "PRESENT" as AttendanceStatus },
      { day: 4, status: "PRESENT" as AttendanceStatus },
      { day: 5, status: "LATE" as AttendanceStatus },
    ],
    [
      { day: 6, status: null as AttendanceStatus },
      { day: 7, status: null as AttendanceStatus },
      { day: 8, status: "PRESENT" as AttendanceStatus },
      { day: 9, status: "PRESENT" as AttendanceStatus },
      { day: 10, status: "PRESENT" as AttendanceStatus },
      { day: 11, status: "PRESENT" as AttendanceStatus },
      { day: 12, status: "ABSENT" as AttendanceStatus },
    ],
    [
      { day: 13, status: null as AttendanceStatus },
      { day: 14, status: null as AttendanceStatus },
      { day: 15, status: "PRESENT" as AttendanceStatus },
      { day: 16, status: "PRESENT" as AttendanceStatus },
      { day: 17, status: "PRESENT" as AttendanceStatus },
      { day: 18, status: "LATE" as AttendanceStatus },
      { day: 19, status: "PRESENT" as AttendanceStatus },
    ],
    [
      { day: 20, status: null as AttendanceStatus },
      { day: 21, status: null as AttendanceStatus },
      { day: 22, status: "PRESENT" as AttendanceStatus },
      { day: 23, status: "PRESENT" as AttendanceStatus },
      { day: 24, status: "LEAVE" as AttendanceStatus },
      { day: 25, status: "PRESENT" as AttendanceStatus },
      { day: 26, status: "PRESENT" as AttendanceStatus },
    ],
    [
      { day: 27, status: null as AttendanceStatus },
      { day: 28, status: null as AttendanceStatus },
      { day: 29, status: "PRESENT" as AttendanceStatus },
      { day: 30, status: "PRESENT" as AttendanceStatus },
      null,
      null,
      null,
    ],
  ];

  return (
    <div
      className="rounded-3xl p-8 effect"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Monthly Attendance</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white"
          style={{ background: "rgba(255, 255, 255, 0.1)" }}
        >
          <span>{selectedMonth}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-3">
        {/* Day Headers */}
        {days.map((day) => (
          <div key={day} className="text-center text-gray-400 text-sm pb-4">
            {day}
          </div>
        ))}

        {/* Calendar Cells */}
        {calendarGrid.map((week, weekIndex) =>
          week.map((dayData, dayIndex) => {
            if (dayData === null) {
              return <div key={`${weekIndex}-${dayIndex}`} className="h-24" />;
            }

            const isWeekend = dayData.status === null;
            const colors = getStatusColor(dayData.status);

            if (isWeekend) {
              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className="h-24 rounded-xl flex items-start justify-start p-3"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <span className="text-gray-600 text-lg">{dayData.day}</span>
                </div>
              );
            }

            return (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className="h-24 rounded-xl flex flex-col justify-between p-3"
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <span className="text-white text-lg font-medium">
                  {dayData.day}
                </span>
                <div className="flex flex-col items-start gap-1">
                  <span
                    className="text-xs font-medium"
                    style={{ color: colors.dot }}
                  >
                    {dayData.status}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.dot }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
