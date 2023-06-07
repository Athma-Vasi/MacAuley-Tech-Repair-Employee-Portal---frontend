import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { DashHeader } from './DashHeader';
import { DashFooter } from './DashFooter';

type DashLayoutProps = {
  children?: ReactNode;
};

function DashLayout({ children }: DashLayoutProps) {
  return (
    <>
      <DashHeader />
      {/* below is the protected part of the site */}
      <div className="dash-container">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
}

export { DashLayout };
