import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { animateInView, MOTION_PREFERENCES, SCREEN_SIZES, splitText, useMediaQuery } from '@/lib/gsap';
import { MSButton, MSHero } from '@/components';
import { getCalApi } from '@calcom/embed-react';
import { site } from '@/constants/site';

interface AboutMeSectionProps {}

const AboutMeSection: React.FC<AboutMeSectionProps> = () => {
  const [professionIndex, setProfessionIndex] = useState<number>(0);

  const leadTextRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const aboutMeSectionRef = useRef<HTMLDivElement>(null);
  const professionRef = useRef<HTMLSpanElement>(null);

  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  const PROFESSIONS = [
    'A UX Engineer',
    'A Web Developer',
    'A Web Designer',
    'An Experience Artisan',
  ];

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "matteu" });
      cal('ui', {
        theme: 'dark',
        styles: {
          align: 'left',
          disabledDateButton: {
            background: '#211f1f',
            color: '#3d3838'
          }
        },
        colorScheme: site.themeColor,
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

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

  useGSAP(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);

    const leadTextSplit = splitText(leadTextRef.current);
    const subtitleSplit = splitText(subtitleRef.current, { style: 'line' });

    const initialState = () => {
      if (professionRef.current) gsap.set(professionRef.current, { opacity: 1, y: 0 });
    }

    const enterAnimation = () => {
      animateInView(aboutMeSectionRef.current).from(aboutMeSectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? 70 : 0,
        duration: 1
      });

      animateInView('.lead-text').from(leadTextSplit.identifier, {
        y: !isMotionReduced ? '100%' : 0,
        rotateX: !isMotionReduced ? -90 : 0,
        rotateZ: !isMotionReduced ? 10 : 0,
        stagger: 0.05
      });

      animateInView(aboutMeSectionRef.current).fromTo('.picture-frame', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 0.5,
      }, {
        opacity: 1,
        y: 0,
      }, '<10%');

      animateInView(aboutMeSectionRef.current).from(subtitleSplit.identifier, {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        // duration: 0.5,
        stagger: 0.05
      }, '+=0.5');

      animateInView(aboutMeSectionRef.current).from('.content-2', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 0.5,
      }, '+=1');

      animateInView(aboutMeSectionRef.current).from('.content-3', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 0.5,
      }, '+=1.5');
    }

    const exitAnimation = () => {
      //
    }

    initialState();
    enterAnimation();
    exitAnimation();
  }, { scope: aboutMeSectionRef });

  return (
    <MSHero>
      <div className="constrained w-full flex flow-column gap-lg @large:gap-xl jc-center ai-center" ref={aboutMeSectionRef}>
        <div className="picture-frame" style={{ flexShrink: 0 }}>
          <Image src="/img/favicon.png" style={{ aspectRatio: '1', objectFit: 'cover' }} alt="Matteu Headshot" width={ 500 } height={ 500 }/>
        </div>
        <div>
          <h2 ref={leadTextRef} className="lead-text family-supertitle size-4xl letter-spacing-condensed align-center">Hi, I'm Matt.</h2>
          <p className="content mt-sm size-md @large:size-lg weight-light align-center" ref={subtitleRef}>
          <span ref={professionRef} className="profession highlight mr-sm" onClick={() => handleSetProfession()} title="Click me ;>">
            { PROFESSIONS[professionIndex] || 'a UX Engineer' }
          </span>based in the Philippines, <br/>
            and I create bridges from software to user
          </p>
          <p className="content-2 mt-md size-sm de-emphasize align-center">
            I've worked with numerous companies in designing and developing their brand <br /> and the amazing experiences their users know and love.
          </p>
        </div>
        <div id="cta" className="content-3 flex flow-row wrap-none jc-center ai-center gap-md @medium:gap-lg">
          <MSButton data-cal-link="matteu" data-cal-config='{"theme":"dark"}' type="filled large">Book a call</MSButton>
        </div>
      </div>
    </MSHero>
  );
};

export default AboutMeSection;