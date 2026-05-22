import WordsPullUp from './components/WordsPullUp';
import WordsPullUpMultiStyle from './components/WordsPullUpMultiStyle';
import AnimatedLetter from './components/AnimatedLetter';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Github, Mail, ExternalLink, Terminal, LineChart, Table, Calendar } from 'lucide-react';

const projects = [
  {
    title: 'GlassToDo',
    desc: '窗口级毛玻璃待办 · 弹簧物理 · 零 emoji',
    detail: 'Tauri 桌面应用 with frosted-glass effects, spring physics animations, and recollectable trash. Built with Rust + React.',
    icon: Terminal,
    gradient: 'from-indigo-800/80 via-purple-900/80 to-slate-900/80',
    link: 'https://github.com/KaeyoungLIAN/GlassToDo',
  },
  {
    title: 'CS2 Market Analyzer',
    desc: 'Real-time K线 + AI 价格预测',
    detail: 'Django backend with candlestick charts, multi-key Steam API rotation, DeepSeek AI price predictions, and daily cron-synced data.',
    icon: LineChart,
    gradient: 'from-slate-800/80 via-amber-900/40 to-slate-900/80',
    link: 'https://github.com/KaeyoungLIAN/pingpong-mate-server',
  },
  {
    title: 'PingPong Mate',
    desc: '小程序 · 约球 · 社交',
    detail: 'WeChat mini-program + Django REST framework. Match friends, track games, manage court reservations with real-time availability.',
    icon: Table,
    gradient: 'from-emerald-900/60 via-teal-800/40 to-slate-900/80',
    link: 'https://github.com/KaeyoungLIAN/pingpong-mate-server',
  },
  {
    title: 'Workday Allocator',
    desc: '智能排班 · 优先级评分',
    detail: 'Smart work hours allocation with weighted priority scoring — plan your week, track completion, manage recurring shifts via Django API.',
    icon: Calendar,
    gradient: 'from-blue-900/60 via-sky-800/40 to-slate-900/80',
    link: 'https://github.com/KaeyoungLIAN/pingpong-mate-server',
  },
];

function FeatureCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const Icon = project.icon;

  return (
    <motion.div
      ref={ref}
      className="feature-card flex flex-col min-h-[320px] lg:h-[480px]"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
      <div className="absolute inset-0 bg-noise" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
        {/* Icon */}
        <div className="mb-4">
          <Icon className="w-8 h-8 text-primary/80" />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-[#E1E0CC] mb-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-primary/70 mb-3 leading-snug">
          {project.detail}
        </p>

        {/* Link */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs md:text-sm text-primary/60 hover:text-[#E1E0CC] transition-colors group"
        >
          View Project
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}

function VideoFeatureCard({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="feature-card relative min-h-[320px] lg:h-[480px] overflow-hidden"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Animated gradient background (replaces video) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-violet-900/20 to-transparent" />
      <div className="noise-overlay absolute inset-0" style={{ opacity: 0.6 }} />

      {/* Overlay gradient at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Tag line */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
        <p className="text-sm md:text-base font-semibold text-[#E1E0CC]">
          Where we craft code.
        </p>
      </div>
    </motion.div>
  );
}

export default function App() {
  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen">
      {/* ==================== HERO ==================== */}
      <section className="h-screen p-4 md:p-6">
        {/* Outer container with rounded corners */}
        <div className="relative h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
          {/* Background gradient (replaces video) */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />

          {/* Secondary gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/30 via-transparent to-violet-950/20" />

          {/* Noise overlay */}
          <div className="noise-overlay absolute inset-0" style={{ opacity: 1 }} />

          {/* Gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

          {/* ===== NAV ===== */}
          <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8">
              <div className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
                <a href="#" className="nav-link text-[10px] sm:text-xs md:text-sm">Work</a>
                <a href="#about" className="nav-link text-[10px] sm:text-xs md:text-sm">About</a>
                <a href="#features" className="nav-link text-[10px] sm:text-xs md:text-sm">Projects</a>
              </div>
            </div>
          </nav>

          {/* ===== HERO CONTENT ===== */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-10 pb-10 md:pb-16">
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              {/* Left: Giant heading */}
              <div className="col-span-12 md:col-span-8 relative">
                <h1
                  className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]"
                  style={{ color: '#E1E0CC' }}
                >
                  <WordsPullUp
                    text="Kaeyoung"
                    delay={0.1}
                    stagger={0.12}
                  />
                </h1>
              </div>

              {/* Right: Description + CTA */}
              <div className="col-span-12 md:col-span-4 flex flex-col justify-end">
                <p
                  className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2] mb-4 md:mb-6"
                >
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Building things with Rust, React, and ML. Occasionally finishing them.
                  </motion.span>
                </p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href="https://github.com/KaeyoungLIAN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-primary text-black font-medium text-sm sm:text-base rounded-full px-5 py-2.5 md:px-6 md:py-3 transition-all hover:gap-6 group"
                  >
                    View GitHub
                    <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                      <ArrowRight className="text-primary w-4 h-4" />
                    </span>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="bg-black py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto bg-[#101010] rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center">
          {/* Label */}
          <p className="text-primary text-[10px] sm:text-xs mb-6 md:mb-8 tracking-wider uppercase">
            Full-stack Developer
          </p>

          {/* Main heading */}
          <WordsPullUpMultiStyle
            segments={[
              { text: 'I am Kaeyoung,', className: 'font-normal' },
              { text: 'building what matters.', className: 'italic font-serif' },
              { text: 'I work across the stack — Tauri, React, Django, and ML.', className: 'font-normal text-base sm:text-lg md:text-xl mt-4 block' },
            ]}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-8 md:mb-12"
          />

          {/* Body with scroll-linked character opacity */}
          <AnimatedLetter
            text="Over the last several years, I have built desktop apps with Tauri, real-time data pipelines with Django, AI-powered analytics with DeepSeek, and WeChat mini-programs for social matchmaking. Each project taught me something about the craft — the value of clean APIs, the joy of spring-physics UI, and the discipline of shipping daily."
            className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          />
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section id="features" className="min-h-screen bg-black relative bg-noise py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'Projects I\'ve shipped.', className: 'text-[#E1E0CC] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal' },
                { text: 'Built for real use. Powered by curiosity.', className: 'text-gray-500 text-base sm:text-lg md:text-xl mt-2 block' },
              ]}
            />
          </div>

          {/* 4-column grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1">
            {/* Card 1: Video card */}
            <VideoFeatureCard index={0} />

            {/* Cards 2-4: Project cards */}
            {projects.slice(1).map((project, i) => (
              <FeatureCard key={i} project={project} index={i + 1} />
            ))}
          </div>

          {/* Extra row for GlassToDo as full-width card since we used card 1 for video */}
          <div className="mt-3 sm:mt-2 md:mt-1">
            <FeatureCard project={projects[0]} index={4} />
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-black border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs sm:text-sm text-primary/50">
          <p>&copy; {new Date().getFullYear()} Kaeyoung</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/KaeyoungLIAN"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="mailto:kaeyounglk@outlook.com"
              className="nav-link flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
