import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from "./Accordion";

afterEach(cleanup);

function renderAccordion(props: Record<string, unknown> = {}) {
	return render(
		<AccordionRoot {...props}>
			<AccordionItem value="a">
				<AccordionTrigger>Item A</AccordionTrigger>
				<AccordionContent>Content A</AccordionContent>
			</AccordionItem>
			<AccordionItem value="b">
				<AccordionTrigger>Item B</AccordionTrigger>
				<AccordionContent>Content B</AccordionContent>
			</AccordionItem>
		</AccordionRoot>,
	);
}

describe("Accordion", () => {
	it("renders triggers with correct text", () => {
		renderAccordion();
		expect(screen.getByText("Item A")).toBeInTheDocument();
		expect(screen.getByText("Item B")).toBeInTheDocument();
	});

	it("panels are hidden by default", () => {
		renderAccordion();
		expect(screen.queryByText("Content A")).not.toBeInTheDocument();
		expect(screen.queryByText("Content B")).not.toBeInTheDocument();
	});

	it("opens panel on trigger click", () => {
		renderAccordion();
		fireEvent.click(screen.getByText("Item A"));
		expect(screen.getByText("Content A")).toBeInTheDocument();
	});

	it("closes other panels in single mode", () => {
		renderAccordion();
		fireEvent.click(screen.getByText("Item A"));
		expect(screen.getByText("Content A")).toBeInTheDocument();

		fireEvent.click(screen.getByText("Item B"));
		expect(screen.queryByText("Content A")).not.toBeInTheDocument();
		expect(screen.getByText("Content B")).toBeInTheDocument();
	});

	it("allows multiple panels open when multiple is true", () => {
		renderAccordion({ multiple: true });
		fireEvent.click(screen.getByText("Item A"));
		fireEvent.click(screen.getByText("Item B"));
		expect(screen.getByText("Content A")).toBeInTheDocument();
		expect(screen.getByText("Content B")).toBeInTheDocument();
	});

	it("opens items from defaultValue", () => {
		renderAccordion({ defaultValue: ["a"] });
		expect(screen.getByText("Content A")).toBeInTheDocument();
		expect(screen.queryByText("Content B")).not.toBeInTheDocument();
	});

	it("calls onValueChange when toggling", () => {
		const onChange = vi.fn();
		renderAccordion({ onValueChange: onChange });
		fireEvent.click(screen.getByText("Item A"));
		expect(onChange).toHaveBeenCalled();
	});

	it("does not open disabled items", () => {
		render(
			<AccordionRoot>
				<AccordionItem value="x" disabled>
					<AccordionTrigger>Disabled</AccordionTrigger>
					<AccordionContent>Hidden</AccordionContent>
				</AccordionItem>
			</AccordionRoot>,
		);
		fireEvent.click(screen.getByText("Disabled"));
		expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
	});

	it("triggers have correct ARIA role", () => {
		renderAccordion();
		const triggers = screen.getAllByRole("button");
		expect(triggers.length).toBeGreaterThanOrEqual(2);
	});
});
