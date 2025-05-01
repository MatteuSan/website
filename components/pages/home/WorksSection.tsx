import React, { useRef } from 'react';
import { Work } from "@/lib/types";
import { MSButton, MSInfoCard } from "@/components";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/dist/SplitText';
import { animateInView, MOTION_PREFERENCES, SCREEN_SIZES, useMediaQuery } from '@/lib/gsap';

interface WorksSectionProps {
  works: Work[];
}

const WorksSection: React.FC<WorksSectionProps> = ({ works }) => {
  const workSectionRef = useRef<HTMLDivElement>(null);
  const leadTextRef = useRef<HTMLHeadingElement>(null);

  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);
  const isSizeLarge = useMediaQuery(SCREEN_SIZES.isLarge);

  useGSAP(() => {
    const subtitleSplit = SplitText.create('.content', {
      type: 'words',
      mask: 'words',
    });

    const exitPage = gsap.timeline({
      scrollTrigger: {
        trigger: workSectionRef.current,
        start: 'bottom 25%',
        scrub: true,
      }
    });

    const enterAnimation = () => {
      const work = animateInView(workSectionRef.current);

      work.from(workSectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
      });

      work.from(subtitleSplit.words, {
        y: !isMotionReduced ? '100%' : 0,
        stagger: 0.05
      });

      if (isSizeLarge) {
        animateInView('.ms-button.is-outlined.is-full-width', { once: true }).fromTo('.ms-button.is-outlined.is-full-width', {
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

    const exitAnimation = () => {
      exitPage.to(workSectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? -30 : 0,
      });
    }

    enterAnimation();
    exitAnimation();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
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