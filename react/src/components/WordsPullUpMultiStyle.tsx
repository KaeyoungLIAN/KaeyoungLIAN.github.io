import { motion } from 'framer-motion';

interface Segment {
  text: string;
  className: string;
}

interface Props {
  segments: Segment[];
  delay?: number;
}

/**
 * Splits text into words, each word animates up from y:20 with stagger.
 * Supports multi-style segments (normal text vs italic serif).
 */
export default function WordsPullUpMultiStyle({ segments, delay = 0.08 }: Props) {
  const words = segments.flatMap((seg) =>
    seg.text.split(' ').map((word) => ({ word, className: seg.className })),
  );

  return (
    <span className="inline-flex flex-wrap justify-center">
      {words.map(({ word, className }, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={className}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            delay: i * delay,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}{i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  );
}
