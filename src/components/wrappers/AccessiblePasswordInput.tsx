import { MantineSize, PasswordInput, Popover, Stack } from "@mantine/core";
import { ChangeEvent, Dispatch, ReactNode, RefObject, useState } from "react";
import { TbCheck } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { SetStepsInErrorPayload } from "../../types";
import { returnThemeColors } from "../../utils";
import { createAccessibleValueValidationTextElements } from "./utils";

type AccessiblePasswordInputAttributes<
  ValueValidAction extends string = string,
  ValueInvalidAction extends string = string
> = {
  icon?: ReactNode;
  initialInputValue?: string;
  value: string;
  label: ReactNode;
  maxLength?: number;
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

type AccessiblePasswordInputProps = {
  attributes: AccessiblePasswordInputAttributes;
};

function AccessiblePasswordInput({ attributes }: AccessiblePasswordInputProps) {
  const {
    name,
    icon = null,
    initialInputValue = "",
    value,
    label,
    maxLength = 32,
    minLength = 8,
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
    withAsterisk = false,
  } = attributes;

  const [valueBuffer, setValueBuffer] = useState(value);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: { greenColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

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

  const inputWidth = 330;

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
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
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
            error={!isValueBufferValid && value !== initialInputValue}
            icon={leftIcon}
            label={label}
            maxLength={maxLength}
            minLength={minLength}
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
            value={valueBuffer}
            w={inputWidth}
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

export { AccessiblePasswordInput };

export type { AccessiblePasswordInputAttributes };
