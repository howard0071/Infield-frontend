import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--orch-acc-hi)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[var(--orch-bg-3)] text-[var(--orch-fg-1)]",
        secondary: "bg-[var(--orch-bg-4)] text-[var(--orch-fg-3)]",
        outline: "border border-[var(--orch-line-1)] text-[var(--orch-fg-2)]",
        destructive: "bg-[var(--orch-err)] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
