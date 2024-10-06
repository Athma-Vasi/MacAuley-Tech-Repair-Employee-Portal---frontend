import { Grid, Group, Image, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { COLORS_SWATCHES } from "../../../constants/data";
import { useAuth, useGlobalState } from "../../../hooks";
import type { UserDocument } from "../../../types";
import { returnThemeColors, splitCamelCase } from "../../../utils";
import { returnProfileInfoObject } from "./utils";

type UserInfoProps = {
  closeUserInfoModal: () => void;
};

function UserInfo({ closeUserInfoModal }: UserInfoProps) {
  const {
    globalState: { themeObject },
  } = useGlobalState();

  const { authState: { userDocument } } = useAuth();

  const navigate = useNavigate();

  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  // const [profilePicElement] = returnAccessibleImageElements([
  //   {
  //     customWidth: width < 640 ? 128 : width < 1024 ? 256 : 384,
  //     customRadius: 4,
  //     fit: "cover",
  //     imageSrc: userDocument?.profilePictureUrl,
  //     imageAlt: `Picture of ${userDocument?.username}`,
  //     isCard: false,
  //     isOverlay: false,
  //     isLoader: true,
  //     withPlaceholder: true,
  //   },
  // ]);

  const profilePic = (
    <Group w="100%" position="center" align="center">
      <Image
        src={userDocument?.profilePictureUrl as string}
        alt={`Picture of ${userDocument?.username}`}
        radius={4}
        fit="cover"
        placeholder
      />
    </Group>
  );

  const profileInfoObject = returnProfileInfoObject(
    userDocument as Omit<UserDocument, "password" | "paymentInformation">,
  );

  const displayProfileStack = Object.entries(profileInfoObject).map(
    (keyValTuple, index) => {
      const [pageName, pageObjectArr] = keyValTuple as [
        string, // page name
        Array<{
          inputName: string;
          inputValue?: string | boolean;
        }>,
      ];

      const displayPageName = (
        <Group
          w="100%"
          position="left"
          align="baseline"
          key={`profile-review-${index.toString()}`}
          py="sm"
        >
          <Title order={4}>{splitCamelCase(pageName)}</Title>
        </Group>
      );

      const displayPageSection = pageObjectArr.map((pageObject, index) => {
        const { inputName, inputValue = "" } = pageObject;

        const displayInputName = (
          <Text key={`profile-review-${index.toString()}-input-name`}>
            {inputName}
          </Text>
        );
        const displayValue = inputName === "Email"
          ? (
            inputValue
              .toString()
              .split("@")
              .map((str, index) => {
                const displayStr = index === 0 ? str : `@${str}`;
                return (
                  <Text
                    key={`profile-review-${index.toString()}-input-value`}
                    style={{ display: "inline-block" }}
                  >
                    {displayStr}
                  </Text>
                );
              })
          )
          : (
            <Text
              key={`profile-review-${index.toString()}-input-value`}
            >
              {inputValue}
            </Text>
          );

        const rowBackgroundColorLight = index % 2 === 0
          ? "#f9f9f9"
          : "transparent";
        const rowBackgroundColorDark = "transparent";
        const rowBackgroundColor = themeObject.colorScheme === "dark"
          ? rowBackgroundColorDark
          : rowBackgroundColorLight;

        const displayPageSection = (
          <Grid
            columns={10}
            key={`profile-review-${index.toString()}`}
            style={{ borderBottom: borderColor }}
            w="100%"
          >
            <Grid.Col span={4} style={{ background: rowBackgroundColor }}>
              {displayInputName}
            </Grid.Col>
            <Grid.Col span={6} style={{ background: rowBackgroundColor }}>
              {displayValue}
            </Grid.Col>
          </Grid>
        );

        return displayPageSection;
      });

      const profileReviewStack = (
        <Stack key={`profile-review-${index.toString()}`} w="100%">
          {displayPageName}
          {displayPageSection}
        </Stack>
      );

      return profileReviewStack;
    },
  );

  const displayUserInfoComponent = (
    <Stack w="100%" style={{ position: "relative" }}>
      {profilePic}
      {displayProfileStack}
    </Stack>
  );

  return displayUserInfoComponent;
}

export { UserInfo };
