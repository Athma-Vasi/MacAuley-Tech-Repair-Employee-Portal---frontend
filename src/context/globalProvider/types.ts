import { ReactNode } from 'react';

import { AnnouncementDocument } from '../../components/announcements/create/types';
import {
  ScrollXDirection,
  ScrollYDirection,
} from '../../hooks/useScrollDirection';
import { QueryResponseData, UserDocument } from '../../types';

type ColorScheme = 'light' | 'dark';

type ErrorState = {
  isError: boolean;
  errorMessage: string;
  errorCallback: () => void;
};

type GlobalState = {
  width: number;
  height: number;
  rowGap: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  padding: 'xs' | 'sm' | 'md';
  colorScheme: ColorScheme;
  scrollXDirection: ScrollXDirection;
  scrollYDirection: ScrollYDirection;

  userDocument: Omit<UserDocument, '__v' | 'password'> | null;
  announcementDocument: QueryResponseData<AnnouncementDocument> | null;

  errorState: ErrorState;
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
  setAnnouncementDocument: 'setAnnouncementDocument';

  setErrorState: 'setErrorState';
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
    }
  | {
      type: GlobalAction['setAnnouncementDocument'];
      payload: QueryResponseData<AnnouncementDocument>;
    }
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
  GlobalAction,
  GlobalDispatch,
  ErrorState,
  GlobalProviderProps,
  GlobalReducer,
  GlobalState,
  ScrollAxesDirection,
  WindowDimensions,
};

/**
 * type RenderState = {
  error: {
    isError: boolean;
    errorMessage: string;
    errorCallback: () => void;
  };

  loading: {
    isLoading: boolean;
    loadingMessage: string;
    loadingCallback: () => void;
  };

  submitting: {
    isSubmitting: boolean;
    submittingMessage: string;
    submittingCallback: () => void;
  };

  successfull: {
    isSuccessfull: boolean;
    successfullMessage: string;
    successfullCallback: () => void;
  };
};

type ComponentNames =
  | 'addressChange'
  | 'announcement'
  | 'anonymousRequest'
  | 'benefit'
  | 'comment'
  | 'dashboard'
  | 'directory'
  | 'fileUpload'
  | 'displayQueryDesktop'
  | 'displayQueryMobile'
  | 'displayResource'
  | 'displayStatistic'
  | 'endorsement'
  | 'event'
  | 'expenseClaim'
  | 'imageUpload'
  | 'leaveRequest'
  | 'login'
  | 'portalFooter'
  | 'portalNavbar'
  | 'portalHeader'
  | 'printerIssue'
  | 'referment'
  | 'register'
  | 'repairNote'
  | 'requestResource'
  | 'requireAuth'
  | 'survey';

type ComponentsRenderStatePayload = {
  component: ComponentNames;
  renderState: Partial<RenderState>;
};

type ComponentsRenderState = Record<ComponentNames, RenderState>;
 */
