import React, { useRef, useCallback } from 'react'

import AdminInputGroup from './AdminInputGroup'

const BaseInput: React.FC<{
  label: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  max?: number
}> = ({ label, value, onChange, max, children }) => {
  const input = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    input.current?.focus()
  }, [input.current])

  return (
    <AdminInputGroup left={<span>{label}</span>} onClick={handleClick}>
      <div className="input">
        <input
          ref={input}
          max={max}
          value={value}
          onChange={onChange}
          className="outline-0 w-[300px] h-22 rounded-md px-3"
        />
      </div>
    </AdminInputGroup>
  )
}

export default BaseInput
