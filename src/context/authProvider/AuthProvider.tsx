import { createContext, useReducer, useMemo } from 'react';
import { authReducer, initialAuthState } from './state';
import { AuthProviderProps } from './types';

const AuthContext = createContext({});

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
