import {
  Group,
  MantineNumberSize,
  MantineSize,
  Popover,
  Stack,
  TextInput,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';

import { useGlobalState } from '../../hooks';
import { ReactNode, useState } from 'react';
import { TbCheck, TbRefresh } from 'react-icons/tb';
import { returnThemeColors, splitCamelCase } from '../../utils';
import { COLORS_SWATCHES } from '../../constants/data';

type AccessiblePhoneNumberTextInputCreatorInfo = {
  ariaRequired?: boolean;
  autoComplete?: 'on' | 'off';
  description: { error: JSX.Element; valid: JSX.Element };
  icon?: ReactNode;
  initialInputValue?: string;
  inputText: string;
  isValidInputText: boolean;
  label: string;
  maxLength?: number;
  minLength?: number;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  ref?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  semanticName: string;
  size?: MantineSize;
  width?: string | number;
  withAsterisk?: boolean;
};

type PhoneTextInputWrapperProps = {
  creatorInfoObject: AccessiblePhoneNumberTextInputCreatorInfo;
};

function PhoneTextInputWrapper({
  creatorInfoObject,
}: PhoneTextInputWrapperProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    ariaRequired = false,
    autoComplete = 'off',
    description,
    icon = null,
    initialInputValue = '+(1)',
    inputText,
    isValidInputText,
    label,
    maxLength = 18,
    minLength = 18,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    placeholder,
    ref = null,
    required = false,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    semanticName,
    size = 'sm',
    width = 330,
    withAsterisk = false,
  } = creatorInfoObject;

  const {
    generalColors: { greenColorShade, iconGray },
  } = returnThemeColors({ colorsSwatches: COLORS_SWATCHES, themeObject });

  const leftIcon = isValidInputText ? (
    icon ? (
      icon
    ) : (
      <TbCheck color={greenColorShade} size={18} />
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
            color={iconGray}
            size={18}
            onClick={rightSectionOnClick}
          />
        </Group>
      </Tooltip>
    )
  ) : null;

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
          style={{ width }}
        >
          <TextInput
            aria-describedby={
              isValidInputText
                ? `${semanticName.split(' ').join('-')}-input-note-valid`
                : `${semanticName.split(' ').join('-')}-input-note-error`
            }
            aria-invalid={isValidInputText ? false : true}
            aria-required={ariaRequired}
            autoComplete={autoComplete}
            color="dark"
            error={!isValidInputText && inputText !== initialInputValue}
            icon={leftIcon}
            label={label}
            maxLength={maxLength}
            minLength={minLength}
            name={semanticName.split(' ').join('-')}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            ref={ref}
            required={required}
            rightSection={rightIcon}
            size={size}
            value={inputText}
            withAsterisk={withAsterisk}
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
