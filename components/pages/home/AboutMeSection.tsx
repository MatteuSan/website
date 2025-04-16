import React, { useRef } from 'react';
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface AboutMeSectionProps {}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AboutMeSection: React.FC<AboutMeSectionProps> = () => {
  const aboutMeSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutMeSectionRef.current,
        start: 'top 15%',
        end: 'bottom 15%',
        toggleActions: 'play pause resume reset',
        scrub: true,
        pin: true,
        pinType: 'fixed',
      }
    });

    const HIGHLIGHTS = gsap.utils.toArray('.highlight');

    const initialState = () => {
      gsap.set(aboutMeSectionRef.current, {
        opacity: 0,
        y: 40
      });

      HIGHLIGHTS.forEach((highlight: any) => {
        gsap.set(highlight, {
          opacity: 0,
          y: 10
        });
      });

      gsap.set('.profession', {
        text: 'a Web Developer',
        duration: 100
      });

      gsap.set('.content', {
        opacity: 0,
        y: 30,
      });

      gsap.set('.content-2', {
        opacity: 0,
        y: 30,
      });

      gsap.set('.content-3', {
        opacity: 0,
        y: 30,
      });

      gsap.set('.picture-frame', {
        opacity: 0,
        y: 30,
        rotation: 45
      });
    }

    const enterAnimation = () => {
      gsap.to(aboutMeSectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.lead-text',
          start: 'top 90%',
          scrub: true,
          toggleActions: 'play pause resume reset',
        }
      });

      HIGHLIGHTS.forEach((highlight: any) => {
        gsap.to(highlight, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: {
            amount: 0.05
          }
        });
      });

      contentTl.to('.content', {
        opacity: 1,
        y: 0,
        duration: 100,
      });

      contentTl.to('.profession', {
        delay: 100,
        text: {
          value: 'a Web Designer',
          speed: 0,
          type: 'diff'
        },
        duration: 100,
      }).to('.profession', {
        delay: 100,
        text: {
          value: 'an Experience Artisan',
          speed: 0,
          type: 'diff'
        },
        duration: 100,
      }).to('.profession', {
        delay: 100,
        text: {
          value: 'a UX Engineer',
          speed: 0,
          type: 'diff'
        },
        duration: 100,
      });

      contentTl.to('.content-2', {
        opacity: 1,
        y: 0,
        duration: 50,
      });

      contentTl.to('.content-3', {
        opacity: 1,
        y: 0,
        duration: 50,
      });

      contentTl.to('.picture-frame', {
        opacity: 1,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        duration: 50
      }, '<30%');
    }

    const exitAnimation = () => {
      // Exit animations
    }

    initialState();
    enterAnimation();
    exitAnimation();
  }, { scope: aboutMeSectionRef });

  return (
    <section id="about-me" className="constrained w-full h-half-screen flex flow-column @large:flow-row jc-start pt-3xl pb-6xl" ref={aboutMeSectionRef}>
      <div className="content-wrapper">
        <h2 className="lead-text family-supertitle size-4xl">About me.</h2>
        <p className="content mt-sm mb-2xl size-lg weight-light">
          I'm <span className="profession highlight">a UX Engineer</span> <span className="content-2">based in the Philippines. I create <span className="highlight">beautiful</span>, <span className="highlight">accessible</span>, and <span className="highlight">unforgettable</span> experiences for users on the web.</span>
        </p>
        <p className="content-3 mt-sm mb-2xl size-md weight-light">
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