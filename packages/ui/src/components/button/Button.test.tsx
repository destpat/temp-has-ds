import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Button, buttonVariants } from "./Button";

afterEach(cleanup);

describe("Button", () => {
	it("renders children", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
	});

	it("defaults to type=button", () => {
		render(<Button>OK</Button>);
		expect(screen.getByRole("button")).toHaveAttribute("type", "button");
	});

	it("allows overriding type to submit", () => {
		render(<Button type="submit">Send</Button>);
		expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
	});

	it("forwards ref", () => {
		let buttonEl: HTMLElement | null = null;
		render(
			<Button
				ref={(el) => {
					buttonEl = el;
				}}
			>
				Ref
			</Button>,
		);
		expect(buttonEl).toBeInstanceOf(HTMLButtonElement);
	});

	it("spreads native props", () => {
		render(
			<Button
				data-testid="my-btn"
				aria-label="custom"
			>
				OK
			</Button>,
		);
		expect(screen.getByTestId("my-btn")).toBeInTheDocument();
		expect(screen.getByLabelText("custom")).toBeInTheDocument();
	});

	it("applies disabled state", () => {
		render(<Button disabled>Disabled</Button>);
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("merges custom className", () => {
		render(<Button className="mt-4">Styled</Button>);
		expect(screen.getByRole("button").className).toContain("mt-4");
	});

	it.each(["default", "outline", "ghost", "link"] as const)("renders %s variant", (variant) => {
		render(<Button variant={variant}>Label</Button>);
		expect(screen.getByRole("button", { name: "Label" })).toBeInTheDocument();
	});

	it.each(["primary", "error"] as const)("renders %s color", (color) => {
		render(<Button color={color}>Label</Button>);
		expect(screen.getByRole("button", { name: "Label" })).toBeInTheDocument();
	});

	it.each(["sm", "md", "lg", "icon"] as const)("renders %s size", (size) => {
		render(
			<Button
				size={size}
				aria-label="btn"
			>
				OK
			</Button>,
		);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("combines variant and color", () => {
		render(
			<Button
				variant="outline"
				color="error"
			>
				Delete
			</Button>,
		);
		const button = screen.getByRole("button", { name: "Delete" });
		expect(button.className).toContain("border-error");
		expect(button.className).toContain("text-error");
	});

	it("renders endIcon after children", () => {
		render(<Button endIcon={<svg data-testid="end" />}>Label</Button>);
		const button = screen.getByRole("button");
		const iconWrapper = screen.getByTestId("end").closest("[aria-hidden]")!;
		const children = Array.from(button.childNodes);
		expect(children.indexOf(iconWrapper)).toBe(children.length - 1);
	});

	it("renders startIcon before children", () => {
		render(<Button startIcon={<svg data-testid="start" />}>Label</Button>);
		const button = screen.getByRole("button");
		const iconWrapper = screen.getByTestId("start").closest("[aria-hidden]")!;
		const children = Array.from(button.childNodes);
		expect(children.indexOf(iconWrapper)).toBe(0);
	});

	it("renders both startIcon and endIcon simultaneously", () => {
		render(
			<Button
				startIcon={<svg data-testid="start" />}
				endIcon={<svg data-testid="end" />}
			>
				Label
			</Button>,
		);
		const button = screen.getByRole("button");
		const children = Array.from(button.childNodes);
		const startWrapper = screen.getByTestId("start").closest("[aria-hidden]")!;
		const endWrapper = screen.getByTestId("end").closest("[aria-hidden]")!;
		expect(children.indexOf(startWrapper)).toBe(0);
		expect(children.indexOf(endWrapper)).toBe(children.length - 1);
	});

	it("does not render icon wrapper when no icon is provided", () => {
		render(<Button>No icon</Button>);
		const button = screen.getByRole("button");
		expect(button.querySelector("[aria-hidden]")).toBeNull();
	});

	it("marks icons as aria-hidden", () => {
		render(<Button startIcon={<svg data-testid="icon" />}>Label</Button>);
		const wrapper = screen.getByTestId("icon").closest("[aria-hidden]");
		expect(wrapper).toHaveAttribute("aria-hidden", "true");
	});

	it("disables button when loading", () => {
		render(<Button loading>Save</Button>);
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("sets aria-busy when loading", () => {
		render(<Button loading>Save</Button>);
		expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
	});

	it("does not set aria-busy when not loading", () => {
		render(<Button>Save</Button>);
		expect(screen.getByRole("button")).not.toHaveAttribute("aria-busy");
	});

	it("shows spinner as startIcon when loading replaces startIcon", () => {
		render(
			<Button
				loading
				startIcon={<svg data-testid="icon" />}
			>
				Save
			</Button>,
		);
		expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
		const button = screen.getByRole("button");
		expect(button.querySelector("[data-slot='spinner']")).toBeInTheDocument();
	});

	it("shows spinner as startIcon when loading without any icon", () => {
		render(<Button loading>Save</Button>);
		const button = screen.getByRole("button");
		const spinner = button.querySelector("[data-slot='spinner']")!;
		const children = Array.from(button.childNodes);
		expect(children.indexOf(spinner.closest("[aria-hidden]")!)).toBe(0);
	});

	it("keeps endIcon visible when loading", () => {
		render(
			<Button
				loading
				endIcon={<svg data-testid="end" />}
			>
				Save
			</Button>,
		);
		const button = screen.getByRole("button");
		expect(button.querySelector("[data-slot='spinner']")).toBeInTheDocument();
		expect(screen.getByTestId("end")).toBeInTheDocument();
	});

	it("buttonVariants can be used on a plain <a> for link semantics", () => {
		render(
			<a
				href="/page"
				className={buttonVariants({ variant: "default", color: "primary" })}
			>
				Navigate
			</a>,
		);
		const link = screen.getByRole("link", { name: "Navigate" });
		expect(link).toBeInTheDocument();
		expect(link.tagName).toBe("A");
		expect(link.className).toContain("bg-blue-france");
	});

	it("applies w-full when fullWidth is set", () => {
		render(<Button fullWidth>Full</Button>);
		expect(screen.getByRole("button").className).toContain("w-full");
	});

	it("does not apply w-full by default", () => {
		render(<Button>Normal</Button>);
		expect(screen.getByRole("button").className).not.toContain("w-full");
	});

	it("applies active press style", () => {
		render(<Button>Press</Button>);
		const button = screen.getByRole("button");
		expect(button.className).toContain("active:brightness-95");
	});
});
