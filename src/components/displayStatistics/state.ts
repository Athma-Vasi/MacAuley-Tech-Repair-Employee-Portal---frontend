import {
  DisplayStatisticsAction,
  DisplayStatisticsDispatch,
  DisplayStatisticsState,
} from './types';

const initialDisplayStatisticsState: DisplayStatisticsState = {
  chartTitle: '',
  chartKind: 'pie',
  chartData: [],
};

const displayStatisticsAction: DisplayStatisticsAction = {
  setChartKind: 'setChartKind',
  setChartData: 'setChartData',
  setChartTitle: 'setChartTitle',
};

function displayStatisticsReducer(
  state: DisplayStatisticsState,
  action: DisplayStatisticsDispatch
): DisplayStatisticsState {
  switch (action.type) {
    case displayStatisticsAction.setChartKind:
      return {
        ...state,
        chartKind: action.payload,
      };

    case displayStatisticsAction.setChartData:
      return {
        ...state,
        chartData: action.payload,
      };

    case displayStatisticsAction.setChartTitle:
      return {
        ...state,
        chartTitle: action.payload,
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
