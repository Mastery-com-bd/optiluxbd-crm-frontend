"use client"

import { useState } from "react";
import ButtonSvgGlow from "@/components/svgIcon/ButtonSvgGlow";
import { Card } from "@/components/ui/card";
import Templates from "./Templates";
import SendMessageTabs from "./sendMessage/sendMessageTabs";
import MessageHistory from "./MessageHistory";

// Interface for Message Data

const MessageComponent = () => {
  const buttons = ["Templates", "Send Message", "Message History"];
  const [current, setCurrent] = useState(buttons[0]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold leading-8">Messaging center</h1>
        <p className="text-[#A1A1A1] leading-5">
          Operational overview and quick actions.
        </p>
      </div>

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
              }`}>
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

      {current === "Templates" && <Templates />}
      {current === "Send Message" && <SendMessageTabs />}
      {current === "Message History" && <MessageHistory />}
    </div>
  );
};

export default MessageComponent;