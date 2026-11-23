import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Mail, Phone, X } from 'lucide-react';
import { BOOKING_CONTENT, SITE_CONFIG } from '../../content';
import { CallRequestPayload, submitCallRequest } from '../../lib/supabase';
import { Button } from '../ui/Button';
import { FormField, inputBaseClasses } from '../ui/FormField';
import { useToast } from '../ui/Toast';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookCallModal: React.FC<BookCallModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const [emailDraft, setEmailDraft] = useState<string | null>(null);
  const hasCalendar = /^https?:\/\//.test(SITE_CONFIG.bookingCalendarUrl);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CallRequestPayload>({
    defaultValues: {
      name: '',
      email: '',
      role: '',
      interest: 'Executive Coaching',
      notes: ''
    }
  });

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const dialog = dialogRef.current;
    const selector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';
    dialog?.querySelector<HTMLElement>(selector)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      const focusables = dialog ? Array.from(dialog.querySelectorAll<HTMLElement>(selector)) : [];
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

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onSubmit = async (values: CallRequestPayload) => {
    try {
      const result = await submitCallRequest(values);
      if (result.mode === 'preview') {
        const subject = '20-minute conversation with Steve Steff';
        const body = [
          `Name: ${values.name}`,
          `Email: ${values.email}`,
          `Title and company: ${values.role}`,
          `Interested in: ${values.interest}`,
          `Notes: ${values.notes || 'None provided'}`
        ].join('\n');
        setEmailDraft(`mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        showToast('success', 'Email draft ready.', 'Nothing has been sent. Use the email link in the dialog to finish.');
        return;
      }

      showToast(
        'success',
        '20-minute call request received.',
        'Steve will reply personally with calendar times within [2] business days.'
      );
      setEmailDraft(null);
      reset();
      onClose();
    } catch (err) {
      showToast(
        'error',
        'Could not send call request.',
        err instanceof Error ? err.message : 'Please try again.'
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#0B1622]/75 p-4 backdrop-blur-xs overflow-y-auto sm:items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-call-modal-title"
        className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <img
              src={SITE_CONFIG.coachImageSrc}
              alt=""
              loading="lazy"
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
            <div>
              <p className="text-[13px] leading-[18px] font-semibold uppercase tracking-[0.08em] text-[#1E3A5F]">
                {BOOKING_CONTENT.eyebrow}
              </p>
              <h2
                id="book-call-modal-title"
                className="mt-1 text-[24px] leading-[32px] font-semibold text-[#0F2340]"
              >
                {BOOKING_CONTENT.heading}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking dialog"
            className="rounded-lg p-2 text-[#475569] hover:bg-[#F7F8FA] hover:text-[#0F2340] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 space-y-3 border-y border-slate-200 py-4 text-[14px] leading-[20px] text-[#475569]">
          {hasCalendar && (
            <a
              href={SITE_CONFIG.bookingCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-[#0F2340] hover:underline underline-offset-4"
            >
              <Calendar className="h-4 w-4 text-[#E8601C]" aria-hidden="true" />
              {BOOKING_CONTENT.calendarLabel}
            </a>
          )}
          <p>{BOOKING_CONTENT.directContactIntro}</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-5">
            <a
              href={`mailto:${SITE_CONFIG.contactEmail}`}
              className="inline-flex min-h-10 items-center gap-2 font-semibold text-[#1E3A5F] hover:underline underline-offset-4"
            >
              <Mail className="h-4 w-4" aria-hidden="true" /> {SITE_CONFIG.contactEmail}
            </a>
            <a
              href={SITE_CONFIG.contactPhoneHref}
              className="inline-flex min-h-10 items-center gap-2 font-semibold text-[#1E3A5F] hover:underline underline-offset-4"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {SITE_CONFIG.contactPhone}
            </a>
          </div>
        </div>

        <p className="mt-5 text-[14px] font-semibold text-[#0F2340]">{BOOKING_CONTENT.requestLabel}</p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
          <FormField id="call-name" label="Your name" required error={errors.name?.message}>
            <input
              id="call-name"
              type="text"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'call-name-error' : undefined}
              className={inputBaseClasses(Boolean(errors.name))}
              placeholder="Alex Morgan"
              {...register('name', { required: 'Please enter your name.' })}
            />
          </FormField>

          <FormField id="call-email" label="Work email" required error={errors.email?.message}>
            <input
              id="call-email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'call-email-error' : undefined}
              className={inputBaseClasses(Boolean(errors.email))}
              placeholder="alex@company.com"
              {...register('email', {
                required: 'Please enter your email address.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address.'
                }
              })}
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField id="call-role" label="Title & company" required error={errors.role?.message}>
              <input
                id="call-role"
                type="text"
                aria-invalid={Boolean(errors.role)}
                aria-describedby={errors.role ? 'call-role-error' : undefined}
                className={inputBaseClasses(Boolean(errors.role))}
                placeholder="VP Operations, Acme"
                {...register('role', { required: 'Please share your role.' })}
              />
            </FormField>

            <FormField id="call-interest" label="What are you exploring?">
              <select
                id="call-interest"
                className={inputBaseClasses(false)}
                {...register('interest')}
              >
                <option value="Executive Coaching">Executive Coaching (1:1)</option>
                <option value="Mastermind Groups">Mastermind Groups</option>
                <option value="Not sure yet">Not sure yet — let&apos;s discuss</option>
              </select>
            </FormField>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Sending Request...' : BOOKING_CONTENT.submitLabel}
            </Button>
          </div>
          {emailDraft && (
            <div role="status" className="rounded-lg border border-[#1E3A5F]/25 bg-[#F7F8FA] p-4">
              <p className="font-semibold text-[#0F2340]">{BOOKING_CONTENT.previewTitle}</p>
              <p className="mt-1 text-[14px] leading-[22px] text-[#475569]">{BOOKING_CONTENT.previewBody}</p>
              <a href={emailDraft} className="mt-3 inline-flex min-h-11 items-center font-semibold text-[#1E3A5F] underline underline-offset-4">
                {BOOKING_CONTENT.previewCta}
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
