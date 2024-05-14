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
import { returnThemeColors, splitCamelCase } from "../../utils";
import { AccessibleErrorValidTextElements } from "./utils";

type AccessibleTextInputAttributes<
  OnChangeAction extends string = string,
  OnErrorAction extends string = string
> = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";
  disabled?: boolean;
  dynamicInputs?: ReactNode[]; // inputs created on demand by user
  icon?: ReactNode;
  initialInputValue?: string;
  inputText: string;
  label?: ReactNode | string;
  maxLength?: number;
  minLength?: number;
  name?: string;
  onBlur?: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
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
  ref?: RefObject<HTMLInputElement> | null;
  regex: RegExp;
  regexValidationText: string;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  semanticName: string;
  size?: MantineSize;
  step: number; // stepper page location of input
  textInputWidth?: string | number;
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
    inputText,
    semanticName,
    label = semanticName,
    maxLength = 75,
    minLength = 2,
    name = semanticName,
    onChange,
    onBlur = () => {},
    onFocus = () => {},
    onKeyDown = () => {},
    parentOnChangeAction,
    parentDispatch,
    parentOnErrorAction,
    placeholder,
    ref = null,
    regex,
    regexValidationText,
    required = false,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    size = "sm",
    step,
    textInputWidth = 330,
    withAsterisk = required,
  } = attributes;

  const [inputTextBuffer, setInputTextBuffer] = useState(inputText);
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
  const isInputTextValid = regex.test(inputText);

  const leftIcon = isInputTextValid ? (
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
        aria-label={`Reset ${splitCamelCase(semanticName)} value to ${initialInputValue}`}
        color={grayColorShade}
        size={18}
        onClick={rightSectionOnClick}
      />
    )
  ) : null;

  const [inputErrorTextElement, inputValidTextElement] = AccessibleErrorValidTextElements(
    {
      semanticName,
      inputText,
      isInputTextValid,
      isInputFocused,
      regexValidationText,
    }
  );

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
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
          style={{ width: textInputWidth }}
        >
          <TextInput
            aria-autocomplete={ariaAutoComplete}
            aria-describedby={
              isInputTextValid
                ? // id of inputValidTextElement
                  `${semanticName.split(" ").join("-")}-valid`
                : // id of inputErrorTextElement
                  `${semanticName.split(" ").join("-")}-error`
            }
            aria-invalid={isInputTextValid ? false : true}
            aria-required={required}
            autoComplete={autoComplete}
            color={grayColorShade}
            disabled={disabled}
            error={!isInputTextValid && inputText !== initialInputValue}
            icon={leftIcon}
            label={dynamicInputLabel}
            maxLength={maxLength}
            minLength={minLength}
            name={name}
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
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            ref={ref}
            required={required}
            rightSection={rightIcon}
            size={size}
            value={inputText}
            withAsterisk={withAsterisk}
          />
        </div>
      </Popover.Target>

      <Popover.Dropdown>
        <Stack>{isInputTextValid ? inputValidTextElement : inputErrorTextElement}</Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

export { AccessibleTextInput };

export type { AccessibleTextInputAttributes };
