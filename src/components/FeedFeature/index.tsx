import React from 'react';

type FeatureProps = {
  title: string;
  children: React.ReactNode;
}

const Feature = ({title, children}: FeatureProps) => {
  return (      
    <div className="flex flex-col w-full p-2 border-2 rounded-xl border-slate-400">
      <span className="text-2xl font-bold">{title}</span>
      {children}
    </div>
  );
};

export default Feature;