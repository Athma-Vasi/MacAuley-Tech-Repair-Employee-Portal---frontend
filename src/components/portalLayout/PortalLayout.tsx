import { AppShell } from '@mantine/core';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useGlobalState } from '../../hooks/useGlobalState';
import { PortalFooter } from '../portalFooter';
import { PortalHeader } from '../portalHeader';
import { PortalNavbar } from '../portalNavbar';

function PortalLayout() {
  const [opened, setOpened] = useState<boolean>(false);
  const {
    globalState: { scrollYDirection },
  } = useGlobalState();

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={<PortalNavbar openedNavbar={opened} />}
      header={
        <PortalHeader openedHeader={opened} setOpenedHeader={setOpened} />
      }
      footer={scrollYDirection === 'up' ? <PortalFooter /> : <></>}
      style={{
        backgroundImage: 'radial-gradient(circle, #f9f9f9 50%, #ececec 100%)',
      }}
    >
      <Outlet />
    </AppShell>
  );
}

export { PortalLayout };
