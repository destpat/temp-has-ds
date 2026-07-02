import { RiCheckLine, RiErrorWarningLine, RiFlashlightLine, RiInformationLine, RiTimeLine } from "@remixicon/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

/**
 * Badge suivant les guidelines DSFR.
 *
 * ## Props principales
 *
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `variant` | `"soft" \| "outline"` | `"soft"` | Forme du badge |
 * | `color` | `"info" \| "success" \| "warning" \| "error" \| "yellow" \| "purple" \| "pink" \| "teal" \| "gray" \| "blue"` | `"info"` | Couleur |
 * | `size` | `"sm" \| "md"` | `"md"` | Taille |
 * | `startIcon` | `ReactNode` | — | Icone avant le label |
 * | `render` | `(props) => ReactNode` | — | Rendu polymorphique (ex: lien) |
 *
 * @see [Source Figma](https://www.figma.com/design/FnyYDn4Jb09qWi891lyrCX/DSHAS-Composants?node-id=17503-113720&m=dev)
 */
const meta: Meta<typeof Badge> = {
	title: "Components/Badge",
	component: Badge,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["soft", "outline"],
		},
		color: {
			control: "select",
			options: ["info", "success", "warning", "error", "yellow", "purple", "pink", "teal", "gray", "blue"],
		},
		size: {
			control: "select",
			options: ["sm", "md"],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Badge par defaut — fond doux avec texte colore. */
export const Default: Story = {
	args: {
		children: "Badge",
	},
};

/** Toutes les couleurs en variante soft. */
export const AllColors: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-3">
			<Badge color="info">Info</Badge>
			<Badge color="success">Succes</Badge>
			<Badge color="warning">Avertissement</Badge>
			<Badge color="error">Erreur</Badge>
			<Badge color="yellow">Nouveau</Badge>
			<Badge color="purple">Purple</Badge>
			<Badge color="pink">Pink</Badge>
			<Badge color="teal">Teal</Badge>
			<Badge color="gray">Gray</Badge>
			<Badge color="blue">Blue</Badge>
		</div>
	),
};

/** Toutes les couleurs en variante outline. */
export const AllColorsOutline: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-3">
			<Badge
				variant="outline"
				color="info"
			>
				Info
			</Badge>
			<Badge
				variant="outline"
				color="success"
			>
				Succes
			</Badge>
			<Badge
				variant="outline"
				color="warning"
			>
				Avertissement
			</Badge>
			<Badge
				variant="outline"
				color="error"
			>
				Erreur
			</Badge>
			<Badge
				variant="outline"
				color="yellow"
			>
				Nouveau
			</Badge>
			<Badge
				variant="outline"
				color="purple"
			>
				Purple
			</Badge>
			<Badge
				variant="outline"
				color="pink"
			>
				Pink
			</Badge>
			<Badge
				variant="outline"
				color="teal"
			>
				Teal
			</Badge>
			<Badge
				variant="outline"
				color="gray"
			>
				Gray
			</Badge>
			<Badge
				variant="outline"
				color="blue"
			>
				Blue
			</Badge>
		</div>
	),
};

/** Les 2 tailles cote a cote. */
export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-3">
			<Badge size="sm">Small</Badge>
			<Badge size="md">Medium</Badge>
		</div>
	),
};

/** Badges avec icone. */
export const WithIcon: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-3">
			<Badge
				color="info"
				startIcon={<RiTimeLine />}
			>
				En attente
			</Badge>
			<Badge
				color="success"
				startIcon={<RiCheckLine />}
			>
				Valide
			</Badge>
			<Badge
				color="warning"
				startIcon={<RiErrorWarningLine />}
			>
				Attention
			</Badge>
			<Badge
				color="error"
				startIcon={<RiInformationLine />}
			>
				Erreur
			</Badge>
			<Badge
				color="yellow"
				startIcon={<RiFlashlightLine />}
			>
				Nouveau
			</Badge>
		</div>
	),
};

/**
 * Utiliser la prop `render` pour afficher le badge comme un lien.
 *
 * ```tsx
 * <Badge render={(props) => <a href="/page" {...props} />} color="blue">
 *   Voir plus
 * </Badge>
 * ```
 */
export const AsLink: Story = {
	render: () => (
		<div className="flex items-center gap-3">
			<Badge
				render={(props) => (
					<a
						href="#"
						{...props}
					/>
				)}
				color="blue"
			>
				Lien blue
			</Badge>
			<Badge
				render={(props) => (
					<a
						href="#"
						{...props}
					/>
				)}
				color="success"
			>
				Lien success
			</Badge>
		</div>
	),
};
