import { Navbar, NavLink, Text, Title } from '@mantine/core';
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

  const displayDashboardNavLink = (
    <NavLink
      label={
        <Text size="lg" color={buttonTextColor}>
          Dashboard
        </Text>
      }
      description="Display welcome page"
      icon={null}
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
      description="Display list of all notes"
      icon={null}
      onClick={() => {
        navigate('/portal/notes');
      }}
    />
  );

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!openedNavbar}
      width={{ sm: 200, lg: 300 }}
    >
      {displayDashboardNavLink}

      {displayUsersNavLink}

      {displayNotesNavLink}
    </Navbar>
  );
}

export { PortalNavbar };
