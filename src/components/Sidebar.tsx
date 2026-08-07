import { useState } from "react"
import {
  Calendar,
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
  Shield,
  User,
  Users,
} from "lucide-react"

import { BrandMark } from "@/components/BrandMark"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { TABS_BY_ROLE, type UserRole } from "@/types/auth"

// ── Types ─────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string
  icon: React.ReactNode
  badge?: string | number
  value?: string
  children?: Omit<NavItem, "children">[]
}

interface NavGroup {
  label?: string
  items: NavItem[]
}

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_ICON_PROPS = { size: 16, strokeWidth: 1.25 } as const

const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { label: "Dashboard", icon: <LayoutDashboard {...NAV_ICON_PROPS} />, value: "dashboard" },
      {
        label: "Mentorias",
        icon: <GraduationCap {...NAV_ICON_PROPS} />,
        children: [
          { label: "Mentor", icon: <User {...NAV_ICON_PROPS} />, value: "mentor" },
          { label: "Mentorado", icon: <Users {...NAV_ICON_PROPS} />, value: "mentorado" },
          { label: "Reuniões", icon: <Calendar {...NAV_ICON_PROPS} />, value: "reunioes" },
          { label: "Backoffice", icon: <Shield {...NAV_ICON_PROPS} />, value: "backoffice" },
        ],
      },
    ],
  },
]

function getNavGroupsForRole(role: UserRole): NavGroup[] {
  const allowed = TABS_BY_ROLE[role]
  return NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items
      .map((item) => {
        if (item.children) {
          const children = item.children.filter((child) => !child.value || allowed.includes(child.value))
          return children.length > 0 ? { ...item, children } : null
        }
        return !item.value || allowed.includes(item.value) ? item : null
      })
      .filter((item): item is NavItem => item !== null),
  })).filter((group) => group.items.length > 0)
}

// ── Sidebar Nav Item ──────────────────────────────────────────────────────────

function SidebarItem({
  item,
  collapsed,
  depth = 0,
  activeValue,
  onSelect,
}: {
  item: NavItem
  collapsed: boolean
  depth?: number
  activeValue: string
  onSelect: (value: string) => void
}) {
  const isActive = item.value !== undefined && item.value === activeValue
  const hasActiveChild = !!item.children?.some((child) => child.value === activeValue)
  const [open, setOpen] = useState(!!item.children && hasActiveChild)

  const hasTrailing = item.badge !== undefined || !!item.children

  const baseClass = cn(
    "group/item relative grid w-full items-center gap-x-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
    hasTrailing ? "grid-cols-[16px_1fr_auto]" : "grid-cols-[16px_1fr]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    depth > 0 ? "pl-8" : "",
    isActive
      ? "bg-primary/10 text-primary font-medium"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground font-normal",
  )

  const inner = (
    <>
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center",
          isActive ? "text-primary" : "text-muted-foreground group-hover/item:text-accent-foreground",
        )}
      >
        {item.icon}
      </span>
      {!collapsed && (
        <>
          <span className="min-w-0 truncate leading-none">{item.label}</span>
          {item.badge !== undefined && (
            <Badge
              variant={isActive ? "default" : "secondary"}
              className="h-5 min-w-5 justify-center px-1.5 text-[10px] font-semibold tabular-nums"
            >
              {item.badge}
            </Badge>
          )}
          {item.children && (
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 shrink-0 text-muted-foreground/60 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          )}
        </>
      )}
    </>
  )

  if (item.children && !collapsed) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button className={baseClass}>{inner}</button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <div className="mt-0.5 space-y-0.5 border-l border-border ml-5 pl-2 py-0.5">
            {item.children.map((child) => (
              <SidebarItem
                key={child.label}
                item={child}
                collapsed={collapsed}
                depth={depth + 1}
                activeValue={activeValue}
                onSelect={onSelect}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button
            onClick={() => item.value && onSelect(item.value)}
            className={cn(
              "group/item relative mx-auto flex h-9 w-10 items-center justify-center rounded-lg text-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <span className="flex size-4 shrink-0 items-center justify-center">{item.icon}</span>
            {item.badge !== undefined && (
              <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-primary" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2">
          {item.label}
          {item.badge !== undefined && (
            <Badge variant="secondary" className="h-5 min-w-5 justify-center px-1.5 text-[10px] tabular-nums">
              {item.badge}
            </Badge>
          )}
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <button className={baseClass} onClick={() => item.value && onSelect(item.value)}>
      {inner}
    </button>
  )
}

// ── Sidebar Nav Group ─────────────────────────────────────────────────────────

function SidebarGroup({
  group,
  collapsed,
  activeValue,
  onSelect,
}: {
  group: NavGroup
  collapsed: boolean
  activeValue: string
  onSelect: (value: string) => void
}) {
  return (
    <div className="space-y-0.5">
      {group.label && !collapsed && (
        <p className="mb-1 px-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 select-none">
          {group.label}
        </p>
      )}
      {collapsed && group.label && (
        <div className="my-2 flex justify-center">
          <div className="h-px w-4 bg-border" />
        </div>
      )}
      {group.items.map((item) => (
        <SidebarItem
          key={item.label}
          item={item}
          collapsed={collapsed}
          activeValue={activeValue}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

// ── Sidebar content (shared between desktop rail and mobile drawer) ─────────

export function SidebarNavContent({
  activeValue,
  onSelect,
  role,
}: {
  activeValue: string
  onSelect: (value: string) => void
  role: UserRole
}) {
  const navGroups = getNavGroupsForRole(role)
  const homeValue = TABS_BY_ROLE[role][0]

  return (
    <>
      {/* ── Workspace Header ── */}
      <div className="flex h-14 items-center border-b px-3">
        <button
          onClick={() => onSelect(homeValue)}
          className="group flex w-full items-center rounded-lg px-1.5 py-1.5 transition-colors hover:bg-accent"
        >
          <BrandMark size="sm" />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-4 px-2">
        {navGroups.map((group, i) => (
          <SidebarGroup key={i} group={group} collapsed={false} activeValue={activeValue} onSelect={onSelect} />
        ))}
      </nav>
    </>
  )
}

// ── Sidebar (desktop rail — hidden below md, shown by parent as a drawer) ───

export function Sidebar({
  activeValue = "mentor",
  onSelect = () => undefined,
  role = "admin",
}: {
  activeValue?: string
  onSelect?: (value: string) => void
  role?: UserRole
}) {
  return (
    <aside className="relative flex h-screen w-[220px] flex-col border-r bg-card text-card-foreground shrink-0">
      <SidebarNavContent activeValue={activeValue} onSelect={onSelect} role={role} />
    </aside>
  )
}
