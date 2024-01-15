interface TextBubbleProps {
    text: string;
}

export const TextBubble: React.FC<TextBubbleProps> = ({ text }) => {
    return (
        <div className="flex-1 min-w-0 mx-4">
            <div className="border border-white px-4 relative rounded">
                <span className="block text-sm sm:inline">{text}</span>
            </div>
        </div>
    );
};
