import type { Meta, StoryObj } from "@storybook/react";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./Breadcrumb";

/**
 * Fil d'Ariane suivant les guidelines DSFR.
 *
 * Indique la position de la page courante dans l'arborescence du site.
 *
 * Pour utiliser un composant de lien personnalise (ex. Next.js `Link`),
 * passez la prop `render` sur `<BreadcrumbLink />` :
 *
 * ```tsx
 * import Link from "next/link";
 *
 * <BreadcrumbLink render={(props) => <Link href="/about" {...props} />}>
 *   A propos
 * </BreadcrumbLink>
 * ```
 *
 * @see [Source Figma](https://www.figma.com/design/FnyYDn4Jb09qWi891lyrCX/DSHAS-Composants?node-id=17277-157016&m=dev)
 */
const meta: Meta<typeof Breadcrumb> = {
	title: "Components/Breadcrumb",
	component: Breadcrumb,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Fil d'Ariane simple avec trois niveaux. */
export const Default: Story = {
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="#accueil">Accueil</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="#section">Section</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Page en cours</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};

/** Fil d'Ariane complet a quatre niveaux, conforme au Figma DSFR. */
export const FourLevels: Story = {
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="#accueil">Accueil</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="#n2">Page N2</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="#n3">Page N3</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Page en cours</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};

/** Utilisation de la prop `render` pour composer avec un lien personnalise (ex. Next.js Link). */
export const CustomLink: Story = {
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink
						render={(props) => (
							<a
								href="#accueil"
								{...props}
							/>
						)}
					>
						Accueil
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Page en cours</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};

/** Fil d'Ariane avec ellipsis pour les arborescences profondes. */
export const WithEllipsis: Story = {
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="#accueil">Accueil</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbEllipsis />
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="#n3">Page N3</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Page en cours</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};
