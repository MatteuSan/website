import React, { useRef } from 'react';
import { Work } from "@/lib/types";
import { MSButton, MSInfoCard } from "@/components";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/dist/SplitText';
import {
  animateInView,
  BY_WORD,
  MOTION_PREFERENCES, REDUCED_ANIMATION,
  SCREEN_SIZES, SWOOP_IN_ANIMATION,
  useMediaQuery
} from '@/lib/gsap';

interface WorksSectionProps {
  works: Work[];
}

const WorksSection: React.FC<WorksSectionProps> = ({ works }) => {
  const workSectionRef = useRef<HTMLDivElement>(null);
  const leadTextRef = useRef<HTMLHeadingElement>(null);

  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    const exitPage = gsap.timeline({
      scrollTrigger: {
        trigger: workSectionRef.current,
        start: 'bottom 55%',
        scrub: true,
      }
    });

    const enterAnimation = () => {
      const work = animateInView(workSectionRef.current, {
        once: true,
      });

      work.from(workSectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
      });

      const subtitleSplit = SplitText.create('.content', BY_WORD);
      work.from(subtitleSplit.words, {
        ...(!isMotionReduced ? SWOOP_IN_ANIMATION : REDUCED_ANIMATION),
        onComplete: () => subtitleSplit.revert()
      });

      work.from('.content-2', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
      }, '-=0.5');
    }

    const exitAnimation = () => {
      exitPage.to(workSectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? -30 : 0,
      });
    }

    enterAnimation();
    exitAnimation();
  }, { scope: workSectionRef });

  return (
    <section id="works" ref={workSectionRef}>
      <section className="constrained-layout w-full mt-6xl">
        <div className="mb-2xl @large:mb-3xl">
          <h2 ref={leadTextRef} className="family-mono de-emphasize size-sm wrap-brackets">Works</h2>
          <p className="content family-supertitle big-ass-text line-height-condensed letter-spacing-condensed">Here's what I did.</p>
          <p className="content-2 family-body de-emphasize size-sm mt-md">Take a look at the works that companies invested in that expanded their online presence and drove business growth.</p>
        </div>
      </section>
      <div>
        <ul className="list-style-none grid cols-1 gap-xl @medium:gap-none @medium:cols-2 mt-lg" id="projects">
          { works.map((item, key) =>  (
            <MSInfoCard index={key} key={ key } item={item} linkBase="work"/>
          )) }
        </ul>
      </div>
    </section>
  );
};

export default WorksSection;