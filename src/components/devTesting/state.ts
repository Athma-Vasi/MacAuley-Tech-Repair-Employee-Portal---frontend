import { DevTestingAction, DevTestingDispatch, DevTestingState } from './types';

const initialDevTestingState: DevTestingState = {
  triggerFormSubmit: false,
  updatedUserDocuments: [],
};

const devTestingAction: DevTestingAction = {
  setTriggerFormSubmit: 'setTriggerFormSubmit',
  setUpdatedUserDocuments: 'setUpdatedUserDocuments',
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

    case devTestingAction.setUpdatedUserDocuments:
      return {
        ...state,
        updatedUserDocuments: action.payload,
      };

    default:
      return state;
  }
}

export { devTestingAction, devTestingReducer, initialDevTestingState };
