export interface Repo {
	id: string;
	name: string;
	location: string;
}

// biome-ignore lint/suspicious/noExplicitAny: Typeguard
export function isRepo(repo: any): repo is Repo {
	const hasId = (repo as Repo).id != null && typeof repo.id === "string";
	const hasName = (repo as Repo).name != null && typeof repo.name === "string";
	const hasLocation =
		(repo as Repo).location != null && typeof repo.name === "string";

	return hasId && hasName && hasLocation;
}
