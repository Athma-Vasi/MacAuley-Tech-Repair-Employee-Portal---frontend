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
const DisplayCustomer = lazy(() => import("./components/customer/DisplayCustomer"));

const CreateCustomer = lazy(() => import("./components/customer/Customer"));

// ╔═════════════════════════════════════════════════════════════════╗
//   COMMENT
// ╚═════════════════════════════════════════════════════════════════╝
const DisplayComment = lazy(() => import("./components/comment/DisplayComment"));

// ╔═════════════════════════════════════════════════════════════════╗
//   FILE UPLOAD
// ╚═════════════════════════════════════════════════════════════════╝
const DisplayFileUpload = lazy(
  () => import("./components/fileUploads/DisplayFileUploads")
);

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

// ╭─────────────────────────────────────────────────────────────────╮
//    CPU
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayCPU = lazy(() => import("./components/product/cpu/DisplayCPU"));

// ╭─────────────────────────────────────────────────────────────────╮
//    COMPUTER CASE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayCase = lazy(() => import("./components/product/case/DisplayCase"));

// ╭─────────────────────────────────────────────────────────────────╮
//    DESKTOP COMPUTER
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayDesktopComputer = lazy(
  () => import("./components/product/desktopComputer/DisplayDestopComputer")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    DISPLAY
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayDisplay = lazy(() => import("./components/product/display/DisplayDisplay"));

// ╭─────────────────────────────────────────────────────────────────╮
//    GPU
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayGPU = lazy(() => import("./components/product/gpu/DisplayGPU"));

// ╭─────────────────────────────────────────────────────────────────╮
//    HEADPHONE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayHeadphone = lazy(
  () => import("./components/product/headphone/DisplayHeadphone")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    KEYBOARD
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayKeyboard = lazy(
  () => import("./components/product/keyboard/DisplayKeyboard")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    LAPTOP
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayLaptop = lazy(() => import("./components/product/laptop/DisplayLaptop"));

// ╭─────────────────────────────────────────────────────────────────╮
//    RAM
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayRAM = lazy(() => import("./components/product/ram/DisplayRAM"));

// ╭─────────────────────────────────────────────────────────────────╮
//    MICROPHONE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayMicrophone = lazy(
  () => import("./components/product/microphone/DisplayMicrophone")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayMotherboard = lazy(
  () => import("./components/product/motherboard/DisplayMotherboard")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    MOUSE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayMouse = lazy(() => import("./components/product/mouse/DisplayMouse"));

// ╭─────────────────────────────────────────────────────────────────╮
//    PSU
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayPSU = lazy(() => import("./components/product/psu/DisplayPSU"));

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplaySmartphone = lazy(
  () => import("./components/product/smartphone/DisplaySmartphone")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    SPEAKER
// ╰─────────────────────────────────────────────────────────────────╯
const DisplaySpeaker = lazy(() => import("./components/product/speaker/DisplaySpeaker"));

// ╭─────────────────────────────────────────────────────────────────╮
//    STORAGE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayStorage = lazy(() => import("./components/product/storage/DisplayStorage"));

// ╭─────────────────────────────────────────────────────────────────╮
//    TABLET
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayTablet = lazy(() => import("./components/product/tablet/DisplayTablet"));

// ╭─────────────────────────────────────────────────────────────────╮
//    WEBCAM
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayWebcam = lazy(() => import("./components/product/webcam/DisplayWebcam"));

// ╔═════════════════════════════════════════════════════════════════╗
//   PRODUCT REVIEW
// ╚═════════════════════════════════════════════════════════════════╝
const DisplayProductReview = lazy(
  () => import("./components/productReview/DisplayProductReview")
);

// ╔═════════════════════════════════════════════════════════════════╗
//   REPAIR
// ╚═════════════════════════════════════════════════════════════════╝
const CreateRepairTicket = lazy(
  () => import("./components/repairTicket/create/CreateRepairTicket")
);

const DisplayRepairTicket = lazy(
  () => import("./components/repairTicket/display/DisplayRepairTickets")
);

// ╔═════════════════════════════════════════════════════════════════╗
//   TRANSACTION
// ╚═════════════════════════════════════════════════════════════════╝

// ╭─────────────────────────────────────────────────────────────────╮
//    PURCHASE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayPurchase = lazy(() => import("./components/purchase/DisplayPurchase"));

// ╭─────────────────────────────────────────────────────────────────╮
//    RMA
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayRMA = lazy(() => import("./components/rma/DisplayRMA"));

// ╔═════════════════════════════════════════════════════════════════╗
//   COMPANY
// ╚═════════════════════════════════════════════════════════════════╝

// ╭─────────────────────────────────────────────────────────────────╮
//    ADDRESS CHANGE
// ╰─────────────────────────────────────────────────────────────────╯
const CreateAddressChange = lazy(() => import("./components/addressChange/create"));

const DisplayAddressChanges = lazy(
  () => import("./components/addressChange/DisplayAddressChanges")
);

// ╭─────────────────────────────────────────────────────────────────╮
//    BENEFIT
// ╰─────────────────────────────────────────────────────────────────╯
const CreateBenefit = lazy(() => import("./components/benefit/create/Benefit"));

const DisplayBenefits = lazy(() => import("./components/benefit/DisplayBenefits"));

// ╭─────────────────────────────────────────────────────────────────╮
//    LEAVE REQUEST
// ╰─────────────────────────────────────────────────────────────────╯
const CreateLeaveRequest = lazy(
  () => import("./components/leaveRequest/create/LeaveRequest")
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
  () => import("./components/expenseClaim/create/ExpenseClaim")
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
  () => import("./components/anonymousRequest/create/AnonymousRequest")
);

// ╭─────────────────────────────────────────────────────────────────╮
//   ENDORSEMENT
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayEndorsements = lazy(
  () => import("./components/endorsement/DisplayEndorsements")
);

const CreateEndorsement = lazy(
  () => import("./components/endorsement/create/Endorsement")
);

// ╭─────────────────────────────────────────────────────────────────╮
//   PRINTER ISSUE
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayPrinterIssues = lazy(
  () => import("./components/printerIssue/DisplayPrinterIssues")
);

const CreatePrinterIssue = lazy(
  () => import("./components/printerIssue/create/PrinterIssue")
);

// ╭─────────────────────────────────────────────────────────────────╮
//   REFERMENT
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayReferments = lazy(() => import("./components/referment/DisplayReferments"));

const CreateReferment = lazy(() => import("./components/referment/create/Referment"));

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
  () => import("./components/announcement/create/Announcement")
);

const DisplayAnnouncement = lazy(
  () => import("./components/announcement/display/announcement/DisplayAnnouncement")
);

// ╭─────────────────────────────────────────────────────────────────╮
//   EVENT
// ╰─────────────────────────────────────────────────────────────────╯
const DisplayEvents = lazy(() => import("./components/event/DisplayEvents"));

const EventCreator = lazy(() => import("./components/event/create/Event"));

// ╭─────────────────────────────────────────────────────────────────╮
//   SURVEY
// ╰─────────────────────────────────────────────────────────────────╯
const DisplaySurveys = lazy(() => import("./components/survey/display/DisplaySurveys"));

const SurveyBuilder = lazy(() => import("./components/survey/create/Survey"));

// ╔═════════════════════════════════════════════════════════════════╗
//   DIRECTORY
// ╚═════════════════════════════════════════════════════════════════╝
const Directory = lazy(() => import("./components/directory/Directory"));
const Directory1 = lazy(() => import("./components/directory1/Directory1"));

// ╔═════════════════════════════════════════════════════════════════╗
//   CATCH ALL
// ╚═════════════════════════════════════════════════════════════════╝
const NotFound = lazy(() => import("./components/notFound/NotFound"));

function App() {
  const {
    globalState: {
      themeObject,
      errorState: { errorCallback, errorMessage, isError },
    },
  } = useGlobalState();

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    WRAPPED COMPONENTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╔═════════════════════════════════════════════════════════════════╗
  //   INDEX
  // ╚═════════════════════════════════════════════════════════════════╝

  // @desc   the public facing page
  // @route  /
  // @access public
  const rootIndexWrapper = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <PublicLayout />
      </Suspense>
    </ErrorBoundary>
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   LOGIN
  // ╚═════════════════════════════════════════════════════════════════╝

  // @desc   the login page
  // @route  /login
  // @access public
  const loginElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <Login />
      </Suspense>
    </ErrorBoundary>
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   REGISTER
  // ╚═════════════════════════════════════════════════════════════════╝

  // @desc   the register page
  // @route  /register
  // @access public
  const registerElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <Register />
      </Suspense>
    </ErrorBoundary>
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   PORTAL INDEX
  // ╚═════════════════════════════════════════════════════════════════╝

  // @desc   the parent component for the entire app (logged in users only)
  // @route  /home
  // @access private
  const homeIndexWrapper = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <PortalLayout />
      </Suspense>
    </ErrorBoundary>
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   HOME
  // ╚═════════════════════════════════════════════════════════════════╝

  // @desc   the home page (welcome page for logged in users)
  // @route  /home
  // @access private
  const homeElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <Home />
      </Suspense>
    </ErrorBoundary>
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   DASHBOARD
  // ╚═════════════════════════════════════════════════════════════════╝

  // @desc   the dashboard page
  // @route  /home/dashboard
  // @access private
  const dashboardElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   the responsive chart page
  // @route  /home/dashboard/responsive-chart
  // @access private
  const displayResponsiveChartElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayResponsiveChart />
      </Suspense>
    </ErrorBoundary>
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   CUSTOMER
  // ╚═════════════════════════════════════════════════════════════════╝

  // @desc   customer page (index and display)
  // @route  /home/customer (index) and /home/customer/display
  // @access private
  const displayCustomersElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayCustomer />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   create customer page
  // @route  /home/customer/create
  // @access private
  const createCustomerElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <CreateCustomer />
      </Suspense>
    </ErrorBoundary>
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   COMMENT
  // ╚═════════════════════════════════════════════════════════════════╝

  // @desc   comment page (index and display)
  // @route  /home/product/comment (index) and /home/product/comment/display
  // @access private
  const displayCommentsElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayComment />
      </Suspense>
    </ErrorBoundary>
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   FILE UPLOAD
  // ╚═════════════════════════════════════════════════════════════════╝

  // @desc   file upload page (index = display)
  // @route  /home/file-upload (index) and /home/file-upload/display
  // @access private
  const displayFileUploadsElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayFileUpload />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayAccessory />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayCPU />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayCase />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayDesktopComputer />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayDisplay />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayGPU />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayHeadphone />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayKeyboard />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayLaptop />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayRAM />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayMicrophone />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayMotherboard />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayMouse />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayPSU />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplaySmartphone />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplaySpeaker />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayStorage />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayTablet />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayWebcam />
      </Suspense>
    </ErrorBoundary>
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   PRODUCT REVIEW
  // ╚═════════════════════════════════════════════════════════════════╝

  // @desc   product-review page (index and display)
  // @route  /home/product-review (index) and /home/product-review/display
  // @access private
  const displayProductReviewsElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayProductReview />
      </Suspense>
    </ErrorBoundary>
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   REPAIR
  // ╚═════════════════════════════════════════════════════════════════╝

  // @desc   repair-note page (create)
  // @route  /home/repair-note/create
  // @access private
  const createRepairTicketElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <CreateRepairTicket />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   repair-note page (index and display)
  // @route  /home/repair-note (index) and /home/repair-note/display
  // @access private
  const displayRepairTicketsElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayRepairTicket />
      </Suspense>
    </ErrorBoundary>
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   TRANSACTION
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //   PURCHASE
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   purchase page (index and display)
  // @route  /home/purchase (index) and /home/purchase/display
  // @access private
  const displayPurchasesElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayPurchase />
      </Suspense>
    </ErrorBoundary>
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //   RMA
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   rma page (index and display)
  // @route  /home/rma (index) and /home/rma/display
  // @access private
  const displayRMAsElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayRMA />
      </Suspense>
    </ErrorBoundary>
  );

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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayAddressChanges />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   address-change page (create)
  // @route  /home/company/address-change/create
  // @access private
  const addressChangeElement = <CreateAddressChange />;

  // ╭─────────────────────────────────────────────────────────────────╮
  //   BENEFIT
  // ╰─────────────────────────────────────────────────────────────────╯

  // @desc   benefits page (index and display)
  // @route  /home/company/benefit (index) and /home/company/benefit/display
  // @access private
  const displayBenefitsElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayBenefits />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   benefits page (create)
  // @route  /home/company/benefit/create
  // @access private
  const createBenefitElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayLeaveRequests />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   leave-request page (create)
  // @route  /home/company/leave-request/create
  // @access private
  const createLeaveRequestElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayRequestResources />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   request-resource page (create)
  // @route  /home/company/request-resource/create
  // @access private
  const requestResourceElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayExpenseClaims />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   expense-claim page (create)
  // @route  /home/company/expense-claim/create
  // @access private
  const createExpenseClaimElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayAnonymousRequests />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   anonymous-request page (create)
  // @route  /home/general/anonymous-request/create
  // @access private
  const createAnonymousRequestElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayEndorsements />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   endorsement page (create)
  // @route  /home/general/endorsement/create
  // @access private
  const createEndorsementElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayPrinterIssues />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   printer-issue page (create)
  // @route  /home/general/printer-issue/create
  // @access private
  const createPrinterIssueElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayReferments />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   referment page (create)
  // @route  /home/general/referment/create
  // @access private
  const createRefermentElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayAnnouncements />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   announcement page (create)
  // @route  /home/outreach/announcement/create
  // @access private
  const createAnnouncementElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <CreateAnnouncement />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   announcement page (display single announcement)
  // @route  /home/outreach/announcement/display/:announcementId
  // @access private
  const displayAnnouncementElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayEvents />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   event-creator page (create)
  // @route  /home/outreach/event-creator/create
  // @access private
  const eventCreatorElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplaySurveys />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   survey-builder page (create)
  // @route  /home/outreach/survey-builder/create
  // @access private
  const surveyBuilderElement = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <Directory />
      </Suspense>
    </ErrorBoundary>
  );

  const directory1Element = (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <Directory1 />
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
    <ErrorBoundary
      fallback={
        <ErrorFallback
          isError={isError}
          errorCallback={errorCallback}
          errorMessage={errorMessage}
        />
      }
    >
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
        <Route path="/" element={loginElement} />
        {/* <Route index element={loginElement} /> */}
        <Route path="login" element={loginElement} />
        <Route path="register" element={registerElement} />

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

          {/* customer */}
          <Route path="customer">
            <Route index element={displayCustomersElement} />
            <Route path="create" element={createCustomerElement} />
            <Route path="display" element={displayCustomersElement} />
          </Route>

          {/* comment */}
          <Route path="comment">
            <Route index element={displayCommentsElement} />
            <Route path="display" element={displayCommentsElement} />
          </Route>

          {/* file upload */}
          <Route path="file-upload">
            <Route index element={displayFileUploadsElement} />
            <Route path="display" element={displayFileUploadsElement} />
          </Route>

          {/* product */}
          <Route path="product">
            <Route path="create" element={createProductElement} />
            {/* accessory */}
            <Route path="accessory">
              <Route index element={displayAccessoriesElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* cpu */}
            <Route path="cpu">
              <Route index element={displayCPUsElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* case */}
            <Route path="computer-case">
              <Route index element={displayCasesElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* desktop-computer */}
            <Route path="desktop-computer">
              <Route index element={displayDesktopComputersElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* display */}
            <Route path="display">
              <Route index element={displayDisplaysElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* gpu */}
            <Route path="gpu">
              <Route index element={displayGPUsElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* headphone */}
            <Route path="headphone">
              <Route index element={displayHeadphonesElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* keyboard */}
            <Route path="keyboard">
              <Route index element={displayKeyboardsElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* laptop */}
            <Route path="laptop">
              <Route index element={displayLaptopsElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* ram */}
            <Route path="ram">
              <Route index element={displayRAMsElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* microphone */}
            <Route path="microphone">
              <Route index element={displayMicrophonesElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* motherboard */}
            <Route path="motherboard">
              <Route index element={displayMotherboardsElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* mouse */}
            <Route path="mouse">
              <Route index element={displayMousesElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* psu */}
            <Route path="psu">
              <Route index element={displayPSUsElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* smartphone */}
            <Route path="smartphone">
              <Route index element={displaySmartphonesElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* speaker */}
            <Route path="speaker">
              <Route index element={displaySpeakersElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* storage */}
            <Route path="storage">
              <Route index element={displayStoragesElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* tablet */}
            <Route path="tablet">
              <Route index element={displayTabletsElement} />
              <Route path="create" element={createProductElement} />
            </Route>

            {/* webcam */}
            <Route path="webcam">
              <Route index element={displayWebcamsElement} />
              <Route path="create" element={createProductElement} />
            </Route>
          </Route>

          {/* product-review */}
          <Route path="product-review">
            <Route index element={displayProductReviewsElement} />
            <Route path="display" element={displayProductReviewsElement} />
          </Route>

          {/* transactions */}

          {/* purchase */}
          <Route path="purchase">
            <Route index element={displayPurchasesElement} />
            <Route path="display" element={displayPurchasesElement} />
          </Route>

          {/* rma */}
          <Route path="rma">
            <Route index element={displayRMAsElement} />
            <Route path="display" element={displayRMAsElement} />
          </Route>

          {/* repair-ticket */}
          <Route path="repair-ticket">
            <Route index element={displayRepairTicketsElement} />
            <Route path="create" element={createRepairTicketElement} />
            <Route path="display" element={displayRepairTicketsElement} />
          </Route>

          {/* company */}
          <Route path="company">
            {/* address change */}
            <Route path="address-change">
              <Route index element={displayAddressChangesElement} />
              <Route path="display" element={displayAddressChangesElement} />
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
              <Route index element={surveyBuilderElement} />
              <Route path="create" element={surveyBuilderElement} />
              <Route path="display" element={displaySurveysElement} />
            </Route>

            {/* announcements */}
            <Route path="announcement">
              <Route index element={createAnnouncementElement} />
              <Route path="create" element={createAnnouncementElement} />
              <Route path=":announcementId" element={displayAnnouncementElement} />
            </Route>
          </Route>

          {/* directory */}
          <Route path="directory" element={directoryElement} />
          <Route path="directory1" element={directory1Element} />
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
