"use client";

import { cn } from "@/lib/utils";

interface ComboCardProps {
  height?: string;
  background?: string;
  padding?: string;
  gap?: string;
  radius?: string;
  className?: string;
  children: React.ReactNode;
}

const ComboCard = ({
  height,
  padding = "p-4",
  gap,
  background = "bg-[rgba(255,255,255,0.10)]",
  radius = "rounded-[20px]",
  className,
  children,
}: ComboCardProps) => {
  return (
    <div className={cn(height, padding, gap, background, radius, className)}>
      {children}
    </div>
  );
};

export default ComboCard;
