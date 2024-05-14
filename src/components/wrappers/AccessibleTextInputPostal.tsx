import { Group, MantineSize, Popover, Stack, TextInput, Tooltip } from "@mantine/core";
import { ChangeEvent, Dispatch, ReactNode, useState } from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { Country, SetStepsInErrorPayload } from "../../types";
import { returnThemeColors, splitCamelCase } from "../../utils";
import { createAccessibleValueValidationTextElements } from "./utils";

type AccessibleTextInputPostalAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  ariaRequired?: boolean;
  autoComplete?: "on" | "off";
  country: Country;
  icon?: ReactNode;
  initialInputValue?: string;
  value: string;
  label: string;
  maxLength?: number;
  minLength?: number;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
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
  parentValidValueAction: ValidValueAction;
  parentInvalidValueAction: InvalidValueAction;
  placeholder: string;
  ref?: React.RefObject<HTMLInputElement>;
  regex: RegExp;
  validationText: string;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  name: string;
  size?: MantineSize;
  step: number; // stepper page location of input
  withAsterisk?: boolean;
};

type AccessibleTextInputPostalProps = {
  attributes: AccessibleTextInputPostalAttributes;
};

function AccessibleTextInputPostal({ attributes }: AccessibleTextInputPostalProps) {
  const {
    ariaRequired = false,
    autoComplete = "off",
    country,
    icon = null,
    initialInputValue = "+(1)",
    value,
    label,
    maxLength = 18,
    minLength = 18,
    name,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    parentDispatch,
    parentValidValueAction,
    parentInvalidValueAction,
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
    withAsterisk = false,
  } = attributes;

  const [valueBuffer, setValueBuffer] = useState(value);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: { greenColorShade, iconGray },
  } = returnThemeColors({ colorsSwatches: COLORS_SWATCHES, themeObject });

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
      <Tooltip label={`Reset ${splitCamelCase(name)} to ${initialInputValue}`}>
        <Group style={{ cursor: "pointer" }}>
          <TbRefresh
            aria-label={`Reset ${splitCamelCase(name)} value to ${initialInputValue}`}
            color={iconGray}
            size={18}
            onClick={rightSectionOnClick}
          />
        </Group>
      </Tooltip>
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
            aria-describedby={
              isValueBufferValid
                ? // id of valueValidTextElement
                  `${name}-valid`
                : // id of valueInvalidTextElement
                  `${name}-invalid`
            }
            aria-invalid={isValueBufferValid ? false : true}
            aria-label={name}
            aria-required={ariaRequired}
            autoComplete={autoComplete}
            error={!isValueBufferValid && value !== initialInputValue}
            icon={leftIcon}
            label={label}
            maxLength={maxLength}
            minLength={minLength}
            name={name}
            onBlur={() => {
              parentDispatch({
                type: parentInvalidValueAction,
                payload: {
                  kind: isValueBufferValid ? "delete" : "add",
                  step,
                },
              });

              parentDispatch({
                type: parentValidValueAction,
                payload: valueBuffer,
              });

              setIsInputFocused(false);
              onBlur();
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const length = value.length;

              if (country === "Canada") {
                if (length === 3) {
                  setValueBuffer(`${value} `);
                }

                if (length === 7) {
                  setValueBuffer(value.trim());
                }
              }

              if (country === "United States") {
                if (length === 6) {
                  setValueBuffer(`${value.slice(0, 5)}-${value.slice(5)}`);
                }
              }

              onChange(event);
            }}
            onFocus={() => {
              setIsInputFocused(true);
              onFocus();
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

export { AccessibleTextInputPostal };

export type { AccessibleTextInputPostalAttributes };
