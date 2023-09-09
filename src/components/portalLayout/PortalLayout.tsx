import {
  Anchor,
  AppShell,
  Breadcrumbs,
  Flex,
  Group,
  ScrollArea,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useGlobalState } from '../../hooks/useGlobalState';
import { PortalFooter } from '../portalFooter';
import { PortalHeader } from '../portalHeader';
import { PortalNavbar } from '../portalNavbar';
import { splitCamelCase } from '../../utils';
import { TbArrowRight, TbArrowRightBar } from 'react-icons/tb';

import { useAuth } from '../../hooks';
import { COLORS_SWATCHES } from '../../constants/data';
import { BreadcrumbsBuilder } from '../breadcrumbsBuilder/BreadcrumbsBuilder';

function PortalLayout() {
  const [opened, setOpened] = useState<boolean>(false);
  const {
    globalState: {
      scrollYDirection,
      padding,
      themeObject: { colorScheme },
    },
  } = useGlobalState();

  const {
    authState: { accessToken, isLoggedIn },
  } = useAuth();

  const location = useLocation();
  console.log('location in PortalLayout: ', location);

  const { dark } = COLORS_SWATCHES;
  const backgroundColor =
    colorScheme === 'light'
      ? 'radial-gradient(circle, #f9f9f9 50%, #f5f5f5 100%)'
      : dark[6];

  const displayBreadcrumbs = (
    <Group w="100%" p={padding} bg={backgroundColor}>
      {BreadcrumbsBuilder(location.pathname)}
    </Group>
  );

  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint="sm"
      navbar={
        accessToken && isLoggedIn ? (
          <PortalNavbar openedNavbar={opened} />
        ) : undefined
      }
      header={
        <PortalHeader openedHeader={opened} setOpenedHeader={setOpened} />
      }
      footer={
        accessToken && isLoggedIn ? (
          scrollYDirection === 'up' ? (
            <PortalFooter />
          ) : (
            <></>
          )
        ) : undefined
      }
    >
      {displayBreadcrumbs}
      <Outlet />
    </AppShell>
  );
}

export { PortalLayout };
