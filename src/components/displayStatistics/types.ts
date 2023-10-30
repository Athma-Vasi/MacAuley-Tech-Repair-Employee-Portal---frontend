import { BarChartData } from '../charts/responsiveBarChart/types';
import { PieChartData } from '../charts/responsivePieChart/types';
import { SurveyBuilderDocument } from '../survey/types';

type DisplayStatisticsProps = {
  surveys: SurveyBuilderDocument[];
};

type ChartData = PieChartData[] | BarChartData[];
type ChartKind = 'bar' | 'pie';

type DisplayStatisticsState = {
  chartKindsMap: Map<string, Map<string, ChartKind>>;
  pieChartDataMap: Map<string, Map<string, PieChartData[]>>;
  chartTitlesMap: Map<string, string[]>;
  totalResponsesMap: Map<string, Map<string, number>>;

  currentSelectedSurvey: SurveyBuilderDocument | null;
  currentlySelectedPieChartData: PieChartData[] | null;
  modalPage: number;
};

type DisplayStatisticsAction = {
  setChartKindsMap: 'setChartKindsMap';
  setPieChartDataMap: 'setPieChartDataMap';
  setChartTitlesMap: 'setChartTitlesMap';
  setTotalResponsesMap: 'setTotalResponsesMap';

  setCurrentSelectedSurvey: 'setCurrentSelectedSurvey';
  setCurrentlySelectedPieChartData: 'setCurrentlySelectedPieChartData';
  setModalPage: 'setModalPage';
};

type DisplayStatisticsDispatch =
  | {
      type: DisplayStatisticsAction['setChartKindsMap'];
      payload: Map<string, Map<string, ChartKind>>;
    }
  | {
      type: DisplayStatisticsAction['setPieChartDataMap'];
      payload: Map<string, Map<string, PieChartData[]>>;
    }
  | {
      type: DisplayStatisticsAction['setChartTitlesMap'];
      payload: Map<string, string[]>;
    }
  | {
      type: DisplayStatisticsAction['setTotalResponsesMap'];
      payload: Map<string, Map<string, number>>;
    }
  | {
      type: DisplayStatisticsAction['setCurrentSelectedSurvey'];
      payload: SurveyBuilderDocument;
    }
  | {
      type: DisplayStatisticsAction['setCurrentlySelectedPieChartData'];
      payload: PieChartData[];
    }
  | {
      type: DisplayStatisticsAction['setModalPage'];
      payload: number;
    };

type DisplayStatisticsReducer = (
  state: DisplayStatisticsState,
  action: DisplayStatisticsDispatch
) => DisplayStatisticsState;

export type {
  ChartData,
  ChartKind,
  DisplayStatisticsAction,
  DisplayStatisticsDispatch,
  DisplayStatisticsProps,
  DisplayStatisticsReducer,
  DisplayStatisticsState,
};
