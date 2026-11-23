import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  required = false,
  error,
  hint,
  children
}) => {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-[15px] leading-[22px] font-semibold text-[#0F2340]">
        {label}
        {required && (
          <span className="ml-1 text-[#E8601C]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="text-[14px] leading-[20px] text-[#475569]">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-[14px] leading-[20px] font-medium text-[#0F2340]"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-[#E8601C]" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export const inputBaseClasses = (hasError?: boolean) =>
  `w-full rounded-lg border px-4 py-3 text-[16px] leading-[24px] text-[#0F2340] bg-white placeholder:text-slate-400 transition-colors ${
    hasError
      ? 'border-[#E8601C] bg-[#F7F8FA]'
      : 'border-slate-300 hover:border-[#1E3A5F] focus:border-[#0F2340]'
  }`;
