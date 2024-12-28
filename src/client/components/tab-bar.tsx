import { useState } from "react";

interface TabBarProps {
	tabs: string[];
	selectedTab: string;
	onTabClicked: (tabName: string) => void;
}

export function TabBarComponent({
	tabs,
	selectedTab,
	onTabClicked,
}: TabBarProps) {
	const handleTabClicked = (tabName: string) => {
		onTabClicked(tabName);
	};

	return (
		<div className="w-full h-8 flex justify-start">
			{tabs.map((tab) => (
				<button
					type="button"
					onClick={() => onTabClicked(tab)}
					className={`border-2  ${selectedTab === tab ? "bg-red-500" : "bg-white"}`}
					key={tab}
				>
					{tab}
				</button>
			))}
		</div>
	);
}
