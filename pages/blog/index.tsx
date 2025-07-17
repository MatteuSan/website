import React from 'react';
import { NextPage } from 'next';
import { DefaultLayout, MainContent } from "@/layouts/DefaultLayout";

import {
  animateInView,
  BY_LINE, BY_WORD,
  MOTION_PREFERENCES,
  REDUCED_ANIMATION,
  SWOOP_IN_ANIMATION,
  useMediaQuery
} from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/dist/SplitText';
import Link from 'next/link';
import { blogs } from '@/constants/blogs';

const BlogMainPage: NextPage = () => {
  const blogSectionRef = React.useRef<HTMLDivElement>(null);
  const postsSectionRef = React.useRef<HTMLDivElement>(null);

  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    const titleSplit = SplitText.create('.content', BY_WORD);
    const subtitleSplit = SplitText.create('.content-2', BY_LINE);

    const blog = animateInView(blogSectionRef.current, {
      once: true,
    });

    blog.from(blogSectionRef.current, {
      opacity: 0,
      y: !isMotionReduced ? 70 : 0,
      duration: 1
    });

    blog.from(titleSplit.words, {
      ...(!isMotionReduced ? SWOOP_IN_ANIMATION : REDUCED_ANIMATION),
      onComplete: () => titleSplit.revert()
    }, '-=0.5');

    blog.fromTo('.picture-frame', {
      opacity: 0,
      duration: 0.5,
    }, {
      opacity: 1,
      y: 0,
    }, '<');

    blog.from(subtitleSplit.lines, {
      ...(!isMotionReduced ? SWOOP_IN_ANIMATION : REDUCED_ANIMATION),
      stagger: 0.1,
      onComplete: () => subtitleSplit.revert()
    }, '-=0.5');

    blog.from('.content-2', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.5,
    }, '-=0.5');

    blog.from('.content-3', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.5,
    }, '<50%');

    blog.from(postsSectionRef.current, {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.5,
    }, '-=0.5');

  });

  return (
    <DefaultLayout title="BLOG" description="I write a few posts from time to time sharing bits and pieces of information I find interesting about the things I work on.">
      <section className="mt-6xl mb-lg w-full h-quarter-screen flex flow-column jc-end" ref={blogSectionRef}>
        <div className="w-full constrained">
          <h2 className="family-mono de-emphasize size-sm wrap-brackets">Blog</h2>
          <p className="content family-supertitle size-3xl line-height-x-short squeeze-tight stretch-condensed">A few notes on things.</p>
          <p className="content-2 family-body de-emphasize size-sm mt-md">I write a few posts from time to time sharing bits and pieces of information I find interesting about the things I work on.</p>
        </div>
      </section>
      <MainContent>
        <section className="grid cols-1 @medium:cols-2 gap-md mb-6xl" ref={postsSectionRef}>
          { blogs.map((blog, index) => (
            <Link href={`/blog/${blog.slug}`}>
              <div key={index} className="blog-post h-full flex flow-column gap-sm p-lg @medium:p-xl r-lg fill-gradient has-hover-state">
                <div className="flex flow-column">
                  <p className="family-mono size-xs de-emphasize wrap-brackets mb-xs"><time dateTime={blog.publishedAt}>{ blog.publishedAt }</time></p>
                  <h3 className="title stretch-condensed inline-block">{ blog.title }</h3>
                </div>
                <p className="body de-emphasize mt-xs">{ blog.description }</p>
              </div>
            </Link>
          )) }
        </section>
      </MainContent>
    </DefaultLayout>
  );
}

export default BlogMainPage;