import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-gray-50 hover:bg-gray-900/80",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80",
        destructive: "bg-red-500 text-gray-50 hover:bg-red-500/80",
        outline: "text-gray-50 border border-gray-200",
        success: "bg-emerald-500/20 text-emerald-500",
        warning: "bg-yellow-500/20 text-yellow-500",
        error: "bg-red-500/20 text-red-500",
        info: "bg-blue-500/20 text-blue-500",
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
