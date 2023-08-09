import {
  DisplayStatisticsAction,
  DisplayStatisticsDispatch,
  DisplayStatisticsState,
} from './types';

const initialDisplayStatisticsState: DisplayStatisticsState = {
  chartTitlesMap: new Map(),
  chartKindsMap: new Map(),
  pieChartDataMap: new Map(),
  totalResponsesMap: new Map(),
};

const displayStatisticsAction: DisplayStatisticsAction = {
  setChartKindsMap: 'setChartKindsMap',
  setPieChartDataMap: 'setPieChartDataMap',
  setChartTitlesMap: 'setChartTitlesMap',
  setTotalResponsesMap: 'setTotalResponsesMap',
};

function displayStatisticsReducer(
  state: DisplayStatisticsState,
  action: DisplayStatisticsDispatch
): DisplayStatisticsState {
  switch (action.type) {
    case displayStatisticsAction.setChartKindsMap:
      return {
        ...state,
        chartKindsMap: action.payload,
      };

    case displayStatisticsAction.setPieChartDataMap:
      return {
        ...state,
        pieChartDataMap: action.payload,
      };

    case displayStatisticsAction.setChartTitlesMap:
      return {
        ...state,
        chartTitlesMap: action.payload,
      };

    case displayStatisticsAction.setTotalResponsesMap:
      return {
        ...state,
        totalResponsesMap: action.payload,
      };

    default:
      return state;
  }
}

export {
  displayStatisticsAction,
  displayStatisticsReducer,
  initialDisplayStatisticsState,
};
