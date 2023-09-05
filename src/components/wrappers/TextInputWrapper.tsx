import {
  faCheck,
  faRefresh,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Group,
  Popover,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { ReactNode, useState } from 'react';

import { useGlobalState } from '../../hooks';
import React from 'react';
import { TbCheck, TbRefresh, TbX } from 'react-icons/tb';
import { splitCamelCase } from '../../utils';

type AccessibleTextInputCreatorInfo = {
  semanticName: string;
  inputText: string;
  /**
   * This is for dynamic inputs, such as the ones in the survey builder. Typically a delete button, though it can be anything.
   */
  dynamicInputs?: ReactNode[];
  // dynamicInputProps?: {
  //   semanticAction: string;
  //   dynamicLabel?: string;
  //   dynamicIndex: number;
  //   dynamicIcon?: ReactNode;
  //   buttonDisabled?: boolean;
  //   dynamicInputOnClick: () => void;
  // };
  isValidInputText: boolean;
  label?: ReactNode | string;
  ariaAutoComplete?: 'both' | 'list' | 'none' | 'inline';
  description: {
    error: React.JSX.Element;
    valid: React.JSX.Element;
  };
  name?: string;
  placeholder: string;
  initialInputValue?: string;
  icon?: ReactNode;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;

  minLength?: number;
  maxLength?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  withAsterisk?: boolean;
  ref?: React.RefObject<HTMLInputElement> | null;
  required?: boolean;
  autoComplete?: 'on' | 'off';
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
    },
  } = useGlobalState();

  const {
    semanticName,
    inputText,
    isValidInputText,
    label = semanticName,
    ariaAutoComplete = 'none',
    description,
    dynamicInputs = null,
    placeholder,
    initialInputValue = '',
    icon = null,
    name = semanticName,
    onBlur,
    onChange,
    onFocus,
    onKeyDown = () => {},
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    size = 'sm',
    minLength = 2,
    maxLength = 75,
    withAsterisk = false,
    ref = null,
    required = false,
    autoComplete = 'off',
  } = creatorInfoObject;

  const dynamicInputLabel = dynamicInputs ? (
    <Group w="100%" position="apart">
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
        >
          <TextInput
            w={325}
            color="dark"
            label={dynamicInputLabel}
            aria-required={required}
            aria-describedby={
              isValidInputText
                ? `${semanticName.split(' ').join('-')}-input-note-valid`
                : `${semanticName.split(' ').join('-')}-input-note-error`
            }
            aria-autocomplete={ariaAutoComplete}
            // description={
            //   isValidInputText ? description.valid : description.error
            // }
            placeholder={placeholder}
            name={name}
            aria-invalid={isValidInputText ? false : true}
            value={inputText}
            icon={leftIcon}
            error={!isValidInputText && inputText !== initialInputValue}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            rightSection={rightIcon}
            size={size}
            minLength={minLength}
            maxLength={maxLength}
            autoComplete={autoComplete}
            ref={ref}
            withAsterisk={withAsterisk}
            required={required}
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

/**
 * dynamicInputProps ? (
          <Flex align="center" justify="space-between" columnGap="xl">
            <Text>{`${semanticNameCapitalized}`}</Text>
            <Tooltip
              label={
                dynamicInputProps?.dynamicLabel
                  ? dynamicInputProps?.dynamicLabel
                  : `${semanticActionCapitalized} ${semanticName}`
              }
            >
              <Group>
                <ButtonWrapper
                  creatorInfoObject={{
                    buttonVariant: 'outline',
                    buttonLabel: 'Delete',
                    buttonDisabled: dynamicInputProps?.buttonDisabled,
                    buttonOnClick: dynamicInputProps?.dynamicInputOnClick,
                    semanticDescription: `${
                      dynamicInputProps?.semanticAction
                    } ${semanticName} ${dynamicInputProps?.dynamicIndex + 1}`,
                    semanticName: `${
                      dynamicInputProps?.semanticAction
                    } ${semanticName} ${dynamicInputProps?.dynamicIndex + 1}`,
                    leftIcon: <TbTrash />,
                  }}
                />
              </Group>
            </Tooltip>
          </Flex>
        ) : (
          label
        )
 */

/**
 <TextInput
      size={textInputSize}
      w={325}
      color="dark"
      label={dynamicInputLabel}
      aria-required={required}
      aria-describedby={
        isValidInputText
          ? `${semanticName.split(' ').join('-')}-input-note-valid`
          : `${semanticName.split(' ').join('-')}-input-note-error`
      }
      aria-autocomplete={ariaAutoComplete}
      description={isValidInputText ? description.valid : description.error}
      placeholder={placeholder}
      name={name}
      aria-invalid={isValidInputText ? false : true}
      value={inputText}
      icon={
        isValidInputText ? (
          icon ? (
            <FontAwesomeIcon icon={icon} color="green" />
          ) : (
            <FontAwesomeIcon icon={faCheck} color="green" />
          )
        ) : null
      }
      error={!isValidInputText && inputText !== initialInputValue}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      rightSection={
        rightSection ? (
          <FontAwesomeIcon
            icon={rightSectionIcon ? rightSectionIcon : faRefresh}
            cursor="pointer"
            color="gray"
            onClick={rightSectionOnClick}
          />
        ) : null
      }
      minLength={minLength}
      maxLength={maxLength}
      autoComplete={autoComplete}
      ref={ref}
      withAsterisk={withAsterisk}
      required={required}
    /> */
