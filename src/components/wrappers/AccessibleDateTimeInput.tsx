import { Container, MantineSize, Popover, Stack, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, Dispatch, ReactNode, RefObject, useState } from "react";
import { TbCheck } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { SetStepsInErrorPayload } from "../../types";
import { capitalizeAll, returnThemeColors } from "../../utils";
import { ValidationTexts } from "../../utils/validations";
import { createAccessibleValueValidationTextElements } from "./utils";

type AccessibleDateTimeInputAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";
  dateKind?: "date near future" | "date near past" | "full date";
  icon?: ReactNode;
  initialInputValue?: string;
  inputKind: "date" | "time";
  value: string;
  label?: ReactNode;
  max?: string;
  maxLength?: number;
  min?: string;
  minLength?: number;
  name: string;
  onBlur?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  parentDispatch: Dispatch<
    | {
        type: ValidValueAction;
        payload: string;
      }
    | {
        type: InvalidValueAction;
        payload: SetStepsInErrorPayload;
      }
  >;
  validValueAction: ValidValueAction;
  invalidValueAction: InvalidValueAction;
  placeholder: string;
  ref?: RefObject<HTMLInputElement>;
  regex: RegExp;
  validationTexts: ValidationTexts;
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
    label = capitalizeAll(attributes.name),
    max = new Date(2024, 11, 31).toISOString().split("T")[0], // 31.12.2024
    maxLength = inputKind === "date" ? 10 : 5,
    min = new Date().toISOString().split("T")[0], // current date
    minLength = inputKind === "date" ? 10 : 5,
    name,
    onBlur,
    onChange,
    onFocus,
    parentDispatch,
    validValueAction,
    invalidValueAction,
    placeholder,
    ref = null,
    regex,
    validationTexts,
    required = false,
    size = "sm",
    step,
    withAsterisk = required,
  } = attributes;

  const [valueBuffer, setValueBuffer] = useState(value);
  const [isPopoverOpened, { open: openPopover, close: closePopover }] =
    useDisclosure(false);
  // const [isInputFocused, setIsInputFocused] = useState(false);

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

  const { validValueTextElement, invalidValueTextElement } =
    createAccessibleValueValidationTextElements({
      isPopoverOpened,
      isValueBufferValid,
      name,
      themeObject,
      value,
      validationTexts,
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
    <Container w={350}>
      <Popover
        opened={isPopoverOpened}
        position="bottom"
        shadow="md"
        transitionProps={{ transition: "pop" }}
        width="target"
        withArrow
      >
        <Popover.Target>
          <TextInput
            aria-autocomplete={ariaAutoComplete}
            aria-describedby={
              isValueBufferValid
                ? // id of validValueTextElement
                  `${name}-valid`
                : // id of invalidValueTextElement
                  `${name}-invalid`
            }
            aria-invalid={isValueBufferValid ? false : true}
            aria-label={ariaLabel}
            aria-required={required}
            autoComplete={autoComplete}
            color="dark"
            error={!isValueBufferValid && valueBuffer !== initialInputValue}
            icon={leftIcon}
            label={label}
            max={max_}
            maxLength={inputKind === "date" ? 10 : inputKind === "time" ? 5 : maxLength}
            min={min_}
            minLength={inputKind === "date" ? 10 : inputKind === "time" ? 5 : minLength}
            name={name}
            onBlur={() => {
              parentDispatch({
                type: invalidValueAction,
                payload: {
                  kind: isValueBufferValid ? "delete" : "add",
                  step,
                },
              });

              parentDispatch({
                type: validValueAction,
                payload: valueBuffer,
              });

              onBlur?.();
              closePopover();
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setValueBuffer(event.currentTarget.value);
              onChange?.(event);
            }}
            onFocus={() => {
              openPopover();
              onFocus?.();
            }}
            placeholder={placeholder}
            ref={ref}
            required={required}
            size={size}
            type={inputKind}
            value={valueBuffer}
            withAsterisk={withAsterisk}
          />
        </Popover.Target>

        {isPopoverOpened && valueBuffer.length ? (
          <Popover.Dropdown>
            <Stack>
              {isValueBufferValid ? validValueTextElement : invalidValueTextElement}
            </Stack>
          </Popover.Dropdown>
        ) : null}
      </Popover>
    </Container>
  );
}

export { AccessibleDateTimeInput };

export type { AccessibleDateTimeInputAttributes };
