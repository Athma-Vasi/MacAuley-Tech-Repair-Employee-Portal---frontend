import { Group, MantineSize, Popover, Stack, Text, Textarea } from "@mantine/core";
import { ChangeEvent, Dispatch, KeyboardEvent, ReactNode, useState } from "react";
import React from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { SetStepsInErrorPayload } from "../../types";
import { returnThemeColors, splitCamelCase } from "../../utils";
import { AccessibleErrorValidTextElements } from "./utils";

type AccessibleTextAreaInputAttributes<
  OnChangeAction extends string = string,
  OnErrorAction extends string = string
> = {
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
  onBlur?: () => void;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  parentDispatch: Dispatch<
    | {
        type: OnChangeAction;
        payload: string;
      }
    | {
        type: OnErrorAction;
        payload: SetStepsInErrorPayload;
      }
  >;
  parentOnChangeAction: OnChangeAction;
  parentOnErrorAction: OnErrorAction;
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
  step: number; // stepper page location of input
  textAreaInputWidth?: string | number;
  withAsterisk?: boolean;
};

type AccessibleTextAreaInputProps = {
  attributes: AccessibleTextAreaInputAttributes;
};

function AccessibleTextAreaInput({ attributes }: AccessibleTextAreaInputProps) {
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
    onBlur = () => {},
    onChange,
    onFocus = () => {},
    onKeyDown = () => {},
    parentDispatch,
    parentOnChangeAction,
    parentOnErrorAction,
    placeholder,
    ref = null,
    regex,
    regexValidationText,
    required = false,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    size = "sm",
    step,
    textAreaInputWidth = 330,
    withAsterisk = required,
  } = attributes;

  const [inputTextBuffer, setInputTextBuffer] = useState(inputText);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const {
    globalState: { themeObject, padding },
  } = useGlobalState();

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

  const isInputTextValid = regex.test(inputText);

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
      isInputFocused,
      regexValidationText,
    }
  );

  return (
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
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setInputTextBuffer(event.currentTarget.value);
              onChange(event);
            }}
            onFocus={() => {
              setIsInputFocused(true);
              onFocus();
            }}
            onBlur={() => {
              parentDispatch({
                type: parentOnErrorAction,
                payload: {
                  kind: isInputTextValid ? "delete" : "add",
                  step,
                },
              });

              parentDispatch({
                type: parentOnChangeAction,
                payload: inputTextBuffer,
              });

              setIsInputFocused(false);
              onBlur();
            }}
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
}

export { AccessibleTextAreaInput };

export type { AccessibleTextAreaInputAttributes };
