import { createContext, useEffect, useMemo, useReducer } from 'react';

import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useWindowSize } from '../../hooks/useWindowSize';
import { globalAction, globalReducer, initialGlobalState } from './state';
import { GlobalDispatch, GlobalProviderProps, GlobalState } from './types';
import { useLocation } from 'react-router-dom';
import { logState } from '../../utils';

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

  // set rowGap
  useEffect(() => {
    const rowGap =
      width < 480 ? 'md' : width < 768 ? 'sm' : width < 1440 ? 'md' : 'lg';
    globalDispatch({
      type: globalAction.setRowGap,
      payload: rowGap,
    });

    const padding = width < 480 ? 'xs' : width < 768 ? 'sm' : 'md';
    globalDispatch({
      type: globalAction.setPadding,
      payload: padding,
    });
  }, [width]);

  // const { scrollXDirection, scrollYDirection } = useScrollDirection();
  // // on scroll position change, update global state
  // useEffect(() => {
  //   globalDispatch({
  //     type: globalAction.setScrollAxesDirection,
  //     payload: {
  //       scrollXDirection,
  //       scrollYDirection,
  //     },
  //   });
  // }, [scrollXDirection, scrollYDirection]);

  // useMemo is used to prevent unnecessary re-renders of the context provider
  const globalContextValue = useMemo(
    () => ({
      globalState,
      globalDispatch,
    }),
    [globalState, globalDispatch]
  );

  useEffect(() => {
    logState({
      state: globalState,
      groupLabel: 'globalState in GlobalProvider',
    });
  }, [globalState]);

  return (
    <GlobalContext.Provider value={globalContextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
