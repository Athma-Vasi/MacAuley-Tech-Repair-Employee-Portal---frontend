import { MantineSize, Popover, Stack, TextInput } from "@mantine/core";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { TbCheck } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnThemeColors, splitCamelCase } from "../../utils";
import { AccessibleErrorValidTextElements } from "./utils";

type AccessibleDateTimeInputAttributes = {
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
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  placeholder: string;
  ref?: React.RefObject<HTMLInputElement>;
  regex: RegExp;
  regexValidationText: string;
  required?: boolean;
  semanticName: string;
  size?: MantineSize;
  withAsterisk?: boolean;
};

type AccessibleDateTimeInputProps = {
  attributes: AccessibleDateTimeInputAttributes;
};

function AccessibleDateTimeInput({ attributes }: AccessibleDateTimeInputProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isInputTextValid, setIsInputTextValid] = useState(false);
  const [isInputTextFocused, setIsInputTextFocused] = useState(false);

  const {
    globalState: { themeObject },
  } = useGlobalState();

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
    placeholder,
    ref = null,
    regex,
    regexValidationText,
    required = false,
    semanticName,
    size = "sm",
    withAsterisk = required,
  } = attributes;

  useEffect(() => {
    setIsInputTextValid(regex.test(inputText));
  }, [inputText, regex]);

  const {
    generalColors: { greenColorShade },
  } = returnThemeColors({ colorsSwatches: COLORS_SWATCHES, themeObject });

  const leftIcon = isInputTextValid ? (
    icon ? (
      icon
    ) : (
      <TbCheck color={greenColorShade} size={18} />
    )
  ) : null;

  const [errorTextElement, validTextElement] = AccessibleErrorValidTextElements({
    inputText,
    isInputTextFocused,
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
            onBlur={() => {
              setIsInputTextFocused(false);
              onBlur();
            }}
            onChange={onChange}
            onFocus={() => {
              setIsInputTextFocused(true);
              onFocus();
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

  return inputWithPopover;
}

export { AccessibleDateTimeInput };

export type { AccessibleDateTimeInputAttributes };
