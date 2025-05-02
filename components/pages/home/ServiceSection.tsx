import React, { useRef } from 'react';
import ServiceCard from '@/components/pages/home/ServiceCard';

import DesignHero from '@/assets/static/design--hero.png';
import DevelopmentHero from '@/assets/static/development--hero.png';
import DesignSystemsHero from '@/assets/static/design-systems--hero.png';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/dist/SplitText';
import {
  animateInView,
  BY_WORD,
  MOTION_PREFERENCES, REDUCED_TEXT_MASK_ANIMATION,
  TEXT_MASK_ANIMATION,
  useMediaQuery
} from '@/lib/gsap';

const ServiceSection: React.FC = ( ) => {
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    const exitPage = gsap.timeline({
      scrollTrigger: {
        trigger: servicesSectionRef.current,
        start: 'bottom 25%',
        scrub: true,
      }
    });

    const enterAnimation = () => {
      const services = animateInView(servicesSectionRef.current, {
        once: true,
      });

      services.from(servicesSectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 1,
      });

      const contentSplit = SplitText.create('.content', BY_WORD);
      services.from(contentSplit.words, {
        ...(!isMotionReduced ? TEXT_MASK_ANIMATION : REDUCED_TEXT_MASK_ANIMATION),
        onComplete: () => {
          contentSplit.revert();
        }
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
    <section id="stuff-i-do" className="w-full h-screen pb-4xl" ref={servicesSectionRef}>
      <section className="constrained mx-auto mb-md flex flow-row wrap-none jc-space-between ai-center gap-sm">
        <div>
          <h2 className="family-supertitle size-3xl @medium:size-4xl letter-spacing-condensed">Stuff I do</h2>
          <p className="content de-emphasize size-md weight-light">Here's how I can help you.</p>
        </div>
      </section>
      <ul className="service-container constrained">
        <ServiceCard
          title="Web Design"
          description="I design interfaces that feel as good as they look—clean, accessible, and always user-centered. Every screen is crafted with care and intention, delivering the kind of experience your users will remember and love."
          media={DesignHero}
          alt="Design services image."
          link="/work?filter=Design"
        >
          <ol className="service-card__list">
            <li data-service-number="01">Responsive Design</li>
            <li data-service-number="02">Wireframing and Prototyping</li>
            <li data-service-number="03">Design Audit and Consulting</li>
          </ol>
        </ServiceCard>
        <ServiceCard
          title="Web Development"
          description="I develop websites and web apps that are beautiful, fast, and accessible—crafted with modern, reliable technologies that scale according to your needs and exceed your users’ expectations."
          media={DevelopmentHero}
          alt="Development services image."
          link="/work?filter=Development"
        >
          <ol className="service-card__list">
            <li data-service-number="01">Front-end Development</li>
            <li data-service-number="02">SEO and Accessibility</li>
            <li data-service-number="03">Delightful Interactions</li>
          </ol>
        </ServiceCard>
        <ServiceCard
          title="Design Systems"
          description="I specialize in building custom tools that bring consistency across design and development—unifying product experiences and boosting team productivity. From foundation to adoption, I'll help you create and maintain design systems that scale with your business needs."
          media={DesignSystemsHero}
          alt="Design Systems services image."
          link="/tools?filter=Design%20System"
        >
          <ol className="service-card__list">
            <li data-service-number="01">Design Tokens</li>
            <li data-service-number="02">Component Creation</li>
            <li data-service-number="03">Documentation and Guidelines</li>
            <li data-service-number="04">Adoption and Onboarding</li>
          </ol>
        </ServiceCard>
      </ul>
    </section>
  );
};

export default ServiceSection;