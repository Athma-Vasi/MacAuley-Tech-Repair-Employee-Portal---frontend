import { BreakPoints } from '../../types';

type ColorScheme = 'light' | 'dark';

type GlobalState = {
  colorScheme: ColorScheme;
  windowSize: BreakPoints;
};

type GlobalAction = {
  setColorScheme: 'setColorScheme';
  setWindowSize: 'setWindowSize';
};

type GlobalPayload = ColorScheme | BreakPoints;

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
};
