# Design System

Camada única de origem para tokens e estilos globais. Este projeto usa
Tailwind CSS v4 (`@tailwindcss/vite`, sem `tailwind.config.*`), então toda a
configuração do Design System é feita em CSS (`@theme`), não em JavaScript.

## Estrutura

```
design-system/
├── tokens/     valores puros (cores, tipografia, espaçamento, gráficos)
└── styles/     CSS global/estrutural (base, reset, scrollbar)
```

## Convenções

### `tokens/`

- Contém **apenas valores** (`:root`, `.dark`, `@theme inline`).
- Nunca deve conter um seletor de componente (`.button`, `[data-slot=...]` etc.).
- Um novo token entra aqui quando o mesmo valor de cor/raio/fonte se repete
  em 2+ componentes, ou quando representa um conceito semântico do produto
  (ex.: `--warning`, `--destructive`).
- Arquivos:
  - `colors.css` — paleta semântica (light/dark).
  - `typography.css` — família de fonte e seu mapeamento Tailwind.
  - `spacing.css` — escala de raio de borda (`--radius-*`).
  - `charts.css` — paleta dedicada a gráficos (Recharts), convenção
    `--chart-1`, `--chart-2`, `--chart-3` (shadcn/ui). Cores de gráfico que já
    têm um token semântico (ex.: `--destructive`) reutilizam o token
    existente em vez de duplicá-lo aqui.

### `styles/`

- CSS global que não é token nem componente: reset leve, amarração de
  tokens ao elemento raiz (`body`), scrollbar, etc.
- Não deve conter valores literais de cor/tamanho — sempre referenciar um
  token de `tokens/`.

### `components/ui/` (primitives)

- Elementos atômicos (Button, Input, Dialog, Badge...), no padrão Radix UI
  + `class-variance-authority` (CVA) + `cn()` (`src/lib/utils.ts`).
- Sem lógica de negócio, sem conhecimento de domínio (mentorias, backoffice
  etc.).

### `components/composites/`

- Combinação de 2+ primitives com uma regra de apresentação reutilizável
  entre domínios (ex.: um `StatusBadge` único, `FilterPills`).
- Ainda sem lógica de negócio — só composição visual.
- Continua sem componentes de domínio (mentorias, backoffice) misturados
  aqui.

### `components/<domínio>/` (ex.: `mentorias/`)

- Específico de um contexto de negócio. Pode consumir primitives e
  composites, mas não o contrário.

## Quando criar o quê

| Se você precisa de... | Crie em... |
|---|---|
| Um valor de cor/raio/fonte usado por 2+ componentes | `tokens/` |
| Uma regra CSS global que não é specific de um componente | `styles/` |
| Um elemento de UI atômico e reutilizável, sem contexto de negócio | `components/ui/` |
| Uma combinação de primitives reutilizável entre domínios | `components/composites/` |
| Algo específico de um fluxo de negócio (mentorias, backoffice...) | `components/<domínio>/` |
