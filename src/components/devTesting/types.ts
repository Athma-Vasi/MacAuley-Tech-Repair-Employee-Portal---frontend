type DevTestingState = {
  bodiesArr: { username: string[]; email: string[] };
  bodiesArrCount: number;
  resourceDocuments: Record<string, any>[];

  triggerPostFormSubmit: boolean;
  triggerGetRequest: boolean;
};

type DevTestingAction = {
  setBodiesArr: "setBodiesArr";
  setBodiesArrCount: "setBodiesArrCount";
  setResourceDocuments: "setResourceDocuments";

  setTriggerPostFormSubmit: "setTriggerPostFormSubmit";
  setTriggerGetRequest: "setTriggerGetRequest";
};

type DevTestingDispatch =
  | {
      type: DevTestingAction["setBodiesArr"];
      payload: { username: string[]; email: string[] };
    }
  | {
      type: DevTestingAction["setBodiesArrCount"];
      payload: number;
    }
  | {
      type: DevTestingAction["setResourceDocuments"];
      payload: Record<string, any>[];
    }
  | {
      type: DevTestingAction["setTriggerPostFormSubmit"];
      payload: boolean;
    }
  | {
      type: DevTestingAction["setTriggerGetRequest"];
      payload: boolean;
    };

export type { DevTestingAction, DevTestingDispatch, DevTestingState };
