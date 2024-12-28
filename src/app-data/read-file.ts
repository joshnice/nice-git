import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { app } from "electron";

export async function readUserFile(fileName: string): Promise<string | null> {
	const pathToUserData = app.getPath("userData");
    const filePath = `${pathToUserData}/${fileName}`;
    if (existsSync(filePath)) {
        const file = await readFile(`${pathToUserData}/${fileName}`, { encoding: "utf8" });
        return file;
    }
    return null;
}
