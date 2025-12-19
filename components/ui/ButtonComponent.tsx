"use client";

import { LucideIcon } from "lucide-react";
import CornerGlowSvg from "../svgIcon/CornerGlowSvg";
import { cn } from "@/lib/utils";
import GreenSvgForButton from "../svgIcon/GreenSvgForButton";
import RedSvgForButton from "../svgIcon/RedSvgForButton";

type TButtonComponentProps = {
  buttonName: string;
  icon: LucideIcon;
  varient?:
    | "green"
    | "yellow"
    | "red"
    | "dark yellow"
    | "light yellow"
    | "default";
  clasName?: string;
  borderClass?: string;
};

const ButtonComponent = ({
  buttonName,
  icon: Icon,
  varient = "red",
  clasName,
  borderClass,
}: TButtonComponentProps) => {
  return (
    <button
      className={cn(
        "relative cursor-pointer bg-white/5 rounded-xl py-2 flex items-center justify-center px-4 overflow-hidden",
        clasName
      )}
    >
      {/* top and bottom line */}
      <div
        className={cn(
          "absolute top-0 left-0 inset-3 border-l border-t border-white/20 rounded-tl-xl pointer-events-none",
          borderClass
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 right-0 inset-3 border-r border-b border-white/20 rounded-br-xl pointer-events-none",
          borderClass
        )}
      />

      {/* Button text */}
      <p className="flex items-center gap-2">
        <Icon
          size={18}
          className={`${
            varient === "green"
              ? "text-success"
              : varient === "red"
              ? "text-[#F50F0F]"
              : "text-white"
          }`}
        />
        <span className="text-sm">{buttonName}</span>
      </p>

      {/* bottom yellow glow line */}

      {varient === "dark yellow" && (
        <>
          <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
            <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
          </div>
          <CornerGlowSvg />
        </>
      )}
      {varient === "green" && (
        <>
          <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
            <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,transparent_0%,var(--color-success)_50%,transparent_100%)]" />
          </div>
          <GreenSvgForButton />
        </>
      )}
      {varient === "red" && (
        <>
          {/* <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
            <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,transparent_0%,var(--color-success)_50%,transparent_100%)]" />
          </div> */}
          <RedSvgForButton />
        </>
      )}
    </button>
  );
};

export default ButtonComponent;
