import { Group, MantineSize, Popover, Stack, Text, Textarea } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";
import React from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { AccessibleErrorValidTextElements } from "../../jsxCreators";
import { returnThemeColors, splitCamelCase } from "../../utils";

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
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
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

type AccessibleTextAreaInputsProps = {
  attributes: AccessibleTextAreaInputAttributes;
};

function AccessibleTextAreaInput({ attributes }: AccessibleTextAreaInputsProps) {
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
    onChange,
    onKeyDown = () => {},
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
      inputElementKind: semanticName,
      inputText,
      isValidInputText: isInputTextValid,
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
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
          style={{ width: textAreaInputWidth }}
        >
          <Textarea
            aria-autocomplete={ariaAutoComplete}
            aria-describedby={
              isInputTextValid
                ? // id of inputValidTextElement
                  `${semanticName.split(" ").join("-")}-input-note-valid`
                : // id of inputErrorTextElement
                  `${semanticName.split(" ").join("-")}-input-note-error`
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
            onBlur={() => setIsInputTextFocused(false)}
            onChange={onChange}
            onFocus={() => setIsInputTextFocused(true)}
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
        <Stack>{isInputTextValid ? inputValidTextElement : inputErrorTextElement}</Stack>
      </Popover.Dropdown>
    </Popover>
  );

  return accessibleTextAreaInput;
}

export { AccessibleTextAreaInput };

export type { AccessibleTextAreaInputAttributes };
