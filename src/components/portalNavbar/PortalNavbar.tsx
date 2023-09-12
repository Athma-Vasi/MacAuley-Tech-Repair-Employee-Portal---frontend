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
import { CgDatabase } from 'react-icons/cg';
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
        navigate('/home');
      }}
    />
  );

  // const displayUsersNavLink =
  //   roles.includes('Admin') || roles.includes('Manager') ? (
  //     <NavLink
  //       label={<TextWrapper creatorInfoObj={{}}>Users</TextWrapper>}
  //       description="Display list of all users"
  //       icon={null}
  //       onClick={() => {
  //         navigate('/home/users');
  //       }}
  //     />
  //   ) : null;

  const displayDirectoryNavLink = (
    <NavLink
      label={<TextWrapper creatorInfoObj={{}}>Directory</TextWrapper>}
      icon={<CgDatabase />}
      onClick={() => {
        navigate('/home/directory');
      }}
    />
  );

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
          navigate('/home/repair-note/create');
        }}
      />
      {/* display notes */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Display notes</TextWrapper>}
        icon={<TbList />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/repair-note/display');
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
          navigate('/home/company/address-change');
        }}
      >
        {/* create address change */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Create</TextWrapper>}
          icon={<TbPlus />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/company/address-change/create');
          }}
        />
        {/* display address changes */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Display</TextWrapper>}
          icon={<TbList />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/company/address-change/display');
          }}
        />
      </NavLink>

      {/* benefit */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Benefits</TextWrapper>}
        icon={<TbGift />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/company/benefit');
        }}
      >
        {/* create benefit */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Create</TextWrapper>}
          icon={<TbPlus />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/company/benefit/create');
          }}
        />
        {/* display benefits */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Display</TextWrapper>}
          icon={<TbList />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/company/benefit/display');
          }}
        />
      </NavLink>

      {/* expense-claim */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Expense claim</TextWrapper>}
        icon={<TbReceipt2 />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/company/expense-claim');
        }}
      >
        {/* create expense claim */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Create</TextWrapper>}
          icon={<TbPlus />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/company/expense-claim/create');
          }}
        />
        {/* display expense claims */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Display</TextWrapper>}
          icon={<TbList />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/company/expense-claim/display');
          }}
        />
      </NavLink>

      {/* leave-request */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Leave request</TextWrapper>}
        icon={<TbCalendarPin />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/company/leave-request');
        }}
      >
        {/* create leave request */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Create</TextWrapper>}
          icon={<TbPlus />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/company/leave-request/create');
          }}
        />
        {/* display leave requests */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Display</TextWrapper>}
          icon={<TbList />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/company/leave-request/display');
          }}
        />
      </NavLink>

      {/* request-resource */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Request resource</TextWrapper>}
        icon={<TbCashBanknote />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/company/request-resource');
        }}
      >
        {/* create request resource */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Create</TextWrapper>}
          icon={<TbPlus />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/company/request-resource/create');
          }}
        />
        {/* display request resources */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Display</TextWrapper>}
          icon={<TbList />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/company/request-resource/display');
          }}
        />
      </NavLink>
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
          navigate('/home/general/endorsement/display');
        }}
      >
        {/* display endorsements */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Display</TextWrapper>}
          icon={<TbList />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/general/endorsement/display');
          }}
        />
        {/* create endorsement */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Create</TextWrapper>}
          icon={<TbPlus />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/general/endorsement/create');
          }}
        />
      </NavLink>

      {/* printer-issue */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Printer issue</TextWrapper>}
        icon={<TbPrinterOff />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/general/printer-issue');
        }}
      >
        {/* create printer issue */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Create</TextWrapper>}
          icon={<TbPlus />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/general/printer-issue/create');
          }}
        />
        {/* display printer issues */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Display</TextWrapper>}
          icon={<TbList />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/general/printer-issue/display');
          }}
        />
      </NavLink>

      {/* anonymous-request */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Anonymous request</TextWrapper>}
        icon={<MdSafetyDivider />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/general/anonymous-request');
        }}
      >
        {/* create anonymous request */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Create</TextWrapper>}
          icon={<TbPlus />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/general/anonymous-request/create');
          }}
        />
        {/* display anonymous requests */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Display</TextWrapper>}
          icon={<TbList />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/general/anonymous-request/display');
          }}
        />
      </NavLink>

      {/* referment */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Referment</TextWrapper>}
        icon={<TiThumbsUp />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/general/referment');
        }}
      >
        {/* create referment */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Create</TextWrapper>}
          icon={<TbPlus />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/general/referment/create');
          }}
        />
        {/* display referments */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Display</TextWrapper>}
          icon={<TbList />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/general/referment/display');
          }}
        />
      </NavLink>
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
            navigate('/home/outreach/announcement/create');
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
            navigate('/home/outreach/announcement/display');
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
            navigate('/home/outreach/survey-builder/create');
          }}
        />
        {/* display surveys */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Display surveys</TextWrapper>}
          icon={<TbList />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/outreach/survey-builder/display');
          }}
        />
      </NavLink>
      {/* event creator */}
      <NavLink
        label={<TextWrapper creatorInfoObj={{}}>Event creator</TextWrapper>}
        icon={<TbTimelineEventPlus />}
        rightSection={<TbChevronRight />}
        onClick={() => {
          navigate('/home/outreach/event-creator');
        }}
      >
        {/* create event */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Create event</TextWrapper>}
          icon={<TbPlus />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/outreach/event-creator/create');
          }}
        />
        {/* display events */}
        <NavLink
          label={<TextWrapper creatorInfoObj={{}}>Display events</TextWrapper>}
          icon={<TbList />}
          rightSection={<TbChevronRight />}
          onClick={() => {
            navigate('/home/outreach/event-creator/display');
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

      {displayNotesNavLink}

      {displayCompanyNavLinks}

      {displayGeneralNavLinks}

      {displayOutreachNavLinks}

      {displayDirectoryNavLink}
    </Navbar>
  );
}

export { PortalNavbar };
