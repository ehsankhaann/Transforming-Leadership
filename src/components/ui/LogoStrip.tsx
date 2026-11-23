import React from 'react';
import { TRUSTED_LOGOS } from '../../content';

interface LogoStripProps {
  tone?: 'dark' | 'light';
  className?: string;
}

export const LogoStrip: React.FC<LogoStripProps> = ({ tone = 'light', className = '' }) => {
  const isDark = tone === 'dark';

  return (
    <div className={className} aria-label="Organizations represented by past and current clients">
      <p
        className={`text-center text-[14px] leading-[20px] font-medium uppercase tracking-[0.12em] mb-6 ${
          isDark ? 'text-slate-300' : 'text-[#475569]'
        }`}
      >
        Trusted by senior leaders from
      </p>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 items-center">
        {TRUSTED_LOGOS.map((logo) => (
          <li
            key={logo.id}
            className={`flex h-16 items-center justify-center rounded-lg px-4 text-center select-none ${
              isDark
                ? 'bg-white border border-white/15 text-[#475569]'
                : 'bg-[#F7F8FA] border border-slate-200 text-slate-500'
            }`}
          >
            {logo.imageSrc ? (
              <img
                src={logo.imageSrc}
                alt={logo.name}
                loading="lazy"
                decoding="async"
                className="max-h-10 max-w-full object-contain grayscale contrast-125"
              />
            ) : (
              <span className="text-[13px] sm:text-[14px] leading-[20px] font-bold tracking-wider uppercase">
                {logo.placeholderLabel}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
