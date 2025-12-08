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

export function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="relative w-full max-w-2xl">
      {/* Glass background with custom fading borders */}
      <div
        className={`relative flex items-center gap-4 w-full px-5 py-2.5 rounded-2xl backdrop-blur-xl ${className}`}
        style={{
          background:
            "linear-gradient(135deg, rgba(58, 54, 65, 0.7) 0%, rgba(45, 42, 52, 0.8) 100%)",
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.05), 0 4px 30px rgba(0,0,0,0.3)",
        }}
      >
        {/* Border that fades at top-right and bottom-left */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `
              linear-gradient(to right, #9d9da8 0%, #9d9da8 95%, transparent 100%) top / 100% 1px no-repeat,
              linear-gradient(to right, transparent 0%, #9d9da8 10%, #9d9da8 100%) bottom / 100% 1px no-repeat,
              linear-gradient(to bottom, #9d9da8 0%, #9d9da8 65%, transparent 100%) left / 1px 100% no-repeat,
              linear-gradient(to bottom, transparent 0%, #9d9da8 65%, #9d9da8 100%) right / 1px 100% no-repeat
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
        <input
          type={type}
      data-slot="input"
          className={cn(
            "flex-1 bg-transparent text-[#9a9aa6] placeholder-[#8a8a96] text-lg font-light outline-none"
          )}
          {...props}
        />
      </div>
    </div>
  );
}
