import React from 'react';
import { Check, CheckCircle2, Scale, Sun, Target, Users } from 'lucide-react';
import {
  EXECUTIVE_COACHING_CONTENT,
  OutcomeItem,
  PREVIEW_IMAGES,
  SHARED_OUTCOMES,
  TESTIMONIALS
} from '../content';
import { CTABand } from '../components/layout/CTABand';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PhotoPlaceholder } from '../components/ui/PhotoPlaceholder';
import { PlaceholderText } from '../components/ui/PlaceholderText';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { TestimonialCard } from '../components/ui/TestimonialCard';

interface ExecutiveCoachingPageProps {
  onBookCall: () => void;
}

const OutcomeIcon: React.FC<{ icon: OutcomeItem['icon'] }> = ({ icon }) => {
  if (icon === 'target') return <Target className="h-6 w-6 text-[#E8601C]" aria-hidden="true" />;
  if (icon === 'users') return <Users className="h-6 w-6 text-[#E8601C]" aria-hidden="true" />;
  if (icon === 'scale') return <Scale className="h-6 w-6 text-[#E8601C]" aria-hidden="true" />;
  return <Sun className="h-6 w-6 text-[#E8601C]" aria-hidden="true" />;
};

export const ExecutiveCoachingPage: React.FC<ExecutiveCoachingPageProps> = ({ onBookCall }) => {
  const { hero, whoItsFor, howItWorks, whatsIncluded, outcomesHeading } = EXECUTIVE_COACHING_CONTENT;

  return (
    <>
      {/* 1. Hero (Off-white — keeps the closing CTA as the single full-navy section on this page) */}
      <Section bg="offwhite">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="text-[14px] leading-[20px] font-semibold uppercase tracking-[0.08em] text-[#1E3A5F]">
              {hero.eyebrow}
            </p>
            <h1 className="mt-3 text-[38px] leading-[46px] md:text-[48px] md:leading-[56px] lg:text-[56px] lg:leading-[64px] font-bold tracking-tight text-[#0F2340]">
              {hero.h1}
            </h1>
            <p className="mt-6 text-[18px] leading-[28px] text-[#475569]">{hero.subhead}</p>
            <div className="mt-8">
              <Button variant="primary" onClick={onBookCall}>
                {hero.ctaLabel}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <PhotoPlaceholder
              caption={hero.photoPlaceholder}
              src={PREVIEW_IMAGES.coaching.src}
              alt={PREVIEW_IMAGES.coaching.alt}
              previewCaption={PREVIEW_IMAGES.coaching.caption}
              aspectClassName="aspect-[4/4]"
              priority
            />
          </div>
        </div>
      </Section>

      {/* 2. Who It's For (White) */}
      <Section bg="white" ariaLabelledBy="ec-who-heading">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            id="ec-who-heading"
            eyebrow={whoItsFor.eyebrow}
            title={whoItsFor.heading}
            subtitle={whoItsFor.intro}
          />
          <ul className="mt-8 space-y-4">
            {whoItsFor.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-[#F7F8FA] p-5 text-[18px] leading-[28px] text-[#0F2340]"
              >
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#E8601C]" aria-hidden="true" />
                <span>
                  <PlaceholderText text={bullet} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 3. How It Works — 4 numbered steps (Off-white) */}
      <Section bg="offwhite" ariaLabelledBy="ec-process-heading">
        <SectionHeading
          id="ec-process-heading"
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.heading}
          align="center"
        />

        <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.steps.map((step) => (
            <Card key={step.step} as="div" className="flex flex-col justify-start">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F2340] text-[15px] font-bold text-[#F0A32E]">
                {step.step}
              </span>
              <h3 className="mt-5 text-[22px] leading-[30px] lg:text-[24px] lg:leading-[32px] font-semibold text-[#0F2340]">
                {step.title}
              </h3>
              <p className="mt-3 text-[18px] leading-[28px] text-[#475569]">{step.description}</p>
            </Card>
          ))}
        </ol>
      </Section>

      {/* 4. What's Included — Checklist Card (White) */}
      <Section bg="white" ariaLabelledBy="ec-included-heading">
        <SectionHeading
          id="ec-included-heading"
          eyebrow={whatsIncluded.eyebrow}
          title={whatsIncluded.heading}
          align="center"
        />

        <Card className="mx-auto mt-10 max-w-4xl">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {whatsIncluded.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[18px] leading-[28px] text-[#0F2340]">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F0A32E]/20 text-[#0F2340]">
                  <Check className="h-4 w-4 text-[#E8601C]" aria-hidden="true" />
                </span>
                <span>
                  <PlaceholderText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      {/* 5. Outcomes — 4 small cards (Off-white) */}
      <Section bg="offwhite" ariaLabelledBy="ec-outcomes-heading">
        <SectionHeading
          id="ec-outcomes-heading"
          eyebrow="Measurable Shifts"
          title={outcomesHeading}
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHARED_OUTCOMES.map((outcome) => (
            <Card key={outcome.title} className="h-full">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#F0A32E]/15">
                <OutcomeIcon icon={outcome.icon} />
              </div>
              <h3 className="text-[22px] leading-[30px] lg:text-[24px] lg:leading-[32px] font-semibold text-[#0F2340]">
                {outcome.title}
              </h3>
              <p className="mt-2.5 text-[18px] leading-[28px] text-[#475569]">{outcome.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 6. Testimonial Band — 2 real quotes (White) */}
      <Section bg="white" ariaLabelledBy="ec-quotes-heading">
        <SectionHeading
          id="ec-quotes-heading"
          eyebrow="Client Reflections"
          title="What senior executives experience"
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <TestimonialCard testimonial={TESTIMONIALS.gina} />
          <TestimonialCard testimonial={TESTIMONIALS.ron} />
        </div>
      </Section>

      {/* 7. Final CTA — Full Navy Section (1 full-navy section on this page) */}
      <CTABand onBookCall={onBookCall} />
    </>
  );
};
