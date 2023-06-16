import { Alert, Button, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();
  return (
    <Alert color="red" title="Unauthorized!">
      <Title order={4}>You are not authorized to view this page.</Title>

      <Button
        variant="light"
        color="red"
        size="lg"
        radius="lg"
        onClick={() => navigate('/login')}
      >
        Go to home
      </Button>
    </Alert>
  );
}

export { Unauthorized };
