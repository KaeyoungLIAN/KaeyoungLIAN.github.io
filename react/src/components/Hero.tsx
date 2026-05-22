import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import WordsPullUp from './WordsPullUp';

const navItems = ['About', 'Projects', 'GitHub'];

export default function Hero() {
  return (
    <section className="relative h-screen p-4 md:p-6">
      {/* Inset container */}
      <div className="relative h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black">
        {/* Background gradient (no video fallback) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-black to-[#0a0a0a]" />

        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Navbar */}
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8">
            <ul className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
              {navItems.map((item) => {
                const href = item === 'GitHub'
                  ? 'https://github.com/KaeyoungLIAN'
                  : `#${item.toLowerCase()}`;
                const isExternal = item === 'GitHub';
                return (
                  <li key={item}>
                    <a
                      href={href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener' : undefined}
                      className="text-[10px] sm:text-xs md:text-sm no-underline transition-colors duration-200"
                      style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)')}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 lg:p-16 z-10">
          <div className="grid grid-cols-12 gap-4 md:gap-8">
            {/* Left 8 cols: heading */}
            <div className="col-span-12 md:col-span-8">
              <h1
                className="font-medium leading-[0.85] tracking-[-0.07em]"
                style={{ color: '#E1E0CC' }}
              >
                <WordsPullUp
                  text="Kaeyoung"
                  className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
                  delay={0.08}
                />
              </h1>
            </div>

            {/* Right 4 cols: description + CTA */}
            <div className="col-span-12 md:col-span-4 flex flex-col justify-end gap-4 md:gap-6">
              <motion.p
                className="text-primary/70 text-xs sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Building things with Rust, React, and ML.
                Occasionally finishing them.
              </motion.p>

              <motion.a
                href="https://github.com/KaeyoungLIAN"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 bg-primary rounded-full text-black font-medium text-sm sm:text-base px-5 py-2.5 no-underline transition-all duration-300 hover:gap-3 w-fit group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                View GitHub
                <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="text-primary" size={16} />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
