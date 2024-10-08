import "./index.css";

import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";

import CreateAnnouncementWrapper from "./components/announcement/create";
import DisplayAnnouncementWrapper from "./components/announcement/display/announcement";
import CommentWrapper from "./components/comment";
import CustomFonts from "./components/customFonts/CustomFonts";
import CustomerWrapper from "./components/customer";
import DashboardWrapper from "./components/dashboard";
import ResponsiveChartWrapper from "./components/dashboard/display/DisplayResponsiveChart";
import DevTesting from "./components/devTesting/DevTesting";
import DirectoryWrapper from "./components/directory";
import DisplayEventsWrapper from "./components/event";
import CreateEventWrapper from "./components/event/create";
import DisplayExpenseClaimsWrapper from "./components/expenseClaim";
import CreateExpenseClaimWrapper from "./components/expenseClaim/create";
import LoginWrapper from "./components/login";
import NotFoundWrapper from "./components/notFound";
import PortalLayoutWrapper from "./components/portalLayout";
import ProductWrapper from "./components/product";
import RegisterWrapper from "./components/register";
import RepairTicketWrapper from "./components/repairTicket";
import CreateSurveyWrapper from "./components/survey/create";
import DisplaySurveysWrapper from "./components/survey/display";
import { useGlobalState } from "./hooks/useGlobalState";

function App() {
  const {
    globalState: {
      themeObject,
    },
  } = useGlobalState();

  // @desc   the public facing page
  // @route  /
  // @access public
  // const rootIndexWrapper = (
  //   <ErrorSuspenseHOC
  //   // <ErrorBoundary
  //   //   fallback={
  //   //     <ErrorFallback
  //   //       isError={isError}
  //   //       errorCallback={errorCallback}
  //   //       errorMessage={errorMessage}
  //   //     />
  //   //   }
  //   // >
  //   //   <Suspense fallback={<div>Generic Loading message...</div>}>
  //   //     <PublicLayout />
  //   //   </Suspense>
  //   // </ErrorBoundary>
  // );

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={themeObject}>
      <CustomFonts />
      <Routes>
        {
          // @desc   the login page
          // @route  /login
          // @access public
        }
        <Route path="/" element={<LoginWrapper />} />
        <Route index element={<LoginWrapper />} />
        <Route path="login" element={<LoginWrapper />} />
        {
          // @desc   the register page
          // @route  /register
          // @access public
        }
        <Route path="register" element={<RegisterWrapper />} />

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
        {
          // @desc   the parent component for the entire app (logged in users only)
          // @route  /home
          // @access private
        }
        <Route path="home" element={<PortalLayoutWrapper />}>
          {/* <Route index element={<HomeWrapper />} /> */}
          {/* for testing only */}
          <Route index element={<RepairTicketWrapper />} />

          {/* DEV TEST ROUTES */}
          <Route path="dev-testing" element={<DevTesting />} />

          {
            // @desc   the dashboard page
            // @route  /home/dashboard
            // @access private
          }
          <Route path="dashboard">
            <Route index element={<DashboardWrapper />} />
            {
              // @desc   the responsive chart page
              // @route  /home/dashboard/responsive-chart
              // @access private
            }
            <Route path=":chartKind" element={<ResponsiveChartWrapper />} />
          </Route>

          {
            // @desc   customer page (index and display)
            // @route  /home/customer (index) and /home/customer/display
            // @access private
          }
          <Route path="customer">
            <Route index element={<CustomerWrapper />} />
            <Route path="create" element={<CustomerWrapper />} />
            {/* <Route path="display" element={<CustomerWrapper />} /> */}
          </Route>

          {
            // @desc   comment page (index and display)
            // @route  /home/product/comment (index) and /home/product/comment/display
            // @access private
          }
          <Route path="comment">
            <Route index element={<CommentWrapper />} />
            <Route path="display" element={<CommentWrapper />} />
          </Route>

          {
            // @desc   products page
            // @route  /home/product/create
            // @access private
          }
          <Route path="product">
            <Route index element={<ProductWrapper />} />
            <Route path="create" element={<ProductWrapper />} />
            {/* <Route path="display" element={displayProductsElement} /> */}
          </Route>

          {
            // @desc   repair-ticket page (index and display)
            // @route  /home/repair-ticket (index) and /home/repair-ticket/display
            // @access private
          }
          <Route path="repair-ticket">
            <Route index element={<RepairTicketWrapper />} />
            <Route path="create" element={<RepairTicketWrapper />} />
            {/* <Route path="display" element={displayRepairTicketsElement} /> */}
          </Route>

          {/* actions */}
          <Route path="actions">
            {
              // @desc   announcement page (create)
              // @route  /home/actions/announcement/create
              // @access private
            }
            <Route path="announcement">
              <Route index element={<CreateAnnouncementWrapper />} />
              <Route path="create" element={<CreateAnnouncementWrapper />} />
              <Route
                path=":announcementId"
                element={<DisplayAnnouncementWrapper />}
              />
            </Route>

            {
              // @desc   event-creator page (index and display)
              // @route  /home/actions/event (index) and /home/actions/event/display
              // @access private
            }
            <Route path="event">
              <Route index element={<DisplayEventsWrapper />} />
              <Route path="create" element={<CreateEventWrapper />} />
            </Route>

            {
              // @desc   expense-claim page (index and display)
              // @route  /home/actions/expense-claim (index) and /home/actions/expense-claim/display
              // @access private
            }
            <Route path="expense-claim">
              <Route index element={<DisplayExpenseClaimsWrapper />} />
              <Route path="create" element={<CreateExpenseClaimWrapper />} />
            </Route>

            {
              // @desc   survey-builder page (create)
              // @route  /home/actions/survey-builder/create
              // @access private
            }
            <Route path="survey">
              <Route index element={<CreateSurveyWrapper />} />
              <Route path="create" element={<CreateSurveyWrapper />} />
              <Route path="display" element={<DisplaySurveysWrapper />} />
            </Route>
          </Route>

          {
            // @desc   the directory page
            // @route  /home/directory
            // @access private
          }
          <Route path="directory" element={<DirectoryWrapper />} />
        </Route>

        {
          // @desc   catch all page
          // @route  *
          // @access public
        }
        <Route path="*" element={<NotFoundWrapper />} />
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
