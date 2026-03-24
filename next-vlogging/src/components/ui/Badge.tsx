import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  
  const variants = {
    default: "border-transparent bg-indigo-600 text-white hover:bg-indigo-600/80 shadow-sm",
    secondary: "border-transparent bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100/80 dark:hover:bg-gray-800/80",
    destructive: "border-transparent bg-red-500 text-white hover:bg-red-500/80 shadow-sm",
    outline: "text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-800",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
