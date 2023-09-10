import { useReducer, useState } from 'react';
import { CarouselBuilderProps } from './types';

import { Center, Flex, Group, Title } from '@mantine/core';
import { AccessibleButtonCreatorInfo } from '../wrappers';
import { TbArrowLeft, TbArrowRight } from 'react-icons/tb';
import { returnAccessibleButtonElements } from '../../jsxCreators';
import { useGlobalState } from '../../hooks';
import { COLORS_SWATCHES } from '../../constants/data';

function CarouselBuilder({
  nodeDimensions: { width: slideWidth, height: slideHeight },
  slides,
  headings = [],
}: CarouselBuilderProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const {
    globalState: {
      padding,
      themeObject: { colorScheme },
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

  const { dark } = COLORS_SWATCHES;
  const backgroundColor =
    colorScheme === 'light'
      ? 'radial-gradient(circle, #f9f9f9 50%, #f5f5f5 100%)'
      : // '#f5f5f5'
        dark[6];

  const displayCarouselWithSlides = (
    <Flex
      direction="column"
      align="center"
      justify="space-evenly"
      w={carouselWrapperWidth}
      h={carouselWrapperHeight}
      bg={backgroundColor}
    >
      <Group
        w="100%"
        position={slides.length === 1 ? 'center' : 'apart'}
        px={padding}
      >
        {slides.length === 1 ? null : createdLeftControlIconButton}
        {<Title order={4}>{headings[currentSlide]}</Title>}
        {slides.length === 1 ? null : createdRightControlIconButton}
      </Group>
      <Center w="100%">{slides[currentSlide]}</Center>
    </Flex>
  );

  return displayCarouselWithSlides;
}

export default CarouselBuilder;
