---
name: pixel-audit
description: Atalho pro /pixel com a lente Comportamental pre-selecionada (Nielsen 10, WCAG 2.1 AA, psicologia comportamental). Alias de compatibilidade — prefira /pixel (ou /pixel-monster) direto.
trigger: /pixel-audit
trigger_keywords: ["pixel-audit", "auditoria ux", "auditoria ui", "pixel audita", "analise ux", "auditoria completa", "heuristicas", "wcag", "acessibilidade"]
---

# Skill: /pixel-audit — Alias para /pixel (lente Comportamental)

**Absorvido pelo motor unico.** O checklist que esta skill definia (Nielsen 10, WCAG 2.1 AA,
psicologia comportamental, hierarquia visual, copy, jornada, mobile) vive dentro da **lente
Comportamental** do `.claude/skills/pixel-core/SKILL.md`, usada tanto por `/pixel` quanto por
`/pixel-monster`.

**O que fazer quando `/pixel-audit` for chamado:** tratar como `/pixel` com a lente
**Comportamental** ja selecionada (nao perguntar a lente — so o modo visual/background, que
continua obrigatorio). Seguir o motor completo de `pixel-core` (Passo 0-5).

---

## Hard rules (herdadas de pixel-core)

- Evidencia obrigatoria (descricao/screenshot + leitura de codigo) para cada achado.
- Formato de achado = template por dimensao/vies de `pixel-core`, com fonte do Brain citada.
