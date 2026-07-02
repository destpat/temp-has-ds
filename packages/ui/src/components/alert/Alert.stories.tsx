import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

/**
 * Composant Alerte suivant les guidelines DSFR.
 *
 * Attire l'attention sur une information contextuelle sans interrompre le flux de l'utilisateur.
 * Supporte 4 variantes (info, success, warning, error) et 2 tailles (md, sm).
 *
 * @see [Source Figma](https://www.figma.com/design/FnyYDn4Jb09qWi891lyrCX/DSHAS-Composants?node-id=17240-129598&m=dev)
 */
const meta: Meta<typeof Alert> = {
	title: "Components/Alert",
	component: Alert,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["info", "success", "warning", "error"],
		},
		size: {
			control: "select",
			options: ["md", "sm"],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Alerte d'information pour mettre en avant des details importants. */
export const Info: Story = {
	args: {
		variant: "info",
		title: "Information",
		children: "Ceci est une alerte d'information pour mettre en exergue des informations importantes.",
	},
};

/** Alerte de succes confirmant une action terminee. */
export const Success: Story = {
	args: {
		variant: "success",
		title: "Succes",
		children: "L'action a ete realisee avec succes.",
	},
};

/** Alerte d'avertissement pour une information urgente necessitant l'attention. */
export const Warning: Story = {
	args: {
		variant: "warning",
		title: "Avertissement",
		children: "Cette action peut entrainer des consequences importantes.",
	},
};

/** Alerte d'erreur pour les problemes bloquants ou les erreurs de validation. */
export const ErrorVariant: Story = {
	args: {
		variant: "error",
		title: "Erreur",
		children: "Une erreur est survenue lors du traitement de votre demande.",
	},
};

/** Alerte sans description, uniquement le titre. */
export const TitleOnly: Story = {
	args: {
		variant: "error",
		title: "Titre seul",
	},
};

/** Non controlee : l'alerte se masque d'elle-meme au clic sur la croix. */
export const Closable: Story = {
	args: {
		variant: "warning",
		title: "Avertissement",
		children: "Cliquez sur la croix, l'alerte disparait toute seule.",
		closable: true,
	},
};

/** Controlee : le consommateur gere la visibilite via onClose. */
export const Controlled: Story = {
	args: {
		variant: "error",
		title: "Erreur",
		children: "Le onClose est appele mais l'alerte reste visible (mode controle).",
		onClose: () => console.log("onClose called"),
	},
};

/** Taille SM — alerte compacte avec description uniquement, sans titre. */
export const Small: Story = {
	args: {
		variant: "info",
		size: "sm",
		children: "Description",
	},
};

/** Taille SM avec bouton de fermeture. */
export const SmallClosable: Story = {
	args: {
		variant: "success",
		size: "sm",
		children: "Description",
		onClose: () => {},
	},
};

/** Les 4 variantes en taille MD. */
export const AllVariantsMD: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<Alert
				variant="info"
				title="Information"
			>
				Description
			</Alert>
			<Alert
				variant="success"
				title="Succes"
			>
				Description
			</Alert>
			<Alert
				variant="warning"
				title="Avertissement"
			>
				Description
			</Alert>
			<Alert
				variant="error"
				title="Erreur"
			>
				Description
			</Alert>
		</div>
	),
};

/** Les 4 variantes en taille SM. */
export const AllVariantsSM: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<Alert
				variant="info"
				size="sm"
			>
				Description
			</Alert>
			<Alert
				variant="success"
				size="sm"
			>
				Description
			</Alert>
			<Alert
				variant="warning"
				size="sm"
			>
				Description
			</Alert>
			<Alert
				variant="error"
				size="sm"
			>
				Description
			</Alert>
		</div>
	),
};
