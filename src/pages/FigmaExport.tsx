import LoginPage from "@/components/LoginPage"
import { UserMenuPreview } from "@/components/UserMenuPreview"
import { Sidebar } from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Bell, Moon, Search } from "lucide-react"

import MentorDashboard from "./MentorDashboardExport"

export type FigmaExportScreen = "login" | "dashboard" | "user-menu"

interface FigmaExportProps {
  screen: FigmaExportScreen
}

function DashboardShell({ userMenuOpen = false }: { userMenuOpen?: boolean }) {
  return (
    <div className="flex h-[900px] w-[1440px] overflow-hidden bg-background text-foreground">
      <Sidebar />

      <Tabs defaultValue="mentor" className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="relative z-40 shrink-0 border-b bg-background/90 backdrop-blur-md">
          <div className="flex h-14 items-center gap-3 px-8">
            <div className="relative max-w-sm flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar mentorado, reunião…"
                className="h-9 border-0 bg-muted/60 pl-8 text-sm"
                readOnly
              />
            </div>

            <div className="flex-1" />

            <div className="relative flex items-center gap-1">
              <Button variant="ghost" size="icon" className="size-8 bg-muted/60 text-muted-foreground">
                <Moon className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="size-8 bg-muted/60 text-muted-foreground">
                <Bell className="size-4" />
              </Button>
              {userMenuOpen ? <UserMenuPreview open /> : <UserMenuPreview />}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="w-full px-8 py-8">
            <TabsContent value="mentor" className="mt-0">
              <MentorDashboard />
            </TabsContent>
          </div>
        </div>

        <footer className="shrink-0 border-t bg-background">
          <div className="flex h-12 items-center justify-center">
            <p className="text-xs text-muted-foreground">
              <span className="font-mono font-medium">PeopleHub</span>
              {" · Mentoria e Feedback Contínuo"}
            </p>
          </div>
        </footer>
      </Tabs>
    </div>
  )
}

export default function FigmaExport({ screen }: FigmaExportProps) {
  if (screen === "login") {
    return (
      <div className="h-[900px] w-[1440px] overflow-hidden">
        <LoginPage onLogin={() => undefined} />
      </div>
    )
  }

  if (screen === "user-menu") {
    return (
      <TooltipProvider>
        <DashboardShell userMenuOpen />
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <DashboardShell />
    </TooltipProvider>
  )
}
