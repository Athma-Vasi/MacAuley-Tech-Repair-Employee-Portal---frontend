type QueryBuilderState = {
  filters: [string, string, boolean | number | string][]; // [field, operator, value][]
  projections: string[];
  sorts: [string, string][]; // [field, direction][]
};

type QueryBuilderAction = {
  setNewFilter: 'setNewFilter';
  setFilterField: 'setFilterField';
  setFilterOperator: 'setFilterOperator';
  setFilterValue: 'setFilterValue';
  setProjections: 'setProjections';
  setSortField: 'setSortField';
  setSortDirection: 'setSortDirection';
};

type QueryBuilderDispatch =
  | {
      type:
        | QueryBuilderAction['setFilterField']
        | QueryBuilderAction['setFilterOperator']
        | QueryBuilderAction['setSortField']
        | QueryBuilderAction['setSortDirection'];
      payload: {
        index: number;
        value: string;
      };
    }
  | {
      type: QueryBuilderAction['setFilterValue'];
      payload: {
        index: number;
        value: boolean | number | string;
      };
    }
  | {
      type: QueryBuilderAction['setProjections'];
      payload: string[];
    }
  | {
      type: QueryBuilderAction['setNewFilter'];
      payload: [];
    };

type QueryBuilderReducer = (
  state: QueryBuilderState,
  action: QueryBuilderDispatch
) => QueryBuilderState;

export type {
  QueryBuilderAction,
  QueryBuilderDispatch,
  QueryBuilderReducer,
  QueryBuilderState,
};
