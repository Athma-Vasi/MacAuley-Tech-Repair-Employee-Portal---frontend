import {
  faCheck,
  faRefresh,
  faTrash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Group, Text, TextInput, Tooltip } from '@mantine/core';
import { ReactNode } from 'react';
import { BsTrash } from 'react-icons/bs';

import { ButtonWrapper } from './ButtonWrapper';

type AccessibleTextInputCreatorInfo = {
  semanticName: string;
  inputText: string;
  /**
   * This is for dynamic inputs, such as the ones in the survey builder. Typically a delete button, though it can be anything.
   */
  dynamicInputProps?:
    | {
        semanticAction: string;
        dynamicIndex: number;
        dynamicIcon?: ReactNode | undefined;
        dynamicInputOnClick: () => void;
      }
    | undefined;
  isValidInputText: boolean;
  label?: ReactNode | string | undefined;
  ariaAutoComplete?: 'both' | 'list' | 'none' | 'inline' | undefined;
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
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void | undefined;

  rightSection?: boolean | undefined;
  rightSectionIcon?: IconDefinition | null | undefined;
  rightSectionOnClick?: () => void | undefined;

  minLength?: number | undefined;
  maxLength?: number | undefined;
  withAsterisk?: boolean | undefined;
  ref?: React.RefObject<HTMLInputElement> | undefined | null;
  required?: boolean | undefined;
  autoComplete?: 'on' | 'off' | undefined;
};

type TextInputWrapperProps = {
  creatorInfoObject: AccessibleTextInputCreatorInfo;
};

function TextInputWrapper({ creatorInfoObject }: TextInputWrapperProps) {
  const {
    semanticName,
    inputText,
    isValidInputText,
    label = semanticName,
    ariaAutoComplete = 'none',
    description,
    dynamicInputProps = null,
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

  const semanticNameCapitalized =
    semanticName.charAt(0).toUpperCase() + semanticName.slice(1);
  const semanticActionCapitalized = dynamicInputProps
    ? dynamicInputProps?.semanticAction.charAt(0).toUpperCase() +
      dynamicInputProps?.semanticAction.slice(1)
    : '';

  return (
    <TextInput
      size="sm"
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
                    leftIcon: <FontAwesomeIcon icon={faTrash} />,
                  }}
                />
              </Group>
            </Tooltip>
          </Flex>
        ) : (
          label
        )
      }
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

export type { AccessibleTextInputCreatorInfo };
