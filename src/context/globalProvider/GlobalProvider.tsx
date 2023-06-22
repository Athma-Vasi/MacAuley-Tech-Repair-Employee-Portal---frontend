import { createContext, useEffect, useMemo, useReducer } from 'react';
import { GlobalDispatch, GlobalProviderProps, GlobalState } from './types';
import { globalAction, globalReducer, initialGlobalState } from './state';
import { useWindowSize } from '../../hooks/useWindowSize';

const GlobalContext = createContext<{
  globalState: GlobalState;
  globalDispatch: React.Dispatch<GlobalDispatch>;
}>({
  globalState: initialGlobalState,
  globalDispatch: () => null,
});

function GlobalProvider({ children }: GlobalProviderProps) {
  const [globalState, globalDispatch] = useReducer(
    globalReducer,
    initialGlobalState
  );
  const { width, height } = useWindowSize();
  // on window size change, update global state
  useEffect(() => {
    globalDispatch({
      type: globalAction.setWindowSize,
      payload: {
        width,
        height,
      },
    });
  }, [width, height]);

  // useMemo is used to prevent unnecessary re-renders of the context provider value object when the global state changes
  // (which would cause all components that use the global context to re-render)
  const globalContextValue = useMemo(
    () => ({
      globalState,
      globalDispatch,
    }),
    [globalState, globalDispatch]
  );

  return (
    <GlobalContext.Provider value={globalContextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
