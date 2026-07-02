import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./Breadcrumb";

afterEach(cleanup);

describe("Breadcrumb", () => {
	it("renders a nav with aria-label", () => {
		render(
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbPage>Accueil</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>,
		);
		const nav = screen.getByRole("navigation");
		expect(nav).toHaveAttribute("aria-label", "Fil d'Ariane");
	});

	it("renders breadcrumb links", () => {
		render(
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Accueil</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Page en cours</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>,
		);
		const link = screen.getByRole("link", { name: "Accueil" });
		expect(link).toHaveAttribute("href", "/");
	});

	it("renders current page with aria-current", () => {
		render(
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbPage>Page en cours</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>,
		);
		const page = screen.getByText("Page en cours");
		expect(page).toHaveAttribute("aria-current", "page");
	});

	it("renders separators as presentation", () => {
		const { container } = render(
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Accueil</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Page</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>,
		);
		const separator = container.querySelector("[role='presentation']");
		expect(separator).toBeInTheDocument();
		expect(separator).toHaveAttribute("aria-hidden", "true");
	});

	it("renders ellipsis", () => {
		render(
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbEllipsis />
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>,
		);
		expect(screen.getByText("Plus de pages")).toBeInTheDocument();
	});

	it("supports render prop on BreadcrumbLink", () => {
		render(
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink
							render={(props) => (
								<a
									href="/custom"
									{...props}
								/>
							)}
						>
							Custom Link
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>,
		);
		const link = screen.getByRole("link", { name: "Custom Link" });
		expect(link).toHaveAttribute("href", "/custom");
		expect(link.className).toContain("text-grey-text");
	});

	it("spreads rest props on Breadcrumb", () => {
		render(
			<Breadcrumb data-testid="breadcrumb-nav">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbPage>Page</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>,
		);
		expect(screen.getByTestId("breadcrumb-nav")).toBeInTheDocument();
	});

	it("renders a complete breadcrumb trail", () => {
		render(
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Accueil</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/n2">Page N2</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/n3">Page N3</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Page en cours</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>,
		);
		expect(screen.getByText("Accueil")).toBeInTheDocument();
		expect(screen.getByText("Page N2")).toBeInTheDocument();
		expect(screen.getByText("Page N3")).toBeInTheDocument();
		expect(screen.getByText("Page en cours")).toHaveAttribute("aria-current", "page");
	});
});
