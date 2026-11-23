import React from 'react';

interface CardProps {
  variant?: 'white' | 'navy';
  className?: string;
  as?: 'div' | 'article' | 'aside';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'white',
  className = '',
  as: Component = 'div',
  children
}) => {
  const styles =
    variant === 'navy'
      ? 'bg-[#0F2340] text-white border border-[#1E3A5F]'
      : 'bg-[#FFFFFF] text-[#475569] border border-slate-200/80 shadow-[0_4px_24px_rgba(15,35,64,0.06)]';

  return <Component className={`rounded-xl p-8 ${styles} ${className}`}>{children}</Component>;
};
