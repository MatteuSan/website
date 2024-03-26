import React from 'react';
import MSTag from "../MSTag";
import { works } from "../../constants/works";
import { tools } from "../../constants/tools";

interface InfoProps {
  data: typeof works[0] | typeof tools[0];
  children?: React.ReactNode | string;
}

const Info: React.FC<InfoProps> = ({ data, children }) => {
  return (
    <div className="w-full start-1 end-1 fill-surface-400 ink-surface-ink p-lg r-md raise-low mt-md"
         style={ { height: 'max-content' } }>
      <ul className="ms-list mb-md" style={ { listStyle: 'none' } }>
        <li className="flex flow-row gap-sm mb-sm">
          { data.tags.map((item, i) => <MSTag key={ i } label={ item }/>) }
        </li>
        <li className="flex flow-row wrap gap-sm mb-sm">
          { data.tech.map((item, i) => <MSTag key={ i } label={ item }/>) }
        </li>
        {/*<li className="ms-list__item">Duration: { data.duration[0] }{ data.duration[1] ? ' - ' + data.duration[1] : '' }</li>*/ }
      </ul>
      <h3 className="subtitle">Links</h3>
      <div className="flex flow-row flow-nowrap jc-start gap-sm mt-sm">
        { children }
      </div>
    </div>
  );
};

export default Info;