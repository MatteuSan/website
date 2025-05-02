import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { SplitText } from 'gsap/dist/SplitText';
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
 * SplitText configurations
 */
export const BY_CHAR: SplitText.Vars = {
  type: 'chars',
  mask: 'chars',
  charsClass: 'char'
};

export const BY_WORD: SplitText.Vars = {
  type: 'words',
  mask: 'words',
  wordsClass: 'word'
};

export const BY_LINE: SplitText.Vars = {
  type: 'lines',
  mask: 'lines',
  linesClass: 'line',
  autoSplit: true
};

/**
 * Animation constants
 */
export const TEXT_MASK_INITIAL = {
  opacity: 1,
  yPercent: 0
};
export const TEXT_MASK_ANIMATION = {
  opacity: 0,
  yPercent: 100,
  duration: 0.6,
  stagger: 0.05,
  ease: 'expo.out',
};

export const REDUCED_TEXT_MASK_INITIAL = {
  opacity: 1,
};
export const REDUCED_TEXT_MASK_ANIMATION = {
  opacity: 0,
  duration: 0.6,
  stagger: 0.05,
  ease: 'expo.out',
};

export const usePreparedFonts = (callback: () => void) => {
  // document.fonts.ready.then(() => callback());
  callback();
}

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