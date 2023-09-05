import {
  Anchor,
  AppShell,
  Breadcrumbs,
  Flex,
  Group,
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
import { createBreadcrumbs } from './utils';
import { useAuth } from '../../hooks';

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

  const mantineTheme = useMantineTheme();
  const { colors } = mantineTheme;

  const displayBreadcrumbs = (
    <Group
      p={padding}
      bg={
        colorScheme === 'light'
          ? 'radial-gradient(circle, #f9f9f9 50%, #f5f5f5 100%)'
          : colors.dark[6]
      }
    >
      {createBreadcrumbs(location.pathname)}
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
      // style={{
      //   backgroundImage:
      //     colorScheme === 'light'
      //       ? 'radial-gradient(circle, #f9f9f9 50%, #ececec 100%)'
      //       : `radial-gradient(circle, #1a1a1a 50%, ${colors.dark[5]} 100%)`,
      // }}
    >
      {/* <Flex
        w="100%"
        h="100%"
        style={{
          border:
            colorScheme === 'light'
              ? '1px solid #e0e0e0'
              : `1px solid ${colors.gray[8]}`,
          borderRadius: 4,
          // inset box shadow to the left
          boxShadow:
            colorScheme === 'light'
              ? '-8px 0px 8px -8px rgba(0, 0, 0, 0.1)'
              : '-8px 0px 8px -8px rgba(0, 0, 0, 0.5)',
        }}
        align="center"
        justify="center"
      >
        <Outlet />
      </Flex> */}
      {displayBreadcrumbs}
      <Outlet />
    </AppShell>
  );
}

export { PortalLayout };
