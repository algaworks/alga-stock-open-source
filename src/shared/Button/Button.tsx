import React from 'react'
import './Button.scss'

declare interface ButtonProps {
  content?: string
  onClick?: () => void
  appendIcon?: JSX.Element
  rounded?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
  return <button
    className={`AppButton ${props.rounded ? 'rounded' : ''}`}
    onClick={props.onClick}
  >
    { props.children || 'Nameless button' }
    { props.appendIcon }
  </button>
}

export default Button
