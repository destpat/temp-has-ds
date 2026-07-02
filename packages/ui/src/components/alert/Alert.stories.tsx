import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

/**
 * Alert component following DSFR (Systeme de Design de l'Etat) guidelines.
 *
 * Draws attention to contextual information without interrupting the user's flow.
 * Supports 4 variants (info, success, warning, error) and 2 sizes (md, sm).
 *
 * @see [Figma Source](https://www.figma.com/design/FnyYDn4Jb09qWi891lyrCX/DSHAS-Composants?node-id=17240-129598&m=dev)
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

/** Information alert for highlighting important details. */
export const Info: Story = {
	args: {
		variant: "info",
		title: "Information",
		children:
			"Ceci est une alerte d'information pour mettre en exergue des informations importantes.",
	},
};

/** Success alert confirming a completed action. */
export const Success: Story = {
	args: {
		variant: "success",
		title: "Succes",
		children: "L'action a ete realisee avec succes.",
	},
};

/** Warning alert for urgent information requiring attention. */
export const Warning: Story = {
	args: {
		variant: "warning",
		title: "Avertissement",
		children: "Cette action peut entrainer des consequences importantes.",
	},
};

/** Error alert for blocking issues or form validation failures. */
export const Error: Story = {
	args: {
		variant: "error",
		title: "Erreur",
		children: "Une erreur est survenue lors du traitement de votre demande.",
	},
};

/** Alert without description, title only. */
export const TitleOnly: Story = {
	args: {
		variant: "error",
		title: "Titre seul",
	},
};

/** Uncontrolled: the alert hides itself when closed. */
export const Closable: Story = {
	args: {
		variant: "warning",
		title: "Avertissement",
		children: "Cliquez sur la croix, l'alerte disparait toute seule.",
		closable: true,
	},
};

/** Controlled: the consumer manages visibility via onClose. */
export const Controlled: Story = {
	args: {
		variant: "error",
		title: "Erreur",
		children: "Le onClose est appele mais l'alerte reste visible (mode controle).",
		onClose: () => console.log("onClose called"),
	},
};

/** Small size — compact alert with description only, no title. */
export const Small: Story = {
	args: {
		variant: "info",
		size: "sm",
		children: "Description",
	},
};

/** Small closable alert. */
export const SmallClosable: Story = {
	args: {
		variant: "success",
		size: "sm",
		children: "Description",
		onClose: () => {},
	},
};

/** All 4 variants in MD size. */
export const AllVariantsMD: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<Alert variant="info" title="Information">
				Description
			</Alert>
			<Alert variant="success" title="Succes">
				Description
			</Alert>
			<Alert variant="warning" title="Avertissement">
				Description
			</Alert>
			<Alert variant="error" title="Erreur">
				Description
			</Alert>
		</div>
	),
};

/** All 4 variants in SM size. */
export const AllVariantsSM: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<Alert variant="info" size="sm">
				Description
			</Alert>
			<Alert variant="success" size="sm">
				Description
			</Alert>
			<Alert variant="warning" size="sm">
				Description
			</Alert>
			<Alert variant="error" size="sm">
				Description
			</Alert>
		</div>
	),
};
