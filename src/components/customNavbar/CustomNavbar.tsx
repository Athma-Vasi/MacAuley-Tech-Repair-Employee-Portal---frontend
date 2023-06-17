import { NavLink, Navbar, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function CustomNavbar() {
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
    <Navbar width={{ base: 300 }} height={500} p="xs">
      <Title order={3}>CustomNavbar</Title>

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

export { CustomNavbar };
