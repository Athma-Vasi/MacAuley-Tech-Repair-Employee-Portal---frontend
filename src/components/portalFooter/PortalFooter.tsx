import { Flex, Footer, Text } from '@mantine/core';

import { useAuth } from '../../hooks/useAuth';
import { useGlobalState } from '../../hooks';
import { returnThemeColors } from '../../utils';
import { COLORS_SWATCHES } from '../../constants/data';

function PortalFooter() {
  const {
    authState: { roles, username: loggedInUsername, isLoggedIn },
  } = useAuth();

  const {
    globalState: { themeObject },
  } = useGlobalState();

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

  const {
    appThemeColors: { backgroundColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  return (
    <Footer bg={backgroundColor} height={60} p="md">
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
