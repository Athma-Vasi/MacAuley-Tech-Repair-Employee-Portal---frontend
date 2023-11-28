import { DevTestingAction, DevTestingDispatch, DevTestingState } from './types';

const initialDevTestingState: DevTestingState = {
  bodiesArr: [],
  bodiesArrCount: 0,
  resourceDocuments: [],

  triggerPostFormSubmit: false,
  triggerGetRequest: false,
};

const devTestingAction: DevTestingAction = {
  setBodiesArr: 'setBodiesArr',
  setBodiesArrCount: 'setBodiesArrCount',
  setResourceDocuments: 'setResourceDocuments',

  setTriggerPostFormSubmit: 'setTriggerPostFormSubmit',
  setTriggerGetRequest: 'setTriggerGetRequest',
};

function devTestingReducer(
  state: DevTestingState,
  action: DevTestingDispatch
): DevTestingState {
  switch (action.type) {
    case devTestingAction.setBodiesArr:
      return {
        ...state,
        bodiesArr: action.payload,
      };

    case devTestingAction.setBodiesArrCount:
      return {
        ...state,
        bodiesArrCount: action.payload,
      };

    case devTestingAction.setResourceDocuments:
      return {
        ...state,
        resourceDocuments: action.payload,
      };

    case devTestingAction.setTriggerPostFormSubmit:
      return {
        ...state,
        triggerPostFormSubmit: action.payload,
      };

    case devTestingAction.setTriggerGetRequest:
      return {
        ...state,
        triggerGetRequest: action.payload,
      };

    default:
      return state;
  }
}

export { devTestingAction, devTestingReducer, initialDevTestingState };
