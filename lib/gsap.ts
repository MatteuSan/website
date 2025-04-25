import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { hashString } from '@/lib/string';
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

/**
 * Parallax exit animation
 * @param {number} instance
 * @param {number} duration
 */
export const parallaxExit = (instance: number = 1, duration: number = 3) => {
  return {
    y: -150 + ((10 * (instance - 1)) * -1),
    opacity: 0,
    duration: duration,
  };
}

interface AnimateInViewOptions {
  once?: boolean
}

export const animateInView = (trigger: gsap.DOMTarget, options?: AnimateInViewOptions) => {
  if (typeof ScrollTrigger === 'undefined') {
    console.warn('ScrollTrigger is not defined. Please register it before using `isInView()`.');
    return gsap.timeline();
  }

  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top 95%',
      toggleActions: options?.once ? 'play pause resume complete' : 'play resume resume complete',
      once: options?.once ?? false
    }
  });
}

class SplitTextResult {
  constructor(
    public splits: HTMLElement[],
    public identifier: string,
  ) {}

  public revert(): void {
    this.splits.forEach(split => {
      const parent = split.parentNode;
      const textContent = document.createTextNode(split.textContent || '');

      split.removeAttribute('style');

      if (!parent) return;
      parent.replaceChild(textContent, split);
    });
  }
}

/**
 * Splits text into manageable parts for animation.
 * @param element
 * @param options
 */
export const splitText = (
  element: HTMLElement | string | null,
  options: {
    style?: 'word' | 'char' | 'line',
    className?: string
  } = { style: 'char' }
): SplitTextResult => {
  const elementProxy = typeof element === 'string' ? (document.querySelector(element) as HTMLElement) : element;
  if (!elementProxy) return new SplitTextResult([], '.');

  elementProxy.style.overflow = 'hidden';
  const finalSplits: HTMLElement[] = [];

  const elementUUID = hashString(`${options.style} ${elementProxy.textContent}`, true);
  const className = options.className || `splitText__${options.style}--${elementUUID}`;
  const generatedSelector = `.${className}`;

  const cleanupSplitSpans = (el: HTMLElement, classPrefix: string) => {
    const spans = el.querySelectorAll(`span[class^="${classPrefix}"]`);
    const brs = el.querySelectorAll(`br[class$="__break"]`);

    spans.forEach(span => {
      const parent = span.parentNode;
      if (!parent) return;

      const textNode = document.createTextNode(span.textContent || '');
      parent.replaceChild(textNode, span);
    });

    brs.forEach(br => {
      const parent = br.parentNode;
      if (!parent) return;

      const brNode = document.createElement('br');
      parent.replaceChild(brNode, br);
    });
  };

  cleanupSplitSpans(elementProxy, 'splitText__');

  const splitTextNode = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      if (!text.trim()) return;

      const fragment = document.createDocumentFragment();
      let split: string[] = [];

      if (options.style === 'char') {
        split = text.split('');
      } else if (options.style === 'word') {
        split = text.split(/(\s+)/);
      } else if (options.style === 'line') {
        split = text.split('.');
      }

      split.forEach((part) => {
        if (options.style !== 'line' && /^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.textContent = part;
          span.className = className;
          span.style.display = 'inline-block';
          span.style.willChange = 'transform';
          fragment.appendChild(span);
          finalSplits.push(span);

          if (options.style === 'line') {
            const br = document.createElement('br');
            br.className = `${className}__break`;
            fragment.appendChild(br);
          }
        }
      });

      (node as ChildNode).replaceWith(fragment);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(splitTextNode);
    }
  };

  splitTextNode(elementProxy);
  return new SplitTextResult(finalSplits, generatedSelector);
};