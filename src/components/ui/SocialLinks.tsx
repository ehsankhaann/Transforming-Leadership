import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../../content';

interface SocialLinksProps {
  tone?: 'light' | 'dark';
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ tone = 'light' }) => (
  <ul className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Social media">
    {SOCIAL_LINKS.map((link) => (
      <li key={link.label}>
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.label} (opens in a new tab)`}
          className={`inline-flex min-h-11 items-center gap-1 text-[14px] font-semibold underline-offset-4 transition-colors hover:underline ${
            tone === 'dark' ? 'text-slate-200 hover:text-white' : 'text-[#1E3A5F] hover:text-[#0F2340]'
          }`}
        >
          {link.label}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </li>
    ))}
  </ul>
);