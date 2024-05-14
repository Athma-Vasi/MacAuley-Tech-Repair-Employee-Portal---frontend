import { Group, MantineSize, Popover, Stack, Text, TextInput } from "@mantine/core";
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  ReactNode,
  RefObject,
  useState,
} from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { SetStepsInErrorPayload } from "../../types";
import { returnThemeColors } from "../../utils";
import { createAccessibleValueValidationTextElements } from "./utils";

type AccessibleTextInputAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";
  disabled?: boolean;
  dynamicInputs?: ReactNode[]; // inputs created on demand by user
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
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
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
  ref?: RefObject<HTMLInputElement> | null;
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

type AccessibleTextInputsProps = {
  attributes: AccessibleTextInputAttributes;
};

function AccessibleTextInput({ attributes }: AccessibleTextInputsProps) {
  const {
    ariaAutoComplete = "none",
    autoComplete = "off",
    disabled = false,
    dynamicInputs = null,
    icon = null,
    initialInputValue = "",
    value,
    name,
    label,
    maxLength = 75,
    minLength = 2,
    onChange,
    onBlur = () => {},
    onFocus = () => {},
    onKeyDown = () => {},
    parentValidValueAction,
    parentDispatch,
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
      isInputFocused,
      isValueBufferValid,
      name,
      themeObject,
      validationText,
      valueBuffer,
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
            error={!isValueBufferValid && valueBuffer !== initialInputValue}
            icon={leftIcon}
            label={dynamicInputLabel}
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

export { AccessibleTextInput };

export type { AccessibleTextInputAttributes };
