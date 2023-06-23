import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { PortalNavbar } from '../portalNavbar';
import { PortalHeader } from '../portalHeader';
import { PortalFooter } from '../portalFooter';
import { useState } from 'react';
import { useGlobalState } from '../../hooks/useGlobalState';

function PortalLayout() {
  const [opened, setOpened] = useState<boolean>(false);
  const {
    globalState: { scrollYDirection },
  } = useGlobalState();

  return (
    <div>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        navbar={<PortalNavbar openedNavbar={opened} />}
        header={
          <PortalHeader openedHeader={opened} setOpenedHeader={setOpened} />
        }
        footer={scrollYDirection === 'up' ? <PortalFooter /> : <></>}
      >
        <Outlet />
      </AppShell>
    </div>
  );
}

export { PortalLayout };
