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
    <div className="relative w-full">
      {/* Glass background with custom fading borders */}
      <div
        className={cn(
          "relative flex items-center gap-2.5 w-full px-5 py-2.5  backdrop-blur-xl",
          className
        )}
      >
        {/* Border that fades at top-right and bottom-left */}
        <div
          className={`absolute inset-0 rounded-[${borderRadius}] pointer-events-none bg-none`}
          style={{
            background: `
              linear-gradient(to left, transparent 3%, #9d9da8 10%, #9d9da8 90%, transparent 95%) top / 100% 1px no-repeat,
              linear-gradient(to right, transparent 3%, #9d9da8 10%, #9d9da8 90%, transparent 95%) bottom / 100% 1px no-repeat,
              linear-gradient(to bottom, transparent 30%, #9d9da8 50%, transparent 90%) left / 1px 100% no-repeat,
              linear-gradient(to top, transparent 50%, #9d9da8 70%, transparent 80%) right / 1px 100% no-repeat
            `,
          }}
        />

        {/* Top-left corner piece */}
        <div
          className="absolute top-0 left-0 w-6 h-[50%] pointer-events-none"
          style={{
            borderTop: "1px solid #9d9da8",
            borderLeft: "1px solid #9d9da8",
            borderTopLeftRadius: "1rem",
          }}
        />
        {/* Bottom-right corner piece */}
        <div
          className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none"
          style={{
            borderBottom: "1px solid #9d9da8",
            borderRight: "1px solid #9d9da8",
            borderBottomRightRadius: "1rem",
          }}
        />

        {/* <Search className="w-6 h-6 text-[#8a8a96] shrink-0" strokeWidth={1.5} /> */}
        {icon && (
          <span className="flex items-center shrink-0 text-[#8a8a96] w-5 h-5">
            {icon}
          </span>
        )}
        <input
          type={type}
          data-slot="input"
          className={cn(
            "flex-1 bg-transparent text-[#9a9aa6] placeholder-[#8a8a96] text-base font-light outline-none"
          )}
          {...props}
        />
      </div>
    </div>
  );
}
