type PortalNavbarProps = {
  openedNavbar: boolean;
};

type PortalNavbarState = {
  // navlinks active states
  isHomeActive: boolean;
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
    | PortalNavbarAction['setIsHomeActive']
    | PortalNavbarAction['setIsNotesActive']
    | PortalNavbarAction['setIsCompanyActive']
    | PortalNavbarAction['setIsAddressChangeActive']
    | PortalNavbarAction['setIsBenefitActive']
    | PortalNavbarAction['setIsExpenseClaimActive']
    | PortalNavbarAction['setIsLeaveRequestActive']
    | PortalNavbarAction['setIsRequestResourceActive']
    | PortalNavbarAction['setIsGeneralActive']
    | PortalNavbarAction['setIsEndorsementActive']
    | PortalNavbarAction['setIsPrinterIssueActive']
    | PortalNavbarAction['setIsAnonymousRequestActive']
    | PortalNavbarAction['setIsRefermentActive']
    | PortalNavbarAction['setIsOutreachActive']
    | PortalNavbarAction['setIsAnnouncementActive']
    | PortalNavbarAction['setIsSurveyActive']
    | PortalNavbarAction['setIsEventActive']
    | PortalNavbarAction['setIsDirectoryActive'];

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
