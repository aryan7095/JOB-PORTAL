import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

// shadcn/ui-style wrapper around Radix's unstyled Popover primitives,
// applying default Tailwind styling/animations while re-exporting the composable pieces

// Root component managing open/closed state — passed through directly, no styling needed
const Popover = PopoverPrimitive.Root

// Element that toggles the popover open when clicked — passed through directly
// (used throughout this app, e.g. AdminJobsTable/CompaniesTable/ApplicantsTable's
// "MoreHorizontal" action menus, and Navbar's avatar dropdown)
const PopoverTrigger = PopoverPrimitive.Trigger

// The popover's floating content box: positioned relative to its trigger,
// rendered in a Portal (outside normal DOM hierarchy), with directional slide-in
// animations depending on which side of the trigger it appears on
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props} />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
