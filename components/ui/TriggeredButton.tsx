"use client";
import React from "react";
import { Plus } from "lucide-react";
import CornerGlowSvg from "../svgIcon/CornerGlowSvg";

type Props = {
  name: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const TriggeredButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ name, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        {...props}
        className="relative cursor-pointer bg-white/5 rounded-2xl py-2 flex items-center justify-center px-4 overflow-hidden"
      >
        <p className="flex items-center gap-2">
          <Plus size={18} />
          <span className="text-sm">{name}</span>
        </p>

        <div className="absolute top-0 left-px inset-3 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-px inset-3 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

        <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
          <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
        </div>

        <CornerGlowSvg />
      </button>
    );
  },
);

TriggeredButton.displayName = "TriggeredButton";

export default TriggeredButton;
