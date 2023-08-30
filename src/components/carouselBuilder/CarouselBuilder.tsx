import { Carousel } from '@mantine/carousel';
import { Group, MantineNumberSize } from '@mantine/core';

import { useGlobalState } from '../../hooks';
import { ReactNode, useState } from 'react';
import { TbArrowLeft, TbArrowRight } from 'react-icons/tb';

type CarouselBuilderProps = {
  slides: React.JSX.Element[];
  carouselProps: {
    height?: string;
    align?: 'start' | 'center' | 'end';
    slideGap?: MantineNumberSize;
    controlsOffset?: MantineNumberSize;
    controlSize?: number;
    loop?: boolean;
    withIndicators?: boolean;
    dragFree?: boolean;
    draggable?: boolean;
    orientation?: 'horizontal' | 'vertical';
    nextControlIcon?: ReactNode;
    previousControlIcon?: ReactNode;
  };
};

function CarouselBuilder({ slides, carouselProps }: CarouselBuilderProps) {
  const {
    globalState: { padding, rowGap },
  } = useGlobalState();
  const [showControlIcon, setShowControlIcon] = useState<boolean>(false);

  const {
    height = '100%',
    align = 'end',
    slideGap = rowGap,
    controlsOffset = padding,
    controlSize = 28,
    loop = true,
    withIndicators = true,
    dragFree = false,
    draggable = true,
    orientation = 'horizontal',
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
  } = carouselProps;

  return (
    <div style={{ height: 200, display: 'flex' }}>
      <Carousel
        height={height}
        sx={{ flex: 1 }}
        align={align}
        slideGap={slideGap}
        controlsOffset={controlsOffset}
        controlSize={controlSize}
        dragFree={dragFree}
        loop={loop}
        withIndicators={withIndicators}
        draggable={draggable}
        orientation={orientation}
        nextControlIcon={nextControlIcon}
        previousControlIcon={previousControlIcon}
        onMouseEnter={() =>
          //   slides.length > 1 ? setShowControlIcon(true) : false
          setShowControlIcon(true)
        }
        onMouseLeave={() =>
          //   slides.length > 1 ? setShowControlIcon(false) : false
          setShowControlIcon(false)
        }
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
      >
        {slides.map((slide, index) => (
          <Carousel.Slide key={`${index}`}>{slide}</Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselBuilder;
