import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

// shadcn/ui Badge component: defines variant-based styling using class-variance-authority (cva),
// letting callers pick a `variant` prop instead of hardcoding Tailwind classes each time
const badgeVariants = cva(
  // Base classes applied to every badge regardless of variant
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Solid primary-colored badge (default appearance)
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        // Muted/secondary-colored badge
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Red/destructive-colored badge, typically for errors or warnings
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        // Transparent background, just a bordered outline
        outline: "text-foreground",
      },
    },
    // Falls back to "default" variant styling if none is specified
    defaultVariants: {
      variant: "default",
    },
  }
)

// Renders a styled <div> as the badge, merging variant classes with any custom className passed in
function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }
}

export { Badge, badgeVariants }
