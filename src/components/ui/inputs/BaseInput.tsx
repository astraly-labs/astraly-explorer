import React, { useRef, useCallback } from 'react'

import InputGroup from './InputGroup'

const BaseInput: React.FC<{
  label?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  max?: number
  size?: 'sm' | 'md' | 'xl'
  step?: number
  type?: string
  placeholder?: string
}> = ({ label, value, onChange, max, size = 'md', step, type = 'number', placeholder }) => {
  const input = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    input.current?.focus()
  }, [input.current])

  return (
    <InputGroup left={<span>{label}</span>} onClick={handleClick} size={size}>
      <div className="input">
        <input
          ref={input}
          max={max}
          value={value}
          min={0}
          onChange={onChange}
          step={step}
          className="outline-0 w-full text-right invalid:border-red-500 focus:invalid:border-red-500 dark:bg-gray3"
          type={type}
          placeholder={placeholder}
        />
      </div>
    </InputGroup>
  )
}

export default BaseInput
