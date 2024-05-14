import { Group, MantineSize, Popover, Stack, TextInput, Tooltip } from "@mantine/core";
import { ChangeEvent, Dispatch, ReactNode, useState } from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { SetStepsInErrorPayload } from "../../types";
import { returnThemeColors, splitCamelCase } from "../../utils";
import { createAccessibleValueValidationTextElements } from "./utils";

type AccessibleTextInputPhoneAttributes<
  ValueValidAction extends string = string,
  ValueInvalidAction extends string = string
> = {
  ariaRequired?: boolean;
  autoComplete?: "on" | "off";
  icon?: ReactNode;
  initialInputValue?: string;
  value: string;
  label: ReactNode;
  maxLength?: number;
  minLength?: number;
  name: string;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
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
  ref?: React.RefObject<HTMLInputElement>;
  regex: RegExp;
  validationText: string;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  semanticName: string;
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
    label,
    maxLength = 18,
    minLength = 18,
    semanticName,
    name = splitCamelCase(semanticName),
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
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
      <Tooltip label={`Reset ${splitCamelCase(semanticName)} to ${initialInputValue}`}>
        <Group style={{ cursor: "pointer" }}>
          <TbRefresh
            aria-label={`Reset ${splitCamelCase(
              semanticName
            )} value to ${initialInputValue}`}
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
          {isValueBufferValid ? valueValidTextElement : valueInvalidTextElement}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

export { AccessibleTextInputPhone };

export type { AccessibleTextInputPhoneAttributes };
