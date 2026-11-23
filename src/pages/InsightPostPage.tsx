import React from 'react';
import { ArrowLeft, ArrowRight, Link2, Mail, Share2 } from 'lucide-react';
import { INSIGHTS_POSTS, SITE_CONFIG } from '../content';
import { AppLink } from '../lib/router';
import { CTABand } from '../components/layout/CTABand';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PhotoPlaceholder } from '../components/ui/PhotoPlaceholder';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useToast } from '../components/ui/Toast';

interface InsightPostPageProps {
  slug: string;
  onBookCall: () => void;
}

export const InsightPostPage: React.FC<InsightPostPageProps> = ({ slug, onBookCall }) => {
  const { showToast } = useToast();
  const post = INSIGHTS_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Section bg="offwhite">
        <div className="mx-auto max-w-xl text-center space-y-5">
          <h1 className="text-[36px] leading-[44px] font-bold text-[#0F2340]">Article not found</h1>
          <p className="text-[18px] leading-[28px] text-[#475569]">
            That article link may have moved. Browse all published insights below.
          </p>
          <Button variant="primary" href="/insights">
            Back to Insights
          </Button>
        </div>
      </Section>
    );
  }

  const morePosts = INSIGHTS_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  const canonicalUrl = `${SITE_CONFIG.siteUrl}/insights/${post.slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      showToast('success', 'Article link copied to clipboard.');
    } catch {
      showToast('success', 'Share URL ready:', canonicalUrl);
    }
  };

  return (
    <>
      {/* 1. Article Header & Byline (Off-white) */}
      <Section bg="offwhite">
        <div className="mx-auto max-w-3xl">
          <AppLink
            href="/insights"
            className="inline-flex items-center gap-2 text-[14px] leading-[20px] font-semibold text-[#1E3A5F] hover:text-[#E8601C]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>All Insights</span>
          </AppLink>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-[14px] leading-[20px] text-[#475569]">
            <span className="rounded bg-[#F0A32E]/25 px-3 py-1 font-semibold text-[#0F2340]">
              {post.category}
            </span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="mt-4 text-[34px] leading-[42px] md:text-[44px] md:leading-[52px] lg:text-[48px] lg:leading-[56px] font-bold tracking-tight text-[#0F2340]">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5 text-[14px] leading-[20px] text-[#475569]">
            <div>
              By{' '}
              <AppLink href="/about" className="font-semibold text-[#0F2340] hover:underline">
                {SITE_CONFIG.coachName}
              </AppLink>{' '}
              &middot; <time dateTime={post.isoDate}>{post.date}</time>
            </div>

            {/* Share Links */}
            <div className="flex items-center gap-2" aria-label="Share this article">
              <span className="inline-flex items-center gap-1 text-[#475569] mr-1">
                <Share2 className="h-4 w-4" aria-hidden="true" />
                Share:
              </span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 bg-white px-3 py-1.5 font-medium text-[#0F2340] hover:border-[#0F2340]"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(
                  `${post.excerpt}\n\n${canonicalUrl}`
                )}`}
                aria-label="Share via Email"
                className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 font-medium text-[#0F2340] hover:border-[#0F2340]"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Email</span>
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 font-medium text-[#0F2340] hover:border-[#0F2340] cursor-pointer"
              >
                <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Article Body (White) */}
      <Section bg="white">
        <article className="mx-auto max-w-3xl">
          <PhotoPlaceholder
            caption={post.heroCaption}
            src={post.previewImage}
            alt={post.previewAlt}
            aspectClassName="aspect-[16/9]"
            className="mb-10"
            priority
          />

          <div className="space-y-8 text-[18px] leading-[28px] text-[#475569]">
            {post.sections.map((section, idx) => (
              <div key={idx} className="space-y-5">
                {section.heading && (
                  <h2 className="pt-2 text-[26px] leading-[34px] lg:text-[30px] lg:leading-[38px] font-bold text-[#0F2340]">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
                {idx === 0 && (
                  <blockquote className="my-8 rounded-r-xl border-l-4 border-[#F0A32E] bg-[#F7F8FA] px-6 py-5 text-[20px] leading-[30px] font-semibold italic text-[#0F2340]">
                    &ldquo;{post.pullQuote}&rdquo;
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        </article>
      </Section>

      {/* 3. "More insights" Grid of 2 (Off-white) */}
      <Section bg="offwhite" ariaLabelledBy="more-insights-heading">
        <SectionHeading id="more-insights-heading" eyebrow="Keep Reading" title="More insights" />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {morePosts.map((related) => (
            <Card key={related.slug} as="article" className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[14px] leading-[20px] text-[#475569]">
                  <span className="rounded bg-[#F0A32E]/20 px-2.5 py-0.5 font-semibold text-[#0F2340]">
                    {related.category}
                  </span>
                  <span>&middot;</span>
                  <span>{related.readTime}</span>
                </div>
                <h3 className="mt-3 text-[22px] leading-[30px] lg:text-[24px] lg:leading-[32px] font-semibold text-[#0F2340]">
                  <AppLink href={`/insights/${related.slug}`} className="hover:text-[#E8601C]">
                    {related.title}
                  </AppLink>
                </h3>
                <p className="mt-2.5 text-[16px] leading-[26px] text-[#475569]">{related.excerpt}</p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <AppLink
                  href={`/insights/${related.slug}`}
                  className="inline-flex items-center gap-2 text-[16px] font-semibold text-[#E8601C] hover:text-[#0F2340] group"
                >
                  <span>Read article</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </AppLink>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 4. Book a Call CTA Band (Single full-navy section) */}
      <CTABand onBookCall={onBookCall} />
    </>
  );
};
