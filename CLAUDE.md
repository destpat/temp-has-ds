# DSHAS Design System

Monorepo for the `@dshas/ui` component library following DSFR guidelines.

## Commands

```bash
pnpm install              # Install all dependencies
pnpm build                # Build all packages
pnpm dev                  # Start dev (Storybook on :6006)
pnpm test                 # Run all tests
pnpm lint                 # Run Biome linter
pnpm lint:fix             # Auto-fix lint issues
pnpm format               # Format all files

# Package-specific
pnpm --filter @dshas/ui build      # Build UI package
pnpm --filter @dshas/ui test       # Run UI tests
pnpm --filter @dshas/ui test:watch # Watch mode
pnpm --filter docs dev             # Storybook dev server
```

## Structure

- `packages/ui/` — `@dshas/ui` npm package (React components)
- `apps/docs/` — Storybook 10 documentation site

## Conventions

- **Component files in PascalCase**: `Accordion.tsx`, `Accordion.stories.tsx`, `Accordion.test.tsx`
- Component directories stay in kebab-case: `components/accordion/`
- `index.ts` (barrel export) stays lowercase
- **Icons**: use [@remixicon/react](https://remixicon.com/)
- **`type` over `interface`**: always use `type` for props and type definitions. Interfaces are avoided because they can be extended/overwritten anywhere via declaration merging, making them unreliable.

## Styling

- **`cn()`** (`lib/cn.ts`): merges classes with `clsx` + `tailwind-merge`. Use it to combine base classes with a user-provided `className`.
- **`cva`** (class-variance-authority): use whenever a component has **variants or sizes**. Makes the API type-safe (passing an invalid variant = TS error). If the component has no variants, `cn()` alone is enough.

## Component Pattern

Components use **Base UI** headless primitives + **Tailwind CSS v4** styling.

Every component must:
1. **No `forwardRef`**: the package targets React >= 19 where `ref` is a regular prop. Accept `ref` directly via destructuring, no `forwardRef` wrapper needed.
2. **`...rest` props**: accept and spread all native HTML props via `ComponentPropsWithRef<"div">` (or the corresponding HTML element) + `...rest` on the root element.
3. **Export only the public API**: the component + its types. All `cva` definitions stay internal to the component — consumers should use the component directly.

```
packages/ui/src/components/<name>/
├── <Name>.tsx              # Component implementation (PascalCase)
├── <Name>.stories.tsx      # Storybook stories (co-located)
├── <Name>.test.tsx         # Vitest + Testing Library tests
└── index.ts                # Barrel export
```

Each component must be exported from `packages/ui/src/index.ts`.

## Local Installation (without npm/Nexus)

```bash
# Build + generate tarball
pnpm --filter @dshas/ui build
cd packages/ui && pnpm pack
```

This produces a `dshas-ui-0.1.0.tgz` file in `packages/ui/`.

To install in a consuming project:

```bash
pnpm add /path/to/dshas-ui-0.1.0.tgz
```

Then in code:

```tsx
import "@dshas/ui/styles.css";
import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from "@dshas/ui";
```

## Design Tokens

DSFR tokens are defined in `packages/ui/src/styles/tokens.css` using Tailwind v4 `@theme`.
Key tokens: `blue-france`, `grey-title`, `grey-contrast`, `font-raleway`.

## Typography

The DS uses **Raleway** (weights 400, 500, 700). The font is not bundled in the package — each consuming project must load Raleway itself (Google Fonts, @fontsource, self-hosted, etc.).
The DS sets `--font-sans: "Raleway", sans-serif` in the tokens, making it the default font via Tailwind.

## Figma

Source: `https://www.figma.com/design/FnyYDn4Jb09qWi891lyrCX/DSHAS-Composants`
