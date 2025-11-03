'use client'

import * as React from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"

type Props = {
    onChange: (value: string) => void
}

const timeRanges = [
    "Today",
    "Yesterday",
    "This Week",
    "This Month",
    "Custom Range",
]

const DateRangeSelector: React.FC<Props> = ({ onChange }) => {
    const [selected, setSelected] = React.useState("Today")

    const handleChange = (value: string) => {
        setSelected(value)
        onChange(value)
    }

    return (
        <div className="w-full max-w-xs">
            <Select value={selected} onValueChange={handleChange}>
                <SelectTrigger className="w-full">
                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-600" />
                    <SelectValue placeholder="Select Date Range" />
                </SelectTrigger>
                <SelectContent>
                    {timeRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                            {range}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default DateRangeSelector