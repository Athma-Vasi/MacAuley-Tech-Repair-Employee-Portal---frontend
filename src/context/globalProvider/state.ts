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
  rowGap: 'xs',
  padding: 'xs',
  colorScheme: 'light',
  scrollXDirection: '',
  scrollYDirection: '',
  userDocument: null,
};

const globalAction: GlobalAction = {
  setWidth: 'setWidth',
  setHeight: 'setHeight',
  setRowGap: 'setRowGap',
  setPadding: 'setPadding',
  setColorScheme: 'setColorScheme',
  setWindowSize: 'setWindowSize',
  setScrollAxesDirection: 'setScrollAxesDirection',
  setUserDocument: 'setUserDocument',
};

function globalReducer(
  state: GlobalState,
  action: GlobalDispatch
): GlobalState {
  switch (action.type) {
    case globalAction.setWidth:
      return { ...state, width: action.payload };
    case globalAction.setHeight:
      return { ...state, height: action.payload };
    case globalAction.setRowGap:
      return { ...state, rowGap: action.payload };
    case globalAction.setPadding:
      return { ...state, padding: action.payload };
    case globalAction.setColorScheme:
      return { ...state, colorScheme: action.payload };
    case globalAction.setWindowSize: {
      const { width, height } = action.payload;
      return { ...state, width, height };
    }
    case globalAction.setScrollAxesDirection: {
      const { scrollXDirection, scrollYDirection } = action.payload;
      return { ...state, scrollXDirection, scrollYDirection };
    }
    case globalAction.setUserDocument:
      return { ...state, userDocument: action.payload };

    default:
      return state;
  }
}

export { globalAction, globalReducer, initialGlobalState };
