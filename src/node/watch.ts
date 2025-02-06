import { type FSWatcher, watch, watchFile } from "node:fs";

export function watchDirChanges(
	filePath: string,
	callback: () => void,
): FSWatcher {
	const watcher = watch(filePath, { recursive: true }, () => {
		callback();
	});
	return watcher;
}
