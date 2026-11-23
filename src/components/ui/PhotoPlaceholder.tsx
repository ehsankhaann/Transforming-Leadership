import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface PhotoPlaceholderProps {
  caption: string;
  src?: string;
  alt?: string;
  aspectClassName?: string;
  tone?: 'light' | 'dark';
  priority?: boolean;
  previewCaption?: string;
  className?: string;
}

/**
 * Shows a supplied portrait or stock preview, falling back to the original
 * placeholder only if an image cannot load.
 */
export const PhotoPlaceholder: React.FC<PhotoPlaceholderProps> = ({
  caption,
  src,
  alt,
  aspectClassName = 'aspect-[4/5]',
  tone = 'light',
  priority = false,
  previewCaption,
  className = ''
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  if (src && !imageFailed) {
    return (
      <figure className={`min-w-0 ${className}`}>
        <div className={`overflow-hidden rounded-xl bg-[#1E3A5F] ${aspectClassName}`}>
          <img
            src={src}
            alt={alt || caption.replace(/^\[Photo:\s*|\s*\]$/g, '')}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            decoding="async"
            width={1200}
            height={900}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover photo-preview-motion"
          />
        </div>
        {previewCaption && (
          <figcaption className={`mt-2 text-[12px] leading-[18px] ${tone === 'dark' ? 'text-slate-300' : 'text-[#475569]'}`}>
            {previewCaption}
          </figcaption>
        )}
      </figure>
    );
  }

  const containerStyle =
    tone === 'dark'
      ? 'bg-[#1E3A5F]/65 border-2 border-dashed border-white/25 text-slate-200'
      : 'bg-slate-200/75 border-2 border-dashed border-slate-300 text-[#0F2340]';

  return (
    <div
      role="img"
      aria-label={alt || caption}
      className={`relative flex flex-col items-center justify-center rounded-xl p-6 text-center ${aspectClassName} ${containerStyle} ${className}`}
    >
      <div
        className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${
          tone === 'dark' ? 'bg-[#0F2340]/80 text-[#F0A32E]' : 'bg-white text-[#1E3A5F] shadow-xs'
        }`}
      >
        <ImageIcon className="h-6 w-6" aria-hidden="true" />
      </div>
      <span className={`text-[14px] leading-[20px] ${tone === 'dark' ? 'text-slate-200' : 'text-[#475569]'}`}>
        {caption}
      </span>
    </div>
  );
};
