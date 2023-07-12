import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PasswordInput } from '@mantine/core';

import { AccessiblePasswordInputCreatorInfo } from '../../jsxCreators';

type PasswordInputWrapperProps = {
  creatorInfoObject: AccessiblePasswordInputCreatorInfo;
};

function PasswordInputWrapper({
  creatorInfoObject,
}: PasswordInputWrapperProps) {
  const {
    semanticName,
    inputText,
    isValidInputText,
    label,
    ariaRequired = false,
    description,
    placeholder,
    initialInputValue = '',
    icon = null,
    onChange,
    onFocus,
    onBlur,
    minLength = 8,
    maxLength = 32,
    withAsterisk = false,
    ref = null,
    required = false,
  } = creatorInfoObject;

  return (
    <PasswordInput
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
      description={isValidInputText ? description.valid : description.error}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      minLength={minLength}
      maxLength={maxLength}
      ref={ref}
      withAsterisk={withAsterisk}
      required={required}
    />
  );
}

export { PasswordInputWrapper };