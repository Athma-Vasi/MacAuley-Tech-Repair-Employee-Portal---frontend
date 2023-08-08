import { Flex, Group, Notification, Space, Text } from '@mantine/core';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { TbCheck } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { useGlobalState } from '../../hooks';

type ParentDispatch = React.Dispatch<
  | {
      type:
        | 'setIsError'
        | 'setIsSuccessful'
        | 'setIsSubmitting'
        | 'setIsLoading';
      payload: boolean;
    }
  | {
      type:
        | 'setErrorMessage'
        | 'setSuccessMessage'
        | 'setSubmitMessage'
        | 'setLoadingMessage';
      payload: string;
    }
>;

type CustomNotificationProps = {
  isError: boolean;
  errorMessage?: string;
  isSuccessful: boolean;
  successMessage?: string;
  isSubmitting: boolean;
  submitMessage?: string;
  isLoading: boolean;
  loadingMessage?: string;

  navigateTo: {
    errorPath: string;
    successPath: string;
  };
  parentDispatch: ParentDispatch;
};

function CustomNotification({
  isError,
  errorMessage = 'Unknown error occured. Please try again.',
  isSuccessful,
  successMessage = 'Success!',
  isSubmitting,
  submitMessage = 'Please wait. Submitting...',
  isLoading,
  loadingMessage = 'Please wait. Loading...',

  navigateTo: { errorPath, successPath },
  parentDispatch,
}: CustomNotificationProps) {
  const {
    globalState: { padding, width },
  } = useGlobalState();
  const navigate = useNavigate();

  let notificationComponent = null;

  if (isError) {
    notificationComponent = (
      <Notification
        closeButtonProps={{ color: 'red', 'aria-label': 'Hide notification' }}
        color="red"
        icon={<MdOutlineErrorOutline size={22} />}
        onClose={() => {
          parentDispatch({
            type: 'setIsError',
            payload: false,
          });
          parentDispatch({
            type: 'setErrorMessage',
            payload: '',
          });

          navigate(errorPath);
        }}
        title={
          <Group
            p={padding}
            style={{
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <Text size="md">(｡•́︿•̀｡) Oh no! Error occurred!</Text>
          </Group>
        }
        withBorder
      >
        <Group p={padding}>
          <Text>{errorMessage}</Text>
        </Group>
      </Notification>
    );
  }

  if (isSuccessful) {
    notificationComponent = (
      <Notification
        closeButtonProps={{ color: 'green', 'aria-label': 'Hide notification' }}
        color="green"
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

          navigate(successPath);
        }}
        title={
          <Group
            p={padding}
            style={{
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <Text size="md">٩(^ ᗜ ^ )و ´- </Text>
            <Space w="xs" />
            <Text size="md">Success!</Text>
          </Group>
        }
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
        closeButtonProps={{ color: 'blue', 'aria-label': 'Hide notification' }}
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

          navigate(successPath);
        }}
        title={
          <Group
            p={padding}
            style={{
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <Text size="md">Submitting... Please wait. </Text>
          </Group>
        }
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
        closeButtonProps={{ color: 'blue', 'aria-label': 'Hide notification' }}
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

          navigate(successPath);
        }}
        title={
          <Group
            p={padding}
            style={{
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <Text size="md">Loading... Please wait. </Text>
          </Group>
        }
        withBorder
        withCloseButton={false}
      >
        <Group p={padding}>
          <Text>{loadingMessage}</Text>
        </Group>
      </Notification>
    );
  }

  return (
    <Flex
      w={
        width < 480 ? width * 0.85 : width < 1024 ? width * 0.62 : width * 0.38
      }
    >
      {notificationComponent}
    </Flex>
  );
}

export { CustomNotification };
