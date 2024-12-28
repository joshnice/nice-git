import { type ReactNode, useState } from "react";

interface IconButtonProps {
	icon: ReactNode;
	onClick: () => void;
	hoverIcon?: ReactNode;
}

export function IconButtonComponent({
	icon,
	onClick,
	hoverIcon,
}: IconButtonProps) {
	const [hover, setHover] = useState(false);

	const showHoverIcon = hoverIcon && hover;

	return (
		<button
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
