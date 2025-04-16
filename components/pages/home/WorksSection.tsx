import React, { useRef } from 'react';
import { Work } from "@/lib/types";
import { MSButton, MSInfoCard } from "@/components";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useCardAnimation } from "@/lib/gsap";

interface WorksSectionProps {
  works: Work[];
}

const WorksSection: React.FC<WorksSectionProps> = ({ works }) => {
  const worksSectionRef = useRef<HTMLDivElement>(null);

  useCardAnimation('.ms-card', worksSectionRef);

  return (
    <section id="stuff-i-did" ref={worksSectionRef}>
      <section className="constrained w-full h-screen mx-auto mb-md flex flow-row wrap-none jc-space-between ai-center gap-sm mb-lg py-3xl">
        <div>
          <h1 className="lead-text family-supertitle size-3xl @medium:size-4xl">Stuff I did</h1>
          <p className="de-emphasize size-md weight-light">Here some of the previous works I'm most proud of.</p>
          <ul className="list-style-none grid cols-1 @medium:cols-2 gap-md mt-lg" id="projects">
            { works.map((item, key) =>  (
              <MSInfoCard reference={key} key={ key } item={item} linkBase="work"/>
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