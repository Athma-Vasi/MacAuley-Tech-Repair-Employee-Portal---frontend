import { Center, Flex, Group, Title } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { TbArrowLeft, TbArrowRight } from 'react-icons/tb';

import { COLORS_SWATCHES } from '../../constants/data';
import { useGlobalState } from '../../hooks';
import { returnAccessibleButtonElements } from '../../jsxCreators';
import { returnThemeColors } from '../../utils';
import { AccessibleButtonCreatorInfo } from '../wrappers';
import { CarouselBuilderProps } from './types';

function CarouselBuilder({
  nodeDimensions: { width: slideWidth, height: slideHeight },
  slides,
  headings = [],
}: CarouselBuilderProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const {
    globalState: { padding, themeObject, isPrefersReducedMotion },
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

  const {
    appThemeColors: { backgroundColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  // variants for carousel without slide animation, instead using opacity
  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.38,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const displaySlide = isPrefersReducedMotion ? (
    <Center w="100%" h="100%">
      {slides[currentSlide]}
    </Center>
  ) : (
    <AnimatePresence initial={false} custom={currentSlide} mode="wait">
      <motion.div
        key={currentSlide}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Center w="100%">{slides[currentSlide]}</Center>
      </motion.div>
    </AnimatePresence>
  );

  const displayCarouselWithSlides = (
    <Flex
      direction="column"
      align="center"
      justify="space-evenly"
      w={carouselWrapperWidth}
      h={carouselWrapperHeight}
      bg={backgroundColor}
      style={{ zIndex: 2 }}
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
      {displaySlide}
    </Flex>
  );

  return displayCarouselWithSlides;
}

export default CarouselBuilder;
