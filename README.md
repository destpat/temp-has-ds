# DSHAS Design System

Monorepo du design system **DSHAS**, basé sur les lignes directrices du DSFR.

## Packages

| Package | Description |
| --- | --- |
| [`@dshas/ui`](packages/ui) | Bibliothèque de composants React |
| [`docs`](apps/docs) | Site de documentation Storybook |

## Stack technique

- **React 19** + **TypeScript**
- **Tailwind CSS v4** pour le styling
- **Base UI** pour les primitives headless
- **CVA** (class-variance-authority) pour les variantes
- **Storybook 10** pour la documentation
- **Vitest** + Testing Library pour les tests
- **Biome** pour le linting et le formatage
- **Turborepo** + **pnpm** pour l'orchestration monorepo

## Prérequis

- Node.js >= 18
- pnpm 10+

## Installation

```bash
pnpm install
```

## Commandes

```bash
pnpm dev          # Storybook en mode développement (port 6006)
pnpm build        # Build de tous les packages
pnpm test         # Lancer les tests
pnpm lint         # Lancer le linter
pnpm lint:fix     # Corriger automatiquement les erreurs de lint
pnpm format       # Formater le code
```

## Utiliser `@dshas/ui` dans un projet

### Installation locale (sans registre npm)

```bash
# Depuis le monorepo
pnpm --filter @dshas/ui build
cd packages/ui && pnpm pack

# Depuis le projet consommateur
pnpm add /chemin/vers/dshas-ui-0.1.0.tgz
```

### Usage

```tsx
import "@dshas/ui/styles.css";
import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent, Alert } from "@dshas/ui";
```

### Typographie

Le design system utilise la police **Raleway** (400, 500, 700). Elle n'est pas incluse dans le package — chaque projet consommateur doit la charger (Google Fonts, `@fontsource/raleway`, self-hosted, etc.).

## Figma

Source des maquettes : [DSHAS Composants](https://www.figma.com/design/FnyYDn4Jb09qWi891lyrCX/DSHAS-Composants)

## Licence

Projet privé.
