import { Card, Flex, Group, Stack, Text, Title } from '@mantine/core';

import { COLORS_SWATCHES } from '../../constants/data';
import { useGlobalState } from '../../hooks';
import { returnAccessibleImageElements } from '../../jsxCreators';
import { returnThemeColors } from '../../utils';

type DisplayResourceHeaderProps = {
  imageSrc: string;
  imageAlt: string;
  resourceTitle: string;
  resourceDescription: string;
  componentWidth?: number;
};

function DisplayResourceHeader({
  imageAlt,
  imageSrc,
  resourceTitle,
  resourceDescription,
  componentWidth,
}: DisplayResourceHeaderProps) {
  const {
    globalState: { width, padding, themeObject, rowGap },
  } = useGlobalState();

  const {
    appThemeColors: { backgroundColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const imageWidth = componentWidth
    ? componentWidth
    : width < 480 // for iPhone 5/SE
    ? width * 0.95
    : width < 768 // for iPhones 6 - 15
    ? width - 40
    : // at 768vw the navbar appears at width of 225px
    width < 1024
    ? (width - 225) * 0.8
    : // at >= 1200vw the navbar width is 300px
    width < 1200
    ? (width - 225) * 0.8
    : 900 - 40;

  const imageHeight = imageWidth * 0.68;

  const [createdImage] = returnAccessibleImageElements([
    {
      imageSrc,
      imageAlt,
      isCard: false,
      isLoader: true,
      isOverlay: false,
      withPlaceholder: true,
    },
  ]);

  const bannerImage = (
    <Stack w={imageWidth} h={imageHeight}>
      <Card withBorder radius="md">
        <Card.Section>{createdImage}</Card.Section>
        <Card.Section>
          <Flex
            direction="column"
            w={imageWidth}
            align="flex-start"
            gap={rowGap}
            h="75%"
            style={{
              position: 'absolute',

              top: width < 480 ? '62%' : width < 1024 ? '68%' : '73%',
              left: '0%',
              zIndex: 1,
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}
          >
            <Title
              color="#f5f5f5"
              px={padding}
              pt={padding}
              order={width >= 1200 ? 1 : 2}
            >
              {resourceTitle}
            </Title>
            <Text
              color="#f5f5f5"
              px={padding}
              size={width >= 1200 ? 'xl' : width >= 991 ? 'lg' : 'md'}
            >
              {resourceDescription}
            </Text>
          </Flex>
        </Card.Section>
      </Card>
    </Stack>
  );

  return (
    <Group w="100%" position="center" py={padding} bg={backgroundColor}>
      {bannerImage}
    </Group>
  );
}

export default DisplayResourceHeader;
export type { DisplayResourceHeaderProps };
