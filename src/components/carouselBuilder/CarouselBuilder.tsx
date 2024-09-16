import { Center, Flex, Group, Title } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnThemeColors } from "../../utils";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import type { CarouselBuilderProps } from "./types";

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
    globalState: { themeObject, isPrefersReducedMotion },
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

  const leftControlIconButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Go to previous slide",
        kind: "previous",
        name: "previous",
        onClick: () => {
          setCurrentSlide(
            currentSlide === 0 ? slides.length - 1 : currentSlide - 1,
          );
        },
      }}
    />
  );

  const rightControlIconButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Go to next slide",
        kind: "next",
        name: "next",
        onClick: () => {
          setCurrentSlide(
            currentSlide === slides.length - 1 ? 0 : currentSlide + 1,
          );
        },
      }}
    />
  );

  const autoPlayPauseIconButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Pause autoplay",
        kind: "pause",
        name: "pause",
        onClick: () => {
          setIsAutoplaying((prev) => !prev);
        },
      }}
    />
  );

  const autoPlayPlayIconButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Play autoplay",
        kind: "play",
        name: "play",
        onClick: () => {
          setIsAutoplaying((prev) => !prev);
        },
      }}
    />
  );

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

  const displaySlide = slides.length
    ? (
      isPrefersReducedMotion
        ? (
          <Center w="100%" h="100%">
            {slides[currentSlide]}
          </Center>
        )
        : (
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
    )
    : null;

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
      <Group w="100%" position="apart">
        <Title order={4}>{headings?.[currentSlide]}</Title>
        <Group spacing="sm" pb="xs">
          {leftControlIconButton}
          {isAutoplaying ? autoPlayPauseIconButton : autoPlayPlayIconButton}
          {rightControlIconButton}
        </Group>
      </Group>
      {displaySlide}
    </Flex>
  );

  return displayCarouselWithSlides;
}

export default CarouselBuilder;
