import { NavLink, Navbar, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function CustomNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar width={{ base: 300 }} height={500} p="xs">
      <Title order={3}>CustomNavbar</Title>

      <NavLink
        label="User"
        description="Display list of all users"
        icon={null}
        onClick={() => {
          navigate('/portal/users');
        }}
      />

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
