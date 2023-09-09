import { useReducer, useState } from 'react';
import { CarouselBuilderProps } from './types';

import { Center, Flex, Group } from '@mantine/core';
import { AccessibleButtonCreatorInfo } from '../wrappers';
import { TbArrowLeft, TbArrowRight } from 'react-icons/tb';
import { returnAccessibleButtonElements } from '../../jsxCreators';
import { useGlobalState } from '../../hooks';
import { COLORS_SWATCHES } from '../../constants/data';

function CarouselBuilder({
  nodeDimensions: { width: slideWidth, height: slideHeight },
  slides,
}: CarouselBuilderProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const {
    globalState: {
      padding,
      rowGap,
      themeObject: { colorScheme, primaryColor, primaryShade },
    },
  } = useGlobalState();

  const carouselWrapperWidth = slideWidth - 22;
  const carouselWrapperHeight = slideHeight - 22;

  const leftControlIconButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Previous',
    leftIcon: <TbArrowLeft />,
    semanticDescription: 'Go to previous slide',
    semanticName: 'previous slide',
    buttonOnClick: () => {
      setCurrentSlide(
        currentSlide === 0 ? slides.length - 1 : currentSlide - 1
      );
    },
  };

  const rightControlIconButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Next',
    rightIcon: <TbArrowRight />,
    semanticDescription: 'Go to next slide',
    semanticName: 'next slide',
    buttonOnClick: () => {
      setCurrentSlide(
        currentSlide === slides.length - 1 ? 0 : currentSlide + 1
      );
    },
  };

  const [createdLeftControlIconButton, createdRightControlIconButton] =
    returnAccessibleButtonElements([
      leftControlIconButtonCreatorInfo,
      rightControlIconButtonCreatorInfo,
    ]);

  const { gray, dark } = COLORS_SWATCHES;
  const backgroundColor =
    colorScheme === 'light'
      ? 'radial-gradient(circle, #f9f9f9 50%, #f5f5f5 100%)'
      : // '#f5f5f5'
        dark[6];
  const borderColor =
    colorScheme === 'light' ? `1px solid ${gray[3]}` : `1px solid ${gray[8]}`;

  const displayCarouselWithSlides = (
    <Flex
      direction="column"
      align="center"
      justify="space-evenly"
      w={carouselWrapperWidth}
      h={carouselWrapperHeight}
      //   px={padding}
      style={{ outline: '1px solid teal' }}
      bg={backgroundColor}
    >
      <Group w="100%" position="apart" px={padding}>
        {createdLeftControlIconButton}
        {createdRightControlIconButton}
      </Group>
      <Center w="100%">{slides[currentSlide]}</Center>
    </Flex>
  );

  const displayCarouselWithoutSlides = (
    <Flex
      direction="column"
      align="center"
      justify="space-evenly"
      w={carouselWrapperWidth}
      h={carouselWrapperHeight}
      //   px={padding}
      style={{ outline: '1px solid teal' }}
      bg={backgroundColor}
    >
      <Center w="100%">{slides[0]}</Center>
    </Flex>
  );

  return slides.length === 1
    ? displayCarouselWithoutSlides
    : displayCarouselWithSlides;
}

export default CarouselBuilder;
