import {
  Button,
  Group,
  Modal,
  Notification,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useErrorBoundary } from "react-error-boundary";
import { TbExclamationMark } from "react-icons/tb";
import { COLORS_SWATCHES } from "../../constants/data";
import { ErrorState } from "../../context/globalProvider/types";
import { useGlobalState } from "../../hooks";
import { returnThemeColors } from "../../utils";

type ErrorFallbackProps = {
  isError: boolean;
  errorMessage: string;
  errorCallback: () => void;
};

function ErrorFallback({ isError, errorMessage, errorCallback }: ErrorFallbackProps) {
  const { resetBoundary } = useErrorBoundary();
  const {
    globalState: { padding, themeObject },
  } = useGlobalState();

  const {
    generalColors: { redColorShade, themeColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  const tryAgainButtonWithTooltip = (
    <Tooltip label="Will try the action again">
      <Group>
        <Button onClick={() => resetBoundary()} aria-label="Will try the action again">
          Try again
        </Button>
      </Group>
    </Tooltip>
  );

  const { colorScheme, primaryShade } = themeObject;
  const errorColor =
    colorScheme === "light" ? `red.${primaryShade.light}` : `red.${primaryShade.dark}`;

  const errorModal = (
    <Modal
      opened={isError}
      closeButtonProps={{ color: themeColorShade }}
      onClose={() => {
        errorCallback();
      }}
      title={<Title order={4}>ERROR</Title>}
    >
      <Notification
        color={errorColor}
        icon={<TbExclamationMark size={22} />}
        style={{ boxShadow: "0 0 0 0", backgroundColor: "transparent" }}
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
