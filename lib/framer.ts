import { Variants } from 'framer-motion';

export const useTransition = (variants: Variants) => {
  return {
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants
  }
}