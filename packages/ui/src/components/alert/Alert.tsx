import { RiAlertFill, RiCheckboxCircleFill, RiCloseCircleFill, RiCloseLine, RiInformationFill } from "@remixicon/react";
import { type VariantProps, cva } from "class-variance-authority";
import { type ComponentPropsWithRef, type ReactNode, useState } from "react";
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
			md: "flex-col gap-1 px-4 py-4",
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
	variant: AlertVariant;
	size?: AlertSize;
	title?: string;
	children?: ReactNode;
	closable?: boolean;
	onClose?: () => void;
};

const Alert = ({ variant, size = "md", title, children, closable, onClose, className, ref, ...rest }: AlertProps) => {
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
				<Icon
					size={24}
					className="text-white"
					aria-hidden
				/>
			</div>

			<div className={alertContentVariants({ size })}>
				{showTitle && title && <p className="font-bold font-raleway text-grey-title text-xl leading-7">{title}</p>}
				{children && <div className="font-raleway text-base text-grey-title leading-6">{children}</div>}
			</div>

			{showCloseButton && (
				<button
					type="button"
					onClick={handleClose}
					aria-label="Fermer l'alerte"
					className="flex shrink-0 cursor-pointer items-start border-none bg-transparent p-2 text-grey-text hover:text-grey-title"
				>
					<RiCloseLine
						size={16}
						aria-hidden
					/>
				</button>
			)}
		</div>
	);
};

export { Alert };
export type { AlertProps, AlertVariant, AlertSize };
