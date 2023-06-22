import { useCallback, useEffect, useState } from 'react';

type WindowSize = {
  width: number;
  height: number;
};

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const setSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, [setSize]);

  return {
    width: windowSize.width,
    height: windowSize.height,
  };
}

export { useWindowSize };
