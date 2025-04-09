"use client"
import "./Button.css"

const Button = ({ children, variant = "primary", size = "medium", onClick, disabled, className = "", ...props }) => {
  const buttonClasses = `button button--${variant} button--${size} ${className}`

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button

