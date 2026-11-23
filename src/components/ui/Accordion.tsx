import React, { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from '../../content';
import { PlaceholderText } from './PlaceholderText';

interface AccordionProps {
  items: FaqItem[];
  defaultOpenIndex?: number | null;
}

/**
 * Keyboard-accessible WCAG 2.2 AA Accordion (strictly one item open at a time).
 * Supports Enter/Space toggle and ArrowDown/ArrowUp/Home/End focus movement.
 */
export const Accordion: React.FC<AccordionProps> = ({ items, defaultOpenIndex = 0 }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleToggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const count = items.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (idx + 1) % count;
      triggerRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (idx - 1 + count) % count;
      triggerRefs.current[prev]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      triggerRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      triggerRefs.current[count - 1]?.focus();
    }
  };

  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(15,35,64,0.05)]">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `faq-trigger-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                ref={(el) => {
                  triggerRefs.current[idx] = el;
                }}
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[18px] leading-[26px] font-semibold text-[#0F2340] hover:bg-[#F7F8FA] transition-colors cursor-pointer"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#1E3A5F] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#E8601C]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="accordion-panel-enter px-6 pb-6 pt-1 text-[18px] leading-[28px] text-[#475569]"
            >
              <PlaceholderText text={item.answer} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
