import { Flex, useMantineTheme } from '@mantine/core';
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
    globalState: {
      themeObject: { colorScheme },
      rowGap,
      padding,
    },
  } = useGlobalState();
  const { colors } = useMantineTheme();

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
        border:
          colorScheme === 'light'
            ? `1px solid ${colors.gray[3]}`
            : `1px solid ${colors.gray[8]}`,
        borderRadius: 4,
      }}
    >
      {children}
    </Flex>
  );
}

export { FormLayoutWrapper };
