import { useState } from "react"

import { BrandMark } from "@/components/BrandMark"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginPageProps {
  onLogin: () => void
  onGoToSignUp?: () => void
}

export default function LoginPage({ onLogin, onGoToSignUp }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onLogin()
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-shell p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <BrandMark className="justify-center" />

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Entrar</CardTitle>
            <CardDescription>Acesse sua conta de mentoria</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Entrar
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Não tem conta?{" "}
              <Button variant="link" type="button" className="h-auto p-0 font-normal" onClick={onGoToSignUp}>
                Criar conta
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
