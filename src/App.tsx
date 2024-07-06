import "./index.css";

import { MantineProvider } from "@mantine/core";
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

const Resource = lazy(() => import("./components/resource/Resource"));

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

  const resourceElement = (
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
        <Resource />
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
            <Route index element={createProductElement} />
            <Route path="create" element={createProductElement} />
            {/* <Route path="display" element={displayProductsElement} /> */}
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

          {/* resource */}
          <Route path="resource" element={resourceElement} />
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
