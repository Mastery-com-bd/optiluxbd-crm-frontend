"use client";

import { useState } from "react";
import Link from "next/link";
import { SidebarMenuSubButton } from "@/components/ui/sidebar";
import SidebarButtonSvg from "../svgIcon/SidebarButtonSvg";

type SubItemButtonProps = {
  isActive: boolean;
  subItem: { title: string; path: string };
};

const SubItemButton = ({ isActive, subItem }: SubItemButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Show the effect if the button is active OR hovered
  const showEffect = isActive || isHovered;

  return (
    <SidebarMenuSubButton asChild>
      <button
        className="relative cursor-pointer bg-transparent border-none rounded-lg py-2 flex justify-start items-center px-2 overflow-hidden w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow SVG */}
        {showEffect && <SidebarButtonSvg />}

        {/* Top-left border */}
        {showEffect && (
          <div className="absolute top-0 left-px inset-1.5 border-l border-t border-white/20 rounded-tl-lg pointer-events-none" />
        )}

        {/* Bottom-right border */}
        {showEffect && (
          <div className="absolute bottom-0 right-px inset-1.5 border-r border-b border-white/20 rounded-br-lg pointer-events-none" />
        )}

        {/* Bottom gradient line */}
        {showEffect && (
          <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
            <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
          </div>
        )}

        {/* Link text */}
        <Link
          href={subItem.path}
          className="relative z-10 w-full text-sm font-normal text-left"
        >
          {subItem.title}
        </Link>
      </button>
    </SidebarMenuSubButton>
  );
};

export default SubItemButton;
