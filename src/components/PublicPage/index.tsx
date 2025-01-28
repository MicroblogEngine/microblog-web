import React from 'react';

import logo from '@/assets/logo-black.svg';

type PublicPageProps = {
  children: React.ReactNode;
};

const PublicPage = ({ children }: PublicPageProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center">
        <img src={logo} alt="Microblog" className="w-20 h-20 mr-2" />
        <h1 className="text-4xl font-extrabold text-center text-gray-700">Microblog</h1>
      </div>
      {children}
    </div>
  );
};

export default PublicPage;