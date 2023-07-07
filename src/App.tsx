import { Route, Routes } from 'react-router-dom';

import { RequireAuth } from './components/requireAuth';
import { PublicLayout } from './components/publicLayout';
import { Login } from './components/login';
import { Register } from './components/register';
import { PortalLayout } from './components/portalLayout';
import { Dashboard } from './components/dashboard';
import { UsersList } from './components/usersList';
import { NotesList } from './components/notesList';
import { NotFound } from './components/notFound';
import { Unauthorized } from './components/unauthorized';
import { MantineProvider } from '@mantine/core';
import { useGlobalState } from './hooks/useGlobalState';
import { CreateAnnouncement } from './components/announcements/createAnnouncement';
import { CreateBenefit } from './components/benefits/createBenefit';
import { AddressChange } from './components/addressChange';

function App() {
  const {
    globalState: { colorScheme },
  } = useGlobalState();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
      <Routes>
        {/* these are public routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          {/* DEV PATHS - DELETE LATER*/}
          <Route path="create-announcement" element={<CreateAnnouncement />} />
          <Route path="create-benefit" element={<CreateBenefit />} />
          <Route path="address-change" element={<AddressChange />} />
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
