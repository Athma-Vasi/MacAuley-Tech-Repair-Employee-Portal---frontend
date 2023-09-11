import { Center, Flex, Text, Title } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { useGlobalState } from '../../hooks/useGlobalState';

function PublicLayout() {
  const {
    globalState: { width },
  } = useGlobalState();
  return (
    <Flex w="100%" h="100%">
      <Outlet />
    </Flex>
  );
}

export default PublicLayout;

/**
 * <Flex
      direction="column"
      align="center"
      justify="center"
      w="100%"
      style={{
        backgroundImage: 'radial-gradient(circle, #f9f9f9 50%, #ececec 100%)',
        height: '100vh',
      }}
      rowGap={width < 768 ? 'md' : 'xl'}
    >
      <Flex direction="column" align="center" justify="center" w="100%">
        <Flex align="center" justify="center" w="100%">
          <Title
            order={width < 768 ? 3 : 1}
            color="dark"
            style={{ letterSpacing: '0.30rem' }}
          >
            MACAULEY
          </Title>
          <Title order={width < 768 ? 3 : 1} color="red">
            TECH
          </Title>
          <Title order={width < 768 ? 3 : 1} color="green">
            REPAIR
          </Title>
        </Flex>
        <Text
          size={width < 768 ? 'lg' : 'xl'}
          color="dark"
          style={{ letterSpacing: '0.10rem' }}
        >
          EMPLOYEE PORTAL
        </Text>
      </Flex>
      <Outlet />
    </Flex>
 */
