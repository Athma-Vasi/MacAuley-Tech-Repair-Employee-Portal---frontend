import {
  faCheck,
  faRefresh,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Group,
  Popover,
  Stack,
  TextInput,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';

import { useGlobalState } from '../../hooks';
import { ReactNode, useState } from 'react';
import { TbCheck, TbRefresh } from 'react-icons/tb';
import { splitCamelCase } from '../../utils';

type AccessiblePhoneNumberTextInputCreatorInfo = {
  semanticName: string;
  inputText: string;
  isValidInputText: boolean;
  label: string;
  ariaRequired?: boolean;
  description: {
    error: JSX.Element;
    valid: JSX.Element;
  };
  placeholder: string;
  initialInputValue?: string;
  icon?: ReactNode;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;

  minLength?: number;
  maxLength?: number;
  withAsterisk?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  ref?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  autoComplete?: 'on' | 'off';
};

type PhoneTextInputWrapperProps = {
  creatorInfoObject: AccessiblePhoneNumberTextInputCreatorInfo;
};

function PhoneTextInputWrapper({
  creatorInfoObject,
}: PhoneTextInputWrapperProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const { colors } = useMantineTheme();
  const {
    globalState: {
      themeObject: { colorScheme, primaryShade },
      width,
    },
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
    size = 'sm',
    autoComplete = 'off',
  } = creatorInfoObject;

  const colorShade =
    colorScheme === 'light' ? primaryShade.light : primaryShade.dark;

  const leftIcon = isValidInputText ? (
    icon ? (
      icon
    ) : (
      <TbCheck color={colors.green[colorShade]} size={18} />
    )
  ) : null;

  const rightIcon = rightSection ? (
    rightSectionIcon ? (
      rightSectionIcon
    ) : (
      <Tooltip
        label={`Reset ${splitCamelCase(semanticName)} to ${initialInputValue}`}
      >
        <Group style={{ cursor: 'pointer' }}>
          <TbRefresh
            aria-label={`Reset ${splitCamelCase(
              semanticName
            )} value to ${initialInputValue}`}
            color={colors.gray[colorScheme === 'light' ? 5 : 3]}
            size={18}
            onClick={rightSectionOnClick}
          />
        </Group>
      </Tooltip>
    )
  ) : null;

  const inputWidth = 330;

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
          <TextInput
            size={size}
            w={inputWidth}
            color="dark"
            label={label}
            aria-required={ariaRequired}
            aria-describedby={
              isValidInputText
                ? `${semanticName.split(' ').join('-')}-input-note-valid`
                : `${semanticName.split(' ').join('-')}-input-note-error`
            }
            // description={isValidInputText ? description.valid : description.error}
            placeholder={placeholder}
            autoComplete={autoComplete}
            aria-invalid={isValidInputText ? false : true}
            value={inputText}
            icon={leftIcon}
            error={!isValidInputText && inputText !== initialInputValue}
            name={semanticName.split(' ').join('-')}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            rightSection={rightIcon}
            minLength={minLength}
            maxLength={maxLength}
            ref={ref}
            withAsterisk={withAsterisk}
            required={required}
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

export { PhoneTextInputWrapper };

export type { AccessiblePhoneNumberTextInputCreatorInfo };

/**
 <TextInput
      size={size}
      w="100%"
      color="dark"
      label={label}
      aria-required={ariaRequired}
      aria-describedby={
        isValidInputText
          ? `${semanticName.split(' ').join('-')}-input-note-valid`
          : `${semanticName.split(' ').join('-')}-input-note-error`
      }
      // description={isValidInputText ? description.valid : description.error}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-invalid={isValidInputText ? false : true}
      value={inputText}
      icon={
        // isValidInputText ? (
        //   icon ? (
        //     <FontAwesomeIcon icon={icon} color="green" />
        //   ) : (
        //     <FontAwesomeIcon icon={faCheck} color="green" />
        //   )
        // ) : null
        leftIcon
      }
      error={!isValidInputText && inputText !== initialInputValue}
      name={semanticName.split(' ').join('-')}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      rightSection={
        // rightSection ? (
        //   <Tooltip label={`Reset value to ${initialInputValue}`}>
        //     <Button
        //       type="button"
        //       size="xs"
        //       variant="white"
        //       aria-label={`Reset personal contact number value to ${initialInputValue}`}
        //       mr="md"
        //     >
        //       <FontAwesomeIcon
        //         icon={rightSectionIcon ? rightSectionIcon : faRefresh}
        //         cursor="pointer"
        //         color="gray"
        //         onClick={rightSectionOnClick}
        //       />
        //     </Button>
        //   </Tooltip>
        // ) : null
        rightIcon
      }
      minLength={minLength}
      maxLength={maxLength}
      ref={ref}
      withAsterisk={withAsterisk}
      required={required}
    />
*/
