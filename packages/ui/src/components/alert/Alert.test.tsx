import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Alert } from "./Alert";

afterEach(cleanup);

describe("Alert", () => {
	it("renders with title", () => {
		render(<Alert variant="info" title="Test title" />);
		expect(screen.getByText("Test title")).toBeInTheDocument();
	});

	it("renders with description", () => {
		render(
			<Alert variant="info" title="Title">
				Description text
			</Alert>,
		);
		expect(screen.getByText("Description text")).toBeInTheDocument();
	});

	it("renders without description when not provided", () => {
		const { container } = render(<Alert variant="info" title="Title only" />);
		const content = container.querySelector("[role='alert']");
		expect(content).toBeInTheDocument();
		expect(screen.queryByText("Description")).not.toBeInTheDocument();
	});

	it("has role=alert for accessibility", () => {
		render(<Alert variant="error" title="Error" />);
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	it("renders close button when onClose is provided", () => {
		const onClose = vi.fn();
		render(<Alert variant="warning" title="Warning" onClose={onClose} />);
		const closeButton = screen.getByLabelText("Fermer l'alerte");
		expect(closeButton).toBeInTheDocument();
	});

	it("calls onClose when close button is clicked", () => {
		const onClose = vi.fn();
		render(<Alert variant="warning" title="Warning" onClose={onClose} />);
		fireEvent.click(screen.getByLabelText("Fermer l'alerte"));
		expect(onClose).toHaveBeenCalledOnce();
	});

	it("does not render close button when neither closable nor onClose", () => {
		render(<Alert variant="info" title="Info" />);
		expect(screen.queryByLabelText("Fermer l'alerte")).not.toBeInTheDocument();
	});

	it("uncontrolled: hides itself when closable is set", () => {
		render(<Alert variant="info" title="Closable" closable />);
		expect(screen.getByRole("alert")).toBeInTheDocument();
		fireEvent.click(screen.getByLabelText("Fermer l'alerte"));
		expect(screen.queryByRole("alert")).not.toBeInTheDocument();
	});

	it("controlled: does not hide itself when onClose is provided", () => {
		const onClose = vi.fn();
		render(<Alert variant="info" title="Controlled" onClose={onClose} />);
		fireEvent.click(screen.getByLabelText("Fermer l'alerte"));
		expect(onClose).toHaveBeenCalledOnce();
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	it("renders close button when closable is set", () => {
		render(<Alert variant="info" title="Info" closable />);
		expect(screen.getByLabelText("Fermer l'alerte")).toBeInTheDocument();
	});

	it.each(["info", "success", "warning", "error"] as const)(
		"renders %s variant",
		(variant) => {
			render(<Alert variant={variant} title={`${variant} alert`} />);
			expect(screen.getByText(`${variant} alert`)).toBeInTheDocument();
		},
	);

	it("renders SM size with description only", () => {
		render(
			<Alert variant="info" size="sm">
				Small alert text
			</Alert>,
		);
		expect(screen.getByText("Small alert text")).toBeInTheDocument();
	});

	it("SM size does not render title", () => {
		render(
			<Alert variant="info" size="sm" title="Hidden title">
				Content
			</Alert>,
		);
		expect(screen.queryByText("Hidden title")).not.toBeInTheDocument();
	});

	it("SM size with close button", () => {
		const onClose = vi.fn();
		render(
			<Alert variant="success" size="sm" onClose={onClose}>
				Closable
			</Alert>,
		);
		fireEvent.click(screen.getByLabelText("Fermer l'alerte"));
		expect(onClose).toHaveBeenCalledOnce();
	});
});
