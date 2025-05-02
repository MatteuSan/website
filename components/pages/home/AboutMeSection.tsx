import React, { useRef } from 'react';
import Image from "next/image";

import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/dist/SplitText';
import {
  animateInView,
  BY_CHAR,
  BY_LINE,
  MOTION_PREFERENCES,
  useMediaQuery,
  TEXT_MASK_ANIMATION, REDUCED_TEXT_MASK_ANIMATION
} from '@/lib/gsap';
import { MSButton, MSHero } from '@/components';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

interface AboutMeSectionProps {}

const AboutMeSection: React.FC<AboutMeSectionProps> = () => {
  const aboutMeSectionRef = useRef<HTMLDivElement>(null);

  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    const titleSplit = SplitText.create('.lead-text', BY_CHAR);
    const subtitleSplit = SplitText.create('.content', { ...BY_LINE });

    const enterAnimation = () => {
      const aboutMe = animateInView(aboutMeSectionRef.current, {
        once: true,
      });

      aboutMe.from(aboutMeSectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? 70 : 0,
        duration: 1
      });

      aboutMe.from(titleSplit.chars, {
        ...(!isMotionReduced ? TEXT_MASK_ANIMATION : REDUCED_TEXT_MASK_ANIMATION),
        onComplete: () => titleSplit.revert()
      }, '-=0.5');

      aboutMe.fromTo('.picture-frame', {
        opacity: 0,
        duration: 0.5,
      }, {
        opacity: 1,
        y: 0,
      }, '<');

      aboutMe.from(subtitleSplit.lines, {
        ...(!isMotionReduced ? TEXT_MASK_ANIMATION : REDUCED_TEXT_MASK_ANIMATION),
        stagger: 0.1,
        onComplete: () => subtitleSplit.revert()
      }, '-=0.5');

      aboutMe.from('.content-2', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 0.5,
      }, '-=0.5');

      aboutMe.from('.content-3', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 0.5,
      }, '<50%');
    }

    const exitAnimation = () => {
      //
    }

    enterAnimation();
    exitAnimation();
  }, { scope: aboutMeSectionRef });

  return (
    <MSHero ref={aboutMeSectionRef}>
      <div className="picture-frame" style={{ flexShrink: 0 }}>
        <Image src="/img/favicon.png" style={{ aspectRatio: '1', objectFit: 'cover' }} alt="Matteu Headshot" width={ 500 } height={ 500 }/>
      </div>
      <div>
        <h2 className="lead-text family-supertitle size-4xl letter-spacing-condensed align-center will-split">Hi, I'm Matt.</h2>
        <p className="content mt-sm size-md @large:size-lg weight-light align-center will-split">
          <span className="highlight">a UX Engineer</span> based in the Philippines, <br/>
          and I create bridges from software to user.
        </p>
        <p className="content-2 mt-md size-sm de-emphasize align-center">
          I've worked with numerous companies in designing and developing their brand <br /> and the amazing experiences their users know and love.
        </p>
      </div>
      <div id="cta" className="content-3 flex flow-column @medium:flow-row wrap-none jc-center ai-center gap-sm @medium:gap-md">
        <MSButton link="mailto:matt@matteusan.com" type={`filled large`} icon={['left', <EnvelopeIcon />]}>Let's talk</MSButton>
        <p className="de-emphasize">or</p>
        <MSButton link="https://linkedin.com/in/matteusan" type={`outlined large`} icon={['left', <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>]}>Let's connect</MSButton>
      </div>
    </MSHero>
  );
};

export default AboutMeSection;