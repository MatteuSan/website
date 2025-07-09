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
import { ArrowDownRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useLenis } from 'lenis/react';

interface AboutMeSectionProps {}

const AboutMeSection: React.FC<AboutMeSectionProps> = () => {
  const aboutMeSectionRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
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
    <MSHero ref={aboutMeSectionRef} id="about-me">
      <div className="picture-frame" style={{ flexShrink: 0 }}>
        <Image decoding="async" loading="eager" src="/img/favicon.png" style={{ aspectRatio: '1', objectFit: 'cover' }} alt="Matteu Headshot" width={ 500 } height={ 500 }/>
      </div>
      <div>
        <h2 className="family-mono size-sm de-emphasize wrap-brackets">About me</h2>
        <p className="lead-text family-supertitle size-5xl @medium:size-6xl line-height-x-short squeeze-tight stretch-x-condensed will-split">Hi, I'm Matt.</p>
        <p className="content mt-sm size-md @large:size-lg weight-light will-split">
          <span className="highlight">A UX Engineer</span> based in the Philippines, <br/>
          and I create bridges from software to users.
        </p>
        <p className="content-2 mt-md size-sm de-emphasize">
          I've helped businesses establish their presence online and build experiences their users know and love.
        </p>
        <div id="cta" className="content-3 w-full flex flow-row @medium:flow-row wrap-none mt-lg gap-sm @medium:gap-md">
          <MSButton link="mailto:matt@matteusan.com" type={`filled large`} icon={['left', <EnvelopeIcon />]}>Let's talk</MSButton>
          <MSButton
            type={`outlined large icon-only`}
            icon={['left', <ArrowDownRightIcon />]}
            onClick={() => {
              if (lenis) {
                lenis.scrollTo('#services', { offset: -100 });
              }
            }}
          />
        </div>
      </div>
    </MSHero>
  );
};

export default AboutMeSection;