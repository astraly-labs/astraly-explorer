import React from 'react'
import classnames from 'classnames'

const BaseButtonsGroup: React.FC<{
  options: { value: string; label: string }[]
  value: string
  onInput: (value: string) => void
}> = ({ options, value, onInput }) => {
  return (
    <div className="BaseButtonsGroup flex gap-2">
      {options.map((option) => (
        <div
          onClick={() => onInput(option.value)}
          role="button"
          tabIndex={0}
          onKeyUp={() => onInput(option.value)}
          key={option.value}
          className={classnames(
            {
              'bg-primaryClear': value === option.value,
              'text-white': value === option.value,
              'bg-primaryClearBg': value !== option.value,
            },
            'rounded-xl',
            'px-3',
            'py-1',
            'cursor-pointer'
          )}>
          {option.label}
        </div>
      ))}
    </div>
  )
}

export default BaseButtonsGroup
