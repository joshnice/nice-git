import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { IconButtonComponent } from "./icon-button";
import { OverFlowMenuComponent } from "./overflow-menu";

interface BaseTabs {
	id: string;
	name: string;
}

interface TabBarProps<TTabs extends BaseTabs> {
	tabs: TTabs[];
	selectedTabId: string;
	onTabClicked: (tabId: string) => void;
}

const REPO_TAB_SIZE_PX = 192;

export function TabBarComponent<TTabs extends BaseTabs>({
	tabs,
	selectedTabId,
	onTabClicked,
	children,
}: PropsWithChildren<TabBarProps<TTabs>>) {
	const handleTabClicked = (tabName: string) => {
		onTabClicked(tabName);
	};

	const containerRef = useRef(null);
	const [numberOfTabs, setNumberOfTabs] = useState(0);

	useEffect(() => {
		if (containerRef.current != null) {
			const resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const width = entry.contentRect.width - 135;
					setNumberOfTabs(Math.floor(width / REPO_TAB_SIZE_PX));
				}
			});
			resizeObserver.observe(containerRef.current);
		}
	}, []);

	const tabsToShow = tabs.slice(0, numberOfTabs);
	const tabsInOverflowMenu = tabs.slice(numberOfTabs);

	return (
		<div
			ref={containerRef}
			className="w-full bg-zinc-800 flex justify-between p-2 rounded"
		>
			<div className="flex gap-2 justify-start">
				{tabsToShow.map((tab, index) => (
					<button
						type="button"
						onClick={() => onTabClicked(tab.id)}
						className={`rounded border-2 border-zinc-700 ${selectedTabId === tab.id ? "bg-zinc-500 font-bold" : "bg-zinc-800"} h-9 w-48 flex-nowrap overflow-ellipsis overflow-hidden text-lg`}
						key={tab.id}
					>
						{tab.name}
					</button>
				))}
			</div>
			<div className="flex center justify-end gap-2">
				{tabsInOverflowMenu.length > 0 && (
					<OverFlowMenuComponent
						items={tabsInOverflowMenu}
						onClick={handleTabClicked}
					/>
				)}
				{children}
			</div>
		</div>
	);
}
