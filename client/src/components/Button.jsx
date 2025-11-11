import React from 'react';

const VARIANT_CLASS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger',
};

const SIZE_CLASS = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  ...rest
}) {
  const classes = [
    VARIANT_CLASS[variant] || VARIANT_CLASS.primary,
    SIZE_CLASS[size] || SIZE_CLASS.md,
    disabled ? 'btn-disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  function handleClick(e) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={classes}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
}
