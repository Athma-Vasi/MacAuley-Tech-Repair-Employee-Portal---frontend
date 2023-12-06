import "./index.css";

import { MantineProvider, Text } from "@mantine/core";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";

import CustomFonts from "./components/customFonts/CustomFonts";
import DevTesting from "./components/devTesting/DevTesting";
import ErrorFallback from "./components/errorFallback/ErrorFallback";
import { useGlobalState } from "./hooks/useGlobalState";

// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    LAZY LOADING COMPONENTS
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

// ╔═════════════════════════════════════════════════════════════════╗
//   PUBLIC LAYOUT
// ╚═════════════════════════════════════════════════════════════════╝
const PublicLayout = lazy(() => import("./components/publicLayout/PublicLayout"));

// ╔═════════════════════════════════════════════════════════════════╗
//   LOGIN
// ╚═════════════════════════════════════════════════════════════════╝
const Login = lazy(() => import("./components/login/Login"));

// ╔═════════════════════════════════════════════════════════════════╗
//   REGISTER
// ╚═════════════════════════════════════════════════════════════════╝
const Register = lazy(() => import("./components/register/Register"));

// ╔═════════════════════════════════════════════════════════════════╗
//   PORTAL LAYOUT
// ╚═════════════════════════════════════════════════════════════════╝
const PortalLayout = lazy(() => import("./components/portalLayout/PortalLayout"));

// ╔═════════════════════════════════════════════════════════════════╗
//   HOME
// ╚═════════════════════════════════════════════════════════════════╝
const Home = lazy(() => import("./components/home/Home"));

// ╔═════════════════════════════════════════════════════════════════╗
//   DASHBOARD
// ╚═════════════════════════════════════════════════════════════════╝
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));

// ╭─────────────────────────────────────────────────────────────────╮
//    DISPLAY RESPONSIVE CHART
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayResponsiveChart = lazy(
  () => import("./components/dashboard/DisplayResponsiveChart")
);

// ╔═════════════════════════════════════════════════════════════════╗
//   CUSTOMER
// ╚═════════════════════════════════════════════════════════════════╝

// ╔═════════════════════════════════════════════════════════════════╗
//   COMMENT
// ╚═════════════════════════════════════════════════════════════════╝

// ╔═════════════════════════════════════════════════════════════════╗
//   FILE UPLOAD
// ╚═════════════════════════════════════════════════════════════════╝

// ╔═════════════════════════════════════════════════════════════════╗
//   PRODUCT
// ╚═════════════════════════════════════════════════════════════════╝
const CreateProduct = lazy(() => import("./components/product/CreateProduct"));

// ╭─────────────────────────────────────────────────────────────────╮
//    ACCESSORY
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayAccessory = lazy(
  () => import("./components/product/accessory/DisplayAccessory")
);

const CreateAccessory = lazy(
  () => import("./components/product/accessory/CreateAccessory")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    CPU
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayCPU = lazy(() => import("./components/product/cpu/DisplayCPU"));

const CreateCPU = lazy(() => import("./components/product/cpu/CreateCPU"));

// ╭─────────────────────────────────────────────────────────────────╮
//    COMPUTER CASE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayCase = lazy(() => import("./components/product/case/DisplayCase"));

const CreateCase = lazy(() => import("./components/product/case/CreateCase"));

// ╭─────────────────────────────────────────────────────────────────╮
//    DESKTOP COMPUTER
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayDesktopComputer = lazy(
  () => import("./components/product/desktopComputer/DisplayDestopComputer")
);

const CreateDesktopComputer = lazy(
  () => import("./components/product/desktopComputer/CreateDesktopComputer")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    DISPLAY
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayDisplay = lazy(() => import("./components/product/display/DisplayDisplay"));

const CreateDisplay = lazy(() => import("./components/product/display/CreateDisplay"));

// ╭─────────────────────────────────────────────────────────────────╮
//    GPU
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayGPU = lazy(() => import("./components/product/gpu/DisplayGPU"));

const CreateGPU = lazy(() => import("./components/product/gpu/CreateGPU"));

// ╭─────────────────────────────────────────────────────────────────╮
//    HEADPHONE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayHeadphone = lazy(
  () => import("./components/product/headphone/DisplayHeadphone")
);

const CreateHeadphone = lazy(
  () => import("./components/product/headphone/CreateHeadphone")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    KEYBOARD
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayKeyboard = lazy(
  () => import("./components/product/keyboard/DisplayKeyboard")
);

const CreateKeyboard = lazy(() => import("./components/product/keyboard/CreateKeyboard"));

// ╭─────────────────────────────────────────────────────────────────╮
//    LAPTOP
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayLaptop = lazy(() => import("./components/product/laptop/DisplayLaptop"));

const CreateLaptop = lazy(() => import("./components/product/laptop/CreateLaptop"));

// ╭─────────────────────────────────────────────────────────────────╮
//    RAM
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayRAM = lazy(() => import("./components/product/ram/DisplayRAM"));

const CreateRAM = lazy(() => import("./components/product/ram/CreateRAM"));

// ╭─────────────────────────────────────────────────────────────────╮
//    MICROPHONE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayMicrophone = lazy(
  () => import("./components/product/microphone/DisplayMicrophone")
);

const CreateMicrophone = lazy(
  () => import("./components/product/microphone/CreateMicrophone")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayMotherboard = lazy(
  () => import("./components/product/motherboard/DisplayMotherboard")
);

const CreateMotherboard = lazy(
  () => import("./components/product/motherboard/CreateMotherboard")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    MOUSE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayMouse = lazy(() => import("./components/product/mouse/DisplayMouse"));

const CreateMouse = lazy(() => import("./components/product/mouse/CreateMouse"));

// ╭─────────────────────────────────────────────────────────────────╮
//    PSU
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayPSU = lazy(() => import("./components/product/psu/DisplayPSU"));

const CreatePSU = lazy(() => import("./components/product/psu/CreatePSU"));

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplaySmartphone = lazy(
  () => import("./components/product/smartphone/DisplaySmartphone")
);

const CreateSmartphone = lazy(
  () => import("./components/product/smartphone/CreateSmartphone")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    SPEAKER
// ╰─────────────────────────────────────────────────────────────────╯
const DisplaySpeaker = lazy(() => import("./components/product/speaker/DisplaySpeaker"));

const CreateSpeaker = lazy(() => import("./components/product/speaker/CreateSpeaker"));

// ╭─────────────────────────────────────────────────────────────────╮
//    STORAGE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayStorage = lazy(() => import("./components/product/storage/DisplayStorage"));

const CreateStorage = lazy(() => import("./components/product/storage/CreateStorage"));

// ╭─────────────────────────────────────────────────────────────────╮
//    TABLET
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayTablet = lazy(() => import("./components/product/tablet/DisplayTablet"));

const CreateTablet = lazy(() => import("./components/product/tablet/CreateTablet"));

// ╭─────────────────────────────────────────────────────────────────╮
//    WEBCAM
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayWebcam = lazy(() => import("./components/product/webcam/DisplayWebcam"));

const CreateWebcam = lazy(() => import("./components/product/webcam/CreateWebcam"));

// ╔═════════════════════════════════════════════════════════════════╗
//   PRODUCT REVIEW
// ╚═════════════════════════════════════════════════════════════════╝

// ╔═════════════════════════════════════════════════════════════════╗
//   REPAIR
// ╚═════════════════════════════════════════════════════════════════╝
const CreateRepairNote = lazy(
  () => import("./components/repairNote/create/CreateRepairNote")
);

// ╔═════════════════════════════════════════════════════════════════╗
//   TRANSACTION
// ╚═════════════════════════════════════════════════════════════════╝

// ╔═════════════════════════════════════════════════════════════════╗
//   COMPANY
// ╚═════════════════════════════════════════════════════════════════╝

// ╭─────────────────────────────────────────────────────────────────╮
//    ADDRESS CHANGE
// ╰─────────────────────────────────────────────────────────────────╯
const AddressChange = lazy(
  () => import("./components/addressChange/create/AddressChange")
);

const DisplayAddressChanges = lazy(
  () => import("./components/addressChange/DisplayAddressChanges")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    BENEFIT
// ╰─────────────────────────────────────────────────────────────────╯
const CreateBenefit = lazy(() => import("./components/benefits/create/CreateBenefit"));

const DisplayBenefits = lazy(() => import("./components/benefits/DisplayBenefits"));

// ╭─────────────────────────────────────────────────────────────────╮
//    LEAVE REQUEST
// ╰─────────────────────────────────────────────────────────────────╯
const CreateLeaveRequest = lazy(
  () => import("./components/leaveRequest/create/CreateLeaveRequest")
);

const DisplayLeaveRequests = lazy(
  () => import("./components/leaveRequest/DisplayLeaveRequests")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    REQUEST RESOURCE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayRequestResources = lazy(
  () => import("./components/requestResource/DisplayRequestResources")
);

const RequestResource = lazy(
  () => import("./components/requestResource/create/RequestResource")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    EXPENSE CLAIM
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayExpenseClaims = lazy(
  () => import("./components/expenseClaim/DisplayExpenseClaims")
);

const CreateExpenseClaim = lazy(
  () => import("./components/expenseClaim/create/CreateExpenseClaim")
);

// ╔═════════════════════════════════════════════════════════════════╗
//   GENERAL
// ╚═════════════════════════════════════════════════════════════════╝

// ╭─────────────────────────────────────────────────────────────────╮
//   ANONYMOUS REQUEST
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayAnonymousRequests = lazy(
  () => import("./components/anonymousRequest/DisplayAnonymousRequests")
);

const CreateAnonymousRequest = lazy(
  () => import("./components/anonymousRequest/create/CreateAnonymousRequest")
);

// ╭─────────────────────────────────────────────────────────────────╮
//   ENDORSEMENT
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayEndorsements = lazy(
  () => import("./components/endorsements/DisplayEndorsements")
);

const CreateEndorsement = lazy(
  () => import("./components/endorsements/create/CreateEndorsement")
);

// ╭─────────────────────────────────────────────────────────────────╮
//   PRINTER ISSUE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayPrinterIssues = lazy(
  () => import("./components/printerIssue/DisplayPrinterIssues")
);

const CreatePrinterIssue = lazy(
  () => import("./components/printerIssue/create/CreatePrinterIssue")
);

// ╭─────────────────────────────────────────────────────────────────╮
//   REFERMENT
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayReferments = lazy(() => import("./components/referment/DisplayReferments"));

const CreateReferment = lazy(
  () => import("./components/referment/create/CreateReferment")
);

// ╔═════════════════════════════════════════════════════════════════╗
//   OUTREACH
// ╚═════════════════════════════════════════════════════════════════╝

// ╭─────────────────────────────────────────────────────────────────╮
//   ANNOUNCEMENT
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayAnnouncements = lazy(
  () => import("./components/announcement/display/announcements/DisplayAnnouncements")
);

const CreateAnnouncement = lazy(
  () => import("./components/announcement/create/CreateAnnouncement")
);

const DisplayAnnouncement = lazy(
  () => import("./components/announcement/display/announcement/DisplayAnnouncement")
);

// ╭─────────────────────────────────────────────────────────────────╮
//   EVENT
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayEvents = lazy(() => import("./components/event/DisplayEvents"));

const EventCreator = lazy(() => import("./components/event/create/EventCreator"));

// ╭─────────────────────────────────────────────────────────────────╮
//   SURVEY
// ╰─────────────────────────────────────────────────────────────────╯
const DisplaySurveys = lazy(() => import("./components/survey/display/DisplaySurveys"));

const SurveyBuilder = lazy(() => import("./components/survey/create/SurveyBuilder"));

// ╔═════════════════════════════════════════════════════════════════╗
//   DIRECTORY
// ╚═════════════════════════════════════════════════════════════════╝
const Directory = lazy(() => import("./components/directory/Directory"));

  // ╔═════════════════════════════════════════════════════════════════╗
  //   CATCH ALL
  // ╚═════════════════════════════════════════════════════════════════╝
const NotFound = lazy(() => import("./components/notFound/NotFound"));

function App() {
  const {
    globalState: { themeObject, errorState },
  } = useGlobalState();

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    WRAPPED COMPONENTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // @desc   the public facing page
  // @route  /
  // @access public
  const rootIndexWrapper = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <PublicLayout />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   the login page
  // @route  /login
  // @access public
  const loginElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <Login />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   the register page
  // @route  /register
  // @access public
  const registerElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <Register />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   the parent component for the entire app (logged in users only)
  // @route  /home
  // @access private
  const homeIndexWrapper = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <PortalLayout />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   the home page (welcome page for logged in users)
  // @route  /home
  // @access private
  const homeElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <Home />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   the dashboard page
  // @route  /home/dashboard
  // @access private
  const dashboardElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   the responsive chart page
  // @route  /home/dashboard/responsive-chart
  // @access private
  const displayResponsiveChartElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayResponsiveChart />
      </Suspense>
    </ErrorBoundary>
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   PRODUCT
  // ╚═════════════════════════════════════════════════════════════════╝

  // @desc   products page
  // @route  /home/product/create
  // @access private
  const createProductElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <CreateProduct />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   ACCESSORY
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   accessory page (index and display)
  // @route  /home/product/accessory (index) and /home/product/accessory/display
  // @access private
  const displayAccessoriesElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayAccessory />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   accessory page (create)
  // @route  /home/product/accessory/create
  // @access private
  const createAccessoryElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <CreateAccessory />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   CPU
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   cpu page (index and display)
  // @route  /home/product/cpu (index) and /home/product/cpu/display
  // @access private
  const displayCPUsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayCPU />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   cpu page (create)
  // @route  /home/product/cpu/create
  // @access private
  const createCPUElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
          <CreateCPU />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   CASE
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   case page (index and display)
  // @route  /home/product/case (index) and /home/product/case/display
  // @access private
  const displayCasesElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayCase />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   case page (create)
  // @route  /home/product/case/create
  // @access private
  const createCaseElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>>} 
      >
        <CreateCase />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   DESKTOP COMPUTER
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   desktop computer page (index and display)
  // @route  /home/product/desktop-computer (index) and /home/product/desktop-computer/display
  // @access private
  const displayDesktopComputersElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayDesktopComputer />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   desktop computer page (create)
  // @route  /home/product/desktop-computer/create
  // @access private
  const createDesktopComputerElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} 
      >
        <CreateDesktopComputer />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   DISPLAY
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   display page (index and display)
  // @route  /home/product/display (index) and /home/product/display/display
  // @access private
  const displayDisplaysElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayDisplay />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   display page (create)
  // @route  /home/product/display/create
  // @access private
  const createDisplayElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} 
      >
        <CreateDisplay />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   GPU
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   gpu page (index and display)
  // @route  /home/product/gpu (index) and /home/product/gpu/display
  // @access private
  const displayGPUsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayGPU />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   gpu page (create)
  // @route  /home/product/gpu/create
  // @access private
  const createGPUElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} 
      >
        <CreateGPU />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   HEADPHONE
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   headphone page (index and display)
  // @route  /home/product/headphone (index) and /home/product/headphone/display
  // @access private
  const displayHeadphonesElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayHeadphone />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   headphone page (create)
  // @route  /home/product/headphone/create
  // @access private
  const createHeadphoneElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} 
      >
        <CreateHeadphone />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   KEYBOARD
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   keyboard page (index and display)
  // @route  /home/product/keyboard (index) and /home/product/keyboard/display
  // @access private
  const displayKeyboardsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayKeyboard />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   keyboard page (create)
  // @route  /home/product/keyboard/create
  // @access private
  const createKeyboardElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} 
      >
        <CreateKeyboard />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   LAPTOP
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   laptop page (index and display)
  // @route  /home/product/laptop (index) and /home/product/laptop/display
  // @access private
  const displayLaptopsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}
      >
        <DisplayLaptop />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   laptop page (create)
  // @route  /home/product/laptop/create
  // @access private
  const createLaptopElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}
      >
        <CreateLaptop />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   RAM
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   ram page (index and display)
  // @route  /home/product/ram (index) and /home/product/ram/display
  // @access private
  const displayRAMsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}
      >
        <DisplayRAM />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   ram page (create)
  // @route  /home/product/ram/create
  // @access private
  const createRAMElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}
      >
        <CreateRAM />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MICROPHONE
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   microphone page (index and display)
  // @route  /home/product/microphone (index) and /home/product/microphone/display
  // @access private
  const displayMicrophonesElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}
      >
        <DisplayMicrophone />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   microphone page (create)
  // @route  /home/product/microphone/create
  // @access private
  const createMicrophoneElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}
      >
        <CreateMicrophone />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MOTHERBOARD
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   motherboard page (index and display)
  // @route  /home/product/motherboard (index) and /home/product/motherboard/display
  // @access private
  const displayMotherboardsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}
      >
        <DisplayMotherboard />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   motherboard page (create)
  // @route  /home/product/motherboard/create
  // @access private
  const createMotherboardElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}
      > 
        <CreateMotherboard />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MOUSE
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   mouse page (index and display)
  // @route  /home/product/mouse (index) and /home/product/mouse/display
  // @access private
  const displayMousesElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} 
      >
        <DisplayMouse />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   mouse page (create)
  // @route  /home/product/mouse/create
  // @access private
  const createMouseElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} 
      >
        <CreateMouse />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   PSU
  // ╰─────────────────────────────────────────────────────────────────╯
    
  // @desc   psu page (index and display)
  // @route  /home/product/psu (index) and /home/product/psu/display
  // @access private
  const displayPSUsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} 
      >
        <DisplayPSU />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   psu page (create)
  // @route  /home/product/psu/create
  // @access private
  const createPSUElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} 
      >
        <CreatePSU />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   SMARTPHONE
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   smartphone page (index and display)
  // @route  /home/product/smartphone (index) and /home/product/smartphone/display
  // @access private
  const displaySmartphonesElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} 
      >
        <DisplaySmartphone />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   smartphone page (create)
  // @route  /home/product/smartphone/create
  // @access private
  const createSmartphoneElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} >
        <CreateSmartphone />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   SPEAKER
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   speaker page (index and display)
  // @route  /home/product/speaker (index) and /home/product/speaker/display
  // @access private
  const displaySpeakersElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} >
        <DisplaySpeaker />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   speaker page (create)
  // @route  /home/product/speaker/create
  // @access private
  const createSpeakerElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} >
        <CreateSpeaker />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   STORAGE
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   storage page (index and display)
  // @route  /home/product/storage (index) and /home/product/storage/display
  // @access private
  const displayStoragesElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} >
        <DisplayStorage />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   storage page (create)
  // @route  /home/product/storage/create
  // @access private
  const createStorageElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} >
        <CreateStorage />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   TABLET
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   tablet page (index and display)
  // @route  /home/product/tablet (index) and /home/product/tablet/display
  // @access private
  const displayTabletsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} >
        <DisplayTablet />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   tablet page (create)
  // @route  /home/product/tablet/create
  // @access private
  const createTabletElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} >
        <CreateTablet />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   WEBCAM
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   webcam page (index and display)
  // @route  /home/product/webcam (index) and /home/product/webcam/display
  // @access private
  const displayWebcamsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} >
        <DisplayWebcam />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   webcam page (create)
  // @route  /home/product/webcam/create
  // @access private
  const createWebcamElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>} >
          <CreateWebcam />
      </Suspense>
    </ErrorBoundary>
  );

    // ╔═════════════════════════════════════════════════════════════════╗
  //   PRODUCT REVIEW
  // ╚═════════════════════════════════════════════════════════════════╝


  // ╔═════════════════════════════════════════════════════════════════╗
  //   REPAIR
  // ╚═════════════════════════════════════════════════════════════════╝

  // @desc   repair-note page (create)
  // @route  /home/repair-note/create
  // @access private
  const createRepairNoteElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <CreateRepairNote />
      </Suspense>
    </ErrorBoundary>
  );

    // ╔═════════════════════════════════════════════════════════════════╗
  //   TRANSACTION
  // ╚═════════════════════════════════════════════════════════════════╝

    // ╔═════════════════════════════════════════════════════════════════╗
  //   COMPANY
  // ╚═════════════════════════════════════════════════════════════════╝

  


// ╭─────────────────────────────────────────────────────────────────╮
//   ADDRESS CHANGE
// ╰─────────────────────────────────────────────────────────────────╯

  // @desc   address-change page (index and display)
  // @route  /home/company/address-change (index) and /home/company/address-change/display
  // @access private
  const displayAddressChangesElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayAddressChanges />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   address-change page (create)
  // @route  /home/company/address-change/create
  // @access private
  const addressChangeElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <AddressChange />
      </Suspense>
    </ErrorBoundary>
  );

 // ╭─────────────────────────────────────────────────────────────────╮
//   BENEFIT
// ╰─────────────────────────────────────────────────────────────────╯

  // @desc   benefits page (index and display)
  // @route  /home/company/benefit (index) and /home/company/benefit/display
  // @access private
  const displayBenefitsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayBenefits />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   benefits page (create)
  // @route  /home/company/benefit/create
  // @access private
  const createBenefitElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <CreateBenefit />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
//   LEAVE REQUEST
// ╰─────────────────────────────────────────────────────────────────╯

  // @desc   leave-request page (index and display)
  // @route  /home/company/leave-request (index) and /home/company/leave-request/display
  // @access private
  const displayLeaveRequestsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayLeaveRequests />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   leave-request page (create)
  // @route  /home/company/leave-request/create
  // @access private
  const createLeaveRequestElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <CreateLeaveRequest />
      </Suspense>
    </ErrorBoundary>
  );

// ╭─────────────────────────────────────────────────────────────────╮
//   REQUEST RESOURCE
// ╰─────────────────────────────────────────────────────────────────╯

  // @desc   request-resource page (index and display)
  // @route  /home/company/request-resource (index) and /home/company/request-resource/display
  // @access private
  const displayRequestResourcesElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayRequestResources />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   request-resource page (create)
  // @route  /home/company/request-resource/create
  // @access private
  const requestResourceElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <RequestResource />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
//   EXPENSE CLAIM
// ╰─────────────────────────────────────────────────────────────────╯

  // @desc   expense-claim page (index and display)
  // @route  /home/company/expense-claim (index) and /home/company/expense-claim/display
  // @access private
  const displayExpenseClaimsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayExpenseClaims />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   expense-claim page (create)
  // @route  /home/company/expense-claim/create
  // @access private
  const createExpenseClaimElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <CreateExpenseClaim />
      </Suspense>
    </ErrorBoundary>
  );


   // ╔═════════════════════════════════════════════════════════════════╗
  //   GENERAL
  // ╚═════════════════════════════════════════════════════════════════╝

    // ╭─────────────────────────────────────────────────────────────────╮
  //   ANONYMOUS REQUEST
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   anonymous-request page (index and display)
  // @route  /home/general/anonymous-request (index) and /home/general/anonymous-request/display
  // @access private
  const displayAnonymousRequestsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayAnonymousRequests />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   anonymous-request page (create)
  // @route  /home/general/anonymous-request/create
  // @access private
  const createAnonymousRequestElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <CreateAnonymousRequest />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   ENDORSEMENT
  // ╰─────────────────────────────────────────────────────────────────╯


  // @desc   endorsement page (index and display)
  // @route  /home/general/endorsement (index) and /home/general/endorsement/display
  // @access private
  const displayEndorsementsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayEndorsements />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   endorsement page (create)
  // @route  /home/general/endorsement/create
  // @access private
  const createEndorsementElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <CreateEndorsement />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   PRINTER ISSUE
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   printer-issue page (index and display)
  // @route  /home/general/printer-issue (index) and /home/general/printer-issue/display
  // @access private
  const displayPrinterIssuesElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayPrinterIssues />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   printer-issue page (create)
  // @route  /home/general/printer-issue/create
  // @access private
  const createPrinterIssueElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <CreatePrinterIssue />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   REFERMENT
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   referment page (index and display)
  // @route  /home/general/referment (index) and /home/general/referment/display
  // @access private
  const displayRefermentsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayReferments />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   referment page (create)
  // @route  /home/general/referment/create
  // @access private
  const createRefermentElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <CreateReferment />
      </Suspense>
    </ErrorBoundary>
  );

// ╔═════════════════════════════════════════════════════════════════╗
  //   OUTREACH
  // ╚═════════════════════════════════════════════════════════════════╝

// ╭─────────────────────────────────────────────────────────────────╮
  //   ANNOUNCEMENT
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   announcement page (index and display)
  // @route  /home/outreach/announcement (index) and /home/outreach/announcement/display
  // @access private
  const displayAnnouncementsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayAnnouncements />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   announcement page (create)
  // @route  /home/outreach/announcement/create
  // @access private
  const createAnnouncementElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <CreateAnnouncement />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   announcement page (display single announcement)
  // @route  /home/outreach/announcement/display/:announcementId
  // @access private
  const displayAnnouncementElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayAnnouncement />
      </Suspense>
    </ErrorBoundary>
  );

    // ╭─────────────────────────────────────────────────────────────────╮
  //   EVENT
  // ╰─────────────────────────────────────────────────────────────────╯

  

  // @desc   event-creator page (index and display)
  // @route  /home/outreach/event-creator (index) and /home/outreach/event-creator/display
  // @access private
  const displayEventsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayEvents />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   event-creator page (create)
  // @route  /home/outreach/event-creator/create
  // @access private
  const eventCreatorElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <EventCreator />
      </Suspense>
    </ErrorBoundary>
  );

// ╭─────────────────────────────────────────────────────────────────╮
  //   SURVEY
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   survey-builder page (index and display)
  // @route  /home/outreach/survey-builder (index) and /home/outreach/survey-builder/display
  // @access private
  const displaySurveysElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplaySurveys />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   survey-builder page (create)
  // @route  /home/outreach/survey-builder/create
  // @access private
  const surveyBuilderElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <SurveyBuilder />
      </Suspense>
    </ErrorBoundary>
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   DIRECTORY
  // ╚═════════════════════════════════════════════════════════════════╝

  // @desc   the directory page
  // @route  /home/directory
  // @access private
  const directoryElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <Directory />
      </Suspense>
    </ErrorBoundary>
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   CATCH ALL
  // ╚═════════════════════════════════════════════════════════════════╝

  // @desc   catch all page
  // @route  *
  // @access public
  const notFoundElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <NotFound />
      </Suspense>
    </ErrorBoundary>
  );

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={themeObject}>
      <CustomFonts />
      <Routes>
        {/* these are public routes */}
        <Route path="/" element={rootIndexWrapper}>
          <Route index element={loginElement} />
          <Route path="login" element={loginElement} />
          <Route path="register" element={<PortalLayout />}>
            <Route index element={registerElement} />
          </Route>
        </Route>

        {/* these are protected routes */}
        {/* all roles are allowed to view the protected home page */}
        {/* 
      <Route
        element={
          <RequireAuth allowedRoles={['Employee', 'Admin', 'Manager']} />
        }
      >
        <Route path="portal" element={<PortalLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />

          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>

          <Route path="notes">
            <Route index element={<NotesList />} />
          </Route>
        </Route>          
      </Route> */}

        <Route path="home" element={homeIndexWrapper}>
          <Route index element={homeElement} />
          {/* DEV TEST ROUTES */}
          <Route path="dev-testing" element={<DevTesting />} />
          {/* <Route path="home" element={homeElement} /> */}

          {/* dashboard */}       
          <Route path="dashboard">
            <Route index element={dashboardElement} />            
            <Route path=":chartKind" element={displayResponsiveChartElement} />
          </Route>

{/* product */}



          

          {/* repair-note */}
          <Route path="repair-note">
            <Route path="create" element={createRepairNoteElement} />
          </Route>

          {/* company */}
          <Route path="company">

            {/* address change */}
            <Route path="address-change">
              <Route index element={displayAddressChangesElement} />
              <Route path="create" element={addressChangeElement} />
            </Route>

            {/* benefit */}
            <Route path="benefit">
              <Route index element={displayBenefitsElement} />
              <Route path="create" element={createBenefitElement} />
            </Route>

            {/* leave-request */}
            <Route path="leave-request">
              <Route index element={displayLeaveRequestsElement} />
              <Route path="create" element={createLeaveRequestElement} />
            </Route>

            {/* request-resource  */}
            <Route path="request-resource">
              <Route index element={displayRequestResourcesElement} />
              <Route path="create" element={requestResourceElement} />
            </Route>

            {/* expense-claim */}
            <Route path="expense-claim">
              <Route index element={displayExpenseClaimsElement} />
              <Route path="create" element={createExpenseClaimElement} />
            </Route>
          </Route>

          <Route path="general">

            {/* anonymous-request */}
            <Route path="anonymous-request">
              <Route index element={displayAnonymousRequestsElement} />
              <Route path="create" element={createAnonymousRequestElement} />
            </Route>

            {/* endorsement */}
            <Route path="endorsement">
              <Route index element={displayEndorsementsElement} />
              <Route path="create" element={createEndorsementElement} />
            </Route>

            {/* printer-issue */}
            <Route path="printer-issue">
              <Route index element={displayPrinterIssuesElement} />
              <Route path="create" element={createPrinterIssueElement} />
            </Route>

            {/* referment */}
            <Route path="referment">
              <Route index element={displayRefermentsElement} />
              <Route path="create" element={createRefermentElement} />
            </Route>
          </Route>

          <Route path="outreach">

            {/* event */}
            <Route path="event">
              <Route index element={displayEventsElement} />
              <Route path="create" element={eventCreatorElement} />
            </Route>

            {/* survey-builder */}
            <Route path="survey">
              <Route index element={displaySurveysElement} />
              <Route path="create" element={surveyBuilderElement} />
            </Route>

            {/* announcements */}
            <Route path="announcement">
              <Route index element={displayAnnouncementsElement} />
              <Route path="create" element={createAnnouncementElement} />
              <Route path=":announcementId" element={displayAnnouncementElement} />
            </Route>
          </Route>

          {/* directory */}
          <Route path="directory" element={directoryElement} />
        </Route>

        {/* catch all */}
        <Route path="*" element={notFoundElement} />
      </Routes>
    </MantineProvider>
  );
}

export default App;

/**
 * <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />

        <Route path="login" element={<Login />} />

        
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route path="users">
            <Route index element={<UsersList />} />
             <Route path=":id" element={<EditUserForm />} /> 
             <Route path="new" element={<NewUserForm />} /> 
          </Route>

          <Route path="notes">
            <Route index element={<NotesList />} />
            <Route path=":id" element={<EditNote />} />
            <Route path="new" element={<NewNote />} />
          </Route>
          
        </Route>
        
      </Route>
    </Routes>
 */
