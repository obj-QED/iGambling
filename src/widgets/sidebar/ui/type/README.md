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
