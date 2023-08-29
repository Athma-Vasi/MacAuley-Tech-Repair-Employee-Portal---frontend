import { Carousel } from '@mantine/carousel';
import { MantineNumberSize } from '@mantine/core';

import { useGlobalState } from '../../hooks';

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
  };
};

function CarouselBuilder({ slides, carouselProps }: CarouselBuilderProps) {
  const {
    globalState: { padding, rowGap },
  } = useGlobalState();

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
  } = carouselProps;

  return (
    <div style={{ height: 300, display: 'flex' }}>
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
      >
        {slides.map((slide, index) => (
          <Carousel.Slide key={`${index}`}>{slide}</Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselBuilder;
