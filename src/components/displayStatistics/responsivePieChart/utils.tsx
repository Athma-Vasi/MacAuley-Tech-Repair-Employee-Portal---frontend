import { Flex, Group, Text, useMantineTheme } from '@mantine/core';

import { useGlobalState } from '../../../hooks';
import { splitCamelCase } from '../../../utils';
import { TextWrapper } from '../../wrappers';
import { ReactNode } from 'react';
import { COLORS_SWATCHES } from '../../../constants/data';

type ChartsGraphsControlsStackerProps = {
  label: string | ReactNode;
  value: string | number | boolean;
  input: JSX.Element;
  symbol?: string;
};

function ChartsGraphsControlsStacker({
  label,
  value,
  input,
  symbol = '',
}: ChartsGraphsControlsStackerProps) {
  const {
    globalState: {
      padding,
      rowGap,
      themeObject: { colorScheme },
    },
  } = useGlobalState();

  const { gray } = COLORS_SWATCHES;

  const borderColor = colorScheme === 'light' ? gray[3] : gray[8];

  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      style={{ borderBottom: `1px solid ${borderColor}` }}
      px={padding}
      pb={padding}
      rowGap="xs"
    >
      <Text size="md" weight={500}>
        {label}
      </Text>

      <Flex
        align="flex-end"
        justify="space-between"
        wrap="wrap"
        columnGap={rowGap}
        rowGap={rowGap}
        w="100%"
      >
        <Text
          style={{
            padding: '0.5rem 0.75rem',
            border: `1px solid ${borderColor}`,
            borderRadius: '4px',
          }}
          aria-live="polite"
        >
          {splitCamelCase(value.toString())} {symbol}
        </Text>
        <Group>{input}</Group>
      </Flex>
    </Flex>
  );
}

export { ChartsGraphsControlsStacker };
