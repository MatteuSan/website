import React, { useRef } from 'react';
import Image from "next/image";

import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/dist/SplitText';
import {
  animateInView,
  BY_WORD,
  BY_LINE,
  MOTION_PREFERENCES,
  useMediaQuery,
  SWOOP_IN_ANIMATION, REDUCED_ANIMATION
} from '@/lib/gsap';
import { MSButton, MSHero } from '@/components';
import { ArrowDownLeftIcon, ArrowDownRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface AboutMeSectionProps {}

const AboutMeSection: React.FC<AboutMeSectionProps> = () => {
  const aboutMeSectionRef = useRef<HTMLDivElement>(null);

  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    const titleSplit = SplitText.create('.lead-text', BY_WORD);
    const subtitleSplit = SplitText.create('.content', BY_LINE);

    const enterAnimation = () => {
      const aboutMe = animateInView(aboutMeSectionRef.current, {
        once: true,
      });

      aboutMe.from(aboutMeSectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? 70 : 0,
        duration: 1
      });

      aboutMe.from(titleSplit.words, {
        ...(!isMotionReduced ? SWOOP_IN_ANIMATION : REDUCED_ANIMATION),
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
        ...(!isMotionReduced ? SWOOP_IN_ANIMATION : REDUCED_ANIMATION),
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
        <Image decoding="async" loading="eager" src="/img/favicon.png" style={{ aspectRatio: '1', objectFit: 'cover' }} alt="Matteu Headshot" width={ 500 } height={ 500 }/>
      </div>
      <div>
        <h2 className="lead-text family-supertitle big-ass-text letter-spacing-condensed stretch-xcondensed will-split">Hi, I'm Matt.</h2>
        <p className="content mt-sm size-md @large:size-lg weight-light will-split">
          <span className="highlight">a UX Engineer</span> based in the Philippines, <br/>
          and I create bridges from software to user.
        </p>
        <p className="content-2 mt-md size-sm de-emphasize">
          I've worked with numerous companies in designing and developing their brand <br /> and the amazing experiences their users know and love.
        </p>
        <div id="cta" className="content-3 w-full flex flow-row @medium:flow-row wrap-none mt-lg gap-sm @medium:gap-md">
          <MSButton link="mailto:matt@matteusan.com" type={`filled large`} icon={['left', <EnvelopeIcon />]}>Let's talk</MSButton>
          <MSButton
            link="#stuff-i-do"
            type={`outlined large icon-only`}
            icon={['left', <ArrowDownRightIcon />]}
          />
        </div>
      </div>
    </MSHero>
  );
};

export default AboutMeSection;