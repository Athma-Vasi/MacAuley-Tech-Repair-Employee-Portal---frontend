import {
  ContextStylesParams,
  CSSObject,
  MantineColor,
  MantineSize,
  MantineTheme,
  MantineThemeOverride,
} from '@mantine/core';
import { ReactNode } from 'react';

import { AddressChangeDocument } from '../../components/addressChange/create/types';
import { AnnouncementDocument } from '../../components/announcement/create/types';
import { AnonymousRequestDocument } from '../../components/anonymousRequest/create/types';
import { BenefitsDocument } from '../../components/benefits/create/types';
import { BarChartData } from '../../components/charts/responsiveBarChart/types';
import { CalendarChartData } from '../../components/charts/responsiveCalendarChart/types';
import { LineChartData } from '../../components/charts/responsiveLineChart/types';
import { PieChartData } from '../../components/charts/responsivePieChart/types';
import { RadialBarChartData } from '../../components/charts/responsiveRadialBarChart/types';
import { SunburstChartData } from '../../components/charts/responsiveSunburstChart/types';
import {
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  DashboardMetricsView,
} from '../../components/dashboard/types';
import { EndorsementDocument } from '../../components/endorsements/create/types';
import { EventCreatorDocument } from '../../components/event/create/types';
import { ExpenseClaimDocument } from '../../components/expenseClaim/create/types';
import { LeaveRequestDocument } from '../../components/leaveRequest/types';
import { PrinterIssueDocument } from '../../components/printerIssue/create/types';
import { RefermentDocument } from '../../components/referment/create/types';
import { RepairNoteDocument } from '../../components/repairNote/types';
import { RequestResourceDocument } from '../../components/requestResource/create/types';
import { SurveyBuilderDocument } from '../../components/survey/types';
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

type ActionsDocuments = {
  repairNoteData: RepairNoteDocument[];
  companyData: {
    addressChangeData: AddressChangeDocument[];
    expenseClaimData: ExpenseClaimDocument[];
    requestResourceData: RequestResourceDocument[];
    leaveRequestData: LeaveRequestDocument[];
    benefitData: BenefitsDocument[];
  };
  generalData: {
    endorsementData: EndorsementDocument[];
    printerIssueData: PrinterIssueDocument[];
    anonymousRequestData?: AnonymousRequestDocument[];
    refermentData: RefermentDocument[];
  };
  outreachData: {
    announcementData: AnnouncementDocument[];
    surveyData: SurveyBuilderDocument[];
    eventData: EventCreatorDocument[];
  };
  employeeData: Map<string, UserDocument>;
};

type CustomizeChartsPageData = { chartTitle: string } & (
  | {
      chartKind: 'bar';
      chartData: BarChartData[];
    }
  | {
      chartKind: 'calendar';
      chartData: CalendarChartData[];
    }
  | {
      chartKind: 'line';
      chartData: LineChartData[];
    }
  | {
      chartKind: 'pie';
      chartData: PieChartData[];
    }
  | {
      chartKind: 'radialBar';
      chartData: RadialBarChartData[];
    }
  | {
      chartKind: 'sunburst';
      chartData: SunburstChartData[];
    }
);

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
  actionsDocuments: ActionsDocuments | null;
  announcementDocument: QueryResponseData<AnnouncementDocument> | null;
  isPrefersReducedMotion: boolean;
  errorState: ErrorState;

  customizeChartsPageData: CustomizeChartsPageData | null;
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
  setActionsDocuments: 'setActionsDocuments';
  setAnnouncementDocument: 'setAnnouncementDocument';
  setPrefersReducedMotion: 'setPrefersReducedMotion';

  setErrorState: 'setErrorState';
  setCustomizeChartsPageData: 'setCustomizeChartsPageData';
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
      type:
        | GlobalAction['setRespectReducedMotion']
        | GlobalAction['setPrefersReducedMotion'];
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
      type: GlobalAction['setActionsDocuments'];
      payload: ActionsDocuments;
    }
  | {
      type: GlobalAction['setAnnouncementDocument'];
      payload: QueryResponseData<AnnouncementDocument>;
    }

  // error state
  | {
      type: GlobalAction['setErrorState'];
      payload: ErrorState;
    }
  // customize charts page data
  | {
      type: GlobalAction['setCustomizeChartsPageData'];
      payload: CustomizeChartsPageData;
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
