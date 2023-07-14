import { Button } from '@mantine/core';
import { ReactNode } from 'react';

type AccessibleButtonCreatorInfo = {
  buttonLabel: ReactNode;
  buttonOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
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
    buttonLabel,
    buttonOnClick,
    semanticDescription,
    semanticName,
    buttonDisabled = false,
    buttonRef = null,
    buttonType = 'button',
    buttonVariant = 'filled',
    compact = false,
    leftIcon = null,
    rightIcon = null,
    size = 'sm',
  } = creatorInfoObject;

  return (
    <Button
      onClick={buttonOnClick}
      disabled={buttonDisabled}
      ref={buttonRef}
      type={buttonType}
      variant={buttonVariant}
      compact={compact}
      leftIcon={leftIcon}
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
