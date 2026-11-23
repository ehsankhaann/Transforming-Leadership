import React from 'react';
import {
  ArrowRight,
  Compass,
  Home as HomeIcon,
  MessageSquareOff,
  UserCheck,
  Users
} from 'lucide-react';
import {
  HOME_CONTENT,
  PREVIEW_IMAGES,
  SHARED_PROBLEM_SECTION,
  TESTIMONIALS,
  ProblemColumn
} from '../content';
import { AppLink } from '../lib/router';
import { CTABand } from '../components/layout/CTABand';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LogoStrip } from '../components/ui/LogoStrip';
import { PhotoPlaceholder } from '../components/ui/PhotoPlaceholder';
import { PlaceholderText } from '../components/ui/PlaceholderText';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { TestimonialCard } from '../components/ui/TestimonialCard';

interface HomePageProps {
  onBookCall: () => void;
}

const ProblemIcon: React.FC<{ icon: ProblemColumn['icon'] }> = ({ icon }) => {
  if (icon === 'compass') return <Compass className="h-6 w-6 text-[#E8601C]" aria-hidden="true" />;
  if (icon === 'message-off') {
    return <MessageSquareOff className="h-6 w-6 text-[#E8601C]" aria-hidden="true" />;
  }
  return <HomeIcon className="h-6 w-6 text-[#E8601C]" aria-hidden="true" />;
};

export const HomePage: React.FC<HomePageProps> = ({ onBookCall }) => {
  const { hero, twoOffers, proofHeading, aboutTeaser } = HOME_CONTENT;

  return (
    <>
      {/* 1. Hero — Navy background, photo right, H1, two buttons, Trusted-by logo strip */}
      <section className="bg-[#0F2340] text-white py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="hero-copy-enter lg:col-span-7">
              <p className="text-[14px] leading-[20px] font-semibold uppercase tracking-[0.08em] text-[#F0A32E]">
                {hero.eyebrow}
              </p>
              <h1 className="mt-4 text-[38px] leading-[46px] md:text-[48px] md:leading-[56px] lg:text-[56px] lg:leading-[64px] font-bold tracking-tight text-white">
                {hero.h1}
              </h1>
              <p className="mt-6 max-w-2xl text-[18px] leading-[28px] text-slate-200">
                {hero.subhead}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button variant="primary" onClick={onBookCall}>
                  {hero.primaryCta}
                </Button>
                <Button variant="outline-white" href={hero.secondaryHref}>
                  {hero.secondaryCta}
                </Button>
              </div>
            </div>

            <div className="hero-media-enter lg:col-span-5">
              <PhotoPlaceholder
                caption={hero.photoPlaceholder}
                src={PREVIEW_IMAGES.portrait.src}
                alt={PREVIEW_IMAGES.portrait.alt}
                previewCaption={PREVIEW_IMAGES.portrait.caption}
                tone="dark"
                aspectClassName="aspect-[4/5]"
                priority
              />
            </div>
          </div>

          <div className="mt-16 border-t border-white/15 pt-10">
            <LogoStrip tone="dark" />
          </div>
        </div>
      </section>

      {/* 2. Two Offers — Equal-weight side-by-side cards (White) */}
      <Section bg="white" ariaLabelledBy="home-offers-heading">
        <SectionHeading
          id="home-offers-heading"
          eyebrow={twoOffers.eyebrow}
          title={twoOffers.heading}
          subtitle={twoOffers.subtitle}
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {twoOffers.cards.map((offer, idx) => (
            <Card key={offer.id} className="flex flex-col justify-between interactive-card">
              <div>
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2340] text-[#F0A32E]">
                  {idx === 0 ? (
                    <UserCheck className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Users className="h-6 w-6" aria-hidden="true" />
                  )}
                </div>
                <h3 className="text-[22px] leading-[30px] lg:text-[24px] lg:leading-[32px] font-semibold text-[#0F2340]">
                  {offer.title}
                </h3>
                <p className="mt-3 text-[18px] leading-[28px] text-[#475569]">{offer.description}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <AppLink
                  href={offer.href}
                  className="inline-flex items-center gap-2 text-[18px] leading-[28px] font-semibold text-[#E8601C] hover:text-[#0F2340] transition-colors group"
                >
                  <span>{offer.linkLabel}</span>
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

      {/* 3. The Problem — Off-white section with 3 icon columns */}
      <Section bg="offwhite" ariaLabelledBy="home-problem-heading">
        <SectionHeading
          id="home-problem-heading"
          title={SHARED_PROBLEM_SECTION.heading}
          subtitle={SHARED_PROBLEM_SECTION.subtitle}
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {SHARED_PROBLEM_SECTION.columns.map((col) => (
            <Card key={col.title} className="h-full">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0A32E]/15">
                <ProblemIcon icon={col.icon} />
              </div>
              <h3 className="text-[22px] leading-[30px] lg:text-[24px] lg:leading-[32px] font-semibold text-[#0F2340]">
                {col.title}
              </h3>
              <p className="mt-3 text-[18px] leading-[28px] text-[#475569]">{col.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 4. Proof — Three real testimonials (White) */}
      <Section bg="white" ariaLabelledBy="home-proof-heading">
        <SectionHeading id="home-proof-heading" eyebrow="Client Perspective" title={proofHeading} align="center" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <TestimonialCard testimonial={TESTIMONIALS.gina} />
          <TestimonialCard testimonial={TESTIMONIALS.gary} />
          <TestimonialCard testimonial={TESTIMONIALS.ron} />
        </div>
      </Section>

      {/* 5. About Teaser — [STEVE_PHOTO] left, 3-sentence first-person intro right (Off-white) */}
      <Section bg="offwhite" ariaLabelledBy="home-about-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <AppLink href="/about" aria-label="Meet Steve: read the About page" className="block rounded-xl">
              <PhotoPlaceholder
                caption={aboutTeaser.photoPlaceholder}
                src={PREVIEW_IMAGES.portrait.src}
                alt={PREVIEW_IMAGES.portrait.alt}
                previewCaption={PREVIEW_IMAGES.portrait.caption}
                aspectClassName="aspect-[4/4]"
              />
            </AppLink>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              id="home-about-heading"
              eyebrow={aboutTeaser.eyebrow}
              title={aboutTeaser.heading}
            />
            <div className="mt-5 space-y-4 text-[18px] leading-[28px] text-[#475569]">
              {aboutTeaser.paragraphs.map((para, i) => (
                <p key={i}>
                  <PlaceholderText text={para} />
                </p>
              ))}
            </div>
            <div className="mt-8">
              <Button variant="outline-navy" href={aboutTeaser.ctaHref}>
                <span>{aboutTeaser.ctaLabel}</span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. Final CTA Band */}
      <CTABand variant="steel-card" onBookCall={onBookCall} />
    </>
  );
};
