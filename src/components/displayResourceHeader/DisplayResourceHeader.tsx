import { Card, Group, Image, Stack, Text, Title } from '@mantine/core';

import { COLORS_SWATCHES } from '../../constants/data';
import { useGlobalState } from '../../hooks';
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
}: //   resourceTopics,
DisplayResourceHeaderProps) {
  const {
    globalState: { width, padding, themeObject },
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
    ? 375 - 20
    : width < 768 // for iPhone 6/7/8
    ? width * 0.8
    : // at 768vw the navbar appears at width of 225px
    width < 1024
    ? (width - 225) * 0.8
    : // at >= 1200vw the navbar width is 300px
    width < 1200
    ? (width - 225) * 0.8
    : 900 - 40;
  // width < 768
  //   ? width
  //   : width < 1024
  //   ? width - 225 - 11
  //   : width < 1920
  //   ? width - 300 - 11
  //   : 1920 - 300 - 11;
  const imageHeight = imageWidth * 0.68;

  const bannerImage = (
    <Stack w={imageWidth} h={imageHeight}>
      <Card withBorder radius="md">
        <Card.Section>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fit="fill"
            style={{ position: 'relative' }}
            withPlaceholder
          />
        </Card.Section>
        <Stack
          w={imageWidth}
          align="flex-start"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: width < 480 ? '62%' : width < 1024 ? '68%' : '73%',
            left: '0%',
            zIndex: 1,
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
        >
          <Title
            color="white"
            px={padding}
            pt={padding}
            order={width >= 1200 ? 1 : 2}
          >
            {resourceTitle}
          </Title>
          <Text
            color="white"
            px={padding}
            size={width >= 1200 ? 'xl' : width >= 991 ? 'lg' : 'md'}
          >
            {resourceDescription}
          </Text>
        </Stack>
      </Card>
    </Stack>
  );

  //   const displayResourceKinds = (
  //     <Stack w={imageWidth}>
  //       <Title order={3}>{resourceTitle} topics</Title>
  //       <Flex
  //         wrap="wrap"
  //         align="center"
  //         justify="flex-start"
  //         rowGap={rowGap}
  //         columnGap={rowGap}
  //       >
  //         {resourceTopics.map(([icon, topic]) => {
  //           const resourceTopic = (
  //             <Group>
  //               {icon}
  //               <Text>{topic}</Text>
  //             </Group>
  //           );

  //           return resourceTopic;
  //         })}
  //       </Flex>
  //     </Stack>
  //   );

  return (
    <Group w="100%" position="center" py={padding} bg={backgroundColor}>
      {bannerImage}
    </Group>
  );
}

export default DisplayResourceHeader;
export type { DisplayResourceHeaderProps };
