import { RiLoader4Line } from "@remixicon/react";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

type SpinnerProps = ComponentProps<typeof RiLoader4Line>;

const Spinner = ({ className, ...rest }: SpinnerProps) => {
	return (
		<RiLoader4Line
			data-slot="spinner"
			role="status"
			aria-label="Chargement"
			className={cn("size-4 animate-spin", className)}
			{...rest}
		/>
	);
};

Spinner.displayName = "Spinner";

export { Spinner };
export type { SpinnerProps };
