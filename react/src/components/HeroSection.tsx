import { motion } from 'framer-motion';
import { Github, ArrowDown } from 'lucide-react';
import VideoFade from './VideoFade';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-video-wrap">
        <VideoFade src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4" />
      </div>

      <div className="hero-overlay">
        {/* Nav */}
        <div style={{ padding: '24px 24px 0' }}>
          <nav
            className="liquid-glass"
            style={{
              borderRadius: '9999px',
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ color: 'white', fontWeight: 600, fontSize: '18px' }}>
              Kaeyoung
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a
                href="https://github.com/KaeyoungLIAN"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass"
                style={{
                  borderRadius: '9999px',
                  padding: '8px 16px',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '14px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </nav>
        </div>

        <div style={{ flex: 1 }} />

        {/* Center content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 24px',
            transform: 'translateY(-15%)',
          }}
        >
          <motion.h1
            className="text-white tracking-tight text-center"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(3.5rem, 14vw, 9rem)',
              lineHeight: 1,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Kaeyoung
          </motion.h1>

          <motion.p
            className="text-white/50 text-sm md:text-base tracking-wider text-center"
            style={{ marginTop: '20px', maxWidth: '480px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Builds tools, apps, and systems — from desktop glassmorphism to AI-powered analytics.
          </motion.p>

          <motion.div
            style={{ marginTop: '40px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <a
              href="#projects"
              className="liquid-glass"
              style={{
                borderRadius: '9999px',
                padding: '12px 28px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <span>View projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        <div style={{ flex: 1 }} />
      </div>
    </section>
  );
}
