import { Flex, Footer, Group, Text } from "@mantine/core";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import { returnThemeColors } from "../../utils";

function PortalFooter() {
  const {
    authState: {
      decodedToken: { userInfo: { roles, username: loggedInUsername } },
    },
  } = useAuth();

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const displayRole = roles.includes("Manager")
    ? <Text>Role: Manager</Text>
    : roles.includes("Admin")
    ? <Text>Role: Admin</Text>
    : <Text>Role: Employee</Text>;

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

  return (
    <Footer bg={backgroundColor} height={75} w="100%">
      <Group w="100%" position="apart">
        <Group position="left">{displayUsernameWithRoles}</Group>
      </Group>
    </Footer>
  );
}

export { PortalFooter };
