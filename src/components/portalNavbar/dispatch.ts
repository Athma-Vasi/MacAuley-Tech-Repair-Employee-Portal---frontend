// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    PORTAL NAVBAR DISPATCH
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import { PortalNavbarAction } from "./actions";
import { PortalNavbarState } from "./types";

// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
type PortalNavbarDispatch =
  // ╭─────────────────────────────────────────────────────────────────╮
  //    HOME
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: PortalNavbarAction["setIsHomeActive"];
      payload: PortalNavbarState["isHomeActive"];
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    DASHBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: PortalNavbarAction["setIsDashboardActive"];
      payload: PortalNavbarState["isDashboardActive"];
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    CUSTOMER
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: PortalNavbarAction["setIsCustomerActive"];
      payload: PortalNavbarState["isCustomerActive"];
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMMENT
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: PortalNavbarAction["setIsCommentActive"];
      payload: PortalNavbarState["isCommentActive"];
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    FILE UPLOAD
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: PortalNavbarAction["setIsFileUploadActive"];
      payload: PortalNavbarState["isFileUploadActive"];
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT CATEGORY
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: PortalNavbarAction["setIsProductActive"];
      payload: PortalNavbarState["isProductActive"];
    }
  | {
      type: PortalNavbarAction["setIsProductAccessoryActive"];
      payload: PortalNavbarState["isProductAccessoryActive"];
    }
  | {
      type: PortalNavbarAction["setIsCPUActive"];
      payload: PortalNavbarState["isCPUActive"];
    }
  | {
      type: PortalNavbarAction["setIsComputerCaseActive"];
      payload: PortalNavbarState["isComputerCaseActive"];
    }
  | {
      type: PortalNavbarAction["setIsDesktopComputerActive"];
      payload: PortalNavbarState["isDesktopComputerActive"];
    }
  | {
      type: PortalNavbarAction["setIsDisplayActive"];
      payload: PortalNavbarState["isDisplayActive"];
    }
  | {
      type: PortalNavbarAction["setIsGPUActive"];
      payload: PortalNavbarState["isGPUActive"];
    }
  | {
      type: PortalNavbarAction["setIsHeadphoneActive"];
      payload: PortalNavbarState["isHeadphoneActive"];
    }
  | {
      type: PortalNavbarAction["setIsKeyboardActive"];
      payload: PortalNavbarState["isKeyboardActive"];
    }
  | {
      type: PortalNavbarAction["setIsLaptopActive"];
      payload: PortalNavbarState["isLaptopActive"];
    }
  | {
      type: PortalNavbarAction["setIsRAMActive"];
      payload: PortalNavbarState["isRAMActive"];
    }
  | {
      type: PortalNavbarAction["setIsMicrophoneActive"];
      payload: PortalNavbarState["isMicrophoneActive"];
    }
  | {
      type: PortalNavbarAction["setIsMotherboardActive"];
      payload: PortalNavbarState["isMotherboardActive"];
    }
  | {
      type: PortalNavbarAction["setIsMouseActive"];
      payload: PortalNavbarState["isMouseActive"];
    }
  | {
      type: PortalNavbarAction["setIsPSUActive"];
      payload: PortalNavbarState["isPSUActive"];
    }
  | {
      type: PortalNavbarAction["setIsSmartphoneActive"];
      payload: PortalNavbarState["isSmartphoneActive"];
    }
  | {
      type: PortalNavbarAction["setIsSpeakerActive"];
      payload: PortalNavbarState["isSpeakerActive"];
    }
  | {
      type: PortalNavbarAction["setIsStorageActive"];
      payload: PortalNavbarState["isStorageActive"];
    }
  | {
      type: PortalNavbarAction["setIsTabletActive"];
      payload: PortalNavbarState["isTabletActive"];
    }
  | {
      type: PortalNavbarAction["setIsWebcamActive"];
      payload: PortalNavbarState["isWebcamActive"];
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT REVIEW
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: PortalNavbarAction["setIsProductReviewActive"];
      payload: PortalNavbarState["isProductReviewActive"];
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    REPAIR CATEGORY
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: PortalNavbarAction["setIsRepairActive"];
      payload: PortalNavbarState["isRepairActive"];
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    TRANSACTION
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: PortalNavbarAction["setIsTransactionActive"];
      payload: PortalNavbarState["isTransactionActive"];
    }
  | {
      type: PortalNavbarAction["setIsPurchaseActive"];
      payload: PortalNavbarState["isPurchaseActive"];
    }
  | {
      type: PortalNavbarAction["setIsRMAActive"];
      payload: PortalNavbarState["isRMAActive"];
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMPANY
  // ╰─────────────────────────────────────────────────────────────────╯
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
  // ╭─────────────────────────────────────────────────────────────────╮
  //    GENERAL
  // ╰─────────────────────────────────────────────────────────────────╯
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
  // ╭─────────────────────────────────────────────────────────────────╮
  //    OUTREACH
  // ╰─────────────────────────────────────────────────────────────────╯
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
  // ╭─────────────────────────────────────────────────────────────────╮
  //    DIRECTORY
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: PortalNavbarAction["setIsDirectoryActive"];
      payload: PortalNavbarState["isDirectoryActive"];
    };

export type { PortalNavbarDispatch };
