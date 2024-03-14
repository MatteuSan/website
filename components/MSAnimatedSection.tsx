import React, { useRef, useEffect, ComponentPropsWithoutRef } from 'react';
import { DynamicOption, m, useAnimation, useInView } from 'framer-motion';

interface MSAnimatedSectionProps extends ComponentPropsWithoutRef<any> {
  delay?: number;
  stagger?: number;
  children?: React.ReactNode;
}

const MSAnimatedSection: React.FC<MSAnimatedSectionProps> = ({ delay, stagger, children, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const elControl = useAnimation();

  useEffect(() => {
    if (isInView) {
      elControl.start('visible').then(r => r);
    }
  }, [isInView]);

  return (
    <m.section
      ref={ ref }
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.2, ease: 'easeInOut', delay: delay ? delay : 0.2 }}
      initial="hidden"
      animate={ elControl }
      {...props}>
      {children}
    </m.section>
  );
};

export default MSAnimatedSection;