import { randomUUID } from "node:crypto";
import { executeCommand } from "../node/cli";
import {
	type BranchChanges,
	type FileChange,
	FileChangeType,
} from "../types/branch-changes";

// Changes
/*
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   global.d.ts
	modified:   src/client/pages/branch-commits.tsx
	modified:   src/client/pages/branches-selector.tsx
	modified:   src/client/pages/home-page.tsx
	modified:   src/client/pages/repo-selector.tsx
	deleted:    src/client/state/git/branch-commits.ts
	deleted:    src/client/state/repos/repo-branches.ts
	deleted:    src/client/state/repos/selected-branch.ts
	modified:   src/main.ts
	modified:   src/preload.ts

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	src/client/components/header.tsx
	src/client/pages/branch-changes.tsx
	src/client/state/branches/
	src/client/state/commits/
	src/git/git-status.ts
	src/types/branch-changes.ts

no changes added to commit (use "git add" and/or "git commit -a")
 */

// No changes
/*
 nothing to commit, working tree cleans
 */

export async function getGitStatus(
	repoLocation: string,
): Promise<BranchChanges> {
	try {
		const statusOutput = await executeCommand<string>(
			`cd ${repoLocation} && git status`,
		);
		return parseGitStatus(statusOutput);
	} catch (err) {
		console.error("Could not get modified files");
		return { stagedChanges: [], unstagedChanges: [] };
	}
}

const STAGED_FILES_HEADER = "Changes to be committed:" as const;
const MODIFIED_DELETED_FILES_HEADER = "Changes not staged for commit:" as const;
const NEW_FILES_HEADER = "Untracked files:" as const;

type Section =
	| typeof STAGED_FILES_HEADER
	| typeof MODIFIED_DELETED_FILES_HEADER
	| typeof NEW_FILES_HEADER;

function parseGitStatus(gitStatusOutput: string): BranchChanges {
	const spiltByNewLine = gitStatusOutput.split("\n");

	const stagedChanges: FileChange[] = getFileChanges(
		STAGED_FILES_HEADER,
		spiltByNewLine,
	).map((change) => ({
		id: randomUUID(),
		fileName: getFileName(change),
		type: getFileChangeType(change),
	}));

	const unstagedModified = getFileChanges(
		MODIFIED_DELETED_FILES_HEADER,
		spiltByNewLine,
	).map((change) => ({
		id: randomUUID(),
		fileName: getFileName(change),
		type: getFileChangeType(change),
	}));

	const newFiles = getFileChanges(NEW_FILES_HEADER, spiltByNewLine).map(
		(change) => ({
			id: randomUUID(),
			fileName: getFileName(change),
			type: FileChangeType.Added,
		}),
	);

	const unstagedChanges = [...unstagedModified, ...newFiles];
	return { stagedChanges, unstagedChanges };
}

function getFileChanges(section: Section, gitStatusSpiltByNewLine: string[]) {
	const stagedFilesTopCutOff = gitStatusSpiltByNewLine.slice(
		gitStatusSpiltByNewLine.indexOf(section),
	);
	const stagedFilesBottomCutOff = stagedFilesTopCutOff.slice(
		0,
		stagedFilesTopCutOff.indexOf(""),
	);

	return stagedFilesBottomCutOff.flatMap((stagedFile) => {
		if (stagedFile.includes("\t")) {
			return [stagedFile.replace("\t", "")];
		}
		return [];
	});
}

function getFileChangeType(modifiedString: string): FileChangeType {
	const spiltModifiedString = modifiedString.split(":");
	const action = spiltModifiedString[0];

	switch (action) {
		case "modified":
			return FileChangeType.Modified;
		case "deleted":
			return FileChangeType.Deleted;
		case "new file":
			return FileChangeType.Added;
		default:
			throw new Error(`Do not recongise action ${action}`);
	}
}
const actionsToRemove = [];

function getFileName(modifiedString: string) {
	let actionRemoved = modifiedString.replace("modified:", "");
	actionRemoved = actionRemoved.replace("deleted:", "");
	actionRemoved = actionRemoved.replace("new file:", "");
	return actionRemoved.trim();
}
