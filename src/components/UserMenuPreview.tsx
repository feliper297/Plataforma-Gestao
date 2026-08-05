import { LogOut, User } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface UserMenuPreviewProps {
  open?: boolean
}

export function UserMenuPreview({ open = false }: UserMenuPreviewProps) {
  return (
    <div className="relative">
      <Avatar className="size-8">
        <AvatarFallback className="bg-warning text-xs font-bold text-warning-foreground">A</AvatarFallback>
      </Avatar>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          <div className="px-2 py-1.5">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold leading-none text-foreground">Admin</p>
              <p className="text-xs font-normal text-muted-foreground">admin@convem.me</p>
              <Badge
                variant="secondary"
                className="mt-1 w-fit border-transparent bg-primary/10 px-2 py-0 text-[10px] font-semibold tracking-wide text-primary"
              >
                ADMIN
              </Badge>
            </div>
          </div>

          <div className="-mx-1 my-1 h-px bg-border" />

          <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm">
            <User className="size-4" />
            Perfil
          </div>

          <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive">
            <LogOut className="size-4" />
            Sair
          </div>
        </div>
      )}
    </div>
  )
}
