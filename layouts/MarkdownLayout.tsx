import React from 'react';
import { DefaultLayout, MainContent } from "./DefaultLayout";
import { MSButton } from "../components";
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

export const MarkDownHeader: React.FC<{ title: string, description: string, small?: string }> = ({ title, description, small }) => {
  return (
    <>
      <h1 className="supertitle">{ title } { small ? <small
        className="small">{ small }</small> : 'null' }</h1>
      <h2 className="subtitle">{ description }</h2>
    </>
  );
}

const MarkdownLayout: React.FC<MarkdownLayoutProps> = ({ metadata, data, previewImage, previewImageAlt, children }) => {
  return (
    <DefaultLayout title={ metadata.title } description={ metadata.description } previewImage={ `/img/${previewImage}` }>
      <MainContent>
        <section className="py-4xl">
          <MSButton style={ { position: 'relative', left: '-0.9rem', marginBottom: '0.7rem' } } link="/work"
                    type="small" icon={ ['left', <ArrowLeftIcon/>] }>Back to all work</MSButton>
          <h1 className="supertitle">{ metadata.title } <small
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