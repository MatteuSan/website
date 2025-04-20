import gsap from 'gsap';
import { ReactRef, useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Motion preferences
 */
export const MOTION_PREFERENCES = {
  isReduced: '(prefers-reduced-motion: reduce)',
  isNotReduced: '(prefers-reduced-motion: no-preference)'
};

/**
 * Screen sizes
 */
export const SCREEN_SIZES = {
  isSmall: 320,
  isMedium: 640,
  isLarge: 890,
  isXLarge: 1077,
};

/**
 * Returns a boolean value based on the condition provided.
 * @param {string} condition
 */
export const useGSAPMediaQuery = (condition: string) => {
  return gsap.matchMedia().add({
    mq: condition
  }, (ctx) => {
    // @ts-ignore
    return ctx.conditions.mq;
  });
}

/**
 * Parallax exit animation
 * @param {number} instance
 * @param {number} duration
 */
export const parallaxExit = (instance: number = 1, duration: number = 3) => {
  const isMotionReduced = useGSAPMediaQuery(MOTION_PREFERENCES.isReduced);

  return {
    y: !isMotionReduced ? -150 + ((20 * (instance - 1)) * -1) : 0,
    opacity: 0,
    duration: duration,
    ease: 'power1'
  };
}

export const useCardAnimation = (cardClass: string, scope?: string|ReactRef|Element) => {
  useGSAP(() => {
    const CARDS = gsap.utils.toArray(cardClass);
    const isMotionReduced = useGSAPMediaQuery(MOTION_PREFERENCES.isReduced);

    CARDS.forEach((card: any) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          end: 'bottom 77%',
          once: true,
        }
      });

      gsap.set(card, { y: !isMotionReduced ? 20 : 0, opacity: 0, scale: 0.9 });

      tl.to(card, {
        y: !isMotionReduced ? 0 : undefined,
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: 'power2',
        stagger: {
          amount: 0.1,
        }
      });
    });
  }, { scope });
}