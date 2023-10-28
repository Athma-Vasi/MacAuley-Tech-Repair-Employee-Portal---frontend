import { type } from 'os';
import { ReactNode } from 'react';

type CarouselBuilderProps = {
  autoPlaySpeed?: number; // in milliseconds
  headings?: string[];
  slides: React.JSX.Element[];
  slideDimensions: { width: number; height: number };
  withBorder?: boolean;
  // headings?: string[];
  // autoPlay?: boolean;
  // showArrows?:boolean;
  // showDots?:boolean;
  // showStatus?:boolean;
  // showIndicators?:boolean;
  // infiniteLoop?:boolean;
  // showThumbs?:boolean;
  // thumbWidth?:number;
  // selectedItem?:number;
  // onChange?:Function;
  // onClickItem?:Function;
  // onClickThumb?:Function;
  // useKeyboardArrows?:boolean;
  // stopOnHover?:boolean;
  // swipeable?:boolean;
  // dynamicHeight?:boolean;
  // emulateTouch?:boolean;
  // centerMode?:boolean;
  // centerSlidePercentage?:number;
  // swipeScrollTolerance?:number;
  // verticalSwipe?:string;
  // width?:string;
  // transitionTime?:number;
};

export type { CarouselBuilderProps };
