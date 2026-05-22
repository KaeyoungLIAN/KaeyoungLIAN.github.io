import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Segment {
  text: string;
  className: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  stagger?: number;
}

export default function WordsPullUpMultiStyle({
  segments,
  className = '',
  stagger = 0.08,
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  let wordIdx = 0;
  const elements: { word: string; className: string; idx: number }[] = [];

  for (const seg of segments) {
    for (const word of seg.text.split(' ')) {
      elements.push({ word, className: seg.className, idx: wordIdx++ });
    }
  }

  return (
    <div ref={ref} className={className}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-[0.25em] ${el.className}`}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            delay: i * stagger,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {el.word}
        </motion.span>
      ))}
    </div>
  );
}
