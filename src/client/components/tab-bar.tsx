import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { IconButtonComponent } from "./icon-button";
import { OverFlowMenuComponent } from "./overflow-menu";

interface TabBarProps {
	tabs: string[];
	selectedTab: string;
	onTabClicked: (tabName: string) => void;
}

const REPO_TAB_SIZE_PX = 192;

export function TabBarComponent({
	tabs,
	selectedTab,
	onTabClicked,
}: TabBarProps) {
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
					onClick={() => onTabClicked(tab)}
					className={`border-2  ${selectedTab === tab ? "bg-red-500" : "bg-white"} h-9 w-48 flex-nowrap overflow-ellipsis overflow-hidden text-lg`}
					key={tab}
				>
					{tab}
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
