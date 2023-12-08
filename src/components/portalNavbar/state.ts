import { PortalNavbarState } from "./types";

// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    INITIAL STATE
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
const initialPortalNavbarState: PortalNavbarState = {
  // ╭─────────────────────────────────────────────────────────────────╮
  //    HOME
  // ╰─────────────────────────────────────────────────────────────────╯
  isHomeActive: true,

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DASHBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  isDashboardActive: false,

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CUSTOMER
  // ╰─────────────────────────────────────────────────────────────────╯
  isCustomerActive: false,

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMMENT
  // ╰─────────────────────────────────────────────────────────────────╯
  isCommentActive: false,

  // ╭─────────────────────────────────────────────────────────────────╮
  //    FILE UPLOAD
  // ╰─────────────────────────────────────────────────────────────────╯
  isFileUploadActive: false,

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT
  // ╰─────────────────────────────────────────────────────────────────╯
  isProductActive: false,
  isProductAccessoryActive: false,
  isCPUActive: false,
  isComputerCaseActive: false,
  isDesktopComputerActive: false,
  isDisplayActive: false,
  isGPUActive: false,
  isHeadphoneActive: false,
  isKeyboardActive: false,
  isLaptopActive: false,
  isRAMActive: false,
  isMicrophoneActive: false,
  isMotherboardActive: false,
  isMouseActive: false,
  isPSUActive: false,
  isSmartphoneActive: false,
  isSpeakerActive: false,
  isStorageActive: false,
  isTabletActive: false,
  isWebcamActive: false,

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT REVIEW
  // ╰─────────────────────────────────────────────────────────────────╯
  isProductReviewActive: false,

  // ╭─────────────────────────────────────────────────────────────────╮
  //    REPAIR
  // ╰─────────────────────────────────────────────────────────────────╯
  isRepairActive: false,

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TRANSACTION
  // ╰─────────────────────────────────────────────────────────────────╯
  isTransactionActive: false,
  isPurchaseActive: false,
  isRMAActive: false,

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMPANY
  // ╰─────────────────────────────────────────────────────────────────╯
  isCompanyActive: false,
  isAddressChangeActive: false,
  isBenefitActive: false,
  isExpenseClaimActive: false,
  isLeaveRequestActive: false,
  isRequestResourceActive: false,

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GENERAL
  // ╰─────────────────────────────────────────────────────────────────╯
  isGeneralActive: false,
  isEndorsementActive: false,
  isPrinterIssueActive: false,
  isAnonymousRequestActive: false,
  isRefermentActive: false,

  // ╭─────────────────────────────────────────────────────────────────╮
  //    OUTREACH
  // ╰─────────────────────────────────────────────────────────────────╯
  isOutreachActive: false,
  isAnnouncementActive: false,
  isSurveyActive: false,
  isEventActive: false,

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DIRECTORY
  // ╰─────────────────────────────────────────────────────────────────╯
  isDirectoryActive: false,
};

export { initialPortalNavbarState };
