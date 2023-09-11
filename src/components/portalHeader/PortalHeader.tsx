import {
  Burger,
  Button,
  Flex,
  Header,
  MediaQuery,
  Space,
  Title,
} from '@mantine/core';
import { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';

import { axiosInstance } from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';
import { useGlobalState } from '../../hooks/useGlobalState';
import { ColorSchemeSwitch } from '../colorSchemeSwitch/ColorSchemeSwitch';
import { TextWrapper } from '../wrappers';
import { LOGOUT_URL } from './constants';
import ProfileInfo from './profileInfo/ProfileInfo';
import { LogoutResponse, PortalHeaderProps } from './types';
import { useEffect } from 'react';

function PortalHeader({ openedHeader, setOpenedHeader }: PortalHeaderProps) {
  const {
    authState: { accessToken },
  } = useAuth();
  const navigate = useNavigate();
  const {
    globalState: { themeObject, width },
  } = useGlobalState();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

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

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <Flex
        justify="space-between"
        align="center"
        h="100%"
        style={{ outline: '1px solid teal' }}
      >
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={openedHeader}
            onClick={() => setOpenedHeader((open) => !open)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>
        {/* title */}
        {width < 768 ? null : (
          <Flex columnGap="xl" align="center">
            <Flex align="center" justify="center">
              <Title order={3} style={{ letterSpacing: '0.30rem' }}>
                MACAULEY
              </Title>
              <Title order={3} color="red">
                TECH
              </Title>
              <Title order={3} color="green">
                REPAIR
              </Title>
            </Flex>

            <TextWrapper creatorInfoObj={{ size: 'lg' }}>
              Employee Portal
            </TextWrapper>
          </Flex>
        )}

        <Flex align="center" justify="flex-end">
          {/* theme switch */}
          <ColorSchemeSwitch />
          <ProfileInfo />
          {/* logout button */}
          {/* <form onSubmit={handleLogoutFormSubmit}>
            <Button
              variant={colorScheme === 'dark' ? 'outline' : 'filled'}
              type="submit"
            >
              Sign Out
            </Button>
          </form> */}
        </Flex>
      </Flex>
    </Header>
  );
}

export { PortalHeader };
