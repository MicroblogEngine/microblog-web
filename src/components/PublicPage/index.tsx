import React from 'react';

import logo from '@/assets/logo-black.svg';
import { useNavigate } from '@tanstack/react-router';

type PublicPageProps = {
  children: React.ReactNode;
};

const PublicPage = ({ children }: PublicPageProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center cursor-pointer" onClick={() => navigate({to: '/'})}>
        <img src={logo} alt="Microblog" className="w-20 h-20 mr-2" />
        <h1 className="text-4xl font-extrabold text-center text-gray-700">Microblog</h1>
      </div>
      {children}
    </div>
  );
};

export default PublicPage;