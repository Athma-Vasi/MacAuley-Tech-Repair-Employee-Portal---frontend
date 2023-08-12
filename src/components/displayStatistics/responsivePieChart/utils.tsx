import { Flex, Group } from '@mantine/core';

import { useGlobalState } from '../../../hooks';
import { splitCamelCase } from '../../../utils';
import { TextWrapper } from '../../wrappers';

function PieChartControlsStack({
  label,
  value,
  input,
  symbol = '',
}: {
  label: string;
  value: string | number | boolean;
  input: JSX.Element;
  symbol?: string;
}) {
  const {
    globalState: { padding, rowGap },
  } = useGlobalState();

  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      style={{ borderBottom: '1px solid #e0e0e0' }}
      px={padding}
      pb={padding}
      rowGap="xs"
      //   columnGap={rowGap}
    >
      <TextWrapper creatorInfoObj={{ size: 'md' }}>{label}</TextWrapper>

      <Flex
        align="flex-end"
        justify="space-between"
        wrap="wrap"
        columnGap={rowGap}
        // rowGap={rowGap}
        w="100%"
      >
        <TextWrapper
          creatorInfoObj={{
            style: {
              padding: '0.5rem 0.75rem',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
            },
          }}
          aria-live="polite"
        >
          {splitCamelCase(value.toString())} {symbol}
        </TextWrapper>
        <Group>{input}</Group>
      </Flex>
    </Flex>
  );
}

export { PieChartControlsStack };
