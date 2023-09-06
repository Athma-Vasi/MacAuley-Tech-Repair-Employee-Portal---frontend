import './index.css';

import { MantineProvider, Text } from '@mantine/core';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, useNavigate } from 'react-router-dom';

import {
  AddressChange,
  DisplayAddressChanges,
} from './components/addressChange';
import {
  CreateAnnouncement,
  DisplayAnnouncement,
  DisplayAnnouncements,
} from './components/announcements';
import {
  CreateAnonymousRequest,
  DisplayAnonymousRequests,
} from './components/anonymousRequest';
import { CreateBenefit, DisplayBenefits } from './components/benefits';
import CustomFonts from './components/customFonts/CustomFonts';
import { Dashboard } from './components/dashboard';
import {
  CreateEndorsement,
  DisplayEndorsements,
} from './components/endorsements/';
import ErrorFallback from './components/errorFallback/ErrorFallback';
import { DisplayEvents, EventCreator } from './components/events';
import {
  CreateExpenseClaim,
  DisplayExpenseClaims,
} from './components/expenseClaim';
import {
  CreateLeaveRequest,
  DisplayLeaveRequests,
} from './components/leaveRequest';
import { Login } from './components/login';
import { NotFound } from './components/notFound';
import { PortalLayout } from './components/portalLayout';
import {
  CreatePrinterIssue,
  DisplayPrinterIssues,
} from './components/printerIssue';
import { PublicLayout } from './components/publicLayout';
import { CreateReferment, DisplayReferments } from './components/referments';
import { CreateRepairNote, DisplayRepairNotes } from './components/repairNote';
import {
  DisplayRequestResources,
  RequestResource,
} from './components/requestResource';
import { DisplaySurveys, SurveyBuilder } from './components/survey';
import { useAuth } from './hooks';
import { useGlobalState } from './hooks/useGlobalState';

// ┏━ begin lazy loading ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const Register = lazy(() => import('./components/register/Register'));
const Directory = lazy(() => import('./components/directory/Directory'));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ end lazy loading ━┛

function App() {
  const {
    globalState: { themeObject, errorState },
  } = useGlobalState();

  const {
    authState: { errorMessage },
  } = useAuth();
  const navigate = useNavigate();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={themeObject}>
      <CustomFonts />
      <Routes>
        {/* these are public routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<PortalLayout />}>
            <Route index element={<Register />} />
          </Route>
          {/* TEST ROUTES */}
          {/* request resource */}
          <Route path="request-resource" element={<PortalLayout />}>
            <Route index element={<RequestResource />} />
          </Route>

          {/* create leave request */}
          <Route path="leave-request" element={<PortalLayout />}>
            <Route index element={<CreateLeaveRequest />} />
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
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="users">
              <Route index element={<UsersList />} />
            </Route>

            <Route path="notes">
              <Route index element={<NotesList />} />
            </Route>
          </Route>          
        </Route> */}

        {/* DEV TEST ROUTES */}
        <Route path="home" element={<PortalLayout />}>
          <Route
            index
            element={
              <ErrorBoundary
                fallback={<ErrorFallback errorState={errorState} />}
              >
                <Suspense fallback={<div>Generic Loading message...</div>}>
                  <Dashboard />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="dashboard"
            element={
              <ErrorBoundary
                fallback={<ErrorFallback errorState={errorState} />}
              >
                <Suspense fallback={<div>Generic Loading message...</div>}>
                  <Dashboard />
                </Suspense>
              </ErrorBoundary>
            }
          />

          {/* directory */}

          <Route path="directory">
            <Route
              index
              element={
                <ErrorBoundary
                  fallback={<ErrorFallback errorState={errorState} />}
                >
                  <Suspense fallback={<div>Generic Loading message...</div>}>
                    <Directory />
                  </Suspense>
                </ErrorBoundary>
              }
            />
          </Route>

          {/* repair-note */}
          <Route path="repair-note">
            <Route index element={<DisplayRepairNotes />} />
            <Route path="display" element={<DisplayRepairNotes />} />
            <Route path="create" element={<CreateRepairNote />} />
          </Route>

          <Route path="company">
            {/* address change */}
            <Route path="address-change">
              <Route index element={<DisplayAddressChanges />} />
              <Route path="create" element={<AddressChange />} />
              <Route path="display" element={<DisplayAddressChanges />} />
            </Route>

            {/* benefit */}
            <Route path="benefit">
              <Route index element={<DisplayBenefits />} />
              <Route path="create" element={<CreateBenefit />} />
              <Route path="display" element={<DisplayBenefits />} />
            </Route>

            {/* leave-request */}
            <Route path="leave-request">
              <Route index element={<CreateLeaveRequest />} />
              <Route path="display" element={<DisplayLeaveRequests />} />
              <Route path="create" element={<CreateLeaveRequest />} />
            </Route>
            {/* request-resource  */}
            <Route path="request-resource">
              <Route index element={<DisplayRequestResources />} />
              <Route path="create" element={<RequestResource />} />
              <Route path="display" element={<DisplayRequestResources />} />
            </Route>

            {/* expense-claim */}
            <Route path="expense-claim">
              <Route index element={<DisplayExpenseClaims />} />
              <Route path="create" element={<CreateExpenseClaim />} />
              <Route path="display" element={<DisplayExpenseClaims />} />
            </Route>
          </Route>

          <Route path="general">
            {/* anonymous-request */}
            <Route path="anonymous-request">
              <Route index element={<DisplayAnonymousRequests />} />
              <Route path="create" element={<CreateAnonymousRequest />} />
              <Route path="display" element={<DisplayAnonymousRequests />} />
            </Route>

            {/* endorsement */}
            <Route path="endorsement">
              <Route index element={<DisplayEndorsements />} />
              <Route path="create" element={<CreateEndorsement />} />
              <Route path="display" element={<DisplayEndorsements />} />
            </Route>

            {/* printer-issue */}
            <Route path="printer-issue">
              <Route index element={<DisplayPrinterIssues />} />
              <Route path="create" element={<CreatePrinterIssue />} />
              <Route path="display" element={<DisplayPrinterIssues />} />
            </Route>

            {/* referment */}
            <Route path="referment">
              <Route index element={<DisplayReferments />} />
              <Route path="create" element={<CreateReferment />} />
              <Route path="display" element={<DisplayReferments />} />
            </Route>
          </Route>

          <Route path="outreach">
            {/* event-creator */}
            <Route path="event-creator">
              <Route index element={<DisplayEvents />} />
              <Route path="create" element={<EventCreator />} />
              <Route path="display" element={<DisplayEvents />} />
            </Route>

            {/* survey-builder */}
            <Route path="survey-builder">
              <Route index element={<DisplaySurveys />} />
              <Route path="create" element={<SurveyBuilder />} />
              <Route path="display" element={<DisplaySurveys />} />
            </Route>

            {/* announcements */}
            <Route path="announcement">
              <Route index element={<DisplayAnnouncements />} />
              <Route path="create" element={<CreateAnnouncement />} />
              <Route path="display" element={<DisplayAnnouncements />} />
              <Route
                path="display/:announcementId"
                element={<DisplayAnnouncement />}
              />
            </Route>
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
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
