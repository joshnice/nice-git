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
		<div className="h-screen w-screen p-5 flex flex-col gap-2 overflow-hidden">
			<RepoSelectorComponent />
			<div className="flex gap-4 flex-grow flex-shrink h-[calc(100%-82px)]">
				<div className="w-1/3">
					<BranchesSelectorComponent />
				</div>
				<div className="flex flex-col gap-3 w-2/3">
					<div className="flex-shrink-0 flex-grow-0">
						<RepoTitleComponent />
					</div>
					<div className="overflow-hidden basis-1/2 flex-grow flex-shrink">
						<BranchCommitsComponent />
					</div>
					<div className="overflow-hidden basis-1/2 flex-grow flex-shrink">
						<BranchChangesComponent />
					</div>
					<div className="flex-shrink-0 flex-grow-0">
						<CommitMessageComponent />
					</div>
				</div>
			</div>
		</div>
	);
}
