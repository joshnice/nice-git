import type { ChangeEvent } from "react";

interface SearchBarProps {
	value: string;
	onChange: (searchString: string) => void;
}

export function SearchBarComponent({ value, onChange }: SearchBarProps) {
	const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
		const searchString = event.target.value;
		onChange(searchString);
	};

	return (
		<input
			className="bg-zinc-800 p-2 border-2 border-zinc-500 rounded"
			type="text"
			value={value}
			placeholder="Search"
			onChange={handleSearchInput}
		/>
	);
}
