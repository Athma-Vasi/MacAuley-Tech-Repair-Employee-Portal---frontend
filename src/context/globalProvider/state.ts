import { BreakPoints } from '../../types';
import {
  ColorScheme,
  GlobalAction,
  GlobalDispatch,
  GlobalState,
} from './types';

const initialGlobalState: GlobalState = {
  colorScheme: 'light',
  windowSize: 'xs',
};

const globalAction: GlobalAction = {
  setColorScheme: 'setColorScheme',
  setWindowSize: 'setWindowSize',
};

function globalReducer(
  state: GlobalState,
  action: GlobalDispatch
): GlobalState {
  switch (action.type) {
    case globalAction.setColorScheme:
      return { ...state, colorScheme: action.payload as ColorScheme };
    case globalAction.setWindowSize:
      return { ...state, windowSize: action.payload as BreakPoints };
    default:
      return state;
  }
}

export { initialGlobalState, globalAction, globalReducer };
