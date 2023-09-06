import { Flex, useMantineTheme } from '@mantine/core';
import { CSSProperties, ReactNode } from 'react';

import { useGlobalState } from '../../hooks';

type FormLayoutWrapperProps = {
  children?: ReactNode;
  direction?: 'row' | 'column';
  style?: CSSProperties;
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
      w="100%"
      align="baseline"
      justify="flex-start"
      wrap="wrap"
      p={padding}
      rowGap={rowGap}
      columnGap={rowGap}
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

// <Flex
//   direction={
//     direction === 'row' || direction === 'column' ? direction : 'column'
//   }
//   align={
//     direction === 'row' || direction === 'column' ? 'center' : 'flex-start'
//   }
//   justify={
//     direction === 'row' || direction === 'column' ? 'center' : 'flex-start'
//   }
//   w="100%"
//   p={padding}
//   rowGap={rowGap}
//   style={{
//     ...style,
//     border:
//       colorScheme === 'light'
//         ? `1px solid ${colors.gray[3]}`
//         : `1px solid ${colors.gray[8]}`,
//     borderRadius: 4,
//   }}
// >
//   {children}
// </Flex>
