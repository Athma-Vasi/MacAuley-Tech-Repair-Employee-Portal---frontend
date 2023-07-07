import '../../index.css';

import { Alert, Button, Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import { COLORS } from '../../constants/data';
import { useGlobalState } from '../../hooks/useGlobalState';
import type { CustomErrorProps } from './types';
function CustomError({
  isError,
  ref,
  link,
  closeErrorCallback,
  message,
}: CustomErrorProps) {
  const {
    globalState: { colorScheme },
  } = useGlobalState();

  const { darkTextColor, lightTextColor } = COLORS;
  const textColor = colorScheme === 'dark' ? lightTextColor : darkTextColor;

  return (
    <Alert
      color="red"
      title="Warning!"
      // allows error message to be read by screen reader instead of removing it from the DOM
      className={isError ? '' : 'offscreen'}
      w={400}
    >
      <Flex direction="column" align="flex-start" justify="center" rowGap="xl">
        <Text color={textColor} ref={ref} aria-live="assertive">
          {message}
        </Text>

        <Flex w="100%" justify="flex-end">
          {link ? (
            <Button
              type="button"
              color="red"
              variant={colorScheme === 'dark' ? 'outline' : 'filled'}
            >
              <Link to={link.address}>{link.text}</Link>
            </Button>
          ) : closeErrorCallback ? (
            <Button
              color="red"
              variant={colorScheme === 'dark' ? 'outline' : 'filled'}
              type="button"
              onClick={closeErrorCallback}
            >
              Close
            </Button>
          ) : null}
        </Flex>
      </Flex>
    </Alert>
  );
}

export { CustomError };
