import { cva, type VariantProps } from "class-variance-authority";
import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiCloseLine,
  RiInformationFill,
} from "@remixicon/react";
import {
  forwardRef,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

const alertVariants = cva("flex border", {
  variants: {
    variant: {
      info: "border-info",
      success: "border-success",
      warning: "border-warning",
      error: "border-error",
    },
  },
});

const alertBarVariants = cva("flex shrink-0 self-stretch", {
  variants: {
    variant: {
      info: "bg-info",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-error",
    },
    size: {
      md: "items-start px-2 pt-4 pb-2",
      sm: "items-start justify-center p-2",
    },
  },
});

const alertContentVariants = cva("flex min-w-0 flex-1", {
  variants: {
    size: {
      md: "flex-col gap-1 py-4 px-4",
      sm: "items-start p-2",
    },
  },
});

const ICONS = {
  info: RiInformationFill,
  success: RiCheckboxCircleFill,
  warning: RiAlertFill,
  error: RiCloseCircleFill,
} as const;

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>["variant"]>;

type AlertSize = NonNullable<VariantProps<typeof alertBarVariants>["size"]>;

type AlertProps = Omit<ComponentPropsWithRef<"div">, "title"> & {
  /** Visual style of the alert. */
  variant: AlertVariant;
  /** Size of the alert. MD has title + description, SM has description only. */
  size?: AlertSize;
  /** Bold heading displayed at the top. Only visible in MD size. */
  title?: string;
  /** Body text. In SM size this is the primary content. */
  children?: ReactNode;
  /** Uncontrolled: renders a close button, the alert hides itself on click. */
  closable?: boolean;
  /** Controlled: called when the close button is clicked. The consumer manages visibility. */
  onClose?: () => void;
};

/**
 * Alert component following DSFR guidelines.
 *
 * Draws attention to contextual information without interrupting the user's flow.
 * 4 variants: error, warning, info, success.
 * 2 sizes: md (title + description) and sm (description only, compact).
 *
 * @example
 * ```tsx
 * // Uncontrolled: hides itself
 * <Alert variant="info" title="Information" closable>
 *   Description text here.
 * </Alert>
 *
 * // Controlled: consumer manages visibility
 * <Alert variant="error" title="Erreur" onClose={() => setVisible(false)}>
 *   Something went wrong.
 * </Alert>
 * ```
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant,
      size = "md",
      title,
      children,
      closable,
      onClose,
      className,
      ...rest
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(true);
    const Icon = ICONS[variant];
    const showTitle = size === "md";
    const showCloseButton = closable || onClose;

    if (!visible) return null;

    const handleClose = () => {
      onClose?.();
      if (!onClose) {
        setVisible(false);
      }
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...rest}
      >
        <div className={alertBarVariants({ variant, size })}>
          <Icon size={24} className="text-white" aria-hidden />
        </div>

        <div className={alertContentVariants({ size })}>
          {showTitle && title && (
            <p className="font-raleway text-xl font-bold leading-7 text-grey-title">
              {title}
            </p>
          )}
          {children && (
            <div className="font-raleway text-base leading-6 text-grey-title">
              {children}
            </div>
          )}
        </div>

        {showCloseButton && (
          <button
            type="button"
            onClick={handleClose}
            aria-label="Fermer l'alerte"
            className="flex shrink-0 cursor-pointer items-start border-none bg-transparent p-2 text-grey-text hover:text-grey-title"
          >
            <RiCloseLine size={16} aria-hidden />
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = "Alert";

export { Alert };
export type { AlertProps, AlertVariant, AlertSize };
