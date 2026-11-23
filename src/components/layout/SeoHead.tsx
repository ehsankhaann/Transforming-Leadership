import React, { useEffect } from 'react';
import {
  INSIGHTS_POSTS,
  MASTERMIND_CONTENT,
  ROUTE_META,
  SOCIAL_LINKS,
  SITE_CONFIG
} from '../../content';

interface SeoHeadProps {
  pathname: string;
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export const SeoHead: React.FC<SeoHeadProps> = ({ pathname }) => {
  useEffect(() => {
    const postSlug = pathname.startsWith('/insights/') ? pathname.replace('/insights/', '') : null;
    const post = postSlug ? INSIGHTS_POSTS.find((p) => p.slug === postSlug) : undefined;

    const meta = post
      ? {
          title: `${post.title} | Insights — Transforming Leadership`,
          description: post.excerpt,
          canonicalPath: `/insights/${post.slug}`,
          ogType: 'article' as const
        }
      : ROUTE_META[pathname] || ROUTE_META['/'];

    document.title = meta.title;
    const fullUrl = `${SITE_CONFIG.siteUrl}${meta.canonicalPath}`;

    setMetaTag('name', 'description', meta.description);
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:type', meta.ogType || 'website');
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:image', `${SITE_CONFIG.siteUrl}${SITE_CONFIG.coachImageSrc}`);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);
  }, [pathname]);

  // Build route-appropriate JSON-LD Structured Data (Organization, Person, Service, FAQPage, Article)
  const baseGraph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.siteUrl}/#organization`,
      name: SITE_CONFIG.siteName,
      url: SITE_CONFIG.siteUrl,
      founder: { '@id': `${SITE_CONFIG.siteUrl}/#person` }
    },
    {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.siteUrl}/#person`,
      name: SITE_CONFIG.coachName,
      jobTitle: 'Executive Coach & Founder',
      worksFor: { '@id': `${SITE_CONFIG.siteUrl}/#organization` },
      image: `${SITE_CONFIG.siteUrl}${SITE_CONFIG.coachImageSrc}`,
      sameAs: SOCIAL_LINKS[0].href,
      description: 'Doctorate in Workplace Leadership and Ethics, Master’s in Counseling, ICF-certified coach'
    }
  ];

  if (pathname === '/executive-coaching') {
    baseGraph.push({
      '@type': 'Service',
      name: 'One-on-One Executive Coaching',
      provider: { '@id': `${SITE_CONFIG.siteUrl}/#person` },
      audience: 'Senior Executives, C-Suite Leaders, and Vice Presidents',
      url: `${SITE_CONFIG.siteUrl}/executive-coaching`
    });
  }

  if (pathname === '/mastermind-groups') {
    baseGraph.push({
      '@type': 'Service',
      name: 'Executive Mastermind Groups',
      provider: { '@id': `${SITE_CONFIG.siteUrl}/#person` },
      description: MASTERMIND_CONTENT.hero.subhead,
      url: `${SITE_CONFIG.siteUrl}/mastermind-groups`
    });
    baseGraph.push({
      '@type': 'FAQPage',
      mainEntity: MASTERMIND_CONTENT.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
    });
  }

  if (pathname.startsWith('/insights/')) {
    const slug = pathname.replace('/insights/', '');
    const post = INSIGHTS_POSTS.find((p) => p.slug === slug);
    if (post) {
      baseGraph.push({
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.isoDate,
        author: { '@id': `${SITE_CONFIG.siteUrl}/#person` },
        publisher: { '@id': `${SITE_CONFIG.siteUrl}/#organization` }
      });
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': baseGraph
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
