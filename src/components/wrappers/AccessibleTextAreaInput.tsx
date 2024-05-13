import { Group, MantineSize, Popover, Stack, Text, Textarea } from "@mantine/core";
import { ChangeEvent, KeyboardEvent, ReactNode, useEffect, useState } from "react";
import React from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnThemeColors, splitCamelCase } from "../../utils";
import { AccessibleErrorValidTextElements } from "./utils";

type AccessibleTextAreaInputAttributes = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";
  disabled?: boolean;
  dynamicInputs?: ReactNode[]; // inputs created by the user (ex: buttons in the survey builder)
  icon?: ReactNode;
  initialInputValue?: string;
  inputText: string;
  label?: ReactNode | string;
  maxLength?: number;
  maxRows?: number;
  minLength?: number;
  minRows?: number;
  name?: string;
  onBlurCallbacks?: Array<() => void>;
  onChangeCallbacks: Array<(event: ChangeEvent<HTMLTextAreaElement>) => void>;
  onFocusCallbacks?: Array<() => void>;
  onKeyDownCallbacks?: Array<(event: KeyboardEvent<HTMLTextAreaElement>) => void>;
  placeholder: string;
  ref?: React.RefObject<HTMLTextAreaElement> | null;
  regex: RegExp;
  regexValidationText: string;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  semanticName: string;
  size?: MantineSize;
  textAreaInputWidth?: string | number;
  withAsterisk?: boolean;
};

type AccessibleTextAreaInputProps = {
  attributes: AccessibleTextAreaInputAttributes;
};

function AccessibleTextAreaInput({ attributes }: AccessibleTextAreaInputProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isInputTextValid, setIsInputTextValid] = useState(false);
  const [isInputTextFocused, setIsInputTextFocused] = useState(false);

  const {
    globalState: { themeObject, padding },
  } = useGlobalState();

  const {
    ariaAutoComplete = "none",
    autoComplete = "off",
    disabled = false,
    dynamicInputs = null,
    icon = null,
    initialInputValue = "",
    inputText,
    semanticName,
    label = semanticName,
    maxLength = 2000,
    maxRows = 7,
    minLength = 2,
    minRows = 3,
    name = semanticName,
    onBlurCallbacks = [],
    onChangeCallbacks,
    onFocusCallbacks = [],
    onKeyDownCallbacks = [],
    placeholder,
    ref = null,
    regex,
    regexValidationText,
    required = false,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    size = "sm",
    textAreaInputWidth = 330,
    withAsterisk = required,
  } = attributes;

  useEffect(() => {
    setIsInputTextValid(regex.test(inputText));
  }, [inputText, regex]);

  const {
    generalColors: { greenColorShade, grayColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

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

  const leftIcon = isInputTextValid ? (
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

  const [inputErrorTextElement, inputValidTextElement] = AccessibleErrorValidTextElements(
    {
      semanticName,
      inputText,
      isInputTextValid,
      isInputTextFocused,
      regexValidationText,
    }
  );

  const accessibleTextAreaInput = (
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
          onBlurCapture={() => setPopoverOpened(false)}
          onFocusCapture={() => setPopoverOpened(true)}
          style={{ width: textAreaInputWidth }}
        >
          <Textarea
            aria-autocomplete={ariaAutoComplete}
            aria-describedby={
              isInputTextValid
                ? // id of inputValidTextElement
                  `${semanticName.split(" ").join("-")}-valid`
                : // id of inputErrorTextElement
                  `${semanticName.split(" ").join("-")}-error`
            }
            aria-invalid={isInputTextValid ? false : true}
            aria-required={required}
            autoComplete={autoComplete}
            color={grayColorShade}
            disabled={disabled}
            error={!isInputTextValid && inputText !== initialInputValue}
            icon={leftIcon}
            label={dynamicInputLabel}
            maxLength={maxLength}
            maxRows={maxRows}
            minLength={minLength}
            minRows={minRows}
            name={name}
            onBlur={() => {
              setIsInputTextFocused(false);
              onBlurCallbacks.length && onBlurCallbacks.forEach((callback) => callback());
            }}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              onChangeCallbacks.length &&
                onChangeCallbacks.forEach((callback) => callback(event));
            }}
            onFocus={() => {
              setIsInputTextFocused(true);
              onFocusCallbacks.length &&
                onFocusCallbacks.forEach((callback) => callback());
            }}
            onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
              onKeyDownCallbacks.length &&
                onKeyDownCallbacks.forEach((callback) => callback(event));
            }}
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
        <Stack>{isInputTextValid ? inputValidTextElement : inputErrorTextElement}</Stack>
      </Popover.Dropdown>
    </Popover>
  );

  return accessibleTextAreaInput;
}

export { AccessibleTextAreaInput };

export type { AccessibleTextAreaInputAttributes };
