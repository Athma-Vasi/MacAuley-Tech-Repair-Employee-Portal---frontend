import {
  Button,
  Center,
  Group,
  Modal,
  Notification,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { TbExclamationCircle, TbExclamationMark } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES } from '../../constants/data';
import { globalAction } from '../../context/globalProvider/state';
import { ErrorState } from '../../context/globalProvider/types';
import { useGlobalState } from '../../hooks';
import { returnThemeColors } from '../../utils';

type ErrorFallbackProps = {
  errorState: ErrorState;
};

function ErrorFallback({
  errorState: { isError, errorMessage, errorCallback },
}: ErrorFallbackProps) {
  const { resetBoundary } = useErrorBoundary();
  const {
    globalState: { padding, themeObject },
  } = useGlobalState();

  const {
    generalColors: { redColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  const tryAgainButtonWithTooltip = (
    <Tooltip label="Will try the action again">
      <Group>
        <Button
          onClick={() => resetBoundary()}
          aria-label="Will try the action again"
        >
          Try again
        </Button>
      </Group>
    </Tooltip>
  );

  const { colorScheme, primaryShade } = themeObject;
  const errorColor =
    colorScheme === 'light'
      ? `red.${primaryShade.light}`
      : `red.${primaryShade.dark}`;

  const errorModal = (
    <Modal
      opened={isError}
      closeButtonProps={{ color: errorColor }}
      onClose={() => {
        errorCallback();
      }}
      title={
        <Title order={4} color={redColorShade}>
          ERROR
        </Title>
      }
    >
      <Notification
        color={errorColor}
        icon={<TbExclamationMark size={22} />}
        style={{ boxShadow: '0 0 0 0', backgroundColor: 'transparent' }}
        withCloseButton={false}
      >
        <Stack w="100%" spacing={padding}>
          <Text>{errorMessage}</Text>
          <Group w="100%" position="right">
            {tryAgainButtonWithTooltip}
          </Group>
        </Stack>
      </Notification>
    </Modal>
  );

  return errorModal;
}

export default ErrorFallback;

/**
 * const closeButtonWithTooltip = (
    <Tooltip label="Will take you to the home page">
      <Group>
        <Button
          onClick={() => {
            errorCallback();
            globalDispatch({
              type: globalAction.setErrorState,
              payload: {
                isError: false,
                errorMessage: '',
                errorCallback: () => {},
              },
            });
          }}
          aria-label="Will take you to the home page"
        >
          Close
        </Button>
      </Group>
    </Tooltip>
  );
 */

/**
 * const errorNotification = (
    <Center py={padding}>
      <Notification
        w={notificationWidth}
        withCloseButton={true}
        onClose={() => {
          errorCallback();
          globalDispatch({
            type: globalAction.setErrorState,
            payload: {
              isError: false,
              errorMessage: '',
              errorCallback: () => {},
            },
          });
        }}
        color="red"
        icon={<TbExclamationCircle size={22} />}
        title={
          <Group
            p={padding}
            style={{
              borderBottom: borderColor,
            }}
          >
            <Title order={6}>Error: </Title>
            <Text>{errorMessage}</Text>
          </Group>
        }
        withBorder
      >
        <Group p={padding} w="100%" position="right" spacing={padding}>
          {tryAgainButtonWithTooltip}
        </Group>
      </Notification>
    </Center>
  );
 */
