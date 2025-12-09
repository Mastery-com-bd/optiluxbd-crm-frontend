"use client";

import { cn } from "@/lib/utils";

interface ComboCardProps {
  background?: string;
  gap?: string;
  radius?: string;
  className?: string;
  children: React.ReactNode;
}

const ComboCard = ({
  gap,
  background = "bg-[rgba(255,255,255,0.10)]",
  radius = "rounded-[20px]",
  className,
  children,
}: ComboCardProps) => {
  return (
    <div className={cn(gap, background, radius, className)}>{children}</div>
  );
};

export default ComboCard;
