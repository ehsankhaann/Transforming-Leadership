import React from 'react';
import { PlaceholderText } from './PlaceholderText';

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'left',
  tone = 'light',
  className = ''
}) => {
  const alignClasses = align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-3xl';
  const titleColor = tone === 'dark' ? 'text-white' : 'text-[#0F2340]';
  const subtitleColor = tone === 'dark' ? 'text-slate-200' : 'text-[#475569]';
  const eyebrowColor = tone === 'dark' ? 'text-[#F0A32E]' : 'text-[#1E3A5F]';

  return (
    <div className={`${alignClasses} ${className}`}>
      {eyebrow && (
        <p className={`text-[14px] leading-[20px] font-semibold uppercase tracking-[0.08em] mb-3 ${eyebrowColor}`}>
          <PlaceholderText text={eyebrow} tone={tone} />
        </p>
      )}
      <h2
        id={id}
        className={`text-[30px] leading-[38px] md:text-[36px] md:leading-[44px] lg:text-[40px] lg:leading-[48px] font-bold tracking-tight ${titleColor}`}
      >
        <PlaceholderText text={title} tone={tone} />
      </h2>
      {subtitle && (
        <p className={`mt-4 text-[18px] leading-[28px] ${subtitleColor}`}>
          <PlaceholderText text={subtitle} tone={tone} />
        </p>
      )}
    </div>
  );
};
