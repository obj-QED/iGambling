# Sidebar type packs (`ui/type`)

```txt
config.type → resolveSidebarTypePack → Root Provider (SidebarTypePackContext)
  Strategy     — per-type chrome tree (`default/Strategy`, `compact/Strategy`, …)
  styles.root  — CSS module on <aside>
  Item         — row presentation (button vs actionIcon)
  HeaderLink / FooterLink — chrome rows
  blocks       — sync overlay on BLOCK_REGISTRY (compact only)
```

Each type owns its own `Strategy.tsx` — full render tree for that skin (regions, scroll, shell, extra chrome). Do **not** share one ChromeStrategy across types; duplicate and reshape freely.

Consumers: `useSidebarTypePack()` (from `context/typePack`, re-exported here).

`ui/Block` reads `typePack.blocks` and passes it to `resolveBlockComponent(item, overlay)`.

## Partial re-render (nav active)

On route change, only the control whose `isActive` flips should update — not the whole chrome / icon tree.

- `useNavActive` lives in `AppButton` / `AppActionIcon` / `AppLink` (selective pathname subscribe)
- Build `leftSection` / media in the parent so icon identity stays stable while the control re-renders
- Keep routes that share `AppLayout` **inside** the layout (no catch-all that unmounts header/sidebar)
- Prefer stable menu references (mock cache by auth) so layout does not rebuild trees on every resolve
