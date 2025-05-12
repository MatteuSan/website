import React from 'react';
import { DefaultLayout, MainContent } from "./DefaultLayout";
import { MSButton } from "@/components";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import PreviewImage from "@/components/markdown/PreviewImage";
import { works } from "@/constants/works";
import { tools } from "@/constants/tools";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MOTION_PREFERENCES, useMediaQuery } from '@/lib/gsap';

interface MarkdownLayoutProps {
  metadata: { title: string, description: string };
  data: typeof works[0] | typeof tools[0];
  description?: string | React.ReactNode;
  previewImage: string;
  previewImageAlt: string;
  children?: React.ReactNode | string;
}

export const MarkdownHeader: React.FC<{ title: string, description: string, small?: string }> = ({ title, description, small }) => {
  return (
    <>
      <h1 className="supertitle">{ title } { small ? <small
        className="small">{ small }</small> : 'null' }</h1>
      <h2 className="subtitle">{ description }</h2>
    </>
  );
}

const MarkdownLayout: React.FC<MarkdownLayoutProps> = ({ metadata, data, previewImage, previewImageAlt, children }) => {
  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    const contentTl = gsap.timeline();

    contentTl.from('.supertitle', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.7,
    });
    contentTl.from('.small', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.7,
    }, '<10%');
    contentTl.from('.subtitle', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.7,
    }, '<20%');
    contentTl.from('.ms-markdown', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.7,
    });
    contentTl.from('#other-content', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.7,
    }, '<10%');

    contentTl.call(() => {
      contentTl.revert()
    });
  });

  return (
    <DefaultLayout title={ metadata.title } description={ metadata.description } previewImage={ `/img/${previewImage}` }>
      <MainContent>
        <section className="py-4xl">
          <MSButton style={ { position: 'relative', left: '-0.9rem', marginBottom: '0.7rem' } } link="/work"
                    type="small" icon={ ['left', <ArrowLeftIcon/>] }>Back to all work</MSButton>
          <h1 className="ms-markdown__title supertitle">{ metadata.title } <small
            className="small">({ data.duration[0] }{ data.duration[1] ? ' - ' + data.duration[1] : '' })</small></h1>
          <h2 className="subtitle">{ metadata.description }</h2>
          <div className="w-full h-full max-h-md r-lg my-md" style={ { overflow: 'clip' } }>
            <PreviewImage src={ `/img/${ previewImage }` } alt={ previewImageAlt }/>
          </div>
          <section className="ms-markdown">
            { children }
          </section>
        </section>
      </MainContent>
    </DefaultLayout>
  );
};

export default MarkdownLayout;