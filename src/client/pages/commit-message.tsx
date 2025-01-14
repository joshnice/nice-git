import { type ChangeEvent, useState } from "react";

export function CommitMessageComponent() {
	const [commitMessage, setCommitMessage] = useState("");

	const handleCommitMessageChange = (
		event: ChangeEvent<HTMLTextAreaElement>,
	) => {
		if (event.target.value != null && typeof event.target.value === "string") {
			setCommitMessage(event.target.value);
		}
	};

	return (
		<div className="flex gap-3">
			<textarea
				value={commitMessage}
				onChange={handleCommitMessageChange}
				className="border-solid border-black border w-2/3 resize-none"
				rows={2}
			/>
			<button type="button">Commit & Push</button>
		</div>
	);
}
