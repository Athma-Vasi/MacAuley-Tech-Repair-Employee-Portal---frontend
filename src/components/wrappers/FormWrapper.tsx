import { Flex } from '@mantine/core';
import { CSSProperties, ReactNode } from 'react';

import { COLORS_SWATCHES } from '../../constants/data';
import { useGlobalState } from '../../hooks';
import { returnThemeColors } from '../../utils';

type FormLayoutWrapperProps = {
  children?: ReactNode;
  direction?: 'row' | 'column';
  style?: CSSProperties;
};

function FormLayoutWrapper({
  children,
  direction = 'column',
  style = {},
}: FormLayoutWrapperProps): JSX.Element {
  const {
    globalState: { themeObject, rowGap, padding },
  } = useGlobalState();

  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

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
        border: borderColor,
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
