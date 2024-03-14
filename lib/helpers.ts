export const stagger = (reference: number, delay: number, items?: [], gridItems?: number): number => {
  if (!items || !gridItems) return reference * delay;
  return reference * delay;
}