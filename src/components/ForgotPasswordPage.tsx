import { useState } from "react"
import { ArrowLeft, MailCheck } from "lucide-react"

import { BrandMark } from "@/components/BrandMark"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ForgotPasswordPageProps {
  onGoToLogin: () => void
}

export default function ForgotPasswordPage({ onGoToLogin }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-shell p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <BrandMark className="justify-center" />

        <Card>
          {sent ? (
            <>
              <CardHeader className="text-center">
                <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MailCheck className="size-5" />
                </div>
                <CardTitle className="text-xl">Verifique seu e-mail</CardTitle>
                <CardDescription>
                  Se houver uma conta associada a <span className="font-medium text-foreground">{email}</span>,
                  enviamos um link para redefinir sua senha.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-4">
                <Button type="button" variant="outline" className="w-full" onClick={() => setSent(false)}>
                  Reenviar e-mail
                </Button>

                <Button
                  type="button"
                  variant="link"
                  className="h-auto gap-1.5 p-0 font-normal"
                  onClick={onGoToLogin}
                >
                  <ArrowLeft className="size-3.5" />
                  Voltar para o login
                </Button>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Esqueci minha senha</CardTitle>
                <CardDescription>Informe seu e-mail e enviaremos um link para redefinir sua senha.</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="forgot-email">E-mail</Label>
                    <Input
                      id="forgot-email"
                      type="email"
                      autoComplete="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Enviar link de redefinição
                  </Button>
                </form>

                <p className="mt-4 text-center text-sm text-muted-foreground">
                  <Button
                    variant="link"
                    type="button"
                    className="h-auto gap-1.5 p-0 font-normal"
                    onClick={onGoToLogin}
                  >
                    <ArrowLeft className="size-3.5" />
                    Voltar para o login
                  </Button>
                </p>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
