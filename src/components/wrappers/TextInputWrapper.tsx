import {
  Group,
  MantineNumberSize,
  MantineSize,
  Popover,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { ReactNode, useState } from 'react';
import React from 'react';
import { TbCheck, TbRefresh } from 'react-icons/tb';

import { useGlobalState } from '../../hooks';
import { splitCamelCase } from '../../utils';

type AccessibleTextInputCreatorInfo = {
  ariaAutoComplete?: 'both' | 'list' | 'none' | 'inline';
  autoComplete?: 'on' | 'off';
  description: { error: React.JSX.Element; valid: React.JSX.Element };
  /**
   * This is for dynamic inputs, such as the ones in the survey builder. Typically a delete button, though it can be anything.
   */
  dynamicInputs?: ReactNode[];
  icon?: ReactNode;
  initialInputValue?: string;
  inputText: string;
  isValidInputText: boolean;
  label?: ReactNode | string;
  maxLength?: number;
  minLength?: number;
  name?: string;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  ref?: React.RefObject<HTMLInputElement> | null;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  semanticName: string;
  size?: MantineSize;
  textInputWidth?: string | number;
  withAsterisk?: boolean;
};

type TextInputWrapperProps = {
  creatorInfoObject: AccessibleTextInputCreatorInfo;
};

function TextInputWrapper({ creatorInfoObject }: TextInputWrapperProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const { colors } = useMantineTheme();
  const {
    globalState: {
      themeObject: { colorScheme, primaryShade },
      padding,
    },
  } = useGlobalState();

  const {
    ariaAutoComplete = 'none',
    autoComplete = 'off',
    description,
    dynamicInputs = null,
    icon = null,
    initialInputValue = '',
    inputText,
    isValidInputText,
    semanticName,
    label = semanticName,
    maxLength = 75,
    minLength = 2,
    name = semanticName,
    onBlur,
    onChange,
    onFocus,
    onKeyDown = () => {},
    placeholder,
    ref = null,
    required = false,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    size = 'sm',
    textInputWidth = 330,
    withAsterisk = required,
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

  const colorShade =
    colorScheme === 'light' ? primaryShade.light : primaryShade.dark;

  const leftIcon = isValidInputText ? (
    icon ? (
      icon
    ) : (
      <TbCheck color={colors.green[colorShade]} size={18} />
    )
  ) : null;

  const rightIcon = rightSection ? (
    rightSectionIcon ? (
      rightSectionIcon
    ) : (
      <TbRefresh
        aria-label={`Reset ${splitCamelCase(
          semanticName
        )} value to ${initialInputValue}`}
        color={colors.gray[colorScheme === 'light' ? 5 : 3]}
        size={18}
        onClick={rightSectionOnClick}
      />
    )
  ) : null;

  const inputWithPopover = (
    <Popover
      opened={inputText ? popoverOpened : false}
      position="bottom"
      shadow="md"
      transitionProps={{ transition: 'pop' }}
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
              isValidInputText
                ? `${semanticName.split(' ').join('-')}-input-note-valid`
                : `${semanticName.split(' ').join('-')}-input-note-error`
            }
            aria-invalid={isValidInputText ? false : true}
            aria-required={required}
            autoComplete={autoComplete}
            color="dark"
            error={!isValidInputText && inputText !== initialInputValue}
            icon={leftIcon}
            label={dynamicInputLabel}
            maxLength={maxLength}
            minLength={minLength}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
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
          {isValidInputText ? description.valid : description.error}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );

  return inputWithPopover;
}

export { TextInputWrapper };

export type { AccessibleTextInputCreatorInfo };
