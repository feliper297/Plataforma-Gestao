import { cn } from "@/lib/utils"
import { LogoPeopleHub } from "@/components/LogoPeopleHub"

interface BrandMarkProps {
  size?: "sm" | "md"
  showName?: boolean
  className?: string
}

export function BrandMark({ size = "md", showName = true, className }: BrandMarkProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {showName && (
        <LogoPeopleHub height={size === "sm" ? 28 : 36} />
      )}
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
