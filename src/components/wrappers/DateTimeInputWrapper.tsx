import { faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover, Stack, TextInput, useMantineTheme } from '@mantine/core';

import { useGlobalState } from '../../hooks';
import { TbCheck } from 'react-icons/tb';
import { ReactNode, useState } from 'react';

type AccessibleDateTimeInputCreatorInfo = {
  inputKind: 'date' | 'time';
  dateKind?: 'date near future' | 'date near past' | 'full date';
  semanticName: string;
  inputText: string;
  isValidInputText: boolean;
  label: string;
  ariaAutoComplete?: 'both' | 'list' | 'none' | 'inline';
  description: {
    error: JSX.Element;
    valid: JSX.Element;
  };
  placeholder: string;
  initialInputValue?: string;
  icon?: ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;

  min?: string;
  max?: string;
  minLength?: number;
  maxLength?: number;
  withAsterisk?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  required?: boolean;
  autoComplete?: 'on' | 'off';
};

type DateTimeInputWrapperProps = {
  creatorInfoObject: AccessibleDateTimeInputCreatorInfo;
};

function DateTimeInputWrapper({
  creatorInfoObject,
}: DateTimeInputWrapperProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const { colors } = useMantineTheme();
  const {
    globalState: {
      themeObject: { colorScheme, primaryShade },
    },
  } = useGlobalState();

  const {
    inputKind,
    dateKind = 'full date',
    semanticName,
    inputText,
    isValidInputText,
    label,
    ariaAutoComplete = 'none',
    description,
    placeholder,
    initialInputValue = '',
    icon = null,
    onChange,
    onFocus,
    onBlur,
    min = new Date().toISOString().split('T')[0], // current date
    max = new Date(2024, 11, 31).toISOString().split('T')[0], // 31.12.2024
    minLength = inputKind === 'date' ? 10 : 5,
    maxLength = inputKind === 'date' ? 10 : 5,
    withAsterisk = false,
    ref = null,
    required = false,
    size = 'sm',
    autoComplete = 'off',
  } = creatorInfoObject;

  const colorShade =
    colorScheme === 'light' ? primaryShade.light : primaryShade.dark;

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
            type={inputKind}
            size={size}
            w={325}
            color="dark"
            label={label}
            placeholder={placeholder}
            aria-autocomplete={ariaAutoComplete}
            autoComplete={autoComplete}
            aria-required={required}
            aria-label={`Please enter ${semanticName} in format "${
              inputKind === 'date'
                ? 'on Chromium browsers: date-date-month-month-year-year-year-year, or in other browsers year-year-year-year-month-month-date-date'
                : 'hour-hour-minute-minute'
            }${
              dateKind === 'date near future'
                ? ' from today to 2026'
                : dateKind === 'date near past'
                ? ' from 2020 to today'
                : ' from 1900 to 2024'
            }`}
            aria-describedby={
              isValidInputText
                ? `${semanticName.split(' ').join('-')}-input-note-valid`
                : `${semanticName.split(' ').join('-')}-input-note-error`
            }
            aria-invalid={isValidInputText ? false : true}
            value={inputText}
            icon={leftIcon}
            error={!isValidInputText && inputText !== initialInputValue}
            // description={
            //   isValidInputText ? description.valid : description.error
            // }
            min={
              dateKind === 'full date'
                ? new Date(1900, 0, 1).toISOString().split('T')[0]
                : dateKind === 'date near past'
                ? new Date(2020, 0, 1).toISOString().split('T')[0]
                : dateKind === 'date near future'
                ? new Date().toISOString().split('T')[0]
                : min
            }
            max={
              dateKind === 'full date'
                ? new Date(2024, 11, 31).toISOString().split('T')[0]
                : dateKind === 'date near past'
                ? new Date().toISOString().split('T')[0]
                : dateKind === 'date near future'
                ? new Date(2026, 11, 31).toISOString().split('T')[0]
                : max
            }
            name={semanticName.split(' ').join('-')}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            minLength={
              inputKind === 'date' ? 10 : inputKind === 'time' ? 5 : minLength
            }
            maxLength={
              inputKind === 'date' ? 10 : inputKind === 'time' ? 5 : maxLength
            }
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

export { DateTimeInputWrapper };

export type { AccessibleDateTimeInputCreatorInfo };

/**
 * <TextInput
      type={inputKind}
      size={size}
      w="100%"
      color="dark"
      label={label}
      placeholder={placeholder}
      aria-autocomplete={ariaAutoComplete}
      autoComplete={autoComplete}
      aria-required={required}
      aria-label={`Please enter ${semanticName} in format "${
        inputKind === 'date'
          ? 'on Chromium browsers: date-date-month-month-year-year-year-year, or in other browsers year-year-year-year-month-month-date-date'
          : 'hour-hour-minute-minute'
      }${
        dateKind === 'date near future'
          ? ' from today to 2026'
          : dateKind === 'date near past'
          ? ' from 2020 to today'
          : ' from 1900 to 2024'
      }`}
      aria-describedby={
        isValidInputText
          ? `${semanticName.split(' ').join('-')}-input-note-valid`
          : `${semanticName.split(' ').join('-')}-input-note-error`
      }
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
      description={isValidInputText ? description.valid : description.error}
      min={
        dateKind === 'full date'
          ? new Date(1900, 0, 1).toISOString().split('T')[0]
          : dateKind === 'date near past'
          ? new Date(2020, 0, 1).toISOString().split('T')[0]
          : dateKind === 'date near future'
          ? new Date().toISOString().split('T')[0]
          : min
      }
      max={
        dateKind === 'full date'
          ? new Date(2024, 11, 31).toISOString().split('T')[0]
          : dateKind === 'date near past'
          ? new Date().toISOString().split('T')[0]
          : dateKind === 'date near future'
          ? new Date(2026, 11, 31).toISOString().split('T')[0]
          : max
      }
      name={semanticName.split(' ').join('-')}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      minLength={
        inputKind === 'date' ? 10 : inputKind === 'time' ? 5 : minLength
      }
      maxLength={
        inputKind === 'date' ? 10 : inputKind === 'time' ? 5 : maxLength
      }
      ref={ref}
      withAsterisk={withAsterisk}
      required={required}
    />
 */
