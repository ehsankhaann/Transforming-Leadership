import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { INSIGHTS_INDEX_CONTENT, INSIGHTS_POSTS, InsightPost } from '../content';
import { AppLink } from '../lib/router';
import { CTABand } from '../components/layout/CTABand';
import { Card } from '../components/ui/Card';
import { PhotoPlaceholder } from '../components/ui/PhotoPlaceholder';
import { Section } from '../components/ui/Section';

interface InsightsIndexPageProps {
  onBookCall: () => void;
}

const CATEGORIES: Array<'All' | InsightPost['category']> = [
  'All',
  'Leadership Habits',
  'Strategic Alignment',
  'Visioning'
];

export const InsightsIndexPage: React.FC<InsightsIndexPageProps> = ({ onBookCall }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | InsightPost['category']>('All');

  const filteredPosts =
    selectedCategory === 'All'
      ? INSIGHTS_POSTS
      : INSIGHTS_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* 1. Header + Category Filter Chips (Off-white) */}
      <Section bg="offwhite">
        <div className="max-w-3xl">
          <p className="text-[14px] leading-[20px] font-semibold uppercase tracking-[0.08em] text-[#1E3A5F]">
            {INSIGHTS_INDEX_CONTENT.eyebrow}
          </p>
          <h1 className="mt-3 text-[38px] leading-[46px] md:text-[48px] md:leading-[56px] lg:text-[56px] lg:leading-[64px] font-bold tracking-tight text-[#0F2340]">
            {INSIGHTS_INDEX_CONTENT.heading}
          </h1>
          <p className="mt-5 text-[18px] leading-[28px] text-[#475569]">
            {INSIGHTS_INDEX_CONTENT.intro}
          </p>

          <div
            role="group"
            aria-label="Filter insights by topic"
            className="mt-8 flex flex-wrap items-center gap-2.5"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-4 py-2 text-[14px] leading-[20px] font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0F2340] text-white'
                      : 'bg-white text-[#475569] border border-slate-300 hover:border-[#0F2340] hover:text-[#0F2340]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      {/* 2. Grid of 3 Post Cards (White) */}
      <Section bg="white" ariaLabelledBy="insights-grid-heading">
        <h2 id="insights-grid-heading" className="sr-only">
          Published articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.slug} as="article" className="flex flex-col justify-between p-0 overflow-hidden interactive-card">
              <div>
                <PhotoPlaceholder
                  caption={post.heroCaption}
                  src={post.previewImage}
                  alt={post.previewAlt}
                  aspectClassName="aspect-[16/10] rounded-none border-x-0 border-t-0"
                />
                <div className="p-8 pb-4">
                  <div className="flex items-center gap-2.5 text-[14px] leading-[20px] text-[#475569]">
                    <span className="rounded bg-[#F0A32E]/20 px-2.5 py-0.5 font-semibold text-[#0F2340]">
                      {post.category}
                    </span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="mt-4 text-[22px] leading-[30px] lg:text-[24px] lg:leading-[32px] font-semibold text-[#0F2340]">
                    <AppLink
                      href={`/insights/${post.slug}`}
                      className="hover:text-[#E8601C] transition-colors"
                    >
                      {post.title}
                    </AppLink>
                  </h3>

                  <p className="mt-3 text-[16px] leading-[26px] text-[#475569]">{post.excerpt}</p>
                </div>
              </div>

              <div className="px-8 pb-8 pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                <time dateTime={post.isoDate} className="text-[14px] leading-[20px] text-[#475569]">
                  {post.date}
                </time>
                <AppLink
                  href={`/insights/${post.slug}`}
                  aria-label={`Read article: ${post.title}`}
                  className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#E8601C] hover:text-[#0F2340] group"
                >
                  <span>Read</span>
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

      {/* 3. Closing CTA Band (Single full-navy section) */}
      <CTABand onBookCall={onBookCall} />
    </>
  );
};
