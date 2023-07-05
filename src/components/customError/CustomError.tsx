import { Alert, Flex, Button, Text } from '@mantine/core';
import type { CustomErrorProps } from './types';
import '../../index.css';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../../hooks/useGlobalState';
import { COLORS } from '../../constants';
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