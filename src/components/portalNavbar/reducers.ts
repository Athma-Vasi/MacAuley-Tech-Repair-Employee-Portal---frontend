import { toggleNavlinksActive } from "../../utils";
import { PortalNavbarAction, portalNavbarAction } from "./actions";
import { PortalNavbarDispatch } from "./dispatch";
import { PortalNavbarState } from "./types";

// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    REDUCER FUNCTIONS
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// - each reducer function is mapped to an action type
// - type ComponentReducer = (state: ComponentState, dispatch: ComponentDispatch) => ComponentState
// - Map<ComponentAction[keyof ComponentAction], ComponentReducer>
// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

// ╭─────────────────────────────────────────────────────────────────╮
//    HOME
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    DASHBOARD
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    CUSTOMER
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    COMMENT
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    FILE UPLOAD
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => ACCESSORY
// ╰─────────────────────────────────────────────────────────────────╯
function setIsProductAccessoryActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isProductAccessoryActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => CPU
// ╰─────────────────────────────────────────────────────────────────╯
function setIsCPUActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isCPUActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => COMPUTER CASE
// ╰─────────────────────────────────────────────────────────────────╯
function setIsComputerCaseActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isComputerCaseActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => DESKTOP COMPUTER
// ╰─────────────────────────────────────────────────────────────────╯
function setIsDesktopComputerActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isDesktopComputerActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => DISPLAY
// ╰─────────────────────────────────────────────────────────────────╯
function setIsDisplayActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isDisplayActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => GPU
// ╰─────────────────────────────────────────────────────────────────╯
function setIsGPUActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isGPUActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => LAPTOP
// ╰─────────────────────────────────────────────────────────────────╯
function setIsLaptopActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isLaptopActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => RAM
// ╰─────────────────────────────────────────────────────────────────╯
function setIsRAMActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isRAMActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => MICROPHONE
// ╰─────────────────────────────────────────────────────────────────╯
function setIsMicrophoneActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isMicrophoneActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => MOTHERBOARD
// ╰─────────────────────────────────────────────────────────────────╯
function setIsMotherboardActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isMotherboardActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => MOUSE
// ╰─────────────────────────────────────────────────────────────────╯
function setIsMouseActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isMouseActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => PSU
// ╰─────────────────────────────────────────────────────────────────╯
function setIsPSUActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isPSUActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => SMARTPHONE
// ╰─────────────────────────────────────────────────────────────────╯
function setIsSmartphoneActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isSmartphoneActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => SPEAKER
// ╰─────────────────────────────────────────────────────────────────╯
function setIsSpeakerActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isSpeakerActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => STORAGE
// ╰─────────────────────────────────────────────────────────────────╯
function setIsStorageActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isStorageActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => TABLET
// ╰─────────────────────────────────────────────────────────────────╯
function setIsTabletActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isTabletActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY => WEBCAM
// ╰─────────────────────────────────────────────────────────────────╯
function setIsWebcamActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isWebcamActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT REVIEW
// ╰─────────────────────────────────────────────────────────────────╯
function setIsProductReviewActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isProductReviewActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    REPAIR CATEGORY
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    TRANSACTION
// ╰─────────────────────────────────────────────────────────────────╯
function setIsTransactionActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isTransactionActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    TRANSACTION => PURCHASE
// ╰─────────────────────────────────────────────────────────────────╯
function setIsPurchaseActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isPurchaseActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    TRANSACTION => RMA
// ╰─────────────────────────────────────────────────────────────────╯
function setIsRMAActive_PortalNavbarReducer(
  state: PortalNavbarState,
  dispatch: PortalNavbarDispatch
): PortalNavbarState {
  const updatedState = toggleNavlinksActive<PortalNavbarState>({
    navlinksState: state,
    payload: dispatch.payload,
    toggledNavlink: "isRMAActive",
  });

  return updatedState;
}

// ╭─────────────────────────────────────────────────────────────────╮
//    COMPANY
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    COMPANY => ADDRESS CHANGE
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    COMPANY => BENEFIT
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    COMPANY => EXPENSE CLAIM
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    COMPANY => LEAVE REQUEST
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    COMPANY => REQUEST RESOURCE
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    GENERAL
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    GENERAL => ENDORSEMENT
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    GENERAL => PRINTER ISSUE
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    GENERAL => ANONYMOUS REQUEST
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    GENERAL => REFERMENT
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    OUTREACH
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    OUTREACH => ANNOUNCEMENT
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    OUTREACH => SURVEY
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    OUTREACH => EVENT
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    DIRECTORY
// ╰─────────────────────────────────────────────────────────────────╯
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

// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    REDUCERS MAP
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

const portalNavbarReducersMap = new Map<
  PortalNavbarAction[keyof PortalNavbarAction],
  (state: PortalNavbarState, dispatch: PortalNavbarDispatch) => PortalNavbarState
>([
  // ╭─────────────────────────────────────────────────────────────────╮
  //    HOME
  // ╰─────────────────────────────────────────────────────────────────╯
  [portalNavbarAction.setIsHomeActive, setIsHomeActive_PortalNavbarReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DASHBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  [portalNavbarAction.setIsDashboardActive, setIsDashboardActive_PortalNavbarReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CUSTOMER
  // ╰─────────────────────────────────────────────────────────────────╯
  [portalNavbarAction.setIsCustomerActive, setIsCustomerActive_PortalNavbarReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMMENT
  // ╰─────────────────────────────────────────────────────────────────╯
  [portalNavbarAction.setIsCommentActive, setIsCommentActive_PortalNavbarReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    FILE UPLOAD
  // ╰─────────────────────────────────────────────────────────────────╯
  [portalNavbarAction.setIsFileUploadActive, setIsFileUploadActive_PortalNavbarReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT CATEGORY
  // ╰─────────────────────────────────────────────────────────────────╯
  [portalNavbarAction.setIsProductActive, setIsProductActive_PortalNavbarReducer],
  [
    portalNavbarAction.setIsProductAccessoryActive,
    setIsProductAccessoryActive_PortalNavbarReducer,
  ],
  [portalNavbarAction.setIsCPUActive, setIsCPUActive_PortalNavbarReducer],
  [
    portalNavbarAction.setIsComputerCaseActive,
    setIsComputerCaseActive_PortalNavbarReducer,
  ],
  [
    portalNavbarAction.setIsDesktopComputerActive,
    setIsDesktopComputerActive_PortalNavbarReducer,
  ],
  [portalNavbarAction.setIsDisplayActive, setIsDisplayActive_PortalNavbarReducer],
  [portalNavbarAction.setIsGPUActive, setIsGPUActive_PortalNavbarReducer],
  [portalNavbarAction.setIsLaptopActive, setIsLaptopActive_PortalNavbarReducer],
  [portalNavbarAction.setIsRAMActive, setIsRAMActive_PortalNavbarReducer],
  [portalNavbarAction.setIsMicrophoneActive, setIsMicrophoneActive_PortalNavbarReducer],
  [portalNavbarAction.setIsMotherboardActive, setIsMotherboardActive_PortalNavbarReducer],
  [portalNavbarAction.setIsMouseActive, setIsMouseActive_PortalNavbarReducer],
  [portalNavbarAction.setIsPSUActive, setIsPSUActive_PortalNavbarReducer],
  [portalNavbarAction.setIsSmartphoneActive, setIsSmartphoneActive_PortalNavbarReducer],
  [portalNavbarAction.setIsSpeakerActive, setIsSpeakerActive_PortalNavbarReducer],
  [portalNavbarAction.setIsStorageActive, setIsStorageActive_PortalNavbarReducer],
  [portalNavbarAction.setIsTabletActive, setIsTabletActive_PortalNavbarReducer],
  [portalNavbarAction.setIsWebcamActive, setIsWebcamActive_PortalNavbarReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT REVIEW
  // ╰─────────────────────────────────────────────────────────────────╯
  [
    portalNavbarAction.setIsProductReviewActive,
    setIsProductReviewActive_PortalNavbarReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    REPAIR CATEGORY
  // ╰─────────────────────────────────────────────────────────────────╯
  [portalNavbarAction.setIsRepairActive, setIsRepairActive_PortalNavbarReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TRANSACTION
  // ╰─────────────────────────────────────────────────────────────────╯
  [portalNavbarAction.setIsTransactionActive, setIsTransactionActive_PortalNavbarReducer],
  [portalNavbarAction.setIsPurchaseActive, setIsPurchaseActive_PortalNavbarReducer],
  [portalNavbarAction.setIsRMAActive, setIsRMAActive_PortalNavbarReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMPANY
  // ╰─────────────────────────────────────────────────────────────────╯
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

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GENERAL
  // ╰─────────────────────────────────────────────────────────────────╯
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

  // ╭─────────────────────────────────────────────────────────────────╮
  //    OUTREACH
  // ╰─────────────────────────────────────────────────────────────────╯
  [portalNavbarAction.setIsOutreachActive, setIsOutreachActive_PortalNavbarReducer],
  [
    portalNavbarAction.setIsAnnouncementActive,
    setIsAnnouncementActive_PortalNavbarReducer,
  ],
  [portalNavbarAction.setIsSurveyActive, setIsSurveyActive_PortalNavbarReducer],
  [portalNavbarAction.setIsEventActive, setIsEventActive_PortalNavbarReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DIRECTORY
  // ╰─────────────────────────────────────────────────────────────────╯
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
  setIsComputerCaseActive_PortalNavbarReducer,
  setIsCPUActive_PortalNavbarReducer,
  setIsCustomerActive_PortalNavbarReducer,
  setIsDashboardActive_PortalNavbarReducer,
  setIsDesktopComputerActive_PortalNavbarReducer,
  setIsDirectoryActive_PortalNavbarReducer,
  setIsDisplayActive_PortalNavbarReducer,
  setIsEndorsementActive_PortalNavbarReducer,
  setIsEventActive_PortalNavbarReducer,
  setIsExpenseClaimActive_PortalNavbarReducer,
  setIsFileUploadActive_PortalNavbarReducer,
  setIsGeneralActive_PortalNavbarReducer,
  setIsGPUActive_PortalNavbarReducer,
  setIsHomeActive_PortalNavbarReducer,
  setIsLaptopActive_PortalNavbarReducer,
  setIsLeaveRequestActive_PortalNavbarReducer,
  setIsMicrophoneActive_PortalNavbarReducer,
  setIsMotherboardActive_PortalNavbarReducer,
  setIsMouseActive_PortalNavbarReducer,
  setIsOutreachActive_PortalNavbarReducer,
  setIsPrinterIssueActive_PortalNavbarReducer,
  setIsProductAccessoryActive_PortalNavbarReducer,
  setIsProductActive_PortalNavbarReducer,
  setIsProductReviewActive_PortalNavbarReducer,
  setIsPSUActive_PortalNavbarReducer,
  setIsPurchaseActive_PortalNavbarReducer,
  setIsRAMActive_PortalNavbarReducer,
  setIsRefermentActive_PortalNavbarReducer,
  setIsRepairActive_PortalNavbarReducer,
  setIsRequestResourceActive_PortalNavbarReducer,
  setIsRMAActive_PortalNavbarReducer,
  setIsSmartphoneActive_PortalNavbarReducer,
  setIsSpeakerActive_PortalNavbarReducer,
  setIsStorageActive_PortalNavbarReducer,
  setIsSurveyActive_PortalNavbarReducer,
  setIsTabletActive_PortalNavbarReducer,
  setIsTransactionActive_PortalNavbarReducer,
  setIsWebcamActive_PortalNavbarReducer,
};
