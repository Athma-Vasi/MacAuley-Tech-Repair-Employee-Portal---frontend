import { Group, Modal, Notification, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { useGlobalState } from '../../hooks';
import { ErrorState } from '../../context/globalProvider/types';

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

  const {
    globalState: { padding },
  } = useGlobalState();

  const errorNotification = (
    <Notification
      withCloseButton={true}
      color="red"
      icon={<MdOutlineErrorOutline size={22} />}
      onClose={() => {
        errorCallback();
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

  // const notificationModal = (
  //   <Modal
  //     opened={openedNotificationModal}
  //     onClose={closeNotificationModal}
  //     size="md"
  //     padding="md"
  //   >
  //     {errorNotification}
  //   </Modal>
  // );

  return (
    // <div role="alert">
    //   <p>Something went wrong:</p>
    //   <pre>{errorMessage}</pre>
    //   <button type="button" onClick={resetErrorBoundary}>
    //     Try again
    //   </button>
    // </div>
    errorNotification
  );
}

export default ErrorFallback;
