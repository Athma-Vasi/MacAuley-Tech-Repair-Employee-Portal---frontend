import { Grid, Group, Stack, Text, Tooltip } from '@mantine/core';
import { TbEdit } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES } from '../../../constants/data';
import { useGlobalState } from '../../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleImageElements,
} from '../../../jsxCreators';
import { returnThemeColors, splitCamelCase } from '../../../utils';
import { returnProfileInfoObject } from './utils';

type UserInfoProps = {
  closeUserInfoModal: () => void;
};

function UserInfo({ closeUserInfoModal }: UserInfoProps) {
  const {
    globalState: { userDocument, themeObject, width, padding, rowGap },
  } = useGlobalState();

  const navigate = useNavigate();

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

  const [createdAddressChangeButton] = returnAccessibleButtonElements([
    {
      buttonLabel: <TbEdit />,
      semanticDescription: 'Click to change address',
      semanticName: 'button to change address',
      buttonOnClick: () => {
        closeUserInfoModal();
        navigate('/home/company/address-change/create');
      },
    },
  ]);

  const displayAddressChangeButton = (
    <Tooltip label="Change Address">
      <Group>{createdAddressChangeButton}</Group>
    </Tooltip>
  );

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
          {pageName === 'address' ? displayAddressChangeButton : null}
        </Group>
      );

      const displayPageSection = pageObjectArr.map((pageObject, index) => {
        const { inputName, inputValue = '' } = pageObject;

        const displayInputName = <Text>{inputName}</Text>;
        const displayValue =
          inputName === 'Email' ? (
            inputValue
              .toString()
              .split('@')
              .map((str, index) => {
                const displayStr = index === 0 ? str : `@${str}`;
                return (
                  <Text
                    key={`email-${index}`}
                    style={{ display: 'inline-block' }}
                  >
                    {displayStr}
                  </Text>
                );
              })
          ) : (
            <Text>{inputValue}</Text>
          );

        const rowBackgroundColorLight =
          index % 2 === 0 ? '#f9f9f9' : 'transparent';
        const rowBackgroundColorDark = 'transparent';
        const rowBackgroundColor =
          themeObject.colorScheme === 'dark'
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

  const displayUserInfoComponent = (
    <Stack w="100%" p={padding} style={{ position: 'relative' }}>
      {displayProfilePic}
      {displayProfileStack}
    </Stack>
  );

  return displayUserInfoComponent;
}

export { UserInfo };
