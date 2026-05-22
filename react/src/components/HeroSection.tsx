import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="hero-section">
      <div className="hero-video-wrap">
        <img
          src="/videos/hero-bg.jpg"
          alt="The Starry Night — Vincent van Gogh"
          className="hero-video"
        />
      </div>

      <div className="hero-overlay">
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
            {t('hero.subtitle')}
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
              <span>{t('hero.viewProjects')}</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        <div style={{ flex: 1 }} />
      </div>
    </section>
  );
}
