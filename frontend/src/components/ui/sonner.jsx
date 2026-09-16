import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

// shadcn/ui-style wrapper around Sonner's toast notification system,
// hooking it up to the app's current theme (light/dark/system) and applying
// default Tailwind styling to match the rest of the shadcn/ui components.
// This is the component that renders the toast.success(...)/toast.error(...) calls
// seen throughout the app (Login, Signup, PostJob, ApplicantsTable, Navbar, etc.)
const Toaster = ({
  ...props
}) => {
  // Reads the current theme from next-themes, defaulting to "system" if unset
  const { theme = "system" } = useTheme()

  return (
    (<Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          // Base toast container styling, themed via CSS variables (background/text/border)
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props} />)
  );
}

export { Toaster }
