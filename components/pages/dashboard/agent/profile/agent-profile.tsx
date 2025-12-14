"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import {
    Calendar,
    Mail,
    MapPin,
    Phone,
    Target,
    TrendingUp
} from "lucide-react";
import Image from "next/image";
import { PerformanceChart } from "./performance-chart";

export function AgentProfile() {
  return (
    <div className="w-full">
      {/* Header */}

      <div className="flex gap-6">
        {/* Left Column - Profile Card */}
        <LiquidGlass borderRadius="16px" className="w-[320px] shrink-0">
          <div
            className="rounded-2xl p-6"
            style={{
              background:
                "linear-gradient(145deg, rgba(60, 40, 80, 0.6) 0%, rgba(30, 20, 50, 0.8) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Diamond Badge */}
            <LiquidGlass
              borderRadius="8px"
              className="inline-block px-3 py-1 text-white text-sm mb-4"
            >
              Diamond
            </LiquidGlass>

            {/* Profile Image */}
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-600">
                <Image
                  width={128}
                  height={128}
                  src="/agent-profile.png"
                  alt="Karim Hossain"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name and Role */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">
                Karim Hossain
              </h2>
              <p className="text-gray-300 text-sm mb-1">Senior Sales Agent</p>
              <p className="text-gray-400 text-sm">Team Alpha</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <LiquidGlass
                borderRadius="12px"
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ background: "rgba(255, 255, 255, 0.05)" }}
              >
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">+880 1712-345001</span>
              </LiquidGlass>
              <LiquidGlass
                borderRadius="12px"
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ background: "rgba(255, 255, 255, 0.05)" }}
              >
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  karim.hossain@optiluxbd.com
                </span>
              </LiquidGlass>
              <LiquidGlass
                borderRadius="12px"
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ background: "rgba(255, 255, 255, 0.05)" }}
              >
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">Banani, Dhaka</span>
              </LiquidGlass>
              <LiquidGlass
                borderRadius="12px"
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ background: "rgba(255, 255, 255, 0.05)" }}
              >
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="text-gray-400 text-xs block">Joined</span>
                  <span className="text-gray-300 text-sm">1/15/2023</span>
                </div>
              </LiquidGlass>
            </div>
          </div>
        </LiquidGlass>

        {/* Right Column */}
        <div className="flex-1 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            {/* Conversion Rate */}
            <LiquidGlass
              borderRadius="12px"
              className="rounded-xl p-5"
              style={{
                background:
                  "linear-gradient(145deg, rgba(60, 40, 80, 0.4) 0%, rgba(30, 20, 50, 0.6) 100%)",
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">Conversion Rate</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-white">68.5%</span>
                    <TrendingUp className="w-6 h-6 text-gray-500" />
                  </div>
                </div>
              </div>
            </LiquidGlass>

            {/* Calls This Month */}
            <LiquidGlass
              borderRadius="12px"
              className="rounded-xl p-5"
              style={{
                background:
                  "linear-gradient(145deg, rgba(60, 40, 80, 0.4) 0%, rgba(30, 20, 50, 0.6) 100%)",
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-teal-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">Calls This Month</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-white">892</span>
                    <Phone className="w-6 h-6 text-gray-500" />
                  </div>
                </div>
              </div>
            </LiquidGlass>

            {/* Todays Target */}
            <LiquidGlass
              borderRadius="12px"
              className="rounded-xl p-5"
              style={{
                background:
                  "linear-gradient(145deg, rgba(60, 40, 80, 0.4) 0%, rgba(30, 20, 50, 0.6) 100%)",
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">Todays Target</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-white">98%</span>
                    <div className="w-6 h-6 text-gray-500">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </LiquidGlass>
          </div>

          {/* Performance Chart */}
          <PerformanceChart />
        </div>
      </div>
    </div>
  );
}
