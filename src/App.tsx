import "./index.css";

import { MantineProvider } from "@mantine/core";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";

import CustomFonts from "./components/customFonts/CustomFonts";
import DevTesting from "./components/devTesting/DevTesting";
import ErrorFallback from "./components/errorFallback/ErrorFallback";
import { useGlobalState } from "./hooks/useGlobalState";

const PublicLayout = lazy(() =>
  import("./components/publicLayout/PublicLayout")
);

const Login = lazy(() => import("./components/login/Login"));

const Register = lazy(() => import("./components/register/Register"));

const PortalLayout = lazy(() =>
  import("./components/portalLayout/PortalLayout")
);

const Home = lazy(() => import("./components/home/Home"));

const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));

const DisplayResponsiveChart = lazy(
  () => import("./components/dashboard/DisplayResponsiveChart"),
);

const DisplayCustomer = lazy(() =>
  import("./components/customer/DisplayCustomer")
);

const CreateCustomer = lazy(() => import("./components/customer/Customer"));

const DisplayComment = lazy(() =>
  import("./components/comment/DisplayComment")
);

const DisplayFileUpload = lazy(
  () => import("./components/fileUploads/DisplayFileUploads"),
);

const CreateProduct = lazy(() => import("./components/product/CreateProduct"));

const CreateRepairTicket = lazy(
  () => import("./components/repairTicket/create/CreateRepairTicket"),
);

const DisplayRepairTicket = lazy(
  () => import("./components/repairTicket/display/DisplayRepairTickets"),
);

const DisplayExpenseClaims = lazy(
  () => import("./components/expenseClaim/DisplayExpenseClaims"),
);

const CreateExpenseClaim = lazy(
  () => import("./components/expenseClaim/create/ExpenseClaim"),
);

const DisplayAnnouncements = lazy(
  () =>
    import(
      "./components/announcement/display/announcements/DisplayAnnouncements"
    ),
);

const CreateAnnouncement = lazy(
  () => import("./components/announcement/create/Announcement"),
);

const DisplayAnnouncement = lazy(
  () =>
    import(
      "./components/announcement/display/announcement/DisplayAnnouncement"
    ),
);

const DisplayEvents = lazy(() => import("./components/event/DisplayEvents"));

const EventCreator = lazy(() => import("./components/event/create/Event"));

const DisplaySurveys = lazy(() =>
  import("./components/survey/display/DisplaySurveys")
);

const SurveyBuilder = lazy(() => import("./components/survey/create/Survey"));

const Directory = lazy(() => import("./components/directory/Directory"));

const Resource = lazy(() => import("./components/resource/Resource"));

const NotFound = lazy(() => import("./components/notFound/NotFound"));

function App() {
  const {
    globalState: {
      themeObject,
      errorState: { errorCallback, errorMessage, isError },
    },
  } = useGlobalState();

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

  // @desc   repair-ticket page (create)
  // @route  /home/repair-ticket/create
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

  // @desc   repair-ticket page (index and display)
  // @route  /home/repair-ticket (index) and /home/repair-ticket/display
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
        {
          /*
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
      </Route> */
        }

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

          {/* actions */}
          <Route path="actions">
            <Route path="announcement">
              <Route index element={createAnnouncementElement} />
              <Route path="create" element={createAnnouncementElement} />
              <Route
                path=":announcementId"
                element={displayAnnouncementElement}
              />
            </Route>

            <Route path="event">
              <Route index element={displayEventsElement} />
              <Route path="create" element={eventCreatorElement} />
            </Route>

            <Route path="expense-claim">
              <Route index element={displayExpenseClaimsElement} />
              <Route path="create" element={createExpenseClaimElement} />
            </Route>

            <Route path="survey">
              <Route index element={surveyBuilderElement} />
              <Route path="create" element={surveyBuilderElement} />
              <Route path="display" element={displaySurveysElement} />
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
