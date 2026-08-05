import logo from "@/assets/logo.svg"
import { cn } from "@/lib/utils"

interface BrandMarkProps {
  size?: "sm" | "md"
  showName?: boolean
  className?: string
}

export function BrandMark({ size = "md", showName = true, className }: BrandMarkProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <img
        src={logo}
        alt="PeopleHub"
        className={cn("w-auto object-contain", size === "sm" ? "h-9" : "h-12", !showName && "hidden")}
      />
      {!showName && (
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground",
            size === "sm" ? "size-7 text-xs" : "size-9 text-sm",
          )}
        >
          P
        </div>
      )}
    </div>
  )
}
