import { faCheck, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextInput } from '@mantine/core';

import { AccessibleTextInputCreatorInfo } from '../../jsxCreators';

type TextInputWrapperProps = {
  creatorInfoObject: AccessibleTextInputCreatorInfo;
};

function TextInputWrapper({ creatorInfoObject }: TextInputWrapperProps) {
  const {
    semanticName,
    inputText,
    isValidInputText,
    label,
    ariaAutoComplete = 'none',
    description,
    placeholder,
    initialInputValue = '',
    icon = null,
    onBlur,
    onChange,
    onFocus,
    onKeyDown = () => {},
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    minLength = 2,
    maxLength = 75,
    withAsterisk = false,
    ref = null,
    required = false,
    autoComplete = 'off',
  } = creatorInfoObject;

  return (
    <TextInput
      size="sm"
      w="100%"
      color="dark"
      label={label}
      aria-required={required}
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
    />
  );
}

export { TextInputWrapper };
