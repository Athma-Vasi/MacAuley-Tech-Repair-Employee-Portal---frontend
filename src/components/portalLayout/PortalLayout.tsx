import { AppShell, Flex, Group, ScrollArea, Space } from "@mantine/core";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks/useGlobalState";
import { returnThemeColors } from "../../utils";
import { BreadcrumbsBuilder } from "../breadcrumbsBuilder/BreadcrumbsBuilder";
import { PortalFooter } from "../portalFooter";
import { PortalHeader } from "../portalHeader";
import { PortalNavbar } from "../portalNavbar";

function PortalLayout() {
  const [opened, setOpened] = useState<boolean>(false);
  const {
    globalState: { padding, themeObject, height, width },
  } = useGlobalState();

  const { pathname } = useLocation();

  const {
    appThemeColors: { backgroundColor, borderColor },
    scrollBarStyle,
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  const displayBreadcrumbs = (
    <Group
      w="100%"
      p={padding}
      h={50}
      bg={backgroundColor}
      style={{ borderBottom: borderColor }}
    >
      {BreadcrumbsBuilder(pathname)}
    </Group>
  );

  return (
    <AppShell
      bg={backgroundColor}
      padding={0}
      navbarOffsetBreakpoint="sm"
      navbar={<PortalNavbar openedNavbar={opened} />}
      header={<PortalHeader openedHeader={opened} setOpenedHeader={setOpened} />}
      footer={<PortalFooter />}
    >
      {/* breadcrumbs always visible on top of <Outlet /> */}
      {displayBreadcrumbs}

      <ScrollArea styles={() => scrollBarStyle} type="scroll">
        <Flex
          bg={backgroundColor}
          direction="column"
          h={width <= 991 ? height - (50 + 56 + 75) : height - (64 + 56 + 75)} //  vw < 991 ?  vh - (header height:50px + padding:56 + footer height:75px) : vh - (header height:64px + padding:56 + footer height:75px)
          w="100%"
        >
          <Space h="xl" />
          <Outlet />
        </Flex>
      </ScrollArea>
    </AppShell>
  );
}

export default PortalLayout;
