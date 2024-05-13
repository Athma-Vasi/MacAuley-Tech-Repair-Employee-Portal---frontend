import { MantineSize, PasswordInput, Popover, Stack } from "@mantine/core";
import { ChangeEvent, ReactNode, RefObject, useEffect, useState } from "react";
import { TbCheck } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnThemeColors, splitCamelCase } from "../../utils";
import { AccessibleErrorValidTextElements } from "./utils";

type AccessiblePasswordInputAttributes = {
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
  placeholder: string;
  ref?: RefObject<HTMLInputElement>;
  regex: RegExp;
  regexValidationText: string;
  required?: boolean;
  semanticName: string;
  size?: MantineSize;
  withAsterisk?: boolean;
};

type AccessiblePasswordInputProps = {
  attributes: AccessiblePasswordInputAttributes;
};

function AccessiblePasswordInput({ attributes }: AccessiblePasswordInputProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isInputTextValid, setIsInputTextValid] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const {
    globalState: { themeObject },
  } = useGlobalState();

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
    placeholder,
    ref = null,
    regex,
    regexValidationText,
    required = false,
    size = "sm",
    withAsterisk = false,
  } = attributes;

  useEffect(() => {
    setIsInputTextValid(regex.test(inputText));
  }, [inputText, regex]);

  const {
    generalColors: { greenColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

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
            onBlur={() => {
              setIsInputFocused(false);
              onBlur();
            }}
            onChange={onChange}
            onFocus={() => {
              setIsInputFocused(true);
              onFocus();
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

  return inputWithPopover;
}

export { AccessiblePasswordInput };

export type { AccessiblePasswordInputAttributes };
