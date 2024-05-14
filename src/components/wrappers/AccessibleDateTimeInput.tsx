import { MantineSize, Popover, Stack, TextInput } from "@mantine/core";
import { ChangeEvent, Dispatch, ReactNode, RefObject, useState } from "react";
import { TbCheck } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { SetStepsInErrorPayload } from "../../types";
import { returnThemeColors } from "../../utils";
import { createAccessibleValueValidationTextElements } from "./utils";

type AccessibleDateTimeInputAttributes<
  ValueValidAction extends string = string,
  ValueInvalidAction extends string = string
> = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";
  dateKind?: "date near future" | "date near past" | "full date";
  icon?: ReactNode;
  initialInputValue?: string;
  inputKind: "date" | "time";
  value: string;
  label: ReactNode;
  max?: string;
  maxLength?: number;
  min?: string;
  minLength?: number;
  name: string;
  onBlur?: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
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
  ref?: RefObject<HTMLInputElement>;
  regex: RegExp;
  validationText: string;
  required?: boolean;
  size?: MantineSize;
  step: number; // stepper page location of input
  withAsterisk?: boolean;
};

type AccessibleDateTimeInputProps = {
  attributes: AccessibleDateTimeInputAttributes;
};

function AccessibleDateTimeInput({ attributes }: AccessibleDateTimeInputProps) {
  const {
    ariaAutoComplete = "none",
    autoComplete = "off",
    dateKind = "full date",
    icon = null,
    initialInputValue = "",
    inputKind,
    value,
    label,
    max = new Date(2024, 11, 31).toISOString().split("T")[0], // 31.12.2024
    maxLength = inputKind === "date" ? 10 : 5,
    min = new Date().toISOString().split("T")[0], // current date
    minLength = inputKind === "date" ? 10 : 5,
    name,
    onBlur = () => {},
    onChange,
    onFocus = () => {},
    parentDispatch,
    parentValueValidAction,
    parentValueInvalidAction,
    placeholder,
    ref = null,
    regex,
    validationText,
    required = false,
    size = "sm",
    step,
    withAsterisk = required,
  } = attributes;

  const [valueBuffer, setValueBuffer] = useState(value);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: { greenColorShade },
  } = returnThemeColors({ colorsSwatches: COLORS_SWATCHES, themeObject });

  const isValueBufferValid = regex.test(valueBuffer);

  const leftIcon = isValueBufferValid ? (
    icon ? (
      icon
    ) : (
      <TbCheck color={greenColorShade} size={18} />
    )
  ) : null;

  const [valueValidTextElement, valueInvalidTextElement] =
    createAccessibleValueValidationTextElements({
      isInputFocused,
      isValueBufferValid,
      name,
      themeObject,
      valueBuffer,
      validationText,
    });

  const ariaLabel = `Please enter ${name} in format "${
    inputKind === "date"
      ? "on Chromium browsers: date-date-month-month-year-year-year-year, or in other browsers year-year-year-year-month-month-date-date"
      : "hour-hour-minute-minute"
  } ${
    dateKind === "date near future"
      ? " from today to 2026"
      : dateKind === "date near past"
      ? " from 2020 to today"
      : " from 1900 to 2024"
  }`;

  const min_ =
    dateKind === "full date"
      ? new Date(1900, 0, 1).toISOString().split("T")[0]
      : dateKind === "date near past"
      ? new Date(2020, 0, 1).toISOString().split("T")[0]
      : dateKind === "date near future"
      ? new Date().toISOString().split("T")[0]
      : min;

  const max_ =
    dateKind === "full date"
      ? new Date(2024, 11, 31).toISOString().split("T")[0]
      : dateKind === "date near past"
      ? new Date().toISOString().split("T")[0]
      : dateKind === "date near future"
      ? new Date(2026, 11, 31).toISOString().split("T")[0]
      : max;

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
          <TextInput
            aria-autocomplete={ariaAutoComplete}
            aria-describedby={
              isValueBufferValid
                ? // id of valueValidTextElement
                  `${name}-valid`
                : // id of valueInvalidTextElement
                  `${name}-invalid`
            }
            aria-invalid={isValueBufferValid ? false : true}
            aria-label={ariaLabel}
            aria-required={required}
            autoComplete={autoComplete}
            color="dark"
            error={!isValueBufferValid && value !== initialInputValue}
            icon={leftIcon}
            label={label}
            max={max_}
            maxLength={inputKind === "date" ? 10 : inputKind === "time" ? 5 : maxLength}
            min={min_}
            minLength={inputKind === "date" ? 10 : inputKind === "time" ? 5 : minLength}
            name={name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
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
            placeholder={placeholder}
            ref={ref}
            required={required}
            size={size}
            type={inputKind}
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

export { AccessibleDateTimeInput };

export type { AccessibleDateTimeInputAttributes };
