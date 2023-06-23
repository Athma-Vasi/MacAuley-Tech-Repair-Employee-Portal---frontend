import { useCallback, useEffect, useState } from 'react';

type ScrollAxesAmount = {
  prevScrollXPosition: number;
  currentScrollXPosition: number;
  prevScrollYPosition: number;
  currentScrollYPosition: number;
};

type ScrollAxesDirection = {
  scrollXDirection: 'left' | 'right' | '';
  scrollYDirection: 'up' | 'down' | '';
};

function useScrollDirection(): ScrollAxesDirection {
  const [scrollAxes, setScrollAxes] = useState<ScrollAxesAmount>({
    prevScrollXPosition: 0,
    currentScrollXPosition: 0,
    prevScrollYPosition: 0,
    currentScrollYPosition: 0,
  });

  const setScrollAxesCB = useCallback(() => {
    setScrollAxes((prev) => ({
      prevScrollXPosition: prev.currentScrollXPosition,
      currentScrollXPosition: window.scrollX,
      prevScrollYPosition: prev.currentScrollYPosition,
      currentScrollYPosition: window.scrollY,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', setScrollAxesCB);
    return () => window.removeEventListener('scroll', setScrollAxesCB);
  }, [setScrollAxesCB]);

  return {
    scrollXDirection:
      scrollAxes.currentScrollXPosition > scrollAxes.prevScrollXPosition
        ? 'right'
        : scrollAxes.currentScrollXPosition < scrollAxes.prevScrollXPosition
        ? 'left'
        : '',
    scrollYDirection:
      scrollAxes.currentScrollYPosition > scrollAxes.prevScrollYPosition
        ? 'down'
        : scrollAxes.currentScrollYPosition < scrollAxes.prevScrollYPosition
        ? 'up'
        : '',
  };
}

export { useScrollDirection };
