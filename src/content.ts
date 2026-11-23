export interface RouteMeta {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
}

export interface NavItem {
  label: string;
  href: string;
}

export interface LogoItem {
  id: string;
  placeholderLabel: string;
  name: string;
  imageSrc?: string;
}

export interface Testimonial {
  id: 'gina' | 'gary' | 'ron';
  quote: string;
  author: string;
  role: string;
}

export interface ProblemColumn {
  icon: 'compass' | 'message-off' | 'home';
  title: string;
  description: string;
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
}

export interface OutcomeItem {
  icon: 'target' | 'users' | 'scale' | 'sun';
  title: string;
  description: string;
}

export interface MastermindCircle {
  id: string;
  title: string;
  who: string;
  focus: string;
  cadence: string;
  cap: string;
  ctaLabel: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface InsightPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  readTime: string;
  category: 'Leadership Habits' | 'Strategic Alignment' | 'Visioning';
  heroCaption: string;
  previewImage: string;
  previewAlt: string;
  pullQuote: string;
  sections: {
    heading?: string;
    paragraphs: string[];
  }[];
}

export const SITE_CONFIG = {
  siteName: 'Transforming Leadership',
  siteUrl: 'https://www.tleadership.com',
  coachName: 'Dr. Steve Steff',
  coachImageSrc: '/images/steve-steff.jpg',
  formEndpoint: '[FORM_ENDPOINT]',
  bookingCalendarUrl: '[BOOKING_CALENDAR_URL]',
  supabaseTableApplications: 'mastermind_applications',
  supabaseTableCalls: 'call_requests',
  contactEmail: 'info@tleadership.com',
  contactPhone: '866.900.9009',
  contactPhoneHref: 'tel:+18669009009',
  locationLabel: 'Serving leaders across North America',
  headerCtaLabel: 'Book a Call',
  primaryCallCta: 'Book a 20-Minute Call',
  nav: [
    { label: 'Executive Coaching', href: '/executive-coaching' },
    { label: 'Mastermind Groups', href: '/mastermind-groups' },
    { label: 'About', href: '/about' },
    { label: 'Insights', href: '/insights' }
  ] as NavItem[],
  footer: {
    blurb:
      'Transforming Leadership is the executive coaching practice of Dr. Steve Steff. I partner with senior executives and vice presidents through one-on-one coaching and confidential peer mastermind groups.',
    legalLinks: [
      { label: 'Request privacy information', href: 'mailto:info@tleadership.com?subject=Privacy%20information' },
      { label: 'Request terms of use', href: 'mailto:info@tleadership.com?subject=Terms%20of%20use' }
    ],
    copyright: `© ${new Date().getFullYear()} Transforming Leadership. All rights reserved.`
  }
};

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ssteff/' },
  { label: 'Facebook', href: 'https://www.facebook.com/Transforming-Leadership-364426123653110/' },
  { label: 'X', href: 'https://twitter.com/TLeadershipCo' }
] as const;

// The portrait is the client-supplied headshot; other photography remains Unsplash preview imagery.
export const PREVIEW_IMAGES = {
  portrait: {
    src: '/images/steve-steff.jpg',
    alt: 'Dr. Steve Steff, founder and executive coach at Transforming Leadership',
    caption: ''
  },
  coaching: {
    src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1100&q=78',
    alt: 'Unsplash preview of business professionals in a facilitated meeting',
    caption: 'Unsplash preview photo — replace with an approved coaching image.'
  },
  mastermindHero: {
    src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1920&q=76',
    alt: 'Unsplash preview of a group meeting around a table'
  },
  peerSession: {
    src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=78',
    alt: 'Unsplash preview of a peer discussion in a meeting room',
    caption: 'Unsplash preview photo — replace with a facilitated-session photo.'
  }
} as const;

export const CONTACT_CONTENT = {
  eyebrow: 'Get in Touch',
  heading: 'A real conversation starts here.',
  intro: 'Reach Steve directly to ask about coaching, find your mastermind circle, or arrange a confidential conversation.',
  emailLabel: 'Email',
  phoneLabel: 'Call',
  socialHeading: 'Connect with Steve',
  bookingLabel: 'Book a 20-Minute Call',
  emailSubject: 'A conversation about executive coaching'
};

export const BOOKING_CONTENT = {
  eyebrow: 'A Private First Conversation',
  heading: 'Book a 20-minute call with Steve.',
  calendarLabel: 'Open the booking calendar',
  directContactIntro: 'Questions first? Reach Steve directly by email or phone.',
  requestLabel: 'Or request a time below',
  submitLabel: 'Request my 20-minute call',
  previewTitle: 'Your email draft is ready.',
  previewBody: 'Preview mode: no request has been sent. Open your email app below to send your details, or connect Supabase before launch.',
  previewCta: 'Open email app to send request'
};

export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Transforming Leadership | Lead with Clarity. Perform at Your Best.',
    description:
      'Confidential one-on-one executive coaching and peer mastermind groups for senior executives and vice presidents. Led by Dr. Steve Steff.',
    canonicalPath: '/'
  },
  '/executive-coaching': {
    title: 'Executive Coaching for Senior Leaders | Dr. Steve Steff — Transforming Leadership',
    description:
      'Private one-on-one executive coaching for C-suite executives and vice presidents who carry enterprise-level weight. Measurable growth and clearer decisions.',
    canonicalPath: '/executive-coaching'
  },
  '/mastermind-groups': {
    title: 'Executive Mastermind Groups | Lead Together. Grow Faster. — Transforming Leadership',
    description:
      'Small confidential peer mastermind groups of up to eight senior leaders guided monthly by executive coach Dr. Steve Steff. Honest counsel and measurable growth.',
    canonicalPath: '/mastermind-groups'
  },
  '/about': {
    title: 'About Dr. Steve Steff | Executive Coach — Transforming Leadership',
    description:
      'Meet Dr. Steve Steff—ICF-certified executive coach with a Doctorate in Workplace Leadership and Ethics, coaching senior executives from start-ups to the Fortune 500.',
    canonicalPath: '/about'
  },
  '/insights': {
    title: 'Insights on Executive Leadership | Dr. Steve Steff — Transforming Leadership',
    description:
      'Practical essays on executive decision-making, delegation, and leading without losing your life outside of work.',
    canonicalPath: '/insights'
  }
};

export const TRUSTED_LOGOS: LogoItem[] = [
  { id: 'ply-gem', placeholderLabel: 'PLY GEM', name: 'Ply Gem' },
  { id: 'us-lbm', placeholderLabel: 'US LBM', name: 'US LBM' },
  { id: 'bfs', placeholderLabel: 'BUILDERS FIRSTSOURCE', name: 'Builders FirstSource', imageSrc: '/images/brands/builders-firstsource.png' },
  { id: 'playpower', placeholderLabel: 'PLAYPOWER', name: 'PlayPower', imageSrc: '/images/brands/playpower.png' },
  { id: 'polydeck', placeholderLabel: 'POLYDECK', name: 'Polydeck', imageSrc: '/images/brands/polydeck.jpg' }
];

export const TESTIMONIALS: Record<'gina' | 'gary' | 'ron', Testimonial> = {
  gina: {
    id: 'gina',
    quote:
      'I had the pleasure of working with Transforming Leadership during a rapid growth phase of my company. Their leadership acumen and ability to read people and the situations around them was like a super-hero talent.',
    author: 'Gina Butler',
    role: "Founder, Gigi's Cupcakes"
  },
  gary: {
    id: 'gary',
    quote:
      'I have known and worked with Transforming Leadership for fifteen years. I was so impressed with their work with my previous company, where I served as COO, that when I transitioned to CEO of Ply Gem we contracted with them immediately.',
    author: 'Gary Robinette',
    role: 'CEO, Ply Gem'
  },
  ron: {
    id: 'ron',
    quote: "Our engagement with Transforming Leadership has produced clear ROI's and I would recommend them to any organization that would like to help their people grow and thrive.",
    author: 'Ron Kuehl',
    role: 'Executive Vice President, Polydeck Screen Corporation'
  }
};

export const SHARED_PROBLEM_SECTION = {
  heading: 'The higher you lead, the lonelier it gets.',
  subtitle:
    'Senior leadership brings wider authority—and far fewer places to think out loud with people who understand the stakes.',
  columns: [
    {
      icon: 'compass',
      title: 'Hard decisions made alone',
      description:
        'You carry calls on people, strategy and capital that cannot be processed openly with direct reports or casually with your board.'
    },
    {
      icon: 'message-off',
      title: 'Feedback dries up',
      description:
        'The higher your title, the more people filter what they tell you. Blind spots grow quietly when nobody pushes back.'
    },
    {
      icon: 'home',
      title: 'Work spills into home',
      description:
        'Unresolved pressure follows you past dinner and into weekends, costing you energy with the people who matter most.'
    }
  ] as ProblemColumn[]
};

export const SHARED_OUTCOMES: OutcomeItem[] = [
  {
    icon: 'target',
    title: 'Clearer priorities',
    description: 'Spend your best hours on decisions only you can make instead of constant firefighting.'
  },
  {
    icon: 'users',
    title: 'Stronger delegation',
    description: 'Build leaders beneath you who own outcomes rather than waiting on your rescue.'
  },
  {
    icon: 'scale',
    title: 'Better decisions',
    description: 'Pressure-test high-stakes choices before committing capital, time or organizational trust.'
  },
  {
    icon: 'sun',
    title: 'More balance',
    description: 'Protect sustainable margin and show up fully for your family and life outside of work.'
  }
];

export const SHARED_FINAL_CTA = {
  heading: "Let's talk about where you want to lead next.",
  subhead:
    'A calm, confidential 20-minute call directly with Steve to discuss your goals and see whether coaching or a mastermind group fits.',
  buttonLabel: 'Book a 20-Minute Call'
};

export const HOME_CONTENT = {
  hero: {
    eyebrow: 'Transforming Leadership',
    h1: 'Lead with clarity. Perform at your best.',
    subhead:
      'One-on-one executive coaching and confidential peer mastermind groups for senior executives and vice presidents.',
    primaryCta: 'Book a 20-Minute Call',
    secondaryCta: 'Explore Masterminds',
    secondaryHref: '/mastermind-groups',
    photoPlaceholder: '[Photo: STEVE_PHOTO — Dr. Steve Steff confident executive portrait]'
  },
  twoOffers: {
    eyebrow: 'How We Can Work Together',
    heading: 'Two focused paths for senior leaders',
    subtitle: 'Both paths focus on the leadership behaviors behind real results, with progress you can see in the work that matters.',
    cards: [
      {
        id: 'coaching',
        title: 'Executive Coaching',
        description:
          'Private one-on-one coaching for C-suite executives and VPs navigating high-stakes growth, team alignment and complex transitions. Tailored to your specific goals and measured over time.',
        linkLabel: 'Explore Executive Coaching',
        href: '/executive-coaching'
      },
      {
        id: 'masterminds',
        title: 'Mastermind Groups',
        description:
          'Confidential peer circles of up to eight non-competing senior leaders guided monthly by an executive coach. Gain honest counsel, sharper perspective and steady peer accountability.',
        linkLabel: 'Explore Mastermind Groups',
        href: '/mastermind-groups'
      }
    ]
  },
  proofHeading: 'Trusted by leaders who carry real responsibility',
  aboutTeaser: {
    photoPlaceholder: '[Photo: STEVE_PHOTO — Dr. Steve Steff seated conversational portrait]',
    eyebrow: 'Your Coach',
    heading: 'I have sat on both sides of the desk.',
    paragraphs: [
      "I'm Steve Steff. As a business owner for two decades and a consultant for more than fifteen years, I have worked with organizations from start-ups to Fortune 500 companies. My work connects practical decisions with the behaviors that make leadership change last."
    ],
    ctaLabel: 'Meet Steve',
    ctaHref: '/about'
  }
};

export const EXECUTIVE_COACHING_CONTENT = {
  hero: {
    eyebrow: 'One-on-One Executive Coaching',
    h1: 'Executive coaching for leaders who carry the weight.',
    subhead:
      'A private, structured coaching partnership to sharpen your strategic focus, strengthen your leadership team and help you make clear decisions under pressure.',
    ctaLabel: 'Book a 20-Minute Call',
    photoPlaceholder: '[Photo: STEVE_PHOTO — One-on-one executive coaching conversation]'
  },
  whoItsFor: {
    eyebrow: 'Who It Is For',
    heading: 'Built for executives in high-consequence seats',
    intro:
      'One-on-one coaching is a fit when the scope of your role requires tailored, confidential focus on your leadership and organization:',
    bullets: [
      'C-suite executives (CEOs, COOs, CFOs, CROs and Presidents) leading enterprise strategy, board relationships and culture',
      'Vice presidents stepping into larger cross-functional scope, leading other leaders or navigating rapid growth',
      '[High-potential directors by invitation] when sponsored by senior leadership ahead of an executive transition'
    ]
  },
  howItWorks: {
    eyebrow: 'The Process',
    heading: 'How one-on-one coaching works',
    steps: [
      {
        step: '01',
        title: 'Apply and meet',
        description:
          'Start with a 20-minute conversation to clarify what you are carrying, what success looks like and whether our chemistry is right.'
      },
      {
        step: '02',
        title: 'Assess and set goals',
        description:
          'Complete a focused behavioral assessment and define two to three concrete leadership outcomes to measure across the engagement.'
      },
      {
        step: '03',
        title: 'Coach and practice',
        description:
          'Meet consistently to work live organizational decisions, practice new leadership habits and address blind spots in real time.'
      },
      {
        step: '04',
        title: 'Measure your growth',
        description:
          'Review tangible progress at 6 and 12 months so you—and your organization—see clear, lasting behavioral change.'
      }
    ] as StepItem[]
  },
  whatsIncluded: {
    eyebrow: "What's Included",
    heading: 'Everything built around sustained leadership change',
    items: [
      '[12 sessions/year] private one-on-one coaching sessions (virtual or [in-person option])',
      'Comprehensive behavioral assessment and one-on-one executive debrief',
      'Written leadership plan with clear goal tracking and milestone reviews',
      'Strict confidentiality—no internal politics or competing agendas',
      'Brief phone or email access between sessions when urgent leadership calls arise',
      '[Optional stakeholder 360 interviews when organization-sponsored — confirm]'
    ]
  },
  outcomesHeading: 'Outcomes you can see in your calendar and your team'
};

export const MASTERMIND_CONTENT = {
  hero: {
    eyebrow: 'Small groups of up to eight leaders. Monthly sessions guided by an executive coach.',
    h1: 'Lead together. Grow faster.',
    subhead:
      'A confidential peer group for senior leaders who want honest counsel, sharper thinking and measurable growth.',
    primaryCta: 'Apply for the [Month] Cohort',
    secondaryCta: 'Book a 20-Minute Call',
    cohortNote: 'Next cohort begins [Month Year]. Limited to eight leaders per group.',
    bgPhotoPlaceholder: '[Photo: Mastermind hero background — senior peers around boardroom table]'
  },
  peerRoom: {
    eyebrow: 'Peer Advisory + Executive Coaching',
    heading: 'A trusted room of peers, guided by a coach.',
    paragraphsBeforeCadence:
      'Books and conferences give you ideas, but they rarely help when a key executive resigns on Tuesday or a growth bet stalls. Step out of daily noise into a confidential room of non-competing peers, meeting ',
    cadenceWord: 'monthly',
    paragraphsAfterCadence:
      ' with structured facilitation from Dr. Steve Steff. Every member brings real challenges, asks sharper questions and leaves with clear commitments.',
    bulletPoints: [
      'Non-competing seats protected by a written confidentiality agreement',
      'Structured hot-seat time so every member gets direct counsel on live decisions',
      'Guided by an ICF-certified executive coach—never a lecture or networking club'
    ],
    photoPlaceholder: '[Photo: facilitated session]'
  },
  circlesSection: {
    eyebrow: 'Peer Cohorts',
    heading: 'Find the group that fits where you lead',
    subtitle:
      'Every applicant is placed with peers carrying comparable scope so conversations stay candid, relevant and practical.',
    circles: [
      {
        id: 'CEO & Owner Circle',
        title: 'CEO & Owner Circle',
        who: 'Founders, CEOs, business owners',
        focus: 'Strategy, culture, succession',
        cadence: 'Half-day sessions, monthly',
        cap: 'Capped at 8',
        ctaLabel: "See if I'm a fit"
      },
      {
        id: 'Executive Circle',
        title: 'Executive Circle',
        who: 'C-suite executives and senior vice presidents',
        focus: 'Delegation, alignment, leading change',
        cadence: 'Half-day, monthly',
        cap: 'Capped at 8',
        ctaLabel: "See if I'm a fit"
      },
      {
        id: 'VP & Division Leader Circle',
        title: 'VP & Division Leader Circle',
        who: 'Vice presidents and division leaders',
        focus: 'Cross-functional alignment, strategic execution, leading change',
        cadence: 'Half-day, monthly',
        cap: 'Capped at 8',
        ctaLabel: "See if I'm a fit"
      }
    ] as MastermindCircle[]
  },
  howItWorks: {
    eyebrow: 'Step by Step',
    heading: 'How your mastermind works',
    steps: [
      {
        step: '01',
        title: 'Apply and meet',
        description:
          'Submit a short application and meet one-on-one with Steve to confirm mutual fit, confidentiality and non-compete placement.'
      },
      {
        step: '02',
        title: 'Assess and set goals',
        description:
          'Complete your behavioral assessment and debrief with Steve to clarify the specific leadership shifts you want this year.'
      },
      {
        step: '03',
        title: 'Meet with your peers',
        description:
          'Gather consistently with your circle to work high-stakes challenges, sharpen perspective and hold each other accountable.'
      },
      {
        step: '04',
        title: 'Measure your growth',
        description:
          'Track concrete progress at 6 and 12 months—backed by quarterly one-on-one coaching check-ins along the way.'
      }
    ] as StepItem[]
  },
  whatsIncluded: {
    eyebrow: 'Membership Details',
    heading: "What's included",
    items: [
      '12 facilitated sessions/year (in person/virtual)',
      'Groups capped at 8',
      'Behavioral assessment and debrief',
      'Quarterly one-on-one coaching call',
      'Goal tracking and progress reviews',
      'Confidentiality agreement, no competitors',
      'Session summaries and member resources',
      'Optional annual retreat'
    ]
  },
  growthBand: {
    heading: 'Growth you can see, not just feel.',
    proofLine: 'Leadership development must be measured. Clear ROI is essential.',
    ctaLabel: 'Apply for the [Month] Cohort'
  },
  facilitator: {
    eyebrow: 'Your Facilitator',
    heading: 'Led by Dr. Steve Steff',
    photoPlaceholder: '[Photo: STEVE_PHOTO — Dr. Steve Steff headshot]',
    bio: 'Steve brings a doctorate in Workplace Leadership and Ethics, a Master’s in Counseling and ICF coaching certification. A business owner for two decades and a consultant for more than fifteen years, he has worked with organizations from start-ups to Fortune 500 companies.',
    pullQuote: 'When you change the way a leader sees the world, you change their world.'
  },
  testimonialsHeading: 'What leaders say about Transforming Leadership',
  pricing: {
    eyebrow: 'YOUR INVESTMENT',
    monthlyRate: '$[X]/month',
    annualRate: 'or $[Y] per year',
    commitmentNote: '12-month commitment. Application required.',
    companyRateNote: 'Company rate for [3 or more] leaders.',
    primaryCta: 'Apply Now',
    secondaryCta: 'Book a Call'
  },
  faqs: [
    {
      id: 'confidential',
      question: 'Is it confidential?',
      answer:
        'Yes. Every member signs a strict written confidentiality agreement before joining, and no two direct competitors are ever placed in the same circle. What is shared in the room stays in the room.'
    },
    {
      id: 'time',
      question: 'How much time does it take?',
      answer:
        'All three senior-leader circles meet once a month for a focused half-day session ([4 hours — confirm exact timing]), plus a quarterly 1:1 coaching call.'
    },
    {
      id: 'miss-session',
      question: 'What if I miss a session?',
      answer:
        'All session dates are published [6–12 months] in advance so you can protect them on your calendar. If an unavoidable conflict arises, you receive the written session summary and can cover urgent topics during your quarterly one-on-one coaching call.'
    },
    {
      id: 'company-pay',
      question: 'Can my company pay?',
      answer:
        'Yes. Most members fund their seat through executive professional development or leadership training budgets. Monthly and single annual corporate invoices are available, along with a company rate for [3 or more] leaders.'
    },
    {
      id: 'difference',
      question: 'How is this different from one-on-one coaching?',
      answer:
        'One-on-one coaching focuses privately on your specific role, stakeholder dynamics and personal leadership plan. A mastermind group gives you the collective wisdom and candid pushback of up to eight non-competing peers—plus quarterly 1:1 check-ins with Steve.'
    },
    {
      id: 'who-in-group',
      question: 'Who will be in my group?',
      answer:
        'Carefully vetted leaders operating at a comparable level of scope and responsibility across non-competing industries. Steve interviews every applicant personally before extending an invitation so the room stays high-trust and high-caliber.'
    },
    {
      id: 'not-a-fit',
      question: "What if it isn't a fit?",
      answer:
        'That is why every membership begins with an application and a candid conversation with Steve before any commitment is made. If another circle or private one-on-one coaching will serve you better, Steve will tell you plainly.'
    }
  ] as FaqItem[],
  applicationSection: {
    heading: 'Reserve your seat at the table.',
    subhead:
      'Complete the brief application below. No payment is due today—every applicant meets with Steve first to confirm mutual fit.',
    submitLabel: 'Submit My Application',
    sidebarHeading: 'Prefer to talk first?',
    sidebarBody:
      'Have a question about circle placement, schedule or company sponsorship before applying? Schedule a calm 20-minute conversation with Steve.',
    sidebarButton: 'Book a Call',
    responseTimeNote: 'Personal response to every application within [2] business days.',
    privacyNote: 'Your details stay private. No payment is collected with an application.',
    previewTitle: 'Your email draft is ready.',
    previewBody: 'Preview mode: no application has been sent yet. Open your email app to send your completed details, or connect Supabase before launch.',
    previewCta: 'Open email app to send'
  }
};

export const ABOUT_CONTENT = {
  hero: {
    photoPlaceholder: '[Photo: STEVE_PHOTO — Dr. Steve Steff warm executive portrait]',
    h1: "Hi, I'm Steve Steff.",
    intro:
      'I coach senior executives and vice presidents who want to lead with clarity, perform at their best and keep a life outside of work.',
    ctaLabel: 'Book a 20-Minute Call'
  },
  story: {
    eyebrow: 'My Story',
    heading: 'Why I do this work',
    paragraphs: [
      'I founded Transforming Leadership because I believe consistent high performance and a balanced life belong together. How we lead at work affects the people waiting for us at home. I want leaders to grow in both places.',
      'I have been a business owner for two decades and a business consultant for more than fifteen years. I have worked with organizations from start-ups to Fortune 500 companies. Sitting on both sides of the desk has taught me that the behaviors behind a decision matter as much as the plan itself.',
      'Today I work directly with senior executives and vice presidents through private coaching and peer mastermind groups. We agree on the outcomes you want, practice the behaviors that move you there and measure progress along the way.'
    ]
  },
  credentials: {
    eyebrow: 'Background & Recognition',
    heading: 'Credentials',
    items: [
      {
        title: 'Doctorate in Workplace Leadership and Ethics',
        detail: 'Academic research grounded in executive decision-making, organizational trust and ethical leadership.'
      },
      {
        title: "Master's in Counseling",
        detail: 'Deep training in human behavior, communication, blind spots and lasting habit change.'
      },
      {
        title: 'ICF-certified coach',
        detail: 'Credentialed by the International Coaching Federation with strict professional and ethical standards.'
      },
      {
        title: 'Start-ups to Fortune 500',
        detail: 'Trusted by founders, family-owned enterprises, private-equity portfolio leaders and public executives.'
      },
      {
        title: 'Featured in USA Today, Nasdaq, Business Insider and Success',
        detail: 'Recognized contributor on workplace leadership, executive clarity and sustainable high performance.'
      }
    ]
  },
  howIWork: {
    eyebrow: 'Approach',
    heading: 'How I work',
    items: [
      {
        title: 'Measurable outcomes',
        description:
          'We define clear leadership goals up front and review concrete progress at 6 and 12 months—no vague pep talks.'
      },
      {
        title: 'Behavior change, not just advice',
        description:
          'Most senior leaders already know what good leadership looks like. Together we close the gap between knowing and consistent daily action.'
      },
      {
        title: 'Humility',
        description:
          'I do not pretend to know your business better than you do. I bring disciplined questions, honest reflection and proven frameworks.'
      },
      {
        title: 'Confidentiality',
        description:
          'You have a completely private space to think out loud, wrestle with hard calls and get candor with zero political risk.'
      }
    ]
  },
  whoIWorkWith: {
    eyebrow: 'Two Ways to Engage',
    heading: 'Who I work with',
    cards: [
      {
        title: 'One-on-One Executive Coaching',
        description:
          'Private coaching for C-suite executives and vice presidents who want tailored counsel on their role, decisions and team.',
        ctaLabel: 'Explore Executive Coaching',
        href: '/executive-coaching'
      },
      {
        title: 'Executive Mastermind Groups',
        description:
          'Small, confidential peer groups of senior leaders who meet monthly to sharpen thinking and grow alongside peers.',
        ctaLabel: 'Explore Mastermind Groups',
        href: '/mastermind-groups'
      }
    ]
  },
  valuesAndFaith: {
    eyebrow: 'Convictions',
    heading: 'Values and faith',
    body: '[Client approval needed: My faith informs a commitment to integrity, humility and service. I want to honor Jesus Christ in how I work with every leader, while serving clients of all backgrounds with respect.]'
  },
  givingBack: {
    eyebrow: 'Stewardship',
    heading: 'Giving back',
    body: 'Transforming Leadership partners with PATH International, supporting local centers that serve children and adults with special needs through equine-assisted services. [Confirm whether the published 3% of revenue donation is still current before launch.]'
  }
};

export const INSIGHTS_INDEX_CONTENT = {
  eyebrow: 'From Dr. Steve Steff',
  heading: 'Insights',
  intro: 'Original perspectives on the leadership habits, vision and alignment that shape lasting performance.'
};

export const INSIGHTS_POSTS: InsightPost[] = [
  {
    slug: 'behaviors-vs-outcomes',
    title: 'Behaviors vs. Outcomes',
    excerpt:
      'Numbers tell you what happened. Leadership changes the behaviors that produced them. A practical look at coaching toward the work behind the result.',
    date: 'June 23, 2023',
    isoDate: '2023-06-23',
    readTime: '4 min read',
    category: 'Leadership Habits',
    heroCaption: '[Photo: Quiet executive desk with notebook and calendar review]',
    previewImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=76',
    previewAlt: 'Unsplash preview of an uncluttered executive workspace',
    pullQuote:
      'Numbers are an outcome. Numbers are a measure of behaviors. Leadership is about behaviors.',
    sections: [
      {
        paragraphs: [
          'I have spent countless meetings looking at profit, loss and sales numbers. Those numbers matter. But a number is an outcome, not a leadership behavior.',
          'Telling someone to hit a target is like a coach telling a team to score more points. A useful conversation looks at what the team is doing and which habits need to change.'
        ]
      },
      {
        heading: 'Coach the behavior behind the result',
        paragraphs: [
          'When a result falls short, ask what someone actually did, what they could do differently and how you will know the new behavior is working. Then use the number to measure the impact of the change.',
          'The aim is not to avoid accountability. It is to make accountability useful by tying it to specific actions a leader can practice.'
        ]
      },
      {
        heading: 'Make the next step concrete',
        paragraphs: [
          'Saying a direct report should be more assertive is not yet a plan. Describe the behavior in a real meeting, practice the conversation and agree on when to review it.',
          'Effective coaching identifies a behavior, communicates it clearly and gives the leader room to practice it. That is how better outcomes become repeatable.'
        ]
      }
    ]
  },
  {
    slug: 'gaining-alignment-to-your-vision',
    title: 'Gaining Alignment to Your Vision',
    excerpt:
      'Your vision can be clear to you and still be unclear to the people you lead. Alignment takes repeated, cascading communication.',
    date: 'September 16, 2019',
    isoDate: '2019-09-16',
    readTime: '3 min read',
    category: 'Strategic Alignment',
    heroCaption: '[Photo: Small group of senior executives in candid conversation]',
    previewImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=76',
    previewAlt: 'Unsplash preview of professionals in a collaborative meeting',
    pullQuote:
      'I have never spoken with a corporate leader that feels as though they have over-communicated a vision.',
    sections: [
      {
        paragraphs: [
          'Once you establish a vision, the next leadership task is alignment. You need the people affected by it, above you, beside you and across your organization, to understand where you are going.',
          'The difficulty is that you can already see the end clearly. Others may not. What feels obvious to the person who created the vision may still be abstract to the people asked to deliver it.'
        ]
      },
      {
        heading: 'Tell the story more than once',
        paragraphs: [
          'Build a story around the vision that helps each stakeholder see the destination. You may need a different explanation for the board, your direct reports and the teams doing the work.',
          'Repeat it in conversations, decisions and behavior. Clear communication is not a single presentation; it is a steady practice that helps the whole organization keep its attention on the same future.'
        ]
      },
      {
        heading: 'Ask them to tell it back',
        paragraphs: [
          'Before assuming alignment, ask a few key stakeholders to describe the vision in their own words. Where their story differs from yours, you have found a place to communicate more clearly.',
          'The goal is not memorization. It is a shared picture that gives people the confidence to act without waiting for you to explain every next step.'
        ]
      }
    ]
  },
  {
    slug: 'brainstorming-and-vision',
    title: 'Brainstorming and Vision',
    excerpt:
      'A disciplined visioning session moves through exploration, boldness and testing assumptions, in that order.',
    date: 'July 7, 2018',
    isoDate: '2018-07-07',
    readTime: '2 min read',
    category: 'Visioning',
    heroCaption: '[Photo: Notes from an executive planning conversation]',
    previewImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=76',
    previewAlt: 'Unsplash preview of a quiet workspace used for strategic planning',
    pullQuote:
      'These steps must be taken in order, and the one leading the Visioning process must be strong enough to keep the team on track.',
    sections: [
      {
        paragraphs: [
          'A visioning conversation needs more than a blank board and an invitation to brainstorm. It works best when the people in the room know which kind of thinking is needed at each stage.',
          'I use a simple sequence: explore ideas, invite the courage to share them and only then test whether the assumptions hold up.'
        ]
      },
      {
        heading: 'Explore, then share boldly',
        paragraphs: [
          'Begin by generating possibilities without asking the room to defend each one immediately. People need space to see beyond the familiar way of operating.',
          'Next, make it safe for someone to voice a difficult or ambitious idea. Boldness often reveals options the group would have missed by judging too soon.'
        ]
      },
      {
        heading: 'Test assumptions before deciding',
        paragraphs: [
          'Once the ideas are visible, test their merit. Ask what would need to be true, what evidence you have and where the plan might fail.',
          'The executive leading the session protects the order of these steps so the conversation produces a vision the team can actually move toward.'
        ]
      }
    ]
  }
];
