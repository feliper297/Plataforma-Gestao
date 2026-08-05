# Pixel Brain (local)

Pasta de conhecimento do Pixel, 100% local a este projeto — sem servidor, sem RAG externo. Pixel
busca aqui com `Grep`/`Read` conforme a lente da rodada (ver `.claude/skills/pixel-core/SKILL.md`).

- `experience/` — taste profile, rubricas visuais/comportamentais, persona Pixel-rian, templates.
- `methodology/` — fontes de metodologia (Nielsen, WCAG, Atomic Design, vieses cognitivos, etc.).

Um achado do Pixel so e `[CONFIRMED]` quando cita um arquivo real desta pasta. Sem citacao =
`[HYPOTHESIS]`, sempre.

**Nunca** salve tokens, chaves ou credenciais reais nesta pasta (reforcado pelo hook
`.claude/hooks/secret-scan-gate.sh`).

## Adicionar conhecimento novo

Basta soltar um `.md` novo em `experience/` ou `methodology/` — nao precisa editar as skills. A
proxima rodada do Pixel que tocar essa lente ja pode encontrar e citar o arquivo.
