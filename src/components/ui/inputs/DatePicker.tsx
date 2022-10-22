import React, { forwardRef, useRef, useCallback } from 'react'
import ReactDatePicker from 'react-datepicker'

import InputGroup from './InputGroup'

import { addYears } from 'date-fns'
// import 'react-datepicker/dist/react-datepicker.css'

const CustomDatePicker = forwardRef<
  HTMLButtonElement,
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>(({ value, onClick, placeholder }, ref) => (
  <button onClick={onClick} ref={ref}>
    <span className="font-heading text-12">{value || placeholder}</span>
  </button>
))

CustomDatePicker.displayName = 'CustomDatePicker'

const DatePicker: React.FC<{
  value: Date | null
  onInput: (date: Date) => void
  min?: Date
  max?: Date
}> = ({ value, onInput, min, max }) => {
  const inputRef = useRef<ReactDatePicker>(null)

  const handleClick = useCallback(() => {
    inputRef.current?.setOpen(true)
  }, [inputRef.current])

  return (
    <div className="DatePicker">
      <InputGroup left={<span>Date</span>} onClick={handleClick} size="xl">
        <ReactDatePicker
          ref={inputRef}
          selected={value}
          onChange={onInput}
          placeholderText="mm/dd/year"
          minDate={min}
          maxDate={max}
          showYearDropdown
          customInput={<CustomDatePicker />}
        />
      </InputGroup>
    </div>
  )
}

export default DatePicker
