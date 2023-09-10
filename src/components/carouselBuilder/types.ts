import { type } from 'os';
import { ReactNode } from 'react';

type CarouselBuilderProps = {
  slides: React.JSX.Element[];
  nodeDimensions: { width: number; height: number };
  headings?: string[];
  // autoPlay?:boolean;
  // autoPlaySpeed?:number;
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
