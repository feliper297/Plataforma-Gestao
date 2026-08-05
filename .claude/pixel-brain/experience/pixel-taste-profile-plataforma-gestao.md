# Pixel Taste Profile — Plataforma-Gestao (figma-make-app)

> Taste profile proprio deste projeto. Substitui, para este repositorio, o baseline generico de
> `pixel-taste-profile.md` (que descreve outro produto — "Pixel Runtime Panel"). Gerado por leitura
> direta de `src/index.css` em 2026-08-05 — nao inventado.

---

## Identidade Visual (confirmada em `src/index.css`)

- Fonte: **Inter** (`--font-inter`, sans-serif) — nao serifado, nao monoespaco por padrao.
- Cor primaria: roxo `#7F358A` (light) / `#9B52A8` (dark) — usada em `--primary` e `--ring`.
- Paleta neutra em OKLCH (`--background`, `--foreground`, `--muted`, `--secondary`, `--accent`) —
  grayscale puro (chroma 0), exceto `--shell` que tem leve matiz (`0.004`/`0.008` chroma, hue 286 —
  quase neutro, leve tom frio).
- Cantos: `--radius: 0.5rem` como base, com variantes `sm`/`md`/`lg`/`xl` derivadas (`calc`).
- Cor de aviso dedicada: `--warning` (laranja, `oklch(0.72 0.17 55)`) com par `muted` proprio — token
  que nao existe no shadcn/ui padrao, foi adicionado deliberadamente para estados de alerta.
- Suporte a dark mode completo via classe `.dark` — todos os tokens tem par light/dark.
- Scrollbar customizada (`width: 0`, oculta) — decisao deliberada de esconder scrollbar nativa.

**O que isso significa na pratica:**
- Roxo (`--primary`) e a cor de acao/foco (`--ring` usa a mesma cor) — nao introduzir azul ou verde
  como cor de acao primaria sem justificativa.
- `--warning` existe para estados intermediarios (nem erro/`--destructive`, nem neutro) — usar
  quando fizer sentido semantico, nao substituir por `--destructive` por preguica.
- Todo componente novo precisa funcionar em light E dark (os tokens ja resolvem isso via CSS
  custom properties — nao hardcodar cor hex fora dos tokens).
- `--shell` (tom levemente diferente de `--background`) sugere uma camada de "moldura"/sidebar
  separada do conteudo — usar para diferenciar chrome de conteudo, nao para telas inteiras.

---

## O que nunca pode acontecer (deste projeto)

| Problema | Por que e bloqueante |
|---|---|
| Cor de acao primaria fora de `--primary`/roxo sem justificativa | Quebra a identidade visual unica do produto |
| Componente sem variante dark funcional | O projeto declara suporte dark completo — regressao visivel |
| Hex/rgb hardcoded em vez de var(--token) ou classe Tailwind mapeada | Quebra o theming, nao reage a dark mode |
| `--destructive` usado para aviso nao-critico | Usuario le como erro grave quando e so alerta — ha `--warning` para isso |
| Scrollbar nativa visivel num componente novo | Inconsistente com a decisao global de escondê-la |

---

## O que deve existir em todo componente

1. Uso de tokens (`bg-primary`, `text-foreground`, etc.) em vez de cor hardcoded.
2. Contraste AA minimo entre texto e fundo, testado nos dois temas (light/dark).
3. `--radius` respeitado via classes `rounded-md`/`rounded-lg` (nao valores arbitrarios).
4. Fonte `Inter` herdada do `body` — nao importar outra fonte sem decisao deliberada.

---

## Lacuna conhecida

Este taste profile cobre so a camada de tokens/tema (`src/index.css`). Ainda nao ha rubrica de
copy (PT-BR vs EN), nem inventario de padroes de layout especificos do dominio "mentorias". Registrar
como `[HYPOTHESIS]` qualquer achado de copy/layout ate esse material ser adicionado ao brain.
