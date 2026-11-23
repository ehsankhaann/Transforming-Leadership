import React, { useEffect, useRef } from 'react';

export type SectionBg = 'white' | 'offwhite' | 'navy';

interface SectionProps {
  id?: string;
  bg?: SectionBg;
  className?: string;
  containerClassName?: string;
  ariaLabelledBy?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  id,
  bg = 'white',
  className = '',
  containerClassName = '',
  ariaLabelledBy,
  children
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = contentRef.current;
    if (
      !element ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    element.classList.add('reveal-ready');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -48px 0px', threshold: 0.04 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const bgMap: Record<SectionBg, string> = {
    white: 'bg-[#FFFFFF] text-[#475569]',
    offwhite: 'bg-[#F7F8FA] text-[#475569]',
    navy: 'bg-[#0F2340] text-white'
  };

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      tabIndex={id ? -1 : undefined}
      className={`scroll-mt-20 py-16 lg:py-24 ${bgMap[bg]} ${className}`}
    >
      <div ref={contentRef} className={`mx-auto w-full max-w-[1120px] px-5 sm:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};
