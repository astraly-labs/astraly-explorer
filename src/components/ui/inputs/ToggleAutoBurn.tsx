import React from 'react'

import style from './Toggle.module.scss'

const ToggleAutoBurn: React.FC<{
  value: boolean
  onClick: React.MouseEventHandler<HTMLDivElement>
}> = ({ value, onClick }) => {
  return (
    <div
      className={`${style.baseToggle} ${value && style.baseToggleActive}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={() => {}}>
      <div className={style.baseToggleItem} />
    </div>
  )
}

export default ToggleAutoBurn
