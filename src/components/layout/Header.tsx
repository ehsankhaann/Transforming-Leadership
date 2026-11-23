import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '../../content';
import { AppLink, useRouter } from '../../lib/router';
import { Button } from '../ui/Button';

interface HeaderProps {
  onBookCall: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookCall }) => {
  const { pathname } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDialogRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Trap focus and listen for Escape when full-screen mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const dialog = mobileDialogRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = dialog
      ? Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
      : [];

    focusables[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/insights' ? pathname === '/insights' || pathname.startsWith('/insights/') : pathname === href;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#0F2340] focus:px-4 focus:py-2.5 focus:text-white focus:font-semibold"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 w-full max-w-[1120px] items-center justify-between gap-4 px-5 sm:px-8">
          {/* Brand Logo */}
          <AppLink
            href="/"
            className="group flex items-center gap-3 rounded-lg py-1 text-left"
            aria-label="Transforming Leadership — Home"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0F2340] text-[15px] font-bold tracking-wider text-white transition-colors group-hover:bg-[#1E3A5F]">
              TL
            </span>
            <span className="hidden flex-col sm:flex">
              <span className="text-[16px] leading-[20px] font-bold tracking-tight text-[#0F2340]">
                {SITE_CONFIG.siteName}
              </span>
              <span className="text-[13px] leading-[18px] text-[#475569]">{SITE_CONFIG.coachName}</span>
            </span>
          </AppLink>

          {/* Desktop Primary Navigation */}
          <nav aria-label="Primary" className="hidden xl:flex items-center gap-5">
            {SITE_CONFIG.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <AppLink
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative py-2 text-[16px] leading-[24px] font-medium transition-colors ${
                    active
                      ? 'text-[#0F2340] font-semibold after:absolute after:inset-x-0 after:bottom-0 after:h-[2.5px] after:rounded-full after:bg-[#E8601C]'
                      : 'text-[#475569] hover:text-[#0F2340]'
                  }`}
                >
                  {item.label}
                </AppLink>
              );
            })}
          </nav>

          {/* Desktop Right Sticky CTA */}
          <div className="hidden xl:flex items-center gap-4">
            <AppLink
              href="/about#contact"
              className="text-[16px] font-semibold text-[#0F2340] hover:text-[#1E3A5F] hover:underline underline-offset-4"
            >
              Contact
            </AppLink>
            <Button variant="primary" size="md" onClick={onBookCall}>
              {SITE_CONFIG.headerCtaLabel}
            </Button>
          </div>

          {/* The booking CTA stays visible even before opening the mobile menu. */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={onBookCall}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#E8601C] px-3 text-[19px] leading-[24px] font-bold text-white hover:bg-[#cf5113] cursor-pointer"
            >
              Book a Call
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-fullscreen-menu"
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 text-[#0F2340] hover:bg-[#F7F8FA] cursor-pointer"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Focus-Trapped Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-fullscreen-menu"
          ref={mobileDialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="mobile-menu-enter fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[#0F2340] px-6 py-6 text-white xl:hidden"
        >
          <div className="flex items-center justify-between border-b border-white/15 pb-5">
            <AppLink
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E3A5F] text-[15px] font-bold">
                TL
              </span>
              <span className="text-[16px] font-bold">{SITE_CONFIG.siteName}</span>
            </AppLink>

            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => {
                setMobileOpen(false);
                menuButtonRef.current?.focus();
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/25 text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile Primary" className="my-auto flex flex-col gap-3 sm:gap-5 py-8">
            <AppLink
              href="/"
              aria-current={pathname === '/' ? 'page' : undefined}
              className={`text-[26px] leading-[34px] font-bold ${
                pathname === '/' ? 'text-[#F0A32E]' : 'text-white hover:text-[#F0A32E]'
              }`}
            >
              Home
            </AppLink>
            {SITE_CONFIG.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <AppLink
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`text-[26px] leading-[34px] font-bold ${
                    active ? 'text-[#F0A32E]' : 'text-white hover:text-[#F0A32E]'
                  }`}
                >
                  {item.label}
                </AppLink>
              );
            })}
            <AppLink
              href="/about#contact"
              className="text-[26px] leading-[34px] font-bold text-white hover:text-[#F0A32E]"
            >
              Contact
            </AppLink>
          </nav>

          <div className="border-t border-white/15 pt-6">
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setMobileOpen(false);
                onBookCall();
              }}
            >
              {SITE_CONFIG.primaryCallCta}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
