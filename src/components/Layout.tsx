
import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNavigation = true }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showNavigation && <Navigation />}
      <div className="flex-1 w-full overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default Layout;
