import { Burger, Button, Flex, Header, MediaQuery, Title } from '@mantine/core';
import { LOGOUT_URL } from './constants';
import { useAuth } from '../../hooks/useAuth';
import { axiosInstance } from '../../api/axios';
import { LogoutResponse, PortalHeaderProps } from './types';
import { useNavigate } from 'react-router-dom';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeSwitch } from '../themeSwitch';

function PortalHeader({ openedHeader, setOpenedHeader }: PortalHeaderProps) {
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
    <Header height={{ base: 50, md: 70 }} p="md">
      <Flex justify="space-between" align="center" h="100%">
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={openedHeader}
            onClick={() => setOpenedHeader((open) => !open)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>
        {/* title */}
        <Flex columnGap="md">
          <Flex direction="column" align="center" justify="center">
            <FontAwesomeIcon icon={faWrench} color="gray" />
          </Flex>
          <Title order={4} color="dimmed">
            MacAuley Tech Repair Employee Portal
          </Title>
        </Flex>
        {/* theme switch */}
        <ThemeSwitch />

        {/* logout button */}
        <form onSubmit={handleLogoutFormSubmit}>
          <Button variant="outline" type="submit">
            Sign Out
          </Button>
        </form>
      </Flex>
    </Header>
  );
}

export { PortalHeader };
