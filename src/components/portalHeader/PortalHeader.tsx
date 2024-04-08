import { Burger, Flex, Header, MediaQuery, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { COLORS_SWATCHES } from "../../constants/data";
import { globalAction } from "../../context/globalProvider/state";
import { useAuth } from "../../hooks/useAuth";
import { useGlobalState } from "../../hooks/useGlobalState";
import { logState, returnThemeColors } from "../../utils";
import { PortalHeaderProps } from "./types";
import { UserAvatar } from "./userAvatar/UserAvatar";

function PortalHeader({ openedHeader, setOpenedHeader }: PortalHeaderProps) {
  const { authState } = useAuth();
  const { accessToken, username } = authState;

  const {
    globalState: { themeObject, width, userDocument },
    globalDispatch,
  } = useGlobalState();
  const matchesPrefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (!matchesPrefersReducedMotion) {
      return;
    }
    globalDispatch({
      type: globalAction.setPrefersReducedMotion,
      payload: matchesPrefersReducedMotion,
    });
  }, [globalDispatch, matchesPrefersReducedMotion]);

  // useEffect(() => {
  //   logState({
  //     state: authState,
  //     groupLabel: "auth state in PortalHeader",
  //   });
  // }, [authState]);

  const {
    appThemeColors: { backgroundColor },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  return (
    <Header height={{ base: 50, md: 70 }} p="md" bg={backgroundColor}>
      <Flex justify="space-between" align="center" h="100%">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={openedHeader}
            onClick={() => setOpenedHeader((open) => !open)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>
        {/* title */}
        {width < 768 ? null : (
          <Flex columnGap="xl" align="center">
            <Flex align="center" justify="center">
              <Title order={3} style={{ letterSpacing: "0.30rem" }}>
                MACAULEY
              </Title>
              <Title order={3} color="red">
                TECH
              </Title>
              <Title order={3} color="green">
                REPAIR
              </Title>
            </Flex>

            <Text>Welcome {userDocument?.firstName ?? username}</Text>
          </Flex>
        )}

        <Flex align="center" justify="flex-end">
          <UserAvatar />
        </Flex>
      </Flex>
    </Header>
  );
}

export { PortalHeader };
