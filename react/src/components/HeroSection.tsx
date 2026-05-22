import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Twitter, Globe } from 'lucide-react';
import VideoFade from './VideoFade';

export default function HeroSection() {
  return (
    <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Video fills section */}
      <VideoFade src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4" />

      {/* Full overlay for all content */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column' }}>
        {/* Navbar */}
        <div style={{ padding: '24px 24px 0' }}>
          <nav className="liquid-glass" style={{ borderRadius: '9999px', maxWidth: '1200px', margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Globe className="w-6 h-6 text-white" />
              <span style={{ color: 'white', fontWeight: 600, fontSize: '18px' }}>Asme</span>
              <div className="hidden md:flex" style={{ alignItems: 'center', gap: '32px', marginLeft: '32px' }}>
                <a href="#" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Features</a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Pricing</a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>About</a>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'white', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>Sign Up</span>
              <button className="liquid-glass" style={{ borderRadius: '9999px', padding: '8px 24px', color: 'white', fontSize: '14px', fontWeight: 500, border: 'none', cursor: 'pointer' }}>
                Login
              </button>
            </div>
          </nav>
        </div>

        <div style={{ flex: 1 }} />

        {/* Centered content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', transform: 'translateY(-10%)' }}>
          <motion.h1
            style={{ fontFamily: "'Instrument Serif', serif", color: 'white', letterSpacing: '-0.025em', whiteSpace: 'nowrap', fontSize: 'clamp(3rem, 12vw, 8rem)', textAlign: 'center' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Know it then <em style={{ fontStyle: 'italic' }}>all</em>.
          </motion.h1>

          <motion.div
            style={{ maxWidth: '576px', width: '100%', marginTop: '40px' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="liquid-glass" style={{ borderRadius: '9999px', paddingLeft: '24px', paddingRight: '8px', paddingTop: '8px', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{ flex: 1, background: 'transparent', color: 'white', border: 'none', outline: 'none', fontSize: '14px' }}
              />
              <button style={{ background: 'white', borderRadius: '9999px', padding: '12px', color: 'black', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.p
            style={{ color: 'white', fontSize: '14px', lineHeight: 1.625, padding: '0 16px', maxWidth: '448px', marginTop: '24px', textAlign: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
          </motion.p>

          <motion.button
            className="liquid-glass"
            style={{ borderRadius: '9999px', padding: '12px 32px', color: 'white', fontSize: '14px', fontWeight: 500, marginTop: '24px', border: 'none', cursor: 'pointer' }}
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
              style={{ borderRadius: '9999px', padding: '16px', color: 'rgba(255,255,255,0.8)', border: 'none', cursor: 'pointer' }}
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
