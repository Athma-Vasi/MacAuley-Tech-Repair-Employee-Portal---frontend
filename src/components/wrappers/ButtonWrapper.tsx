import { Button } from '@mantine/core';
import { MouseEvent, PointerEvent, ReactNode } from 'react';
import { TbUpload } from 'react-icons/tb';

import { useGlobalState } from '../../hooks';

type AccessibleButtonCreatorInfo = {
  buttonLabel: ReactNode;
  buttonOnClick?: (
    event: MouseEvent<HTMLButtonElement> | PointerEvent<HTMLButtonElement>
  ) => void;
  buttonStyle?: React.CSSProperties;
  buttonDisabled?: boolean;
  buttonRef?: React.RefObject<HTMLButtonElement>;
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
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  semanticName: string;
  semanticDescription: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  p?: string | number;
};

type ButtonWrapperProps = {
  creatorInfoObject: AccessibleButtonCreatorInfo;
};

function ButtonWrapper({ creatorInfoObject }: ButtonWrapperProps) {
  const {
    globalState: { width },
  } = useGlobalState();

  const {
    buttonLabel,
    buttonType = 'button',
    buttonOnClick = () => {},
    semanticDescription,
    semanticName,
    buttonStyle = {},
    buttonDisabled = false,
    buttonRef = null,
    buttonVariant = 'outline',
    p = 'xs',
    compact = false,
    leftIcon = buttonType === 'submit' ? <TbUpload /> : null,
    rightIcon = null,
    size = width < 1024 ? 'xs' : 'sm',
  } = creatorInfoObject;

  return (
    <Button
      style={buttonStyle}
      onClick={buttonOnClick}
      disabled={buttonDisabled}
      ref={buttonRef}
      type={buttonType}
      variant={buttonVariant}
      compact={compact}
      leftIcon={leftIcon}
      name={semanticName.split(' ').join('-')}
      p={p}
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
