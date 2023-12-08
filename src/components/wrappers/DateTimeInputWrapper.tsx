import { faCheck, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MantineSize, Popover, Stack, TextInput, useMantineTheme } from "@mantine/core";

import { useGlobalState } from "../../hooks";
import { TbCheck } from "react-icons/tb";
import { ReactNode, useState } from "react";
import { returnThemeColors } from "../../utils";
import { COLORS_SWATCHES } from "../../constants/data";

type AccessibleDateTimeInputCreatorInfo = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";
  dateInputWidth?: string | number;
  dateKind?: "date near future" | "date near past" | "full date";
  description: { error: JSX.Element; valid: JSX.Element };
  icon?: ReactNode;
  initialInputValue?: string;
  inputKind: "date" | "time";
  inputText: string;
  isValidInputText: boolean;
  label: string;
  max?: string;
  maxLength?: number;
  min?: string;
  minLength?: number;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  placeholder: string;
  ref?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  semanticName: string;
  size?: MantineSize;
  withAsterisk?: boolean;
};

type DateTimeInputWrapperProps = {
  creatorInfoObject: AccessibleDateTimeInputCreatorInfo;
};

function DateTimeInputWrapper({ creatorInfoObject }: DateTimeInputWrapperProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: { greenColorShade },
  } = returnThemeColors({ colorsSwatches: COLORS_SWATCHES, themeObject });

  const {
    inputKind,
    dateKind = "full date",
    semanticName,
    inputText,
    isValidInputText,
    label,
    ariaAutoComplete = "none",
    description,
    placeholder,
    initialInputValue = "",
    icon = null,
    onChange,
    onFocus,
    onBlur,
    min = new Date().toISOString().split("T")[0], // current date
    max = new Date(2024, 11, 31).toISOString().split("T")[0], // 31.12.2024
    minLength = inputKind === "date" ? 10 : 5,
    maxLength = inputKind === "date" ? 10 : 5,
    required = false,
    withAsterisk = required,
    ref = null,
    size = "sm",
    autoComplete = "off",
    dateInputWidth = 330,
  } = creatorInfoObject;

  const leftIcon = isValidInputText ? (
    icon ? (
      icon
    ) : (
      <TbCheck color={greenColorShade} size={18} />
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
          style={{ width: dateInputWidth }}
        >
          <TextInput
            type={inputKind}
            size={size}
            color="dark"
            label={label}
            placeholder={placeholder}
            aria-autocomplete={ariaAutoComplete}
            autoComplete={autoComplete}
            aria-required={required}
            aria-label={`Please enter ${semanticName} in format "${
              inputKind === "date"
                ? "on Chromium browsers: date-date-month-month-year-year-year-year, or in other browsers year-year-year-year-month-month-date-date"
                : "hour-hour-minute-minute"
            }${
              dateKind === "date near future"
                ? " from today to 2026"
                : dateKind === "date near past"
                ? " from 2020 to today"
                : " from 1900 to 2024"
            }`}
            aria-describedby={
              isValidInputText
                ? `${semanticName.split(" ").join("-")}-input-note-valid`
                : `${semanticName.split(" ").join("-")}-input-note-error`
            }
            aria-invalid={isValidInputText ? false : true}
            value={inputText}
            icon={leftIcon}
            error={!isValidInputText && inputText !== initialInputValue}
            min={
              dateKind === "full date"
                ? new Date(1900, 0, 1).toISOString().split("T")[0]
                : dateKind === "date near past"
                ? new Date(2020, 0, 1).toISOString().split("T")[0]
                : dateKind === "date near future"
                ? new Date().toISOString().split("T")[0]
                : min
            }
            max={
              dateKind === "full date"
                ? new Date(2024, 11, 31).toISOString().split("T")[0]
                : dateKind === "date near past"
                ? new Date().toISOString().split("T")[0]
                : dateKind === "date near future"
                ? new Date(2026, 11, 31).toISOString().split("T")[0]
                : max
            }
            name={semanticName.split(" ").join("-")}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            minLength={inputKind === "date" ? 10 : inputKind === "time" ? 5 : minLength}
            maxLength={inputKind === "date" ? 10 : inputKind === "time" ? 5 : maxLength}
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

export { DateTimeInputWrapper };

export type { AccessibleDateTimeInputCreatorInfo };

/**
 * <TextInput
      type={inputKind}
      size={size}
      w="100%"
      color="dark"
      label={label}
      placeholder={placeholder}
      aria-autocomplete={ariaAutoComplete}
      autoComplete={autoComplete}
      aria-required={required}
      aria-label={`Please enter ${semanticName} in format "${
        inputKind === 'date'
          ? 'on Chromium browsers: date-date-month-month-year-year-year-year, or in other browsers year-year-year-year-month-month-date-date'
          : 'hour-hour-minute-minute'
      }${
        dateKind === 'date near future'
          ? ' from today to 2026'
          : dateKind === 'date near past'
          ? ' from 2020 to today'
          : ' from 1900 to 2024'
      }`}
      aria-describedby={
        isValidInputText
          ? `${semanticName.split(' ').join('-')}-input-note-valid`
          : `${semanticName.split(' ').join('-')}-input-note-error`
      }
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
      min={
        dateKind === 'full date'
          ? new Date(1900, 0, 1).toISOString().split('T')[0]
          : dateKind === 'date near past'
          ? new Date(2020, 0, 1).toISOString().split('T')[0]
          : dateKind === 'date near future'
          ? new Date().toISOString().split('T')[0]
          : min
      }
      max={
        dateKind === 'full date'
          ? new Date(2024, 11, 31).toISOString().split('T')[0]
          : dateKind === 'date near past'
          ? new Date().toISOString().split('T')[0]
          : dateKind === 'date near future'
          ? new Date(2026, 11, 31).toISOString().split('T')[0]
          : max
      }
      name={semanticName.split(' ').join('-')}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      minLength={
        inputKind === 'date' ? 10 : inputKind === 'time' ? 5 : minLength
      }
      maxLength={
        inputKind === 'date' ? 10 : inputKind === 'time' ? 5 : maxLength
      }
      ref={ref}
      withAsterisk={withAsterisk}
      required={required}
    />
 */
