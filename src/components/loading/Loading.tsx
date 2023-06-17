import { Alert, Loader } from '@mantine/core';

function Loading() {
  return (
    <Alert color="blue" title="Loading...">
      Please wait while we process the data.
      <Loader />
    </Alert>
  );
}

export { Loading };
