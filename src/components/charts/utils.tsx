import { Flex, Group, Text, useMantineTheme } from '@mantine/core';
import { ReactNode } from 'react';

import { COLORS_SWATCHES } from '../../constants/data';
import { useGlobalState } from '../../hooks';
import { returnThemeColors, splitCamelCase } from '../../utils';
import { TextWrapper } from '../wrappers';

type ChartsAndGraphsControlsStackerProps = {
  input: JSX.Element;
  isInputDisabled?: boolean;
  label: ReactNode;
  symbol?: string;
  value: string | number | boolean;
};

function ChartsAndGraphsControlsStacker({
  input,
  isInputDisabled = false,
  label,
  symbol = '',
  value,
}: ChartsAndGraphsControlsStackerProps) {
  const {
    globalState: { padding, rowGap, themeObject },
  } = useGlobalState();

  const {
    appThemeColors: { borderColor },
    generalColors: { grayColorShade },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      style={{ borderBottom: borderColor }}
      px={padding}
      pb={padding}
      rowGap="xs"
    >
      <Text weight={500} color={isInputDisabled ? grayColorShade : ''}>
        {label}
      </Text>

      <Flex
        align="flex-end"
        columnGap={rowGap}
        justify="space-between"
        rowGap={rowGap}
        w="100%"
        wrap="wrap"
      >
        <Text
          aria-live="polite"
          color={isInputDisabled ? grayColorShade : ''}
          style={{
            border: borderColor,
            borderRadius: 4,
            padding: '0.5rem 0.75rem',
          }}
        >
          {splitCamelCase(value.toString())} {symbol}
        </Text>
        <Group>{input}</Group>
      </Flex>
    </Flex>
  );
}

export { ChartsAndGraphsControlsStacker };
