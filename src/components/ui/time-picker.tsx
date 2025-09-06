"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { BiTime } from "react-icons/bi"

interface TimePickerProps {
  time?: string
  onTimeChange?: (time: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function TimePicker({
  time,
  onTimeChange,
  placeholder = "Select time",
  className,
  disabled = false,
  ...props
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false)
  
  // Generate time slots from 9:00 AM to 9:00 PM in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
        const ampm = hour >= 12 ? 'PM' : 'AM'
        const displayHour = hour12 === 0 ? 12 : hour12
        const timeString = `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`
        slots.push(timeString)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  const handleTimeSelect = (selectedTime: string) => {
    onTimeChange?.(selectedTime)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal",
            !time && "text-muted-foreground",
            className
          )}
          disabled={disabled}
          {...props}
        >
          <BiTime className="mr-2 h-4 w-4" />
          {time || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="max-h-60 overflow-y-auto">
          <div className="grid grid-cols-2 gap-1 p-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant={time === slot ? "default" : "ghost"}
                size="sm"
                className="justify-start text-xs h-8"
                onClick={() => handleTimeSelect(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
