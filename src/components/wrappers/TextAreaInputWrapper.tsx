import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Textarea } from '@mantine/core';

import { AccessibleTextAreaInputCreatorInfo } from '../../jsxCreators';

type TextAreaInputWrapperProps = {
  creatorInfoObject: AccessibleTextAreaInputCreatorInfo;
};

function TextAreaInputWrapper({
  creatorInfoObject,
}: TextAreaInputWrapperProps) {
  const {
    semanticName,
    inputText,
    isValidInputText,
    label,
    ariaRequired = false,
    ariaAutoComplete = 'none',
    description,
    placeholder,
    initialInputValue = '',
    icon = null,
    onChange,
    onFocus,
    onBlur,
    minLength = 2,
    maxLength = 2000,
    withAsterisk = false,
    ref = null,
    required = false,
    autoComplete = 'off',
    autosize = false,
    minRows = 3,
    maxRows = 7,
  } = creatorInfoObject;

  return (
    <Textarea
      size="sm"
      w="100%"
      color="dark"
      label={label}
      aria-required={ariaRequired}
      aria-describedby={
        isValidInputText
          ? `${semanticName.split(' ').join('-')}-input-note-valid`
          : `${semanticName.split(' ').join('-')}-input-note-error`
      }
      aria-autocomplete={ariaAutoComplete}
      description={isValidInputText ? description.valid : description.error}
      placeholder={placeholder}
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
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      minLength={minLength}
      maxLength={maxLength}
      autoComplete={autoComplete}
      ref={ref}
      withAsterisk={withAsterisk}
      required={required}
      autosize={autosize}
      minRows={minRows}
      maxRows={maxRows}
    />
  );
}

export { TextAreaInputWrapper };
