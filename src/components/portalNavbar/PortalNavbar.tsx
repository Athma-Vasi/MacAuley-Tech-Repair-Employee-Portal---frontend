import { Flex, Navbar, NavLink, ScrollArea, Text } from "@mantine/core";
import { useReducer } from "react";
import { CgDatabase } from "react-icons/cg";
import { GrTransaction } from "react-icons/gr";
import { MdSafetyDivider } from "react-icons/md";
import { RiSignalTowerFill } from "react-icons/ri";
import {
  TbAddressBook,
  TbBuildingWarehouse,
  TbCalendarPin,
  TbCashBanknote,
  TbChartPie3,
  TbChevronRight,
  TbCircleTriangle,
  TbCircuitResistor,
  TbDashboard,
  TbGift,
  TbHome2,
  TbNotebook,
  TbPrinterOff,
  TbReceipt2,
  TbShoppingCartPlus,
  TbSpeakerphone,
  TbTimelineEventPlus,
  TbUserCheck,
} from "react-icons/tb";
import { TiThumbsUp } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnAccessibleNavLinkElements } from "../../jsxCreators";
import { returnThemeColors } from "../../utils";
import { AccessibleNavLinkCreatorInfo } from "../wrappers";
import { portalNavbarAction } from "./actions";
import { portalNavbarReducer } from "./reducers";
import { initialPortalNavbarState } from "./state";
import { PortalNavbarProps } from "./types";

function PortalNavbar({ openedNavbar }: PortalNavbarProps) {
  const {
    globalState: { width, themeObject, height, padding },
  } = useGlobalState();
  const navigate = useNavigate();

  const [portalNavbarState, portalNavbarDispatch] = useReducer(
    portalNavbarReducer,
    initialPortalNavbarState
  );

  const {
    // ╭─────────────────────────────────────────────────────────────────╮
    //    HOME
    // ╰─────────────────────────────────────────────────────────────────╯
    isHomeActive,

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DASHBOARD
    // ╰─────────────────────────────────────────────────────────────────╯
    isDashboardActive,

    // ╭─────────────────────────────────────────────────────────────────╮
    //    CUSTOMER
    // ╰─────────────────────────────────────────────────────────────────╯
    isCustomerActive,

    // ╭─────────────────────────────────────────────────────────────────╮
    //    COMMENT
    // ╰─────────────────────────────────────────────────────────────────╯
    isCommentActive,

    // ╭─────────────────────────────────────────────────────────────────╮
    //    FILE UPLOAD
    // ╰─────────────────────────────────────────────────────────────────╯
    isFileUploadActive,

    // ╭─────────────────────────────────────────────────────────────────╮
    //    PRODUCT
    // ╰─────────────────────────────────────────────────────────────────╯
    isProductActive,
    isProductAccessoryActive,
    isCPUActive,
    isComputerCaseActive,
    isDesktopComputerActive,
    isDisplayActive,
    isGPUActive,
    isHeadphoneActive,
    isKeyboardActive,
    isLaptopActive,
    isRAMActive,
    isMicrophoneActive,
    isMotherboardActive,
    isMouseActive,
    isPSUActive,
    isSmartphoneActive,
    isSpeakerActive,
    isStorageActive,
    isTabletActive,
    isWebcamActive,

    // ╭─────────────────────────────────────────────────────────────────╮
    //    PRODUCT REVIEW
    // ╰─────────────────────────────────────────────────────────────────╯
    isProductReviewActive,

    // ╭─────────────────────────────────────────────────────────────────╮
    //    REPAIR
    // ╰─────────────────────────────────────────────────────────────────╯
    isRepairActive,

    // ╭─────────────────────────────────────────────────────────────────╮
    //    TRANSACTION
    // ╰─────────────────────────────────────────────────────────────────╯
    isTransactionActive,
    isPurchaseActive,
    isRMAActive,

    // ╭─────────────────────────────────────────────────────────────────╮
    //    COMPANY
    // ╰─────────────────────────────────────────────────────────────────╯
    isCompanyActive,
    isAddressChangeActive,
    isBenefitActive,
    isExpenseClaimActive,
    isLeaveRequestActive,
    isRequestResourceActive,

    // ╭─────────────────────────────────────────────────────────────────╮
    //    GENERAL
    // ╰─────────────────────────────────────────────────────────────────╯
    isGeneralActive,
    isEndorsementActive,
    isPrinterIssueActive,
    isAnonymousRequestActive,
    isRefermentActive,

    // ╭─────────────────────────────────────────────────────────────────╮
    //    OUTREACH
    // ╰─────────────────────────────────────────────────────────────────╯
    isOutreachActive,
    isAnnouncementActive,
    isSurveyActive,
    isEventActive,

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DIRECTORY
    // ╰─────────────────────────────────────────────────────────────────╯
    isDirectoryActive,
  } = portalNavbarState;

  // useEffect(() => {
  //   const splitPathArr = pathname.split("/");
  //   const currentLocation = splitPathArr.at(-1) ?? "";
  //   const parentLocation = splitPathArr.at(-2) ?? "";

  //   console.log("PORTAL NAVBAR currentLocation", currentLocation);
  //   console.log("PORTAL NAVBAR parentLocation", parentLocation);

  //   if (parentLocation.includes("company")) {
  //   }

  //   const [currentLocationState, currentLocationAction] =
  //     returnPortalNavbarStateActionTuple({
  //       pathname: currentLocation,
  //       portalNavbarAction,
  //       portalNavbarState,
  //     });

  //   console.log("PORTAL NAVBAR currentLocationState", currentLocationState);
  //   console.log("PORTAL NAVBAR currentLocationAction", currentLocationAction);

  //   portalNavbarDispatch({
  //     type: currentLocationAction,
  //     payload: !currentLocationState,
  //   });

  // }, [pathname]);

  const {
    scrollBarStyle,
    generalColors: { iconGray, themeColorShade },
    appThemeColors: { backgroundColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    HOME
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdHomeNavLink] = returnAccessibleNavLinkElements([
    {
      active: isHomeActive,
      ariaLabel: "Will navigate to home page",
      icon: <TbHome2 color={isHomeActive ? themeColorShade : iconGray} />,
      label: "Home",
      onClick: () => {
        portalNavbarDispatch({
          type: portalNavbarAction.setIsHomeActive,
          payload: !isHomeActive,
        });
        navigate("/home");
      },
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DASHBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdDashboardNavLink] = returnAccessibleNavLinkElements([
    {
      active: isDashboardActive,
      ariaLabel: "Will navigate to dashboard page",
      icon: <TbDashboard color={isDashboardActive ? themeColorShade : iconGray} />,
      label: "Dashboard",
      onClick: () => {
        portalNavbarDispatch({
          type: portalNavbarAction.setIsDashboardActive,
          payload: !isDashboardActive,
        });
        navigate("/home/dashboard");
      },
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CUSTOMER
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdCustomerNavLink] = returnAccessibleNavLinkElements([
    {
      active: isCustomerActive,
      ariaLabel: "Will navigate to customer page",
      icon: <TbUserCheck color={isCustomerActive ? themeColorShade : iconGray} />,
      label: "Customer",
      onClick: () => {
        portalNavbarDispatch({
          type: portalNavbarAction.setIsCustomerActive,
          payload: !isCustomerActive,
        });
        navigate("/home/customer");
      },
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMMENT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdCommentNavLink] = returnAccessibleNavLinkElements([
    {
      active: isCommentActive,
      ariaLabel: "Will navigate to comment page",
      icon: <TbNotebook color={isCommentActive ? themeColorShade : iconGray} />,
      label: "Comment",
      onClick: () => {
        portalNavbarDispatch({
          type: portalNavbarAction.setIsCommentActive,
          payload: !isCommentActive,
        });
        navigate("/home/comment");
      },
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    FILE UPLOAD
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdFileUploadNavLink] = returnAccessibleNavLinkElements([
    {
      active: isFileUploadActive,
      ariaLabel: "Will navigate to file upload page",
      icon: <TbReceipt2 color={isFileUploadActive ? themeColorShade : iconGray} />,
      label: "File upload",
      onClick: () => {
        portalNavbarDispatch({
          type: portalNavbarAction.setIsFileUploadActive,
          payload: !isFileUploadActive,
        });
        navigate("/home/file-upload");
      },
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => ACCESSORY
  // ╰─────────────────────────────────────────────────────────────────╯
  const productAccessoryNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isProductAccessoryActive,
    ariaLabel: "Will navigate to product accessory page",
    icon: (
      <TbCircleTriangle color={isProductAccessoryActive ? themeColorShade : iconGray} />
    ),
    label: "Accessory",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsProductAccessoryActive,
        payload: !isProductAccessoryActive,
      });
      navigate("/home/product/accessory");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => CPU
  // ╰─────────────────────────────────────────────────────────────────╯
  const cpuNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isCPUActive,
    ariaLabel: "Will navigate to cpu page",
    icon: <TbCircleTriangle color={isCPUActive ? themeColorShade : iconGray} />,
    label: "CPU",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsCPUActive,
        payload: !isCPUActive,
      });
      navigate("/home/product/cpu");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => COMPUTER CASE
  // ╰─────────────────────────────────────────────────────────────────╯
  const computerCaseNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isComputerCaseActive,
    ariaLabel: "Will navigate to computer case page",
    icon: <TbCircleTriangle color={isComputerCaseActive ? themeColorShade : iconGray} />,
    label: "Computer case",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsComputerCaseActive,
        payload: !isComputerCaseActive,
      });
      navigate("/home/product/computer-case");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => DESKTOP COMPUTER
  // ╰─────────────────────────────────────────────────────────────────╯
  const desktopComputerNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isDesktopComputerActive,
    ariaLabel: "Will navigate to desktop computer page",
    icon: (
      <TbCircleTriangle color={isDesktopComputerActive ? themeColorShade : iconGray} />
    ),
    label: "Desktop computer",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsDesktopComputerActive,
        payload: !isDesktopComputerActive,
      });
      navigate("/home/product/desktop-computer");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => DISPLAY
  // ╰─────────────────────────────────────────────────────────────────╯
  const displayNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isDisplayActive,
    ariaLabel: "Will navigate to display page",
    icon: <TbCircleTriangle color={isDisplayActive ? themeColorShade : iconGray} />,
    label: "Display",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsDisplayActive,
        payload: !isDisplayActive,
      });
      navigate("/home/product/display");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => GPU
  // ╰─────────────────────────────────────────────────────────────────╯
  const gpuNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isGPUActive,
    ariaLabel: "Will navigate to gpu page",
    icon: <TbCircleTriangle color={isGPUActive ? themeColorShade : iconGray} />,
    label: "GPU",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsGPUActive,
        payload: !isGPUActive,
      });
      navigate("/home/product/gpu");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => HEADPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  const headphoneNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isHeadphoneActive,
    ariaLabel: "Will navigate to headphone page",
    icon: <TbCircleTriangle color={isHeadphoneActive ? themeColorShade : iconGray} />,
    label: "Headphone",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsHeadphoneActive,
        payload: !isHeadphoneActive,
      });
      navigate("/home/product/headphone");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => KEYBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  const keyboardNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isKeyboardActive,
    ariaLabel: "Will navigate to keyboard page",
    icon: <TbCircleTriangle color={isKeyboardActive ? themeColorShade : iconGray} />,
    label: "Keyboard",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsKeyboardActive,
        payload: !isKeyboardActive,
      });
      navigate("/home/product/keyboard");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => LAPTOP
  // ╰─────────────────────────────────────────────────────────────────╯
  const laptopNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isLaptopActive,
    ariaLabel: "Will navigate to laptop page",
    icon: <TbCircleTriangle color={isLaptopActive ? themeColorShade : iconGray} />,
    label: "Laptop",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsLaptopActive,
        payload: !isLaptopActive,
      });
      navigate("/home/product/laptop");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => RAM
  // ╰─────────────────────────────────────────────────────────────────╯
  const ramNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isRAMActive,
    ariaLabel: "Will navigate to ram page",
    icon: <TbCircleTriangle color={isRAMActive ? themeColorShade : iconGray} />,
    label: "RAM",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsRAMActive,
        payload: !isRAMActive,
      });
      navigate("/home/product/ram");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => MICROPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  const microphoneNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isMicrophoneActive,
    ariaLabel: "Will navigate to microphone page",
    icon: <TbCircleTriangle color={isMicrophoneActive ? themeColorShade : iconGray} />,
    label: "Microphone",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsMicrophoneActive,
        payload: !isMicrophoneActive,
      });
      navigate("/home/product/microphone");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => MOTHERBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  const motherboardNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isMotherboardActive,
    ariaLabel: "Will navigate to motherboard page",
    icon: <TbCircleTriangle color={isMotherboardActive ? themeColorShade : iconGray} />,
    label: "Motherboard",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsMotherboardActive,
        payload: !isMotherboardActive,
      });
      navigate("/home/product/motherboard");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => MOUSE
  // ╰─────────────────────────────────────────────────────────────────╯
  const mouseNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isMouseActive,
    ariaLabel: "Will navigate to mouse page",
    icon: <TbCircleTriangle color={isMouseActive ? themeColorShade : iconGray} />,
    label: "Mouse",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsMouseActive,
        payload: !isMouseActive,
      });
      navigate("/home/product/mouse");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => PSU
  // ╰─────────────────────────────────────────────────────────────────╯
  const psuNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isPSUActive,
    ariaLabel: "Will navigate to psu page",
    icon: <TbCircleTriangle color={isPSUActive ? themeColorShade : iconGray} />,
    label: "PSU",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsPSUActive,
        payload: !isPSUActive,
      });
      navigate("/home/product/psu");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => SMARTPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  const smartphoneNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isSmartphoneActive,
    ariaLabel: "Will navigate to smartphone page",
    icon: <TbCircleTriangle color={isSmartphoneActive ? themeColorShade : iconGray} />,
    label: "Smartphone",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsSmartphoneActive,
        payload: !isSmartphoneActive,
      });
      navigate("/home/product/smartphone");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => SPEAKER
  // ╰─────────────────────────────────────────────────────────────────╯
  const speakerNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isSpeakerActive,
    ariaLabel: "Will navigate to speaker page",
    icon: <TbCircleTriangle color={isSpeakerActive ? themeColorShade : iconGray} />,
    label: "Speaker",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsSpeakerActive,
        payload: !isSpeakerActive,
      });
      navigate("/home/product/speaker");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => STORAGE
  // ╰─────────────────────────────────────────────────────────────────╯
  const storageNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isStorageActive,
    ariaLabel: "Will navigate to storage page",
    icon: <TbCircleTriangle color={isStorageActive ? themeColorShade : iconGray} />,
    label: "Storage",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsStorageActive,
        payload: !isStorageActive,
      });
      navigate("/home/product/storage");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => TABLET
  // ╰─────────────────────────────────────────────────────────────────╯
  const tabletNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isTabletActive,
    ariaLabel: "Will navigate to tablet page",
    icon: <TbCircleTriangle color={isTabletActive ? themeColorShade : iconGray} />,
    label: "Tablet",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsTabletActive,
        payload: !isTabletActive,
      });
      navigate("/home/product/tablet");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT => WEBCAM
  // ╰─────────────────────────────────────────────────────────────────╯
  const webcamNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isWebcamActive,
    ariaLabel: "Will navigate to webcam page",
    icon: <TbCircleTriangle color={isWebcamActive ? themeColorShade : iconGray} />,
    label: "Webcam",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsWebcamActive,
        payload: !isWebcamActive,
      });
      navigate("/home/product/webcam");
    },
  };

  const [
    createdProductAccessoryNavLink,
    createdCPUNavLink,
    createdComputerCaseNavLink,
    createdDesktopComputerNavLink,
    createdDisplayNavLink,
    createdGPUNavLink,
    createdHeadphoneNavLink,
    createdKeyboardNavLink,
    createdLaptopNavLink,
    createdRAMNavLink,
    createdMicrophoneNavLink,
    createdMotherboardNavLink,
    createdMouseNavLink,
    createdPSUNavLink,
    createdSmartphoneNavLink,
    createdSpeakerNavLink,
    createdStorageNavLink,
    createdTabletNavLink,
    createdWebcamNavLink,
  ] = returnAccessibleNavLinkElements([
    productAccessoryNavLinkCreatorInfo,
    cpuNavLinkCreatorInfo,
    computerCaseNavLinkCreatorInfo,
    desktopComputerNavLinkCreatorInfo,
    displayNavLinkCreatorInfo,
    gpuNavLinkCreatorInfo,
    headphoneNavLinkCreatorInfo,
    keyboardNavLinkCreatorInfo,
    laptopNavLinkCreatorInfo,
    ramNavLinkCreatorInfo,
    microphoneNavLinkCreatorInfo,
    motherboardNavLinkCreatorInfo,
    mouseNavLinkCreatorInfo,
    psuNavLinkCreatorInfo,
    smartphoneNavLinkCreatorInfo,
    speakerNavLinkCreatorInfo,
    storageNavLinkCreatorInfo,
    tabletNavLinkCreatorInfo,
    webcamNavLinkCreatorInfo,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT
  // ╰─────────────────────────────────────────────────────────────────╯
  const isProductNavlinkOpened =
    isProductActive ||
    isProductAccessoryActive ||
    isCPUActive ||
    isComputerCaseActive ||
    isDesktopComputerActive ||
    isDisplayActive ||
    isGPUActive ||
    isHeadphoneActive ||
    isKeyboardActive ||
    isLaptopActive ||
    isRAMActive ||
    isMicrophoneActive ||
    isMotherboardActive ||
    isMouseActive ||
    isPSUActive ||
    isSmartphoneActive ||
    isSpeakerActive ||
    isStorageActive ||
    isTabletActive ||
    isWebcamActive
      ? true
      : false;

  const productNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isProductActive,
    ariaLabel: "Will navigate to product page",
    children: [
      createdProductAccessoryNavLink,
      createdCPUNavLink,
      createdComputerCaseNavLink,
      createdDesktopComputerNavLink,
      createdDisplayNavLink,
      createdGPUNavLink,
      createdHeadphoneNavLink,
      createdKeyboardNavLink,
      createdLaptopNavLink,
      createdRAMNavLink,
      createdMicrophoneNavLink,
      createdMotherboardNavLink,
      createdMouseNavLink,
      createdPSUNavLink,
      createdSmartphoneNavLink,
      createdSpeakerNavLink,
      createdStorageNavLink,
      createdTabletNavLink,
      createdWebcamNavLink,
    ],
    icon: <TbShoppingCartPlus color={isProductActive ? themeColorShade : iconGray} />,
    label: "Product",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsProductActive,
        payload: !isProductActive,
      });
    },
    opened: isProductNavlinkOpened,
    rightSection: (
      <TbChevronRight color={isProductNavlinkOpened ? themeColorShade : iconGray} />
    ),
  };

  const [createdProductNavLink] = returnAccessibleNavLinkElements([
    productNavLinkCreatorInfo,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT REVIEW
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdProductReviewNavLink] = returnAccessibleNavLinkElements([
    {
      active: isProductReviewActive,
      ariaLabel: "Will navigate to product review page",
      icon: (
        <TbTimelineEventPlus color={isProductReviewActive ? themeColorShade : iconGray} />
      ),
      label: "Product review",
      onClick: () => {
        portalNavbarDispatch({
          type: portalNavbarAction.setIsProductReviewActive,
          payload: !isProductReviewActive,
        });
        navigate("/home/product-review");
      },
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    REPAIR
  // ╰─────────────────────────────────────────────────────────────────╯

  const [createdRepairNavLink] = returnAccessibleNavLinkElements([
    {
      active: isRepairActive,
      ariaLabel: "Will navigate to repair page",
      icon: <TbCircuitResistor color={isRepairActive ? themeColorShade : iconGray} />,
      label: "Repair",
      onClick: () => {
        portalNavbarDispatch({
          type: portalNavbarAction.setIsRepairActive,
          payload: !isRepairActive,
        });
        navigate("/home/repair-ticket");
      },
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TRANSACTION => PURCHASE
  // ╰─────────────────────────────────────────────────────────────────╯
  const purchaseNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isPurchaseActive,
    ariaLabel: "Will navigate to purchase page",
    icon: <TbCircleTriangle color={isPurchaseActive ? themeColorShade : iconGray} />,
    label: "Purchase",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsPurchaseActive,
        payload: !isPurchaseActive,
      });
      navigate("/home/purchase");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TRANSACTION => RMA
  // ╰─────────────────────────────────────────────────────────────────╯
  const rmaNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isRMAActive,
    ariaLabel: "Will navigate to rma page",
    icon: <TbCircleTriangle color={isRMAActive ? themeColorShade : iconGray} />,
    label: "RMA",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsRMAActive,
        payload: !isRMAActive,
      });
      navigate("/home/rma");
    },
  };

  const [createdPurchaseNavLink, createdRMANavLink] = returnAccessibleNavLinkElements([
    purchaseNavLinkCreatorInfo,
    rmaNavLinkCreatorInfo,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TRANSACTION
  // ╰─────────────────────────────────────────────────────────────────╯
  const isTransactionNavlinkOpened =
    isTransactionActive || isPurchaseActive || isRMAActive;

  const transactionNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isTransactionActive,
    ariaLabel: "Will navigate to transaction page",
    children: [createdPurchaseNavLink, createdRMANavLink],
    icon: <GrTransaction color={isTransactionActive ? themeColorShade : iconGray} />,
    label: "Transaction",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsTransactionActive,
        payload: !isTransactionActive,
      });
    },
    opened: isTransactionNavlinkOpened,
    rightSection: (
      <TbChevronRight color={isTransactionNavlinkOpened ? themeColorShade : iconGray} />
    ),
  };

  const [createdTransactionNavLink] = returnAccessibleNavLinkElements([
    transactionNavLinkCreatorInfo,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMPANY => ADDRESS CHANGE
  // ╰─────────────────────────────────────────────────────────────────╯
  const addressChangeNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isAddressChangeActive,
    ariaLabel: "Will navigate to address change page",
    icon: <TbAddressBook color={isAddressChangeActive ? themeColorShade : iconGray} />,
    label: "Address change",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsAddressChangeActive,
        payload: !isAddressChangeActive,
      });
      navigate("/home/company/address-change");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMPANY => BENEFIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const benefitNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isBenefitActive,
    ariaLabel: "Will navigate to benefit page",
    icon: <TbGift color={isBenefitActive ? themeColorShade : iconGray} />,
    label: "Benefit",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsBenefitActive,
        payload: !isBenefitActive,
      });
      navigate("/home/company/benefit");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMPANY => EXPENSE CLAIM
  // ╰─────────────────────────────────────────────────────────────────╯
  const expenseClaimNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isExpenseClaimActive,
    ariaLabel: "Will navigate to expense claim page",
    icon: <TbReceipt2 color={isExpenseClaimActive ? themeColorShade : iconGray} />,
    label: "Expense claim",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsExpenseClaimActive,
        payload: !isExpenseClaimActive,
      });
      navigate("/home/company/expense-claim");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMPANY => LEAVE REQUEST
  // ╰─────────────────────────────────────────────────────────────────╯
  const leaveRequestNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isLeaveRequestActive,
    ariaLabel: "Will navigate to leave request page",
    icon: <TbCalendarPin color={isLeaveRequestActive ? themeColorShade : iconGray} />,
    label: "Leave request",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsLeaveRequestActive,
        payload: !isLeaveRequestActive,
      });
      navigate("/home/company/leave-request");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMPANY => REQUEST RESOURCE
  // ╰─────────────────────────────────────────────────────────────────╯
  const requestResourceNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isRequestResourceActive,
    ariaLabel: "Will navigate to request resource page",
    icon: <TbCashBanknote color={isRequestResourceActive ? themeColorShade : iconGray} />,
    label: "Request resource",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsRequestResourceActive,
        payload: !isRequestResourceActive,
      });
      navigate("/home/company/request-resource");
    },
  };

  const [
    createdAddressChangeNavLink,
    createdBenefitNavLink,
    createdExpenseClaimNavLink,
    createdLeaveRequestNavLink,
    createdRequestResourceNavLink,
  ] = returnAccessibleNavLinkElements([
    addressChangeNavLinkCreatorInfo,
    benefitNavLinkCreatorInfo,
    expenseClaimNavLinkCreatorInfo,
    leaveRequestNavLinkCreatorInfo,
    requestResourceNavLinkCreatorInfo,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMPANY
  // ╰─────────────────────────────────────────────────────────────────╯
  const isCompanyNavlinkOpened =
    isCompanyActive ||
    isAddressChangeActive ||
    isBenefitActive ||
    isExpenseClaimActive ||
    isLeaveRequestActive ||
    isRequestResourceActive
      ? true
      : false;

  const companyNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isCompanyActive,
    ariaLabel: "Will navigate to company page",
    children: [
      createdAddressChangeNavLink,
      createdBenefitNavLink,
      createdExpenseClaimNavLink,
      createdLeaveRequestNavLink,
      createdRequestResourceNavLink,
    ],
    icon: <TbBuildingWarehouse color={isCompanyActive ? themeColorShade : iconGray} />,
    label: "Company",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsCompanyActive,
        payload: !isCompanyActive,
      });
    },
    opened: isCompanyNavlinkOpened,
    rightSection: (
      <TbChevronRight color={isCompanyNavlinkOpened ? themeColorShade : iconGray} />
    ),
  };

  const [createdCompanyNavLink] = returnAccessibleNavLinkElements([
    companyNavLinkCreatorInfo,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GENERAL => ENDORSEMENT
  // ╰─────────────────────────────────────────────────────────────────╯
  const endorsementNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isEndorsementActive,
    ariaLabel: "Will navigate to endorsement page",
    icon: <TbUserCheck color={isEndorsementActive ? themeColorShade : iconGray} />,
    label: "Endorsement",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsEndorsementActive,
        payload: !isEndorsementActive,
      });
      navigate("/home/general/endorsement");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GENERAL => PRINTER ISSUE
  // ╰─────────────────────────────────────────────────────────────────╯
  const printerIssueNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isPrinterIssueActive,
    ariaLabel: "Will navigate to printer issue page",
    icon: <TbPrinterOff color={isPrinterIssueActive ? themeColorShade : iconGray} />,
    label: "Printer issue",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsPrinterIssueActive,
        payload: !isPrinterIssueActive,
      });
      navigate("/home/general/printer-issue");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GENERAL => ANONYMOUS REQUEST
  // ╰─────────────────────────────────────────────────────────────────╯
  const anonymousRequestNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isAnonymousRequestActive,
    ariaLabel: "Will navigate to anonymous request page",
    icon: (
      <MdSafetyDivider color={isAnonymousRequestActive ? themeColorShade : iconGray} />
    ),
    label: "Anonymous request",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsAnonymousRequestActive,
        payload: !isAnonymousRequestActive,
      });
      navigate("/home/general/anonymous-request");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GENERAL => REFERMENT
  // ╰─────────────────────────────────────────────────────────────────╯
  const refermentNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isRefermentActive,
    ariaLabel: "Will navigate to referment page",
    icon: <TiThumbsUp color={isRefermentActive ? themeColorShade : iconGray} />,
    label: "Referment",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsRefermentActive,
        payload: !isRefermentActive,
      });
      navigate("/home/general/referment");
    },
  };

  const [
    createdEndorsementNavLink,
    createdPrinterIssueNavLink,
    createdAnonymousRequestNavLink,
    createdRefermentNavLink,
  ] = returnAccessibleNavLinkElements([
    endorsementNavLinkCreatorInfo,
    printerIssueNavLinkCreatorInfo,
    anonymousRequestNavLinkCreatorInfo,
    refermentNavLinkCreatorInfo,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GENERAL
  // ╰─────────────────────────────────────────────────────────────────╯
  const isGeneralNavlinkOpened =
    isGeneralActive ||
    isEndorsementActive ||
    isPrinterIssueActive ||
    isAnonymousRequestActive ||
    isRefermentActive
      ? true
      : false;

  const generalNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isGeneralActive,
    ariaLabel: "Will navigate to general page",
    children: [
      createdEndorsementNavLink,
      createdPrinterIssueNavLink,
      createdAnonymousRequestNavLink,
      createdRefermentNavLink,
    ],
    icon: <TbCircleTriangle color={isGeneralActive ? themeColorShade : iconGray} />,
    label: "General",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsGeneralActive,
        payload: !isGeneralActive,
      });
    },
    opened: isGeneralNavlinkOpened,
    rightSection: (
      <TbChevronRight color={isGeneralNavlinkOpened ? themeColorShade : iconGray} />
    ),
  };

  const [createdGeneralNavLink] = returnAccessibleNavLinkElements([
    generalNavLinkCreatorInfo,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    OUTREACH => ANNOUNCEMENT
  // ╰─────────────────────────────────────────────────────────────────╯
  const announcementNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isAnnouncementActive,
    ariaLabel: "Will navigate to announcement page",
    icon: <TbSpeakerphone color={isAnnouncementActive ? themeColorShade : iconGray} />,
    label: "Announcement",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsAnnouncementActive,
        payload: !isAnnouncementActive,
      });
      navigate("/home/outreach/announcement");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    OUTREACH => SURVEY
  // ╰─────────────────────────────────────────────────────────────────╯
  const surveyNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isSurveyActive,
    ariaLabel: "Will navigate to survey page",
    icon: <TbChartPie3 color={isSurveyActive ? themeColorShade : iconGray} />,
    label: "Survey",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsSurveyActive,
        payload: !isSurveyActive,
      });
      navigate("/home/outreach/survey");
    },
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    OUTREACH => EVENT
  // ╰─────────────────────────────────────────────────────────────────╯
  const eventNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isEventActive,
    ariaLabel: "Will navigate to event page",
    icon: <TbTimelineEventPlus color={isEventActive ? themeColorShade : iconGray} />,
    label: "Event",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsEventActive,
        payload: !isEventActive,
      });
      navigate("/home/outreach/event");
    },
  };

  const [createdAnnouncementNavLink, createdSurveyNavLink, createdEventNavLink] =
    returnAccessibleNavLinkElements([
      announcementNavLinkCreatorInfo,
      surveyNavLinkCreatorInfo,
      eventNavLinkCreatorInfo,
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    OUTREACH
  // ╰─────────────────────────────────────────────────────────────────╯
  const isOutreachNavlinkOpened =
    isOutreachActive || isAnnouncementActive || isEventActive || isSurveyActive
      ? true
      : false;

  const outreachNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    active: isOutreachActive,
    ariaLabel: "Will navigate to outreach page",
    children: [createdAnnouncementNavLink, createdSurveyNavLink, createdEventNavLink],
    icon: <RiSignalTowerFill color={isOutreachActive ? themeColorShade : iconGray} />,
    label: "Outreach",
    onClick: () => {
      portalNavbarDispatch({
        type: portalNavbarAction.setIsOutreachActive,
        payload: !isOutreachActive,
      });
    },
    opened: isOutreachNavlinkOpened,
    rightSection: (
      <TbChevronRight color={isOutreachNavlinkOpened ? themeColorShade : iconGray} />
    ),
  };

  const [createdOutreachNavLink] = returnAccessibleNavLinkElements([
    outreachNavLinkCreatorInfo,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DIRECTORY
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdDirectoryNavLink] = returnAccessibleNavLinkElements([
    {
      active: isDirectoryActive,
      ariaLabel: "Will navigate to directory page",
      icon: <CgDatabase color={isDirectoryActive ? themeColorShade : iconGray} />,
      label: "Directory",
      onClick: () => {
        portalNavbarDispatch({
          type: portalNavbarAction.setIsDirectoryActive,
          payload: !isDirectoryActive,
        });
        navigate("/home/directory");
      },
    },
  ]);

  // dev testing page
  const displayDevTestingNavLink = (
    <NavLink
      label={<Text>Dev testing</Text>}
      icon={<TbTimelineEventPlus color={iconGray} />}
      onClick={() => {
        navigate("/home/dev-testing");
      }}
    />
  );

  return (
    <Navbar
      bg={backgroundColor}
      pl={padding}
      py={padding}
      hiddenBreakpoint="sm"
      hidden={!openedNavbar}
      width={{ sm: 225, lg: 300 }}
      h={width <= 991 ? height - 50 : height - 64} //  vw < 991 ? header height = 50px : header height = 64px
      style={width <= 1024 ? { zIndex: 5 } : {}}
    >
      <ScrollArea styles={() => scrollBarStyle} offsetScrollbars>
        <Flex direction="column">
          {displayDevTestingNavLink}

          {createdHomeNavLink}

          {createdDashboardNavLink}

          {createdCustomerNavLink}

          {createdCommentNavLink}

          {createdFileUploadNavLink}

          {createdProductNavLink}

          {createdProductReviewNavLink}

          {createdRepairNavLink}

          {createdTransactionNavLink}

          {createdCompanyNavLink}

          {createdGeneralNavLink}

          {createdOutreachNavLink}

          {createdDirectoryNavLink}
        </Flex>
      </ScrollArea>
    </Navbar>
  );
}

export { PortalNavbar };
