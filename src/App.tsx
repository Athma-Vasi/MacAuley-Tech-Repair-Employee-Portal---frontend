import { MantineProvider } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';

import { AddressChange } from './components/addressChange';
import { CreateAnnouncement } from './components/announcements/createAnnouncement';
import { CreateBenefit } from './components/benefits/createBenefit';
import { CreateAnonymousRequest } from './components/createAnonymousRequest';
import { Dashboard } from './components/dashboard';
import { CreateEndorsement } from './components/endorsements/createEndorsement';
import { EventCreator } from './components/events/eventCreator';
import { ExpenseClaim } from './components/expenseClaim';
import { LeaveRequest } from './components/leaveRequest';
import { Login } from './components/login';
import { NotesList } from './components/notesList';
import { NotFound } from './components/notFound';
import { PortalLayout } from './components/portalLayout';
import { CreatePrinterIssue } from './components/printerIssue/createPrinterIssue';
import { PublicLayout } from './components/publicLayout';
import { CreateReferment } from './components/referments/createReferment';
import { Register } from './components/register';
import { RequestResource } from './components/requestResource';
import { RequireAuth } from './components/requireAuth';
import { SurveyBuilder } from './components/surveyBuilder';
import { Unauthorized } from './components/unauthorized';
import { UsersList } from './components/usersList';
import { useGlobalState } from './hooks/useGlobalState';

function App() {
  const {
    globalState: { colorScheme },
  } = useGlobalState();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
      <Routes>
        {/* these are public routes */}
        <Route path="/" element={<PublicLayout />}>
          {/* <Route index element={<Login />} /> */}
          {/* <Route path="login" element={<Login />} /> */}
          {/* <Route path="register" element={<Register />} /> */}
          {/* <Route path="unauthorized" element={<Unauthorized />} /> */}
          {/* DEV PATHS - DELETE LATER*/}
          <Route path="create-announcement" element={<CreateAnnouncement />} />
          {/* <Route path="create-benefit" element={<CreateBenefit />} /> */}
          {/* <Route path="create-address-change" element={<AddressChange />} /> */}
          {/* <Route path="create-leave-request" element={<LeaveRequest />} /> */}
          {/* <Route path="create-request-resource" element={<RequestResource />} /> */}
          {/* <Route path="create-endorsement" element={<CreateEndorsement />} /> */}
          {/* <Route path="create-printer-issue" element={<CreatePrinterIssue />} /> */}
          {/* <Route path="create-referment" element={<CreateReferment />} /> */}
          {/* <Route
            path="create-anonymous-request"
            element={<CreateAnonymousRequest />}
          /> */}
          {/* <Route path="event-creator" element={<EventCreator />} /> */}
          {/* <Route path="create-expense-claim" element={<ExpenseClaim />} /> */}
          <Route path="survey-builder" element={<SurveyBuilder />} />
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
