import { ReactNode } from "react";
import { cn } from "../utils";

type BadgeProps = {
	children: ReactNode;
	className?: string;
};
export const Badge = ({ children, className }: BadgeProps) => {
	return (
		<div
			className={cn(
				"bg-camb-primary-500 rounded-full w-fit py-2 px-3",
				className
			)}>
			{children}
		</div>
	);
};
