import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { hashString } from '@/lib/string';

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
 * @param {string} query
 */
export const useMediaQuery = (query: string) => {
  const mm = gsap.matchMedia();
  const debug = mm.add({
    mq: query
  }, (ctx) => {
    // @ts-ignore
    return ctx.conditions.mq;
  });

  // @ts-ignore
  return debug.contexts[0].conditions.mq;
}

/**
 * Parallax exit animation
 * @param {number} instance
 * @param {number} duration
 */
export const parallaxExit = (instance: number = 1, duration: number = 3) => {
  return {
    y: !useMediaQuery(MOTION_PREFERENCES.isReduced) ? -150 + ((10 * (instance - 1)) * -1) : 0,
    opacity: 0,
    duration: duration,
  };
}

/**
 * Splits text into manageable parts for animation.
 * @param element
 * @param options
 * @returns {string} Generated class selector. (i.e. `.class-name`)
 */
export const splitText = (
  element: HTMLElement | null,
  options: {
    style?: 'word' | 'char' | 'line',
    className?: string
  } = { style: 'char' }
): string => {
  if (!element) return '.';

  const elementUUID = hashString(`${options.style} ${element.textContent}`, true);
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

  cleanupSplitSpans(element, 'splitText__');

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
          fragment.appendChild(span);

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

  splitTextNode(element);
  return generatedSelector;
};