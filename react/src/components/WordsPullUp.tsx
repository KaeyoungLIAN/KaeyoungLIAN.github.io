import { motion } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

export default function WordsPullUp({ text, className = '', delay = 0.08 }: Props) {
  const words = text.split(' ');

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
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
