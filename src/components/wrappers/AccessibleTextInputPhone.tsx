import { Group, MantineSize, Popover, Stack, TextInput, Tooltip } from "@mantine/core";
import { ChangeEvent, Dispatch, ReactNode, useState } from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { SetStepsInErrorPayload } from "../../types";
import { capitalizeAll, returnThemeColors, splitCamelCase } from "../../utils";
import { ValidationTexts } from "../../utils/validations";
import { createAccessibleValueValidationTextElements } from "./utils";

type AccessibleTextInputPhoneAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  ariaRequired?: boolean;
  autoComplete?: "on" | "off";
  icon?: ReactNode;
  initialInputValue?: string;
  value: string;
  label?: ReactNode;
  maxLength?: number;
  minLength?: number;
  name: string;
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
  validValueAction: ValidValueAction;
  invalidValueAction: InvalidValueAction;
  placeholder: string;
  ref?: React.RefObject<HTMLInputElement>;
  regex: RegExp;
  validationTexts: ValidationTexts;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  size?: MantineSize;
  step: number; // stepper page location of input
  withAsterisk?: boolean;
};

type AccessibleTextInputPhoneProps = {
  attributes: AccessibleTextInputPhoneAttributes;
};

function AccessibleTextInputPhone({ attributes }: AccessibleTextInputPhoneProps) {
  const {
    ariaRequired = false,
    autoComplete = "off",
    icon = null,
    initialInputValue = "+(1)",
    value,
    label = capitalizeAll(attributes.name),
    maxLength = 18,
    minLength = 18,
    name,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    parentDispatch,
    validValueAction,
    invalidValueAction,
    placeholder,
    ref = null,
    regex,
    validationTexts,
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

  const isValueBufferValid = regex.test(valueBuffer);

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

  const { validValueTextElement, invalidValueTextElement } =
    createAccessibleValueValidationTextElements({
      isInputFocused,
      isValueBufferValid,
      name,
      themeObject,
      valueBuffer,
      validationTexts,
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
                ? // id of validValueTextElement
                  `${name}-valid`
                : // id of invalidValueTextElement
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

              setIsInputFocused(false);
              onBlur();
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const length = valueBuffer.length;

              if (length === 4) {
                setValueBuffer(`${valueBuffer}(`);
              }

              if (length === 8) {
                setValueBuffer(`${valueBuffer}) `);
              }

              if (length === 13) {
                setValueBuffer(`${valueBuffer}-`);
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
          {isValueBufferValid ? validValueTextElement : invalidValueTextElement}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

export { AccessibleTextInputPhone };

export type { AccessibleTextInputPhoneAttributes };
