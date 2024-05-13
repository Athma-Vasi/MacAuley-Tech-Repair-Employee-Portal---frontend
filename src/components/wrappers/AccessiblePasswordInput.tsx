import { MantineSize, PasswordInput, Popover, Stack } from "@mantine/core";
import { ChangeEvent, ReactNode, RefObject, useEffect, useState } from "react";
import { TbCheck } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnThemeColors, splitCamelCase } from "../../utils";
import { AccessibleErrorValidTextElements } from "./utils";

type AccessiblePasswordInputCreatorInfo = {
  ariaRequired?: boolean;
  ariaLabel?: string;
  icon?: ReactNode;
  initialInputValue?: string;
  inputText: string;
  isValidInputText: boolean;
  label: string;
  maxLength?: number;
  minLength?: number;
  onBlurCallbacks?: Array<() => void>;
  onChangeCallbacks: Array<(event: ChangeEvent<HTMLInputElement>) => void>;
  onFocusCallbacks?: Array<() => void>;
  placeholder: string;
  ref?: RefObject<HTMLInputElement>;
  regex: RegExp;
  regexValidationText: string;
  required?: boolean;
  semanticName: string;
  size?: MantineSize;
  withAsterisk?: boolean;
};

type PasswordInputWrapperProps = {
  creatorInfoObject: AccessiblePasswordInputCreatorInfo;
};

function PasswordInputWrapper({ creatorInfoObject }: PasswordInputWrapperProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isInputTextValid, setIsInputTextValid] = useState(false);
  const [isInputTextFocused, setIsInputTextFocused] = useState(false);

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
    onBlurCallbacks = [],
    onChangeCallbacks,
    onFocusCallbacks = [],
    placeholder,
    ref = null,
    regex,
    regexValidationText,
    required = false,
    size = "sm",
    withAsterisk = false,
  } = creatorInfoObject;

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
      isInputTextFocused,
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
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChangeCallbacks.length &&
                onChangeCallbacks.forEach((callback) => callback(event));
            }}
            onFocus={() => {
              setIsInputTextFocused(true);
              onFocusCallbacks.length &&
                onFocusCallbacks.forEach((callback) => callback());
            }}
            onBlur={() => {
              setIsInputTextFocused(false);
              onBlurCallbacks.length && onBlurCallbacks.forEach((callback) => callback());
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

export { PasswordInputWrapper };

export type { AccessiblePasswordInputCreatorInfo };
