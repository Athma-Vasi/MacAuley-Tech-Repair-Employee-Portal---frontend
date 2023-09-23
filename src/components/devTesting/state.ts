import { DevTestingAction, DevTestingDispatch, DevTestingState } from './types';

const initialDevTestingState: DevTestingState = {
  triggerFormSubmit: false,
  bodiesArr: [],
  bodiesArrCount: 0,
};

const devTestingAction: DevTestingAction = {
  setTriggerFormSubmit: 'setTriggerFormSubmit',
  setBodiesArr: 'setBodiesArr',
  setBodiesArrCount: 'setBodiesArrCount',
};

function devTestingReducer(
  state: DevTestingState,
  action: DevTestingDispatch
): DevTestingState {
  switch (action.type) {
    case devTestingAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };

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

    default:
      return state;
  }
}

export { devTestingAction, devTestingReducer, initialDevTestingState };
