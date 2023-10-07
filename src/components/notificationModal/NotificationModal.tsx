import { Modal, Notification, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { TbCheck } from 'react-icons/tb';

import { useGlobalState } from '../../hooks';

type CustomNotificationModalProps = {
  centered?: boolean;
  notificationProps: {
    icon?: ReactNode;
    loading: boolean;
    text: string;
  };
  opened: boolean;
  onCloseCallbacks: Array<() => void>;
  title: ReactNode;
  withCloseButton?: boolean;
};

function NotificationModal({
  notificationProps,
  onCloseCallbacks,
  opened,
  title,
  centered = true,
  withCloseButton = true,
}: CustomNotificationModalProps) {
  const {
    text = '',
    icon = <TbCheck size={22} />,
    loading,
  } = notificationProps;

  const {
    globalState: {
      themeObject: { primaryColor },
    },
  } = useGlobalState();

  const notificationModal = (
    <Modal
      centered={centered}
      closeButtonProps={{ color: primaryColor }}
      opened={opened}
      onClose={() => {
        onCloseCallbacks.forEach((callback) => callback());
      }}
      title={title}
      withCloseButton={withCloseButton}
    >
      <Notification
        icon={icon}
        loading={loading}
        withCloseButton={false}
        style={{ boxShadow: '0 0 0 0', backgroundColor: 'transparent' }}
      >
        <Text>{text}</Text>
      </Notification>
    </Modal>
  );

  return notificationModal;
}

export { NotificationModal };
