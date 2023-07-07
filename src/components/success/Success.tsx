import '../../index.css';

import { Alert, Button, Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import { COLORS } from '../../constants/data';
import { useGlobalState } from '../../hooks/useGlobalState';
import { SuccessProps } from './types';

function Success({
  isSuccessful,
  link,
  ref,
  message,
  closeSuccessCallback,
}: SuccessProps) {
  const {
    globalState: { colorScheme },
  } = useGlobalState();

  const { darkTextColor, lightTextColor } = COLORS;
  const textColor = colorScheme === 'dark' ? lightTextColor : darkTextColor;
  return (
    <Alert
      color="green"
      title="Success!"
      // allows error message to be read by screen reader instead of removing it from the DOM
      className={isSuccessful ? '' : 'offscreen'}
      w="100%"
    >
      <Flex direction="column" align="flex-start" justify="center" rowGap="xl">
        <Text color={textColor} ref={ref} aria-live="assertive">
          {message}
        </Text>

        <Flex w="100%" justify="flex-end">
          {link ? (
            <Button
              type="button"
              color="green"
              variant={colorScheme === 'dark' ? 'outline' : 'filled'}
            >
              <Link to={link.address}>{link.text}</Link>
            </Button>
          ) : closeSuccessCallback ? (
            <Button
              color="green"
              type="button"
              variant={colorScheme === 'dark' ? 'outline' : 'filled'}
              onClick={closeSuccessCallback}
            >
              Close
            </Button>
          ) : (
            <Button
              color="green"
              type="button"
              onClick={() => window.location.reload()}
            >
              Back to Login
            </Button>
          )}
        </Flex>
      </Flex>
    </Alert>
  );
}

export { Success };
