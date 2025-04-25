import React, { useRef } from 'react';
import { Work } from "@/lib/types";
import { MSButton, MSInfoCard } from "@/components";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateInView, MOTION_PREFERENCES, SCREEN_SIZES, splitText, useMediaQuery } from '@/lib/gsap';

interface WorksSectionProps {
  works: Work[];
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WorksSection: React.FC<WorksSectionProps> = ({ works }) => {
  const workSectionRef = useRef<HTMLDivElement>(null);
  const leadTextRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);
    const leadTextSplit = splitText(leadTextRef.current);

    const enterAnimation = () => {
      animateInView(leadTextRef.current).from(leadTextSplit.identifier, {
        y: !isMotionReduced ? '100%' : 0,
        rotateX: !isMotionReduced ? -90 : 0,
        rotateZ: !isMotionReduced ? 10 : 0,
        stagger: 0.05
      });

      animateInView('.content').from('.content', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 1,
      });

      if (useMediaQuery(SCREEN_SIZES.isLarge)) {
        animateInView('.ms-button.is-full-width', { once: true }).fromTo('.ms-button.is-full-width', {
          opacity: 0,
          y: !isMotionReduced ? 30 : 0,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.5,
        });
      }
    }

    enterAnimation();
  }, { scope: workSectionRef });

  return (
    <section id="stuff-i-did" ref={workSectionRef}>
      <section className="constrained w-full h-screen mx-auto mb-md flex flow-row wrap-none jc-space-between ai-center gap-sm mb-lg py-3xl">
        <div>
          <h1 ref={leadTextRef} className="lead-text family-supertitle size-3xl @medium:size-4xl letter-spacing-condensed">Stuff I did</h1>
          <p className="content de-emphasize size-md weight-light">Here some of the previous works I'm most proud of.</p>
          <ul className="list-style-none grid cols-1 @medium:cols-2 gap-md mt-lg" id="projects">
            { works.map((item, key) =>  (
              <MSInfoCard index={key} key={ key } item={item} linkBase="work"/>
            ))
            }
            <MSButton link="/work" type="outlined full-width" icon={ ['right', <ArrowRightIcon/>] }>See all
              works</MSButton>
          </ul>
        </div>
      </section>
    </section>
  );
};

export default WorksSection;