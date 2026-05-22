import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Twitter, Globe } from 'lucide-react';
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
          <nav className="liquid-glass" style={{ borderRadius: '9999px', maxWidth: '1200px', margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Globe className="w-6 h-6 text-white" />
              <span style={{ color: 'white', fontWeight: 600, fontSize: '18px' }}>Asme</span>
              <div className="hidden md:flex" style={{ alignItems: 'center', gap: '32px', marginLeft: '32px' }}>
                <a href="#" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 500 }}>Features</a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 500 }}>Pricing</a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 500 }}>About</a>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'white', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>Sign Up</span>
              <button className="liquid-glass" style={{ borderRadius: '9999px', padding: '8px 24px', color: 'white', fontSize: '14px', fontWeight: 500 }}>Login</button>
            </div>
          </nav>
        </div>

        <div style={{ flex: 1 }} />

        {/* Center content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', transform: 'translateY(-10%)' }}>
          <motion.h1
            className="text-white tracking-tight whitespace-nowrap text-center"
            style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(3rem, 12vw, 8rem)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Know it then <em className="italic">all</em>.
          </motion.h1>

          <motion.div
            className="w-full"
            style={{ maxWidth: '576px', marginTop: '40px' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="liquid-glass" style={{ borderRadius: '9999px', paddingLeft: '24px', paddingRight: '8px', paddingTop: '8px', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input type="email" placeholder="Enter your email" style={{ flex: 1, background: 'transparent', color: 'white', outline: 'none', fontSize: '14px' }} />
              <button style={{ background: 'white', borderRadius: '9999px', padding: '12px', color: 'black', flexShrink: 0 }}>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.p
            className="text-white text-sm leading-relaxed text-center"
            style={{ padding: '0 16px', maxWidth: '448px', marginTop: '24px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
          </motion.p>

          <motion.button
            className="liquid-glass text-white text-sm font-medium"
            style={{ borderRadius: '9999px', padding: '12px 32px', marginTop: '24px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Manifesto
          </motion.button>
        </div>

        <div style={{ flex: 1 }} />

        {/* Social */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', paddingBottom: '20px' }}>
          {[Instagram, Twitter, Globe].map((Icon, i) => (
            <motion.button
              key={i}
              className="liquid-glass"
              style={{ borderRadius: '9999px', padding: '16px', color: 'rgba(255,255,255,0.8)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Icon className="w-5 h-5" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
