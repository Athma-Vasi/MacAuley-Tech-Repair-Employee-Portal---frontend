import { Button, Flex, Header } from '@mantine/core';
import { LOGOUT_URL } from './constants';
import { useAuth } from '../../hooks/useAuth';
import { axiosInstance } from '../../api/axios';
import { LogoutResponse } from './types';
import { useNavigate } from 'react-router-dom';

function CustomHeader() {
  const {
    authState: { accessToken },
  } = useAuth();
  const navigate = useNavigate();

  async function handleLogoutFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const axiosConfig = {
      url: LOGOUT_URL,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };

    try {
      const response = await axiosInstance<LogoutResponse>(axiosConfig);
      const { status } = response;

      if (status === 200) {
        navigate('/login');
      } else {
        window.location.reload();
      }
    } catch (error: any) {
      console.error(error);
      // refresh window so that the user is logged out
      window.location.reload();
      // Clear JWT cookie ... does not really work, but the user cannot use the cookie anyway
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }

  return (
    <Header height={60} p="xs">
      <Flex justify="space-between" align="center">
        <p>CustomHeader</p>
        <form onSubmit={handleLogoutFormSubmit}>
          <Button variant="outline" type="submit">
            Sign Out
          </Button>
        </form>
      </Flex>
    </Header>
  );
}

export { CustomHeader };
