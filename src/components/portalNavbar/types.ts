type PortalNavbarProps = {
  openedNavbar: boolean;
};

// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    PORTAL NAVBAR STATE
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
// contains the active states of the navlinks
type PortalNavbarState = {
  // ╭─────────────────────────────────────────────────────────────────╮
  //    HOME
  // ╰─────────────────────────────────────────────────────────────────╯
  isHomeActive: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DASHBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  isDashboardActive: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CUSTOMER
  // ╰─────────────────────────────────────────────────────────────────╯
  isCustomerActive: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMMENT
  // ╰─────────────────────────────────────────────────────────────────╯
  isCommentActive: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    FILE UPLOAD
  // ╰─────────────────────────────────────────────────────────────────╯
  isFileUploadActive: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT CATEGORY
  // ╰─────────────────────────────────────────────────────────────────╯
  isProductActive: boolean;
  isProductAccessoryActive: boolean;
  isCPUActive: boolean;
  isComputerCaseActive: boolean;
  isDesktopComputerActive: boolean;
  isDisplayActive: boolean;
  isGPUActive: boolean;
  isHeadphoneActive: boolean;
  isKeyboardActive: boolean;
  isLaptopActive: boolean;
  isRAMActive: boolean;
  isMicrophoneActive: boolean;
  isMotherboardActive: boolean;
  isMouseActive: boolean;
  isPSUActive: boolean;
  isSmartphoneActive: boolean;
  isSpeakerActive: boolean;
  isStorageActive: boolean;
  isTabletActive: boolean;
  isWebcamActive: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT REVIEW
  // ╰─────────────────────────────────────────────────────────────────╯
  isProductReviewActive: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    REPAIR CATEGORY
  // ╰─────────────────────────────────────────────────────────────────╯
  isRepairActive: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TRANSACTION
  // ╰─────────────────────────────────────────────────────────────────╯
  isTransactionActive: boolean;
  isPurchaseActive: boolean;
  isRMAActive: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMPANY
  // ╰─────────────────────────────────────────────────────────────────╯
  isCompanyActive: boolean;
  isAddressChangeActive: boolean;
  isBenefitActive: boolean;
  isExpenseClaimActive: boolean;
  isLeaveRequestActive: boolean;
  isRequestResourceActive: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GENERAL
  // ╰─────────────────────────────────────────────────────────────────╯
  isGeneralActive: boolean;
  isEndorsementActive: boolean;
  isPrinterIssueActive: boolean;
  isAnonymousRequestActive: boolean;
  isRefermentActive: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    OUTREACH
  // ╰─────────────────────────────────────────────────────────────────╯
  isOutreachActive: boolean;
  isAnnouncementActive: boolean;
  isSurveyActive: boolean;
  isEventActive: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DIRECTORY
  // ╰─────────────────────────────────────────────────────────────────╯
  isDirectoryActive: boolean;
};

export type { PortalNavbarProps, PortalNavbarState };
