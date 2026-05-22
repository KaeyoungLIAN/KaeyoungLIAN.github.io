import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import AnimatedLetter from './AnimatedLetter';

export default function About() {
  return (
    <section id="about" className="bg-black px-4 py-20 md:py-32">
      <div className="max-w-6xl mx-auto bg-[#101010] rounded-3xl px-6 py-16 md:px-16 md:py-24 text-center">
        {/* Label */}
        <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-8">
          Software Engineering
        </p>

        {/* Heading with multi-style words */}
        <div
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto"
          style={{ lineHeight: '0.95' }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: 'I am Kaeyoung,', className: 'font-normal' },
              { text: 'a full-stack developer.', className: 'italic font-serif font-normal' },
              { text: 'I build with Rust, React, Django, and ML.', className: 'font-normal' },
            ]}
            delay={0.08}
          />
        </div>

        {/* Scroll-linked character reveal */}
        <div className="max-w-2xl mx-auto mt-12 md:mt-16">
          <AnimatedLetter
            text="I work across the entire stack — from Tauri desktop apps and real-time
data pipelines to LLM inference on Apple Silicon. Every project is an
exercise in reducing complexity without cutting corners. Currently focused
on local AI, ergonomic UIs, and systems that don't break at 2am."
            className="text-primary text-xs sm:text-sm md:text-base leading-relaxed"
          />
        </div>
      </div>
    </section>
  );
}
