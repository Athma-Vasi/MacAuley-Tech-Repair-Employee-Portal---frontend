import { Flex, Group, Notification, Space, Text } from '@mantine/core';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { TbCheck } from 'react-icons/tb';

import { useGlobalState } from '../../hooks';

type CustomNotificationProps = {
  isError: boolean;
  errorMessage?: string;
  isSuccess: boolean;
  successMessage?: string;
  isSubmitting: boolean;
  submitMessage?: string;
  //   isSubmitted: boolean;
  //   submittedMessage?: string;
  isLoading: boolean;
  loadingMessage?: string;
};

function CustomNotification({
  isError,
  errorMessage = 'Unknown error occured. Please try again.',
  isSuccess,
  successMessage = 'Success!',
  isSubmitting,
  submitMessage = 'Please wait. Submitting...',
  //   isSubmitted,
  //   submittedMessage = 'Successfully submitted!',
  isLoading,
  loadingMessage = 'Please wait. Loading...',
}: CustomNotificationProps) {
  const {
    globalState: { padding, width },
  } = useGlobalState();

  let notificationComponent = null;

  if (isError) {
    notificationComponent = (
      <Notification
        closeButtonProps={{ color: 'red', 'aria-label': 'Hide notification' }}
        icon={<MdOutlineErrorOutline size={22} />}
        color="red"
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

  if (isSuccess) {
    notificationComponent = (
      <Notification
        closeButtonProps={{ color: 'green', 'aria-label': 'Hide notification' }}
        icon={<TbCheck size={22} />}
        color="green"
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
        withCloseButton={false}
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
      >
        <Group p={padding}>
          <Text>{submitMessage}</Text>
        </Group>
      </Notification>
    );
  }

  //   if (isSubmitted) {
  //     notificationComponent = (
  //       <Notification
  //         closeButtonProps={{ color: 'green', 'aria-label': 'Hide notification' }}
  //         icon={<TbCheck size={22} />}
  //         color="teal"
  //         title={
  //           <Group
  //             p={padding}
  //             style={{
  //               borderBottom: '1px solid #e0e0e0',
  //             }}
  //           >
  //             <Text size="md">٩(^ ᗜ ^ )و ´- </Text>
  //             <Space w="xs" />
  //             <Text size="md">Successfully submitted form!</Text>
  //           </Group>
  //         }
  //         withBorder
  //       >
  //         <Group p={padding}>
  //           <Text>{submittedMessage}</Text>
  //         </Group>
  //       </Notification>
  //     );
  //   }

  if (isLoading) {
    notificationComponent = (
      <Notification
        closeButtonProps={{ color: 'blue', 'aria-label': 'Hide notification' }}
        loading
        withCloseButton={false}
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
