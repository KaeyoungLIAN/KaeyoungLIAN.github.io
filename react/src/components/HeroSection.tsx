import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Twitter, Globe } from 'lucide-react';
import VideoFade from './VideoFade';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ height: '100vh' }}>
      {/* Video fills entire section */}
      <div className="absolute inset-0 w-full h-full">
        <VideoFade
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* Full overlay for all content */}
      <div className="absolute inset-0 z-10 flex flex-col">
        {/* Navbar */}
        <div className="px-6 pt-6">
          <nav className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-white" />
              <span className="text-white font-semibold text-lg">Asme</span>
              <div className="hidden md:flex items-center gap-8 ml-8">
                <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Features</a>
                <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Pricing</a>
                <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">About</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-sm font-medium cursor-pointer">Sign Up</span>
              <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium">
                Login
              </button>
            </div>
          </nav>
        </div>

        {/* Spacer to push content to center */}
        <div className="flex-1" />

        {/* Hero centered content */}
        <div className="flex flex-col items-center justify-center px-6 -translate-y-[10%]">
          <motion.h1
            className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap"
            style={{ fontFamily: "'Instrument Serif', serif" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Know it then <em className="italic">all</em>.
          </motion.h1>

          <motion.div
            className="max-w-xl w-full mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-sm"
              />
              <button className="bg-white rounded-full p-3 text-black flex-shrink-0">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.p
            className="text-white text-sm leading-relaxed px-4 max-w-md mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
          </motion.p>

          <motion.button
            className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Manifesto
          </motion.button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Social icons */}
        <div className="flex justify-center gap-4 pb-8">
          {[Instagram, Twitter, Globe].map((Icon, i) => (
            <motion.button
              key={i}
              className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
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
