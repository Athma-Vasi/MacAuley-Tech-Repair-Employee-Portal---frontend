import { Flex } from '@mantine/core';
import { ReactNode } from 'react';

import { useGlobalState } from '../../hooks';

type FormLayoutWrapperProps = {
  children?: ReactNode;
  direction?: 'row' | 'column';
  style?: React.CSSProperties;
};

function FormLayoutWrapper({
  children,
  direction,
  style = {},
}: FormLayoutWrapperProps): JSX.Element {
  const {
    globalState: { width, rowGap, padding },
  } = useGlobalState();

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
      p={padding}
      rowGap={rowGap}
      style={{
        ...style,
        border: '1px solid #e0e0e0',
        borderRadius: 4,
      }}
    >
      {children}
    </Flex>
  );
}

export { FormLayoutWrapper };
