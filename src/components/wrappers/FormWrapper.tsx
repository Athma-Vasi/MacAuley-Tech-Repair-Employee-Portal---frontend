import { Flex } from '@mantine/core';
import { ReactNode } from 'react';

import { useGlobalState } from '../../hooks';

type FormLayoutWrapperProps = {
  children?: ReactNode;
};

function FormLayoutWrapper({ children }: FormLayoutWrapperProps): JSX.Element {
  const {
    globalState: { width },
  } = useGlobalState();

  const rowGap =
    width < 480 ? 'md' : width < 768 ? 'sm' : width < 1440 ? 'md' : 'lg';

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="space-between"
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
