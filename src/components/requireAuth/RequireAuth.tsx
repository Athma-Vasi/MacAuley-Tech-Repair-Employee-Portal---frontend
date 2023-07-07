import { Navigate, Outlet,useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

type RequireAuthProps = {
  allowedRoles: ('Admin' | 'Manager' | 'Employee')[];
};

function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const { authState } = useAuth();
  const location = useLocation();

  // if the user is authenticated and has the allowed role, render the protected route
  // else if user is logged in but does not have the allowed role, redirect to login page
  // else if user is not logged in, redirect to login page
  return authState.roles.find((role: 'Admin' | 'Manager' | 'Employee') =>
    allowedRoles.includes(role)
  ) ? (
    <Outlet />
  ) : authState.isLoggedIn ? (
    <Navigate to="unauthorized" replace state={{ from: location }} />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export { RequireAuth };
