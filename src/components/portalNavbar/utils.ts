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

/**
 * @description Returns the appropriate [state, action] based on the pathname.
 * - triggered inside useEffect when pathname (from useLocation hook) changes
 * - consumed by the portalNavbarDispatch function
 * - used to ensure that any location change in the app triggered from outside the navbar (clicking on breadcrumbs link, etc.) will update the navbar links active state
 */
function returnPortalNavbarStateActionTuple({
  pathname,
  portalNavbarAction,
  portalNavbarState,
}: ReturnPortalNavbarStateActionTupleInput): ReturnPortalNavbarStateActionTupleOutput {
  const locationStateActionTupleMap: Record<
    string, // pathname
    [
      PortalNavbarState[keyof PortalNavbarState],
      PortalNavbarAction[keyof PortalNavbarAction]
    ]
  > = {
    // home
    home: [portalNavbarState.isHomeActive, portalNavbarAction.setIsHomeActive],

    // dashboard
    dashboard: [
      portalNavbarState.isDashboardActive,
      portalNavbarAction.setIsDashboardActive,
    ],

    // customer
    customer: [
      portalNavbarState.isCustomerActive,
      portalNavbarAction.setIsCustomerActive,
    ],

    // comment
    comment: [portalNavbarState.isCommentActive, portalNavbarAction.setIsCommentActive],

    // file upload
    fileUpload: [
      portalNavbarState.isFileUploadActive,
      portalNavbarAction.setIsFileUploadActive,
    ],

    // product
    product: [portalNavbarState.isProductActive, portalNavbarAction.setIsProductActive],
    // product => accessory
    accessory: [
      portalNavbarState.isProductAccessoryActive,
      portalNavbarAction.setIsProductAccessoryActive,
    ],
    // product => cpu
    cpu: [portalNavbarState.isCPUActive, portalNavbarAction.setIsCPUActive],
    // product => computer case
    computerCase: [
      portalNavbarState.isComputerCaseActive,
      portalNavbarAction.setIsComputerCaseActive,
    ],
    // product => desktop computer
    desktopComputer: [
      portalNavbarState.isDesktopComputerActive,
      portalNavbarAction.setIsDesktopComputerActive,
    ],
    // product => display
    display: [portalNavbarState.isDisplayActive, portalNavbarAction.setIsDisplayActive],
    // product => gpu
    gpu: [portalNavbarState.isGPUActive, portalNavbarAction.setIsGPUActive],
    // product => headphone
    headphone: [
      portalNavbarState.isHeadphoneActive,
      portalNavbarAction.setIsHeadphoneActive,
    ],
    // product => keyboard
    keyboard: [
      portalNavbarState.isKeyboardActive,
      portalNavbarAction.setIsKeyboardActive,
    ],
    // product => laptop
    laptop: [portalNavbarState.isLaptopActive, portalNavbarAction.setIsLaptopActive],
    // product => ram
    ram: [portalNavbarState.isRAMActive, portalNavbarAction.setIsRAMActive],
    // product => microphone
    microphone: [
      portalNavbarState.isMicrophoneActive,
      portalNavbarAction.setIsMicrophoneActive,
    ],
    // product => motherboard
    motherboard: [
      portalNavbarState.isMotherboardActive,
      portalNavbarAction.setIsMotherboardActive,
    ],
    // product => mouse
    mouse: [portalNavbarState.isMouseActive, portalNavbarAction.setIsMouseActive],
    // product => psu
    psu: [portalNavbarState.isPSUActive, portalNavbarAction.setIsPSUActive],
    // product => smartphone
    smartphone: [
      portalNavbarState.isSmartphoneActive,
      portalNavbarAction.setIsSmartphoneActive,
    ],
    // product => speaker
    speaker: [portalNavbarState.isSpeakerActive, portalNavbarAction.setIsSpeakerActive],
    // product => storage
    storage: [portalNavbarState.isStorageActive, portalNavbarAction.setIsStorageActive],
    // product => tablet
    tablet: [portalNavbarState.isTabletActive, portalNavbarAction.setIsTabletActive],
    // product => webcam
    webcam: [portalNavbarState.isWebcamActive, portalNavbarAction.setIsWebcamActive],
    // product review
    productReview: [
      portalNavbarState.isProductReviewActive,
      portalNavbarAction.setIsProductReviewActive,
    ],

    // repair
    repair: [portalNavbarState.isRepairActive, portalNavbarAction.setIsRepairActive],
    // repair => computer component
    computerComponent: [
      portalNavbarState.isComputerComponentActive,
      portalNavbarAction.setIsComputerComponentActive,
    ],
    // repair => peripheral
    peripheral: [
      portalNavbarState.isPeripheralActive,
      portalNavbarAction.setIsPeripheralActive,
    ],
    // repair => electronic device
    electronicDevice: [
      portalNavbarState.isElectronicDeviceActive,
      portalNavbarAction.setIsElectronicDeviceActive,
    ],
    // repair => mobile device
    mobileDevice: [
      portalNavbarState.isMobileDeviceActive,
      portalNavbarAction.setIsMobileDeviceActive,
    ],
    // repair => audio video
    audioVideo: [
      portalNavbarState.isAudioVideoActive,
      portalNavbarAction.setIsAudioVideoActive,
    ],
    // repair => accessory
    repairAccessory: [
      portalNavbarState.isRepairAccessoryActive,
      portalNavbarAction.setIsRepairAccessoryActive,
    ],

    // transaction
    transaction: [
      portalNavbarState.isTransactionActive,
      portalNavbarAction.setIsTransactionActive,
    ],
    // transaction => purchase
    purchase: [
      portalNavbarState.isPurchaseActive,
      portalNavbarAction.setIsPurchaseActive,
    ],
    // transaction => rma
    rma: [portalNavbarState.isRMAActive, portalNavbarAction.setIsRMAActive],

    // company
    company: [portalNavbarState.isCompanyActive, portalNavbarAction.setIsCompanyActive],
    // company => address change
    addressChange: [
      portalNavbarState.isAddressChangeActive,
      portalNavbarAction.setIsAddressChangeActive,
    ],
    // company => benefit
    benefit: [portalNavbarState.isBenefitActive, portalNavbarAction.setIsBenefitActive],
    // company => expense claim
    expenseClaim: [
      portalNavbarState.isExpenseClaimActive,
      portalNavbarAction.setIsExpenseClaimActive,
    ],
    // company => leave request
    leaveRequest: [
      portalNavbarState.isLeaveRequestActive,
      portalNavbarAction.setIsLeaveRequestActive,
    ],
    // company => request resource
    requestResource: [
      portalNavbarState.isRequestResourceActive,
      portalNavbarAction.setIsRequestResourceActive,
    ],

    // general
    general: [portalNavbarState.isGeneralActive, portalNavbarAction.setIsGeneralActive],
    // general => endorsement
    endorsement: [
      portalNavbarState.isEndorsementActive,
      portalNavbarAction.setIsEndorsementActive,
    ],
    // general => printer issue
    printerIssue: [
      portalNavbarState.isPrinterIssueActive,
      portalNavbarAction.setIsPrinterIssueActive,
    ],
    // general => anonymous request
    anonymousRequest: [
      portalNavbarState.isAnonymousRequestActive,
      portalNavbarAction.setIsAnonymousRequestActive,
    ],
    // general => referment
    referment: [
      portalNavbarState.isRefermentActive,
      portalNavbarAction.setIsRefermentActive,
    ],

    // outreach
    outreach: [
      portalNavbarState.isOutreachActive,
      portalNavbarAction.setIsOutreachActive,
    ],
    // outreach => announcement
    announcement: [
      portalNavbarState.isAnnouncementActive,
      portalNavbarAction.setIsAnnouncementActive,
    ],
    // outreach => survey
    survey: [portalNavbarState.isSurveyActive, portalNavbarAction.setIsSurveyActive],
    // outreach => event
    event: [portalNavbarState.isEventActive, portalNavbarAction.setIsEventActive],

    // directory
    directory: [
      portalNavbarState.isDirectoryActive,
      portalNavbarAction.setIsDirectoryActive,
    ],
  };

  return locationStateActionTupleMap[pathname];
}

export { returnPortalNavbarStateActionTuple };
