import { type RefObject, useEffect, useRef } from "react";

export function useClickAwayListener(
	refs: RefObject<HTMLElement | null>[],
	callback: () => void,
) {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				refs.length > 0 &&
				event.target != null &&
				refs.every((ref) => !ref?.current?.contains(event.target as Node))
			) {
				callback();
			}
		};
		document.addEventListener("mousedown", handleClick);
		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, [refs, callback]);
}
