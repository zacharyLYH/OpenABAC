"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface SelectComponentProps {
    options: string[]
    container: (value: string) => void
    disabled?: boolean
}

export function SelectComponent({ options, container, disabled = false }: SelectComponentProps) {

    return (
        <Select onValueChange={(value) => container(value)}>
            <SelectTrigger className="max-w-40 my-2" disabled={disabled}>
                <SelectValue placeholder={`Select...`} />
            </SelectTrigger>
            <SelectContent>
                {options.map((op) => (
                    <SelectItem key={op} value={op}>{op}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
