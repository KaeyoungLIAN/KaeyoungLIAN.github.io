import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-4">Project not found</h1>
          <Link
            to="/"
            className="text-white/50 hover:text-white transition-colors text-sm"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Back button */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>
      </div>

      {/* Hero section: screenshot + info side by side */}
      <section className="max-w-5xl mx-auto px-6 pt-8 pb-16">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Left: screenshot */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="liquid-glass"
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: '16/10',
            }}
          >
            <img
              src={project.screenshot}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </motion.div>

          {/* Right: name, description, links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
          >
            {/* Tag */}
            <span
              style={{
                color: project.accent,
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              {project.tag}
            </span>

            {/* Title */}
            <h1
              style={{
                color: 'white',
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                marginBottom: '16px',
                lineHeight: 1.15,
              }}
            >
              {project.title}
            </h1>

            {/* Short description */}
            <p
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: '15px',
                lineHeight: 1.7,
                marginBottom: '32px',
              }}
            >
              {project.description}
            </p>

            {/* Pill buttons: GitHub + Live URL */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {/* GitHub pill */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '9999px',
                  padding: '10px 20px',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                  e.currentTarget.style.background = '';
                }}
              >
                <Github className="w-4 h-4" />
                View on GitHub
                <ExternalLink className="w-3 h-3" style={{ opacity: 0.5 }} />
              </a>

              {/* Live URL pill (if exists) */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '9999px',
                    padding: '10px 20px',
                    background: project.accent,
                    color: '#020617',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.85';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Project
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="max-w-5xl mx-auto px-6"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
        }}
      />

      {/* Long description */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2
            style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 500,
              marginBottom: '24px',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            About this project
          </h2>

          <div
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '15px',
              lineHeight: 1.9,
              maxWidth: '720px',
            }}
          >
            {project.longDescription.split('\n\n').map((paragraph, i) => (
              <p key={i} style={{ marginBottom: '20px' }}>
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: '48px' }}
        >
          <h3
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Tech Stack
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {project.tech.map((t) => (
              <span
                key={t}
                className="liquid-glass"
                style={{
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
