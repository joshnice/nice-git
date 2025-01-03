import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { isRepoLocationFailure } from "../../types/repo-location-types";
import { TabBarComponent } from "../components/tab-bar";
import {
	repoStore,
	useRepoLocationError,
	useSelectedRepo,
} from "../state/repos/repo-store";
import { useRepos } from "../state/repos/repos";
import { BranchCommitsComponent } from "./branch-commits";
import { BranchesSelectorComponent } from "./branches-selector";
import { RepoSelectorComponent } from "./repo-selector";

export function HomePage() {
	return (
		<div className="p-5 flex flex-col gap-2 overflow-hidden">
			<h1 className="text-3xl font-bold underline">Nice git</h1>
			<RepoSelectorComponent />
			<div className="flex gap-4   ">
				<div className="w-1/4 flex flex-col">
					<BranchesSelectorComponent />
				</div>
				<div className="w-3/4">
					<BranchCommitsComponent />
				</div>
			</div>
		</div>
	);
}
