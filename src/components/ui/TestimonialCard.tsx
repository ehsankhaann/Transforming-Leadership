import React from 'react';
import { Quote } from 'lucide-react';
import { Testimonial } from '../../content';
import { Card } from './Card';
import { PlaceholderText } from './PlaceholderText';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const isPendingQuote = testimonial.quote.startsWith('[');

  return (
    <Card as="article" className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0A32E]/15 text-[#0F2340]">
          <Quote className="h-5 w-5 text-[#E8601C]" aria-hidden="true" />
        </div>
        <blockquote className="text-[18px] leading-[28px] text-[#475569]">
          {isPendingQuote ? testimonial.quote : <>&ldquo;{testimonial.quote}&rdquo;</>}
        </blockquote>
      </div>
      <footer className="mt-6 border-t border-slate-200/80 pt-5">
        <p className="text-[18px] leading-[24px] font-semibold text-[#0F2340]">{testimonial.author}</p>
        <p className="mt-1 text-[14px] leading-[20px] text-[#475569]">
          <PlaceholderText text={testimonial.role} />
        </p>
      </footer>
    </Card>
  );
};
