import { Flex, Navbar, NavLink, ScrollArea, Text } from '@mantine/core';
import { useReducer } from 'react';
import { CgDatabase } from 'react-icons/cg';
import { MdSafetyDivider } from 'react-icons/md';
import { RiSignalTowerFill } from 'react-icons/ri';
import {
  TbAddressBook,
  TbBuildingWarehouse,
  TbCalendarPin,
  TbCashBanknote,
  TbChartPie3,
  TbChevronRight,
  TbCircleTriangle,
  TbDashboard,
  TbGift,
  TbHome2,
  TbNotebook,
  TbPrinterOff,
  TbReceipt2,
  TbSpeakerphone,
  TbTimelineEventPlus,
  TbUserCheck,
} from 'react-icons/tb';
import { TiThumbsUp } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES } from '../../constants/data';
import { useGlobalState } from '../../hooks';
import { returnAccessibleNavLinkElements } from '../../jsxCreators';
import { returnThemeColors } from '../../utils';
import { AccessibleNavLinkCreatorInfo } from '../wrappers';
import {
  initialPortalNavbarState,
  portalNavbarAction,
  portalNavbarReducer,
} from './state';
import { PortalNavbarProps } from './types';

function PortalNavbar({ openedNavbar }: PortalNavbarProps) {
  const [portalNavbarState, portalNavbarDispatch] = useReducer(
    portalNavbarReducer,
    initialPortalNavbarState
  );
  const {
    // active states
    isHomeActive,
    isDashboardActive,
    isProductActive,
    isNotesActive,

    // company
    isCompanyActive,
    isAddressChangeActive,
    isBenefitActive,
    isExpenseClaimActive,
    isLeaveRequestActive,
    isRequestResourceActive,

    // general
    isGeneralActive,
    isEndorsementActive,
    isPrinterIssueActive,
    isAnonymousRequestActive,
    isRefermentActive,

    // outreach
    isOutreachActive,
    isAnnouncementActive,
    isSurveyActive,
    isEventActive,

    isDirectoryActive,
  } = portalNavbarState;

  const {
    globalState: { width, themeObject, height, padding },
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

  const homeNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isHomeActive,
    ariaLabel: 'Will navigate to home page',
    icon: <TbHome2 color={isHomeActive ? themeColorShade : iconGray} />,
    label: 'Home',
    onClick: () => {
      portalNavbarDispatch({
        type: 'setIsHomeActive',
        payload: !isHomeActive,
      });
      navigate('/home');
    },
  };

  const dashboardNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isDashboardActive,
    ariaLabel: 'Will navigate to dashboard page',
    icon: (
      <TbDashboard color={isDashboardActive ? themeColorShade : iconGray} />
    ),
    label: 'Dashboard',
    onClick: () => {
      portalNavbarDispatch({
        type: 'setIsDashboardActive',
        payload: !isDashboardActive,
      });
      navigate('/home/dashboard');
    },
  };

  const productNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isProductActive,
    ariaLabel: 'Will navigate to product page',
    icon: <TbDashboard color={isProductActive ? themeColorShade : iconGray} />,
    label: 'Product',
    onClick: () => {
      portalNavbarDispatch({
        type: 'setIsProductActive',
        payload: !isProductActive,
      });
      navigate('/home/dashboard/product');
    },
  };

  const directoryNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isDirectoryActive,
    ariaLabel: 'Will navigate to directory page',
    icon: <CgDatabase color={isDirectoryActive ? themeColorShade : iconGray} />,
    label: 'Directory',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsDirectoryActive,
        payload: !isDirectoryActive,
      });
      navigate('/home/directory');
    },
  };

  const notesNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isNotesActive,
    ariaLabel: 'Will navigate to repair notes page',
    icon: <TbNotebook color={isNotesActive ? themeColorShade : iconGray} />,
    label: 'Repair Notes',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsNotesActive,
        payload: !isNotesActive,
      });
      navigate('/home/repair-note');
    },
  };

  const [
    createdHomeNavLink,
    createdDashboardNavLink,
    createdProductNavLink,
    createdDirectoryNavLink,
    createdNotesNavLink,
  ] = returnAccessibleNavLinkElements([
    homeNavLinkCreatorInfo,
    dashboardNavLinkCreatorInfo,
    productNavLinkCreatorInfo,
    directoryNavLinkCreatorInfo,
    notesNavLinkCreatorInfo,
  ]);

  // company
  const addressChangeNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isAddressChangeActive,
    ariaLabel: 'Will navigate to address change page',
    icon: (
      <TbAddressBook
        color={isAddressChangeActive ? themeColorShade : iconGray}
      />
    ),
    label: 'Address change',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsAddressChangeActive,
        payload: !isAddressChangeActive,
      });
      navigate('/home/company/address-change');
    },
  };

  const benefitNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isBenefitActive,
    ariaLabel: 'Will navigate to benefit page',
    icon: <TbGift color={isBenefitActive ? themeColorShade : iconGray} />,
    label: 'Benefit',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsBenefitActive,
        payload: !isBenefitActive,
      });
      navigate('/home/company/benefit');
    },
  };

  const expenseClaimNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isExpenseClaimActive,
    ariaLabel: 'Will navigate to expense claim page',
    icon: (
      <TbReceipt2 color={isExpenseClaimActive ? themeColorShade : iconGray} />
    ),
    label: 'Expense claim',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsExpenseClaimActive,
        payload: !isExpenseClaimActive,
      });
      navigate('/home/company/expense-claim');
    },
  };

  const leaveRequestNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isLeaveRequestActive,
    ariaLabel: 'Will navigate to leave request page',
    icon: (
      <TbCalendarPin
        color={isLeaveRequestActive ? themeColorShade : iconGray}
      />
    ),
    label: 'Leave request',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsLeaveRequestActive,
        payload: !isLeaveRequestActive,
      });
      navigate('/home/company/leave-request');
    },
  };

  const requestResourceNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isRequestResourceActive,
    ariaLabel: 'Will navigate to request resource page',
    icon: (
      <TbCashBanknote
        color={isRequestResourceActive ? themeColorShade : iconGray}
      />
    ),
    label: 'Request resource',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsRequestResourceActive,
        payload: !isRequestResourceActive,
      });
      navigate('/home/company/request-resource');
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

  const isCompanyNavlinkOpened =
    isCompanyActive ||
    isAddressChangeActive ||
    isBenefitActive ||
    isExpenseClaimActive ||
    isLeaveRequestActive ||
    isRequestResourceActive
      ? true
      : false;

  const companyNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isCompanyActive,
    ariaLabel: 'Will navigate to company page',
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
    label: 'Company',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsCompanyActive,
        payload: !isCompanyActive,
      });
      navigate('/home/company');
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

  // general

  const endorsementNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isEndorsementActive,
    ariaLabel: 'Will navigate to endorsement page',
    icon: (
      <TbUserCheck color={isEndorsementActive ? themeColorShade : iconGray} />
    ),
    label: 'Endorsement',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsEndorsementActive,
        payload: !isEndorsementActive,
      });
      navigate('/home/general/endorsement');
    },
  };

  const printerIssueNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isPrinterIssueActive,
    ariaLabel: 'Will navigate to printer issue page',
    icon: (
      <TbPrinterOff color={isPrinterIssueActive ? themeColorShade : iconGray} />
    ),
    label: 'Printer issue',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsPrinterIssueActive,
        payload: !isPrinterIssueActive,
      });
      navigate('/home/general/printer-issue');
    },
  };

  const anonymousRequestNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isAnonymousRequestActive,
    ariaLabel: 'Will navigate to anonymous request page',
    icon: (
      <MdSafetyDivider
        color={isAnonymousRequestActive ? themeColorShade : iconGray}
      />
    ),
    label: 'Anonymous request',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsAnonymousRequestActive,
        payload: !isAnonymousRequestActive,
      });
      navigate('/home/general/anonymous-request');
    },
  };

  const refermentNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isRefermentActive,
    ariaLabel: 'Will navigate to referment page',
    icon: <TiThumbsUp color={isRefermentActive ? themeColorShade : iconGray} />,
    label: 'Referment',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsRefermentActive,
        payload: !isRefermentActive,
      });
      navigate('/home/general/referment');
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

  const isGeneralNavlinkOpened =
    isGeneralActive ||
    isEndorsementActive ||
    isPrinterIssueActive ||
    isAnonymousRequestActive ||
    isRefermentActive
      ? true
      : false;

  const generalNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isGeneralActive,
    ariaLabel: 'Will navigate to general page',
    children: [
      createdEndorsementNavLink,
      createdPrinterIssueNavLink,
      createdAnonymousRequestNavLink,
      createdRefermentNavLink,
    ],
    icon: (
      <TbCircleTriangle color={isGeneralActive ? themeColorShade : iconGray} />
    ),
    label: 'General',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsGeneralActive,
        payload: !isGeneralActive,
      });
      navigate('/home/general');
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

  // outreach
  const announcementNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isAnnouncementActive,
    ariaLabel: 'Will navigate to announcement page',
    icon: (
      <TbSpeakerphone
        color={isAnnouncementActive ? themeColorShade : iconGray}
      />
    ),
    label: 'Announcement',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsAnnouncementActive,
        payload: !isAnnouncementActive,
      });
      navigate('/home/outreach/announcement');
    },
  };

  const surveyNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isSurveyActive,
    ariaLabel: 'Will navigate to survey page',
    icon: <TbChartPie3 color={isSurveyActive ? themeColorShade : iconGray} />,
    label: 'Survey',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsSurveyActive,
        payload: !isSurveyActive,
      });
      navigate('/home/outreach/survey');
    },
  };

  const eventNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isEventActive,
    ariaLabel: 'Will navigate to event page',
    icon: (
      <TbTimelineEventPlus color={isEventActive ? themeColorShade : iconGray} />
    ),
    label: 'Event',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsEventActive,
        payload: !isEventActive,
      });
      navigate('/home/outreach/event');
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
    ariaLabel: 'Will navigate to outreach page',
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
    label: 'Outreach',
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsOutreachActive,
        payload: !isOutreachActive,
      });
      navigate('/home/outreach');
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

  // dev testing page
  const displayDevTestingNavLink = (
    <NavLink
      label={<Text>Dev testing</Text>}
      icon={<TbTimelineEventPlus color={iconGray} />}
      onClick={() => {
        navigate('/home/dev-testing');
      }}
    />
  );

  // useEffect(() => {
  //   logState({
  //     state: portalNavbarState,
  //     groupLabel: 'PortalNavbar',
  //   });
  // }, [portalNavbarState]);

  return (
    <Navbar
      bg={backgroundColor}
      pl={padding}
      py={padding}
      hiddenBreakpoint="sm"
      hidden={!openedNavbar}
      width={{ sm: 225, lg: 300 }}
      h={width <= 991 ? height - 50 : height - 64} //  vw < 991 ? header height = 50px : header height = 64px
      style={width <= 1024 ? { zIndex: 5 } : {}}
    >
      <ScrollArea styles={() => scrollBarStyle} offsetScrollbars>
        <Flex direction="column">
          {/* dev testing */}
          {displayDevTestingNavLink}

          {/* {displayHomeNavLink} */}
          {createdHomeNavLink}

          {/* {displayDashboardNavLink} */}
          {createdDashboardNavLink}

          {/* {displayProductNavLink} */}
          {createdProductNavLink}

          {/* {displayNotesNavLink} */}
          {createdNotesNavLink}

          {/* {displayCompanyNavLinks} */}
          {createdCompanyNavLink}

          {/* {displayGeneralNavLinks} */}
          {createdGeneralNavLink}

          {/* {displayOutreachNavLinks} */}
          {createdOutreachNavLink}

          {/* {displayDirectoryNavLink} */}
          {createdDirectoryNavLink}
        </Flex>
      </ScrollArea>
    </Navbar>
  );
}

export { PortalNavbar };
