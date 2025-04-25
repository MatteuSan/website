import React, { useRef, useState } from 'react';
import Image from "next/image";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateInView, MOTION_PREFERENCES, SCREEN_SIZES, splitText, useMediaQuery } from '@/lib/gsap';

interface AboutMeSectionProps {}

const AboutMeSection: React.FC<AboutMeSectionProps> = () => {
  const [professionIndex, setProfessionIndex] = useState<number>(0);
  const [adjectiveIndex, setAdjectiveIndex] = useState<number>(0);

  const leadTextRef = useRef<HTMLHeadingElement>(null);
  const aboutMeSectionRef = useRef<HTMLDivElement>(null);
  const professionRef = useRef<HTMLSpanElement>(null);
  const adjectiveRef = useRef<HTMLSpanElement>(null);

  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);
  const isSizeLarge = useMediaQuery(SCREEN_SIZES.isLarge);

  const PROFESSIONS = [
    'a UX Engineer',
    'a Web Developer',
    'a Web Designer',
    'an Experience Artisan',
  ];

  const ADJECTIVES = [
    'unforgettable',
    'beautiful',
    'accessible',
    'delightful',
    'timeless'
  ];

  const handleSetProfession = () => {
    gsap.to(professionRef.current, {
      duration: 0.5,
      opacity: 0,
      y: -30,
      scale: 0.7,
      ease: 'sine.inOut',

      onComplete: () => {
        setProfessionIndex((prevState) => (prevState + 1) % PROFESSIONS.length);
        gsap.fromTo(professionRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.7,
          ease: 'sine.inOut',
        }, {
          duration: 0.5,
          opacity: 1,
          y: 0,
          scale: 1,
          delay: 0.1,
          ease: 'sine.inOut',
        });
      }
    });
  }

  const handleSetAdjective = () => {
    gsap.to(adjectiveRef.current, {
      duration: 0.5,
      opacity: 0,
      y: -30,
      scale: 0.7,
      ease: 'sine.inOut',

      onComplete: () => {
        setAdjectiveIndex((prevState) => (prevState + 1) % ADJECTIVES.length);
        gsap.fromTo(adjectiveRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.7,
          ease: 'sine.inOut',
        }, {
          duration: 0.5,
          opacity: 1,
          y: 0,
          scale: 1,
          delay: 0.1,
          ease: 'sine.inOut',
        });
      }
    });
  }

  useGSAP(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);

    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutMeSectionRef.current,
        start: () => !isSizeLarge ? 'top 10%' : 'top 15%',
        end: () => !isSizeLarge ? 'bottom 10%' : 'bottom 15%',
        toggleActions: 'play resume resume complete',
        once: true,
      }
    });
    const leadTextSplit = splitText(leadTextRef.current);

    const initialState = () => {
      if (professionRef.current) gsap.set(professionRef.current, { opacity: 1, y: 0 });
      if (adjectiveRef.current) gsap.set(adjectiveRef.current, { opacity: 1, y: 0 });
    }

    const enterAnimation = () => {
      animateInView('.lead-text').from(aboutMeSectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 1,
      });

      animateInView('.lead-text').from(leadTextSplit.identifier, {
        y: !isMotionReduced ? '100%' : 0,
        rotateX: !isMotionReduced ? -90 : 0,
        rotateZ: !isMotionReduced ? 10 : 0,
        stagger: 0.05
      });

      contentTl.from('.content', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 1,
      });

      contentTl.from('.content-2', {
        opacity: 0,
        duration: 1,
      }, '<10%');

      contentTl.from('.content-4', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 1,
      }, '<10%');

      contentTl.from('.picture-frame', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 1,
      }, '<10%');
    }

    const exitAnimation = () => {
      //
    }

    initialState();
    enterAnimation();
    exitAnimation();
  }, { scope: aboutMeSectionRef });

  return (
    <section id="about-me" className="constrained w-full h-screen flex flow-column @large:flow-row jc-start ai-center pt-4xl pb-6xl" ref={aboutMeSectionRef}>
      <div className="content-wrapper">
        <h2 ref={leadTextRef} className="lead-text family-supertitle size-4xl letter-spacing-condensed">About me.</h2>
        <p className="content mt-sm size-lg weight-light">
          I'm <span ref={professionRef} className="profession highlight" onClick={() => handleSetProfession()}
                    title="Click me ;>">{ PROFESSIONS[professionIndex] || 'a UX Engineer' }</span> <span
          className="content-2">based in the Philippines.</span> I create <span ref={adjectiveRef} className="adjective highlight" onClick={() => handleSetAdjective()}>{ ADJECTIVES[adjectiveIndex] || 'beautiful, accessible, and unforgettable' }</span> experiences for users on the web.
        </p>
        <p className="content-4 mt-sm mb-2xl size-md weight-light">
          I've worked with numerous companies in <span className="highlight">designing</span> and <span className="highlight">developing</span> the experiences their users know and love.
        </p>
      </div>
      <div className="picture-frame" style={{ flexShrink: 0 }}>
        <Image src="/img/favicon.png" style={{ aspectRatio: '1', objectFit: 'cover' }} alt="Matteu Headshot" width={ 500 } height={ 500 }/>
      </div>
    </section>
  );
};

export default AboutMeSection;