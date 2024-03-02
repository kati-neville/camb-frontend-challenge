import { ReactNode } from "react";
import { cn } from "../utils";

type ButtonProps = {
	variant?: "primary" | "icon";
	children: ReactNode;
	onClick?: () => void;
	className?: string;
	title?: string;
};

export const Button = ({
	title,
	children,
	onClick,
	className,
}: ButtonProps) => {
	return (
		<button
			title={title}
			className={cn(
				"rounded-full w-12 h-12 flex items-center justify-center bg-camb-white",
				className
			)}
			onClick={onClick}>
			{children}
		</button>
	);
};
