import React from 'react'

const InputGroup: React.FC<
  React.PropsWithChildren<{
    left: React.ReactNode
    onClick: React.MouseEventHandler<HTMLDivElement>
  }>
> = ({ children, left, onClick }) => {
  return (
    <div
      className="InputGroup mb-3"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyUp={() => {}}>
      <div className="left whitespace-nowrap text-12 uppercase mb-1 font-bold">{left}</div>
      <div className="input">{children}</div>
    </div>
  )
}

export default InputGroup
