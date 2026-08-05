---
name: pixel-test
description: Teste real de fluxo como usuario real — Pixel planeja, o assistente ativo observa a tela (browser/dev server), Pixel audita. Pergunta visual/background antes de comecar, sem excecao. Reusada como Passo 1 (planejar) + Passo 2 (ver) do motor .claude/skills/pixel-core/SKILL.md (/pixel, /pixel-monster).
trigger: /pixel-test
trigger_keywords: ["pixel-test", "testar browser", "teste real", "testar como usuario", "pixel testa", "teste browser"]
---

# Skill: /pixel-test — Teste Real de Fluxo

**Regra:** Pixel define o plano. O assistente ativo observa a tela (via dev server / navegador).
Pixel audita os resultados. SEMPRE perguntar visual ou background antes de comecar.

**Relacao com `/pixel` e `/pixel-monster`:** os Steps 1/1.5/2 (plano) e 3 (executar) desta skill sao
o Passo 1 (PLANEJAR) e Passo 2 (VER) do motor `.claude/skills/pixel-core/SKILL.md`, reusados sem
modificacao. Quando chamada via `/pixel`/`/pixel-monster`, o Step 4 (auditoria) deste arquivo e
substituido pelo motor completo de 3 lentes — este `/pixel-test` isolado continua valido como teste
rapido com auditoria Nielsen 10 + WCAG 2.1 AA + cognitive load simples.

> **Gap deste ambiente [HYPOTHESIS]:** nao ha ferramenta de automacao de browser (Playwright/
> `browser_*`) confirmada nesta sessao. O comando confirmado para ver a UI e o dev server Vite ja
> rodando (`npm run dev` / preview do Figma Make). Ate confirmar uma ferramenta de screenshot real,
> "modo visual" = abrir o preview e descrever o que se ve, ou pedir print ao usuario; "background" =
> seguir so por leitura de codigo (JSX/CSS/Tailwind). Declarar isso no relatorio.

---

## Step 0 — Perguntar modo (obrigatorio, sem excecao)

```
"Quer ver o teste ao vivo (descricao/screenshots em tempo real no chat)
 ou prefere que eu rode em background e entrego o relatorio no final?"
```

Aguardar resposta antes de qualquer outra acao.

---

## Step 1 — Coletar contexto (se nao fornecido)

Perguntar ao usuario:
- Qual rota/tela testar? (ex: `/`, `LoginPage`, `RelatorioMentorias`)
- Qual fluxo testar? (ex: "login", "ver dashboard de mentorias")
- Ha login necessario? (pedir credenciais de teste se sim)
- O que deve funcionar ao final?

---

## Step 1.5 — Grounding no projeto (antes do plano)

Ler `AGENTS.md`/`CLAUDE.md` do projeto e o componente-alvo (`Read`/`Grep` em `src/`) antes de montar
o plano. Sem PRD formal neste projeto — registrar "sem doc canonical alem de AGENTS.md" e seguir.

---

## Step 2 — Plano de teste (Pixel define)

```markdown
## Plano de Teste Pixel — <feature/pagina>

### Escopo
O que esta sendo testado e por que (como usuario real, nao como dev)

### Persona do usuario
"Sou usuario, acesso pela primeira vez, quero..."

### Fluxo (passos como usuario)
1. Navegar para <rota>
2. Clicar em <elemento>
3. Preencher <campo> com <valor>
4. ...

### Criterios de aceitacao (perspectiva usuario)
- [ ] Consegui completar o objetivo sem confusao
- [ ] Mensagens de erro foram claras
- [ ] Mobile funcionou (375px)

### Fora do escopo
O que nao vamos testar aqui
```

---

## Step 3 — Executar

```
Modo Visual:
  Abrir/observar o preview (dev server), comentar cada passo ao vivo:
  "H1 — visibilidade: OK", "H3 — inconsistencia aqui"

Modo Background:
  Ler o codigo do fluxo e simular mentalmente os estados,
  entregar relatorio ao final.
```

Se precisar de login -> pedir credenciais de teste ao usuario e continuar.

---

## Step 4 — Relatorio Pixel (obrigatorio)

**Vocabulario de status (6 estados)** — distingue "ambiente quebrou o teste" de "feature quebrada",
e "passou limpo" de "passou so na segunda tentativa":

| Status | Quando usar |
|---|---|
| `PASS` | Passou limpo, sem ressalva, sem retry. |
| `PARTIAL_PLUS` | Passou no essencial, achou algo menor (nao bloqueia ship). |
| `PARTIAL` | Funcionou parcialmente — lacuna real, mas nao e blocker total. |
| `FAIL` | Feature quebrada — o fluxo nao funciona como deveria. |
| `BLOCKED` | Ambiente impediu o teste (login indisponivel, dev server fora do ar, dado faltando). |
| `FLAKY` | Falhou na 1a tentativa e passou no retry. |

```markdown
## Relatorio Pixel — <feature> — <data>

### Resumo executivo
Status: PASS / PARTIAL_PLUS / PARTIAL / FAIL / BLOCKED / FLAKY

### Evidencias por passo
| Passo       | Evidencia | Status | Observacao          |
|-------------|-----------|--------|---------------------|
| 1. Acesso   | [descricao/print] | OK     | ...        |
| 2. Formulario | [descricao/print] | FAIL | CTA sem contraste   |

### Bugs encontrados
- [P1] <descricao>

### Recomendacoes UX (Pixel)
- H1: ...
- WCAG: ...

### Proximos passos
1. <acao concreta>
```

---

## Hard rules

- SEMPRE perguntar visual/background primeiro.
- Pixel audita usando Nielsen 10 + WCAG 2.1 AA + cognitive load em cada evidencia.
- Nunca testar em producao real com dados de usuarios reais sem autorizacao explicita.
- Resumo executivo usa sempre os 6 estados — nunca reduzir a um binario aprovado/reprovado.
