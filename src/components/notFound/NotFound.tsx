import { Alert, Button, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Alert color="red" title="Not Found!">
      <Title>The page you are looking for does not exist.</Title>

      <Button
        variant="light"
        color="red"
        size="lg"
        radius="lg"
        onClick={() => navigate("/home")}
      >
        Go to home
      </Button>
    </Alert>
  );
}

export default NotFound;
