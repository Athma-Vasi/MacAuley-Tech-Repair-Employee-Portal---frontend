import { Alert, Flex, Loader, Text } from '@mantine/core';

import '../../index.css';
import { LoadingProps } from './types';

function Loading({ dataDirection }: LoadingProps) {
  return (
    <Alert
      color="blue"
      title="Loading..."
      w="100%"
      // allows error message to be read by screen reader instead of removing it from the DOM
      className="offscreen"
    >
      <Flex direction="column" align="center" rowGap="xl">
        <Loader size="lg" />
        <Text
          color="dark"
          aria-live="assertive"
        >{`Please wait while we ${dataDirection} the data.`}</Text>
      </Flex>
    </Alert>
  );
}

export { Loading };
