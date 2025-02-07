import type { ChangeEvent } from "react";

interface TextInputProps {
	value: string;
	placeholder: string;
	onChange: (searchString: string) => void;
}

export function TextInputComponent({
	value,
	placeholder,
	onChange,
}: TextInputProps) {
	const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
		const updatedValue = event.target.value;
		onChange(updatedValue);
	};

	return (
		<input
			className="bg-zinc-800 p-2 border-2 border-zinc-500 rounded"
			type="text"
			value={value}
			placeholder={placeholder}
			onChange={handleSearchInput}
		/>
	);
}
