import { createContext, useEffect, useMemo, useReducer } from "react";

import { useWindowSize } from "../../hooks/useWindowSize";
import { initialGlobalState } from "./state";
import type { GlobalDispatch, GlobalProviderProps, GlobalState } from "./types";
import { globalReducer } from "./reducers";

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
    initialGlobalState,
  );

  const { width, height } = useWindowSize();
  // on window size change, update global state
  useEffect(() => {
    globalDispatch({
      action: globalAction.setWindowSize,
      payload: {
        width,
        height,
      },
    });
  }, [width, height]);

  const globalContextValue = useMemo(
    () => ({
      globalState,
      globalDispatch,
    }),
    [globalState, globalDispatch],
  );

  return (
    <GlobalContext.Provider value={globalContextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
