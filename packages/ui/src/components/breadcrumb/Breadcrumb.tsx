import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { RiArrowRightSLine, RiMoreFill } from "@remixicon/react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "../../lib/cn";

type BreadcrumbProps = ComponentPropsWithRef<"nav">;

const Breadcrumb = ({ className, ref, ...rest }: BreadcrumbProps) => (
	<nav
		ref={ref}
		aria-label="Fil d'Ariane"
		className={cn(className)}
		{...rest}
	/>
);

type BreadcrumbListProps = ComponentPropsWithRef<"ol">;

const BreadcrumbList = ({ className, ref, ...rest }: BreadcrumbListProps) => (
	<ol
		ref={ref}
		className={cn("flex flex-wrap items-center gap-1", className)}
		{...rest}
	/>
);

type BreadcrumbItemProps = ComponentPropsWithRef<"li">;

const BreadcrumbItem = ({ className, ref, ...rest }: BreadcrumbItemProps) => (
	<li
		ref={ref}
		className={cn("inline-flex items-center", className)}
		{...rest}
	/>
);

type BreadcrumbLinkProps = useRender.ComponentProps<"a">;

const BreadcrumbLink = ({ className, render, ...props }: BreadcrumbLinkProps) => {
	return useRender({
		defaultTagName: "a",
		render,
		props: mergeProps<"a">(
			{
				className: cn(
					"text-grey-text text-xs leading-5 underline underline-offset-2 transition-colors hover:text-grey-title",
					className,
				),
			},
			props,
		),
	});
};

type BreadcrumbPageProps = ComponentPropsWithRef<"span">;

const BreadcrumbPage = ({ className, ref, ...rest }: BreadcrumbPageProps) => (
	<span
		ref={ref}
		aria-current="page"
		className={cn("text-grey-title text-xs leading-5", className)}
		{...rest}
	/>
);

type BreadcrumbSeparatorProps = ComponentPropsWithRef<"li">;

const BreadcrumbSeparator = ({ className, ref, ...rest }: BreadcrumbSeparatorProps) => (
	<li
		ref={ref}
		role="presentation"
		aria-hidden="true"
		className={cn("flex items-center text-grey-text [&>svg]:size-4", className)}
		{...rest}
	>
		<RiArrowRightSLine className="size-4" />
	</li>
);

type BreadcrumbEllipsisProps = ComponentPropsWithRef<"span">;

const BreadcrumbEllipsis = ({ className, ref, ...rest }: BreadcrumbEllipsisProps) => (
	<span
		ref={ref}
		role="presentation"
		aria-hidden="true"
		className={cn("flex size-4 items-center justify-center text-grey-text", className)}
		{...rest}
	>
		<RiMoreFill className="size-4" />
		<span className="sr-only">Plus de pages</span>
	</span>
);

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
};
export type {
	BreadcrumbProps,
	BreadcrumbListProps,
	BreadcrumbItemProps,
	BreadcrumbLinkProps,
	BreadcrumbPageProps,
	BreadcrumbSeparatorProps,
	BreadcrumbEllipsisProps,
};
