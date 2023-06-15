import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { CustomNavbar } from '../customNavbar';
import { CustomHeader } from '../customHeader';
import { CustomFooter } from '../customFooter';

function PortalLayout() {
  return (
    <div>
      <AppShell
        padding="md"
        navbar={<CustomNavbar />}
        header={<CustomHeader />}
        footer={<CustomFooter />}
      >
        <Outlet />
      </AppShell>
    </div>
  );
}

export { PortalLayout };
