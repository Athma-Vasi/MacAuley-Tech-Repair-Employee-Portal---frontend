import { MantineSize, Popover, Stack, TextInput } from "@mantine/core";
import { ChangeEvent, Dispatch, ReactNode, RefObject, useState } from "react";
import { TbCheck } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { SetStepsInErrorPayload } from "../../types";
import { returnThemeColors, splitCamelCase } from "../../utils";
import { AccessibleErrorValidTextElements } from "./utils";

type AccessibleDateTimeInputAttributes<
  OnChangeAction extends string = string,
  OnErrorAction extends string = string
> = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";
  dateKind?: "date near future" | "date near past" | "full date";
  icon?: ReactNode;
  initialInputValue?: string;
  inputKind: "date" | "time";
  inputText: string;
  inputWidth?: string | number;
  label: string;
  max?: string;
  maxLength?: number;
  min?: string;
  minLength?: number;
  onBlur?: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
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
  ref?: RefObject<HTMLInputElement>;
  regex: RegExp;
  regexValidationText: string;
  required?: boolean;
  semanticName: string;
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
    inputText,
    inputWidth = 330,
    label,
    max = new Date(2024, 11, 31).toISOString().split("T")[0], // 31.12.2024
    maxLength = inputKind === "date" ? 10 : 5,
    min = new Date().toISOString().split("T")[0], // current date
    minLength = inputKind === "date" ? 10 : 5,
    onBlur = () => {},
    onChange,
    onFocus = () => {},
    parentDispatch,
    parentOnChangeAction,
    parentOnErrorAction,
    placeholder,
    ref = null,
    regex,
    regexValidationText,
    required = false,
    semanticName,
    size = "sm",
    step,
    withAsterisk = required,
  } = attributes;

  const [inputTextBuffer, setInputTextBuffer] = useState(inputText);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: { greenColorShade },
  } = returnThemeColors({ colorsSwatches: COLORS_SWATCHES, themeObject });

  const isInputTextValid = regex.test(inputText);

  const leftIcon = isInputTextValid ? (
    icon ? (
      icon
    ) : (
      <TbCheck color={greenColorShade} size={18} />
    )
  ) : null;

  const [errorTextElement, validTextElement] = AccessibleErrorValidTextElements({
    inputText,
    isInputFocused,
    isInputTextValid,
    semanticName,
    regexValidationText,
  });

  const ariaLabel = `Please enter ${splitCamelCase(semanticName)} in format "${
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
          style={{ width: inputWidth }}
        >
          <TextInput
            aria-autocomplete={ariaAutoComplete}
            aria-describedby={
              isInputTextValid
                ? // id of validTextElement
                  `${semanticName.split(" ").join("-")}-valid`
                : // id of errorTextElement
                  `${semanticName.split(" ").join("-")}-error`
            }
            aria-label={ariaLabel}
            aria-invalid={isInputTextValid ? false : true}
            aria-required={required}
            autoComplete={autoComplete}
            color="dark"
            error={!isInputTextValid && inputText !== initialInputValue}
            icon={leftIcon}
            label={label}
            max={max_}
            maxLength={inputKind === "date" ? 10 : inputKind === "time" ? 5 : maxLength}
            min={min_}
            minLength={inputKind === "date" ? 10 : inputKind === "time" ? 5 : minLength}
            name={semanticName.split(" ").join("-")}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
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
            placeholder={placeholder}
            ref={ref}
            required={required}
            size={size}
            type={inputKind}
            value={inputText}
            withAsterisk={withAsterisk}
          />
        </div>
      </Popover.Target>

      <Popover.Dropdown>
        <Stack>{isInputTextValid ? validTextElement : errorTextElement}</Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

export { AccessibleDateTimeInput };

export type { AccessibleDateTimeInputAttributes };
