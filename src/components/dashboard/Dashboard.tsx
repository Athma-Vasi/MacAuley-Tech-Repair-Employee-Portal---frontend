import { Flex, Title } from '@mantine/core';
import { useGlobalState } from '../../hooks/useGlobalState';
import { useEffect } from 'react';

function Dashboard() {
  const { globalState } = useGlobalState();

  useEffect(() => {
    console.log({ globalState });
  }, [globalState]);

  return (
    <Flex direction="column" rowGap="xl">
      <Title>Dashboard</Title>
    </Flex>
  );
}

export { Dashboard };
