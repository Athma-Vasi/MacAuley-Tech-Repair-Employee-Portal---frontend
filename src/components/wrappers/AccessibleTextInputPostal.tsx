import { Group, MantineSize, Popover, Stack, TextInput, Tooltip } from "@mantine/core";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { Country } from "../../types";
import { returnThemeColors, splitCamelCase } from "../../utils";
import { AccessibleErrorValidTextElements } from "./utils";

type AccessibleTextInputPostalAttributes<
  ParentAction extends string = string,
  ParentDispatch extends { type: ParentAction; payload: unknown } = {
    type: ParentAction;
    payload: unknown;
  }
> = {
  ariaRequired?: boolean;
  autoComplete?: "on" | "off";
  country: Country;
  icon?: ReactNode;
  initialInputValue?: string;
  inputText: string;
  label: string;
  maxLength?: number;
  minLength?: number;
  name?: string;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  parentAction: ParentAction;
  parentDispatch: React.Dispatch<ParentDispatch>;
  placeholder: string;
  ref?: React.RefObject<HTMLInputElement>;
  regex: RegExp;
  regexValidationText: string;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  semanticName: string;
  size?: MantineSize;
  width?: string | number;
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
    inputText,
    label,
    maxLength = 18,
    minLength = 18,
    semanticName,
    name = splitCamelCase(semanticName),
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    parentAction,
    parentDispatch,
    placeholder,
    ref = null,
    regex,
    regexValidationText,
    required = false,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    size = "sm",
    width = 330,
    withAsterisk = false,
  } = attributes;

  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isInputTextValid, setIsInputTextValid] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const {
    globalState: { themeObject },
  } = useGlobalState();

  useEffect(() => {
    setIsInputTextValid(regex.test(inputText));
  }, [inputText, regex]);

  const {
    generalColors: { greenColorShade, iconGray },
  } = returnThemeColors({ colorsSwatches: COLORS_SWATCHES, themeObject });

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
          onBlurCapture={() => setPopoverOpened(false)}
          onFocusCapture={() => setPopoverOpened(true)}
          style={{ width }}
        >
          <TextInput
            aria-describedby={
              isInputTextValid
                ? // id of inputValidTextElement
                  `${semanticName.split(" ").join("-")}-valid`
                : // id of inputErrorTextElement
                  `${semanticName.split(" ").join("-")}-error`
            }
            aria-invalid={isInputTextValid ? false : true}
            aria-required={ariaRequired}
            autoComplete={autoComplete}
            color="dark"
            error={!isInputTextValid && inputText !== initialInputValue}
            icon={leftIcon}
            label={label}
            maxLength={maxLength}
            minLength={minLength}
            name={name}
            onBlur={() => {
              setIsInputFocused(false);
              onBlur();
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              switch (country) {
                case "Canada": {
                  const inputTextLength = inputText.length;
                  if (inputTextLength === 3) {
                    parentDispatch({
                      type: parentAction,
                      payload: `${inputText} `,
                    });
                  } else if (inputTextLength === 7) {
                    parentDispatch({
                      type: parentAction,
                      payload: inputText.trim(),
                    });
                  }
                  break;
                }
                case "United States": {
                  const inputTextLength = inputText.length;
                  if (inputTextLength === 6) {
                    parentDispatch({
                      type: parentAction,
                      payload: `${inputText.slice(0, 5)}-${inputText.slice(5)}`,
                    });
                  }
                  break;
                }
                default: {
                  parentDispatch({
                    type: parentAction,
                    payload: inputText,
                  });
                  break;
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

export { AccessibleTextInputPostal };

export type { AccessibleTextInputPostalAttributes };
