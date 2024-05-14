import { Group, MantineSize, Popover, Stack, TextInput, Tooltip } from "@mantine/core";
import { ChangeEvent, Dispatch, ReactNode, useEffect, useState } from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { Country, SetStepsInErrorPayload } from "../../types";
import { returnThemeColors, splitCamelCase } from "../../utils";
import { AccessibleErrorValidTextElements } from "./utils";

type AccessibleTextInputPostalAttributes<
  OnChangeAction extends string = string,
  OnErrorAction extends string = string
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
  ref?: React.RefObject<HTMLInputElement>;
  regex: RegExp;
  regexValidationText: string;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  semanticName: string;
  size?: MantineSize;
  step: number; // stepper page location of input
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
    parentDispatch,
    parentOnChangeAction,
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
    width = 330,
    withAsterisk = false,
  } = attributes;

  const [inputTextBuffer, setInputTextBuffer] = useState(inputText);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: { greenColorShade, iconGray },
  } = returnThemeColors({ colorsSwatches: COLORS_SWATCHES, themeObject });

  const isInputTextBufferValid = regex.test(inputText);

  const leftIcon = isInputTextBufferValid ? (
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
      inputTextBuffer,
      isInputTextBufferValid,
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
              isInputTextBufferValid
                ? // id of inputValidTextElement
                  `${semanticName.split(" ").join("-")}-valid`
                : // id of inputErrorTextElement
                  `${semanticName.split(" ").join("-")}-error`
            }
            aria-invalid={isInputTextBufferValid ? false : true}
            aria-required={ariaRequired}
            autoComplete={autoComplete}
            color="dark"
            error={!isInputTextBufferValid && inputText !== initialInputValue}
            icon={leftIcon}
            label={label}
            maxLength={maxLength}
            minLength={minLength}
            name={name}
            onBlur={() => {
              parentDispatch({
                type: parentOnErrorAction,
                payload: {
                  kind: isInputTextBufferValid ? "delete" : "add",
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
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const len = inputText.length;

              if (country === "Canada") {
                if (len === 3) {
                  setInputTextBuffer(`${inputText} `);
                }

                if (len === 7) {
                  setInputTextBuffer(inputText.trim());
                }
              }

              if (country === "United States") {
                if (len === 6) {
                  setInputTextBuffer(`${inputText.slice(0, 5)}-${inputText.slice(5)}`);
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
        <Stack>
          {isInputTextBufferValid ? inputValidTextElement : inputErrorTextElement}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

export { AccessibleTextInputPostal };

export type { AccessibleTextInputPostalAttributes };
