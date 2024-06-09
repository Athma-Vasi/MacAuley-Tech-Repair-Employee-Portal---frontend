type PortalNavbarProps = {
  openedNavbar: boolean;
};

type PortalNavbarState = {
  isHomeActive: boolean;
  isDashboardActive: boolean;
  isCustomerActive: boolean;
  isCommentActive: boolean;
  isFileUploadActive: boolean;
  isProductActive: boolean;
  isRepairActive: boolean;

  isCompanyActive: boolean;
  isAddressChangeActive: boolean;
  isBenefitActive: boolean;
  isExpenseClaimActive: boolean;
  isLeaveRequestActive: boolean;
  isRequestResourceActive: boolean;

  isGeneralActive: boolean;
  isEndorsementActive: boolean;
  isPrinterIssueActive: boolean;
  isAnonymousRequestActive: boolean;
  isRefermentActive: boolean;

  isOutreachActive: boolean;
  isAnnouncementActive: boolean;
  isSurveyActive: boolean;
  isEventActive: boolean;

  isDirectoryActive: boolean;
};

export type { PortalNavbarProps, PortalNavbarState };
