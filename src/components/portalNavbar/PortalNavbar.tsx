import { Flex, Navbar, NavLink, ScrollArea, Text } from "@mantine/core";
import { useReducer } from "react";
import { CgDatabase } from "react-icons/cg";
import { MdSafetyDivider } from "react-icons/md";
import { RiSignalTowerFill } from "react-icons/ri";
import {
  TbAddressBook,
  TbBuildingWarehouse,
  TbCalendarPin,
  TbCash,
  TbCashBanknote,
  TbChartPie3,
  TbChevronRight,
  TbCircleTriangle,
  TbCircuitResistor,
  TbDashboard,
  TbGift,
  TbHome2,
  TbNotebook,
  TbPrinterOff,
  TbReceipt2,
  TbShoppingCartPlus,
  TbSpeakerphone,
  TbTimelineEventPlus,
  TbUserCheck,
} from "react-icons/tb";
import { TiThumbsUp } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnThemeColors } from "../../utils";
import { portalNavbarAction } from "./actions";
import { portalNavbarReducer } from "./reducers";
import { initialPortalNavbarState } from "./state";
import type { PortalNavbarProps } from "./types";

function PortalNavbar({ openedNavbar }: PortalNavbarProps) {
  const {
    globalState: { width, themeObject, height },
  } = useGlobalState();
  const navigate = useNavigate();

  const [portalNavbarState, portalNavbarDispatch] = useReducer(
    portalNavbarReducer,
    initialPortalNavbarState,
  );

  const {
    isHomeActive,
    isDashboardActive,
    isCustomerActive,
    isCommentActive,
    isFileUploadActive,
    isProductActive,
    isRepairActive,

    isCompanyActive,
    isAddressChangeActive,
    isBenefitActive,
    isExpenseClaimActive,
    isLeaveRequestActive,
    isRequestResourceActive,

    isGeneralActive,
    isEndorsementActive,
    isPrinterIssueActive,
    isAnonymousRequestActive,
    isRefermentActive,

    isOutreachActive,
    isAnnouncementActive,
    isSurveyActive,
    isEventActive,

    isDirectoryActive,
  } = portalNavbarState;

  const {
    scrollBarStyle,
    generalColors: { iconGray, themeColorShade },
    appThemeColors: { backgroundColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const [createdHomeNavLink] = returnAccessibleNavLinkElements([
    {
      active: isHomeActive,
      ariaLabel: "Will navigate to home page",
      icon: <TbHome2 color={isHomeActive ? themeColorShade : iconGray} />,
      label: "Home",
      onClick: () => {
        portalNavbarDispatch({
          type: portalNavbarAction.setIsHomeActive,
          payload: !isHomeActive,
        });
        navigate("/home");
      },
    },
  ]);

  const [createdDashboardNavLink] = returnAccessibleNavLinkElements([
    {
      active: isDashboardActive,
      ariaLabel: "Will navigate to dashboard page",
      icon: (
        <TbDashboard color={isDashboardActive ? themeColorShade : iconGray} />
      ),
      label: "Dashboard",
      onClick: () => {
        portalNavbarDispatch({
          type: portalNavbarAction.setIsDashboardActive,
          payload: !isDashboardActive,
        });
        navigate("/home/dashboard");
      },
    },
  ]);

  const [createdCustomerNavLink] = returnAccessibleNavLinkElements([
    {
      active: isCustomerActive,
      ariaLabel: "Will navigate to customer page",
      icon: (
        <TbUserCheck color={isCustomerActive ? themeColorShade : iconGray} />
      ),
      label: "Customer",
      onClick: () => {
        portalNavbarDispatch({
          type: portalNavbarAction.setIsCustomerActive,
          payload: !isCustomerActive,
        });
        navigate("/home/customer");
      },
    },
  ]);

  const [createdCommentNavLink] = returnAccessibleNavLinkElements([
    {
      active: isCommentActive,
      ariaLabel: "Will navigate to comment page",
      icon: <TbNotebook color={isCommentActive ? themeColorShade : iconGray} />,
      label: "Comment",
      onClick: () => {
        portalNavbarDispatch({
          type: portalNavbarAction.setIsCommentActive,
          payload: !isCommentActive,
        });
        navigate("/home/comment");
      },
    },
  ]);

  const [createdFileUploadNavLink] = returnAccessibleNavLinkElements([
    {
      active: isFileUploadActive,
      ariaLabel: "Will navigate to file upload page",
      icon: (
        <TbReceipt2 color={isFileUploadActive ? themeColorShade : iconGray} />
      ),
      label: "File upload",
      onClick: () => {
        portalNavbarDispatch({
          type: portalNavbarAction.setIsFileUploadActive,
          payload: !isFileUploadActive,
        });
        navigate("/home/file-upload");
      },
    },
  ]);

  const productNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isProductActive,
    ariaLabel: "Will navigate to product page",
    icon: (
      <TbShoppingCartPlus
        color={isProductActive ? themeColorShade : iconGray}
      />
    ),
    label: "Product",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsProductActive,
        payload: !isProductActive,
      });
      navigate("/home/product");
    },
  };

  const [createdProductNavLink] = returnAccessibleNavLinkElements([
    productNavLinkCreatorInfo,
  ]);

  const [createdRepairNavLink] = returnAccessibleNavLinkElements([
    {
      active: isRepairActive,
      ariaLabel: "Will navigate to repair page",
      icon: (
        <TbCircuitResistor
          color={isRepairActive ? themeColorShade : iconGray}
        />
      ),
      label: "Repair",
      onClick: () => {
        portalNavbarDispatch({
          type: portalNavbarAction.setIsRepairActive,
          payload: !isRepairActive,
        });
        navigate("/home/repair-ticket");
      },
    },
  ]);

  const addressChangeNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isAddressChangeActive,
    ariaLabel: "Will navigate to address change page",
    icon: (
      <TbAddressBook
        color={isAddressChangeActive ? themeColorShade : iconGray}
      />
    ),
    label: "Address change",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsAddressChangeActive,
        payload: !isAddressChangeActive,
      });
      navigate("/home/company/address-change");
    },
  };

  const benefitNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isBenefitActive,
    ariaLabel: "Will navigate to benefit page",
    icon: <TbGift color={isBenefitActive ? themeColorShade : iconGray} />,
    label: "Benefit",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsBenefitActive,
        payload: !isBenefitActive,
      });
      navigate("/home/company/benefit");
    },
  };

  const expenseClaimNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isExpenseClaimActive,
    ariaLabel: "Will navigate to expense claim page",
    icon: (
      <TbReceipt2 color={isExpenseClaimActive ? themeColorShade : iconGray} />
    ),
    label: "Expense claim",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsExpenseClaimActive,
        payload: !isExpenseClaimActive,
      });
      navigate("/home/company/expense-claim");
    },
  };

  const leaveRequestNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isLeaveRequestActive,
    ariaLabel: "Will navigate to leave request page",
    icon: (
      <TbCalendarPin
        color={isLeaveRequestActive ? themeColorShade : iconGray}
      />
    ),
    label: "Leave request",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsLeaveRequestActive,
        payload: !isLeaveRequestActive,
      });
      navigate("/home/company/leave-request");
    },
  };

  const requestResourceNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isRequestResourceActive,
    ariaLabel: "Will navigate to request resource page",
    icon: (
      <TbCashBanknote
        color={isRequestResourceActive ? themeColorShade : iconGray}
      />
    ),
    label: "Request resource",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsRequestResourceActive,
        payload: !isRequestResourceActive,
      });
      navigate("/home/company/request-resource");
    },
  };

  const [
    createdAddressChangeNavLink,
    createdBenefitNavLink,
    createdExpenseClaimNavLink,
    createdLeaveRequestNavLink,
    createdRequestResourceNavLink,
  ] = returnAccessibleNavLinkElements([
    addressChangeNavLinkCreatorInfo,
    benefitNavLinkCreatorInfo,
    expenseClaimNavLinkCreatorInfo,
    leaveRequestNavLinkCreatorInfo,
    requestResourceNavLinkCreatorInfo,
  ]);

  const isCompanyNavlinkOpened = isCompanyActive ||
      isAddressChangeActive ||
      isBenefitActive ||
      isExpenseClaimActive ||
      isLeaveRequestActive ||
      isRequestResourceActive
    ? true
    : false;

  const companyNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isCompanyActive,
    ariaLabel: "Will navigate to company page",
    children: [
      createdAddressChangeNavLink,
      createdBenefitNavLink,
      createdExpenseClaimNavLink,
      createdLeaveRequestNavLink,
      createdRequestResourceNavLink,
    ],
    icon: (
      <TbBuildingWarehouse
        color={isCompanyActive ? themeColorShade : iconGray}
      />
    ),
    label: "Company",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsCompanyActive,
        payload: !isCompanyActive,
      });
    },
    opened: isCompanyNavlinkOpened,
    rightSection: (
      <TbChevronRight
        color={isCompanyNavlinkOpened ? themeColorShade : iconGray}
      />
    ),
  };

  const [createdCompanyNavLink] = returnAccessibleNavLinkElements([
    companyNavLinkCreatorInfo,
  ]);

  const endorsementNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isEndorsementActive,
    ariaLabel: "Will navigate to endorsement page",
    icon: (
      <TbUserCheck color={isEndorsementActive ? themeColorShade : iconGray} />
    ),
    label: "Endorsement",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsEndorsementActive,
        payload: !isEndorsementActive,
      });
      navigate("/home/general/endorsement");
    },
  };

  const printerIssueNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isPrinterIssueActive,
    ariaLabel: "Will navigate to printer issue page",
    icon: (
      <TbPrinterOff color={isPrinterIssueActive ? themeColorShade : iconGray} />
    ),
    label: "Printer issue",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsPrinterIssueActive,
        payload: !isPrinterIssueActive,
      });
      navigate("/home/general/printer-issue");
    },
  };

  const anonymousRequestNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isAnonymousRequestActive,
    ariaLabel: "Will navigate to anonymous request page",
    icon: (
      <MdSafetyDivider
        color={isAnonymousRequestActive ? themeColorShade : iconGray}
      />
    ),
    label: "Anonymous request",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsAnonymousRequestActive,
        payload: !isAnonymousRequestActive,
      });
      navigate("/home/general/anonymous-request");
    },
  };

  const refermentNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isRefermentActive,
    ariaLabel: "Will navigate to referment page",
    icon: <TiThumbsUp color={isRefermentActive ? themeColorShade : iconGray} />,
    label: "Referment",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsRefermentActive,
        payload: !isRefermentActive,
      });
      navigate("/home/general/referment");
    },
  };

  const [
    createdEndorsementNavLink,
    createdPrinterIssueNavLink,
    createdAnonymousRequestNavLink,
    createdRefermentNavLink,
  ] = returnAccessibleNavLinkElements([
    endorsementNavLinkCreatorInfo,
    printerIssueNavLinkCreatorInfo,
    anonymousRequestNavLinkCreatorInfo,
    refermentNavLinkCreatorInfo,
  ]);

  const isGeneralNavlinkOpened = isGeneralActive ||
      isEndorsementActive ||
      isPrinterIssueActive ||
      isAnonymousRequestActive ||
      isRefermentActive
    ? true
    : false;

  const generalNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isGeneralActive,
    ariaLabel: "Will navigate to general page",
    children: [
      createdEndorsementNavLink,
      createdPrinterIssueNavLink,
      createdAnonymousRequestNavLink,
      createdRefermentNavLink,
    ],
    icon: (
      <TbCircleTriangle color={isGeneralActive ? themeColorShade : iconGray} />
    ),
    label: "General",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsGeneralActive,
        payload: !isGeneralActive,
      });
    },
    opened: isGeneralNavlinkOpened,
    rightSection: (
      <TbChevronRight
        color={isGeneralNavlinkOpened ? themeColorShade : iconGray}
      />
    ),
  };

  const [createdGeneralNavLink] = returnAccessibleNavLinkElements([
    generalNavLinkCreatorInfo,
  ]);

  const announcementNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isAnnouncementActive,
    ariaLabel: "Will navigate to announcement page",
    icon: (
      <TbSpeakerphone
        color={isAnnouncementActive ? themeColorShade : iconGray}
      />
    ),
    label: "Announcement",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsAnnouncementActive,
        payload: !isAnnouncementActive,
      });
      navigate("/home/outreach/announcement");
    },
  };

  const surveyNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isSurveyActive,
    ariaLabel: "Will navigate to survey page",
    icon: <TbChartPie3 color={isSurveyActive ? themeColorShade : iconGray} />,
    label: "Survey",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsSurveyActive,
        payload: !isSurveyActive,
      });
      navigate("/home/outreach/survey");
    },
  };

  const eventNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isEventActive,
    ariaLabel: "Will navigate to event page",
    icon: (
      <TbTimelineEventPlus color={isEventActive ? themeColorShade : iconGray} />
    ),
    label: "Event",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsEventActive,
        payload: !isEventActive,
      });
      navigate("/home/outreach/event");
    },
  };

  const [
    createdAnnouncementNavLink,
    createdSurveyNavLink,
    createdEventNavLink,
  ] = returnAccessibleNavLinkElements([
    announcementNavLinkCreatorInfo,
    surveyNavLinkCreatorInfo,
    eventNavLinkCreatorInfo,
  ]);

  const isOutreachNavlinkOpened =
    isOutreachActive || isAnnouncementActive || isEventActive || isSurveyActive
      ? true
      : false;

  const outreachNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isOutreachActive,
    ariaLabel: "Will navigate to outreach page",
    children: [
      createdAnnouncementNavLink,
      createdSurveyNavLink,
      createdEventNavLink,
    ],
    icon: (
      <RiSignalTowerFill
        color={isOutreachActive ? themeColorShade : iconGray}
      />
    ),
    label: "Outreach",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsOutreachActive,
        payload: !isOutreachActive,
      });
    },
    opened: isOutreachNavlinkOpened,
    rightSection: (
      <TbChevronRight
        color={isOutreachNavlinkOpened ? themeColorShade : iconGray}
      />
    ),
  };

  const [createdOutreachNavLink] = returnAccessibleNavLinkElements([
    outreachNavLinkCreatorInfo,
  ]);

  const [createdDirectoryNavLink] = returnAccessibleNavLinkElements([
    {
      active: isDirectoryActive,
      ariaLabel: "Will navigate to directory page",
      icon: (
        <CgDatabase color={isDirectoryActive ? themeColorShade : iconGray} />
      ),
      label: "Directory",
      onClick: () => {
        portalNavbarDispatch({
          type: portalNavbarAction.setIsDirectoryActive,
          payload: !isDirectoryActive,
        });
        navigate("/home/directory");
      },
    },
  ]);

  const displayDevTestingNavLink = (
    <NavLink
      label={<Text>Dev testing</Text>}
      icon={<TbTimelineEventPlus color={iconGray} />}
      onClick={() => {
        navigate("/home/dev-testing");
      }}
    />
  );

  const resourceNavLink = (
    <NavLink
      label={<Text>Resource</Text>}
      icon={<TbCash color={iconGray} />}
      onClick={() => {
        navigate("/home/resource");
      }}
    />
  );

  return (
    <Navbar
      bg={backgroundColor}
      pl={padding}
      py={padding}
      hiddenBreakpoint="sm"
      hidden={!openedNavbar}
      width={{ sm: 225, lg: 300 }}
      h={width <= 991 ? height - 50 : height - 64} //  height = 50px : header height = 64px
      style={width <= 1024 ? { zIndex: 5 } : {}}
    >
      <ScrollArea styles={() => scrollBarStyle} offsetScrollbars>
        <Flex direction="column">
          {displayDevTestingNavLink}

          {createdHomeNavLink}

          {createdDashboardNavLink}

          {createdCustomerNavLink}

          {createdCommentNavLink}

          {createdFileUploadNavLink}

          {createdProductNavLink}

          {createdRepairNavLink}

          {createdCompanyNavLink}

          {createdGeneralNavLink}

          {createdOutreachNavLink}

          {createdDirectoryNavLink}

          {resourceNavLink}
        </Flex>
      </ScrollArea>
    </Navbar>
  );
}

export { PortalNavbar };
