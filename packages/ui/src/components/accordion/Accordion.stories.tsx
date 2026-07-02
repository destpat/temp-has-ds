import type { Meta, StoryObj } from "@storybook/react";
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "./Accordion";

/**
 * Accordion component following the DSFR (Systeme de Design de l'Etat) guidelines.
 *
 * Built on Base UI primitives for full accessibility (WAI-ARIA Accordion pattern).
 * Supports single or multiple expand modes, controlled and uncontrolled state.
 *
 * @see [Figma Source](https://www.figma.com/design/FnyYDn4Jb09qWi891lyrCX/DSHAS-Composants?node-id=17240-128022&m=dev)
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

/** A single accordion item in its default closed state. */
export const Default: Story = {
  render: () => (
    <AccordionRoot>
      <AccordionItem value="1">
        <AccordionTrigger>Intitule accordeon</AccordionTrigger>
        <AccordionContent>
          <p className="font-raleway text-sm text-grey-title">
            Contenu de l'accordeon. Vous pouvez y placer n'importe quel contenu
            : texte, images, formulaires, etc.
          </p>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  ),
};

/** A group of accordion items with the second item open by default. */
export const Group: Story = {
  render: () => (
    <AccordionRoot defaultValue={[1]}>
      <AccordionItem value={0}>
        <AccordionTrigger>Intitule accordeon 1</AccordionTrigger>
        <AccordionContent>
          <p className="font-raleway text-sm text-grey-title">
            Contenu du premier accordeon.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={1}>
        <AccordionTrigger>Intitule accordeon 2</AccordionTrigger>
        <AccordionContent>
          <p className="font-raleway text-sm text-grey-title">
            Contenu du deuxieme accordeon. Cet element est ouvert par defaut.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={2}>
        <AccordionTrigger>Intitule accordeon 3</AccordionTrigger>
        <AccordionContent>
          <p className="font-raleway text-sm text-grey-title">
            Contenu du troisieme accordeon.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={3}>
        <AccordionTrigger>Intitule accordeon 4</AccordionTrigger>
        <AccordionContent>
          <p className="font-raleway text-sm text-grey-title">
            Contenu du quatrieme accordeon.
          </p>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  ),
};

/** Multiple items can be expanded at the same time. */
export const Multiple: Story = {
  render: () => (
    <AccordionRoot multiple defaultValue={[0, 2]}>
      <AccordionItem value={0}>
        <AccordionTrigger>Section A</AccordionTrigger>
        <AccordionContent>
          <p className="font-raleway text-sm text-grey-title">
            Contenu de la section A.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={1}>
        <AccordionTrigger>Section B</AccordionTrigger>
        <AccordionContent>
          <p className="font-raleway text-sm text-grey-title">
            Contenu de la section B.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={2}>
        <AccordionTrigger>Section C</AccordionTrigger>
        <AccordionContent>
          <p className="font-raleway text-sm text-grey-title">
            Contenu de la section C.
          </p>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  ),
};

/** A disabled item cannot be toggled. */
export const Disabled: Story = {
  render: () => (
    <AccordionRoot>
      <AccordionItem value="1">
        <AccordionTrigger>Item actif</AccordionTrigger>
        <AccordionContent>
          <p className="font-raleway text-sm text-grey-title">
            Ce contenu est accessible.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="2" disabled>
        <AccordionTrigger>Item desactive</AccordionTrigger>
        <AccordionContent>
          <p className="font-raleway text-sm text-grey-title">
            Ce contenu n'est pas accessible.
          </p>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  ),
};
