export function parseStringToJson(content: string | null) {
	if (content == null) {
		return null;
	}

	try {
		const parsedJson = JSON.parse(content);
		return parsedJson;
	} catch (err) {
		return null;
	}
}
