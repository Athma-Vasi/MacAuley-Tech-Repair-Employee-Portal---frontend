import { Outlet } from 'react-router-dom';
import { Text } from '@mantine/core';
import { Register } from '../register';

function PublicLayout() {
  return (
    <div>
      <Text>PublicLayout</Text>
      <Register />
    </div>
  );
}

export { PublicLayout };
