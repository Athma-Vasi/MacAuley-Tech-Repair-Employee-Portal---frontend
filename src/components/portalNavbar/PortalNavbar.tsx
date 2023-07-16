import { faHome, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Group, Navbar, NavLink, Text, Title } from '@mantine/core';
import { BiSolidHome } from 'react-icons/bi';
import {
  BsCalendar3EventFill,
  BsCalendarRangeFill,
  BsFillBuildingFill,
  BsGiftFill,
} from 'react-icons/bs';
import { FiChevronRight } from 'react-icons/fi';
import { GiExpense } from 'react-icons/gi';
import { GoCrossReference } from 'react-icons/go';
import { GrActions } from 'react-icons/gr';
import { MdAnnouncement, MdRecommend, MdSafetyDivider } from 'react-icons/md';
import { PiAddressBookFill } from 'react-icons/pi';
import { RiSignalTowerFill, RiSurveyFill } from 'react-icons/ri';
import { TbPrinterOff } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { COLORS } from '../../constants/data';
import { useAuth } from '../../hooks/useAuth';
import { PortalNavbarProps } from './types';

function PortalNavbar({ openedNavbar }: PortalNavbarProps) {
  const navigate = useNavigate();
  const {
    authState: { roles },
  } = useAuth();

  const { buttonTextColor } = COLORS;

  const displayHomeNavLink = (
    <NavLink
      label={
        <Text size="lg" color={buttonTextColor}>
          Home
        </Text>
      }
      icon={<BiSolidHome />}
      onClick={() => {
        navigate('/portal');
      }}
    />
  );

  const displayUsersNavLink =
    roles.includes('Admin') || roles.includes('Manager') ? (
      <NavLink
        label={
          <Text size="lg" color={buttonTextColor}>
            Users
          </Text>
        }
        description="Display list of all users"
        icon={null}
        onClick={() => {
          navigate('/portal/users');
        }}
      />
    ) : null;

  const displayNotesNavLink = (
    <NavLink
      label={
        <Text size="lg" color={buttonTextColor}>
          Notes
        </Text>
      }
      icon={<FontAwesomeIcon icon={faNoteSticky} />}
      onClick={() => {
        navigate('/portal/notes');
      }}
    />
  );

  const displayAnnouncementsNavLink = (
    <NavLink
      label={
        <Text size="lg" color={buttonTextColor}>
          Announcements
        </Text>
      }
      icon={<MdAnnouncement />}
      onClick={() => {
        navigate('/portal/announcements');
      }}
    />
  );

  const displayCompanyNavLinks = (
    <NavLink
      label={
        <Text size="lg" color={buttonTextColor}>
          Company
        </Text>
      }
      icon={<BsFillBuildingFill />}
      childrenOffset="md"
      rightSection={<FiChevronRight />}
    >
      {/* address change */}
      <NavLink
        label={
          <Text size="lg" color={buttonTextColor}>
            Address change
          </Text>
        }
        icon={<PiAddressBookFill />}
        rightSection={<FiChevronRight />}
        onClick={() => {
          navigate('/portal/company/address-change');
        }}
      />
      {/* benefits */}
      <NavLink
        label={
          <Text size="lg" color={buttonTextColor}>
            Benefits
          </Text>
        }
        icon={<BsGiftFill />}
        rightSection={<FiChevronRight />}
        onClick={() => {
          navigate('/portal/company/benefits');
        }}
      />
      {/* expense claim */}
      <NavLink
        label={
          <Text size="lg" color={buttonTextColor}>
            Expense claim
          </Text>
        }
        icon={<GiExpense />}
        rightSection={<FiChevronRight />}
        onClick={() => {
          navigate('/portal/company/expense-claim');
        }}
      />
      {/* leave request */}
      <NavLink
        label={
          <Text size="lg" color={buttonTextColor}>
            Leave request
          </Text>
        }
        icon={<BsCalendarRangeFill />}
        rightSection={<FiChevronRight />}
        onClick={() => {
          navigate('/portal/company/leave-request');
        }}
      />
    </NavLink>
  );

  const displayGeneralNavLinks = (
    <NavLink
      label={
        <Text size="lg" color={buttonTextColor}>
          General
        </Text>
      }
      icon={<GrActions />}
      childrenOffset="md"
      rightSection={<FiChevronRight />}
    >
      {/* endorsement */}
      <NavLink
        label={
          <Text size="lg" color={buttonTextColor}>
            Endorsement
          </Text>
        }
        icon={<MdRecommend />}
        rightSection={<FiChevronRight />}
        onClick={() => {
          navigate('/portal/general/endorsement');
        }}
      />
      {/* printer issue */}
      <NavLink
        label={
          <Text size="lg" color={buttonTextColor}>
            Printer issue
          </Text>
        }
        icon={<TbPrinterOff />}
        rightSection={<FiChevronRight />}
        onClick={() => {
          navigate('/portal/general/printer-issue');
        }}
      />
      {/* anonymous request */}
      <NavLink
        label={
          <Text size="lg" color={buttonTextColor}>
            Anonymous request
          </Text>
        }
        icon={<MdSafetyDivider />}
        rightSection={<FiChevronRight />}
        onClick={() => {
          navigate('/portal/general/anonymous-request');
        }}
      />
      {/* referment */}
      <NavLink
        label={
          <Text size="lg" color={buttonTextColor}>
            Referment
          </Text>
        }
        icon={<GoCrossReference />}
        rightSection={<FiChevronRight />}
        onClick={() => {
          navigate('/portal/general/referment');
        }}
      />
    </NavLink>
  );

  const displayOutreachNavLinks = (
    <NavLink
      label={
        <Text size="lg" color={buttonTextColor}>
          Outreach
        </Text>
      }
      icon={<RiSignalTowerFill />}
      childrenOffset="md"
      rightSection={<FiChevronRight />}
    >
      {/* survey builder */}
      <NavLink
        label={
          <Text size="lg" color={buttonTextColor}>
            Survey builder
          </Text>
        }
        icon={<RiSurveyFill />}
        rightSection={<FiChevronRight />}
        onClick={() => {
          navigate('/portal/outreach/survey-builder');
        }}
      />
      {/* event creator */}
      <NavLink
        label={
          <Text size="lg" color={buttonTextColor}>
            Event creator
          </Text>
        }
        icon={<BsCalendar3EventFill />}
        rightSection={<FiChevronRight />}
        onClick={() => {
          navigate('/portal/outreach/event-creator');
        }}
      />
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

      {displayAnnouncementsNavLink}

      {displayCompanyNavLinks}

      {displayGeneralNavLinks}

      {displayOutreachNavLinks}
    </Navbar>
  );
}

export { PortalNavbar };
