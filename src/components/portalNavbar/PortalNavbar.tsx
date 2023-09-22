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
import { returnThemeColors } from '../../utils';
import { initialPortalNavbarState, portalNavbarReducer } from './state';
import { PortalNavbarProps } from './types';

function PortalNavbar({ openedNavbar }: PortalNavbarProps) {
  const [portalNavbarState, portalNavbarDispatch] = useReducer(
    portalNavbarReducer,
    initialPortalNavbarState
  );
  const {
    isHomeActive,
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
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const displayHomeNavLink = (
    <NavLink
      label={<Text>Home</Text>}
      icon={<TbHome2 color={iconGray} />}
      onClick={() => {
        portalNavbarDispatch({
          type: 'setIsHomeActive',
          payload: !isHomeActive,
        });
        navigate('/home');
      }}
      active={isHomeActive}
    />
  );

  const displayDirectoryNavLink = (
    <NavLink
      label={<Text>Directory</Text>}
      icon={<CgDatabase color={iconGray} />}
      onClick={() => {
        portalNavbarDispatch({
          type: 'setIsDirectoryActive',
          payload: !isDirectoryActive,
        });
        navigate('/home/directory');
      }}
      active={isDirectoryActive}
    />
  );

  const displayNotesNavLink = (
    <NavLink
      label={<Text>Repair Notes</Text>}
      icon={<TbNotebook color={iconGray} />}
      childrenOffset="md"
      onClick={() => {
        portalNavbarDispatch({
          type: 'setIsNotesActive',
          payload: !isNotesActive,
        });
        navigate('/home/repair-note');
      }}
      active={isNotesActive}
    />
  );

  // company
  const isCompanyNavlinkOpened =
    isCompanyActive ||
    isAddressChangeActive ||
    isBenefitActive ||
    isExpenseClaimActive ||
    isLeaveRequestActive ||
    isRequestResourceActive
      ? true
      : false;

  const displayCompanyNavLinks = (
    <NavLink
      active={isCompanyActive}
      childrenOffset="md"
      label={<Text>Company</Text>}
      icon={<TbBuildingWarehouse color={iconGray} />}
      rightSection={
        <TbChevronRight
          color={isCompanyNavlinkOpened ? themeColorShade : iconGray}
        />
      }
      onClick={() => {
        portalNavbarDispatch({
          type: 'setIsCompanyActive',
          payload: !isCompanyActive,
        });
        navigate('/home/company');
      }}
      opened={isCompanyNavlinkOpened}
    >
      {/* address change */}
      <NavLink
        label={<Text>Address change</Text>}
        icon={<TbAddressBook color={iconGray} />}
        onClick={() => {
          portalNavbarDispatch({
            type: 'setIsAddressChangeActive',
            payload: !isAddressChangeActive,
          });
          navigate('/home/company/address-change');
        }}
        active={isAddressChangeActive}
      />

      {/* benefit */}
      <NavLink
        label={<Text>Benefit</Text>}
        icon={<TbGift color={iconGray} />}
        onClick={() => {
          portalNavbarDispatch({
            type: 'setIsBenefitActive',
            payload: !isBenefitActive,
          });
          navigate('/home/company/benefit');
        }}
        active={isBenefitActive}
      />

      {/* expense-claim */}
      <NavLink
        label={<Text>Expense claim</Text>}
        icon={<TbReceipt2 color={iconGray} />}
        onClick={() => {
          portalNavbarDispatch({
            type: 'setIsExpenseClaimActive',
            payload: !isExpenseClaimActive,
          });
          navigate('/home/company/expense-claim');
        }}
        active={isExpenseClaimActive}
      />

      {/* leave-request */}
      <NavLink
        label={<Text>Leave request</Text>}
        icon={<TbCalendarPin color={iconGray} />}
        onClick={() => {
          portalNavbarDispatch({
            type: 'setIsLeaveRequestActive',
            payload: !isLeaveRequestActive,
          });
          navigate('/home/company/leave-request');
        }}
        active={isLeaveRequestActive}
      />

      {/* request-resource */}
      <NavLink
        label={<Text>Request resource</Text>}
        icon={<TbCashBanknote color={iconGray} />}
        onClick={() => {
          portalNavbarDispatch({
            type: 'setIsRequestResourceActive',
            payload: !isRequestResourceActive,
          });
          navigate('/home/company/request-resource');
        }}
        active={isRequestResourceActive}
      />
    </NavLink>
  );

  // general
  const isGeneralNavlinkOpened =
    isGeneralActive ||
    isEndorsementActive ||
    isPrinterIssueActive ||
    isAnonymousRequestActive ||
    isRefermentActive
      ? true
      : false;

  const displayGeneralNavLinks = (
    <NavLink
      active={isGeneralActive}
      childrenOffset="md"
      icon={<TbCircleTriangle color={iconGray} />}
      label={<Text>General</Text>}
      rightSection={
        <TbChevronRight
          color={isGeneralNavlinkOpened ? themeColorShade : iconGray}
        />
      }
      onClick={() => {
        portalNavbarDispatch({
          type: 'setIsGeneralActive',
          payload: !isGeneralActive,
        });
        navigate('/home/general');
      }}
      opened={isGeneralNavlinkOpened}
    >
      {/* endorsement */}
      <NavLink
        label={<Text>Endorsement</Text>}
        icon={<TbUserCheck color={iconGray} />}
        onClick={() => {
          portalNavbarDispatch({
            type: 'setIsEndorsementActive',
            payload: !isEndorsementActive,
          });
          navigate('/home/general/endorsement');
        }}
        active={isEndorsementActive}
      />

      {/* printer-issue */}
      <NavLink
        label={<Text>Printer issue</Text>}
        icon={<TbPrinterOff color={iconGray} />}
        onClick={() => {
          portalNavbarDispatch({
            type: 'setIsPrinterIssueActive',
            payload: !isPrinterIssueActive,
          });
          navigate('/home/general/printer-issue');
        }}
        active={isPrinterIssueActive}
      />

      {/* anonymous-request */}
      <NavLink
        label={<Text>Anonymous request</Text>}
        icon={<MdSafetyDivider color={iconGray} />}
        onClick={() => {
          portalNavbarDispatch({
            type: 'setIsAnonymousRequestActive',
            payload: !isAnonymousRequestActive,
          });
          navigate('/home/general/anonymous-request');
        }}
        active={isAnonymousRequestActive}
      />

      {/* referment */}
      <NavLink
        label={<Text>Referment</Text>}
        icon={<TiThumbsUp color={iconGray} />}
        onClick={() => {
          portalNavbarDispatch({
            type: 'setIsRefermentActive',
            payload: !isRefermentActive,
          });
          navigate('/home/general/referment');
        }}
        active={isRefermentActive}
      />
    </NavLink>
  );

  // outreach
  const isOutreachNavlinkOpened =
    isOutreachActive || isAnnouncementActive || isEventActive || isSurveyActive
      ? true
      : false;

  const displayOutreachNavLinks = (
    <NavLink
      active={isOutreachActive}
      childrenOffset="md"
      icon={<RiSignalTowerFill color={iconGray} />}
      label={<Text>Outreach</Text>}
      rightSection={
        <TbChevronRight
          color={isOutreachNavlinkOpened ? themeColorShade : iconGray}
        />
      }
      onClick={() => {
        portalNavbarDispatch({
          type: 'setIsOutreachActive',
          payload: !isOutreachActive,
        });
        navigate('/home/outreach');
      }}
      opened={isOutreachNavlinkOpened}
    >
      {/* announcement */}
      <NavLink
        label={<Text>Announcement</Text>}
        icon={<TbSpeakerphone color={iconGray} />}
        onClick={() => {
          portalNavbarDispatch({
            type: 'setIsAnnouncementActive',
            payload: !isAnnouncementActive,
          });
          navigate('/home/outreach/announcement');
        }}
        active={isAnnouncementActive}
      />

      {/* survey builder */}
      <NavLink
        label={<Text>Survey</Text>}
        icon={<TbChartPie3 color={iconGray} />}
        onClick={() => {
          portalNavbarDispatch({
            type: 'setIsSurveyActive',
            payload: !isSurveyActive,
          });
          navigate('/home/outreach/survey');
        }}
        active={isSurveyActive}
      />

      {/* event creator */}
      <NavLink
        label={<Text>Event</Text>}
        icon={<TbTimelineEventPlus color={iconGray} />}
        onClick={() => {
          portalNavbarDispatch({
            type: 'setIsEventActive',
            payload: !isEventActive,
          });
          navigate('/home/outreach/event');
        }}
        active={isEventActive}
      />
    </NavLink>
  );

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

  return (
    <Navbar
      pl={padding}
      py={padding}
      hiddenBreakpoint="sm"
      hidden={!openedNavbar}
      width={{ sm: 225, lg: 300 }}
      h={width <= 991 ? height - 50 : height - 64} //  vw < 991 ? header height = 50px : header height = 64px
    >
      <ScrollArea styles={() => scrollBarStyle} offsetScrollbars>
        <Flex direction="column">
          {/* dev testing */}
          {displayDevTestingNavLink}

          {displayHomeNavLink}

          {displayNotesNavLink}

          {displayCompanyNavLinks}

          {displayGeneralNavLinks}

          {displayOutreachNavLinks}

          {displayDirectoryNavLink}
        </Flex>
      </ScrollArea>
    </Navbar>
  );
}

export { PortalNavbar };
