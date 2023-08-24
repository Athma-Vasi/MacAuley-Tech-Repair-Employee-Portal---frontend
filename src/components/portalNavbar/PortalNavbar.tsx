import { Navbar, NavLink } from '@mantine/core';
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

import { useAuth } from '../../hooks/useAuth';
import { TextWrapper } from '../wrappers';
import { PortalNavbarProps } from './types';

function PortalNavbar({ openedNavbar }: PortalNavbarProps) {
  const navigate = useNavigate();
  const {
    authState: { roles },
  } = useAuth();

  const displayHomeNavLink = (
    <NavLink
      label={<TextWrapper creatorInfoObj={{}}>Home</TextWrapper>}
      icon={<TbHome2 />}
      onClick={() => {
        navigate('/portal');
      }}
    />
  );

  const displayUsersNavLink =
    roles.includes('Admin') || roles.includes('Manager') ? (
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Users</TextWrapper>}
        description="Display list of all users"
        icon={null}
        onClick={() => {
          navigate('/portal/users');
        }}
      />
    ) : null;

  const displayNotesNavLink = (
    <NavLink
      label={<TextWrapper creatorInfoObj={{}}>Notes</TextWrapper>}
      icon={<TbNotebook />}
      childrenOffset="md"
      rightSection={<TbChevronRight />}
    >
      {/* create note */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Create note</TextWrapper>}
        icon={<TbPlus />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/portal/repair-note/create');
        }}
      />
      {/* display notes */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Display notes</TextWrapper>}
        icon={<TbList />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/portal/repair-note/display');
        }}
      />
    </NavLink>
  );

  const displayCompanyNavLinks = (
    <NavLink
      label={<TextWrapper creatorInfoObj={{}}>Company</TextWrapper>}
      icon={<TbBuildingWarehouse />}
      childrenOffset="md"
      rightSection={<TbChevronRight />}
    >
      {/* address change */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Address change</TextWrapper>}
        icon={<TbAddressBook />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/portal/company/address-change');
        }}
      />
      {/* benefit */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Benefits</TextWrapper>}
        icon={<TbGift />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/portal/company/benefit');
        }}
      />
      {/* expense-claim */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Expense claim</TextWrapper>}
        icon={<TbReceipt2 />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/portal/company/expense-claim');
        }}
      />
      {/* leave-request */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Leave request</TextWrapper>}
        icon={<TbCalendarPin />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/portal/company/leave-request');
        }}
      />
      {/* request-resource */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Request resource</TextWrapper>}
        icon={<TbCashBanknote />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/portal/company/request-resource');
        }}
      />
    </NavLink>
  );

  const displayGeneralNavLinks = (
    <NavLink
      label={<TextWrapper creatorInfoObj={{}}>General</TextWrapper>}
      icon={<TbCircleTriangle />}
      childrenOffset="md"
      rightSection={<TbChevronRight />}
    >
      {/* endorsement */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Endorsement</TextWrapper>}
        icon={<TbUserCheck />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/portal/general/endorsement/display');
        }}
      />
      {/* printer-issue */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Printer issue</TextWrapper>}
        icon={<TbPrinterOff />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/portal/general/printer-issue');
        }}
      />
      {/* anonymous-request */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Anonymous request</TextWrapper>}
        icon={<MdSafetyDivider />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/portal/general/anonymous-request');
        }}
      />
      {/* referment */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Referment</TextWrapper>}
        icon={<TiThumbsUp />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/portal/general/referment');
        }}
      />
    </NavLink>
  );

  const displayOutreachNavLinks = (
    <NavLink
      label={<TextWrapper creatorInfoObj={{}}>Outreach</TextWrapper>}
      icon={<RiSignalTowerFill />}
      childrenOffset="md"
      rightSection={<TbChevronRight />}
    >
      {/* announcement */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Announcements</TextWrapper>}
        rightSection={<TbChevronRight />}
        icon={<TbSpeakerphone />}
      >
        {/* create announcement */}
        <NavLink
          label={
            <TextWrapper creatorInfoObj={{}}>Create announcement</TextWrapper>
          }
          icon={<TbPlus />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/portal/outreach/announcement/create');
          }}
        />
        {/* display announcements */}
        <NavLink
          label={
            <TextWrapper creatorInfoObj={{}}>Display announcements</TextWrapper>
          }
          icon={<TbList />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/portal/outreach/announcement/display');
          }}
        />
      </NavLink>
      {/* survey builder */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Survey builder</TextWrapper>}
        icon={<TbChartBar />}
        rightSection={<TbChevronRight />}
      >
        {/* create survey */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Create survey</TextWrapper>}
          icon={<TbPlus />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/portal/outreach/survey-builder/create');
          }}
        />
        {/* display surveys */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Display surveys</TextWrapper>}
          icon={<TbList />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/portal/outreach/survey-builder/display');
          }}
        />
      </NavLink>
      {/* event creator */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Event creator</TextWrapper>}
        icon={<TbTimelineEventPlus />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/portal/outreach/event-creator');
        }}
      >
        {/* create event */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Create event</TextWrapper>}
          icon={<TbPlus />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/portal/outreach/event-creator/create');
          }}
        />
        {/* display events */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Display events</TextWrapper>}
          icon={<TbList />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/portal/outreach/event-creator/display');
          }}
        />
      </NavLink>
    </NavLink>
  );

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!openedNavbar}
      width={{ sm: 200, lg: 300 }}
    >
      {displayHomeNavLink}

      {displayUsersNavLink}

      {displayNotesNavLink}

      {displayCompanyNavLinks}

      {displayGeneralNavLinks}

      {displayOutreachNavLinks}
    </Navbar>
  );
}

export { PortalNavbar };
