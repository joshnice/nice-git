interface TitleProps {
	content: string;
}

export function TitleComponent({ content }: TitleProps) {
	return <h1 className="text-2xl">{content}</h1>;
}

export function SubTitleComponent({ content }: TitleProps) {
	return <h2 className="text-xl">{content}</h2>;
}
