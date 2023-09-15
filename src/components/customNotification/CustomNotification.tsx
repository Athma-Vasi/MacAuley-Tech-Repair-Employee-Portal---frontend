import { Center, Group, Notification, Text } from '@mantine/core';
import { TbCheck } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES } from '../../constants/data';
import { useGlobalState } from '../../hooks';
import { returnThemeColors } from '../../utils';

type ParentDispatch = React.Dispatch<
  | {
      type: 'setIsSuccessful' | 'setIsSubmitting' | 'setIsLoading';
      payload: boolean;
    }
  | {
      type: 'setSuccessMessage' | 'setSubmitMessage' | 'setLoadingMessage';
      payload: string;
    }
>;

type CustomNotificationProps = {
  isSuccessful: boolean;
  successMessage?: string;
  isSubmitting: boolean;
  submitMessage?: string;
  isLoading: boolean;
  loadingMessage?: string;

  navigateTo: {
    successPath: string;
  };
  parentDispatch: ParentDispatch;

  // runs on success notification close
  successCallbacks?: Array<() => void>;
};
/**
 * Used for displaying component states: submitting, loading & successfull (except error, which is handled by fallback component in ErrorBoundary)
 * @param {boolean} isSuccessful - if true, displays success notification
 * @param {string} successMessage - message to display in success notification
 * @param {boolean} isSubmitting - if true, displays submitting notification
 * @param {string} submitMessage - message to display in submitting notification
 * @param {boolean} isLoading - if true, displays loading notification
 * @param {string} loadingMessage - message to display in loading notification
 * @param {object} navigateTo - object containing success path to navigate to after success notification is closed (automatically or manually)
 * @param {object} parentDispatch - dispatch function from parent component
 * @param {function} successCallbacks - callback functions that run on success notification close
 *
 */
function CustomNotification({
  isSuccessful,
  successMessage = 'Success!',
  isSubmitting,
  submitMessage = 'Please wait. Submitting...',
  isLoading,
  loadingMessage = 'Please wait. Loading...',

  navigateTo: { successPath },
  parentDispatch,

  successCallbacks,
}: CustomNotificationProps) {
  const {
    globalState: { padding, width, themeObject },
  } = useGlobalState();
  const navigate = useNavigate();

  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const notificationWidth =
    width < 480 // for iPhone 5/SE
      ? 375 - 20
      : width < 768 // for iPhone 6/7/8
      ? width - 40
      : // at 768vw the navbar appears at width of 200px
      width < 1024
      ? (width - 200) * 0.85
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 300) * 0.85
      : 900 - 40;

  let notificationComponent = null;
  if (isSuccessful) {
    notificationComponent = (
      <Notification
        closeButtonProps={{ 'aria-label': 'Hide notification' }}
        icon={<TbCheck size={22} />}
        onClose={() => {
          parentDispatch({
            type: 'setIsSuccessful',
            payload: false,
          });
          parentDispatch({
            type: 'setSuccessMessage',
            payload: '',
          });

          if (successCallbacks?.length) {
            successCallbacks.forEach((callback: () => void) => {
              callback();
            });
          }

          navigate(successPath);
        }}
        title={
          <Group p={padding} style={{ borderBottom: borderColor }}>
            <Text size="md">٩(^ ᗜ ^ )و ´- </Text>
            {/* <Space w="xs" /> */}
            <Text size="md">Success!</Text>
          </Group>
        }
        w={notificationWidth}
        withBorder
      >
        <Group p={padding}>
          <Text>{successMessage}</Text>
        </Group>
      </Notification>
    );
  }

  if (isSubmitting) {
    notificationComponent = (
      <Notification
        closeButtonProps={{ 'aria-label': 'Hide notification' }}
        loading
        onClose={() => {
          parentDispatch({
            type: 'setIsSubmitting',
            payload: false,
          });
          parentDispatch({
            type: 'setSubmitMessage',
            payload: '',
          });
        }}
        title={
          <Group p={padding} style={{ borderBottom: borderColor }}>
            <Text size="md">Please wait ... </Text>
          </Group>
        }
        w={notificationWidth}
        withBorder
        withCloseButton={false}
      >
        <Group p={padding}>
          <Text>{submitMessage}</Text>
        </Group>
      </Notification>
    );
  }

  if (isLoading) {
    notificationComponent = (
      <Notification
        closeButtonProps={{ 'aria-label': 'Hide notification' }}
        loading
        onClose={() => {
          parentDispatch({
            type: 'setIsLoading',
            payload: false,
          });
          parentDispatch({
            type: 'setLoadingMessage',
            payload: '',
          });

          // navigate(successPath);
        }}
        title={
          <Group p={padding} style={{ borderBottom: borderColor }}>
            <Text size="md">Loading... Please wait. </Text>
          </Group>
        }
        w={notificationWidth}
        withBorder
        withCloseButton={false}
      >
        <Group p={padding}>
          <Text>{loadingMessage}</Text>
        </Group>
      </Notification>
    );
  }

  return <Center h="62%">{notificationComponent}</Center>;
}

export { CustomNotification };
