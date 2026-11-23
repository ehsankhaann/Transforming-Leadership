import React from 'react';
import { Check } from 'lucide-react';
import { MASTERMIND_CONTENT } from '../../content';
import { Card } from './Card';
import { Button } from './Button';
import { PlaceholderText } from './PlaceholderText';

interface PricingCardProps {
  onApplyClick: () => void;
  onBookCallClick: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ onApplyClick, onBookCallClick }) => {
  const { pricing } = MASTERMIND_CONTENT;

  return (
    <Card variant="navy" className="flex flex-col justify-between shadow-lg">
      <div>
        <p className="text-[14px] leading-[20px] font-bold uppercase tracking-[0.12em] text-[#F0A32E]">
          {pricing.eyebrow}
        </p>

        <div className="mt-5">
          <p className="text-[38px] leading-[46px] sm:text-[42px] sm:leading-[50px] font-bold text-white">
            <PlaceholderText text={pricing.monthlyRate} tone="dark" />
          </p>
          <p className="mt-1.5 text-[18px] leading-[28px] text-slate-200">
            <PlaceholderText text={pricing.annualRate} tone="dark" />
          </p>
        </div>

        <div className="mt-6 space-y-3 border-t border-white/15 pt-6 text-[16px] leading-[24px] text-slate-200">
          <div className="flex items-start gap-2.5">
            <Check className="mt-1 h-4 w-4 shrink-0 text-[#F0A32E]" aria-hidden="true" />
            <span>{pricing.commitmentNote}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Check className="mt-1 h-4 w-4 shrink-0 text-[#F0A32E]" aria-hidden="true" />
            <span>
              <PlaceholderText text={pricing.companyRateNote} tone="dark" />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <Button variant="primary" fullWidth onClick={onApplyClick}>
          {pricing.primaryCta}
        </Button>
        <Button variant="outline-white" fullWidth onClick={onBookCallClick}>
          {pricing.secondaryCta}
        </Button>
      </div>
    </Card>
  );
};
