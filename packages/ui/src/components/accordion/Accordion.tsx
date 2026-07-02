import { Accordion } from "@base-ui/react/accordion";
import { RiArrowDownSLine } from "@remixicon/react";
import { forwardRef, type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";

type AccordionRootProps = ComponentPropsWithRef<typeof Accordion.Root>;

/**
 * Container for accordion items. Manages expand/collapse state.
 *
 * @param multiple - Allow multiple items to be open simultaneously.
 * @param defaultValue - Items open by default (uncontrolled).
 * @param value - Controlled open items.
 * @param onValueChange - Called when open items change.
 */
const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(
  ({ className, ...rest }, ref) => {
    return <Accordion.Root ref={ref} className={className} {...rest} />;
  },
);
AccordionRoot.displayName = "AccordionRoot";

type AccordionItemProps = ComponentPropsWithRef<typeof Accordion.Item>;

/**
 * A single accordion item containing a trigger and collapsible content.
 *
 * @param value - Unique identifier for this item.
 * @param disabled - Prevent interaction with this item.
 */
const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, ...rest }, ref) => {
    return (
      <Accordion.Item
        ref={ref}
        className={cn("border-t border-grey-contrast last:border-b", className)}
        {...rest}
      />
    );
  },
);
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = Omit<ComponentPropsWithRef<"button">, "children"> & {
  children: ReactNode;
};

/**
 * Clickable header that toggles the accordion panel.
 * Renders with DSFR styling: blue-france text, Raleway Medium font, chevron icon.
 */
const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <Accordion.Header className="m-0">
        <Accordion.Trigger
          ref={ref}
          className={cn(
            "flex w-full cursor-pointer items-center gap-4 px-4 py-3",
            "font-raleway text-base font-medium text-blue-france",
            "hover:bg-hover-overlay",
            "bg-transparent border-none text-left",
            "data-panel-open:bg-blue-france-lighter data-panel-open:pb-3",
            className,
          )}
          {...rest}
        >
          <span className="flex-1">{children}</span>
          <RiArrowDownSLine
            size={16}
            aria-hidden
            className="shrink-0 transition-transform duration-200 in-data-panel-open:rotate-180"
          />
        </Accordion.Trigger>
      </Accordion.Header>
    );
  },
);
AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  children: ReactNode;
};

/**
 * Collapsible content panel. Animates open/close using CSS transitions.
 * Content is unmounted when closed by default.
 */
const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <Accordion.Panel
        ref={ref}
        className={cn(
          "h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-in-out",
          "data-starting-style:h-0 data-ending-style:h-0",
          className,
        )}
        {...rest}
      >
        <div className="px-4 pb-4 pt-2">{children}</div>
      </Accordion.Panel>
    );
  },
);
AccordionContent.displayName = "AccordionContent";

export { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent };
export type {
  AccordionRootProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
};
