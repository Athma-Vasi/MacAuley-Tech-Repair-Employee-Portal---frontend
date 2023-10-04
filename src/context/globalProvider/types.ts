import {
  CSSObject,
  ContextStylesParams,
  MantineColor,
  MantineSize,
  MantineTheme,
  MantineThemeOverride,
} from '@mantine/core';
import { ReactNode } from 'react';

import { AnnouncementDocument } from '../../components/announcement/create/types';
import {
  ScrollAxesDirection,
  ScrollXDirection,
  ScrollYDirection,
} from '../../hooks/useScrollDirection';
import { QueryResponseData, UserDocument } from '../../types';

type ColorScheme = 'light' | 'dark';
type Shade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface ThemeComponent {
  defaultProps?:
    | Record<string, any>
    | ((theme: MantineTheme) => Record<string, any>);
  classNames?: Record<string, string>;
  styles?:
    | Record<string, CSSObject>
    | ((
        theme: MantineTheme,
        params: any,
        context: ContextStylesParams
      ) => Record<string, CSSObject>);
  variants?: Record<
    PropertyKey,
    (
      theme: MantineTheme,
      params: any,
      context: ContextStylesParams
    ) => Record<string, CSSObject>
  >;
  sizes?: Record<
    PropertyKey,
    (
      theme: MantineTheme,
      params: any,
      context: ContextStylesParams
    ) => Record<string, CSSObject>
  >;
}

interface ThemeObject extends MantineThemeOverride {
  // Defines color scheme for all components, defaults to "light"
  colorScheme: ColorScheme;

  // Determines whether motion based animations should be disabled for
  // users who prefer to reduce motion in their OS settings
  respectReducedMotion: boolean;

  // White and black colors, defaults to '#fff' and '#000'
  white: string;
  black: string;

  // Key of theme.colors
  primaryColor: string;

  // Index of color from theme.colors that is considered primary
  primaryShade: { light: Shade; dark: Shade };

  // Default gradient used in components that support `variant="gradient"` (Button, ThemeIcon, etc.)
  defaultGradient: { deg: number; from: MantineColor; to: MantineColor };

  fontFamily: string;

  components: {
    [x: string]: ThemeComponent;
  };
}

type ErrorState = {
  isError: boolean;
  errorMessage: string;
  errorCallback: () => void;
};

type GlobalState = {
  width: number;
  height: number;
  rowGap: MantineSize;
  padding: 'xs' | 'sm' | 'md';
  scrollXDirection: ScrollXDirection;
  scrollYDirection: ScrollYDirection;

  // mantine theme object
  themeObject: ThemeObject;

  userDocument: Omit<UserDocument, '__v' | 'password'> | null;
  announcementDocument: QueryResponseData<AnnouncementDocument> | null;

  errorState: ErrorState;
};

type GlobalAction = {
  setWidth: 'setWidth';
  setHeight: 'setHeight';
  setRowGap: 'setRowGap';
  setPadding: 'setPadding';
  setWindowSize: 'setWindowSize';
  setScrollAxesDirection: 'setScrollAxesDirection';

  // mantine theme object
  setRespectReducedMotion: 'setRespectReducedMotion';
  setColorScheme: 'setColorScheme';
  setPrimaryColor: 'setPrimaryColor';
  setPrimaryShade: 'setPrimaryShade';
  setDefaultGradient: 'setDefaultGradient';
  setFontFamily: 'setFontFamily';
  setComponents: 'setComponents';

  setUserDocument: 'setUserDocument';
  setAnnouncementDocument: 'setAnnouncementDocument';

  setErrorState: 'setErrorState';
};

type WindowDimensions = {
  width: number;
  height: number;
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
      payload: MantineSize;
    }
  | {
      type: GlobalAction['setPadding'];
      payload: 'xs' | 'sm' | 'md';
    }
  // mantine theme object
  | {
      type: GlobalAction['setRespectReducedMotion'];
      payload: boolean;
    }
  | {
      type: GlobalAction['setColorScheme'];
      payload: ColorScheme;
    }
  | {
      type: GlobalAction['setPrimaryColor'];
      payload: MantineColor;
    }
  | {
      type: GlobalAction['setPrimaryShade'];
      payload: { light: Shade; dark: Shade };
    }
  | {
      type: GlobalAction['setDefaultGradient'];
      payload: { deg: number; from: MantineColor; to: MantineColor };
    }
  | {
      type: GlobalAction['setFontFamily'];
      payload: string;
    }
  | {
      type: GlobalAction['setComponents'];
      payload: any;
    }
  // documents
  | {
      type: GlobalAction['setUserDocument'];
      payload: Omit<UserDocument, '__v' | 'password'>;
    }
  | {
      type: GlobalAction['setAnnouncementDocument'];
      payload: QueryResponseData<AnnouncementDocument>;
    }

  // error state
  | {
      type: GlobalAction['setErrorState'];
      payload: ErrorState;
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
  ErrorState,
  GlobalAction,
  GlobalDispatch,
  GlobalProviderProps,
  GlobalReducer,
  GlobalState,
  Shade,
  ThemeObject,
  WindowDimensions,
};
