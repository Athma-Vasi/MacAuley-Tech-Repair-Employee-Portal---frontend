type ColorScheme = 'light' | 'dark';

type GlobalState = {
  width: number;
  height: number;
  colorScheme: ColorScheme;
  scrollXDirection: ScrollXDirection;
  scrollYDirection: ScrollYDirection;
};

type GlobalAction = {
  setWidth: 'setWidth';
  setHeight: 'setHeight';
  setColorScheme: 'setColorScheme';
  setWindowSize: 'setWindowSize';
  setScrollAxesDirection: 'setScrollAxesDirection';
};

type WindowDimensions = {
  width: number;
  height: number;
};

type ScrollAxesDirection = {
  scrollXDirection: 'left' | 'right' | '';
  scrollYDirection: 'up' | 'down' | '';
};

type GlobalPayload =
  | ColorScheme
  | number
  | WindowDimensions
  | ScrollAxesDirection;

type GlobalDispatch = {
  type: GlobalAction[keyof GlobalAction];
  payload: GlobalPayload;
};

type GlobalReducer = (
  state: GlobalState,
  action: GlobalDispatch
) => GlobalState;

type GlobalProviderProps = {
  children?: ReactNode;
};

export type {
  GlobalState,
  GlobalAction,
  GlobalPayload,
  GlobalDispatch,
  GlobalReducer,
  GlobalProviderProps,
  ColorScheme,
  WindowDimensions,
  ScrollAxesDirection,
};
