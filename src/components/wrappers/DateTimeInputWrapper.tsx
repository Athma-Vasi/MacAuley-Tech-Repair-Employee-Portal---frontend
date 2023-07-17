import { faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextInput } from '@mantine/core';

import { useGlobalState } from '../../hooks';
import { TbCheck } from 'react-icons/tb';

type AccessibleDateTimeInputCreatorInfo = {
  inputKind: 'date' | 'time';
  dateKind?: 'date near future' | 'date near past' | 'full date' | undefined;
  semanticName: string;
  inputText: string;
  isValidInputText: boolean;
  label: string;
  ariaAutoComplete?: 'both' | 'list' | 'none' | 'inline' | undefined;
  description: {
    error: JSX.Element;
    valid: JSX.Element;
  };
  placeholder: string;
  initialInputValue?: string | undefined;
  icon?: IconDefinition | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;

  min?: string | undefined;
  max?: string | undefined;
  minLength?: number | undefined;
  maxLength?: number | undefined;
  withAsterisk?: boolean | undefined;
  ref?: React.RefObject<HTMLInputElement> | undefined;
  required?: boolean | undefined;
  autoComplete?: 'on' | 'off' | undefined;
};

type DateTimeInputWrapperProps = {
  creatorInfoObject: AccessibleDateTimeInputCreatorInfo;
};

function DateTimeInputWrapper({
  creatorInfoObject,
}: DateTimeInputWrapperProps) {
  const {
    globalState: { width },
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
    autoComplete = 'off',
  } = creatorInfoObject;

  const dateInputSize = width < 1024 ? 'sm' : 'md';

  return (
    <TextInput
      type={inputKind}
      size={dateInputSize}
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
  );
}

export { DateTimeInputWrapper };

export type { AccessibleDateTimeInputCreatorInfo };
