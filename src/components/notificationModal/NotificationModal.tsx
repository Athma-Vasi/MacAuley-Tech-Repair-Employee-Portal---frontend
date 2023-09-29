import { Center, Group, Modal, Notification, Text, Title } from '@mantine/core';
import { TbCheck } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES } from '../../constants/data';
import { useGlobalState } from '../../hooks';
import { returnThemeColors } from '../../utils';
import { ReactNode } from 'react';

// type CustomNotificationProps = {
//   isSuccessful: boolean;
//   isSubmitting: boolean;
//   navigateTo: {
//     successPath: string;
//   };
//   parentDispatch: ParentDispatch;
//   successMessage?: string;
//   submitMessage?: string;

//   // runs on success notification close
//   successCallbacks?: Array<() => void>;
// };

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

  const notificationModal = (
    <Modal
      opened={opened}
      onClose={() => {
        onCloseCallbacks.forEach((callback) => callback());
      }}
      centered={centered}
      title={title}
      withCloseButton={withCloseButton}
    >
      <Notification icon={icon} loading={loading} withCloseButton={false}>
        <Text>{text}</Text>
      </Notification>
    </Modal>
  );

  return notificationModal;
}

export { NotificationModal };
