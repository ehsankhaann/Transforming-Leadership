import React from 'react';
import { AppLink } from '../../lib/router';
import { PlaceholderText } from './PlaceholderText';

export type ButtonVariant = 'primary' | 'outline-white' | 'outline-navy';

interface BaseButtonProps {
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'md' | 'lg';
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

export const Button: React.FC<BaseButtonProps> = ({
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  size = 'lg',
  className = '',
  ariaLabel,
  children
}) => {
  // Primary CTA uses exact #E8601C with >=18.75px bold white text to satisfy WCAG 2.2 AA Large Text contrast
  const sizeClasses =
    size === 'md'
      ? 'px-5 py-3 text-[18.75px] leading-[24px] font-bold'
      : 'px-7 py-4 text-[18.75px] leading-[24px] font-bold';

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-[#E8601C] text-white hover:bg-[#cf5113] active:bg-[#b8460e] shadow-sm border-2 border-transparent',
    'outline-white':
      'bg-transparent text-white border-2 border-white hover:bg-white/10 active:bg-white/15',
    'outline-navy':
      'bg-transparent text-[#0F2340] border-2 border-[#0F2340] hover:bg-[#0F2340] hover:text-white'
  };

  const classes = [
    'inline-flex items-center justify-center gap-2.5 rounded-lg transition-[background-color,border-color,color,transform,box-shadow] duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center select-none disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0',
    sizeClasses,
    variantClasses[variant],
    fullWidth ? 'w-full' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const renderedChildren =
    typeof children === 'string' ? <PlaceholderText text={children} tone="button" /> : children;

  if (href) {
    return (
      <AppLink href={href} onClick={onClick} aria-label={ariaLabel} className={classes}>
        {renderedChildren}
      </AppLink>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {renderedChildren}
    </button>
  );
};
