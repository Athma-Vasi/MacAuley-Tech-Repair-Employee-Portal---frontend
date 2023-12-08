import {
  MantineSize,
  PasswordInput,
  Popover,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { ReactNode, useState } from "react";
import { TbCheck } from "react-icons/tb";

import { useGlobalState } from "../../hooks";

type AccessiblePasswordInputCreatorInfo = {
  semanticName: string;
  inputText: string;
  isValidInputText: boolean;
  label: string;
  ariaRequired?: boolean;
  description: {
    error: JSX.Element;
    valid: JSX.Element;
  };
  placeholder: string;
  initialInputValue?: string;
  icon?: ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;

  minLength?: number;
  maxLength?: number;
  withAsterisk?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  size?: MantineSize;
  required?: boolean;
};

type PasswordInputWrapperProps = {
  creatorInfoObject: AccessiblePasswordInputCreatorInfo;
};

function PasswordInputWrapper({ creatorInfoObject }: PasswordInputWrapperProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const { colors } = useMantineTheme();
  const {
    globalState: {
      themeObject: { colorScheme, primaryShade },
    },
  } = useGlobalState();

  const {
    semanticName,
    inputText,
    isValidInputText,
    label,
    ariaRequired = false,
    description,
    placeholder,
    initialInputValue = "",
    icon = null,
    onChange,
    onFocus,
    onBlur,
    minLength = 8,
    maxLength = 32,
    withAsterisk = false,
    ref = null,
    required = false,
    size = "sm",
  } = creatorInfoObject;

  const colorShade = colorScheme === "light" ? primaryShade.light : primaryShade.dark;

  const leftIcon = isValidInputText ? (
    icon ? (
      icon
    ) : (
      <TbCheck color={colors.green[colorShade]} size={18} />
    )
  ) : null;

  const inputWidth = 330;

  const inputWithPopover = (
    <Popover
      opened={inputText ? popoverOpened : false}
      position="bottom"
      shadow="md"
      transitionProps={{ transition: "pop" }}
      width="target"
      withArrow
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            size={size}
            w={inputWidth}
            color="dark"
            label={label}
            aria-required={ariaRequired}
            aria-describedby={
              isValidInputText
                ? `${semanticName.split(" ").join("-")}-input-note-valid`
                : `${semanticName.split(" ").join("-")}-input-note-error`
            }
            placeholder={placeholder}
            aria-invalid={isValidInputText ? false : true}
            value={inputText}
            icon={leftIcon}
            error={!isValidInputText && inputText !== initialInputValue}
            // description={isValidInputText ? description.valid : description.error}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            minLength={minLength}
            maxLength={maxLength}
            name={semanticName.split(" ").join("-")}
            ref={ref}
            withAsterisk={withAsterisk}
            required={required}
          />
        </div>
      </Popover.Target>

      <Popover.Dropdown>
        <Stack>{isValidInputText ? description.valid : description.error}</Stack>
      </Popover.Dropdown>
    </Popover>
  );

  return inputWithPopover;
}

export { PasswordInputWrapper };

export type { AccessiblePasswordInputCreatorInfo };

/**
 * <PasswordInput
      size={size}
      w="100%"
      color="dark"
      label={label}
      aria-required={ariaRequired}
      aria-describedby={
        isValidInputText
          ? `${semanticName.split(' ').join('-')}-input-note-valid`
          : `${semanticName.split(' ').join('-')}-input-note-error`
      }
      placeholder={placeholder}
      aria-invalid={isValidInputText ? false : true}
      value={inputText}
      icon={
        isValidInputText ? (
          icon ? (
            <FontAwesomeIcon icon={icon} color="green" />
          ) : (
            <FontAwesomeIcon icon={faCheck} color="green" />
          )
        ) : null
      }
      error={!isValidInputText && inputText !== initialInputValue}
      description={isValidInputText ? description.valid : description.error}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      minLength={minLength}
      maxLength={maxLength}
      name={semanticName.split(' ').join('-')}
      ref={ref}
      withAsterisk={withAsterisk}
      required={required}
    />
 */
