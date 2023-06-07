import { Outlet } from 'react-router-dom';
import { ReactNode } from 'react';

type LayoutProps = {
  children?: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return <Outlet />;
}

export { Layout };
