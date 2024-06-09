import { toggleNavlinksActive } from "../../utils";
import { PortalNavbarAction, portalNavbarAction } from "./actions";
import { PortalNavbarDispatch } from "./dispatch";
import { PortalNavbarState } from "./types";

function setIsHomeActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isHomeActive",
  });

  return updatedState;
}

function setIsDashboardActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isDashboardActive",
  });

  return updatedState;
}

function setIsCustomerActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isCustomerActive",
  });

  return updatedState;
}

function setIsCommentActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isCommentActive",
  });

  return updatedState;
}

function setIsFileUploadActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isFileUploadActive",
  });

  return updatedState;
}

function setIsProductActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isProductActive",
  });

  return updatedState;
}

function setIsRepairActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isRepairActive",
  });

  return updatedState;
}

function setIsCompanyActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isCompanyActive",
  });

  return updatedState;
}

function setIsAddressChangeActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isAddressChangeActive",
  });

  return updatedState;
}

function setIsBenefitActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isBenefitActive",
  });

  return updatedState;
}

function setIsExpenseClaimActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isExpenseClaimActive",
  });

  return updatedState;
}

function setIsLeaveRequestActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isLeaveRequestActive",
  });

  return updatedState;
}

function setIsRequestResourceActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isRequestResourceActive",
  });

  return updatedState;
}

function setIsGeneralActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isGeneralActive",
  });

  return updatedState;
}

function setIsEndorsementActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isEndorsementActive",
  });

  return updatedState;
}

function setIsPrinterIssueActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isPrinterIssueActive",
  });

  return updatedState;
}

function setIsAnonymousRequestActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isAnonymousRequestActive",
  });

  return updatedState;
}

function setIsRefermentActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isRefermentActive",
  });

  return updatedState;
}

function setIsOutreachActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isOutreachActive",
  });

  return updatedState;
}

function setIsAnnouncementActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isAnnouncementActive",
  });

  return updatedState;
}

function setIsSurveyActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isSurveyActive",
  });

  return updatedState;
}

function setIsEventActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isEventActive",
  });

  return updatedState;
}

function setIsDirectoryActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isDirectoryActive",
  });

  return updatedState;
}

const portalNavbarReducersMap = new Map<
  PortalNavbarAction[keyof PortalNavbarAction],
  (state: PortalNavbarState, dispatch: PortalNavbarDispatch) => PortalNavbarState
>([
  [portalNavbarAction.setIsHomeActive, setIsHomeActive_PortalNavbarReducer],

  [portalNavbarAction.setIsDashboardActive, setIsDashboardActive_PortalNavbarReducer],

  [portalNavbarAction.setIsCustomerActive, setIsCustomerActive_PortalNavbarReducer],

  [portalNavbarAction.setIsCommentActive, setIsCommentActive_PortalNavbarReducer],

  [portalNavbarAction.setIsFileUploadActive, setIsFileUploadActive_PortalNavbarReducer],

  [portalNavbarAction.setIsProductActive, setIsProductActive_PortalNavbarReducer],

  [portalNavbarAction.setIsRepairActive, setIsRepairActive_PortalNavbarReducer],

  [portalNavbarAction.setIsCompanyActive, setIsCompanyActive_PortalNavbarReducer],
  [
    portalNavbarAction.setIsAddressChangeActive,
    setIsAddressChangeActive_PortalNavbarReducer,
  ],
  [portalNavbarAction.setIsBenefitActive, setIsBenefitActive_PortalNavbarReducer],
  [
    portalNavbarAction.setIsExpenseClaimActive,
    setIsExpenseClaimActive_PortalNavbarReducer,
  ],
  [
    portalNavbarAction.setIsLeaveRequestActive,
    setIsLeaveRequestActive_PortalNavbarReducer,
  ],
  [
    portalNavbarAction.setIsRequestResourceActive,
    setIsRequestResourceActive_PortalNavbarReducer,
  ],

  [portalNavbarAction.setIsGeneralActive, setIsGeneralActive_PortalNavbarReducer],
  [portalNavbarAction.setIsEndorsementActive, setIsEndorsementActive_PortalNavbarReducer],
  [
    portalNavbarAction.setIsPrinterIssueActive,
    setIsPrinterIssueActive_PortalNavbarReducer,
  ],
  [
    portalNavbarAction.setIsAnonymousRequestActive,
    setIsAnonymousRequestActive_PortalNavbarReducer,
  ],
  [portalNavbarAction.setIsRefermentActive, setIsRefermentActive_PortalNavbarReducer],

  [portalNavbarAction.setIsOutreachActive, setIsOutreachActive_PortalNavbarReducer],
  [
    portalNavbarAction.setIsAnnouncementActive,
    setIsAnnouncementActive_PortalNavbarReducer,
  ],
  [portalNavbarAction.setIsSurveyActive, setIsSurveyActive_PortalNavbarReducer],
  [portalNavbarAction.setIsEventActive, setIsEventActive_PortalNavbarReducer],

  [portalNavbarAction.setIsDirectoryActive, setIsDirectoryActive_PortalNavbarReducer],
]);

function portalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const reducer = portalNavbarReducersMap.get(dispatch.type);
  return reducer ? reducer(state, dispatch) : state;
}

export {
  portalNavbarReducer,
  setIsAddressChangeActive_PortalNavbarReducer,
  setIsAnnouncementActive_PortalNavbarReducer,
  setIsAnonymousRequestActive_PortalNavbarReducer,
  setIsBenefitActive_PortalNavbarReducer,
  setIsCommentActive_PortalNavbarReducer,
  setIsCompanyActive_PortalNavbarReducer,
  setIsCustomerActive_PortalNavbarReducer,
  setIsDashboardActive_PortalNavbarReducer,
  setIsDirectoryActive_PortalNavbarReducer,
  setIsEndorsementActive_PortalNavbarReducer,
  setIsEventActive_PortalNavbarReducer,
  setIsExpenseClaimActive_PortalNavbarReducer,
  setIsFileUploadActive_PortalNavbarReducer,
  setIsGeneralActive_PortalNavbarReducer,
  setIsHomeActive_PortalNavbarReducer,
  setIsLeaveRequestActive_PortalNavbarReducer,
  setIsOutreachActive_PortalNavbarReducer,
  setIsPrinterIssueActive_PortalNavbarReducer,
  setIsProductActive_PortalNavbarReducer,
  setIsRefermentActive_PortalNavbarReducer,
  setIsRepairActive_PortalNavbarReducer,
  setIsRequestResourceActive_PortalNavbarReducer,
  setIsSurveyActive_PortalNavbarReducer,
};
