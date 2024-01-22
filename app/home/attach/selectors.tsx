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
    placeholder: string
}

export function SelectComponent({ options, container, disabled = false, placeholder }: SelectComponentProps) {
    return (
        <Select onValueChange={(value) => container(value)}>
            <SelectTrigger className="w-40" disabled={disabled}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((op) => (
                    <SelectItem key={op} value={op}>{op}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
