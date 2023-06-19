import { BackgroundImage, Box, Center, Text } from '@mantine/core';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
  return (
    <Center
      style={{
        backgroundImage: 'radial-gradient(circle, #f9f9f9 50%, #ececec 100%)',
        height: '100vh',
      }}
    >
      <Outlet />
    </Center>
  );
}

export { PublicLayout };
