import {
  Burger,
  Button,
  Flex,
  Header,
  MediaQuery,
  Space,
  Title,
  Text,
} from '@mantine/core';
import { LOGOUT_URL } from './constants';
import { useAuth } from '../../hooks/useAuth';
import { axiosInstance } from '../../api/axios';
import { LogoutResponse, PortalHeaderProps } from './types';
import { useNavigate } from 'react-router-dom';
import { ThemeSwitch } from '../themeSwitch';
import { AxiosRequestConfig } from 'axios';
import { useGlobalState } from '../../hooks/useGlobalState';
import { COLORS } from '../../constants';

function PortalHeader({ openedHeader, setOpenedHeader }: PortalHeaderProps) {
  const {
    authState: { accessToken },
  } = useAuth();
  const navigate = useNavigate();
  const {
    globalState: { colorScheme, width },
  } = useGlobalState();

  async function handleLogoutFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const axiosConfig: AxiosRequestConfig = {
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

  const { darkTextColor, lightTextColor, buttonTextColor } = COLORS;
  const textColor = colorScheme === 'dark' ? lightTextColor : darkTextColor;

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <Flex justify="space-between" align="center" h="100%">
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={openedHeader}
            onClick={() => setOpenedHeader((open) => !open)}
            size="sm"
            mr="xl"
            color={buttonTextColor}
          />
        </MediaQuery>
        {/* title */}
        {width < 768 ? null : (
          <Flex columnGap="xl" align="center">
            <Flex align="center" justify="center">
              <Title
                order={3}
                color={textColor}
                style={{ letterSpacing: '0.30rem' }}
              >
                MACAULEY
              </Title>
              <Title order={3} color="red">
                TECH
              </Title>
              <Title order={3} color="green">
                REPAIR
              </Title>
            </Flex>

            <Text
              size="lg"
              color={textColor}
              style={{ letterSpacing: '0.10rem' }}
            >
              Employee Portal
            </Text>
          </Flex>
        )}

        <Flex align="center" justify="flex-end">
          {/* theme switch */}
          <ThemeSwitch />
          <Space w="xl" />
          {/* logout button */}
          <form onSubmit={handleLogoutFormSubmit}>
            <Button
              variant={colorScheme === 'dark' ? 'outline' : 'filled'}
              type="submit"
            >
              Sign Out
            </Button>
          </form>
        </Flex>
      </Flex>
    </Header>
  );
}

export { PortalHeader };
