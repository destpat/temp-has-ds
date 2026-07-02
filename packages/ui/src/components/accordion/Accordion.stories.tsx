import type { Meta, StoryObj } from "@storybook/react";
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from "./Accordion";

/**
 * Composant Accordeon suivant les guidelines DSFR.
 *
 * Construit sur les primitives Base UI pour une accessibilite complete (pattern WAI-ARIA Accordion).
 * Supporte les modes d'ouverture simple ou multiple, en mode controle ou non controle.
 *
 * @see [Source Figma](https://www.figma.com/design/FnyYDn4Jb09qWi891lyrCX/DSHAS-Composants?node-id=17240-128022&m=dev)
 */
const meta: Meta<typeof AccordionRoot> = {
	title: "Components/Accordion",
	component: AccordionRoot,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Un seul item d'accordeon dans son etat ferme par defaut. */
export const Default: Story = {
	render: () => (
		<AccordionRoot>
			<AccordionItem value="1">
				<AccordionTrigger>Intitule accordeon</AccordionTrigger>
				<AccordionContent>
					<p className="font-raleway text-grey-title text-sm">
						Contenu de l'accordeon. Vous pouvez y placer n'importe quel contenu : texte, images, formulaires, etc.
					</p>
				</AccordionContent>
			</AccordionItem>
		</AccordionRoot>
	),
};

/** Groupe d'accordeons avec le deuxieme item ouvert par defaut. */
export const Group: Story = {
	render: () => (
		<AccordionRoot defaultValue={[1]}>
			<AccordionItem value={0}>
				<AccordionTrigger>Intitule accordeon 1</AccordionTrigger>
				<AccordionContent>
					<p className="font-raleway text-grey-title text-sm">Contenu du premier accordeon.</p>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value={1}>
				<AccordionTrigger>Intitule accordeon 2</AccordionTrigger>
				<AccordionContent>
					<p className="font-raleway text-grey-title text-sm">
						Contenu du deuxieme accordeon. Cet element est ouvert par defaut.
					</p>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value={2}>
				<AccordionTrigger>Intitule accordeon 3</AccordionTrigger>
				<AccordionContent>
					<p className="font-raleway text-grey-title text-sm">Contenu du troisieme accordeon.</p>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value={3}>
				<AccordionTrigger>Intitule accordeon 4</AccordionTrigger>
				<AccordionContent>
					<p className="font-raleway text-grey-title text-sm">Contenu du quatrieme accordeon.</p>
				</AccordionContent>
			</AccordionItem>
		</AccordionRoot>
	),
};

/** Plusieurs items peuvent etre ouverts en meme temps. */
export const Multiple: Story = {
	render: () => (
		<AccordionRoot
			multiple
			defaultValue={[0, 2]}
		>
			<AccordionItem value={0}>
				<AccordionTrigger>Section A</AccordionTrigger>
				<AccordionContent>
					<p className="font-raleway text-grey-title text-sm">Contenu de la section A.</p>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value={1}>
				<AccordionTrigger>Section B</AccordionTrigger>
				<AccordionContent>
					<p className="font-raleway text-grey-title text-sm">Contenu de la section B.</p>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value={2}>
				<AccordionTrigger>Section C</AccordionTrigger>
				<AccordionContent>
					<p className="font-raleway text-grey-title text-sm">Contenu de la section C.</p>
				</AccordionContent>
			</AccordionItem>
		</AccordionRoot>
	),
};

/** Un item desactive ne peut pas etre ouvert ou ferme. */
export const Disabled: Story = {
	render: () => (
		<AccordionRoot>
			<AccordionItem value="1">
				<AccordionTrigger>Item actif</AccordionTrigger>
				<AccordionContent>
					<p className="font-raleway text-grey-title text-sm">Ce contenu est accessible.</p>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem
				value="2"
				disabled
			>
				<AccordionTrigger>Item desactive</AccordionTrigger>
				<AccordionContent>
					<p className="font-raleway text-grey-title text-sm">Ce contenu n'est pas accessible.</p>
				</AccordionContent>
			</AccordionItem>
		</AccordionRoot>
	),
};
