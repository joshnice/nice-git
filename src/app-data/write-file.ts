import { writeFile } from "node:fs/promises";
import { app } from "electron";
import { readUserFile } from "./read-file";

export async function addToUserFile(
	fileName: string,
	newContent: string,
): Promise<void> {
	const path = app.getPath("userData");
	let fileContents = await readUserFile(fileName);
	if (fileContents == null) {
		fileContents = newContent;
	} else {
		fileContents += newContent;
	}
	await writeFile(`${path}/${fileName}`, fileContents);
}

export async function overwriteFile(
	fileName: string,
	newContent: string,
): Promise<void> {
	const path = app.getPath("userData");
	const file = await writeFile(`${path}/${fileName}`, newContent);
	return file;
}
