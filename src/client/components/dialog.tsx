import type { PropsWithChildren } from "react";

type DialogProps = {
	open: boolean;
};

export function DialogComponent({
	open,
	children,
}: PropsWithChildren<DialogProps>) {
	return (
		<dialog
			open={open}
			className="bg-zinc-800 border-zinc-600 border-4 text-white p-5 rounded top-1/3"
		>
			{children}
		</dialog>
	);
}
