import React from 'react';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { CONTACT_CONTENT, SITE_CONFIG } from '../../content';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { SocialLinks } from '../ui/SocialLinks';

interface ContactSectionProps {
  onBookCall: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onBookCall }) => {
  const emailHref = `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(CONTACT_CONTENT.emailSubject)}`;

  return (
    <Section id="contact" bg="offwhite" ariaLabelledBy="contact-heading">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHeading
            id="contact-heading"
            eyebrow={CONTACT_CONTENT.eyebrow}
            title={CONTACT_CONTENT.heading}
            subtitle={CONTACT_CONTENT.intro}
          />
          <div className="mt-8">
            <Button onClick={onBookCall}>{CONTACT_CONTENT.bookingLabel}</Button>
          </div>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          <div className="py-5">
            <p className="flex items-center gap-2 text-[14px] font-semibold text-[#1E3A5F]">
              <Mail className="h-4 w-4" aria-hidden="true" /> {CONTACT_CONTENT.emailLabel}
            </p>
            <a
              href={emailHref}
              className="mt-2 inline-flex max-w-full items-center gap-2 break-all text-[20px] font-semibold text-[#0F2340] hover:underline underline-offset-4"
            >
              {SITE_CONFIG.contactEmail}
              <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
            </a>
          </div>
          <div className="py-5">
            <p className="flex items-center gap-2 text-[14px] font-semibold text-[#1E3A5F]">
              <Phone className="h-4 w-4" aria-hidden="true" /> {CONTACT_CONTENT.phoneLabel}
            </p>
            <a
              href={SITE_CONFIG.contactPhoneHref}
              className="mt-2 inline-block text-[20px] font-semibold text-[#0F2340] hover:underline underline-offset-4"
            >
              {SITE_CONFIG.contactPhone}
            </a>
          </div>
          <div className="py-5">
            <p className="text-[14px] font-semibold text-[#1E3A5F]">{CONTACT_CONTENT.socialHeading}</p>
            <div className="mt-1">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};