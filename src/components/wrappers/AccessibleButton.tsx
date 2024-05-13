import { Box, Button, MantineSize } from "@mantine/core";
import {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactNode,
  RefObject,
} from "react";
import { TbUpload } from "react-icons/tb";

import { useGlobalState } from "../../hooks";
import { AccessibleEnabledDisabledButtonTextElements } from "./utils";

type AccessibleButtonAttributes = {
  label: ReactNode;
  onClickCallbacks?: Array<
    (event: MouseEvent<HTMLButtonElement> | PointerEvent<HTMLButtonElement>) => void
  >;
  onKeyDownCallbacks?: Array<(event: KeyboardEvent<HTMLButtonElement>) => void>;
  style?: CSSProperties;
  disabled?: boolean;
  ref?: RefObject<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  variant?: "outline" | "white" | "light" | "default" | "filled" | "gradient" | "subtle";
  compact?: boolean;
  enabledAccessibleText?: string;
  disabledAccessibleText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  semanticName: string;
  size?: MantineSize;
};

type AccessibleButtonProps = {
  attributes: AccessibleButtonAttributes;
};

function AccessibleButton({ attributes }: AccessibleButtonProps) {
  const {
    globalState: { themeObject },
  } = useGlobalState();
  const { defaultGradient, colorScheme } = themeObject;

  const {
    compact = false,
    disabled = false,
    disabledAccessibleText,
    enabledAccessibleText,
    label = "Button",
    type = "button",
    leftIcon = type === "submit" ? <TbUpload /> : null,
    onClickCallbacks = [],
    onKeyDownCallbacks = [],
    ref = null,
    rightIcon = null,
    semanticName,
    size = "xs",
    style = {},
    variant = colorScheme === "dark" ? "outline" : "subtle",
  } = attributes;

  const [buttonEnabledTextElement, buttonDisabledTextElement] =
    AccessibleEnabledDisabledButtonTextElements({
      semanticName,
      isEnabled: !disabled,
      enabledAccessibleText,
      disabledAccessibleText,
    });

  return (
    <Box>
      <Button
        aria-describedby={
          disabled
            ? // id of buttonDisabledTextElement
              `${semanticName.split(" ").join("-")}-disabled`
            : // id of buttonEnabledTextElement
              `${semanticName.split(" ").join("-")}-enabled`
        }
        aria-label={semanticName}
        compact={compact}
        disabled={disabled}
        gradient={variant === "gradient" ? defaultGradient : void 0}
        leftIcon={leftIcon}
        name={semanticName.split(" ").join("-")}
        onClick={(
          event: MouseEvent<HTMLButtonElement> | PointerEvent<HTMLButtonElement>
        ) => {
          onClickCallbacks.length &&
            onClickCallbacks.forEach((callback) => callback(event));
        }}
        onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) => {
          onKeyDownCallbacks.length &&
            onKeyDownCallbacks.forEach((callback) => callback(event));
        }}
        ref={ref}
        rightIcon={rightIcon}
        size={size}
        style={style}
        type={type}
        variant={variant}
      >
        {label}
      </Button>

      <Box style={{ display: "hidden" }}>
        {buttonEnabledTextElement}
        {buttonDisabledTextElement}
      </Box>
    </Box>
  );
}

export { AccessibleButton };

export type { AccessibleButtonAttributes };
