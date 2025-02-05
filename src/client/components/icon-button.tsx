import { type ReactNode, type RefObject, useState } from "react";

interface IconButtonProps {
	icon: ReactNode;
	onClick: () => void;
	ref?: RefObject<HTMLButtonElement | null>;
	className?: string;
}

export function IconButtonComponent({
	icon,
	onClick,
	className,
	ref,
}: IconButtonProps) {
	return (
		<button
			ref={ref}
			className="text-zinc-400 hover:text-zinc-200"
			type="button"
			onClick={onClick}
		>
			{icon}
		</button>
	);
}
