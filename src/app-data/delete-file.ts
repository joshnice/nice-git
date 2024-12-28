import { existsSync } from "node:fs";
import { readFile, rm } from "node:fs/promises";
import { app } from "electron";

export async function deleteUserFile(fileName: string): Promise<string | null> {
	const pathToUserData = app.getPath("userData");
	const filePath = `${pathToUserData}/${fileName}`;
	if (existsSync(filePath)) {
		rm(filePath);
	}
	return null;
}
