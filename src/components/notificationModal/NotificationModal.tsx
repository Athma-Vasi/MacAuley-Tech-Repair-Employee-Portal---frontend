import { Modal, Notification, Text, Title } from "@mantine/core";
import type { ReactNode } from "react";
import { TbCheck } from "react-icons/tb";

import { useGlobalState } from "../../hooks";

type CustomNotificationModalProps = {
  centered?: boolean;
  notificationProps: {
    icon?: ReactNode;
    isLoading: boolean;
    text?: string;
  };
  opened: boolean;
  onCloseCallbacks: Array<() => void>;
  title?: ReactNode;
  withCloseButton?: boolean;
};

function NotificationModal({
  notificationProps,
  onCloseCallbacks,
  opened,
  title = "Uploading data to the server",
  centered = true,
  withCloseButton = true,
}: CustomNotificationModalProps) {
  const {
    text = "Please wait until data is uploaded ...",
    icon = <TbCheck size={22} />,
    isLoading,
  } = notificationProps;

  const {
    globalState: {
      themeObject: { primaryColor },
    },
  } = useGlobalState();

  const notificationModal = (
    <Modal
      centered={centered}
      closeButtonProps={{
        color: primaryColor,
        "aria-label": "Dismiss notification",
      }}
      opened={opened}
      onClose={() => {
        onCloseCallbacks.forEach((callback) => callback?.());
      }}
      title={<Title order={4}>{title}</Title>}
      withCloseButton={withCloseButton}
    >
      <Notification
        icon={icon}
        loading={isLoading}
        withCloseButton={false}
        style={{ boxShadow: "0 0 0 0", backgroundColor: "transparent" }}
      >
        <Text>{text}</Text>
      </Notification>
    </Modal>
  );

  return notificationModal;
}

export { NotificationModal };
