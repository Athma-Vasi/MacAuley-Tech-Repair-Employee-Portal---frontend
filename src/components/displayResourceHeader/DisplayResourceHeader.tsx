import { ReactNode } from 'react';
import { COLORS_SWATCHES } from '../../constants/data';
import { useGlobalState } from '../../hooks';
import { returnThemeColors } from '../../utils';
import { Stack, Card, Title, Text, Image, Flex, Group } from '@mantine/core';

type DisplayResourceHeaderProps = {
  imageSrc: string;
  imageAlt: string;
  resourceTitle: string;
  resourceDescription: string;
  //   resourceTopics: [ReactNode, string][];
};

function DisplayResourceHeader({
  imageAlt,
  imageSrc,
  resourceTitle,
  resourceDescription,
}: //   resourceTopics,
DisplayResourceHeaderProps) {
  const {
    globalState: { width, padding, themeObject, rowGap },
  } = useGlobalState();

  const {
    generalColors: { darkSchemeGray },
    appThemeColors: { backgroundColor, borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const imageWidth =
    width < 480 // for iPhone 5/SE
      ? 375 - 20
      : width < 768 // for iPhone 6/7/8
      ? width * 0.8
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225) * 0.85
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 300) * 0.85
      : 900 - 40;
  const imageHeight = imageWidth * 0.75;

  const bannerImage = (
    <Stack w={imageWidth} h={imageHeight} style={{ outline: '1px solid teal' }}>
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
            top:
              width < 480
                ? '50%'
                : width < 768
                ? '75%'
                : width < 1024
                ? '75%'
                : '80%',
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
    <Group w="100%" position="center" bg={backgroundColor}>
      {bannerImage}
      {/* {displayResourceKinds} */}
    </Group>
  );
}

export default DisplayResourceHeader;
export type { DisplayResourceHeaderProps };
