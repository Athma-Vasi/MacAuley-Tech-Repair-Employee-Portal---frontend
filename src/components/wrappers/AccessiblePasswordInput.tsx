import { MantineSize, PasswordInput, Popover, Stack } from "@mantine/core";
import { ChangeEvent, Dispatch, ReactNode, RefObject, useState } from "react";
import { TbCheck } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { SetStepsInErrorPayload } from "../../types";
import { returnThemeColors, splitCamelCase } from "../../utils";
import { AccessibleErrorValidTextElements } from "./utils";

type AccessiblePasswordInputAttributes<
  OnChangeAction extends string = string,
  OnErrorAction extends string = string
> = {
  ariaRequired?: boolean;
  ariaLabel?: string;
  icon?: ReactNode;
  initialInputValue?: string;
  inputText: string;
  isValidInputText: boolean;
  label: string;
  maxLength?: number;
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

type AccessiblePasswordInputProps = {
  attributes: AccessiblePasswordInputAttributes;
};

function AccessiblePasswordInput({ attributes }: AccessiblePasswordInputProps) {
  const {
    semanticName,
    ariaLabel = splitCamelCase(semanticName),
    ariaRequired = false,
    icon = null,
    initialInputValue = "",
    inputText,
    isValidInputText,
    label,
    maxLength = 32,
    minLength = 8,
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
    size = "sm",
    step,
    withAsterisk = false,
  } = attributes;

  const [inputTextBuffer, setInputTextBuffer] = useState(inputText);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: { greenColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  const isInputTextValid = regex.test(inputText);

  const leftIcon = isValidInputText ? (
    icon ? (
      icon
    ) : (
      <TbCheck color={greenColorShade} size={18} />
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

  const inputWidth = 330;

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
        >
          <PasswordInput
            aria-label={ariaLabel}
            aria-invalid={isValidInputText ? false : true}
            // color="dark"
            aria-required={ariaRequired}
            aria-describedby={
              isValidInputText
                ? // id of validTextElement
                  `${semanticName.split(" ").join("-")}-valid`
                : // id of errorTextElement
                  `${semanticName.split(" ").join("-")}-error`
            }
            error={!isValidInputText && inputText !== initialInputValue}
            icon={leftIcon}
            label={label}
            maxLength={maxLength}
            minLength={minLength}
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
            value={inputText}
            w={inputWidth}
            withAsterisk={withAsterisk}
          />
        </div>
      </Popover.Target>

      <Popover.Dropdown>
        <Stack>{isValidInputText ? inputValidTextElement : inputErrorTextElement}</Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

export { AccessiblePasswordInput };

export type { AccessiblePasswordInputAttributes };
