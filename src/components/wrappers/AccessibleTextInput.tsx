import { Group, MantineSize, Popover, Stack, Text, TextInput } from "@mantine/core";
import {
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { AccessibleErrorValidTextElements } from "../../jsxCreators";
import { returnThemeColors, splitCamelCase } from "../../utils";

type AccessibleTextInputAttributes = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";

  /**
   * This is for dynamic inputs, such as the ones in the survey builder. Typically a delete button, though it can be anything.
   */
  disabled?: boolean;
  dynamicInputs?: ReactNode[];
  icon?: ReactNode;
  initialInputValue?: string;
  inputText: string;
  label?: ReactNode | string;
  maxLength?: number;
  minLength?: number;
  name?: string;
  onBlurCallbacks?: Array<() => void>;
  onChangeCallbacks: Array<(event: ChangeEvent<HTMLInputElement>) => void>;
  onFocusCallbacks?: Array<() => void>;
  onKeyDownCallbacks?: Array<(event: KeyboardEvent<HTMLInputElement>) => void>;
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
  textInputWidth?: string | number;
  withAsterisk?: boolean;
};

type AccessibleTextInputsProps = {
  attributes: AccessibleTextInputAttributes;
};

function AccessibleTextInput({ attributes }: AccessibleTextInputsProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isInputTextValid, setIsInputTextValid] = useState(false);
  const [isInputTextFocused, setIsInputTextFocused] = useState(false);

  const {
    globalState: { themeObject, padding },
  } = useGlobalState();

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
    onChangeCallbacks,
    onBlurCallbacks = [],
    onFocusCallbacks = [],
    onKeyDownCallbacks = [],
    placeholder,
    ref = null,
    regex,
    regexValidationText,
    required = false,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    size = "sm",
    textInputWidth = 330,
    withAsterisk = required,
  } = attributes;

  useEffect(() => {
    setIsInputTextValid(regex.test(inputText));
  }, [inputText, regex]);

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
      inputElementKind: semanticName,
      inputText,
      isValidInputText: isInputTextValid,
      isInputTextFocused,
      regexValidationText,
    }
  );

  const accessibleTextInput = (
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
                  `${semanticName.split(" ").join("-")}-input-note-valid`
                : // id of inputErrorTextElement
                  `${semanticName.split(" ").join("-")}-input-note-error`
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
            onBlur={() => {
              onBlurCallbacks.length && onBlurCallbacks.forEach((callback) => callback());
              setIsInputTextFocused(false);
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChangeCallbacks.length &&
                onChangeCallbacks.forEach((callback) => callback(event));
            }}
            onFocus={() => {
              onFocusCallbacks.length &&
                onFocusCallbacks.forEach((callback) => callback());
              setIsInputTextFocused(true);
            }}
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
              onKeyDownCallbacks.length &&
                onKeyDownCallbacks.forEach((callback) => callback(event));
            }}
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

  return accessibleTextInput;
}

export { AccessibleTextInput };

export type { AccessibleTextInputAttributes };
