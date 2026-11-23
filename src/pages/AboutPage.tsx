import React from 'react';
import { ArrowRight, Award, Compass, HeartHandshake, ShieldCheck } from 'lucide-react';
import { ABOUT_CONTENT, PREVIEW_IMAGES, TESTIMONIALS } from '../content';
import { AppLink } from '../lib/router';
import { ContactSection } from '../components/layout/ContactSection';
import { CTABand } from '../components/layout/CTABand';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PhotoPlaceholder } from '../components/ui/PhotoPlaceholder';
import { PlaceholderText } from '../components/ui/PlaceholderText';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { TestimonialCard } from '../components/ui/TestimonialCard';

interface AboutPageProps {
  onBookCall: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBookCall }) => {
  const {
    hero,
    story,
    credentials,
    howIWork,
    whoIWorkWith,
    valuesAndFaith,
    givingBack
  } = ABOUT_CONTENT;

  return (
    <>
      {/* 1. Hero — Photo left, intro right (Off-white) */}
      <Section bg="offwhite">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <PhotoPlaceholder
              caption={hero.photoPlaceholder}
              src={PREVIEW_IMAGES.portrait.src}
              alt={PREVIEW_IMAGES.portrait.alt}
              previewCaption={PREVIEW_IMAGES.portrait.caption}
              aspectClassName="aspect-[4/5]"
              priority
            />
          </div>

          <div className="lg:col-span-7">
            <h1 className="text-[38px] leading-[46px] md:text-[48px] md:leading-[56px] lg:text-[56px] lg:leading-[64px] font-bold tracking-tight text-[#0F2340]">
              {hero.h1}
            </h1>
            <p className="mt-6 text-[20px] leading-[30px] md:text-[22px] md:leading-[32px] text-[#475569]">
              {hero.intro}
            </p>
            <div className="mt-8">
              <Button variant="primary" onClick={onBookCall}>
                {hero.ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. My Story — Three short paragraphs with visible [brackets] (White) */}
      <Section bg="white" ariaLabelledBy="about-story-heading">
        <div className="mx-auto max-w-3xl">
          <SectionHeading id="about-story-heading" eyebrow={story.eyebrow} title={story.heading} />
          <div className="mt-8 space-y-6 text-[18px] leading-[28px] text-[#475569]">
            {story.paragraphs.map((para, idx) => (
              <p key={idx}>
                <PlaceholderText text={para} />
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* 3. Credentials — Scannable list (Off-white) */}
      <Section bg="offwhite" ariaLabelledBy="about-credentials-heading">
        <SectionHeading
          id="about-credentials-heading"
          eyebrow={credentials.eyebrow}
          title={credentials.heading}
          align="center"
        />

        <ul className="mx-auto mt-12 max-w-4xl space-y-4">
          {credentials.items.map((cred) => (
            <li
              key={cred.title}
              className="flex flex-col sm:flex-row sm:items-start gap-4 rounded-xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_24px_rgba(15,35,64,0.04)]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0F2340] text-[#F0A32E]">
                <Award className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-[20px] leading-[28px] lg:text-[22px] lg:leading-[30px] font-semibold text-[#0F2340]">
                  {cred.title}
                </h3>
                <p className="mt-1 text-[16px] leading-[26px] text-[#475569]">{cred.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. How I Work — 4 items (White) */}
      <Section bg="white" ariaLabelledBy="about-how-heading">
        <SectionHeading
          id="about-how-heading"
          eyebrow={howIWork.eyebrow}
          title={howIWork.heading}
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {howIWork.items.map((item) => (
            <Card key={item.title} className="h-full">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0A32E]/15 text-[#E8601C]">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-[22px] leading-[30px] lg:text-[24px] lg:leading-[32px] font-semibold text-[#0F2340]">
                {item.title}
              </h3>
              <p className="mt-3 text-[18px] leading-[28px] text-[#475569]">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 5. Who I Work With — Two cards linking to Coaching and Masterminds (Off-white) */}
      <Section bg="offwhite" ariaLabelledBy="about-who-heading">
        <SectionHeading
          id="about-who-heading"
          eyebrow={whoIWorkWith.eyebrow}
          title={whoIWorkWith.heading}
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {whoIWorkWith.cards.map((card) => (
            <Card key={card.title} className="flex flex-col justify-between">
              <div>
                <h3 className="text-[22px] leading-[30px] lg:text-[24px] lg:leading-[32px] font-semibold text-[#0F2340]">
                  {card.title}
                </h3>
                <p className="mt-3 text-[18px] leading-[28px] text-[#475569]">{card.description}</p>
              </div>
              <div className="mt-8 border-t border-slate-100 pt-5">
                <AppLink
                  href={card.href}
                  className="inline-flex items-center gap-2 text-[18px] leading-[28px] font-semibold text-[#E8601C] hover:text-[#0F2340] transition-colors group"
                >
                  <span>{card.ctaLabel}</span>
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </AppLink>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 6. Values and Faith — Visible [placeholder] block (White) */}
      <Section bg="white" ariaLabelledBy="about-values-heading">
        <div className="mx-auto max-w-3xl">
          <Card className="border-l-4 border-l-[#F0A32E]">
            <div className="flex items-center gap-2 text-[14px] leading-[20px] font-semibold uppercase tracking-[0.08em] text-[#1E3A5F]">
              <Compass className="h-4 w-4 text-[#E8601C]" aria-hidden="true" />
              <span>{valuesAndFaith.eyebrow}</span>
            </div>
            <h2
              id="about-values-heading"
              className="mt-2 text-[28px] leading-[36px] lg:text-[32px] lg:leading-[40px] font-bold text-[#0F2340]"
            >
              {valuesAndFaith.heading}
            </h2>
            <p className="mt-4 text-[18px] leading-[28px] text-[#475569]">
              <PlaceholderText text={valuesAndFaith.body} />
            </p>
          </Card>
        </div>
      </Section>

      {/* 7. Giving Back — [3%] to PATH International (Off-white) */}
      <Section bg="offwhite" ariaLabelledBy="about-giving-heading">
        <div className="mx-auto max-w-3xl">
          <Card>
            <div className="flex items-center gap-2 text-[14px] leading-[20px] font-semibold uppercase tracking-[0.08em] text-[#1E3A5F]">
              <HeartHandshake className="h-4 w-4 text-[#E8601C]" aria-hidden="true" />
              <span>{givingBack.eyebrow}</span>
            </div>
            <h2
              id="about-giving-heading"
              className="mt-2 text-[28px] leading-[36px] lg:text-[32px] lg:leading-[40px] font-bold text-[#0F2340]"
            >
              {givingBack.heading}
            </h2>
            <p className="mt-4 text-[18px] leading-[28px] text-[#475569]">
              <PlaceholderText text={givingBack.body} />
            </p>
          </Card>
        </div>
      </Section>

      {/* 8. Two Testimonials — Gina Butler & Gary Robinette (White) */}
      <Section bg="white" ariaLabelledBy="about-testimonials-heading">
        <SectionHeading
          id="about-testimonials-heading"
          eyebrow="Client Perspective"
          title="In leaders' own words"
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <TestimonialCard testimonial={TESTIMONIALS.gina} />
          <TestimonialCard testimonial={TESTIMONIALS.gary} />
        </div>
      </Section>

      {/* Contact information lives on About to preserve the five-page sitemap. */}
      <ContactSection onBookCall={onBookCall} />

      {/* Final CTA — Single full-navy section on About */}
      <CTABand onBookCall={onBookCall} />
    </>
  );
};
