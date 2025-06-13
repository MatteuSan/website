import React, { useRef } from 'react';
import MSServiceCard from '@/components/cards/MSServiceCard';

import DesignHero from '@/assets/static/design--hero.png';
import DevelopmentHero from '@/assets/static/development--hero.png';
import DesignSystemsHero from '@/assets/static/design-systems--hero.png';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/dist/SplitText';
import {
  animateInView,
  BY_WORD,
  MOTION_PREFERENCES, REDUCED_ANIMATION,
  SWOOP_IN_ANIMATION,
  useMediaQuery
} from '@/lib/gsap';

const ServiceSection: React.FC = ( ) => {
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const servicesSectionHeaderRef = useRef<HTMLDivElement>(null);
  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    const exitPage = gsap.timeline({
      scrollTrigger: {
        trigger: servicesSectionRef.current,
        start: 'bottom 45%',
        scrub: true,
      }
    });

    const enterAnimation = () => {
      const services = animateInView(servicesSectionRef.current, {
        once: true,
      });

      const parallax = gsap.timeline({
        scrollTrigger: {
          trigger: servicesSectionHeaderRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        }
      });

      services.from(servicesSectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 1,
      });

      parallax.from(servicesSectionHeaderRef.current, {
        y: !isMotionReduced ? 0 : 0,
        duration: 1,
      });

      const contentSplit = SplitText.create('.content', BY_WORD);
      services.from(contentSplit.words, {
        ...(!isMotionReduced ? SWOOP_IN_ANIMATION : REDUCED_ANIMATION),
        onComplete: () => {
          contentSplit.revert();
        }
      }, '-=0.5');

      services.from('.content-2', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
      }, '-=0.5');
    };

    const exitAnimation = () => {
      exitPage.to(servicesSectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? -30 : 0,
      });
    }

    enterAnimation();
    exitAnimation();
  }, { scope: servicesSectionRef });

  return (
    <section id="services" className="w-full h-screen pb-4xl" ref={servicesSectionRef}>
      <section className="constrained-layout mx-auto mb-md flex flow-row wrap-none jc-space-between ai-center gap-sm">
        <div ref={servicesSectionHeaderRef} className="mb-2xl @large:mb-3xl">
          <h2 className="family-mono de-emphasize size-sm wrap-brackets">Services</h2>
          <p className="content family-supertitle big-ass-text line-height-condensed letter-spacing-condensed">Here's what I can do.</p>
          <p className="content-2 family-body de-emphasize size-sm mt-md">I take pride in providing premium digital services to clients.</p>
        </div>
      </section>
      <ul className="service-container constrained">
        <MSServiceCard
          title="Web & Mobile Design"
          description="I craft bespoke user-centered experiences with care and intention that they will remember and love."
          media={DesignHero}
          alt="Design services image."
        >
          <ol className="service-card__list">
            <li data-service-number="01">Responsive Design</li>
            <li data-service-number="02">Wireframing</li>
            <li data-service-number="03">Content Writing</li>
            <li data-service-number="04">Interactive Design</li>
          </ol>
        </MSServiceCard>
        <MSServiceCard
          title="Web Development"
          description="I engineer experiences your users deserve—experiences that scale, deliver, and exceed expectations."
          media={DevelopmentHero}
          alt="Development services image."
        >
          <ol className="service-card__list">
            <li data-service-number="01">Website & Web App Development</li>
            <li data-service-number="02">SEO Optimization</li>
            <li data-service-number="03">Accessibility</li>
            <li data-service-number="04">Motion & Interactivity</li>
          </ol>
        </MSServiceCard>
        <MSServiceCard
          title="Design Systems"
          description="I architect systems that bring organization and consistency to UI/UX—unifying product experiences, boosting team productivity, and scaling experiences to its highest degree."
          media={DesignSystemsHero}
          alt="Design Systems services image."
        >
          <ol className="service-card__list">
            <li data-service-number="01">Design Tokens & Components</li>
            <li data-service-number="02">Documentation and Guidelines</li>
            <li data-service-number="03">Adoption and Onboarding</li>
            <li data-service-number="04">Brand & Identity Development</li>
          </ol>
        </MSServiceCard>
      </ul>
    </section>
  );
};

export default ServiceSection;