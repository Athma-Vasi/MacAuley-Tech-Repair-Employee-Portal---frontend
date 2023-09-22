type DevTestingState = {
  triggerFormSubmit: boolean;
  updatedUserDocuments: Record<string | number | symbol, any>[];
};

type DevTestingAction = {
  setTriggerFormSubmit: 'setTriggerFormSubmit';
  setUpdatedUserDocuments: 'setUpdatedUserDocuments';
};

type DevTestingDispatch =
  | {
      type: DevTestingAction['setTriggerFormSubmit'];
      payload: boolean;
    }
  | {
      type: DevTestingAction['setUpdatedUserDocuments'];
      payload: Record<string | number | symbol, any>[];
    };

export type { DevTestingAction, DevTestingDispatch, DevTestingState };
