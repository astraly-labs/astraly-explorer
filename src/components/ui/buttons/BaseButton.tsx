import React from 'react'
import classnames from 'classnames'
import styles from './Buttons.module.scss'

const BaseButton: React.FC<
  React.PropsWithChildren<{
    className?: string
    small?: boolean
    xSmall?: boolean
    medium?: boolean
    disabled?: boolean
    inline?: boolean
    white?: boolean
    onClick?: React.MouseEventHandler<HTMLDivElement>
    type?: 'primary' | 'secondary'
  }>
> = ({
  className,
  children,
  small,
  xSmall,
  medium,
  disabled,
  inline,
  onClick,
  white,
  type = 'primary',
}) => {
  const classes = classnames(
    'BaseButton',
    className,
    styles.baseButton,
    {
      [styles.baseButtonSmall]: small,
      [styles.baseButtonXSmall]: xSmall,
      [styles.baseButtonDisabled]: disabled,
      [styles.baseButtonInline]: inline,
      [styles.baseButtonWhite]: white,
      [styles.baseButtonMedium]: medium,
    },
    styles[`baseButtonType__${type}`]
  )

  return (
    <div className={classes} onClick={onClick} role="button" tabIndex={0} onKeyUp={() => {}}>
      <span>{children}</span>
    </div>
  )
}

export default BaseButton
