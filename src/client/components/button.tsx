import type { PropsWithChildren } from "react";

interface ButtonProps {
	onClick: () => void;
}

export function ButtonComponent({
	onClick,
	children,
}: PropsWithChildren<ButtonProps>) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="w-28 pt-2 pb-2 border-zinc-600 border-2 rounded"
		>
			{children}
		</button>
	);
}
