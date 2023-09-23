type DevTestingState = {
  triggerFormSubmit: boolean;
  bodiesArr: any[];
  bodiesArrCount: number;
};

type DevTestingAction = {
  setTriggerFormSubmit: 'setTriggerFormSubmit';
  setBodiesArr: 'setBodiesArr';
  setBodiesArrCount: 'setBodiesArrCount';
};

type DevTestingDispatch =
  | {
      type: DevTestingAction['setTriggerFormSubmit'];
      payload: boolean;
    }
  | {
      type: DevTestingAction['setBodiesArr'];
      payload: any[];
    }
  | {
      type: DevTestingAction['setBodiesArrCount'];
      payload: number;
    };

export type { DevTestingAction, DevTestingDispatch, DevTestingState };
