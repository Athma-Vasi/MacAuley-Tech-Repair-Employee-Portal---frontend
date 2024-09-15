import { Grid, Group, Stack, Text } from "@mantine/core";

import { COLORS_SWATCHES } from "../../../constants/data";
import { useGlobalState } from "../../../hooks";
import type { UserDocument } from "../../../types";
import { returnThemeColors, splitCamelCase } from "../../../utils";
import AccessibleImage from "../../accessibleInputs/AccessibleImage";
import type { CustomerDocument } from "../../customer/types";
import { returnProfileInfoObject } from "../../portalHeader/userInfo/utils";

type ProfileInfoProps = {
  userDocument:
    | UserDocument
    | Omit<CustomerDocument, "password" | "paymentInformation">
    | null;
};

function ProfileInfo({ userDocument }: ProfileInfoProps) {
  const {
    globalState: { themeObject, width },
  } = useGlobalState();

  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const profilePicElement = (
    <AccessibleImage
      attributes={{
        alt: `Picture of ${userDocument?.username}`,
        fit: "cover",
        height: width < 640 ? 92 : width < 1024 ? 128 : 256,
        name: "profile picture",
        radius: 9999,
        src: userDocument?.profilePictureUrl ?? "",
        width: width < 640 ? 92 : width < 1024 ? 128 : 256,
      }}
    />
  );

  const displayProfilePic = (
    <Group w="100%" position="center" align="center">
      {profilePicElement}
    </Group>
  );

  const profileInfoObject = returnProfileInfoObject(userDocument);

  const displayProfileStack = Object.entries(profileInfoObject).map(
    (keyValTuple, index) => {
      const [pageName, pageObjectArr] = keyValTuple as [
        string, // page name
        Array<{
          inputName: string;
          inputValue?: string | boolean;
        }>,
      ];

      const displayPageName = pageObjectArr.length > 0
        ? (
          <Group
            w="100%"
            position="center"
            align="baseline"
            key={`profile-review-${index.toString()}`}
          >
            <Text size="lg" weight={500} style={{ marginTop: 16 }}>
              {splitCamelCase(pageName)}
            </Text>
          </Group>
        )
        : null;

      const displayPageSection = pageObjectArr.map((pageObject, index) => {
        const { inputName, inputValue = "" } = pageObject;

        const displayInputName = (
          <Text
            key={`profile-review-${index.toString()}`}
          >
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
                    key={`email-${index.toString()}`}
                    style={{ display: "inline-block" }}
                  >
                    {displayStr}
                  </Text>
                );
              })
          )
          : (
            <Text
              key={`profile-review-${index.toString()}`}
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

  const displayProfileInfoComponent = (
    <Stack w="100%" style={{ position: "relative" }}>
      {displayProfilePic}
      {displayProfileStack}
    </Stack>
  );

  return displayProfileInfoComponent;
}

export { ProfileInfo };
