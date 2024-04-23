import React from 'react';
import { DefaultLayout, MainContent } from "./DefaultLayout";
import { MSAnimatedSection, MSButton } from "../components";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import PreviewImage from "../components/markdown/PreviewImage";
import { works } from "../constants/works";
import { tools } from "../constants/tools";

interface MarkdownLayoutProps {
  metadata: { title: string, description: string };
  data: typeof works[0] | typeof tools[0];
  description?: string | React.ReactNode;
  previewImage: string;
  previewImageAlt: string;
  children?: React.ReactNode | string;
}

const MarkdownLayout: React.FC<MarkdownLayoutProps> = ({ metadata, data, description, previewImage, previewImageAlt, children }) => {
  return (
    <DefaultLayout title={ metadata.title } description={ metadata.description } previewImage={ `/img/${previewImage}` }>
      <MainContent>
        <section className="py-4xl">
          <MSButton style={ { position: 'relative', left: '-0.9rem', marginBottom: '0.7rem' } } link="/work"
                    type="small" icon={ ['left', <ArrowLeftIcon/>] }>Back to all work</MSButton>
          <MSAnimatedSection>
            <h1 className="supertitle">{ metadata.title } <small
              className="small">({ data.duration[0] }{ data.duration[1] ? ' - ' + data.duration[1] : '' })</small></h1>
          </MSAnimatedSection>
          <MSAnimatedSection delay={ 0.3 }>
            <h2 className="subtitle">{ metadata.description }</h2>
          </MSAnimatedSection>
          <MSAnimatedSection delay={ 0.4 }>
            <div className="w-full h-full max-h-md r-lg my-md" style={ { overflow: 'clip' } }>
              <PreviewImage src={ `/img/${ previewImage }` } alt={ previewImageAlt }/>
            </div>
          </MSAnimatedSection>
          { children }
        </section>
      </MainContent>
    </DefaultLayout>
  );
};

export default MarkdownLayout;