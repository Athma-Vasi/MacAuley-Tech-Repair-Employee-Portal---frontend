import { Flex, Navbar, NavLink, ScrollArea, Text } from '@mantine/core';
import { CgDatabase } from 'react-icons/cg';
import { MdSafetyDivider } from 'react-icons/md';
import { RiSignalTowerFill } from 'react-icons/ri';
import {
  TbAddressBook,
  TbBuildingWarehouse,
  TbCalendarPin,
  TbCashBanknote,
  TbChartBar,
  TbChevronRight,
  TbCircleTriangle,
  TbGift,
  TbHome2,
  TbList,
  TbNotebook,
  TbPlus,
  TbPrinterOff,
  TbReceipt2,
  TbSpeakerphone,
  TbTimelineEventPlus,
  TbUserCheck,
} from 'react-icons/tb';
import { TiThumbsUp } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import { PortalNavbarProps } from './types';
import { useGlobalState } from '../../hooks';
import { returnThemeColors } from '../../utils';
import { COLORS_SWATCHES } from '../../constants/data';

function PortalNavbar({ openedNavbar }: PortalNavbarProps) {
  const navigate = useNavigate();
  const {
    globalState: { width, themeObject, height, padding },
  } = useGlobalState();

  const { scrollBarStyle } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const displayHomeNavLink = (
    <NavLink
      label={<Text>Home</Text>}
      icon={<TbHome2 />}
      onClick={() => {
        navigate('/home');
      }}
    />
  );

  const displayDirectoryNavLink = (
    <NavLink
      label={<Text>Directory</Text>}
      icon={<CgDatabase />}
      onClick={() => {
        navigate('/home/directory');
      }}
    />
  );

  const displayNotesNavLink = (
    <NavLink
      label={<Text>Notes</Text>}
      icon={<TbNotebook />}
      childrenOffset="md"
      onClick={() => {
        navigate('/home/repair-note');
      }}
    />
  );

  const displayCompanyNavLinks = (
    <NavLink
      label={<Text>Company</Text>}
      icon={<TbBuildingWarehouse />}
      childrenOffset="md"
      rightSection={<TbChevronRight />}
    >
      {/* address change */}
      <NavLink
        label={<Text>Address change</Text>}
        icon={<TbAddressBook />}
        onClick={() => {
          navigate('/home/company/address-change');
        }}
      />

      {/* benefit */}
      <NavLink
        label={<Text>Benefit</Text>}
        icon={<TbGift />}
        onClick={() => {
          navigate('/home/company/benefit');
        }}
      />

      {/* expense-claim */}
      <NavLink
        label={<Text>Expense claim</Text>}
        icon={<TbReceipt2 />}
        onClick={() => {
          navigate('/home/company/expense-claim');
        }}
      />

      {/* leave-request */}
      <NavLink
        label={<Text>Leave request</Text>}
        icon={<TbCalendarPin />}
        onClick={() => {
          navigate('/home/company/leave-request');
        }}
      />

      {/* request-resource */}
      <NavLink
        label={<Text>Request resource</Text>}
        icon={<TbCashBanknote />}
        onClick={() => {
          navigate('/home/company/request-resource');
        }}
      />
    </NavLink>
  );

  const displayGeneralNavLinks = (
    <NavLink
      label={<Text>General</Text>}
      icon={<TbCircleTriangle />}
      childrenOffset="md"
      rightSection={<TbChevronRight />}
    >
      {/* endorsement */}
      <NavLink
        label={<Text>Endorsement</Text>}
        icon={<TbUserCheck />}
        onClick={() => {
          navigate('/home/general/endorsement');
        }}
      />

      {/* printer-issue */}
      <NavLink
        label={<Text>Printer issue</Text>}
        icon={<TbPrinterOff />}
        onClick={() => {
          navigate('/home/general/printer-issue');
        }}
      />

      {/* anonymous-request */}
      <NavLink
        label={<Text>Anonymous request</Text>}
        icon={<MdSafetyDivider />}
        onClick={() => {
          navigate('/home/general/anonymous-request');
        }}
      />

      {/* referment */}
      <NavLink
        label={<Text>Referment</Text>}
        icon={<TiThumbsUp />}
        onClick={() => {
          navigate('/home/general/referment');
        }}
      />
    </NavLink>
  );

  const displayOutreachNavLinks = (
    <NavLink
      label={<Text>Outreach</Text>}
      icon={<RiSignalTowerFill />}
      childrenOffset="md"
      rightSection={<TbChevronRight />}
    >
      {/* announcement */}
      <NavLink
        label={<Text>Announcement</Text>}
        icon={<TbSpeakerphone />}
        onClick={() => {
          navigate('/home/outreach/announcement');
        }}
      />

      {/* survey builder */}
      <NavLink
        label={<Text>Survey</Text>}
        icon={<TbChartBar />}
        onClick={() => {
          navigate('/home/outreach/survey');
        }}
      />

      {/* event creator */}
      <NavLink
        label={<Text>Event</Text>}
        icon={<TbTimelineEventPlus />}
        onClick={() => {
          navigate('/home/outreach/event');
        }}
      />
    </NavLink>
  );

  return (
    <Navbar
      pl={padding}
      py={padding}
      hiddenBreakpoint="sm"
      hidden={!openedNavbar}
      width={{ sm: 200, lg: 300 }}
      h={width <= 991 ? height - 50 : height - 64} //  vw < 991 ? header height = 50px : header height = 64px
    >
      <ScrollArea styles={() => scrollBarStyle} offsetScrollbars>
        <Flex direction="column">
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
