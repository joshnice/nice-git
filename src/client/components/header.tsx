interface TitleProps {
	content: string;
	className?: string;
}

export function TitleComponent({ content, className }: TitleProps) {
	return <h1 className={`text-2xl ${className}`}>{content}</h1>;
}

export function SubTitleComponent({ content }: TitleProps) {
	return <h2 className="text-xl">{content}</h2>;
}
