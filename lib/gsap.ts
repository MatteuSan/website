import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useState } from 'react';

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
  isSmall: 'screen and (min-width: 320px)',
  isMedium: 'screen and (min-width: 640px)',
  isLarge: 'screen and (min-width: 890px)',
  isXLarge: 'screen and (min-width: 1077px)',
};

/**
 * Returns a boolean value based on the condition provided.
 * @param {string} query
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return mounted ? matches : false;
}

interface AnimateInViewOptions {
  once?: boolean,
  timing?: {
    start?: string,
    end?: string
  },
  invalidateOnRefresh?: boolean
}

export const animateInView = (trigger: gsap.DOMTarget, options?: AnimateInViewOptions) => {
  if (typeof ScrollTrigger === 'undefined') {
    console.warn('ScrollTrigger is not defined. Please register it before using `isInView()`.');
    return gsap.timeline();
  }

  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start: options?.timing?.start || 'top 95%',
      end: options?.timing?.end || undefined,
      toggleActions: 'play complete reset reverse',
      once: options?.once ?? false,
      invalidateOnRefresh: options?.invalidateOnRefresh || undefined,
    }
  });
}