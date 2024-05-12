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

import { useGlobalState } from "../../../hooks";
import { AccessibleEnabledDisabledButtonTextElements } from "../utils";

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
    disabled = false,
    label = "Button",
    onClickCallbacks = [],
    onKeyDownCallbacks = [],
    ref = null,
    style = {},
    type = "button",
    variant = colorScheme === "dark" ? "outline" : "subtle",
    compact = false,
    enabledAccessibleText,
    disabledAccessibleText,
    leftIcon = type === "submit" ? <TbUpload /> : null,
    rightIcon = null,
    semanticName,
    size = "xs",
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
        style={style}
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
        disabled={disabled}
        ref={ref}
        type={type}
        variant={variant}
        compact={compact}
        gradient={variant === "gradient" ? defaultGradient : void 0}
        leftIcon={leftIcon}
        name={semanticName.split(" ").join("-")}
        rightIcon={rightIcon}
        size={size}
        aria-label={semanticName}
        aria-describedby={
          disabled
            ? // id of buttonDisabledTextElement
              `${semanticName.split(" ").join("-")}-disabled`
            : // id of buttonEnabledTextElement
              `${semanticName.split(" ").join("-")}-enabled`
        }
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
