# composites

Combinações de 2+ primitives de `components/ui/` com uma regra de
apresentação reutilizável entre domínios (ex.: um `StatusBadge` único,
`FilterPills`). Sem lógica de negócio.

- `StatusBadge.tsx` — badge de status de meta (`GoalStatus`), único em todo o
  projeto. Substitui as duas versões antes duplicadas (`src/App.tsx` e
  `src/components/mentorias/ui/`).

Ver `src/design-system/README.md` para as convenções completas.
