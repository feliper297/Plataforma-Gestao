import { TriangleAlert } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getMentoresInativos15Dias } from "@/lib/mentorias/mentorias"
import type { Mentor } from "@/types/mentoria"

export default function InactiveMentorsAlert({ mentores }: { mentores: Mentor[] }) {
  const inativos = getMentoresInativos15Dias(mentores)

  if (inativos.length === 0) return null

  return (
    <Card className="shadow-sm border-warning/30 bg-warning-muted/40">
      <CardHeader className="py-4 px-5">
        <div className="flex items-start gap-2.5">
          <TriangleAlert className="h-4 w-4 shrink-0 text-warning-muted-foreground mt-0.5" />
          <div className="space-y-0.5">
            <CardTitle className="text-sm font-semibold text-warning-muted-foreground">
              Mentores sem mentorias nos últimos 15 dias
            </CardTitle>
            <CardDescription className="text-xs">
              Sem sessões registradas nas duas últimas semanas de Julho (S02 e S03)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4 px-5 pt-0">
        <div className="flex flex-wrap gap-1.5 pl-6">
          {inativos.map((mentor) => (
            <Badge key={mentor.id} variant="outline" className="rounded-full border-warning/30 bg-background font-medium">
              {mentor.nome}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
