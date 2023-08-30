import { Carousel } from '@mantine/carousel';
import { Group, MantineNumberSize } from '@mantine/core';
import { ReactNode, useState } from 'react';
import { TbArrowLeft, TbArrowRight } from 'react-icons/tb';

import { useGlobalState } from '../../hooks';

type CarouselBuilderProps = {
  slides: React.JSX.Element[];
  carouselProps: {
    align?: 'start' | 'center' | 'end';
    controlsOffset?: MantineNumberSize;
    controlSize?: number;
    draggable?: boolean;
    dragFree?: boolean;
    height?: string;
    inViewThreshold?: number;
    loop?: boolean;
    nextControlIcon?: ReactNode;
    orientation?: 'horizontal' | 'vertical';
    previousControlIcon?: ReactNode;
    slideGap?: MantineNumberSize;
    slideSize?: string | number;
    width?: string;
    withIndicators?: boolean;
  };
};

function CarouselBuilder({ slides, carouselProps }: CarouselBuilderProps) {
  const {
    globalState: { padding, rowGap },
  } = useGlobalState();
  const [showControlIcon, setShowControlIcon] = useState<boolean>(false);

  const {
    align = 'center',
    controlSize = 28,
    controlsOffset = padding,
    dragFree = true,
    draggable = true,
    height = '100%',
    inViewThreshold = 1,
    loop = true,
    slideGap = 0,
    slideSize = '100%',
    nextControlIcon = (
      <Group
        style={{ borderRadius: 9999, background: 'violet' }}
        h={26}
        w={26}
        position="center"
      >
        <TbArrowRight color="white" />
      </Group>
    ),
    orientation = 'horizontal',
    previousControlIcon = (
      <Group
        style={{ borderRadius: 9999, background: 'violet' }}
        h={26}
        w={26}
        position="center"
      >
        <TbArrowLeft color="white" />
      </Group>
    ),
    width = '100%',
    withIndicators = true,
  } = carouselProps;

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        outline: '1px solid blue',
      }}
    >
      <Carousel
        align={align}
        controlSize={controlSize}
        controlsOffset={controlsOffset}
        dragFree={dragFree}
        draggable={draggable}
        height={height}
        inViewThreshold={inViewThreshold}
        loop={loop}
        slideGap={slideGap}
        slideSize={slideSize}
        nextControlIcon={nextControlIcon}
        onMouseEnter={() =>
          //   slides.length > 1 ? setShowControlIcon(true) : false
          setShowControlIcon(true)
        }
        onMouseLeave={() =>
          //   slides.length > 1 ? setShowControlIcon(false) : false
          setShowControlIcon(false)
        }
        orientation={orientation}
        previousControlIcon={previousControlIcon}
        // hide inactive controls
        styles={
          showControlIcon
            ? {}
            : {
                control: {
                  '&[data-inactive]': {
                    opacity: 0,
                    cursor: 'default',
                  },
                },
              }
        }
        sx={{ flex: 1 }}
        w={width}
        withControls={slides.length > 1 && showControlIcon}
        withIndicators={withIndicators}
      >
        {slides.map((slide, index) => (
          <Carousel.Slide key={`${index}`}>{slide}</Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselBuilder;
