import './index.css';

import { MantineProvider, Text } from '@mantine/core';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';

import CustomFonts from './components/customFonts/CustomFonts';
import DevTesting from './components/devTesting/DevTesting';
import ErrorFallback from './components/errorFallback/ErrorFallback';
import { useGlobalState } from './hooks/useGlobalState';

// ┏━ begin lazy loading ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const PublicLayout = lazy(
  () => import('./components/publicLayout/PublicLayout')
);
const Login = lazy(() => import('./components/login/Login'));
const Register = lazy(() => import('./components/register/Register'));

const PortalLayout = lazy(
  () => import('./components/portalLayout/PortalLayout')
);
const Home = lazy(() => import('./components/home/Home'));

// dashboard
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));

// dashboard -> display responsive chart
const DisplayResponsiveChart = lazy(
  () => import('./components/dashboard/DisplayResponsiveChart')
);

// dashboard -> product

// dashboard -> product -> create
const CreateProduct = lazy(
  () => import('./components/product/create/CreateProduct')
);

// dashboard -> product -> create -> accessory
const CreateAccessory = lazy(
  () => import('./components/product/accessory/create/CreateAccessory')
);

// dashboard -> product -> display
const DisplayProducts = lazy(
  () => import('./components/product/DisplayProducts')
);

// directory
const Directory = lazy(() => import('./components/directory/Directory'));

// repair note
const CreateRepairNote = lazy(
  () => import('./components/repairNote/create/CreateRepairNote')
);
const DisplayRepairNotes = lazy(
  () => import('./components/repairNote/display/DisplayRepairNotes')
);

// company
const AddressChange = lazy(
  () => import('./components/addressChange/create/AddressChange')
);
const DisplayAddressChanges = lazy(
  () => import('./components/addressChange/DisplayAddressChanges')
);

const CreateBenefit = lazy(
  () => import('./components/benefits/create/CreateBenefit')
);
const DisplayBenefits = lazy(
  () => import('./components/benefits/DisplayBenefits')
);

const CreateLeaveRequest = lazy(
  () => import('./components/leaveRequest/create/CreateLeaveRequest')
);
const DisplayLeaveRequests = lazy(
  () => import('./components/leaveRequest/DisplayLeaveRequests')
);

const DisplayRequestResources = lazy(
  () => import('./components/requestResource/DisplayRequestResources')
);
const RequestResource = lazy(
  () => import('./components/requestResource/create/RequestResource')
);

const DisplayExpenseClaims = lazy(
  () => import('./components/expenseClaim/DisplayExpenseClaims')
);
const CreateExpenseClaim = lazy(
  () => import('./components/expenseClaim/create/CreateExpenseClaim')
);

// general
const DisplayAnonymousRequests = lazy(
  () => import('./components/anonymousRequest/DisplayAnonymousRequests')
);
const CreateAnonymousRequest = lazy(
  () => import('./components/anonymousRequest/create/CreateAnonymousRequest')
);

const DisplayEndorsements = lazy(
  () => import('./components/endorsements/DisplayEndorsements')
);
const CreateEndorsement = lazy(
  () => import('./components/endorsements/create/CreateEndorsement')
);

const DisplayPrinterIssues = lazy(
  () => import('./components/printerIssue/DisplayPrinterIssues')
);
const CreatePrinterIssue = lazy(
  () => import('./components/printerIssue/create/CreatePrinterIssue')
);

const DisplayReferments = lazy(
  () => import('./components/referment/DisplayReferments')
);
const CreateReferment = lazy(
  () => import('./components/referment/create/CreateReferment')
);

// outreach
const DisplayEvents = lazy(() => import('./components/event/DisplayEvents'));
const EventCreator = lazy(
  () => import('./components/event/create/EventCreator')
);

const DisplaySurveys = lazy(
  () => import('./components/survey/display/DisplaySurveys')
);
const SurveyBuilder = lazy(
  () => import('./components/survey/create/SurveyBuilder')
);

const DisplayAnnouncements = lazy(
  () =>
    import(
      './components/announcement/display/announcements/DisplayAnnouncements'
    )
);
const CreateAnnouncement = lazy(
  () => import('./components/announcement/create/CreateAnnouncement')
);
const DisplayAnnouncement = lazy(
  () =>
    import('./components/announcement/display/announcement/DisplayAnnouncement')
);

// catch all
const NotFound = lazy(() => import('./components/notFound/NotFound'));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end lazy loading ━┛

function App() {
  const {
    globalState: { themeObject, errorState },
  } = useGlobalState();

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

  // @desc   products page with accessory outlet
  // @route  /home/product/create/accessory
  // @access private
  const createAccessoryElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <CreateAccessory />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   products page
  // @route  /home/product/display
  // @access private
  const displayProductsElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayProducts />
      </Suspense>
    </ErrorBoundary>
  );

  // @desc   the bar chart page
  // @route  /home/dashboard/responsive-chart
  // @access private
  const displayResponsiveChartElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayResponsiveChart />
      </Suspense>
    </ErrorBoundary>
  );

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

  // @desc   repair-note page (index and display)
  // @route  /home/repair-note (index) and /home/repair-note/display
  // @access private
  const displayRepairNotesElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <DisplayRepairNotes />
      </Suspense>
    </ErrorBoundary>
  );

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

  // @desc   the company action landing page
  // @route  /home/company
  // @access private
  const companyElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <Text>Company</Text>
      </Suspense>
    </ErrorBoundary>
  );

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

  // @desc   general action landing page
  // @route  /home/general
  // @access private
  const generalElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <Text>General</Text>
      </Suspense>
    </ErrorBoundary>
  );

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

  // @desc   outreach action landing page
  // @route  /home/outreach
  // @access private
  const outreachElement = (
    <ErrorBoundary fallback={<ErrorFallback errorState={errorState} />}>
      <Suspense fallback={<div>Generic Loading message...</div>}>
        <Text>Outreach</Text>
      </Suspense>
    </ErrorBoundary>
  );

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
          {/* <Route path="dashboard" element={dashboardElement} /> */}
          <Route path="dashboard">
            <Route index element={dashboardElement} />
            <Route path="product">
              <Route index element={createProductElement} />
              <Route path="create" element={createProductElement} />
              <Route path="display" element={displayProductsElement} />
            </Route>
            <Route path=":chartKind" element={displayResponsiveChartElement} />
          </Route>

          {/* directory */}
          <Route path="directory" element={directoryElement} />

          {/* repair-note */}
          <Route path="repair-note">
            <Route index element={displayRepairNotesElement} />
            <Route path="create" element={createRepairNoteElement} />
          </Route>

          {/* company */}
          <Route path="company">
            <Route index element={companyElement} />

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
            <Route index element={generalElement} />

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
            <Route index element={outreachElement} />

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
              <Route
                path=":announcementId"
                element={displayAnnouncementElement}
              />
            </Route>
          </Route>
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
