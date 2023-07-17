import { Button } from '@mantine/core';
import { MouseEvent, PointerEvent, ReactNode } from 'react';

import { useGlobalState } from '../../hooks';

type AccessibleButtonCreatorInfo = {
  buttonLabel: ReactNode;
  buttonOnClick?: (
    event: MouseEvent<HTMLButtonElement> | PointerEvent<HTMLButtonElement>
  ) => void | undefined;
  buttonStyle?: React.CSSProperties | undefined;
  buttonDisabled?: boolean | undefined;
  buttonRef?: React.RefObject<HTMLButtonElement> | undefined;
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
  buttonVariant?:
    | 'outline'
    | 'white'
    | 'light'
    | 'default'
    | 'filled'
    | 'gradient'
    | 'subtle'
    | undefined;
  compact?: boolean | undefined;
  leftIcon?: React.ReactNode | undefined;
  rightIcon?: React.ReactNode | undefined;
  semanticName: string;
  semanticDescription: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
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
    buttonVariant = 'filled',
    compact = false,
    leftIcon = null,
    rightIcon = null,
    size = width < 1024 ? 'sm' : width < 1440 ? 'md' : 'lg',
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
