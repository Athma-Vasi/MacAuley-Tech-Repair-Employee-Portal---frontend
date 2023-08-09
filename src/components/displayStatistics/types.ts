import { SurveyStatistics } from '../survey/types';

type DisplayStatisticsProps = {
  surveyStatistics: Array<SurveyStatistics[]>;
};

type PieChartData = {
  id: string;
  label: string;
  value: number;
}[];
type BarChartData = Record<string, string | number>[];
type ChartData = PieChartData | BarChartData;
type ChartKind = 'bar' | 'pie';

type DisplayStatisticsState = {
  chartKind: ChartKind;
  chartData: ChartData;
  chartTitle: string;
};

type DisplayStatisticsAction = {
  setChartKind: 'setChartKind';
  setChartData: 'setChartData';
  setChartTitle: 'setChartTitle';
};

type DisplayStatisticsDispatch =
  | {
      type: DisplayStatisticsAction['setChartKind'];
      payload: ChartKind;
    }
  | {
      type: DisplayStatisticsAction['setChartData'];
      payload: ChartData;
    }
  | {
      type: DisplayStatisticsAction['setChartTitle'];
      payload: string;
    };

type DisplayStatisticsReducer = (
  state: DisplayStatisticsState,
  action: DisplayStatisticsDispatch
) => DisplayStatisticsState;

export type {
  BarChartData,
  ChartData,
  ChartKind,
  DisplayStatisticsAction,
  DisplayStatisticsDispatch,
  DisplayStatisticsProps,
  DisplayStatisticsReducer,
  DisplayStatisticsState,
  PieChartData,
};
