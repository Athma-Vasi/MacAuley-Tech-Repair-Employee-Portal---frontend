import { createContext, useReducer, useMemo } from 'react';
import { authReducer, initialAuthState } from './state';
import { AuthDispatch, AuthProviderProps, AuthState } from './types';

const AuthContext = createContext<{
  authState: AuthState;
  authDispatch: React.Dispatch<AuthDispatch>;
}>({
  authState: initialAuthState,
  authDispatch: () => null,
});

function AuthProvider({ children }: AuthProviderProps) {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  const authContextValue = useMemo(
    () => ({ authState, authDispatch }),
    [authState, authDispatch]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
