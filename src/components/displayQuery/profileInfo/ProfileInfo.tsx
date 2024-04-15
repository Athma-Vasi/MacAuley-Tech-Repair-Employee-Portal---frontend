import { Grid, Group, Stack, Text, Title } from "@mantine/core";

import { COLORS_SWATCHES } from "../../../constants/data";
import { useGlobalState } from "../../../hooks";
import { returnAccessibleImageElements } from "../../../jsxCreators";
import { UserDocument } from "../../../types";
import { returnThemeColors, splitCamelCase } from "../../../utils";
import { returnProfileInfoObject } from "../../portalHeader/userInfo/utils";
import { CustomerDocument } from "../../customer/types";

type ProfileInfoProps = {
  userDocument:
    | UserDocument
    | Omit<CustomerDocument, "password" | "paymentInformation">
    | null;
};

function ProfileInfo({ userDocument }: ProfileInfoProps) {
  const {
    globalState: { themeObject, width, padding, rowGap },
  } = useGlobalState();

  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const [profilePicElement] = returnAccessibleImageElements([
    {
      customWidth: width < 640 ? 92 : width < 1024 ? 128 : 256,
      customHeight: width < 640 ? 92 : width < 1024 ? 128 : 256,
      customRadius: 9999,
      fit: "cover",
      imageSrc: userDocument?.profilePictureUrl,
      imageAlt: `Picture of ${userDocument?.username}`,
      isCard: false,
      isOverlay: false,
      isLoader: true,
      withPlaceholder: true,
    },
  ]);

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
        }>
      ];

      const displayPageName =
        pageObjectArr.length > 0 ? (
          <Group
            w="100%"
            position="center"
            align="baseline"
            spacing={rowGap}
            py={padding}
          >
            <Text size="lg" weight={500} style={{ marginTop: 16 }}>
              {splitCamelCase(pageName)}
            </Text>
          </Group>
        ) : null;

      const displayPageSection = pageObjectArr.map((pageObject, index) => {
        const { inputName, inputValue = "" } = pageObject;

        const displayInputName = <Text>{inputName}</Text>;
        const displayValue =
          inputName === "Email" ? (
            inputValue
              .toString()
              .split("@")
              .map((str, index) => {
                const displayStr = index === 0 ? str : `@${str}`;
                return (
                  <Text key={`email-${index}`} style={{ display: "inline-block" }}>
                    {displayStr}
                  </Text>
                );
              })
          ) : (
            <Text>{inputValue}</Text>
          );

        const rowBackgroundColorLight = index % 2 === 0 ? "#f9f9f9" : "transparent";
        const rowBackgroundColorDark = "transparent";
        const rowBackgroundColor =
          themeObject.colorScheme === "dark"
            ? rowBackgroundColorDark
            : rowBackgroundColorLight;

        const displayPageSection = (
          <Grid
            columns={10}
            key={`profile-review-${index}`}
            style={{ borderBottom: borderColor }}
            gutter={rowGap}
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
        <Stack key={`profile-review-${index}`} w="100%" pb={padding}>
          {displayPageName}
          {displayPageSection}
        </Stack>
      );

      return profileReviewStack;
    }
  );

  const displayProfileInfoComponent = (
    <Stack w="100%" p={padding} style={{ position: "relative" }}>
      {displayProfilePic}
      {displayProfileStack}
    </Stack>
  );

  return displayProfileInfoComponent;
}

export { ProfileInfo };
