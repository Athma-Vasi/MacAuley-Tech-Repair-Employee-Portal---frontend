import {
  Grid,
  Group,
  Loader,
  LoadingOverlay,
  Stack,
  Text,
} from '@mantine/core';

import { COLORS_SWATCHES } from '../../../constants/data';
import { useGlobalState } from '../../../hooks';
import { returnAccessibleImageElements } from '../../../jsxCreators';
import { QueryResponseData, UserDocument } from '../../../types';
import { returnThemeColors, splitCamelCase } from '../../../utils';
import { returnProfileInfoObject } from '../../portalHeader/userInfo/utils';

type ProfileInfoProps = {
  isLoading: boolean;
  employeeDocument: QueryResponseData<UserDocument> | null;
};

function ProfileInfo({ employeeDocument, isLoading }: ProfileInfoProps) {
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
      customWidth: width < 640 ? 96 : width < 1024 ? 128 : 256,
      //   customHeight: width < 640 ? 96 : width < 1024 ? 128 : 256,
      customRadius: 4,
      fit: 'cover',
      imageSrc: employeeDocument?.profilePictureUrl,
      imageAlt: `Picture of ${employeeDocument?.username}`,
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

  const profileInfoObject = returnProfileInfoObject(employeeDocument);

  const displayProfileStack = Object.entries(profileInfoObject).map(
    (keyValTuple, index) => {
      const [pageName, pageObjectArr] = keyValTuple as [
        string, // page name
        Array<{
          inputName: string;
          inputValue?: string | boolean;
        }>
      ];

      const displayPageName = (
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
      );

      const displayPageSection = pageObjectArr.map((pageObject, index) => {
        const { inputName, inputValue = '' } = pageObject;

        const displayInputName = <Text>{inputName}</Text>;
        const displayValue = <Text>{inputValue}</Text>;

        const displayPageSection = (
          <Grid
            columns={10}
            key={`profile-review-${index}`}
            style={{ borderBottom: borderColor }}
            gutter={rowGap}
            w="100%"
          >
            <Grid.Col span={4}>{displayInputName}</Grid.Col>
            <Grid.Col span={6}>{displayValue}</Grid.Col>
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

  const displayLoadingOverlay = (
    <LoadingOverlay
      visible={isLoading}
      zIndex={500}
      overlayBlur={9}
      // overlayOpacity={1}
      //   bg="transparent"
      radius={4}
      loader={
        <Stack align="center">
          <Text>Fetching employee profile information ...</Text>
          <Loader />
        </Stack>
      }
    />
  );

  const displayProfileInfoComponent = (
    <Stack w="100%" p={padding} style={{ position: 'relative' }}>
      {displayLoadingOverlay}
      {displayProfilePic}
      {displayProfileStack}
    </Stack>
  );

  return displayProfileInfoComponent;
}

export { ProfileInfo };
