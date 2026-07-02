import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { type VariantProps, cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

const badgeVariants = cva(["inline-flex items-center gap-1 rounded", "whitespace-nowrap font-medium font-raleway"], {
	variants: {
		variant: {
			soft: "",
			outline: "border bg-transparent",
		},
		color: {
			info: "",
			success: "",
			warning: "",
			error: "",
			yellow: "",
			purple: "",
			pink: "",
			teal: "",
			gray: "",
			blue: "",
		},
		size: {
			sm: "px-1.5 text-xs leading-4 tracking-wide [&_svg]:size-3",
			md: "px-2 text-sm leading-5 tracking-wide [&_svg]:size-3.5",
		},
	},
	compoundVariants: [
		{ variant: "soft", color: "info", className: "bg-info-light text-info" },
		{ variant: "soft", color: "success", className: "bg-success-light text-success" },
		{ variant: "soft", color: "warning", className: "bg-warning-light text-warning" },
		{ variant: "soft", color: "error", className: "bg-error-light text-error" },
		{ variant: "soft", color: "yellow", className: "bg-yellow-light text-yellow" },
		{ variant: "soft", color: "purple", className: "bg-purple-light text-purple" },
		{ variant: "soft", color: "pink", className: "bg-pink-light text-pink" },
		{ variant: "soft", color: "teal", className: "bg-teal-light text-teal" },
		{ variant: "soft", color: "gray", className: "bg-grey-contrast text-grey-text" },
		{ variant: "soft", color: "blue", className: "bg-blue-france-lighter text-blue-france" },
		{ variant: "outline", color: "info", className: "border-info text-info" },
		{ variant: "outline", color: "success", className: "border-success text-success" },
		{ variant: "outline", color: "warning", className: "border-warning text-warning" },
		{ variant: "outline", color: "error", className: "border-error text-error" },
		{ variant: "outline", color: "yellow", className: "border-yellow text-yellow" },
		{ variant: "outline", color: "purple", className: "border-purple text-purple" },
		{ variant: "outline", color: "pink", className: "border-pink text-pink" },
		{ variant: "outline", color: "teal", className: "border-teal text-teal" },
		{ variant: "outline", color: "gray", className: "border-grey-contrast text-grey-text" },
		{ variant: "outline", color: "blue", className: "border-blue-france text-blue-france" },
	],
	defaultVariants: {
		variant: "soft",
		color: "info",
		size: "md",
	},
});

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;
type BadgeColor = NonNullable<VariantProps<typeof badgeVariants>["color"]>;
type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>["size"]>;

type BadgeProps = useRender.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & {
		startIcon?: ReactNode;
	};

const IconSlot = ({ children }: { children: ReactNode }) => (
	<span
		className="shrink-0"
		aria-hidden="true"
	>
		{children}
	</span>
);

const Badge = ({
	className,
	variant = "soft",
	color = "info",
	size = "md",
	startIcon,
	render,
	...props
}: BadgeProps) => {
	return useRender({
		defaultTagName: "span",
		render,
		props: mergeProps<"span">(
			{ className: cn(badgeVariants({ variant, color, size }), className) },
			{
				...props,
				children: (
					<>
						{startIcon && <IconSlot>{startIcon}</IconSlot>}
						{props.children}
					</>
				),
			},
		),
	});
};

export { Badge };
export type { BadgeProps, BadgeVariant, BadgeColor, BadgeSize };
