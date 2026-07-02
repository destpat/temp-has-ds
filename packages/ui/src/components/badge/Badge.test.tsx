import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Badge } from "./Badge";

afterEach(cleanup);

describe("Badge", () => {
	it("renders children", () => {
		render(<Badge>Info</Badge>);
		expect(screen.getByText("Info")).toBeInTheDocument();
	});

	it("renders as a span by default", () => {
		render(<Badge>Tag</Badge>);
		expect(screen.getByText("Tag").tagName).toBe("SPAN");
	});

	it("forwards ref", () => {
		let el: HTMLElement | null = null;
		render(
			<Badge
				ref={(node) => {
					el = node;
				}}
			>
				Ref
			</Badge>,
		);
		expect(el).toBeInstanceOf(HTMLSpanElement);
	});

	it("spreads native props", () => {
		render(<Badge data-testid="badge">OK</Badge>);
		expect(screen.getByTestId("badge")).toBeInTheDocument();
	});

	it("merges custom className", () => {
		render(<Badge className="mt-4">Styled</Badge>);
		expect(screen.getByText("Styled").className).toContain("mt-4");
	});

	it.each(["soft", "outline"] as const)("renders %s variant", (variant) => {
		render(<Badge variant={variant}>Label</Badge>);
		expect(screen.getByText("Label")).toBeInTheDocument();
	});

	it.each(["info", "success", "warning", "error", "yellow", "purple", "pink", "teal", "gray", "blue"] as const)(
		"renders %s color",
		(color) => {
			render(<Badge color={color}>Label</Badge>);
			expect(screen.getByText("Label")).toBeInTheDocument();
		},
	);

	it.each(["sm", "md"] as const)("renders %s size", (size) => {
		render(<Badge size={size}>Label</Badge>);
		expect(screen.getByText("Label")).toBeInTheDocument();
	});

	it("combines variant and color", () => {
		render(
			<Badge
				variant="outline"
				color="error"
			>
				Erreur
			</Badge>,
		);
		const badge = screen.getByText("Erreur");
		expect(badge.className).toContain("border-error");
		expect(badge.className).toContain("text-error");
	});

	it("renders startIcon before children", () => {
		render(<Badge startIcon={<svg data-testid="icon" />}>Label</Badge>);
		const badge = screen.getByText("Label");
		const iconWrapper = screen.getByTestId("icon").closest("[aria-hidden]")!;
		const children = Array.from(badge.childNodes);
		expect(children.indexOf(iconWrapper)).toBe(0);
	});

	it("does not render icon wrapper when no startIcon", () => {
		render(<Badge>No icon</Badge>);
		expect(screen.getByText("No icon").querySelector("[aria-hidden]")).toBeNull();
	});

	it("renders as a custom element via render prop", () => {
		render(
			<Badge
				render={(props) => (
					<a
						href="/page"
						{...props}
					/>
				)}
				color="blue"
			>
				Lien
			</Badge>,
		);
		const link = screen.getByRole("link", { name: "Lien" });
		expect(link.tagName).toBe("A");
		expect(link).toHaveAttribute("href", "/page");
		expect(link.className).toContain("text-blue-france");
	});
});
