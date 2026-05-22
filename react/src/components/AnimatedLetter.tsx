import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedLetterProps {
  text: string;
  className?: string;
}

export default function AnimatedLetter({ text, className = '' }: AnimatedLetterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');

  return (
    <div ref={ref} className={className}>
      {chars.map((char, i) => {
        const charProgress = i / chars.length;
        const start = Math.max(0, charProgress - 0.1);
        const end = Math.min(1, charProgress + 0.05);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

        return (
          <motion.span key={i} className="inline-block" style={{ opacity }}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </div>
  );
}
