import {
  Button,
  Center,
  Group,
  Modal,
  Notification,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { useGlobalState } from '../../hooks';
import { ErrorState } from '../../context/globalProvider/types';
import { COLORS_SWATCHES } from '../../constants/data';
import { TbExclamationCircle, TbExclamationMark } from 'react-icons/tb';
import { globalAction } from '../../context/globalProvider/state';

type ErrorFallbackProps = {
  errorState: ErrorState;
};

function ErrorFallback({
  errorState: { isError, errorMessage, errorCallback },
}: ErrorFallbackProps) {
  // const [
  //   openedNotificationModal,
  //   { open: openNotificationModal, close: closeNotificationModal },
  // ] = useDisclosure(false);
  const { resetBoundary } = useErrorBoundary();
  const {
    globalState: {
      padding,
      width,
      themeObject: { colorScheme },
    },
    globalDispatch,
  } = useGlobalState();

  const { gray } = COLORS_SWATCHES;
  const borderColor =
    colorScheme === 'light' ? `1px solid ${gray[3]}` : `1px solid ${gray[8]}`;

  const notificationWidth =
    width < 480 // for iPhone 5/SE
      ? 375 - 20
      : width < 768 // for iPhone 6/7/8
      ? width - 40
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225) * 0.8
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 225) * 0.8
      : 900 - 40;

  const closeButtonWithTooltip = (
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

  const errorNotification = (
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
        icon={<TbExclamationCircle size={24} />}
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
          {/* {closeButtonWithTooltip} */}
          {tryAgainButtonWithTooltip}
        </Group>
      </Notification>
    </Center>
  );

  return errorNotification;
}

export default ErrorFallback;
