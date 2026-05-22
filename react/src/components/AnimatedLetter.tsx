import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  text: string;
  className?: string;
}

/**
 * Each character's opacity transitions from 0.2 to 1 based on scroll position.
 * Creates a progressive text reveal effect as user scrolls down.
 */
export default function AnimatedLetter({ text, className = '' }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');

  return (
    <p ref={ref} className={className}>
      {chars.map((char, i) => {
        const charProgress = i / chars.length;
        const start = charProgress - 0.1;
        const end = charProgress + 0.05;
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        return (
          <motion.span key={`${char}-${i}`} style={{ opacity }}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </p>
  );
}
