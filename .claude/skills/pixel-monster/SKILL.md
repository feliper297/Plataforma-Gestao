---
name: pixel-monster
description: Motor Pixel com cerebro superior — mesmas 3 lentes do pixel-core, julgado por Opus 5 + Sonnet 5 em dupla (substitui Opus+GPT-5.6 do pacote original, pois este ambiente nao tem acesso a GPT-5.6/OpenAI), com reconciliacao. Persona Pixel-rian na lente comportamental. Auditores nunca operam browser nem escrevem codigo em volume.
trigger: /pixel-monster
trigger_keywords: ["pixel-monster", "pixel monster", "auditoria ux dupla", "pixel-rian", "dois auditores ux", "pixel dupla auditoria"]
---

# Skill: /pixel-monster — Motor Pixel com cerebro dual

**Le `.claude/skills/pixel-core/SKILL.md` primeiro.** Este arquivo so define o **cerebro** do
Passo 4 (JULGAR/DIRIGIR) do motor — as 3 lentes, o Passo 0, o Passo 1, o Passo 2 e o Passo 3 sao
**identicos** ao `/pixel` normal e vivem so em `pixel-core`. Nao duplicar aqui.

**Diferenca unica vs `/pixel`:** o cerebro que julga/dirige na lente escolhida e **dois auditores em
dupla**, com reconciliacao de veredito.

> **Substituicao explicita e confirmada pelo usuario (nao inventada):** o pacote original pedia
> Opus + GPT-5.6. Este ambiente (Claude Code) nao tem nenhum acesso a modelo GPT/OpenAI. Confirmado
> com o usuario: o segundo auditor aqui e **Claude Sonnet 5**, nao GPT-5.6. Se no futuro este
> ambiente ganhar acesso real a outro provedor, atualizar esta secao — nunca simular a chamada.

---

## Cerebro: Opus 5 + Sonnet 5 — dual quando possivel

| Auditor | Como e chamado neste ambiente | Disponibilidade |
|---|---|---|
| Opus 5 | `Agent` tool, `model: "opus"`, subagent_type read-only (sem Edit/Write) | Confirmar no momento da chamada — se a chamada falhar/for negada, declarar indisponivel, nao insistir escondido |
| Sonnet 5 (2o auditor) | `Agent` tool, `model: "sonnet"` (ou o modelo desta propria sessao, se ja for Sonnet 5) | Sempre disponivel neste ambiente |

Nao ha arquivo de "gate" (`.builder/opus-gate.json` etc.) neste ambiente — nao inventar um. A
"disponibilidade" e verificada tentando a chamada real via `Agent` tool nesta rodada.

### Modo dual (default — os 2 cerebros julgam a mesma rodada)

Ambos recebem exatamente as mesmas evidencias do Passo 2 do `pixel-core` (mesma descricao/
screenshot, mesma leitura de codigo, mesma citacao do brain) — nunca rodadas de teste separadas.
Cada um aplica a lente escolhida independentemente, depois reconcilia (secao abaixo).

Prompt para cada `Agent` call deve incluir: a lente ativa, as evidencias do Passo 2, os trechos do
brain citados no Passo 3, e pedir formato de achado igual ao de `pixel-core` §Passo 4, com status
`[CONFIRMED]`/`[HYPOTHESIS]` por achado.

### Modo single (so quando o usuario pedir explicitamente, ou um auditor falhar)

Usuario diz "so opus", "so sonnet", "usa so um auditor nesta rodada" -> roda so o cerebro pedido,
sem reconciliacao (1 veredito). Declarar no output que foi single por pedido explicito.

Se Opus 5 nao responder (erro real da chamada, nao suposicao) -> cair para single com Sonnet 5 e
declarar isso honestamente como degradacao, nunca como o modo dual default.

---

## Reconciliacao dos 2 vereditos (so no modo dual)

- **Ambos concordam** (mesmo veredito no mesmo achado/severidade) -> veredito final = o veredito.
- **Divergem -> consenso, nunca escolha unilateral.** Nao escolher um lado, nao adjudicar por conta
  propria. Levar o argumento completo (com evidencia) de um auditor pro outro reconsiderar, ida e
  volta, ate os dois convergirem no MESMO veredito. Cada um reavalia a evidencia antes de manter/
  mudar. Escalar pro usuario SO se seguirem irredutiveis apos rodadas reais de troca de argumento —
  reportando os 2 lados + o historico da troca.
- **Um caiu no meio** (erro real na chamada depois de comecar) -> declarar que so o outro completou
  nesta rodada.

---

## Ponte de insights

Sem Langfuse neste ambiente. Achados aceitos pelo usuario viram item de trabalho (TodoWrite ou
anotacao explicita no relatorio) para implementacao separada — nunca fix aplicado pela propria skill.

---

## Output obrigatorio (a cada rodada de auditoria)

**Bloco "dual"** (os 2 cerebros julgaram — caso comum/default):

```
**Pixel-Monster (dual) — [lente] — [tela/feature]**

**Lente:** Comportamental | Visual | Criacao/Direcao
**Plano de teste:** [resumo do Passo 1]
**Evidencias:** [screenshot/descricao + leitura de codigo + medicao, modo visual|background]

**Auditores:** Opus 5 [OK|indisponivel] · Sonnet 5 [OK|indisponivel]

**Veredito Opus 5:**
- [achados no formato da lente — ver pixel-core]

**Veredito Sonnet 5:**
- [achados no formato da lente]

**Reconciliacao:** [concordam -> veredito unico | divergem -> rodadas de consenso ate convergir; escalar pro usuario so em empate irredutivel apos rodadas reais]

**Proximos passos:** [acao concreta ou pergunta pro usuario]
```

**Bloco "single"** (usuario pediu so 1 auditor, ou fallback por indisponibilidade real):

```
**Pixel-Monster (single: Opus 5 | Sonnet 5) — [lente] — [tela/feature]**

_Motivo: pedido explicito do usuario | outro auditor indisponivel nesta rodada (nao e default)._

**Veredito [auditor]:**
- [achados no formato da lente]

**Proximos passos:** [...]
```

---

## Hard rules

- Dual e o DEFAULT quando ambos respondem — single so com pedido explicito do usuario ou fallback
  declarado honestamente.
- Nenhum auditor opera browser/navegacao — quem opera e o assistente ativo (`pixel-core` Passo 2).
- Nenhum auditor escreve codigo em volume — so julga/dirige.
- Passo 0 do `pixel-core` (lente + visual/background) e obrigatorio e repete a cada rodada.
- Achado sem fonte do Brain citavel = `[HYPOTHESIS]`, nunca `[CONFIRMED]`.
- Divergencia entre os 2 vereditos nunca e resolvida pelo agente sozinho — consenso obrigatorio via
  rodadas de troca de argumento ate convergir; escalar pro usuario so em empate irredutivel apos
  rodadas reais.
- Veredito e insumo para decisao, nunca aplica fix sozinho — fixes viram tarefa de implementacao
  separada.
- Nao confundir com `/pixel` (mesmo motor, cerebro = 1 modelo so).
