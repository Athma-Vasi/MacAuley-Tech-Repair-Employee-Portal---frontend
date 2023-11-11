import {
  Flex,
  Footer,
  Group,
  Loader,
  Notification,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { TbCheck } from 'react-icons/tb';

import { COLORS_SWATCHES } from '../../constants/data';
import { useGlobalState } from '../../hooks';
import { useAuth } from '../../hooks/useAuth';
import { returnThemeColors } from '../../utils';

function PortalFooter() {
  const {
    authState: { roles, username: loggedInUsername, isLoggedIn },
  } = useAuth();

  const {
    globalState: { padding, themeObject },
  } = useGlobalState();

  const displayRole = roles.includes('Manager') ? (
    <Text>Role: Manager</Text>
  ) : roles.includes('Admin') ? (
    <Text>Role: Admin</Text>
  ) : (
    <Text>Role: Employee</Text>
  );

  const displayLoggedInUsername = <Text>{loggedInUsername}</Text>;

  const displayUsernameWithRoles = (
    <Flex direction="column">
      {displayLoggedInUsername}
      {displayRole}
    </Flex>
  );

  const {
    appThemeColors: { backgroundColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  // const displayAuthenticationStatus = (
  //   <Group h={50}>
  //     {isFetchingTokens ? (
  //       <Loader size="sm" />
  //     ) : (
  //       <TbCheck color={greenColorShade} size={22} />
  //     )}
  //     <Text>{isFetchingTokens ? 'Authenticating' : 'Authenticated'}</Text>
  //   </Group>
  // );

  return (
    <Footer bg={backgroundColor} height={75} p={padding} w="100%">
      <Group w="100%" position="apart">
        <Group position="left">{displayUsernameWithRoles}</Group>
        {/* <Group position="right">{displayAuthenticationStatus}</Group> */}
      </Group>
    </Footer>
  );
}

export { PortalFooter };
