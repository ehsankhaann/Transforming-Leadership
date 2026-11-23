import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Compass,
  Home as HomeIcon,
  MessageSquareOff,
  PhoneCall,
  Scale,
  Sun,
  Target,
  Users
} from 'lucide-react';
import {
  MASTERMIND_CONTENT,
  OutcomeItem,
  PREVIEW_IMAGES,
  ProblemColumn,
  SHARED_OUTCOMES,
  SHARED_PROBLEM_SECTION,
  SITE_CONFIG,
  TESTIMONIALS
} from '../content';
import { MastermindApplicationPayload, submitMastermindApplication } from '../lib/supabase';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { FormField, inputBaseClasses } from '../components/ui/FormField';
import { LogoStrip } from '../components/ui/LogoStrip';
import { PhotoPlaceholder } from '../components/ui/PhotoPlaceholder';
import { PlaceholderText } from '../components/ui/PlaceholderText';
import { PricingCard } from '../components/ui/PricingCard';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { useToast } from '../components/ui/Toast';

interface MastermindGroupsPageProps {
  onBookCall: () => void;
}

const ProblemIcon: React.FC<{ icon: ProblemColumn['icon'] }> = ({ icon }) => {
  if (icon === 'compass') return <Compass className="h-6 w-6 text-[#E8601C]" aria-hidden="true" />;
  if (icon === 'message-off') {
    return <MessageSquareOff className="h-6 w-6 text-[#E8601C]" aria-hidden="true" />;
  }
  return <HomeIcon className="h-6 w-6 text-[#E8601C]" aria-hidden="true" />;
};

const OutcomeIcon: React.FC<{ icon: OutcomeItem['icon'] }> = ({ icon }) => {
  if (icon === 'target') return <Target className="h-6 w-6 text-[#F0A32E]" aria-hidden="true" />;
  if (icon === 'users') return <Users className="h-6 w-6 text-[#F0A32E]" aria-hidden="true" />;
  if (icon === 'scale') return <Scale className="h-6 w-6 text-[#F0A32E]" aria-hidden="true" />;
  return <Sun className="h-6 w-6 text-[#F0A32E]" aria-hidden="true" />;
};

export const MastermindGroupsPage: React.FC<MastermindGroupsPageProps> = ({ onBookCall }) => {
  const {
    hero,
    peerRoom,
    circlesSection,
    howItWorks,
    whatsIncluded,
    growthBand,
    facilitator,
    testimonialsHeading,
    faqs,
    applicationSection
  } = MASTERMIND_CONTENT;

  const { showToast } = useToast();
  const [submittedApplicant, setSubmittedApplicant] = useState<string | null>(null);
  const [emailDraft, setEmailDraft] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<MastermindApplicationPayload>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      titleAndCompany: '',
      peopleYouLead: '',
      circle: '',
      biggestChallenge: '',
      referralSource: ''
    }
  });

  const scrollToApplication = (circleId?: string) => {
    if (circleId) {
      setValue('circle', circleId, { shouldValidate: true });
    }
    const el = document.getElementById('apply');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onSubmit = async (values: MastermindApplicationPayload) => {
    try {
      const result = await submitMastermindApplication(values);
      if (result.mode === 'preview') {
        const subject = `Mastermind application: ${values.circle}`;
        const body = [
          `Name: ${values.name}`,
          `Email: ${values.email}`,
          `Phone: ${values.phone}`,
          `Title and company: ${values.titleAndCompany}`,
          `People I lead: ${values.peopleYouLead}`,
          `Circle: ${values.circle}`,
          `Leadership challenge: ${values.biggestChallenge}`,
          `How I heard about you: ${values.referralSource || 'Not provided'}`
        ].join('\n');
        setEmailDraft(`mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        showToast('success', 'Email draft ready.', 'No application was sent. Use the email link below to finish.');
        return;
      }

      setSubmittedApplicant(values.name);
      setEmailDraft(null);
      showToast(
        'success',
        'Application submitted.',
        'Thank you—Steve reviews every application personally within [2] business days.'
      );
      reset();
    } catch (err) {
      showToast(
        'error',
        'Application could not be submitted.',
        err instanceof Error ? err.message : 'Please check your entries and try again.'
      );
    }
  };

  return (
    <>
      {/* 1. Hero — Navy with full-bleed Unsplash preview photo & dark overlay */}
      <section className="relative overflow-hidden bg-[#0F2340] text-white py-16 lg:py-24">
        <img
          src={PREVIEW_IMAGES.mastermindHero.src}
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="hero-media-enter absolute inset-0 h-full w-full object-cover object-center opacity-80"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0F2340]/95 via-[#0F2340]/75 to-[#0F2340]/45" />
        <div className="hero-copy-enter relative mx-auto w-full max-w-[1120px] px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-[14px] leading-[20px] font-semibold uppercase tracking-[0.06em] text-[#F0A32E]">
              {hero.eyebrow}
            </p>

            <h1 className="mt-4 text-[38px] leading-[46px] md:text-[48px] md:leading-[56px] lg:text-[56px] lg:leading-[64px] font-bold tracking-tight text-white">
              {hero.h1}
            </h1>

            <p className="mt-6 text-[18px] leading-[28px] text-slate-200">{hero.subhead}</p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button variant="primary" onClick={() => scrollToApplication()}>
                {hero.primaryCta}
              </Button>
              <Button variant="outline-white" onClick={onBookCall}>
                {hero.secondaryCta}
              </Button>
            </div>

            <p className="mt-5 flex items-center gap-2 text-[14px] leading-[20px] text-slate-300">
              <Calendar className="h-4 w-4 shrink-0 text-[#F0A32E]" aria-hidden="true" />
              <span>
                <PlaceholderText text={hero.cohortNote} tone="dark" />
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Trusted-By Logo Strip (White) */}
      <div className="border-b border-slate-200/80 bg-white py-10">
        <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
          <LogoStrip tone="light" />
        </div>
      </div>

      {/* 3. Pain Section — "The higher you lead, the lonelier it gets." (Off-white) */}
      <Section bg="offwhite" ariaLabelledBy="mm-pain-heading">
        <SectionHeading
          id="mm-pain-heading"
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

      {/* 4. "A trusted room of peers, guided by a coach." (White) */}
      <Section bg="white" ariaLabelledBy="mm-peers-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <SectionHeading
              id="mm-peers-heading"
              eyebrow={peerRoom.eyebrow}
              title={peerRoom.heading}
            />
            <p className="mt-5 text-[18px] leading-[28px] text-[#475569]">
              {peerRoom.paragraphsBeforeCadence}
              {peerRoom.cadenceWord}
              {peerRoom.paragraphsAfterCadence}
            </p>

            <ul className="mt-6 space-y-3">
              {peerRoom.bulletPoints.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-[18px] leading-[28px] text-[#0F2340]">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#E8601C]" aria-hidden="true" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <PhotoPlaceholder
              caption={peerRoom.photoPlaceholder}
              src={PREVIEW_IMAGES.peerSession.src}
              alt={PREVIEW_IMAGES.peerSession.alt}
              previewCaption={PREVIEW_IMAGES.peerSession.caption}
              aspectClassName="aspect-[4/3]"
            />
          </div>
        </div>
      </Section>

      {/* 5. "Find the group that fits where you lead" — Three Circle Cards (Off-white) */}
      <Section id="circles" bg="offwhite" ariaLabelledBy="mm-circles-heading">
        <SectionHeading
          id="mm-circles-heading"
          eyebrow={circlesSection.eyebrow}
          title={circlesSection.heading}
          subtitle={circlesSection.subtitle}
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {circlesSection.circles.map((circle, idx) => (
            <Card
              key={circle.id}
              as="article"
              className={`flex flex-col justify-between ${
                idx === 0 ? 'ring-2 ring-[#0F2340]' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block rounded-md bg-[#F0A32E]/20 px-3 py-1 text-[14px] leading-[20px] font-semibold text-[#0F2340]">
                    {circle.cap}
                  </span>
                </div>

                <h3 className="mt-5 text-[22px] leading-[30px] lg:text-[24px] lg:leading-[32px] font-semibold text-[#0F2340]">
                  {circle.title}
                </h3>

                <dl className="mt-5 space-y-3.5 border-t border-slate-200/80 pt-5 text-[16px] leading-[24px]">
                  <div>
                    <dt className="text-[13px] font-semibold uppercase tracking-wider text-[#1E3A5F]">
                      Who it&apos;s for
                    </dt>
                    <dd className="mt-0.5 text-[#0F2340] font-medium">{circle.who}</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] font-semibold uppercase tracking-wider text-[#1E3A5F]">
                      Core focus
                    </dt>
                    <dd className="mt-0.5 text-[#475569]">{circle.focus}</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] font-semibold uppercase tracking-wider text-[#1E3A5F]">
                      Format &amp; cadence
                    </dt>
                    <dd className="mt-0.5 text-[#475569]">{circle.cadence}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => scrollToApplication(circle.id)}
                  className="inline-flex items-center gap-2 text-[18px] leading-[28px] font-semibold text-[#E8601C] hover:text-[#0F2340] transition-colors group cursor-pointer"
                >
                  <span>{circle.ctaLabel}</span>
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 6. "How your mastermind works" — 4 Numbered Steps (White) */}
      <Section bg="white" ariaLabelledBy="mm-how-heading">
        <SectionHeading
          id="mm-how-heading"
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.heading}
          align="center"
        />

        <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.steps.map((step) => (
            <Card key={step.step} className="h-full">
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

      {/* 7. "What's included" — Two-Column Checklist Card (Off-white) */}
      <Section bg="offwhite" ariaLabelledBy="mm-included-heading">
        <SectionHeading
          id="mm-included-heading"
          eyebrow={whatsIncluded.eyebrow}
          title={whatsIncluded.heading}
          align="center"
        />

        <Card className="mx-auto mt-10 max-w-4xl">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {whatsIncluded.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[18px] leading-[28px] text-[#0F2340]">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F0A32E]/20">
                  <Check className="h-4 w-4 text-[#E8601C]" aria-hidden="true" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      {/* 8. "Growth you can see, not just feel." — Full Navy Section + 4 Outcome Cards + Stat + CTA */}
      <Section bg="navy" ariaLabelledBy="mm-growth-heading">
        <SectionHeading
          id="mm-growth-heading"
          eyebrow="Measurable Impact"
          title={growthBand.heading}
          align="center"
          tone="dark"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHARED_OUTCOMES.map((outcome) => (
            <div
              key={outcome.title}
              className="rounded-xl border border-white/15 bg-[#1E3A5F]/65 p-7 text-left"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#0F2340]">
                <OutcomeIcon icon={outcome.icon} />
              </div>
              <h3 className="text-[22px] leading-[30px] font-semibold text-white">{outcome.title}</h3>
              <p className="mt-2.5 text-[16px] leading-[25px] text-slate-200">{outcome.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-[20px] leading-[30px] md:text-[24px] md:leading-[34px] font-semibold text-white">
            {growthBand.proofLine}
          </p>
          <div className="mt-6">
            <Button variant="primary" onClick={() => scrollToApplication()}>
              {growthBand.ctaLabel}
            </Button>
          </div>
        </div>
      </Section>

      {/* 9. "Led by Dr. Steve Steff" — Headshot Left, Bio + Pull Quote Right (White) */}
      <Section bg="white" ariaLabelledBy="mm-facilitator-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <PhotoPlaceholder
              caption={facilitator.photoPlaceholder}
              src={PREVIEW_IMAGES.portrait.src}
              alt={PREVIEW_IMAGES.portrait.alt}
              previewCaption={PREVIEW_IMAGES.portrait.caption}
              aspectClassName="aspect-[4/4]"
            />
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              id="mm-facilitator-heading"
              eyebrow={facilitator.eyebrow}
              title={facilitator.heading}
            />
            <p className="mt-5 text-[18px] leading-[28px] text-[#475569]">
              <PlaceholderText text={facilitator.bio} />
            </p>
            <blockquote className="mt-7 rounded-r-xl border-l-4 border-[#F0A32E] bg-[#F7F8FA] px-6 py-5 text-[20px] leading-[30px] font-semibold italic text-[#0F2340]">
              &ldquo;{facilitator.pullQuote}&rdquo;
            </blockquote>
          </div>
        </div>
      </Section>

      {/* 10. "What leaders say" — 3 Testimonial Cards (Off-white) */}
      <Section bg="offwhite" ariaLabelledBy="mm-testimonials-heading">
        <SectionHeading
          id="mm-testimonials-heading"
          eyebrow="Member Voices"
          title={testimonialsHeading}
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <TestimonialCard testimonial={TESTIMONIALS.gina} />
          <TestimonialCard testimonial={TESTIMONIALS.gary} />
          <TestimonialCard testimonial={TESTIMONIALS.ron} />
        </div>
      </Section>

      {/* 11. Pricing + FAQ Split (White) */}
      <Section bg="white" ariaLabelledBy="mm-faq-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <PricingCard
              onApplyClick={() => scrollToApplication()}
              onBookCallClick={onBookCall}
            />
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              id="mm-faq-heading"
              eyebrow="Straight Answers"
              title="Frequently asked questions"
              className="mb-8"
            />
            <Accordion items={faqs} defaultOpenIndex={0} />
          </div>
        </div>
      </Section>

      {/* 12. "Reserve your seat at the table." — Application Form + Sidebar (Off-white) */}
      <Section id="apply" bg="offwhite" ariaLabelledBy="mm-apply-heading">
        <SectionHeading
          id="mm-apply-heading"
          eyebrow="Confidential Application"
          title={applicationSection.heading}
          subtitle={applicationSection.subhead}
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Application Form */}
          <Card className="lg:col-span-8">
            {submittedApplicant ? (
              <div
                role="status"
                className="rounded-xl border border-[#1E3A5F]/20 bg-[#F7F8FA] p-8 text-center space-y-4"
              >
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#1E3A5F]" aria-hidden="true" />
                <h3 className="text-[24px] leading-[32px] font-semibold text-[#0F2340]">
                  Thank you, {submittedApplicant}. Your application is in.
                </h3>
                <p className="mx-auto max-w-lg text-[18px] leading-[28px] text-[#475569]">
                  <PlaceholderText text={applicationSection.responseTimeNote} /> Steve will reach out personally to
                  schedule your confidential fit conversation.
                </p>
                <div className="pt-2">
                  <Button variant="outline-navy" size="md" onClick={() => setSubmittedApplicant(null)}>
                    Submit Another Application
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField id="app-name" label="Name" required error={errors.name?.message}>
                    <input
                      id="app-name"
                      type="text"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'app-name-error' : undefined}
                      className={inputBaseClasses(Boolean(errors.name))}
                      placeholder="Jordan Taylor"
                      {...register('name', { required: 'Please enter your full name.' })}
                    />
                  </FormField>

                  <FormField id="app-email" label="Email" required error={errors.email?.message}>
                    <input
                      id="app-email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'app-email-error' : undefined}
                      className={inputBaseClasses(Boolean(errors.email))}
                      placeholder="jordan@company.com"
                      {...register('email', {
                        required: 'Please enter your email address.',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email address.'
                        }
                      })}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField id="app-phone" label="Phone" required error={errors.phone?.message}>
                    <input
                      id="app-phone"
                      type="tel"
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'app-phone-error' : undefined}
                      className={inputBaseClasses(Boolean(errors.phone))}
                      placeholder="(555) 234-5678"
                      {...register('phone', {
                        required: 'Please enter a direct phone number.',
                        minLength: { value: 7, message: 'Please enter a valid phone number.' }
                      })}
                    />
                  </FormField>

                  <FormField
                    id="app-title"
                    label="Title and company"
                    required
                    error={errors.titleAndCompany?.message}
                  >
                    <input
                      id="app-title"
                      type="text"
                      autoComplete="organization-title"
                      aria-invalid={Boolean(errors.titleAndCompany)}
                      aria-describedby={errors.titleAndCompany ? 'app-title-error' : undefined}
                      className={inputBaseClasses(Boolean(errors.titleAndCompany))}
                      placeholder="VP of Operations, Horizon Manufacturing"
                      {...register('titleAndCompany', {
                        required: 'Please enter your title and company.'
                      })}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    id="app-people"
                    label="People you lead"
                    required
                    error={errors.peopleYouLead?.message}
                  >
                    <select
                      id="app-people"
                      aria-invalid={Boolean(errors.peopleYouLead)}
                      aria-describedby={errors.peopleYouLead ? 'app-people-error' : undefined}
                      className={inputBaseClasses(Boolean(errors.peopleYouLead))}
                      {...register('peopleYouLead', {
                        required: 'Please select approximate team size.'
                      })}
                    >
                      <option value="">Select team / organization size...</option>
                      <option value="1–10">1–10 people</option>
                      <option value="11–50">11–50 people</option>
                      <option value="51–200">51–200 people</option>
                      <option value="201–1,000">201–1,000 people</option>
                      <option value="1,000+">1,000+ people</option>
                    </select>
                  </FormField>

                  <FormField
                    id="app-circle"
                    label="Which circle?"
                    required
                    error={errors.circle?.message}
                  >
                    <select
                      id="app-circle"
                      aria-invalid={Boolean(errors.circle)}
                      aria-describedby={errors.circle ? 'app-circle-error' : undefined}
                      className={inputBaseClasses(Boolean(errors.circle))}
                      {...register('circle', {
                        required: 'Please select which circle you are applying for.'
                      })}
                    >
                      <option value="">Choose a circle...</option>
                      {circlesSection.circles.map((circle) => (
                        <option key={circle.id} value={circle.id}>
                          {circle.title}
                        </option>
                      ))}
                      <option value="Not sure yet — help me decide">Not sure yet — help me decide</option>
                    </select>
                  </FormField>
                </div>

                <FormField
                  id="app-challenge"
                  label="Biggest leadership challenge you'd bring to the group"
                  required
                  error={errors.biggestChallenge?.message}
                >
                  <textarea
                    id="app-challenge"
                    rows={4}
                    aria-invalid={Boolean(errors.biggestChallenge)}
                    aria-describedby={errors.biggestChallenge ? 'app-challenge-error' : undefined}
                    className={inputBaseClasses(Boolean(errors.biggestChallenge))}
                    placeholder="Share a few sentences—kept strictly confidential..."
                    {...register('biggestChallenge', {
                      required: 'Please share a brief note on what you would bring to the group.',
                      minLength: {
                        value: 12,
                        message: 'Please include a short sentence so Steve can prepare for your conversation.'
                      }
                    })}
                  />
                </FormField>

                <FormField id="app-referral" label="How did you hear about us?">
                  <input
                    id="app-referral"
                    type="text"
                    className={inputBaseClasses(false)}
                    placeholder="Colleague referral, LinkedIn, podcast, search..."
                    {...register('referralSource')}
                  />
                </FormField>

                <div className="space-y-3 pt-2">
                  <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting Application...' : applicationSection.submitLabel}
                  </Button>
                  <p className="text-center text-[14px] leading-[20px] text-[#475569]">
                    {applicationSection.privacyNote}
                  </p>
                  {emailDraft && (
                    <div role="status" className="rounded-lg border border-[#1E3A5F]/25 bg-[#F7F8FA] p-5">
                      <h3 className="text-[18px] font-semibold text-[#0F2340]">
                        {applicationSection.previewTitle}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[22px] text-[#475569]">
                        {applicationSection.previewBody}
                      </p>
                      <a
                        href={emailDraft}
                        className="mt-4 inline-flex min-h-11 items-center text-[16px] font-semibold text-[#1E3A5F] underline underline-offset-4"
                      >
                        {applicationSection.previewCta}
                      </a>
                    </div>
                  )}
                </div>
              </form>
            )}
          </Card>

          {/* Right: "Prefer to talk first?" Sidebar */}
          <Card as="aside" className="lg:col-span-4 space-y-5 border-t-4 border-t-[#1E3A5F]">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F2340] text-[#F0A32E]">
              <PhoneCall className="h-5 w-5" aria-hidden="true" />
            </div>

            <h3 className="text-[24px] leading-[32px] font-semibold text-[#0F2340]">
              {applicationSection.sidebarHeading}
            </h3>

            <p className="text-[18px] leading-[28px] text-[#475569]">
              {applicationSection.sidebarBody}
            </p>

            <Button variant="outline-navy" fullWidth onClick={onBookCall}>
              {applicationSection.sidebarButton}
            </Button>

            <p className="border-t border-slate-200 pt-4 text-[14px] leading-[20px] text-[#475569]">
              <PlaceholderText text={applicationSection.responseTimeNote} />
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
};
