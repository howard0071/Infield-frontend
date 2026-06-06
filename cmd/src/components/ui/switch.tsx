import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-[var(--orch-line-1)] transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orch-acc-hi)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--orch-bg-1)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-[var(--orch-acc-hi)] data-[state=unchecked]:bg-[var(--orch-bg-3)]",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none size-4 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)] ring-0 transition-transform",
        "data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-4"
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
