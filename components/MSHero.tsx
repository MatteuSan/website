import React, { ComponentPropsWithRef, forwardRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { animateInView, MOTION_PREFERENCES, useMediaQuery } from "@/lib/gsap";

interface MSHeroProps extends ComponentPropsWithRef<any> {
  ref?: React.Ref<any> // for animations
  customLayout?: boolean;
  children?: React.ReactNode|string;
}

const MSHero = forwardRef<HTMLDivElement, MSHeroProps>((props, ref) => {
  const { customLayout, children, ...rest } = props;
  const heroRef = React.useRef<HTMLDivElement>(null);

  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);

    const exit = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: '7% top',
        scrub: true,
      }
    });

    animateInView(heroRef.current).from(heroRef.current, {
      opacity: 0,
      y: !isMotionReduced ? 70 : 0,
      duration: 1
    });

    exit.to(heroRef.current, {
      opacity: 0,
      y: -100,
      ease: 'power2',
    });
  }, { scope: heroRef });

  return (
    <section className="ms-hero" ref={heroRef}>
      { customLayout ? (
        <>{ children }</>
      ) : (
        <div className="ms-hero__wrapper" ref={ref} {...rest}>
          { children }
        </div>
      ) }
    </section>
  );
});

export default MSHero;