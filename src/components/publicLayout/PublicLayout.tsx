import { Flex } from '@mantine/core';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
  return (
    <Flex w="100%" h="100%">
      <Outlet />
    </Flex>
  );
}

export default PublicLayout;
