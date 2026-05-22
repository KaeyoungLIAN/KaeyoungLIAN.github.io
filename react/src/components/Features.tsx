import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const features = [
  {
    type: 'video' as const,
    title: 'Your creative canvas.',
    videoUrl: null,
  },
  {
    type: 'card' as const,
    number: '01',
    title: 'Project Showcase.',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
    items: [
      'GlassToDo — Tauri 2 desktop app with acrylic glassmorphism',
      'CS2 Market Analyzer — real-time K-line charts with AI analysis',
      'PingPong Mate — WeChat mini program for match tracking',
    ],
  },
  {
    type: 'card' as const,
    number: '02',
    title: 'Smart Tooling.',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
    items: [
      'Workday Allocator — priority-based scheduling engine',
      'Efficient concurrency — producer-consumer patterns in Python',
      'CI/CD automation via GitHub Actions and cron jobs',
    ],
  },
  {
    type: 'card' as const,
    number: '03',
    title: 'Craft & Precision.',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
    items: [
      'Spring physics animations — Remotion-style Euler integration',
      'Apple design language — pixel-perfect white space and typography',
      'Performance-first — 5MB single-binary Tauri apps',
    ],
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  if (feature.type === 'video') {
    return (
      <motion.div
        className="relative col-span-1 lg:col-span-2 row-span-2 rounded-2xl overflow-hidden bg-[#1a1a1a]"
        variants={cardItem}
      >
        {/* Subtle gradient background instead of video */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-black" />
        <div className="absolute inset-0 noise-overlay opacity-30" />

        {/* Title at bottom */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <h3
            className="text-lg sm:text-xl font-medium"
            style={{ color: '#E1E0CC' }}
          >
            {feature.title}
          </h3>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="col-span-1 rounded-2xl p-5 sm:p-6 flex flex-col"
      style={{ backgroundColor: '#212121' }}
      variants={cardItem}
    >
      {/* Icon */}
      <img
        src={feature.icon}
        alt=""
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover mb-4"
        loading="lazy"
      />

      {/* Title with number */}
      <h3 className="text-primary text-base sm:text-lg font-medium mb-3">
        {feature.title}{' '}
        <span className="text-gray-500 text-sm">({feature.number})</span>
      </h3>

      {/* Checklist */}
      <ul className="space-y-2.5 mb-4 flex-1">
        {feature.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
            <Check className="text-primary shrink-0 mt-0.5" size={14} />
            <span className="text-gray-400">{item}</span>
          </li>
        ))}
      </ul>

      {/* Learn more */}
      <a
        href="https://github.com/KaeyoungLIAN"
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-2 text-primary text-xs sm:text-sm no-underline mt-auto hover:underline"
      >
        Learn more{' '}
        <ArrowRight size={12} className="-rotate-45" />
      </a>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="projects" className="min-h-screen bg-black relative">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-4 pt-16 md:pt-24 pb-8 text-center">
        <h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal"
          style={{ color: '#E1E0CC' }}
        >
          Studio-grade workflows for visionary creators.
        </h2>
        <p className="text-gray-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal mt-2">
          Built for pure vision. Powered by code.
        </p>
      </div>

      {/* Card grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 md:pb-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
