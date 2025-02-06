import type { FSWatcher } from "node:fs";
import { lstat, readdir } from "node:fs/promises";
import { RepoDataStore } from "../data-store/repos/repo-data-store";
import { watchDirChanges } from "../node/watch";

const directoryNamesToIgnore = [".git", "node_modules"];

class _RepoWatch {
	private watchers: FSWatcher[] = [];

	public async setRepo(repoId: string | null, action: () => void) {
		if (repoId == null) {
			return;
		}

		const repo = await RepoDataStore.get(repoId);

		if (repo == null) {
			throw new Error(`Repo with id ${repoId} can't be found`);
		}

		const directories = await readdir(repo.location);

		// biome-ignore lint/complexity/noForEach: Remove in config
		this.watchers.forEach((watcher) => {
			watcher.close();
		});

		for (const dir of directories) {
			if (!directoryNamesToIgnore.includes(dir)) {
				const dirPath = `${repo.location}/${dir}`;
				const resource = await lstat(dirPath);
				this.watchers.push(watchDirChanges(dirPath, action));
			}
		}

		this.watchers = directories.flatMap((dir) => {
			return [];
		});
	}
}

export const RepoWatch = new _RepoWatch();
