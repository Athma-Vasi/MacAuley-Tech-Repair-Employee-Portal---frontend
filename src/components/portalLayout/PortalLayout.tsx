import { AppShell, Flex } from '@mantine/core';
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
      // padding="lg"
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
      <Flex
        w="100%"
        h="100%"
        style={{ border: '1px solid #e0e0e0', borderRadius: 4 }}
        align="center"
        justify="center"
      >
        <Outlet />
      </Flex>
    </AppShell>
  );
}

export { PortalLayout };
