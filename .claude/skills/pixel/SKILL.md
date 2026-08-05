---
name: pixel
description: Pixel no modelo normal — mesmo motor de 3 lentes do pixel-core (Comportamental / Visual / Criacao-Direcao) usado pelo /pixel-monster, so que julgado por 1 cerebro (o modelo padrao desta sessao). Tenta sempre ver a tela real. Use /pixel-monster quando quiser o cerebro superior (dupla-auditoria).
trigger: /pixel
trigger_keywords: ["pixel", "audita a tela", "revisa o design", "pixel ve isso", "pixel audita"]
---

# Skill: /pixel — Motor Pixel no modelo normal

**Le `.claude/skills/pixel-core/SKILL.md` primeiro.** Este arquivo so define o **cerebro** do
Passo 4 (JULGAR/DIRIGIR) do motor — as 3 lentes, o Passo 0 (lente + visual/background), o Passo 1
(planejar), o Passo 2 (ver) e o Passo 3 (consultar o brain) sao **identicos** ao `/pixel-monster` e
vivem so em `pixel-core`. Nao duplicar aqui.

**Diferenca unica vs `/pixel-monster`:** o cerebro que julga/dirige na lente escolhida e **1 so
modelo** — o modelo que ja esta rodando esta sessao (o "melhor modelo rapido/confiavel disponivel"
configurado para o Pixel normal neste ambiente: **Claude Sonnet 5**). Sem gates de auditor duplo,
sem reconciliacao. E o Pixel do dia a dia — mais rapido e barato que `/pixel-monster`.

**Quando usar `/pixel` vs `/pixel-monster`:** `/pixel` para rodadas normais de auditoria/direcao UX
(a maioria dos casos). `/pixel-monster` quando o usuario quer o cerebro superior — tela critica de
conversao, decisao de design com custo alto de reverter, ou quando pedir dupla-auditoria
explicitamente.

---

## Cerebro: modelo normal (Sonnet 5)

O julgamento/direcao na lente escolhida e feito pelo mesmo modelo desta sessao (Sonnet 5) — sem
troca de modelo, sem Agent tool separado. 1 veredito por rodada.

---

## Output obrigatorio (a cada rodada)

```
**Pixel — [lente] — [tela/feature]**

**Lente:** Comportamental | Visual | Criacao/Direcao
**Plano de teste:** [resumo do Passo 1 de pixel-core]
**Evidencias:** [screenshot/descricao + leitura de codigo + medicao, modo visual|background]

**Achados/Direcao:**
- [no formato da lente — ver pixel-core §Passo 4]

**Proximos passos:** [acao concreta ou pergunta pro usuario]
```

---

## Hard rules

- Herda TODAS as hard rules de `pixel-core` (sempre tentar ver, brain por lente, anti-alucinacao,
  anti-dark-pattern, auditor nunca opera browser nem coda em volume).
- Sem gates de auditor duplo — se o usuario pedir dupla-auditoria no meio da rodada, oferecer trocar
  pra `/pixel-monster` em vez de simular dual aqui.
