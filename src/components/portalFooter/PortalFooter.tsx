import { Flex, Footer, Text } from '@mantine/core';

import { useAuth } from '../../hooks/useAuth';

function PortalFooter() {
  const {
    authState: { roles, username: loggedInUsername, errorMessage, isLoggedIn },
  } = useAuth();

  const displayRole = roles.includes('Manager') ? (
    <Text>Role: Manager</Text>
  ) : roles.includes('Admin') ? (
    <Text>Role: Admin</Text>
  ) : (
    <Text>Role: Employee</Text>
  );

  const displayLoggedInUsername = loggedInUsername ? (
    <Text>Username: {loggedInUsername}</Text>
  ) : null;

  const displayIsLoggedIn = isLoggedIn ? (
    <Text>{isLoggedIn ? 'Logged in' : 'Logged out'}</Text>
  ) : null;

  return (
    <Footer height={60} p="md">
      <Flex justify="space-between" align="center">
        <Text>Footer</Text>
        {displayRole}
        {displayLoggedInUsername}
        {displayIsLoggedIn}
      </Flex>
    </Footer>
  );
}

export { PortalFooter };
