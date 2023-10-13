import { Button, MantineSize } from '@mantine/core';
import {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactNode,
  RefObject,
} from 'react';
import { TbUpload } from 'react-icons/tb';

import { useGlobalState } from '../../hooks';

type AccessibleButtonCreatorInfo = {
  buttonLabel: ReactNode;
  buttonOnClick?: (
    event: MouseEvent<HTMLButtonElement> | PointerEvent<HTMLButtonElement>
  ) => void;
  buttonOnKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  buttonStyle?: CSSProperties;
  buttonDisabled?: boolean;
  buttonRef?: RefObject<HTMLButtonElement>;
  buttonType?: 'button' | 'submit' | 'reset';
  buttonVariant?:
    | 'outline'
    | 'white'
    | 'light'
    | 'default'
    | 'filled'
    | 'gradient'
    | 'subtle';
  compact?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  semanticName: string;
  semanticDescription: string;
  size?: MantineSize;
};

type ButtonWrapperProps = {
  creatorInfoObject: AccessibleButtonCreatorInfo;
};

function ButtonWrapper({ creatorInfoObject }: ButtonWrapperProps) {
  const {
    globalState: { themeObject },
  } = useGlobalState();
  const { defaultGradient, colorScheme } = themeObject;

  const {
    buttonLabel,
    buttonType = 'button',
    buttonOnClick = () => {},
    buttonOnKeyDown = () => {},
    semanticDescription,
    semanticName,
    buttonStyle = {},
    buttonDisabled = false,
    buttonRef = null,
    buttonVariant = colorScheme === 'dark' ? 'outline' : 'subtle',
    compact = false,
    leftIcon = buttonType === 'submit' ? <TbUpload /> : null,
    rightIcon = null,
    size = 'xs',
  } = creatorInfoObject;

  return (
    <Button
      style={buttonStyle}
      onClick={buttonOnClick}
      onKeyDown={buttonOnKeyDown}
      disabled={buttonDisabled}
      ref={buttonRef}
      type={buttonType}
      variant={buttonVariant}
      compact={compact}
      gradient={buttonVariant === 'gradient' ? defaultGradient : void 0}
      leftIcon={leftIcon}
      name={semanticName.split(' ').join('-')}
      rightIcon={rightIcon}
      size={size}
      aria-label={semanticName}
      aria-describedby={semanticDescription}
    >
      {buttonLabel}
    </Button>
  );
}

export { ButtonWrapper };

export type { AccessibleButtonCreatorInfo };
