import { Box, Button, Container, Group, MantineSize, Tooltip } from "@mantine/core";
import {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactNode,
  RefObject,
} from "react";
import {
  TbDownload,
  TbEdit,
  TbFilter,
  TbPlus,
  TbRefresh,
  TbSearch,
  TbTrash,
  TbUpload,
} from "react-icons/tb";

import { useGlobalState } from "../../hooks";
import { splitCamelCase } from "../../utils";
import { createAccessibleButtonScreenreaderTextElements } from "./utils";

type AccessibleButtonKind =
  | "add"
  | "default"
  | "delete"
  | "download"
  | "edit"
  | "filter"
  | "refresh"
  | "search"
  | "submit";

type AccessibleButtonAttributes = {
  compact?: boolean;
  disabledScreenreaderText?: string;
  enabledScreenreaderText?: string;
  disabled?: boolean;
  isTooltip?: boolean;
  label?: ReactNode;
  kind: AccessibleButtonKind;
  leftIcon?: ReactNode;
  name: string;
  onClick?: (
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
    kind,
    type = "button",
    onClick,
    onKeyDown = () => {},
    ref = null,
    rightIcon = null,
    size = "sm",
    style = {},
    variant = colorScheme === "dark" ? "outline" : "subtle",
  } = attributes;
  const name = splitCamelCase(attributes.name);
  const label = attributes.label ?? name;

  const leftIconTable: Record<AccessibleButtonKind, ReactNode> = {
    add: <TbPlus />,
    default: null,
    delete: <TbTrash />,
    download: <TbDownload />,
    edit: <TbEdit />,
    filter: <TbFilter />,
    refresh: <TbRefresh />,
    search: <TbSearch />,
    submit: <TbUpload />,
  };

  const leftIcon = attributes.leftIcon ?? leftIconTable[kind];

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

export type { AccessibleButtonAttributes, AccessibleButtonKind };
