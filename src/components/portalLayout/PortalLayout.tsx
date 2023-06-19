import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { PortalNavbar } from '../portalNavbar';
import { PortalHeader } from '../portalHeader';
import { PortalFooter } from '../portalFooter';
import { useState } from 'react';

function PortalLayout() {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        navbar={<PortalNavbar openedNavbar={opened} />}
        header={
          <PortalHeader openedHeader={opened} setOpenedHeader={setOpened} />
        }
        footer={<PortalFooter />}
      >
        <Outlet />
      </AppShell>
    </div>
  );
}

export { PortalLayout };
