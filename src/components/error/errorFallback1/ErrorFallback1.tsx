import { Button, Group, Notification, Stack, Text, Tooltip } from "@mantine/core";
import { TbExclamationMark } from "react-icons/tb";
import { COLORS_SWATCHES } from "../../../constants/data";
import { useGlobalState } from "../../../hooks";
import { returnThemeColors } from "../../../utils";
import { InvalidTokenError } from "jwt-decode";

function ErrorFallback1({
  error,
  resetErrorBoundary,
}: {
  error: any;
  resetErrorBoundary: () => void;
}) {
  // return (
  //   <div role="alert">
  //     <p>Something went wrong:</p>
  //     <pre>{error.message}</pre>
  //     <button onClick={resetErrorBoundary}>Try again</button>
  //   </div>
  // );

  const {
    globalState: { padding, themeObject },
  } = useGlobalState();

  const {
    generalColors: { redColorShade, themeColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  const tryAgainButtonWithTooltip = (
    <Tooltip label="Will try the action again">
      <Group>
        <Button
          onClick={() => resetErrorBoundary()}
          aria-label="Will try the action again"
        >
          Try again
        </Button>
      </Group>
    </Tooltip>
  );

  const { colorScheme, primaryShade } = themeObject;
  const errorColor =
    colorScheme === "light" ? `red.${primaryShade.light}` : `red.${primaryShade.dark}`;

  const errorMessage =
    error instanceof InvalidTokenError
      ? "Invalid token. Please login again!"
      : !error.response
      ? "Network error. Please try again!"
      : error?.message ?? "Unknown error occurred. Please try again!";

  return (
    <Stack w={350}>
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
    </Stack>
  );
}

export default ErrorFallback1;
