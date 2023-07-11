import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextInput } from '@mantine/core';

import { AccessibleDateTimeInputCreatorInfo } from '../../jsxCreators';

type DateTimeInputWrapperProps = {
  creatorInfoObject: AccessibleDateTimeInputCreatorInfo;
};

function DateTimeInputWrapper({
  creatorInfoObject,
}: DateTimeInputWrapperProps) {
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

  return (
    <TextInput
      type={inputKind}
      size="sm"
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
