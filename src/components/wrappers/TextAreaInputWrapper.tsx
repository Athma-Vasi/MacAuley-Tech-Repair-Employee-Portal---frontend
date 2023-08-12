import { faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Group, Text, Textarea, Tooltip } from '@mantine/core';
import { ReactNode } from 'react';
import { BsTrash } from 'react-icons/bs';

import { useGlobalState } from '../../hooks';
import { ButtonWrapper } from './ButtonWrapper';

type AccessibleTextAreaInputCreatorInfo = {
  semanticName: string;
  inputText: string;
  isValidInputText: boolean;
  label?: string;
  /**
   * This is for dynamic inputs, such as the ones in the survey builder. Typically a delete button, though it can be anything.
   */
  dynamicInputs?: ReactNode[];
  ariaRequired?: boolean;
  ariaAutoComplete?: 'both' | 'list' | 'none' | 'inline';
  description: {
    error: JSX.Element;
    valid: JSX.Element;
  };
  placeholder: string;
  initialInputValue?: string;
  icon?: IconDefinition;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;

  minLength?: number;
  maxLength?: number;
  withAsterisk?: boolean;
  ref?: React.RefObject<HTMLTextAreaElement> | null;
  required?: boolean;
  autoComplete?: 'on' | 'off';

  autosize?: boolean;
  minRows?: number;
  maxRows?: number;
};

type TextAreaInputWrapperProps = {
  creatorInfoObject: AccessibleTextAreaInputCreatorInfo;
};

function TextAreaInputWrapper({
  creatorInfoObject,
}: TextAreaInputWrapperProps) {
  const {
    globalState: { width },
  } = useGlobalState();

  const {
    semanticName,
    inputText,
    isValidInputText,
    label = semanticName,
    ariaRequired = false,
    ariaAutoComplete = 'none',
    description,
    dynamicInputs = null,
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
    autosize = true,
    minRows = 3,
    maxRows = 7,
  } = creatorInfoObject;

  const textAreaSize = 'sm';
  // const semanticNameCapitalized =
  //   semanticName.charAt(0).toUpperCase() + semanticName.slice(1);

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

  return (
    <Textarea
      size={textAreaSize}
      w="100%"
      color="dark"
      label={dynamicInputLabel}
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
      name={semanticName.split(' ').join('-')}
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

export type { AccessibleTextAreaInputCreatorInfo };
