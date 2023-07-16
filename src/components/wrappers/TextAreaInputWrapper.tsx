import {
  faCheck,
  faTrash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Group, Text, Textarea, Tooltip } from '@mantine/core';
import { Fragment, ReactNode } from 'react';
import { BsTrash } from 'react-icons/bs';

import { ButtonWrapper } from './ButtonWrapper';
import { useGlobalState } from '../../hooks';

type AccessibleTextAreaInputCreatorInfo = {
  semanticName: string;
  inputText: string;
  isValidInputText: boolean;
  label?: string | undefined;
  /**
   * This is for dynamic inputs, such as the ones in the survey builder. Typically a delete button, though it can be anything.
   */
  dynamicInputProps?:
    | {
        semanticAction: string;
        dynamicIndex: number;
        dynamicIcon?: ReactNode | IconDefinition | undefined;
        dynamicInputOnClick: () => void;
      }
    | undefined;
  ariaRequired?: boolean | undefined;
  ariaAutoComplete?: 'both' | 'list' | 'none' | 'inline' | undefined;
  description: {
    error: JSX.Element;
    valid: JSX.Element;
  };
  placeholder: string;
  initialInputValue?: string | undefined;
  icon?: IconDefinition | undefined;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;

  minLength?: number | undefined;
  maxLength?: number | undefined;
  withAsterisk?: boolean | undefined;
  ref?: React.RefObject<HTMLTextAreaElement> | undefined | null;
  required?: boolean | undefined;
  autoComplete?: 'on' | 'off' | undefined;

  autosize?: boolean | undefined;
  minRows?: number | undefined;
  maxRows?: number | undefined;
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
    dynamicInputProps = null,
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

  const semanticNameCapitalized =
    semanticName.charAt(0).toUpperCase() + semanticName.slice(1);
  const semanticActionCapitalized = dynamicInputProps
    ? dynamicInputProps?.semanticAction.charAt(0).toUpperCase() +
      dynamicInputProps?.semanticAction.slice(1)
    : '';

  const textAreaSize = width < 1024 ? 'sm' : width < 1440 ? 'md' : 'lg';

  return (
    <Textarea
      size={textAreaSize}
      w="100%"
      color="dark"
      label={
        dynamicInputProps ? (
          <Flex align="center" justify="space-between" columnGap="xl">
            <Text>{`${semanticNameCapitalized}`}</Text>
            <Tooltip label={`${semanticActionCapitalized} ${semanticName}`}>
              <Group>
                <ButtonWrapper
                  creatorInfoObject={{
                    buttonVariant: 'outline',
                    buttonLabel: 'Delete',
                    buttonOnClick: dynamicInputProps.dynamicInputOnClick,
                    semanticDescription: `${
                      dynamicInputProps.semanticAction
                    } ${semanticName} ${dynamicInputProps.dynamicIndex + 1}`,
                    semanticName: `${
                      dynamicInputProps.semanticAction
                    } ${semanticName} ${dynamicInputProps.dynamicIndex + 1}`,
                    leftIcon: <BsTrash />,
                  }}
                />
              </Group>
            </Tooltip>
          </Flex>
        ) : (
          label
        )
      }
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

export type { AccessibleTextAreaInputCreatorInfo };
