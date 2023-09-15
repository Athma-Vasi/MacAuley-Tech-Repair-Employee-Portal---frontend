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
import { returnThemeColors, splitCamelCase } from '../../utils';

import { useAuth } from '../../hooks';
import { COLORS_SWATCHES } from '../../constants/data';
import { BreadcrumbsBuilder } from '../breadcrumbsBuilder/BreadcrumbsBuilder';

function PortalLayout() {
  const [opened, setOpened] = useState<boolean>(false);
  const {
    globalState: { scrollYDirection, padding, themeObject, height, width },
  } = useGlobalState();

  const {
    authState: { accessToken, isLoggedIn },
  } = useAuth();

  const location = useLocation();

  const {
    appThemeColors: { backgroundColor, borderColor },
    scrollBarStyle,
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const displayBreadcrumbs = (
    <Group
      w="100%"
      p={padding}
      h={50}
      bg={backgroundColor}
      style={{ borderBottom: borderColor }}
    >
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
      <ScrollArea styles={() => scrollBarStyle} type="scroll" offsetScrollbars>
        <Flex
          direction="column"
          h={width <= 991 ? height - (50 + 50 + 60) : height - (64 + 50 + 60)} //  vw < 991 ?  vh - (header height = 50px + footer height = 60px) : vh - (header height = 64px + footer height = 60px)
        >
          <Outlet />
        </Flex>
      </ScrollArea>
    </AppShell>
  );
}

export default PortalLayout;
