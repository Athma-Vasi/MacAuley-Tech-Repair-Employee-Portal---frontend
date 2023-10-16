import { useCallback, useRef, useState } from 'react';

function useAsyncReference(value: any) {
  const ref = useRef(value);
  const [_, forceRender] = useState(false);

  // function updateState(newState: any) {
  //   ref.current = newState;
  //   forceRender((prevState) => !prevState);
  // }

  const updateState = useCallback((newState: any) => {
    if (!Object.is(ref.current, newState)) {
      ref.current = newState;
      forceRender((prevState) => !prevState);
    }
  }, []);

  return [ref, updateState] as const;
}

export { useAsyncReference };
