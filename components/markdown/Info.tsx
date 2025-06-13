import React from 'react';
import { works } from "@/constants/works";
import { tools } from "@/constants/tools";

interface InfoProps {
  data?: typeof works[0] | typeof tools[0];
  children?: React.ReactNode | string;
}

const Info: React.FC<InfoProps> = ({ data, children }) => {
  return (
    <div className="w-full start-1 end-1 mt-md"
         style={ { height: 'max-content' } }>
      <h4 className="subtitle">Links</h4>
      <div className="flex flow-row flow-nowrap jc-start gap-sm mt-sm">
        { children }
      </div>
    </div>
  );
};

export default Info;