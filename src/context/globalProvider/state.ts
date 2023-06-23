import {
  ColorScheme,
  GlobalAction,
  GlobalDispatch,
  GlobalState,
  ScrollAxesDirection,
  WindowDimensions,
} from './types';

const initialGlobalState: GlobalState = {
  width: 0,
  height: 0,
  colorScheme: 'light',
  scrollXDirection: '',
  scrollYDirection: '',
};

const globalAction: GlobalAction = {
  setWidth: 'setWidth',
  setHeight: 'setHeight',
  setColorScheme: 'setColorScheme',
  setWindowSize: 'setWindowSize',
  setScrollAxesDirection: 'setScrollAxesDirection',
};

function globalReducer(
  state: GlobalState,
  action: GlobalDispatch
): GlobalState {
  switch (action.type) {
    case globalAction.setWidth:
      return { ...state, width: action.payload as number };
    case globalAction.setHeight:
      return { ...state, height: action.payload as number };
    case globalAction.setColorScheme:
      return { ...state, colorScheme: action.payload as ColorScheme };
    case globalAction.setWindowSize: {
      const { width, height } = action.payload as WindowDimensions;
      return { ...state, width, height };
    }
    case globalAction.setScrollAxesDirection: {
      const { scrollXDirection, scrollYDirection } =
        action.payload as ScrollAxesDirection;
      return { ...state, scrollXDirection, scrollYDirection };
    }

    default:
      return state;
  }
}

export { initialGlobalState, globalAction, globalReducer };
