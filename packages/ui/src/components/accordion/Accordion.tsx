import { Accordion } from "@base-ui/react/accordion";
import { RiArrowDownSLine } from "@remixicon/react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "../../lib/cn";

type AccordionRootProps = ComponentPropsWithRef<typeof Accordion.Root>;

const AccordionRoot = ({ className, ref, ...rest }: AccordionRootProps) => {
	return (
		<Accordion.Root
			ref={ref}
			className={className}
			{...rest}
		/>
	);
};

type AccordionItemProps = ComponentPropsWithRef<typeof Accordion.Item>;

const AccordionItem = ({ className, ref, ...rest }: AccordionItemProps) => {
	return (
		<Accordion.Item
			ref={ref}
			className={cn("border-grey-contrast border-t last:border-b", className)}
			{...rest}
		/>
	);
};

type AccordionTriggerProps = Omit<ComponentPropsWithRef<"button">, "children"> & {
	children: ReactNode;
};

const AccordionTrigger = ({ children, className, ref, ...rest }: AccordionTriggerProps) => {
	return (
		<Accordion.Header className="m-0">
			<Accordion.Trigger
				ref={ref}
				className={cn(
					"flex w-full cursor-pointer items-center gap-4 px-4 py-3 font-medium font-raleway text-base text-blue-franc hover:bg-hover-overlay",
					"border-none bg-transparent text-left",
					"data-panel-open:bg-blue-france-lighter data-panel-open:pb-3",
					className,
				)}
				{...rest}
			>
				<span className="flex-1">{children}</span>
				<RiArrowDownSLine
					size={16}
					aria-hidden
					className="shrink-0 in-data-panel-open:rotate-180 transition-transform duration-200"
				/>
			</Accordion.Trigger>
		</Accordion.Header>
	);
};

type AccordionContentProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
	children: ReactNode;
};

const AccordionContent = ({ children, className, ref, ...rest }: AccordionContentProps) => {
	return (
		<Accordion.Panel
			ref={ref}
			className={cn(
				"h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-in-out",
				"data-ending-style:h-0 data-starting-style:h-0",
				className,
			)}
			{...rest}
		>
			<div className="px-4 pt-2 pb-4">{children}</div>
		</Accordion.Panel>
	);
};

export { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent };
export type { AccordionRootProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps };
