import { MantineTheme } from '@mantine/core';
import {
  ColorScheme,
  GlobalAction,
  GlobalDispatch,
  GlobalState,
  ScrollAxesDirection,
  ThemeObject,
  WindowDimensions,
} from './types';

const initialThemeObject: ThemeObject = {
  colorScheme: 'light',
  respectReducedMotion: true,

  white: '#f8f9fa', // gray.0
  black: '#212529', // gray.9

  primaryColor: 'violet',
  primaryShade: { light: 5, dark: 7 },

  defaultGradient: { deg: 45, from: 'blue', to: 'cyan' },

  fontFamily: 'sans-serif',

  components: {
    Button: {
      // Variants<'filled' | 'outline' | 'light' | 'white' | 'default' | 'subtle' | 'gradient'>
      defaultProps: {
        variant: 'light',
      },
    },
    Text: {
      defaultProps: {
        color: 'dark.7',
        size: 'sm',
      },
    },
    Title: {
      defaultProps: {
        color: 'dark.7',
      },
    },
  },
};

const initialGlobalState: GlobalState = {
  width: 0,
  height: 0,
  rowGap: 'xs',
  padding: 'xs',
  // colorScheme: 'light',
  scrollXDirection: '',
  scrollYDirection: '',

  themeObject: initialThemeObject,

  userDocument: null,
  announcementDocument: null,

  errorState: {
    isError: false,
    errorMessage: '',
    errorCallback: () => {},
  },
};

const globalAction: GlobalAction = {
  setWidth: 'setWidth',
  setHeight: 'setHeight',
  setRowGap: 'setRowGap',
  setPadding: 'setPadding',
  setWindowSize: 'setWindowSize',
  setScrollAxesDirection: 'setScrollAxesDirection',

  // mantine theme object
  setRespectReducedMotion: 'setRespectReducedMotion',
  setColorScheme: 'setColorScheme',
  setPrimaryColor: 'setPrimaryColor',
  setPrimaryShade: 'setPrimaryShade',
  setDefaultGradient: 'setDefaultGradient',
  setFontFamily: 'setFontFamily',
  setComponents: 'setComponents',

  setUserDocument: 'setUserDocument',
  setAnnouncementDocument: 'setAnnouncementDocument',

  setErrorState: 'setErrorState',
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
    case globalAction.setWindowSize: {
      const { width, height } = action.payload;
      return { ...state, width, height };
    }
    case globalAction.setScrollAxesDirection: {
      const { scrollXDirection, scrollYDirection } = action.payload;
      return { ...state, scrollXDirection, scrollYDirection };
    }

    // mantine theme object
    case globalAction.setRespectReducedMotion:
      return {
        ...state,
        themeObject: {
          ...state.themeObject,
          respectReducedMotion: action.payload,
        },
      };
    case globalAction.setColorScheme: {
      const colorScheme = action.payload;
      const { components } = state.themeObject;
      const { Button, Text, Title } = components;

      // set button variant
      const { defaultProps } = Button;
      const newButtonDefaultProps = {
        ...defaultProps,
        variant: colorScheme === 'dark' ? 'outline' : 'light',
      };

      // set text color
      const { defaultProps: textDefaultProps } = Text;
      const newTextDefaultProps = {
        ...textDefaultProps,
        color: colorScheme === 'dark' ? 'gray.5' : 'dark.7',
      };

      // set title color
      const { defaultProps: titleDefaultProps } = Title;
      const newTitleDefaultProps = {
        ...titleDefaultProps,
        color: colorScheme === 'dark' ? 'gray.5' : 'dark.7',
      };

      return {
        ...state,
        themeObject: {
          ...state.themeObject,
          colorScheme,
          components: {
            ...components,
            Button: {
              ...Button,
              defaultProps: newButtonDefaultProps,
            },
            Text: {
              ...Text,
              defaultProps: newTextDefaultProps,
            },
            Title: {
              ...Title,
              defaultProps: newTitleDefaultProps,
            },
          },
        },
      };
    }
    case globalAction.setPrimaryColor:
      return {
        ...state,
        themeObject: {
          ...state.themeObject,
          primaryColor: action.payload,
        },
      };
    case globalAction.setPrimaryShade:
      return {
        ...state,
        themeObject: {
          ...state.themeObject,
          primaryShade: action.payload,
        },
      };
    case globalAction.setDefaultGradient:
      return {
        ...state,
        themeObject: {
          ...state.themeObject,
          defaultGradient: action.payload,
        },
      };
    case globalAction.setFontFamily:
      return {
        ...state,
        themeObject: {
          ...state.themeObject,
          fontFamily: action.payload,
        },
      };
    case globalAction.setComponents:
      return {
        ...state,
        themeObject: {
          ...state.themeObject,
          components: action.payload,
        },
      };

    // documents
    case globalAction.setUserDocument:
      return { ...state, userDocument: action.payload };
    case globalAction.setAnnouncementDocument:
      return { ...state, announcementDocument: action.payload };

    case globalAction.setErrorState:
      return { ...state, errorState: action.payload };

    default:
      return state;
  }
}

export { globalAction, globalReducer, initialGlobalState };

/**
 * // inputs
    Checkbox: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },
    ColorInput: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },
    FileInput: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },
    NumberInput: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },
    PasswordInput: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },
    Radio: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },
    SegmentedControl: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },
    Select: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },
    Slider: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },
    Switch: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },
    Textarea: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },
    TextInput: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },
    ThemeIcon: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },

    // navigation
    NavLink: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },
    Pagination: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },
    Stepper: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },

    // data display
    Accordion: {
      defaultProps: (theme: MantineTheme) => ({
        color: theme.primaryColor,
      }),
    },
 */
