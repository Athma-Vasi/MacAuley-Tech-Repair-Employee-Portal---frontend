import { Center, Flex, Group, Title } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  TbArrowLeft,
  TbArrowRight,
  TbPhoto,
  TbPhotoPause,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
} from 'react-icons/tb';

import { COLORS_SWATCHES } from '../../constants/data';
import { useGlobalState } from '../../hooks';
import { returnAccessibleButtonElements } from '../../jsxCreators';
import { returnThemeColors } from '../../utils';
import { AccessibleButtonCreatorInfo } from '../wrappers';
import { CarouselBuilderProps } from './types';

function CarouselBuilder({
  autoPlaySpeed = 5000,
  slideDimensions: { width: slideWidth, height: slideHeight },
  slides,
  headings = [],
}: CarouselBuilderProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoplaying, setIsAutoplaying] = useState<boolean>(
    headings.length > 1
  );

  const {
    globalState: { padding, themeObject, isPrefersReducedMotion },
  } = useGlobalState();

  // autoplay set interval
  useEffect(() => {
    if (isAutoplaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, autoPlaySpeed);
      return () => clearInterval(interval);
    }
  }, [isAutoplaying, autoPlaySpeed]);

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

  const autoPlayPauseIconButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: isAutoplaying ? (
      <TbPlayerPauseFilled />
    ) : (
      <TbPlayerPlayFilled />
    ),
    semanticDescription: 'Pause autoplay',
    semanticName: 'pause autoplay',
    buttonOnClick: () => {
      setIsAutoplaying((prev) => !prev);
    },
  };

  const [
    createdLeftControlIconButton,
    createdRightControlIconButton,
    createdAutoPlayPauseIconButton,
  ] = returnAccessibleButtonElements([
    leftControlIconButtonCreatorInfo,
    rightControlIconButtonCreatorInfo,
    autoPlayPauseIconButtonCreatorInfo,
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
    <AnimatePresence initial={true} custom={currentSlide} mode="wait">
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

  const displayLeftControlIconButton =
    headings.length > 1 ? createdLeftControlIconButton : null;
  const displayAutoPlayPauseIconButton =
    headings.length > 1 ? createdAutoPlayPauseIconButton : null;
  const displayRightControlIconButton =
    headings.length > 1 ? createdRightControlIconButton : null;

  const displayCarouselWithSlides = (
    <Flex
      direction="column"
      align="center"
      justify={headings.length > 1 ? 'space-evenly' : 'center'}
      w={carouselWrapperWidth}
      h={carouselWrapperHeight}
      bg={backgroundColor}
      style={{ zIndex: 2 }}
    >
      <Group w="100%" position="apart" px={padding}>
        {displayLeftControlIconButton}
        {displayAutoPlayPauseIconButton}
        {displayRightControlIconButton}
      </Group>
      {displaySlide}
    </Flex>
  );

  return displayCarouselWithSlides;
}

export default CarouselBuilder;
