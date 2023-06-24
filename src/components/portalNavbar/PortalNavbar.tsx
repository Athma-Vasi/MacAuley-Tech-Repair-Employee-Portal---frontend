import { NavLink, Navbar, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { PortalNavbarProps } from './types';
import { COLORS } from '../../constants';

function PortalNavbar({ openedNavbar }: PortalNavbarProps) {
  const navigate = useNavigate();
  const {
    authState: { roles },
  } = useAuth();

  const { buttonTextColor } = COLORS;

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

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!openedNavbar}
      width={{ sm: 200, lg: 300 }}
    >
      {displayUsersNavLink}

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
    </Navbar>
  );
}

export { PortalNavbar };
