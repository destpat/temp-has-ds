import { Button as BaseButton } from "@base-ui/react/button";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "../../lib/cn";
import { Spinner } from "../spinner";

const buttonVariants = cva(
	[
		"inline-flex cursor-pointer items-center justify-center border",
		"font-medium font-raleway transition-colors",
		"focus-visible:outline-2 focus-visible:outline-blue-france focus-visible:outline-offset-2",
		"active:brightness-95",
		"data-disabled:pointer-events-none data-disabled:opacity-50",
	],
	{
		variants: {
			variant: {
				default: "border-transparent",
				outline: "bg-transparent",
				ghost: "border-transparent bg-transparent",
				link: "border-transparent bg-transparent no-underline underline-offset-4 hover:underline",
			},
			color: {
				primary: "",
				error: "",
			},
			size: {
				sm: "gap-1.5 px-3 py-1 text-sm leading-5 [&_svg]:size-4",
				md: "gap-2 px-4 py-2 text-base leading-6 [&_svg]:size-5",
				lg: "gap-2 px-6 py-2.5 text-lg leading-7 [&_svg]:size-6",
				icon: "size-10 [&_svg]:size-5",
			},
		},
		compoundVariants: [
			{
				variant: "default",
				color: "primary",
				className: "bg-blue-france text-blue-france-contrast hover:bg-blue-france-hover",
			},
			{
				variant: "default",
				color: "error",
				className: "bg-error text-white hover:bg-error/80",
			},
			{
				variant: "outline",
				color: "primary",
				className: "border-blue-france text-blue-france hover:bg-blue-france-lighter",
			},
			{
				variant: "outline",
				color: "error",
				className: "border-error text-error hover:bg-error/10",
			},
			{
				variant: "ghost",
				color: "primary",
				className: "text-blue-france hover:bg-hover-overlay",
			},
			{
				variant: "ghost",
				color: "error",
				className: "text-error hover:bg-hover-overlay",
			},
			{ variant: "link", color: "primary", className: "text-blue-france" },
			{ variant: "link", color: "error", className: "text-error" },
		],
		defaultVariants: {
			variant: "default",
			color: "primary",
			size: "md",
		},
	},
);

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
type ButtonColor = NonNullable<VariantProps<typeof buttonVariants>["color"]>;
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

type ButtonProps = ComponentPropsWithRef<typeof BaseButton> &
	VariantProps<typeof buttonVariants> & {
		startIcon?: ReactNode;
		endIcon?: ReactNode;
		loading?: boolean;
		fullWidth?: boolean;
	};

const IconSlot = ({ children }: { children: ReactNode }) => (
	<span
		className="shrink-0"
		aria-hidden="true"
	>
		{children}
	</span>
);

const Button = ({
	variant,
	color,
	size,
	startIcon,
	endIcon,
	loading = false,
	fullWidth = false,
	disabled,
	className,
	children,
	ref,
	...rest
}: ButtonProps) => {
	const leadingIcon = loading ? <Spinner /> : startIcon;

	return (
		<BaseButton
			ref={ref}
			disabled={disabled || loading}
			aria-busy={loading || undefined}
			className={cn(buttonVariants({ variant, color, size }), fullWidth && "w-full", className)}
			{...rest}
		>
			{leadingIcon && <IconSlot>{leadingIcon}</IconSlot>}
			{children}
			{endIcon && <IconSlot>{endIcon}</IconSlot>}
		</BaseButton>
	);
};

export { Button, buttonVariants };
export type { ButtonProps, ButtonVariant, ButtonColor, ButtonSize };
