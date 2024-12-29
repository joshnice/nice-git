import { useEffect } from "react";

export function useWindowSizeChange(onWindowSizeChange: () => void) {
	// biome-ignore lint/correctness/useExhaustiveDependencies: Gets called on every render if onWindowSizeChange is in deps array
	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			onWindowSizeChange();
		});
		resizeObserver.observe(document.body);
		return () => {
			resizeObserver.disconnect();
		};
	}, []);
}
