import { Center, Flex, Group, Title } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  TbArrowLeft,
  TbArrowRight,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
} from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnAccessibleButtonElements } from "../../jsxCreators";
import { returnThemeColors } from "../../utils";
import { AccessibleButtonCreatorInfo } from "../wrappers";
import { CarouselBuilderProps } from "./types";

function CarouselBuilder({
  autoPlaySpeed = 5000,
  headings,
  slideDimensions: { width: slideWidth, height: slideHeight },
  slides,
  withBorder = false,
}: CarouselBuilderProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoplaying, setIsAutoplaying] = useState<boolean>(false);
  // const [resetAutoplay, setResetAutoplay] = useState<boolean>(false);

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
  }, [isAutoplaying, autoPlaySpeed, currentSlide]);

  const carouselWrapperWidth = slideWidth - 22;
  const carouselWrapperHeight = slideHeight - 22;

  const leftControlIconButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonDisabled: slides.length === 1,
    buttonLabel: "Previous",
    leftIcon: <TbArrowLeft />,
    semanticDescription: "Go to previous slide",
    semanticName: "previous slide",
    buttonOnClick: () => {
      setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    },
  };

  const rightControlIconButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonDisabled: slides.length === 1,
    buttonLabel: "Next",
    rightIcon: <TbArrowRight />,
    semanticDescription: "Go to next slide",
    semanticName: "next slide",
    buttonOnClick: () => {
      setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    },
  };

  const autoPlayPauseIconButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonDisabled: slides.length === 1,
    buttonLabel: isAutoplaying ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />,
    semanticDescription: "Pause autoplay",
    semanticName: "pause autoplay",
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
    appThemeColors: { backgroundColor, borderColor },
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

  const displaySlide = slides.length ? (
    isPrefersReducedMotion ? (
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
    )
  ) : null;

  const displayCarouselWithSlides = (
    <Flex
      align="center"
      bg={backgroundColor}
      direction="column"
      h={carouselWrapperHeight}
      justify={slides.length > 1 ? "space-evenly" : "center"}
      style={{ zIndex: 2, border: withBorder ? borderColor : "none" }}
      w={carouselWrapperWidth}
    >
      <Group w="100%" position="apart" px={padding}>
        <Title order={4}>{headings?.[currentSlide]}</Title>
        <Group spacing={padding} pb="xs">
          {createdLeftControlIconButton}
          {createdAutoPlayPauseIconButton}
          {createdRightControlIconButton}
        </Group>
      </Group>
      {displaySlide}
    </Flex>
  );

  return displayCarouselWithSlides;
}

export default CarouselBuilder;
