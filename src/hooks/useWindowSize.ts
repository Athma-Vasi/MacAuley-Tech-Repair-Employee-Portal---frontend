import { useEffect, useState } from 'react';

type WindowSize = {
  width: number;
  height: number;
};

function useWindowSize(): {
  windowWidth: number;
  windowHeight: number;
} {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    windowWidth: windowSize.width ?? 0,
    windowHeight: windowSize.height ?? 0,
  };
}

export { useWindowSize };
