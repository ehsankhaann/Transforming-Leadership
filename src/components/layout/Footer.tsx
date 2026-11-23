import React from 'react';
import { SITE_CONFIG } from '../../content';
import { AppLink } from '../../lib/router';
import { SocialLinks } from '../ui/SocialLinks';

interface FooterProps {
  onBookCall: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookCall }) => {
  return (
    <footer className="bg-[#0B1622] text-slate-300 border-t border-white/10">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand Blurb */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E3A5F] text-[14px] font-bold text-white">
                TL
              </span>
              <span className="text-[17px] leading-[24px] font-bold text-white">
                {SITE_CONFIG.siteName}
              </span>
            </div>
            <p className="text-[14px] leading-[22px] text-slate-300">{SITE_CONFIG.footer.blurb}</p>
            <SocialLinks tone="dark" />
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h2 className="text-[14px] leading-[20px] font-semibold uppercase tracking-[0.08em] text-[#F0A32E] mb-4">
              Navigation
            </h2>
            <ul className="space-y-2.5 text-[15px] leading-[22px]">
              <li>
                <AppLink href="/" className="hover:text-white transition-colors">
                  Home
                </AppLink>
              </li>
              {SITE_CONFIG.nav.map((item) => (
                <li key={item.href}>
                  <AppLink href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h2 className="text-[14px] leading-[20px] font-semibold uppercase tracking-[0.08em] text-[#F0A32E] mb-4">
              Contact
            </h2>
            <ul className="space-y-2.5 text-[14px] leading-[22px]">
              <li>
                <span className="block text-slate-400">Email Steve</span>
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="inline-block py-1 text-slate-100 hover:text-white hover:underline underline-offset-4 break-all"
                >
                  {SITE_CONFIG.contactEmail}
                </a>
              </li>
              <li>
                <span className="block text-slate-400">Phone</span>
                <a
                  href={SITE_CONFIG.contactPhoneHref}
                  className="inline-block py-1 text-slate-100 hover:text-white hover:underline underline-offset-4"
                >
                  {SITE_CONFIG.contactPhone}
                </a>
              </li>
              <li>
                <span className="block text-slate-400">Practice</span>
                <span className="text-slate-100">{SITE_CONFIG.locationLabel}</span>
              </li>
              <li>
                <AppLink href="/about#contact" className="inline-block py-1 text-slate-100 hover:text-white hover:underline underline-offset-4">
                  Contact Steve
                </AppLink>
              </li>
              <li className="pt-1">
                <button
                  type="button"
                  onClick={onBookCall}
                  className="font-semibold text-[#F0A32E] underline underline-offset-4 hover:text-white cursor-pointer"
                >
                  {SITE_CONFIG.primaryCallCta} &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h2 className="text-[14px] leading-[20px] font-semibold uppercase tracking-[0.08em] text-[#F0A32E] mb-4">
              Legal &amp; Ethics
            </h2>
            <ul className="space-y-2.5 text-[14px] leading-[22px]">
              {SITE_CONFIG.footer.legalLinks.map((link) => (
                <li key={link.label}>
                  <AppLink href={link.href} className="inline-block py-1 hover:text-white transition-colors hover:underline underline-offset-4">
                    {link.label}
                  </AppLink>
                </li>
              ))}
              <li className="text-slate-400 pt-1">
                ICF Code of Ethics &amp; strict executive confidentiality.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[14px] leading-[20px] text-slate-400">
          <p>{SITE_CONFIG.footer.copyright}</p>
          <p>Led by {SITE_CONFIG.coachName}</p>
        </div>
      </div>
    </footer>
  );
};
