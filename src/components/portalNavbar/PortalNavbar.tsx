import { Navbar, ScrollArea, Stack } from "@mantine/core";
import {
  TbAffiliate,
  TbBrandWechat,
  TbCalendarEvent,
  TbChartDots2,
  TbChartInfographic,
  TbDatabase,
  TbHome2,
  TbReceipt,
  TbSchema,
  TbSpeakerphone,
  TbTestPipe,
  TbTool,
  TbUser,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnThemeColors } from "../../utils";
import { AccessibleNavLink } from "../accessibleInputs/AccessibleNavLink";

function PortalNavbar({ openedNavbar }: { openedNavbar: boolean }) {
  const {
    globalState: { width, themeObject, height },
  } = useGlobalState();

  const navigate = useNavigate();

  const {
    scrollBarStyle,
    generalColors: { iconGray, themeColorShade },
    appThemeColors: { backgroundColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const homeNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Will navigate to home page",
        icon: <TbHome2 />,
        name: "home",
        onChange: () => navigate("/home"),
      }}
    />
  );

  const dashboardNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Will navigate to dashboard page",
        icon: <TbChartDots2 />,
        name: "dashboard",
        onChange: () => navigate("/home/dashboard"),
      }}
    />
  );

  const customerNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Will navigate to customer page",
        icon: <TbUser />,
        name: "customer",
        onChange: () => navigate("/home/customer"),
      }}
    />
  );

  const commentNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Will navigate to comment page",
        icon: <TbBrandWechat />,
        name: "comment",
        onChange: () => navigate("/home/comment"),
      }}
    />
  );

  // const fileUploadNavLink = (
  //   <AccessibleNavLink
  //     attributes={{
  //       description: "Will navigate to file upload page",
  //       icon: <TbBookUpload />,
  //       name: "fileUpload",
  //       onChange: () => navigate("/home/file-upload"),
  //     }}
  //   />
  // );

  const productNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Will navigate to product page",
        icon: <TbAffiliate />,
        name: "product",
        onChange: () => navigate("/home/product"),
      }}
    />
  );

  const repairTicketNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Will navigate to repair page",
        icon: <TbTool />,
        name: "repair",
        onChange: () => navigate("/home/repair-ticket"),
      }}
    />
  );

  const expenseClaimNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Will navigate to expense claim page",
        icon: <TbReceipt />,
        name: "expenseClaim",
        onChange: () => navigate("/home/actions/expense-claim"),
      }}
    />
  );

  const announcementNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Will navigate to announcement page",
        icon: <TbSpeakerphone />,
        name: "announcement",
        onChange: () => navigate("/home/actions/announcement"),
      }}
    />
  );

  const surveyNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Will navigate to survey page",
        icon: <TbChartInfographic />,
        name: "survey",
        onChange: () => navigate("/home/actions/survey"),
      }}
    />
  );

  const eventNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Will navigate to event page",
        icon: <TbCalendarEvent />,
        name: "event",
        onChange: () => navigate("/home/actions/event"),
      }}
    />
  );

  const directoryNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Will navigate to directory page",
        icon: <TbDatabase />,
        name: "directory",
        onChange: () => navigate("/home/directory"),
      }}
    />
  );

  const devTestingNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Will navigate to dev testing page",
        icon: <TbTestPipe />,
        name: "devTesting",
        onChange: () => navigate("/home/dev-testing"),
      }}
    />
  );

  const resourceNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Will navigate to resource page",
        icon: <TbSchema />,
        name: "resource",
        onChange: () => navigate("/home/resource"),
      }}
    />
  );

  return (
    <Navbar
      bg={backgroundColor}
      hiddenBreakpoint="sm"
      hidden={!openedNavbar}
      width={{ sm: 225, lg: 300 }}
      h={width <= 991 ? height - 50 : height - 64} //  height = 50px : header height = 64px
      // style={width <= 1024 ? { zIndex: 5 } : {}}
    >
      <ScrollArea styles={() => scrollBarStyle} offsetScrollbars>
        <Stack>
          {homeNavLink}
          {dashboardNavLink}
          {customerNavLink}
          {commentNavLink}
          {productNavLink}
          {repairTicketNavLink}
          {expenseClaimNavLink}
          {announcementNavLink}
          {surveyNavLink}
          {eventNavLink}
          {directoryNavLink}
          {devTestingNavLink}
          {resourceNavLink}
        </Stack>
      </ScrollArea>
    </Navbar>
  );
}

export { PortalNavbar };
