import { faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Flex,
  Group,
  Popover,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { ReactNode, useState } from 'react';
import { BsTrash } from 'react-icons/bs';

import { useGlobalState } from '../../hooks';
import { ButtonWrapper } from './ButtonWrapper';
import { TbCheck } from 'react-icons/tb';

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
  icon?: ReactNode;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;

  minLength?: number;
  maxLength?: number;
  withAsterisk?: boolean;
  ref?: React.RefObject<HTMLTextAreaElement> | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  required?: boolean;
  autoComplete?: 'on' | 'off';

  autosize?: boolean;
  minRows?: number;
  maxRows?: number;
  textAreaWidth?: number;
};

type TextAreaInputWrapperProps = {
  creatorInfoObject: AccessibleTextAreaInputCreatorInfo;
};

function TextAreaInputWrapper({
  creatorInfoObject,
}: TextAreaInputWrapperProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const { colors } = useMantineTheme();
  const {
    globalState: {
      themeObject: { colorScheme, primaryShade },
      padding,
      width,
    },
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
    size = 'sm',
    minRows = 3,
    maxRows = 7,
    textAreaWidth,
  } = creatorInfoObject;

  const dynamicInputLabel = dynamicInputs ? (
    <Group w="100%" position="apart" py={padding}>
      <Text size="sm">{label}</Text>
      {dynamicInputs.map((input, index) => (
        <Group key={`${index}`}>{input}</Group>
      ))}
    </Group>
  ) : (
    label
  );

  const colorShade =
    colorScheme === 'light' ? primaryShade.light : primaryShade.dark;

  const leftIcon = isValidInputText ? (
    icon ? (
      icon
    ) : (
      <TbCheck color={colors.green[colorShade]} size={18} />
    )
  ) : null;

  const inputWidth = textAreaWidth ? textAreaWidth : width < 480 ? 330 : 450;

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
          <Textarea
            size={size}
            w={inputWidth}
            color="dark"
            label={dynamicInputLabel}
            aria-required={ariaRequired}
            aria-describedby={
              isValidInputText
                ? `${semanticName.split(' ').join('-')}-input-note-valid`
                : `${semanticName.split(' ').join('-')}-input-note-error`
            }
            aria-autocomplete={ariaAutoComplete}
            // description={
            //   isValidInputText ? description.valid : description.error
            // }
            placeholder={placeholder}
            aria-invalid={isValidInputText ? false : true}
            value={inputText}
            icon={leftIcon}
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

export { TextAreaInputWrapper };

export type { AccessibleTextAreaInputCreatorInfo };

/**
 * <Textarea
      size={size}
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
 */
