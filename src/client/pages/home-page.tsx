import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { isRepoLocationFailure } from "../../types/repo-location-types";
import { TitleComponent } from "../components/header";
import { TabBarComponent } from "../components/tab-bar";
import { repoStore, useRepoLocationError } from "../state/repos/repo-store";
import { useRepos } from "../state/repos/repos";
import { BranchChangesComponent } from "./branch-changes";
import { BranchCommitsComponent } from "./branch-commits";
import { BranchesSelectorComponent } from "./branches-selector";
import { CommitMessageComponent } from "./commit-message";
import { RepoSelectorComponent } from "./repo-selector";
import { RepoTitleComponent } from "./repo-title-component";

export function HomePage() {
	return (
		<div className="h-full w-full p-5 flex flex-col gap-2 overflow-hidden">
			<h1 className="text-3xl font-bold underline">Nice git</h1>
			<RepoSelectorComponent />
			<div className="flex gap-4 flex-grow">
				<div className="w-1/3">
					<BranchesSelectorComponent />
				</div>
				<div className="flex flex-col gap-3 w-2/3">
					<RepoTitleComponent />
					<div className="h-1/2 overflow-hidden">
						<BranchCommitsComponent />
					</div>
					<div className="h-1/2 overflow-hidden">
						<BranchChangesComponent />
					</div>
					<div>
						<CommitMessageComponent />
					</div>
				</div>
			</div>
		</div>
	);
}
