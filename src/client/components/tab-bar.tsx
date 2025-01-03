import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
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
}: TabBarProps<TTabs>) {
	const handleTabClicked = (tabName: string) => {
		onTabClicked(tabName);
	};

	const containerRef = useRef(null);
	const [numberOfTabs, setNumberOfTabs] = useState(0);

	useEffect(() => {
		if (containerRef.current != null) {
			const resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const width = entry.contentRect.width;
					setNumberOfTabs(Math.floor(width / REPO_TAB_SIZE_PX));
				}
			});
			resizeObserver.observe(containerRef.current);
		}
	}, []);

	const tabsToShow = tabs.slice(0, numberOfTabs);
	const tabsInOverflowMenu = tabs.slice(numberOfTabs);

	return (
		<div ref={containerRef} className="w-full h-8 flex justify-start">
			{tabsToShow.map((tab, index) => (
				<button
					type="button"
					onClick={() => onTabClicked(tab.id)}
					className={`border-2  ${selectedTabId === tab.id ? "bg-red-500" : "bg-white"} h-9 w-48 flex-nowrap overflow-ellipsis overflow-hidden text-lg`}
					key={tab.id}
				>
					{tab.name}
				</button>
			))}
			{tabsInOverflowMenu.length > 0 && (
				<OverFlowMenuComponent
					items={tabsInOverflowMenu}
					onClick={handleTabClicked}
				/>
			)}
		</div>
	);
}
