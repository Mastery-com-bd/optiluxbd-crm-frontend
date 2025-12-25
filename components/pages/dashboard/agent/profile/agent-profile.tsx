"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Target,
  TrendingUp,
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
              <div className="relative flex items-start gap-3">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 right-5"
                >
                  <path
                    d="M66.6719 29.167H91.6719V54.167"
                    stroke="#05DF72"
                    stroke-opacity="0.1"
                    stroke-width="8.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M91.6634 29.167L56.2467 64.5837L35.4134 43.7503L8.33008 70.8337"
                    stroke="#05DF72"
                    stroke-opacity="0.1"
                    stroke-width="8.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">Conversion Rate</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-white">68.5%</span>
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
              <div className="relative flex items-start gap-3">
                <svg
                  width="90"
                  height="90"
                  viewBox="0 0 90 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -bottom-3 right-5"
                >
                  <path
                    d="M51.868 62.13C52.6425 62.4857 53.5151 62.5669 54.3419 62.3604C55.1687 62.1539 55.9006 61.6718 56.4168 60.9937L57.748 59.25C58.4466 58.3185 59.3525 57.5625 60.3939 57.0418C61.4354 56.5211 62.5837 56.25 63.748 56.25H74.998C76.9872 56.25 78.8948 57.0402 80.3013 58.4467C81.7079 59.8532 82.498 61.7609 82.498 63.75V75C82.498 76.9891 81.7079 78.8968 80.3013 80.3033C78.8948 81.7098 76.9872 82.5 74.998 82.5C57.0959 82.5 39.927 75.3884 27.2683 62.7297C14.6096 50.071 7.49805 32.9021 7.49805 15C7.49805 13.0109 8.28822 11.1032 9.69475 9.6967C11.1013 8.29018 13.0089 7.5 14.998 7.5H26.248C28.2372 7.5 30.1448 8.29018 31.5513 9.6967C32.9579 11.1032 33.748 13.0109 33.748 15V26.25C33.748 27.4143 33.477 28.5627 32.9563 29.6041C32.4355 30.6455 31.6795 31.5514 30.748 32.25L28.993 33.5663C28.3046 34.0919 27.8194 34.8397 27.6198 35.6826C27.4202 36.5254 27.5185 37.4114 27.898 38.19C33.0231 48.5995 41.4521 57.018 51.868 62.13Z"
                    stroke="#51A2FF"
                    stroke-opacity="0.1"
                    stroke-width="7.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-teal-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">Calls This Month</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-white">892</span>
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
              <div className="relative flex items-start gap-3">
                <svg
                  width="84"
                  height="84"
                  viewBox="0 0 84 84"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                   className="absolute -bottom-3 right-5"
                >
                  <path
                    d="M42 77C61.33 77 77 61.33 77 42C77 22.67 61.33 7 42 7C22.67 7 7 22.67 7 42C7 61.33 22.67 77 42 77Z"
                    stroke="#C27AFF"
                    stroke-opacity="0.1"
                    stroke-width="7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M42.002 63C53.5999 63 63.002 53.598 63.002 42C63.002 30.402 53.5999 21 42.002 21C30.404 21 21.002 30.402 21.002 42C21.002 53.598 30.404 63 42.002 63Z"
                    stroke="#C27AFF"
                    stroke-opacity="0.1"
                    stroke-width="7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M42 49C45.866 49 49 45.866 49 42C49 38.134 45.866 35 42 35C38.134 35 35 38.134 35 42C35 45.866 38.134 49 42 49Z"
                    stroke="#C27AFF"
                    stroke-opacity="0.1"
                    stroke-width="7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">Todays Target</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-white">98%</span>
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
