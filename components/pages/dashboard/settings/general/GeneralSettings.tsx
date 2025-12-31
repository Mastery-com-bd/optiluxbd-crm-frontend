"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Building2,
  Calendar,
  DollarSign,
  Globe,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  currentConfiguration,
  systemInformation,
} from "../SettingsHome/const/settings.const";

const GeneralSettings = () => {
  const [image, setImage] = useState<File | null>(null);
  return (
    <section className="w-full space-y-4">
      {/* header */}
      <div>
        <h1 className="text-3xl font-semibold leading-8">General Settings</h1>
        <p className="text-[#A1A1A1] leading-5">
          Configure your company profile and system preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
        {/* left side */}
        <div className="w-full space-y-5">
          {/* first part */}
          <Card className="bg-[rgba(255,255,255,0.10)] w-full rounded-2xl relative py-4 px-6">
            {/* top and bottom border */}
            <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-2xl relative bg-[rgba(255,107,0,0.13)]`}
                >
                  {/* top and borrom border */}
                  <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/15 rounded-tl-2xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/15 rounded-br-2xl pointer-events-none" />
                  <Building2 className="text-[#FF6B00]" />
                </div>
                <div>
                  <h1 className="text-[#FDFDFD] text-lg">
                    Company Information
                  </h1>
                  <p className="text-[#B1B1B1] text-sm">
                    Basic company details
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-text-secondary">Company Name</Label>
                <input
                  type="text"
                  className="w-full py-2 px-4 rounded-2xl bg-[rgba(255,255,255,0.10)]"
                  placeholder="Company name"
                />
              </div>

              {/* profile Image */}
              <div className="space-y-3 ">
                <Label className="text-text-secondary">Company Logo</Label>
                <div
                  className={` flex flex-col items-center justify-center rounded-2xl w-full h-[30vh] py-10 bg-white/10 text-center cursor-pointer hover:bg-white/10 transition-colors relative`}
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/png, image/jpeg";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        setImage(file);
                      }
                    };
                    input.click();
                  }}
                >
                  <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />
                  <div>
                    {image ? (
                      <div className="relative ">
                        <button
                          className="absolute top-0 right-0 border border-white rounded-full bg-rose-500 cursor-pointer z-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImage(null);
                          }}
                        >
                          <X className="w-5 h-5 text-white" />
                        </button>
                        <Image
                          src={URL.createObjectURL(image)}
                          height={400}
                          width={400}
                          alt="customer image"
                          className="w-40 h-40 object-cover rounded-xl"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div
                          className={`p-3 rounded-2xl relative bg-[rgba(255,107,0,0.13)]`}
                        >
                          {/* top and borrom border */}
                          <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/15 rounded-tl-2xl pointer-events-none" />
                          <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/15 rounded-br-2xl pointer-events-none" />
                          <Upload className="text-[#FF6B00]" />
                        </div>
                        <p className="text-base text-white">
                          Drag & drop your logo here.
                        </p>
                        <p className="text-sm text-white/40">
                          PNG, JPG or SVG (Max 2MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* second part */}
          <Card className="bg-[rgba(255,255,255,0.10)] w-full rounded-2xl relative py-4 px-6">
            {/* top and bottom border */}
            <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-2xl relative bg-[rgba(42,133,255,0.10)]`}
                >
                  {/* top and borrom border */}
                  <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/15 rounded-tl-2xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/15 rounded-br-2xl pointer-events-none" />
                  <Globe className="text-[#2A85FF]" />
                </div>
                <div>
                  <h1 className="text-[#FDFDFD] text-lg">Regional Settings</h1>
                  <p className="text-[#B1B1B1] text-sm">
                    Localization preferences
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3 relative">
                  <Label className="text-text-secondary">Currency</Label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 rounded-2xl bg-[rgba(255,255,255,0.10)]"
                  />
                  <DollarSign size={14} className="absolute top-10 left-3" />
                </div>
                <div className="space-y-3">
                  <Label className="text-text-secondary">Timezone</Label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 rounded-2xl bg-[rgba(255,255,255,0.10)]"
                  />
                </div>
                <div className="space-y-3 relative">
                  <Label className="text-text-secondary">Date Format</Label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 rounded-2xl bg-[rgba(255,255,255,0.10)]"
                  />
                  <Calendar size={14} className="absolute top-10 left-3" />
                </div>
                <div className="space-y-3">
                  <Label className="text-text-secondary">Language</Label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 rounded-2xl bg-[rgba(255,255,255,0.10)]"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* right side  */}
        <div className="w-full space-y-5">
          {/* first part */}
          <Card className="bg-[rgba(255,255,255,0.10)] w-full rounded-2xl relative py-4 px-6">
            {/* top and bottom border */}
            <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

            <div className="space-y-6">
              <h1 className="text-[#FDFDFD] text-2xl">Current Configuration</h1>

              <div className="space-y-3">
                {currentConfiguration.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/5 rounded-3xl relative px-6 py-3"
                  >
                    {/* top and the bottom border */}
                    <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-3xl pointer-events-none" />
                    <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-3xl pointer-events-none" />
                    <div className="space-y-1">
                      <p className="text-lg text-text-secondary">{item.name}</p>
                      <h3 className="text-xl">{item.value}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* second part */}
          <Card className="bg-[rgba(255,255,255,0.10)] w-full rounded-2xl relative py-4 px-6">
            {/* top and bottom border */}
            <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

            <div className="space-y-6">
              <h1 className="text-[#FDFDFD] text-2xl">System Information</h1>

              <div className="space-y-2">
                {systemInformation.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <p className="text-lg text-text-secondary">{item.name}</p>
                    <h3
                      className={`text-lg ${
                        item.value === "Connected" || item.value === "Active"
                          ? "text-success"
                          : item.value === "Disconnected" ||
                            item.value === "Inactive"
                          ? "text-red-600"
                          : "text-[#FDFDFD]"
                      } `}
                    >
                      {item.value}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GeneralSettings;
