// import * as React from "react";

// import { cn } from "@/lib/utils";
// import { LiquidGlass } from "../glassEffect/liquid-glass";

// function Input({
//   className,
//   borderRadius = "14px",
//   icon,
//   type,
//   ...props
// }: React.ComponentProps<"input"> & {
//   borderRadius?: string;
//   icon?: React.ReactNode;
// }) {
//   return (
//     <LiquidGlass
//       borderRadius={borderRadius}
//       className="shadow-none bg-transparent"
//     >
//       {icon && (
//           <span className="flex items-center shrink-0 text-[#8a8a96] w-5 h-5">
//             {icon}
//           </span>
//         )}
//       <input
//         type={type}
//         data-slot="input"
//         className={cn(
//           "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-[14px] border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//           "",
//           "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//           className
//         )}
//         {...props}
//       />
//     </LiquidGlass>
//   );
// }

// export { Input };

"use client";

import { cn } from "@/lib/utils";
import { LiquidGlass } from "../glassEffect/liquid-glass";

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
      <LiquidGlass
        borderRadius={borderRadius}
        className={cn(
          "relative flex items-center gap-2.5 w-full border backdrop-blur-xl file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 min-w-0 rounded-[14px] bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
      >
        <div className="flex items-center gap-2.5 w-full">
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
              "flex-1 bg-transparent text-[#9a9aa6] placeholder-[#8a8a96] text-base font-light outline-none z-50"
            )}
            {...props}
          />
        </div>
      </LiquidGlass>
    </div>
  );
}
