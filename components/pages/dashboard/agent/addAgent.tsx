"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RefreshCw, Calendar, ChevronDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import ImageIcon from "@/public/icons/image-icon";
import Image from "next/image";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import ButtonComponent from "@/components/ui/ButtonComponent";

const AddAgent = () => {
  const [isActive, setIsActive] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState<File | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative">
          <ButtonComponent buttonName="Add New Agent" icon={Plus} varient="yellow" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-white/7 border-white/10 backdrop-blur-2xl">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <DialogHeader className="px-0 pt-0 pb-0 text-left">
              <DialogTitle className="text-xl font-medium text-white">
                Add New Agent
              </DialogTitle>
            </DialogHeader>
            <ButtonComponent buttonName="Add Agent" varient="yellow" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}

            {/* Profile Photo */}

            <div className="space-y-2 row-span-4">
              <label
                htmlFor="profileImage"
                className="text-sm font-medium text-[#FDFDFD]"
              >
                Profile Photo
              </label>
              {profileImage ? (
                <div className="relative h-full my-2.5">
                  <Image
                    width={400}
                    height={250}
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile"
                    className="h-[calc(100%-2.5rem)] rounded-2xl object-contain"
                  />
                  <button
                    onClick={() => setProfileImage(null)}
                    className="absolute -top-3 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-semibold"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="h-full">
                  <label
                    htmlFor="profileImage"
                    className="h-[calc(100%-2.5rem)] flex flex-col items-center justify-center border border-dashed border-white/20 rounded-2xl bg-white/20 text-center relative overflow-hidden group cursor-pointer hover:bg-white/50 transition-colors mt-2.5"
                  >
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20 pointer-events-none" />
                    <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center mb-3  relative z-10">
                      <ImageIcon />
                    </div>
                    <p className="text-base font-bold text-white/90 mb-1 relative z-10">
                      Upload Agent image.
                    </p>
                    <p className="text-[14px] font-normal text-white/40 relative z-10">
                      Only PNG, JPG format allowed.
                    </p>
                    <p className="text-[14px] font-normal text-white/40 relative z-10">
                      500x500 pixels are recommended.
                    </p>
                  </label>
                  <Input
                    id="profileImage"
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProfileImage(file);
                      }
                    }}
                  />
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#FDFDFD]">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <Input
                placeholder="1712345678"
                className="w-full h-12 rounded-xl bg-white/5  px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all mt-2.5"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#FDFDFD]">
                Email <span className="text-red-400">*</span>
              </label>
              <Input
                placeholder="agent@optiluxbd.com"
                className="w-full h-12 rounded-xl bg-white/5  px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all mt-2.5"
              />
            </div>

            {/* Team */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#FDFDFD]">
                Team <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="w-full h-12 rounded-xl bg-white/5  px-4 flex items-center justify-between text-sm text-white/50 cursor-pointer hover:bg-white/10 transition-colors mt-2.5">
                  <span>Select Team</span>
                  <ChevronDown className="size-4 opacity-50" />
                </div>
              </div>
            </div>

            {/* Joining Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#FDFDFD]">
                Joining Date
              </label>
              <div className="relative">
                <Input className="w-full h-12 rounded-xl bg-white/5  px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all mt-2.5" />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-white/50" />
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#FDFDFD]">
                Full Name <span className="text-red-400">*</span>
              </label>
              <Input
                placeholder="Enter full name"
                className="w-full h-12 rounded-xl bg-white/5  px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all mt-2.5"
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#FDFDFD]">
                Status
              </label>
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={cn(
                    "w-12 h-7 rounded-full transition-colors relative",
                    isActive ? "bg-[#f6c56b]" : "bg-white/10"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1 left-1 size-5 rounded-full bg-white transition-transform",
                      isActive ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
                <span className="text-sm text-white">
                  {isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Agent ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#FDFDFD]">
                Agent ID / Username <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-3 mt-2.5">
                <Input
                  placeholder="OPT3093"
                  className="flex-1 h-12 rounded-xl bg-white/5  px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                />
                <button className="size-12 rounded-xl bg-white/5  flex items-center justify-center hover:bg-white/10 transition-colors text-white/70">
                  <RefreshCw className="size-5" />
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#FDFDFD]">
                Password (Auto-generated)
              </label>
              <div className="flex gap-3 mt-2.5">
                <Input
                  placeholder="#jmQaqEBCyxd"
                  readOnly
                  className="flex-1 h-12 rounded-xl bg-white/5 border-none px-4 text-sm text-white/50 placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                />
                <button className="size-12 rounded-xl bg-white/5  flex items-center justify-center hover:bg-white/10 transition-colors text-white/70">
                  <RefreshCw className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAgent;
