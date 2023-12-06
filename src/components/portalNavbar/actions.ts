// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    PORTAL NAVBAR ACTION OBJECT
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

const portalNavbarAction = {
  // ╭─────────────────────────────────────────────────────────────────╮
  //    HOME
  // ╰─────────────────────────────────────────────────────────────────╯
  setIsHomeActive: "setIsHomeActive",

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DASHBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  setIsDashboardActive: "setIsDashboardActive",

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CUSTOMER
  // ╰─────────────────────────────────────────────────────────────────╯
  setIsCustomerActive: "setIsCustomerActive",

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMMENT
  // ╰─────────────────────────────────────────────────────────────────╯
  setIsCommentActive: "setIsCommentActive",

  // ╭─────────────────────────────────────────────────────────────────╮
  //    FILE UPLOAD
  // ╰─────────────────────────────────────────────────────────────────╯
  setIsFileUploadActive: "setIsFileUploadActive",

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT CATEGORY
  // ╰─────────────────────────────────────────────────────────────────╯
  setIsProductActive: "setIsProductActive",
  setIsProductAccessoryActive: "setIsProductAccessoryActive",
  setIsCPUActive: "setIsCPUActive",
  setIsComputerCaseActive: "setIsComputerCaseActive",
  setIsDesktopComputerActive: "setIsDesktopComputerActive",
  setIsDisplayActive: "setIsDisplayActive",
  setIsGPUActive: "setIsGPUActive",
  setIsHeadphoneActive: "setIsHeadphoneActive",
  setIsKeyboardActive: "setIsKeyboardActive",
  setIsLaptopActive: "setIsLaptopActive",
  setIsRAMActive: "setIsRAMActive",
  setIsMicrophoneActive: "setIsMicrophoneActive",
  setIsMotherboardActive: "setIsMotherboardActive",
  setIsMouseActive: "setIsMouseActive",
  setIsPSUActive: "setIsPSUActive",
  setIsSmartphoneActive: "setIsSmartphoneActive",
  setIsSpeakerActive: "setIsSpeakerActive",
  setIsStorageActive: "setIsStorageActive",
  setIsTabletActive: "setIsTabletActive",
  setIsWebcamActive: "setIsWebcamActive",

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT REVIEW
  // ╰─────────────────────────────────────────────────────────────────╯
  setIsProductReviewActive: "setIsProductReviewActive",

  // ╭─────────────────────────────────────────────────────────────────╮
  //    REPAIR CATEGORY
  // ╰─────────────────────────────────────────────────────────────────╯
  setIsRepairActive: "setIsRepairActive",
  setIsComputerComponentActive: "setIsComputerComponentActive",
  setIsPeripheralActive: "setIsPeripheralActive",
  setIsElectronicDeviceActive: "setIsElectronicDeviceActive",
  setIsMobileDeviceActive: "setIsMobileDeviceActive",
  setIsAudioVideoActive: "setIsAudioVideoActive",
  setIsRepairAccessoryActive: "setIsRepairAccessoryActive",

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TRANSACTION
  // ╰─────────────────────────────────────────────────────────────────╯
  setIsTransactionActive: "setIsTransactionActive",
  setIsPurchaseActive: "setIsPurchaseActive",
  setIsRMAActive: "setIsRMAActive",

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMPANY
  // ╰─────────────────────────────────────────────────────────────────╯
  setIsCompanyActive: "setIsCompanyActive",
  setIsAddressChangeActive: "setIsAddressChangeActive",
  setIsBenefitActive: "setIsBenefitActive",
  setIsExpenseClaimActive: "setIsExpenseClaimActive",
  setIsLeaveRequestActive: "setIsLeaveRequestActive",
  setIsRequestResourceActive: "setIsRequestResourceActive",

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GENERAL
  // ╰─────────────────────────────────────────────────────────────────╯
  setIsGeneralActive: "setIsGeneralActive",
  setIsEndorsementActive: "setIsEndorsementActive",
  setIsPrinterIssueActive: "setIsPrinterIssueActive",
  setIsAnonymousRequestActive: "setIsAnonymousRequestActive",
  setIsRefermentActive: "setIsRefermentActive",

  // ╭─────────────────────────────────────────────────────────────────╮
  //    OUTREACH
  // ╰─────────────────────────────────────────────────────────────────╯
  setIsOutreachActive: "setIsOutreachActive",
  setIsAnnouncementActive: "setIsAnnouncementActive",
  setIsSurveyActive: "setIsSurveyActive",
  setIsEventActive: "setIsEventActive",

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DIRECTORY
  // ╰─────────────────────────────────────────────────────────────────╯
  setIsDirectoryActive: "setIsDirectoryActive",
};

type PortalNavbarAction = typeof portalNavbarAction;

export { portalNavbarAction };
export type { PortalNavbarAction };
