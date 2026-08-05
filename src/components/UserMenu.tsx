import { LogOut, User } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserMenuProps {
  onLogout: () => void
  onProfile: () => void
}

export function UserMenu({ onLogout, onProfile }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Menu do usuário"
        >
          <Avatar className="size-8">
            <AvatarFallback className="bg-warning text-xs font-bold text-warning-foreground">
              A
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold leading-none text-foreground">Admin</p>
            <p className="text-xs font-normal text-muted-foreground">admin@convem.me</p>
            <Badge
              variant="secondary"
              className="mt-1 w-fit border-transparent bg-primary/10 px-2 py-0 text-[10px] font-semibold tracking-wide text-primary hover:bg-primary/10"
            >
              ADMIN
            </Badge>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={onProfile}>
          <User />
          Perfil
        </DropdownMenuItem>

        <DropdownMenuItem variant="destructive" onSelect={onLogout}>
          <LogOut />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
