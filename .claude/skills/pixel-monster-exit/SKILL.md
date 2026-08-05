---
name: pixel-monster-exit
description: Desativa o cerebro dual (Opus 5 + Sonnet 5) do /pixel-monster e volta ao motor pixel-core rodando no modelo normal (/pixel) — mesmas 3 lentes, sem persona Pixel-rian nem reconciliacao de veredito. Par do /pixel-monster.
trigger: /pixel-monster-exit
trigger_keywords: ["pixel-monster-exit", "sai do modo pixel monster", "desativa pixel-rian", "desativa auditoria ux dupla"]
---

# Skill: /pixel-monster-exit — Desativa o cerebro dual do Pixel-Monster

Encerra o escopo de sessao aberto por `/pixel-monster`. A partir daqui:

- Auditoria/direcao UX volta ao motor `.claude/skills/pixel-core/SKILL.md` rodando via `/pixel`
  (1 modelo — Pixel planeja, assistente ativo observa, Pixel julga/dirige nas 3 lentes) — sem a
  persona Pixel-rian aplicada em dupla e sem dupla-auditoria Opus 5/Sonnet 5. As 3 lentes e o
  sempre-tentar-ver continuam identicos — so o cerebro do Passo 4 muda de dual pra 1 modelo.
- Nenhuma auditoria pendente (de qualquer um dos 2 auditores) fica assumida como feita so porque
  o modo saiu — se havia auditoria em andamento, registrar no relatorio final como pendente,
  incluindo qual dos 2 auditores ja tinha rodado e quais achados ja foram coletados.
- Achados ja coletados nesta rodada que ainda nao foram reportados ao usuario devem ser entregues
  no relatorio de saida (mesmo formato "Output obrigatorio" do `/pixel-monster`) antes de sair do
  modo — nao descartar trabalho ja feito.
- Usuario pode reativar a qualquer momento com `/pixel-monster`.
