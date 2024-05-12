import {
  Group,
  MantineNumberSize,
  MantineSize,
  Popover,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { ReactNode, useState } from "react";
import { TbCheck } from "react-icons/tb";

import { useGlobalState } from "../../hooks";

type AccessibleTextAreaInputCreatorInfo = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  ariaRequired?: boolean;
  autoComplete?: "on" | "off";
  autosize?: boolean;
  description: { error: JSX.Element; valid: JSX.Element };
  dropdownWidth?: MantineNumberSize;
  dynamicInputs?: ReactNode[]; // inputs created by the user (ex: buttons in the survey builder)
  icon?: ReactNode;
  initialInputValue?: string;
  inputText: string;
  isValidInputText: boolean;
  label?: string;
  maxLength?: number;
  maxRows?: number;
  minLength?: number;
  minRows?: number;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  placeholder: string;
  ref?: React.RefObject<HTMLTextAreaElement> | null;
  required?: boolean;
  semanticName: string;
  size?: MantineSize;
  textAreaWidth?: number | string;
  withAsterisk?: boolean;
};

type TextAreaInputWrapperProps = {
  creatorInfoObject: AccessibleTextAreaInputCreatorInfo;
};

function TextAreaInputWrapper({ creatorInfoObject }: TextAreaInputWrapperProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const { colors } = useMantineTheme();
  const {
    globalState: {
      themeObject: { colorScheme, primaryShade },
      padding,
    },
  } = useGlobalState();

  const {
    ariaAutoComplete = "none",
    autoComplete = "off",
    autosize = true,
    description,
    dropdownWidth,
    dynamicInputs = null,
    icon = null,
    initialInputValue = "",
    inputText,
    isValidInputText,
    maxLength = 2000,
    maxRows = 7,
    minLength = 2,
    minRows = 3,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    ref = null,
    required = false,
    ariaRequired = required,
    withAsterisk = required,
    semanticName,
    label = semanticName,
    size = "sm",
    textAreaWidth = 330,
  } = creatorInfoObject;

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

  const colorShade = colorScheme === "light" ? primaryShade.light : primaryShade.dark;

  const leftIcon = isValidInputText ? (
    icon ? (
      icon
    ) : (
      <TbCheck color={colors.green[colorShade]} size={18} />
    )
  ) : null;

  const inputWithPopover = (
    <Popover
      opened={inputText ? popoverOpened : false}
      position="bottom"
      shadow="md"
      transitionProps={{ transition: "pop" }}
      width={dropdownWidth ? dropdownWidth : "target"}
      withArrow
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
          style={{ width: textAreaWidth }}
        >
          <Textarea
            aria-autocomplete={ariaAutoComplete}
            aria-describedby={
              isValidInputText
                ? `${semanticName.split(" ").join("-")}-input-note-valid`
                : `${semanticName.split(" ").join("-")}-input-note-error`
            }
            aria-invalid={isValidInputText ? false : true}
            aria-required={ariaRequired}
            autoComplete={autoComplete}
            autosize={autosize}
            color="dark"
            error={!isValidInputText && inputText !== initialInputValue}
            icon={leftIcon}
            label={dynamicInputLabel}
            maxLength={maxLength}
            maxRows={maxRows}
            minLength={minLength}
            minRows={minRows}
            name={semanticName.split(" ").join("-")}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            ref={ref}
            required={required}
            size={size}
            value={inputText}
            // w={textAreaWidth}
            withAsterisk={withAsterisk}
          />
        </div>
      </Popover.Target>

      <Popover.Dropdown>
        <Stack>{isValidInputText ? description.valid : description.error}</Stack>
      </Popover.Dropdown>
    </Popover>
  );

  return inputWithPopover;
}

export { TextAreaInputWrapper };

export type { AccessibleTextAreaInputCreatorInfo };
