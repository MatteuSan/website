import React from 'react';
import { MSButton } from "@/components";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { SiGithub } from "@icons-pack/react-simple-icons";
import { animateInView, MOTION_PREFERENCES, useMediaQuery } from '@/lib/gsap';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CTASectionProps {}

const CTASection: React.FC<CTASectionProps> = () => {
  const ctaSectionRef = React.useRef<HTMLDivElement>(null);

  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.lead-text',
        start: 'top 80%',
        toggleActions: 'play resume resume reverse',
      }
    });

    const enterAnimation = () => {
      animateInView('.lead-text').from(ctaSectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 0.5,
      });

      animateInView('.lead-text').from('.lead-text', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 0.5,
        // delay: 0.075,
      });

      animateInView('.content').from('.content', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 0.5,
        // delay: 0.5,
      });

      const CTA_ACTIONS = gsap.utils.toArray('.cta__actions .ms-button');
      CTA_ACTIONS.forEach((button: any) => {
        const tl = gsap.timeline();

        tl.fromTo(button, {
          opacity: 0,
          y: !isMotionReduced ? 30 : 0,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          stagger: {
            amount: 0.025
          },
        });

        contentTl.add(tl);
      });
    }

    enterAnimation();
  }, { scope: ctaSectionRef });

  return (
    <section className="constrained h-half-screen grid pi-center my-4xl @large:my-6xl" ref={ctaSectionRef}>
      <section>
        <div className="mb-lg">
          <h2 className="lead-text family-supertitle size-2xl @medium:size-4xl @large:size-5xl line-height-condensed letter-spacing-condensed mb-sm">
            Build the experience your users <span className="highlight">deserve</span>.
          </h2>
          <p className="content size-md @medium:size-lg weight-light">Have a project in mind? Let's bring it to life. From first sketch to final push—I'll help you ship something <span className="highlight">amazing</span>.</p>
        </div>
        <div className="cta__actions flex flow-row gap-md mt-lg">
          <MSButton type="filled large" icon={ ['left', <EnvelopeIcon />] } link="mailto:matt@matteusan.com">Let's talk</MSButton>
          <MSButton type="outlined icon-only large" icon={ ['left', <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>] } link="https://linkedin.com/in/matteusan" />
          <MSButton type="outlined icon-only large" icon={ ['left', <SiGithub />] } link="https://github.com/MatteuSan" />
        </div>
      </section>
    </section>
  );
};

export default CTASection;