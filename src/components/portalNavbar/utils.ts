import { PortalNavbarAction } from "./actions";
import { PortalNavbarState } from "./types";

type ReturnPortalNavbarStateActionTupleInput = {
  pathname: string;
  portalNavbarAction: PortalNavbarAction;
  portalNavbarState: PortalNavbarState;
};

type ReturnPortalNavbarStateActionTupleOutput = [
  PortalNavbarState[keyof PortalNavbarState],
  PortalNavbarAction[keyof PortalNavbarAction]
];

function returnPortalNavbarStateActionTuple({
  pathname,
  portalNavbarAction,
  portalNavbarState,
}: ReturnPortalNavbarStateActionTupleInput): ReturnPortalNavbarStateActionTupleOutput {
  const locationStateActionTupleMap: Record<
    string,
    [
      PortalNavbarState[keyof PortalNavbarState],
      PortalNavbarAction[keyof PortalNavbarAction]
    ]
  > = {
    home: [portalNavbarState.isHomeActive, portalNavbarAction.setIsHomeActive],

    dashboard: [
      portalNavbarState.isDashboardActive,
      portalNavbarAction.setIsDashboardActive,
    ],

    customer: [
      portalNavbarState.isCustomerActive,
      portalNavbarAction.setIsCustomerActive,
    ],

    comment: [portalNavbarState.isCommentActive, portalNavbarAction.setIsCommentActive],

    fileUpload: [
      portalNavbarState.isFileUploadActive,
      portalNavbarAction.setIsFileUploadActive,
    ],

    product: [portalNavbarState.isProductActive, portalNavbarAction.setIsProductActive],

    repair: [portalNavbarState.isRepairActive, portalNavbarAction.setIsRepairActive],

    company: [portalNavbarState.isCompanyActive, portalNavbarAction.setIsCompanyActive],
    addressChange: [
      portalNavbarState.isAddressChangeActive,
      portalNavbarAction.setIsAddressChangeActive,
    ],
    benefit: [portalNavbarState.isBenefitActive, portalNavbarAction.setIsBenefitActive],
    expenseClaim: [
      portalNavbarState.isExpenseClaimActive,
      portalNavbarAction.setIsExpenseClaimActive,
    ],
    leaveRequest: [
      portalNavbarState.isLeaveRequestActive,
      portalNavbarAction.setIsLeaveRequestActive,
    ],
    requestResource: [
      portalNavbarState.isRequestResourceActive,
      portalNavbarAction.setIsRequestResourceActive,
    ],

    general: [portalNavbarState.isGeneralActive, portalNavbarAction.setIsGeneralActive],
    endorsement: [
      portalNavbarState.isEndorsementActive,
      portalNavbarAction.setIsEndorsementActive,
    ],
    printerIssue: [
      portalNavbarState.isPrinterIssueActive,
      portalNavbarAction.setIsPrinterIssueActive,
    ],
    anonymousRequest: [
      portalNavbarState.isAnonymousRequestActive,
      portalNavbarAction.setIsAnonymousRequestActive,
    ],
    referment: [
      portalNavbarState.isRefermentActive,
      portalNavbarAction.setIsRefermentActive,
    ],

    outreach: [
      portalNavbarState.isOutreachActive,
      portalNavbarAction.setIsOutreachActive,
    ],
    announcement: [
      portalNavbarState.isAnnouncementActive,
      portalNavbarAction.setIsAnnouncementActive,
    ],
    survey: [portalNavbarState.isSurveyActive, portalNavbarAction.setIsSurveyActive],
    event: [portalNavbarState.isEventActive, portalNavbarAction.setIsEventActive],

    directory: [
      portalNavbarState.isDirectoryActive,
      portalNavbarAction.setIsDirectoryActive,
    ],
  };

  return locationStateActionTupleMap[pathname];
}

export { returnPortalNavbarStateActionTuple };
