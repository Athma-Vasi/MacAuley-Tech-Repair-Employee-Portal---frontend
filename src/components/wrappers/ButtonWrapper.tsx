import { Button } from '@mantine/core';
import { ReactNode } from 'react';
import { useGlobalState } from '../../hooks';

type AccessibleButtonCreatorInfo = {
  buttonLabel: ReactNode;
  buttonOnClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined;
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
