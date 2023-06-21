import { useCallback, useEffect, useState } from 'react';
import { BreakPoints } from '../types';

type WindowSize = {
  windowSize: BreakPoints;
};

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    windowSize:
      window.innerWidth < 768
        ? 'xs'
        : window.innerWidth < 1024
        ? 'sm'
        : window.innerWidth < 1184
        ? 'md'
        : window.innerWidth < 1440
        ? 'lg'
        : 'xl',
  });

  const setSize = useCallback(() => {
    setWindowSize({
      windowSize:
        window.innerWidth < 768
          ? 'xs'
          : window.innerWidth < 1024
          ? 'sm'
          : window.innerWidth < 1184
          ? 'md'
          : window.innerWidth < 1440
          ? 'lg'
          : 'xl',
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, [setSize]);

  return {
    windowSize: windowSize.windowSize ?? 'xs',
  };
}

export { useWindowSize };
