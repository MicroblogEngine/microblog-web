import React from 'react';

const Menu = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col mt-5 mb-5">
      {children}
    </div>
  );
};

export default Menu;
