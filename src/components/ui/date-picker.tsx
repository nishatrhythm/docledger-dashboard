"use client"

import * as React from "react"
import { MdCalendarToday } from "react-icons/md"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useLanguage } from "@/contexts/LanguageContext"

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}

export function DatePicker({
  date,
  onDateChange,
  placeholder,
  className
}: DatePickerProps) {
  const { t, formatDate, language } = useLanguage()
  const [open, setOpen] = React.useState(false)
  
  // Default to today's date if no date is provided
  const currentDate = new Date()
  const defaultMonth = date || currentDate
  
  // Date range: January 1, 2025 to today
  const fromDate = new Date(2025, 0, 1) // January 1, 2025
  const toDate = currentDate // Today (September 6, 2025)
  
  const handleDateSelect = (selectedDate: Date | undefined) => {
    onDateChange?.(selectedDate)
    setOpen(false) // Close the popover after selection
  }
  
  const defaultPlaceholder = placeholder || t('dashboard.pickDate')
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            language === 'bn' && "font-bengali",
            className
          )}
        >
          <MdCalendarToday className="mr-2 h-4 w-4" />
          {date ? formatDate(date, "MMMM d, yyyy") : <span>{defaultPlaceholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0", language === 'bn' && "font-bengali")} align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          autoFocus
          defaultMonth={defaultMonth}
          captionLayout="dropdown"
          startMonth={fromDate}
          endMonth={toDate}
          showOutsideDays={true}
          disabled={(date) => {
            // Disable dates before January 1, 2025 and after today
            return date < fromDate || date > toDate
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
