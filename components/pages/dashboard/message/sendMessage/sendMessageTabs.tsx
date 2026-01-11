"use client";

import SingleSendMessage from "@/components/pages/dashboard/message/sendMessage/singleSendMessage";
import ButtonSvgGlow from "@/components/svgIcon/ButtonSvgGlow";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import BulkSendMessage from "./bulkSendMessage";

const buttons = ["Single Send", "Bulk Send"];

const SendMessageTabs = () => {
  const [current, setCurrent] = useState(buttons[0]);
  return (
    <div>
      <div className="w-full space-y-4">
        <Card className="bg-white/10 px-3 rounded-2xl flex flex-row items-center justify-between gap-1 py-1.5 relative">
          {/* top and bottom border */}
          <div className="absolute top-0 left-px inset-2.5 border-l border-t border-white/20 rounded-tl-xl pointer-events-none" />
          <div className="absolute bottom-0 right-px inset-2.5 border-r border-b border-white/20 rounded-br-xl pointer-events-none" />

          {/* upper section */}
          {buttons.map((item, i) => {
            const active = item === current;
            return (
              <button
                key={i}
                onClick={() => setCurrent(item)}
                className={`relative w-full py-2 flex items-center justify-center cursor-pointer ${
                  active && "bg-white/5 rounded-xl"
                }`}
              >
                {/* Button text */}
                <span className="relative z-10">{item}</span>

                {active && (
                  <div className="absolute top-0 left-px inset-2.5 border-l border-t border-white/30 rounded-tl-xl pointer-events-none" />
                )}
                {active && (
                  <div className="absolute bottom-0 right-px inset-2.5 border-r border-b border-white/30 rounded-br-xl pointer-events-none" />
                )}

                {active && (
                  <div className="absolute z-20 bottom-0 left-0 w-full">
                    <span
                      className="block w-full h-[1.5px]"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(255,177,63,0) 0%, #FFB13F 50%, rgba(255,177,63,0) 100%)",
                      }}
                    />
                  </div>
                )}

                {active && <ButtonSvgGlow />}
              </button>
            );
          })}
        </Card>

        {current === "Single Send" && <SingleSendMessage />}
        {current === "Bulk Send" && <BulkSendMessage />}
      </div>
      {/* <MessagePage /> */}
    </div>
  );
};

export default SendMessageTabs;
