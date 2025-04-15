/**
 * Parallax exit animation
 * @param {number} instance
 * @param {number} duration
 */
export const parallaxExit = (instance: number = 1, duration: number = 3) => {
  return {
    y: -150 + ((20 * (instance - 1)) * -1),
    opacity: 0,
    duration: duration,
    ease: 'power1'
  };
}