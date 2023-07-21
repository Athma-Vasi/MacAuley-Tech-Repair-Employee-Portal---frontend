import { useCallback, useEffect, useState } from 'react';

type ScrollAxesAmount = {
  previousScrollXPosition: number;
  currentScrollXPosition: number;
  previousScrollYPosition: number;
  currentScrollYPosition: number;
};

type ScrollXDirection = 'left' | 'right' | '';
type ScrollYDirection = 'up' | 'down' | '';

type ScrollAxesDirection = {
  scrollXDirection: ScrollXDirection;
  scrollYDirection: ScrollYDirection;
};

function useScrollDirection(): ScrollAxesDirection {
  const [scrollAxes, setScrollAxes] = useState<ScrollAxesAmount>({
    previousScrollXPosition: 0,
    currentScrollXPosition: 0,
    previousScrollYPosition: 0,
    currentScrollYPosition: 0,
  });

  const setScrollAxesCB = useCallback(() => {
    setScrollAxes((previous) => ({
      previousScrollXPosition: previous.currentScrollXPosition,
      currentScrollXPosition: window.scrollX,
      previousScrollYPosition: previous.currentScrollYPosition,
      currentScrollYPosition: window.scrollY,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', setScrollAxesCB);
    return () => window.removeEventListener('scroll', setScrollAxesCB);
  }, [setScrollAxesCB]);

  return {
    scrollXDirection:
      scrollAxes.currentScrollXPosition > scrollAxes.previousScrollXPosition
        ? 'right'
        : scrollAxes.currentScrollXPosition < scrollAxes.previousScrollXPosition
        ? 'left'
        : '',
    scrollYDirection:
      scrollAxes.currentScrollYPosition > scrollAxes.previousScrollYPosition
        ? 'down'
        : scrollAxes.currentScrollYPosition < scrollAxes.previousScrollYPosition
        ? 'up'
        : '',
  };
}

export { useScrollDirection };

export type {
  ScrollAxesAmount,
  ScrollAxesDirection,
  ScrollXDirection,
  ScrollYDirection,
};
