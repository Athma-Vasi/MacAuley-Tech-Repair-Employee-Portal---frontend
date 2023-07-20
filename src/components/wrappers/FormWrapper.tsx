import { Flex } from '@mantine/core';
import { ReactNode } from 'react';

import { useGlobalState } from '../../hooks';

type FormLayoutWrapperProps = {
  children?: ReactNode;
  direction?: 'row' | 'column';
};

function FormLayoutWrapper({
  children,
  direction,
}: FormLayoutWrapperProps): JSX.Element {
  const {
    globalState: { width },
  } = useGlobalState();

  const rowGap =
    width < 480 ? 'md' : width < 768 ? 'sm' : width < 1440 ? 'md' : 'lg';

  return (
    <Flex
      direction={
        direction === 'row' || direction === 'column' ? direction : 'column'
      }
      align={
        direction === 'row' || direction === 'column' ? 'center' : 'flex-start'
      }
      justify={
        direction === 'row' || direction === 'column' ? 'center' : 'flex-start'
      }
      w="100%"
      p={width < 480 ? 'xs' : width < 768 ? 'sm' : 'md'}
      rowGap={rowGap}
      style={{ border: '1px solid #e0e0e0', borderRadius: 4 }}
    >
      {children}
    </Flex>
  );
}

export { FormLayoutWrapper };
