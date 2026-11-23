import React from 'react';
import { SHARED_FINAL_CTA } from '../../content';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { PlaceholderText } from '../ui/PlaceholderText';

interface CTABandProps {
  heading?: string;
  subhead?: string;
  buttonLabel?: string;
  onBookCall: () => void;
  variant?: 'navy' | 'steel-card';
}

export const CTABand: React.FC<CTABandProps> = ({
  heading = SHARED_FINAL_CTA.heading,
  subhead = SHARED_FINAL_CTA.subhead,
  buttonLabel = SHARED_FINAL_CTA.buttonLabel,
  onBookCall,
  variant = 'navy'
}) => {
  if (variant === 'steel-card') {
    return (
      <Section bg="offwhite">
        <div className="rounded-2xl bg-[#1E3A5F] px-6 py-14 sm:px-12 sm:py-16 text-center text-white shadow-lg">
          <h2 className="mx-auto max-w-2xl text-[30px] leading-[38px] md:text-[40px] md:leading-[48px] font-bold">
            <PlaceholderText text={heading} tone="dark" />
          </h2>
          {subhead && (
            <p className="mx-auto mt-4 max-w-2xl text-[18px] leading-[28px] text-slate-200">
              <PlaceholderText text={subhead} tone="dark" />
            </p>
          )}
          <div className="mt-8">
            <Button variant="primary" onClick={onBookCall}>
              {buttonLabel}
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section bg="navy">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-[30px] leading-[38px] md:text-[36px] md:leading-[44px] lg:text-[40px] lg:leading-[48px] font-bold text-white">
          <PlaceholderText text={heading} tone="dark" />
        </h2>
        {subhead && (
          <p className="mx-auto mt-4 max-w-2xl text-[18px] leading-[28px] text-slate-200">
            <PlaceholderText text={subhead} tone="dark" />
          </p>
        )}
        <div className="mt-8">
          <Button variant="primary" onClick={onBookCall}>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </Section>
  );
};
