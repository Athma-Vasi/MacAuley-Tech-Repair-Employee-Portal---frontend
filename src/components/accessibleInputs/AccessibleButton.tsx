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
  disabledScreenreaderText?: string;
  enabledScreenreaderText?: string;
  disabled?: boolean;
  isTooltip?: boolean;
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
    disabledScreenreaderText,
    enabledScreenreaderText,
    disabled = false,
    isTooltip = true,
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
      disabledScreenreaderText,
      enabledScreenreaderText,
      name,
      themeObject,
    });

  const button = (
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
  );

  return (
    <Container w={100}>
      {isTooltip ? (
        <Tooltip label={disabled ? disabledScreenreaderText : enabledScreenreaderText}>
          <Group>{button}</Group>
        </Tooltip>
      ) : (
        button
      )}

      <Box
        style={
          // This is an invisible element that is used to provide screen reader users with additional information
          // @see https://webaim.org/techniques/css/invisiblecontent/
          {
            height: "1px",
            left: "-9999px",
            position: "absolute",
            top: "auto",
            width: "1px",
          }
        }
      >
        {disabledTextElement}
        {enabledTextElement}
      </Box>
    </Container>
  );
}

export { AccessibleButton };

export type { AccessibleButtonAttributes };
