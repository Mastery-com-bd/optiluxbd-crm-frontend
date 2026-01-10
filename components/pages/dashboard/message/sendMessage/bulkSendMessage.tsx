"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import ButtonSvgGlow from "@/components/svgIcon/ButtonSvgGlow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Users } from "lucide-react";
import { useState } from "react";

const BulkSendMessage = () => {
  const [recipientCount, setRecipientCount] = useState(0);

  const handleLoadSample = () => {
    setRecipientCount(125);
  };

  return (
    <LiquidGlass className="p-8 md:p-12 shadow-sm w-full max-w-5xl mx-auto min-h-[600px] flex flex-col justify-between">
      <div>
        <h2 className="text-[20px] font-semibold text-white mb-1">
          Bulk Send Message
        </h2>
        <p className="text-white text-[14px] font-normal mb-6">
          Upload Recipients CSV
        </p>
      </div>
      {/* Upload Area */}
      <div className="flex-1 flex flex-col items-center justify-center border border-[#b4b4b8a2] rounded-3xl mb-8 py-8 group cursor-pointer transition-colors">
        <div className="h-16 w-16 mb-4 text-gray-300 group-hover:text-gray-400 transition-colors">
          <Upload className="w-full h-full" strokeWidth={1.5} />
        </div>
        <p className="text-white text-[16px] font-normal text-center">
          Click to upload or drag and drop
        </p>
        <p className="text-[#B4B4B8] text-[14px] font-normal text-center">
          CSV file with phone numbers or email addresses
        </p>
      </div>

      <div className="space-y-6">
        {/* Recipients Status Bar */}
        <div className="bg-[#FF6B001A] text-lg font-semibold rounded-xl p-4 flex items-center justify-between text-white shadow-lg">
          <div className="flex items-center gap-3">
            <Users className="text-[#E76F51]" size={20} />
            <span className="font-medium">
              {recipientCount} Recipients Selected
            </span>
          </div>
          <button
            onClick={handleLoadSample}
            className="text-[#E76F51] text-sm hover:text-[#ff8a6d] transition-colors"
          >
            Load Sample (125)
          </button>
        </div>

        {/* Channel and Template Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select defaultValue="whatsapp">
            <SelectTrigger className="h-14 bg-[#3E3B4E] border-none text-white rounded-xl focus:ring-1 focus:ring-purple-500 shadow-lg">
              <SelectValue placeholder="Select Channel" />
            </SelectTrigger>
            <SelectContent className="bg-[#3E3B4E] border-none text-white">
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="h-14 bg-[#3E3B4E] border-none text-white rounded-xl focus:ring-1 focus:ring-purple-500 shadow-lg">
              <SelectValue placeholder="Select Your Template" />
            </SelectTrigger>
            <SelectContent className="bg-[#3E3B4E] border-none text-white">
              <SelectItem value="promo">Summer Sale Promo</SelectItem>
              <SelectItem value="update">Policy Update</SelectItem>
              <SelectItem value="alert">System Alert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Send Button */}
        <div className="pt-2">
          <button
              type="submit"
              className={`relative w-full max-w-[400px] py-2 flex items-center justify-center cursor-pointer bg-white/5 rounded-xl
              }`}
            >
              {/* Button text */}
              <span className="relative z-10">Send Now</span>

              <div className="absolute top-0 left-px inset-2.5 border-l border-t border-white/30 rounded-tl-xl pointer-events-none" />

              <div className="absolute bottom-0 right-px inset-2.5 border-r border-b border-white/30 rounded-br-xl pointer-events-none" />

              <div className="absolute z-20 bottom-0 left-0 w-full">
                <span
                  className="block w-full h-[1.5px]"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(255,177,63,0) 0%, #FFB13F 50%, rgba(255,177,63,0) 100%)",
                  }}
                />
              </div>

              <ButtonSvgGlow />
            </button>
        </div>
      </div>
    </LiquidGlass>
  );
};

export default BulkSendMessage;
