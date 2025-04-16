import gsap from "gsap";
import { ReactRef, useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

export const useCardAnimation = (cardClass: string, scope?: string|ReactRef|Element) => {
  useGSAP(() => {
    const CARDS = gsap.utils.toArray(cardClass);

    CARDS.forEach((card: any, key: number) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          end: 'bottom 77%',
          once: true,
        }
      });

      gsap.set(card, { y: 20, opacity: 0, scale: 0.9 });

      tl.to(card, {
        y: 0,
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