import { Context } from "@/lib/interface"

interface PreviewCreateContextProps {
    context: Context
}

export const PreviewCreateContext: React.FC<PreviewCreateContextProps> = ({ context }) => {
    return (
        <code>
            Allow access if {context.entity} {context.operator}{' '}
            {context.operator === 'BETWEEN'
                ? `${context.timeValue1} and ${context.timeValue2}`
                : context.textValue}
        </code>
    )
}