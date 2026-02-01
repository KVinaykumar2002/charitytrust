import { Loader2Icon, Droplet } from "lucide-react"

import { cn } from "@/lib/utils"

interface SpinnerProps extends React.ComponentProps<"svg"> {
  variant?: "default" | "blood"
}

function Spinner({ className, variant = "default", ...props }: SpinnerProps) {
  if (variant === "blood") {
    return (
      <Droplet
        role="status"
        aria-label="Loading"
        className={cn("size-4 text-[#c41e3a] animate-pulse", className)}
        strokeWidth={1.5}
        {...props}
      />
    )
  }
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
