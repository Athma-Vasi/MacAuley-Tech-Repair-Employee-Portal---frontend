import { Group, MantineSize, Popover, Stack, Text, TextInput } from "@mantine/core";
import { ChangeEvent, KeyboardEvent, ReactNode, RefObject, useState } from "react";
import React from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnThemeColors, splitCamelCase } from "../../utils";

type AccessibleTextInputCreatorInfo = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";
  description: { error: React.JSX.Element; valid: React.JSX.Element };
  disabled?: boolean;
  dynamicInputs?: ReactNode[];
  icon?: ReactNode;
  initialInputValue?: string;
  inputText: string;
  isValidInputText: boolean;
  label?: ReactNode | string;
  maxLength?: number;
  minLength?: number;
  name?: string;
  onBlur: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  ref?: RefObject<HTMLInputElement> | null;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  semanticName: string;
  size?: MantineSize;
  textInputWidth?: string | number;
  withAsterisk?: boolean;
};

type TextInputWrapperProps = {
  creatorInfoObject: AccessibleTextInputCreatorInfo;
};

function TextInputWrapper({ creatorInfoObject }: TextInputWrapperProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const {
    globalState: { themeObject, padding },
  } = useGlobalState();

  const {
    generalColors: { greenColorShade, grayColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  const {
    ariaAutoComplete = "none",
    autoComplete = "off",
    description,
    disabled = false,
    dynamicInputs = null,
    icon = null,
    initialInputValue = "",
    inputText,
    isValidInputText,
    semanticName,
    label = splitCamelCase(semanticName),
    maxLength = 75,
    minLength = 2,
    name = splitCamelCase(semanticName),
    onBlur,
    onChange,
    onFocus,
    onKeyDown = () => {},
    placeholder,
    ref = null,
    required = false,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    size = "sm",
    textInputWidth = 330,
    withAsterisk = required,
  } = creatorInfoObject;

  const dynamicInputLabel = dynamicInputs ? (
    <Group w="100%" position="apart" py={padding}>
      <Text size="sm">{label}</Text>
      {dynamicInputs.map((input, index) => (
        <Group key={`${index}`}>{input}</Group>
      ))}
    </Group>
  ) : (
    label
  );

  const leftIcon = isValidInputText ? (
    icon ? (
      icon
    ) : (
      <TbCheck color={greenColorShade} size={18} />
    )
  ) : null;

  const rightIcon = rightSection ? (
    rightSectionIcon ? (
      rightSectionIcon
    ) : (
      <TbRefresh
        aria-label={`Reset ${splitCamelCase(semanticName)} value to ${initialInputValue}`}
        color={grayColorShade}
        size={18}
        onClick={rightSectionOnClick}
      />
    )
  ) : null;

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
          style={{ width: textInputWidth }}
        >
          <TextInput
            aria-autocomplete={ariaAutoComplete}
            aria-describedby={
              isValidInputText
                ? `${semanticName.split(" ").join("-")}-valid`
                : `${semanticName.split(" ").join("-")}-error`
            }
            aria-invalid={isValidInputText ? false : true}
            aria-required={required}
            autoComplete={autoComplete}
            color={grayColorShade}
            disabled={disabled}
            error={!isValidInputText && inputText !== initialInputValue}
            icon={leftIcon}
            label={dynamicInputLabel}
            maxLength={maxLength}
            minLength={minLength}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            ref={ref}
            required={required}
            rightSection={rightIcon}
            size={size}
            value={inputText}
            withAsterisk={withAsterisk}
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

export { TextInputWrapper };

export type { AccessibleTextInputCreatorInfo };
