type ColorScheme = 'light' | 'dark';

type GlobalState = {
  width: number;
  height: number;
  colorScheme: ColorScheme;
};

type GlobalAction = {
  setWidth: 'setWidth';
  setHeight: 'setHeight';
  setColorScheme: 'setColorScheme';
  setWindowSize: 'setWindowSize';
};

type WindowDimensions = {
  width: number;
  height: number;
};

type GlobalPayload = ColorScheme | number | WindowDimensions;

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
};
