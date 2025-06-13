import React, { ComponentPropsWithRef, forwardRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { animateInView } from "@/lib/gsap";

interface MSHeroProps extends ComponentPropsWithRef<any> {
  ref?: React.Ref<any> // for animations
  customLayout?: boolean;
  children?: React.ReactNode|string;
}

const MSHero = forwardRef<HTMLDivElement, MSHeroProps>((props, ref) => {
  const { customLayout, children, ...rest } = props;
  const heroRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const exit = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    animateInView(heroRef.current).from(heroRef.current, {
      opacity: 0,
      duration: 1
    });

    exit.to(heroRef.current, {
      y: -50,
      ease: 'power2',
    });
    exit.to('.ms-hero__wrapper', {
      y: -100,
      duration: 2,
      ease: 'power2',
    }, '<');
    exit.to(heroRef.current, {
      opacity: 0,
    });
  }, { scope: heroRef });

  return (
    <>
      <div className="ms-hero__background" aria-hidden></div>
      <section className="ms-hero" ref={heroRef} {...rest}>
        { customLayout ? (
          <>{ children }</>
        ) : (
          <div className="ms-hero__wrapper" ref={ref}>
            { children }
          </div>
        ) }
      </section>
    </>
  );
});

export default MSHero;