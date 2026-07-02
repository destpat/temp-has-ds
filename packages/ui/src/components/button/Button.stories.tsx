import { RiArrowRightLine, RiDeleteBinLine, RiDownloadLine } from "@remixicon/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, buttonVariants } from "./Button";

/**
 * Bouton d'action suivant les guidelines DSFR, inspire de shadcn/ui et Material UI.
 *
 * ## Props principales
 *
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `variant` | `"default" \| "outline" \| "ghost" \| "link"` | `"default"` | Forme du bouton |
 * | `color` | `"primary" \| "error"` | `"primary"` | Palette de couleur |
 * | `size` | `"sm" \| "md" \| "lg" \| "icon"` | `"md"` | Taille du bouton |
 * | `startIcon` | `ReactNode` | — | Icone avant le label |
 * | `endIcon` | `ReactNode` | — | Icone apres le label |
 * | `loading` | `boolean` | `false` | Affiche un spinner (remplace startIcon) et desactive le bouton |
 * | `fullWidth` | `boolean` | `false` | Bouton pleine largeur |
 * | `disabled` | `boolean` | `false` | Desactive le bouton |
 *
 * `variant` et `color` sont deux axes independants : n'importe quelle combinaison est valide
 * (ex: `variant="outline" color="error"` pour un bouton bordure rouge).
 *
 * ## Bouton vs Lien
 *
 * **Important :** ne pas utiliser `<Button>` pour la navigation.
 * Le composant applique `role="button"`, ce qui ecrase la semantique native de `<a>`.
 * Les lecteurs d'ecran ne l'annonceront pas comme un lien.
 *
 * Pour un lien style comme un bouton, utiliser `buttonVariants` directement :
 *
 * ```tsx
 * import Link from "next/link";
 * import { buttonVariants } from "@dshas/ui";
 *
 * // Next.js Link
 * <Link href="/dashboard" className={buttonVariants({ variant: "default" })}>
 *   Dashboard
 * </Link>
 *
 * // Lien HTML classique
 * <a href="/page" className={buttonVariants({ variant: "outline", color: "error" })}>
 *   Supprimer le compte
 * </a>
 * ```
 *
 * @see [Figma Source](https://www.figma.com/design/FnyYDn4Jb09qWi891lyrCX/DSHAS-Composants?node-id=17240-135184&m=dev)
 */
const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "outline", "ghost", "link"],
		},
		color: {
			control: "select",
			options: ["primary", "error"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg", "icon"],
		},
		disabled: {
			control: "boolean",
		},
		loading: {
			control: "boolean",
		},
		fullWidth: {
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Bouton primaire rempli — action principale de la page. */
export const Default: Story = {
	args: {
		children: "Bouton primaire",
	},
};

/** Matrice de toutes les combinaisons variant x color. */
export const AllCombinations: Story = {
	render: () => (
		<div className="flex flex-col gap-6">
			<div className="flex flex-wrap items-center gap-4">
				<span className="w-16 text-grey-text text-sm">primary</span>
				<Button
					variant="default"
					color="primary"
				>
					Default
				</Button>
				<Button
					variant="outline"
					color="primary"
				>
					Outline
				</Button>
				<Button
					variant="ghost"
					color="primary"
				>
					Ghost
				</Button>
				<Button
					variant="link"
					color="primary"
				>
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-4">
				<span className="w-16 text-grey-text text-sm">error</span>
				<Button
					variant="default"
					color="error"
				>
					Default
				</Button>
				<Button
					variant="outline"
					color="error"
				>
					Outline
				</Button>
				<Button
					variant="ghost"
					color="error"
				>
					Ghost
				</Button>
				<Button
					variant="link"
					color="error"
				>
					Link
				</Button>
			</div>
		</div>
	),
};

/** startIcon (avant le label) et endIcon (apres le label), utilisables ensemble. */
export const WithIcon: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Button endIcon={<RiArrowRightLine />}>Continuer</Button>
			<Button startIcon={<RiDownloadLine />}>Telecharger</Button>
			<Button
				startIcon={<RiDeleteBinLine />}
				endIcon={<RiArrowRightLine />}
				color="error"
			>
				Supprimer
			</Button>
		</div>
	),
};

/** Les 3 tailles cote a cote. */
export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	),
};

/** Etat de chargement : affiche un spinner en startIcon et desactive le bouton. */
export const Loading: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Button loading>Enregistrement</Button>
			<Button
				loading
				variant="outline"
			>
				Chargement
			</Button>
			<Button
				loading
				endIcon={<RiArrowRightLine />}
			>
				Continuer
			</Button>
		</div>
	),
};

/**
 * Pour les liens de navigation, utiliser `buttonVariants` sur un `<a>` ou un Next.js `<Link>`.
 * Cela conserve la semantique de lien (`role="link"`) pour l'accessibilite.
 */
export const AsLink: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<a
				href="/#"
				className={buttonVariants()}
			>
				Lien primaire
			</a>
			<a
				href="/#"
				className={buttonVariants({ variant: "outline" })}
			>
				Lien outline
			</a>
			<a
				href="/#"
				className={buttonVariants({ variant: "outline", color: "error" })}
			>
				Lien error
			</a>
		</div>
	),
};

/** Bouton pleine largeur, utile dans les formulaires. */
export const FullWidth: Story = {
	render: () => (
		<div className="flex w-80 flex-col gap-4">
			<Button fullWidth>Valider</Button>
			<Button
				fullWidth
				variant="outline"
			>
				Annuler
			</Button>
		</div>
	),
};
