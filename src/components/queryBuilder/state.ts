import {
  QueryBuilderAction,
  QueryBuilderDispatch,
  QueryBuilderState,
} from './types';

const initialQueryBuilderState: QueryBuilderState = {
  filters: [],
  projections: [],
  sorts: [],
};

const queryBuilderAction: QueryBuilderAction = {
  setNewFilter: 'setNewFilter',
  setFilterField: 'setFilterField',
  setFilterOperator: 'setFilterOperator',
  setFilterValue: 'setFilterValue',

  setProjections: 'setProjections',

  setSortField: 'setSortField',
  setSortDirection: 'setSortDirection',
};

function queryBuilderReducer(
  state: QueryBuilderState,
  action: QueryBuilderDispatch
): QueryBuilderState {
  switch (action.type) {
    case queryBuilderAction.setNewFilter:
      return {
        ...state,
        filters: [...state.filters, ['', '', '']],
      };

    case queryBuilderAction.setFilterField:
      return {
        ...state,
        filters: state.filters.map((filter, index) => {
          const [_, operator, value] = filter;
          if (index === action.payload.index) {
            return [action.payload.value, operator, value];
          }

          return filter;
        }),
      };

    case queryBuilderAction.setFilterOperator:
      return {
        ...state,
        filters: state.filters.map((filter, index) => {
          const [field, _, value] = filter;
          if (index === action.payload.index) {
            return [field, action.payload.value, value];
          }

          return filter;
        }),
      };

    case queryBuilderAction.setFilterValue:
      return {
        ...state,
        filters: state.filters.map((filter, index) => {
          const [field, operator, _] = filter;
          if (index === action.payload.index) {
            return [field, operator, action.payload.value];
          }

          return filter;
        }),
      };

    case queryBuilderAction.setProjections:
      return {
        ...state,
        projections: action.payload,
      };

    case queryBuilderAction.setSortField:
      return {
        ...state,
        sorts: state.sorts.map((sort, index) => {
          const [_, direction] = sort;
          if (index === action.payload.index) {
            return [action.payload.value, direction];
          }

          return sort;
        }),
      };

    case queryBuilderAction.setSortDirection:
      return {
        ...state,
        sorts: state.sorts.map((sort, index) => {
          const [field, _] = sort;
          if (index === action.payload.index) {
            return [field, action.payload.value];
          }

          return sort;
        }),
      };

    default:
      return state;
  }
}

export { initialQueryBuilderState, queryBuilderAction, queryBuilderReducer };
