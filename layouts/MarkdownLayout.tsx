import React from 'react';
import { DefaultLayout, MainContent } from "./DefaultLayout";
import { MSButton } from "@/components";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import PreviewImage from "@/components/markdown/PreviewImage";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MOTION_PREFERENCES, useMediaQuery } from '@/lib/gsap';
import { Tool, Work } from '@/lib/types';
import MSTag from '../components/MSTag';

interface MarkdownLayoutProps {
  metadata: { title: string, description: string };
  data: Work | Tool;
  description?: string | React.ReactNode;
  previewImage: string;
  previewImageAlt: string;
  media?: React.ReactNode | string;
  links?: React.ReactNode | string;
  children?: React.ReactNode | string;
}

export const MarkdownHeader: React.FC<{ title: string, description: string, small?: string|React.ReactNode }> = ({ title, description, small }) => {
  return (
    <>
      <div className="flex flow-column wrap-none gap-xs">
        <h1 className="ms-markdown__title supertitle stretch-condensed">{ title }</h1>
        { small ? <p className="small mb-sm">{ small }</p> : 'null' }
      </div>
      <h2 className="subtitle">{ description }</h2>
    </>
  );
}

const MarkdownLayout: React.FC<MarkdownLayoutProps> = ({ metadata, data, previewImage, previewImageAlt, children, media, links }) => {
  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    const contentTl = gsap.timeline();
    const imageTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#preview-image-container',
        start: 'top 28.4%',
        end: 'bottom 40%',
        scrub: true,
      }
    });

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

    imageTl.to('#preview-image-container', {
      width: '100%',
      maxWidth: '100%',
    });

    imageTl.to('#preview-image-container .preview-image', {
      borderRadius: 0,
    }, '<');
  });

  return (
    <DefaultLayout title={ metadata.title } description={ metadata.description } previewImage={ `/img/${previewImage}` }>
      <section className="py-4xl">
        <div className="constrained-layout">
          <MSButton style={{ position: 'relative', left: '-0.9rem', marginBottom: '0.7rem', zIndex: 110 }} link={`/`} type="small" icon={ ['left', <ArrowLeftIcon/>] }>Go back</MSButton>
          <div>
            <h2 className="family-supertitle weight-title size-2xl @medium:size-3xl @xlarge:size-5xl stretch-condensed squeeze-condensed @xlarge:inline-block">{ metadata.title }</h2>
            <div className="mt-xs @xlarge:mt-none @xlarge:ml-xl @xlarge:inline-block">
              <small className="block mono de-emphasize wrap-brackets">{ data.duration[0] }{ data.duration[1] ? ' - ' + data.duration[1] : '' }</small>
              <p className="family-subtitle weight-light size-sm @medium:size-md @xlarge:size-lg">{ metadata.description }</p>
              <ul className="my-md gap-sm flex flow-row wrap pt-sm" style={{ listStyle: 'none' }}>
                { data.tags.map((item, i) => (
                  <li><MSTag key={ i } label={ item }/></li>
                )) }
              </ul>
            </div>
          </div>
        </div>
        <div id="preview-image-container" className="constrained-layout my-md" style={{ overflow: 'clip' }}>
          <PreviewImage src={ `/img/${ previewImage }` } alt={ previewImageAlt }/>
        </div>
        <section className="links constrained flex flow-row wrap gap-sm mt-lg mb-sm">
          <p className="de-emphasize family-mono wrap-brackets">Links</p>
          { links }
        </section>
        <MainContent>
          <section className="ms-markdown">
            { children }
          </section>
        </MainContent>
        <section className="media constrained grid cols-1 @medium:cols-2 gap-md mt-lg">
          { media }
        </section>
      </section>
    </DefaultLayout>
  );
};

export default MarkdownLayout;