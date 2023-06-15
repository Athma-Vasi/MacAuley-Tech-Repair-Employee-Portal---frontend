import { Text } from '@mantine/core';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
  return (
    <div>
      <Text>PublicLayout</Text>
      <Outlet />
    </div>
  );
}

export { PublicLayout };
