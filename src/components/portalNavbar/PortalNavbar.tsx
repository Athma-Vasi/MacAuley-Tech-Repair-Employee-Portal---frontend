import { NavLink, Navbar, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { PortalNavbarProps } from './types';

function PortalNavbar({ openedNavbar }: PortalNavbarProps) {
  const navigate = useNavigate();
  const {
    authState: { roles },
  } = useAuth();

  const displayUsersNavLink =
    roles.includes('Admin') || roles.includes('Manager') ? (
      <NavLink
        label="User"
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
      <Title order={3}>PortalNavbar</Title>

      {displayUsersNavLink}

      <NavLink
        label="Note"
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
