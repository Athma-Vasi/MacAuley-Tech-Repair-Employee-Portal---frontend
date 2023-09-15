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
      rightSection={<TbChevronRight />}
    >
      {/* create note */}
      <NavLink
        label={<Text>Create note</Text>}
        icon={<TbPlus />}
        onClick={() => {
          navigate('/home/repair-note/create');
        }}
      />
      {/* display notes */}
      <NavLink
        label={<Text>Display notes</Text>}
        icon={<TbList />}
        onClick={() => {
          navigate('/home/repair-note/display');
        }}
      />
    </NavLink>
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
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/company/address-change');
        }}
      >
        {/* create address change */}
        <NavLink
          label={<Text>Create</Text>}
          icon={<TbPlus />}
          onClick={() => {
            navigate('/home/company/address-change/create');
          }}
        />
        {/* display address changes */}
        <NavLink
          label={<Text>Display</Text>}
          icon={<TbList />}
          onClick={() => {
            navigate('/home/company/address-change/display');
          }}
        />
      </NavLink>

      {/* benefit */}
      <NavLink
        label={<Text>Benefits</Text>}
        icon={<TbGift />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/company/benefit');
        }}
      >
        {/* create benefit */}
        <NavLink
          label={<Text>Create</Text>}
          icon={<TbPlus />}
          onClick={() => {
            navigate('/home/company/benefit/create');
          }}
        />
        {/* display benefits */}
        <NavLink
          label={<Text>Display</Text>}
          icon={<TbList />}
          onClick={() => {
            navigate('/home/company/benefit/display');
          }}
        />
      </NavLink>

      {/* expense-claim */}
      <NavLink
        label={<Text>Expense claim</Text>}
        icon={<TbReceipt2 />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/company/expense-claim');
        }}
      >
        {/* create expense claim */}
        <NavLink
          label={<Text>Create</Text>}
          icon={<TbPlus />}
          onClick={() => {
            navigate('/home/company/expense-claim/create');
          }}
        />
        {/* display expense claims */}
        <NavLink
          label={<Text>Display</Text>}
          icon={<TbList />}
          onClick={() => {
            navigate('/home/company/expense-claim/display');
          }}
        />
      </NavLink>

      {/* leave-request */}
      <NavLink
        label={<Text>Leave request</Text>}
        icon={<TbCalendarPin />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/company/leave-request');
        }}
      >
        {/* create leave request */}
        <NavLink
          label={<Text>Create</Text>}
          icon={<TbPlus />}
          onClick={() => {
            navigate('/home/company/leave-request/create');
          }}
        />
        {/* display leave requests */}
        <NavLink
          label={<Text>Display</Text>}
          icon={<TbList />}
          onClick={() => {
            navigate('/home/company/leave-request/display');
          }}
        />
      </NavLink>

      {/* request-resource */}
      <NavLink
        label={<Text>Request resource</Text>}
        icon={<TbCashBanknote />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/company/request-resource');
        }}
      >
        {/* create request resource */}
        <NavLink
          label={<Text>Create</Text>}
          icon={<TbPlus />}
          onClick={() => {
            navigate('/home/company/request-resource/create');
          }}
        />
        {/* display request resources */}
        <NavLink
          label={<Text>Display</Text>}
          icon={<TbList />}
          onClick={() => {
            navigate('/home/company/request-resource/display');
          }}
        />
      </NavLink>
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
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/general/endorsement/display');
        }}
      >
        {/* display endorsements */}
        <NavLink
          label={<Text>Display</Text>}
          icon={<TbList />}
          onClick={() => {
            navigate('/home/general/endorsement/display');
          }}
        />
        {/* create endorsement */}
        <NavLink
          label={<Text>Create</Text>}
          icon={<TbPlus />}
          onClick={() => {
            navigate('/home/general/endorsement/create');
          }}
        />
      </NavLink>

      {/* printer-issue */}
      <NavLink
        label={<Text>Printer issue</Text>}
        icon={<TbPrinterOff />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/general/printer-issue');
        }}
      >
        {/* create printer issue */}
        <NavLink
          label={<Text>Create</Text>}
          icon={<TbPlus />}
          onClick={() => {
            navigate('/home/general/printer-issue/create');
          }}
        />
        {/* display printer issues */}
        <NavLink
          label={<Text>Display</Text>}
          icon={<TbList />}
          onClick={() => {
            navigate('/home/general/printer-issue/display');
          }}
        />
      </NavLink>

      {/* anonymous-request */}
      <NavLink
        label={<Text>Anonymous request</Text>}
        icon={<MdSafetyDivider />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/general/anonymous-request');
        }}
      >
        {/* create anonymous request */}
        <NavLink
          label={<Text>Create</Text>}
          icon={<TbPlus />}
          onClick={() => {
            navigate('/home/general/anonymous-request/create');
          }}
        />
        {/* display anonymous requests */}
        <NavLink
          label={<Text>Display</Text>}
          icon={<TbList />}
          onClick={() => {
            navigate('/home/general/anonymous-request/display');
          }}
        />
      </NavLink>

      {/* referment */}
      <NavLink
        label={<Text>Referment</Text>}
        icon={<TiThumbsUp />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/general/referment');
        }}
      >
        {/* create referment */}
        <NavLink
          label={<Text>Create</Text>}
          icon={<TbPlus />}
          onClick={() => {
            navigate('/home/general/referment/create');
          }}
        />
        {/* display referments */}
        <NavLink
          label={<Text>Display</Text>}
          icon={<TbList />}
          onClick={() => {
            navigate('/home/general/referment/display');
          }}
        />
      </NavLink>
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
        label={<Text>Announcements</Text>}
        rightSection={<TbChevronRight />}
        icon={<TbSpeakerphone />}
      >
        {/* create announcement */}
        <NavLink
          label={<Text>Create</Text>}
          icon={<TbPlus />}
          onClick={() => {
            navigate('/home/outreach/announcement/create');
          }}
        />
        {/* display announcements */}
        <NavLink
          label={<Text>Display</Text>}
          icon={<TbList />}
          onClick={() => {
            navigate('/home/outreach/announcement/display');
          }}
        />
      </NavLink>
      {/* survey builder */}
      <NavLink
        label={<Text>Survey builder</Text>}
        icon={<TbChartBar />}
        rightSection={<TbChevronRight />}
      >
        {/* create survey */}
        <NavLink
          label={<Text>Create</Text>}
          icon={<TbPlus />}
          onClick={() => {
            navigate('/home/outreach/survey-builder/create');
          }}
        />
        {/* display surveys */}
        <NavLink
          label={<Text>Display</Text>}
          icon={<TbList />}
          onClick={() => {
            navigate('/home/outreach/survey-builder/display');
          }}
        />
      </NavLink>
      {/* event creator */}
      <NavLink
        label={<Text>Event creator</Text>}
        icon={<TbTimelineEventPlus />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/outreach/event-creator');
        }}
      >
        {/* create event */}
        <NavLink
          label={<Text>Create</Text>}
          icon={<TbPlus />}
          onClick={() => {
            navigate('/home/outreach/event-creator/create');
          }}
        />
        {/* display events */}
        <NavLink
          label={<Text>Display</Text>}
          icon={<TbList />}
          onClick={() => {
            navigate('/home/outreach/event-creator/display');
          }}
        />
      </NavLink>
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
