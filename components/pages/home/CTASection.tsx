import React from 'react';
import { MSButton } from "@/components";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/dist/SplitText';

import { SiGithub } from "@icons-pack/react-simple-icons";
import {
  animateInView,
  BY_LINE,
  BY_WORD,
  MOTION_PREFERENCES, REDUCED_ANIMATION,
  SWOOP_IN_ANIMATION,
  useMediaQuery
} from '@/lib/gsap';

interface CTASectionProps {}

const CTASection: React.FC<CTASectionProps> = () => {
  const ctaSectionRef = React.useRef<HTMLDivElement>(null);

  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    const enterAnimation = () => {
      const cta = animateInView('.lead-text', {
        once: true,
        timing: { start: 'top 80%' }
      });

      cta.from(ctaSectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 0.5,
      });

      const leadTextSplit = SplitText.create('.lead-text', BY_WORD);
      cta.from(leadTextSplit.words, {
        ...(!isMotionReduced ? SWOOP_IN_ANIMATION : REDUCED_ANIMATION),
        stagger: 0.1,
        onComplete: () => leadTextSplit.revert()
      });

      const contentSplit = SplitText.create('.content', BY_LINE);
      cta.from(contentSplit.lines, {
        ...(!isMotionReduced ? SWOOP_IN_ANIMATION : REDUCED_ANIMATION),
        // onComplete: () => contentSplit.revert()
      }, '-=0.5');

      cta.fromTo('.actions', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.4,
      }, '-=0.5');
    }

    enterAnimation();
  }, { scope: ctaSectionRef });

  return (
    <section className="constrained-layout h-half-screen grid pc-center my-lg @medium:my-2xl @large:my-6xl" ref={ctaSectionRef} id="contact">
      <div className="copy mb-xl">
        <h2 className="family-mono de-emphasize size-sm wrap-brackets">Contact</h2>
        <p className="lead-text will-split family-supertitle size-2xl @medium:size-3xl line-height-condensed letter-spacing-condensed mb-sm">
          Build the experience your users <span className="highlight">deserve</span>.
        </p>
        <p className="content will-split size-md @medium:size-lg weight-light">Have a project in mind? Let's bring it to life. From first draft to final push, I'll help you ship something amazing.</p>
      </div>
      <div className="actions flex flow-row gap-md">
        <MSButton type="filled large" icon={ ['left', <EnvelopeIcon />] } link="mailto:matt@matteusan.com">Let's talk</MSButton>
        <MSButton type="outlined icon-only large" icon={ ['left', <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>] } link="https://linkedin.com/in/matteusan" />
        <MSButton type="outlined icon-only large" icon={ ['left', <SiGithub />] } link="https://github.com/MatteuSan" />
      </div>
    </section>
  );
};

export default CTASection;