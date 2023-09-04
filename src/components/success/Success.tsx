import '../../index.css';

import { Alert, Button, Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import { SuccessProps } from './types';

function Success({
  isSuccessful,
  link,
  ref,
  message,
  closeSuccessCallback,
}: SuccessProps) {
  return (
    <Alert
      color="green"
      title="Success!"
      // allows error message to be read by screen reader instead of removing it from the DOM
      className={isSuccessful ? '' : 'offscreen'}
      w="100%"
    >
      <Flex direction="column" align="flex-start" justify="center" rowGap="xl">
        <Text ref={ref} aria-live="assertive">
          {message}
        </Text>

        <Flex w="100%" justify="flex-end">
          {link ? (
            <Button type="button" color="green">
              <Link to={link.address}>{link.text}</Link>
            </Button>
          ) : closeSuccessCallback ? (
            <Button color="green" type="button" onClick={closeSuccessCallback}>
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
