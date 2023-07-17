import {
  faCheck,
  faRefresh,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, TextInput, Tooltip } from '@mantine/core';
import { useGlobalState } from '../../hooks';

type AccessiblePhoneNumberTextInputCreatorInfo = {
  semanticName: string;
  inputText: string;
  isValidInputText: boolean;
  label: string;
  ariaRequired?: boolean | undefined;
  description: {
    error: JSX.Element;
    valid: JSX.Element;
  };
  placeholder: string;
  initialInputValue?: string | undefined;
  icon?: IconDefinition | undefined;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  rightSection?: boolean | undefined;
  rightSectionIcon?: IconDefinition | null | undefined;
  rightSectionOnClick?: () => void | undefined;

  minLength?: number | undefined;
  maxLength?: number | undefined;
  withAsterisk?: boolean | undefined;
  ref?: React.RefObject<HTMLInputElement> | undefined;
  required?: boolean | undefined;
  autoComplete?: 'on' | 'off' | undefined;
};

type PhoneTextInputWrapperProps = {
  creatorInfoObject: AccessiblePhoneNumberTextInputCreatorInfo;
};

function PhoneTextInputWrapper({
  creatorInfoObject,
}: PhoneTextInputWrapperProps) {
  const {
    globalState: { width },
  } = useGlobalState();

  const {
    semanticName,
    inputText,
    isValidInputText,
    label,
    ariaRequired = false,
    description,
    placeholder,
    initialInputValue = '+(1)',
    icon = null,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    minLength = 18,
    maxLength = 18,
    withAsterisk = false,
    ref = null,
    required = false,
    autoComplete = 'off',
  } = creatorInfoObject;

  const textInputSize = width < 1024 ? 'sm' : width < 1440 ? 'md' : 'lg';

  return (
    <TextInput
      size={textInputSize}
      w="100%"
      color="dark"
      label={label}
      aria-required={ariaRequired}
      aria-describedby={
        isValidInputText
          ? `${semanticName.split(' ').join('-')}-input-note-valid`
          : `${semanticName.split(' ').join('-')}-input-note-error`
      }
      description={isValidInputText ? description.valid : description.error}
      placeholder={placeholder}
      autoComplete={autoComplete}
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
      name={semanticName.split(' ').join('-')}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      rightSection={
        rightSection ? (
          <Tooltip label={`Reset value to ${initialInputValue}`}>
            <Button
              type="button"
              size="xs"
              variant="white"
              aria-label={`Reset personal contact number value to ${initialInputValue}`}
              mr="md"
            >
              <FontAwesomeIcon
                icon={rightSectionIcon ? rightSectionIcon : faRefresh}
                cursor="pointer"
                color="gray"
                onClick={rightSectionOnClick}
              />
            </Button>
          </Tooltip>
        ) : null
      }
      minLength={minLength}
      maxLength={maxLength}
      ref={ref}
      withAsterisk={withAsterisk}
      required={required}
    />
  );
}

export { PhoneTextInputWrapper };

export type { AccessiblePhoneNumberTextInputCreatorInfo };
