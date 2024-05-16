import { Box, Button, Container, Group, MantineSize, Tooltip } from "@mantine/core";
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
import { capitalizeAll } from "../../utils";
import { createAccessibleButtonScreenreaderTextElements } from "./utils";

type AccessibleButtonAttributes = {
  compact?: boolean;
  customDisabledText?: string;
  customEnabledText?: string;
  disabled?: boolean;
  disabledTooltipText?: string;
  enabledTooltipText?: string;
  label?: ReactNode;
  leftIcon?: ReactNode;
  name: string;
  onClick: (
    event: MouseEvent<HTMLButtonElement> | PointerEvent<HTMLButtonElement>
  ) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  ref?: RefObject<HTMLButtonElement>;
  rightIcon?: ReactNode;
  size?: MantineSize;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
  variant?: "outline" | "white" | "light" | "default" | "filled" | "gradient" | "subtle";
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
    customDisabledText,
    customEnabledText,
    disabled = false,
    disabledTooltipText,
    enabledTooltipText,
    label = capitalizeAll(attributes.name),
    type = "button",
    leftIcon = type === "submit" ? <TbUpload /> : null,
    name,
    onClick,
    onKeyDown = () => {},
    ref = null,
    rightIcon = null,
    size = "xs",
    style = {},
    variant = colorScheme === "dark" ? "outline" : "subtle",
  } = attributes;

  const { disabledTextElement, enabledTextElement } =
    createAccessibleButtonScreenreaderTextElements({
      isEnabled: !disabled,
      customDisabledText,
      customEnabledText,
      name,
      themeObject,
    });

  return (
    <Container w={100}>
      <Tooltip label={disabled ? disabledTooltipText : enabledTooltipText}>
        <Group>
          <Button
            aria-describedby={
              disabled
                ? // id of disabledTextElement
                  `${name}-disabled`
                : // id of enabledTextElement
                  `${name}-enabled`
            }
            aria-label={name}
            compact={compact}
            disabled={disabled}
            gradient={variant === "gradient" ? defaultGradient : void 0}
            leftIcon={leftIcon}
            name={name}
            onClick={onClick}
            onKeyDown={onKeyDown}
            ref={ref}
            rightIcon={rightIcon}
            size={size}
            style={style}
            type={type}
            variant={variant}
          >
            {label}
          </Button>
        </Group>
      </Tooltip>

      <Box style={{ display: "hidden" }}>
        {disabledTextElement}
        {enabledTextElement}
      </Box>
    </Container>
  );
}

export { AccessibleButton };

export type { AccessibleButtonAttributes };
