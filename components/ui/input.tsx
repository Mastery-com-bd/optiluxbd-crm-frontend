/* import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
 */

"use client";

import { cn } from "@/lib/utils";

export function Input({
  className,
  type,
  icon,
  borderRadius = "16px",
  ...props
}: React.ComponentProps<"input"> & {
  icon?: React.ReactNode;
  borderRadius?: string;
}) {
  return (
    <div className="relative h-11 effect flex items-center gap-3 px-4   bg-white/10 backdrop-blur-3xl rounded-2xl focus-within:border-white/30 focus-within:shadow-md transition-[box-shadow,border-color]">
      {/* <Search className="w-6 h-6 text-[#8a8a96] shrink-0" strokeWidth={1.5} /> */}
      {icon && (
        <span className="flex items-center shrink-0 text-[#8a8a96] w-4 h-4">
          {icon}
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          " bg-transparent text-[#9a9aa6] placeholder-[#8a8a96] text-base font-light outline-none"
        )}
        {...props}
      />
    </div>
  );
}
