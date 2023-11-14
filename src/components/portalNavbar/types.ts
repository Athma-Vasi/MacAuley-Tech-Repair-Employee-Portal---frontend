type PortalNavbarProps = {
  openedNavbar: boolean;
};

type PortalNavbarState = {
  // navlinks active states
  isHomeActive: boolean;
  isDashboardActive: boolean;
  isProductActive: boolean;
  isNotesActive: boolean;

  // company
  isCompanyActive: boolean;
  isAddressChangeActive: boolean;
  isBenefitActive: boolean;
  isExpenseClaimActive: boolean;
  isLeaveRequestActive: boolean;
  isRequestResourceActive: boolean;

  // general
  isGeneralActive: boolean;
  isEndorsementActive: boolean;
  isPrinterIssueActive: boolean;
  isAnonymousRequestActive: boolean;
  isRefermentActive: boolean;

  // outreach
  isOutreachActive: boolean;
  isAnnouncementActive: boolean;
  isSurveyActive: boolean;
  isEventActive: boolean;

  isDirectoryActive: boolean;
};

type PortalNavbarAction = {
  setIsHomeActive: 'setIsHomeActive';
  setIsDashboardActive: 'setIsDashboardActive';
  setIsProductActive: 'setIsProductActive';
  setIsNotesActive: 'setIsNotesActive';

  // company
  setIsCompanyActive: 'setIsCompanyActive';
  setIsAddressChangeActive: 'setIsAddressChangeActive';
  setIsBenefitActive: 'setIsBenefitActive';
  setIsExpenseClaimActive: 'setIsExpenseClaimActive';
  setIsLeaveRequestActive: 'setIsLeaveRequestActive';
  setIsRequestResourceActive: 'setIsRequestResourceActive';

  // general
  setIsGeneralActive: 'setIsGeneralActive';
  setIsEndorsementActive: 'setIsEndorsementActive';
  setIsPrinterIssueActive: 'setIsPrinterIssueActive';
  setIsAnonymousRequestActive: 'setIsAnonymousRequestActive';
  setIsRefermentActive: 'setIsRefermentActive';

  // outreach
  setIsOutreachActive: 'setIsOutreachActive';
  setIsAnnouncementActive: 'setIsAnnouncementActive';
  setIsSurveyActive: 'setIsSurveyActive';
  setIsEventActive: 'setIsEventActive';

  setIsDirectoryActive: 'setIsDirectoryActive';
};

type PortalNavbarDispatch = {
  // navlinks active states
  type:
    | PortalNavbarAction['setIsAddressChangeActive']
    | PortalNavbarAction['setIsAnnouncementActive']
    | PortalNavbarAction['setIsAnonymousRequestActive']
    | PortalNavbarAction['setIsBenefitActive']
    | PortalNavbarAction['setIsCompanyActive']
    | PortalNavbarAction['setIsDashboardActive']
    | PortalNavbarAction['setIsDirectoryActive']
    | PortalNavbarAction['setIsEndorsementActive']
    | PortalNavbarAction['setIsEventActive']
    | PortalNavbarAction['setIsExpenseClaimActive']
    | PortalNavbarAction['setIsGeneralActive']
    | PortalNavbarAction['setIsHomeActive']
    | PortalNavbarAction['setIsLeaveRequestActive']
    | PortalNavbarAction['setIsNotesActive']
    | PortalNavbarAction['setIsOutreachActive']
    | PortalNavbarAction['setIsPrinterIssueActive']
    | PortalNavbarAction['setIsProductActive']
    | PortalNavbarAction['setIsRefermentActive']
    | PortalNavbarAction['setIsRequestResourceActive']
    | PortalNavbarAction['setIsSurveyActive'];

  payload: boolean;
};

type PortalNavbarReducer = (
  state: PortalNavbarState,
  action: PortalNavbarDispatch
) => PortalNavbarState;

export type {
  PortalNavbarAction,
  PortalNavbarDispatch,
  PortalNavbarProps,
  PortalNavbarReducer,
  PortalNavbarState,
};
