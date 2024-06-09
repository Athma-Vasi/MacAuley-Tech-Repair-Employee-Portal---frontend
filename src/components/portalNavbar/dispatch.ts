import { PortalNavbarAction } from "./actions";
import { PortalNavbarState } from "./types";

type PortalNavbarDispatch =
  | {
      type: PortalNavbarAction["setIsHomeActive"];
      payload: PortalNavbarState["isHomeActive"];
    }
  | {
      type: PortalNavbarAction["setIsDashboardActive"];
      payload: PortalNavbarState["isDashboardActive"];
    }
  | {
      type: PortalNavbarAction["setIsCustomerActive"];
      payload: PortalNavbarState["isCustomerActive"];
    }
  | {
      type: PortalNavbarAction["setIsCommentActive"];
      payload: PortalNavbarState["isCommentActive"];
    }
  | {
      type: PortalNavbarAction["setIsFileUploadActive"];
      payload: PortalNavbarState["isFileUploadActive"];
    }
  | {
      type: PortalNavbarAction["setIsProductActive"];
      payload: PortalNavbarState["isProductActive"];
    }
  | {
      type: PortalNavbarAction["setIsRepairActive"];
      payload: PortalNavbarState["isRepairActive"];
    }
  | {
      type: PortalNavbarAction["setIsCompanyActive"];
      payload: PortalNavbarState["isCompanyActive"];
    }
  | {
      type: PortalNavbarAction["setIsAddressChangeActive"];
      payload: PortalNavbarState["isAddressChangeActive"];
    }
  | {
      type: PortalNavbarAction["setIsBenefitActive"];
      payload: PortalNavbarState["isBenefitActive"];
    }
  | {
      type: PortalNavbarAction["setIsExpenseClaimActive"];
      payload: PortalNavbarState["isExpenseClaimActive"];
    }
  | {
      type: PortalNavbarAction["setIsLeaveRequestActive"];
      payload: PortalNavbarState["isLeaveRequestActive"];
    }
  | {
      type: PortalNavbarAction["setIsRequestResourceActive"];
      payload: PortalNavbarState["isRequestResourceActive"];
    }
  | {
      type: PortalNavbarAction["setIsGeneralActive"];
      payload: PortalNavbarState["isGeneralActive"];
    }
  | {
      type: PortalNavbarAction["setIsEndorsementActive"];
      payload: PortalNavbarState["isEndorsementActive"];
    }
  | {
      type: PortalNavbarAction["setIsPrinterIssueActive"];
      payload: PortalNavbarState["isPrinterIssueActive"];
    }
  | {
      type: PortalNavbarAction["setIsAnonymousRequestActive"];
      payload: PortalNavbarState["isAnonymousRequestActive"];
    }
  | {
      type: PortalNavbarAction["setIsRefermentActive"];
      payload: PortalNavbarState["isRefermentActive"];
    }
  | {
      type: PortalNavbarAction["setIsOutreachActive"];
      payload: PortalNavbarState["isOutreachActive"];
    }
  | {
      type: PortalNavbarAction["setIsAnnouncementActive"];
      payload: PortalNavbarState["isAnnouncementActive"];
    }
  | {
      type: PortalNavbarAction["setIsSurveyActive"];
      payload: PortalNavbarState["isSurveyActive"];
    }
  | {
      type: PortalNavbarAction["setIsEventActive"];
      payload: PortalNavbarState["isEventActive"];
    }
  | {
      type: PortalNavbarAction["setIsDirectoryActive"];
      payload: PortalNavbarState["isDirectoryActive"];
    };

export type { PortalNavbarDispatch };
