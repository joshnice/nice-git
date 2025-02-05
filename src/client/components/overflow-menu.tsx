import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type RefObject, useEffect, useRef, useState } from "react";
import { useClickAwayListener } from "../hooks/use-click-away-listener";
import { useWindowSizeChange } from "../hooks/use-window-size-change";
import { IconButtonComponent } from "./icon-button";

interface BaseItem {
	id: string;
	name: string;
}

interface OverFlowMenuProps<TItem extends BaseItem> {
	items: TItem[];
	onClick: (item: string) => void;
}

export function OverFlowMenuComponent<TItem extends BaseItem>({
	items,
	onClick,
}: OverFlowMenuProps<TItem>) {
	const [showOverFlowMenu, setShowOverFlowMenu] = useState(false);
	const [position, setPosition] = useState<{
		left: number;
		top: number;
	} | null>(null);

	const buttonRef = useRef<HTMLButtonElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const closeOverFlowMenu = () => {
		setShowOverFlowMenu(false);
	};

	useClickAwayListener([buttonRef, containerRef], closeOverFlowMenu);

	useWindowSizeChange(closeOverFlowMenu);

	useEffect(() => {
		if (showOverFlowMenu) {
			const buttonPosition = buttonRef?.current?.getBoundingClientRect();
			if (buttonPosition != null) {
				const top = buttonPosition.top + buttonPosition.height + 10;
				const left = buttonPosition.left - 160;
				setPosition({ top, left });
			}
		}
	}, [showOverFlowMenu]);

	return (
		<>
			<IconButtonComponent
				ref={buttonRef}
				className="ml-3"
				onClick={() => setShowOverFlowMenu(!showOverFlowMenu)}
				icon={
					<FontAwesomeIcon icon={["fas", "chevron-circle-down"]} size="2xl" />
				}
			/>
			{showOverFlowMenu && position && (
				<div
					ref={containerRef}
					style={{ top: `${position.top}px`, left: `${position.left}px` }}
					className="absolute w-60 bg-zinc-800  drop-shadow-lg p-2 flex flex-col gap-1 rounded-md border-2 border-gray-300"
				>
					{items.map((item) => (
						<button
							className="overflow-hidden whitespace-nowrap overflow-ellipsis w-full text-left hover:bg-zinc-700 p-2 rounded"
							key={item.id}
							onClick={() => onClick(item.id)}
							type="button"
						>
							{item.name}
						</button>
					))}
				</div>
			)}
		</>
	);
}
