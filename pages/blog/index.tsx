import React, { useState } from 'react';
import { NextPage } from 'next';
import { DefaultLayout, MainContent } from "@/layouts/DefaultLayout";
import { MSHero } from '@/components';
import { useRouter } from 'next/router';
import {
  animateInView,
  BY_CHAR,
  BY_LINE,
  MOTION_PREFERENCES,
  REDUCED_TEXT_MASK_ANIMATION,
  TEXT_MASK_ANIMATION,
  useMediaQuery
} from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/dist/SplitText';

const BlogMainPage: NextPage = () => {
  const blogSectionRef = React.useRef<HTMLDivElement>(null);
  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    const titleSplit = SplitText.create('.lead-text', BY_CHAR);
    const subtitleSplit = SplitText.create('.content', BY_LINE);

    const tools = animateInView(blogSectionRef.current, {
      once: true,
    });

    tools.from(blogSectionRef.current, {
      opacity: 0,
      y: !isMotionReduced ? 70 : 0,
      duration: 1
    });

    tools.from(titleSplit.chars, {
      ...(!isMotionReduced ? TEXT_MASK_ANIMATION : REDUCED_TEXT_MASK_ANIMATION),
      onComplete: () => titleSplit.revert()
    }, '-=0.5');

    tools.fromTo('.picture-frame', {
      opacity: 0,
      duration: 0.5,
    }, {
      opacity: 1,
      y: 0,
    }, '<');

    tools.from(subtitleSplit.lines, {
      ...(!isMotionReduced ? TEXT_MASK_ANIMATION : REDUCED_TEXT_MASK_ANIMATION),
      stagger: 0.1,
      onComplete: () => subtitleSplit.revert()
    }, '-=0.5');

    tools.from('.content-2', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.5,
    }, '-=0.5');

    tools.from('.content-3', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.5,
    }, '<50%');
  });

  return (
    <DefaultLayout title="BLOG" description="Coming soon." hasHero>
      <section className="mb-xl w-full h-quarter-screen flex flow-column jc-end" ref={blogSectionRef}>
        <div className="w-full constrained">
          <h2 className="lead-text family-supertitle size-4xl letter-spacing-condensed">Blog</h2>
          <p className="content size-md @large:size-lg weight-light">The place where I share my insights on things.</p>
          <p className="content-2 mt-md size-sm de-emphasize">
            I write a few posts from time to time sharing bits and pieces of information I find interesting about the things I work on.
          </p>
        </div>
      </section>
      <MainContent>
        <div className="h-half-screen grid pi-center border-surface-600 border-xs border-solid r-xl mb-xl">
          <h3 className="subtitle">No posts to show... yet.</h3>
        </div>
      </MainContent>
    </DefaultLayout>
  );
}

export default BlogMainPage;