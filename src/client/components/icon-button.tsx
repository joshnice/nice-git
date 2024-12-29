import { type ReactNode, type RefObject, useState } from "react";

interface IconButtonProps {
	icon: ReactNode;
	onClick: () => void;
	ref?: RefObject<HTMLButtonElement | null>;
	hoverIcon?: ReactNode;
	className?: string;
}

export function IconButtonComponent({
	icon,
	onClick,
	hoverIcon,
	className,
	ref,
}: IconButtonProps) {
	const [hover, setHover] = useState(false);

	const showHoverIcon = hoverIcon && hover;

	return (
		<button
			ref={ref}
			className={className}
			type="button"
			onClick={onClick}
			onFocus={() => setHover(true)}
			onMouseOver={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{showHoverIcon ? hoverIcon : icon}
		</button>
	);
}
