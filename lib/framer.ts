import { Variants } from 'framer-motion';

export const animateVariants = (variants: Variants) => {
  return {
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants
  }
}