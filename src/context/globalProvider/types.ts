import { ReactNode } from 'react';

import {
  ScrollXDirection,
  ScrollYDirection,
} from '../../hooks/useScrollDirection';
import { QueryResponseData, UserDocument } from '../../types';

type ColorScheme = 'light' | 'dark';

type GlobalState = {
  width: number;
  height: number;
  rowGap: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  padding: 'xs' | 'sm' | 'md';
  colorScheme: ColorScheme;
  scrollXDirection: ScrollXDirection;
  scrollYDirection: ScrollYDirection;

  userDocument: Omit<UserDocument, '__v' | 'password'> | null;
};

type GlobalAction = {
  setWidth: 'setWidth';
  setHeight: 'setHeight';
  setRowGap: 'setRowGap';
  setPadding: 'setPadding';
  setColorScheme: 'setColorScheme';
  setWindowSize: 'setWindowSize';
  setScrollAxesDirection: 'setScrollAxesDirection';

  setUserDocument: 'setUserDocument';
};

type WindowDimensions = {
  width: number;
  height: number;
};

type ScrollAxesDirection = {
  scrollXDirection: 'left' | 'right' | '';
  scrollYDirection: 'up' | 'down' | '';
};

type GlobalDispatch =
  | {
      type: GlobalAction['setWindowSize'];
      payload: WindowDimensions;
    }
  | {
      type: GlobalAction['setScrollAxesDirection'];
      payload: ScrollAxesDirection;
    }
  | {
      type: GlobalAction['setWidth'] | GlobalAction['setHeight'];
      payload: number;
    }
  | {
      type: GlobalAction['setRowGap'];
      payload: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    }
  | {
      type: GlobalAction['setPadding'];
      payload: 'xs' | 'sm' | 'md';
    }
  | {
      type: GlobalAction['setColorScheme'];
      payload: ColorScheme;
    }
  | {
      type: GlobalAction['setUserDocument'];
      payload: Omit<UserDocument, '__v' | 'password'>;
    };

type GlobalReducer = (
  state: GlobalState,
  action: GlobalDispatch
) => GlobalState;

type GlobalProviderProps = {
  children?: ReactNode;
};

export type {
  ColorScheme,
  GlobalAction,
  GlobalDispatch,
  GlobalProviderProps,
  GlobalReducer,
  GlobalState,
  ScrollAxesDirection,
  WindowDimensions,
};
