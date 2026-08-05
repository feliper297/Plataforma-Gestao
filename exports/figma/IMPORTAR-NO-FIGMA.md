# Importar telas no Figma

As telas do PeopleHub podem ser capturadas em **1440×900** via URLs de exportação.

## Pré-requisito

Com o servidor rodando (`npm run dev`), acesse cada URL abaixo.

## Telas disponíveis

| Tela | URL |
|------|-----|
| Login | http://localhost:3000/?screen=login |
| Dashboard Mentor | http://localhost:3000/?screen=dashboard |
| Menu do usuário (aberto) | http://localhost:3000/?screen=user-menu |

> Se a porta for outra (ex.: 8443), substitua `3000` pela porta correta.

## Opção 1 — Plugin **html.to.design** (recomendado agora)

1. Abra seu arquivo no **Figma Desktop**
2. Instale o plugin [html.to.design](https://www.figma.com/community/plugin/1159123463400988435)
3. Execute o plugin → **Import from URL**
4. Cole cada URL da tabela acima (uma tela por importação)
5. Organize os frames em páginas: `Login`, `Dashboard`, `Componentes`

## Opção 2 — Captura automática via Figma MCP (requer configuração)

Para envio direto pelo Cursor, é necessário:

1. **Figma Desktop** aberto com o arquivo de destino
2. Plano com **Dev Mode**
3. MCP **Figma** completo habilitado (ferramentas `use_figma` / `generate_figma_design`)
4. Enviar a **URL do arquivo Figma** (ex.: `https://www.figma.com/design/XXXXX/PeopleHub`)

Com isso configurado, peça novamente: *"envie as telas para o Figma"* informando a URL do arquivo.

## Design tokens usados

- Primary: `#7F358A`
- Fonte: Inter
- Componentes: shadcn/ui (Button, Card, Input, Label, DropdownMenu, Badge)
