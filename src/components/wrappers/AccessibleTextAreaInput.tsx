import { Group, MantineSize, Popover, Stack, Text, Textarea } from "@mantine/core";
import { ChangeEvent, Dispatch, KeyboardEvent, ReactNode, useState } from "react";
import React from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { SetStepsInErrorPayload } from "../../types";
import { returnThemeColors } from "../../utils";
import { createAccessibleValueValidationTextElements } from "./utils";

type AccessibleTextAreaInputAttributes<
  ValueValidAction extends string = string,
  ValueInvalidAction extends string = string
> = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";
  disabled?: boolean;
  dynamicInputs?: ReactNode[]; // inputs created by the user (ex: buttons in the survey builder)
  icon?: ReactNode;
  initialInputValue?: string;
  value: string;
  label: ReactNode;
  maxLength?: number;
  maxRows?: number;
  minLength?: number;
  minRows?: number;
  name: string;
  onBlur?: () => void;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  parentDispatch: Dispatch<
    | {
        type: ValueValidAction;
        payload: string;
      }
    | {
        type: ValueInvalidAction;
        payload: SetStepsInErrorPayload;
      }
  >;
  parentValueValidAction: ValueValidAction;
  parentValueInvalidAction: ValueInvalidAction;
  placeholder: string;
  ref?: React.RefObject<HTMLTextAreaElement> | null;
  regex: RegExp;
  validationText: string;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  size?: MantineSize;
  step: number; // stepper page location of input
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
    value,
    label,
    maxLength = 2000,
    maxRows = 7,
    minLength = 2,
    minRows = 3,
    name,
    onBlur = () => {},
    onChange,
    onFocus = () => {},
    onKeyDown = () => {},
    parentDispatch,
    parentValueValidAction,
    parentValueInvalidAction,
    placeholder,
    ref = null,
    regex,
    validationText,
    required = false,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    size = "sm",
    step,
    withAsterisk = required,
  } = attributes;

  const [valueBuffer, setValueBuffer] = useState(value);
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

  const isValueBufferValid = regex.test(value);

  const leftIcon = isValueBufferValid ? (
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
        aria-label={`Reset ${name} value to ${initialInputValue}`}
        color={grayColorShade}
        size={18}
        onClick={rightSectionOnClick}
      />
    )
  ) : null;

  const [valueValidTextElement, valueInvalidTextElement] =
    createAccessibleValueValidationTextElements({
      name,
      isInputFocused,
      isValueBufferValid,
      themeObject,
      valueBuffer,
      validationText,
    });

  return (
    <Popover
      opened={valueBuffer ? popoverOpened : false}
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
        >
          <Textarea
            aria-autocomplete={ariaAutoComplete}
            aria-describedby={
              isValueBufferValid
                ? // id of valueValidTextElement
                  `${name}-valid`
                : // id of valueInvalidTextElement
                  `${name}-invalid`
            }
            aria-invalid={isValueBufferValid ? false : true}
            aria-label={name}
            aria-required={required}
            autoComplete={autoComplete}
            color={grayColorShade}
            disabled={disabled}
            error={!isValueBufferValid && value !== initialInputValue}
            icon={leftIcon}
            label={dynamicInputLabel}
            maxLength={maxLength}
            maxRows={maxRows}
            minLength={minLength}
            minRows={minRows}
            name={name}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setValueBuffer(event.currentTarget.value);
              onChange(event);
            }}
            onFocus={() => {
              setIsInputFocused(true);
              onFocus();
            }}
            onBlur={() => {
              parentDispatch({
                type: parentValueInvalidAction,
                payload: {
                  kind: isValueBufferValid ? "delete" : "add",
                  step,
                },
              });

              parentDispatch({
                type: parentValueValidAction,
                payload: valueBuffer,
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
            value={valueBuffer}
            withAsterisk={withAsterisk}
          />
        </div>
      </Popover.Target>

      <Popover.Dropdown>
        <Stack>
          {isValueBufferValid ? valueValidTextElement : valueInvalidTextElement}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

export { AccessibleTextAreaInput };

export type { AccessibleTextAreaInputAttributes };
