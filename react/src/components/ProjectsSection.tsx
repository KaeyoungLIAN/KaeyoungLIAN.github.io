import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'GlassToDo',
    tag: 'Desktop',
    description:
      'Window-level glassmorphism todo app with spring physics, multi-language support, dark/light themes, and a 5MB Tauri 2 binary.',
    tech: ['Tauri 2', 'React 19', 'Rust', 'CSS Glassmorphism'],
    url: 'https://github.com/KaeyoungLIAN/GlassToDo',
    accent: '#10b981',
    bg: 'radial-gradient(ellipse at 20% 0%, #10b98130 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, #0d948830 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #0f172a 0%, #020617 100%)',
  },
  {
    title: 'CS2 Market Analyzer',
    tag: 'Analytics',
    description:
      'Real-time Steam market analytics with K-line charts, AI-powered price predictions via DeepSeek, and multi-key API rotation for 39k+ items.',
    tech: ['Django', 'Python', 'Steam API', 'DeepSeek AI'],
    url: 'https://github.com/KaeyoungLIAN/CS2-Market-Analyzer-Backend',
    accent: '#6366f1',
    bg: 'radial-gradient(ellipse at 80% 0%, #6366f130 0%, transparent 60%), radial-gradient(ellipse at 20% 100%, #4f46e530 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #0f172a 0%, #020617 100%)',
  },
  {
    title: 'PingPong Mate',
    tag: 'WeChat Mini Program',
    description:
      'WeChat social app for ping-pong enthusiasts — find matches, track scores, manage court bookings with DJando REST API backend.',
    tech: ['Django', 'WeChat Mini Program', 'DRF', 'Token Auth'],
    url: 'https://github.com/KaeyoungLIAN/pingpong-mate-server',
    accent: '#f59e0b',
    bg: 'radial-gradient(ellipse at 30% 0%, #f59e0b30 0%, transparent 60%), radial-gradient(ellipse at 70% 100%, #d9770630 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #0f172a 0%, #020617 100%)',
  },
  {
    title: 'Workday Allocator',
    tag: 'Scheduling',
    description:
      'Smart work hours allocation system with weighted priority scoring, recurring shifts, and constraint-satisfaction scheduling logic.',
    tech: ['Django', 'Python', 'SQLite'],
    url: 'https://github.com/KaeyoungLIAN/workday_allocation',
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at 60% 0%, #06b6d430 0%, transparent 60%), radial-gradient(ellipse at 40% 100%, #0891b230 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #0f172a 0%, #020617 100%)',
  },
];

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="liquid-glass block"
      style={{
        borderRadius: '24px',
        overflow: 'hidden',
        textDecoration: 'none',
        cursor: 'pointer',
        position: 'relative',
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background layer — rich gradient */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: project.bg,
          zIndex: 0,
        }}
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Accent top bar */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '4px',
          backgroundColor: project.accent,
          opacity: 0.5,
        }}
      />

      {/* Hover overlay — blur + darken */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          background: 'rgba(2, 6, 23, 0.75)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '24px',
          pointerEvents: 'none',
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'ease' }}
      >
        {/* Hover label */}
        <motion.div
          style={{
            background: 'white',
            borderRadius: '9999px',
            padding: '10px 24px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#020617',
            fontSize: '14px',
            fontWeight: 500,
            position: 'relative',
          }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.25, delay: 0.08, ease: 'ease' }}
        >
          <span>View</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            {project.title}
          </span>
          <ArrowUpRight className="w-4 h-4" />
          {/* Gradient border ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: '9999px',
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.4))',
              zIndex: -1,
              opacity: 0.6,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '32px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            {project.tag}
          </span>
          <div
            className="liquid-glass"
            style={{ borderRadius: '9999px', padding: '8px' }}
          >
            <ArrowUpRight
              className="w-4 h-4"
              style={{ color: 'white', opacity: 0.6 }}
            />
          </div>
        </div>

        <h3
          style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 600,
            marginBottom: '12px',
            letterSpacing: '-0.02em',
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '14px',
            lineHeight: 1.7,
            marginBottom: '24px',
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {project.tech.map((t) => (
            <span
              key={t}
              className="liquid-glass"
              style={{
                borderRadius: '9999px',
                padding: '4px 12px',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '11px',
                letterSpacing: '0.05em',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="projects"
      className="bg-black"
      style={{ padding: '100px 24px 120px', overflow: 'hidden' }}
    >
      {/* Subtle gradient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.02) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={ref}
        className="max-w-6xl mx-auto"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Section header */}
        <motion.div
          style={{ marginBottom: '64px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '12px',
              display: 'inline-block',
            }}
          >
            My Projects
          </span>
          <h2
            style={{
              color: 'white',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 500,
              letterSpacing: '-0.03em',
            }}
          >
            Things I've built
          </h2>
        </motion.div>

        {/* Project grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '24px',
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
