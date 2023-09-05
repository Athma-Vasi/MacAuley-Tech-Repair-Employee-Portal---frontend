import { Button } from '@mantine/core';
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
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

type ButtonWrapperProps = {
  creatorInfoObject: AccessibleButtonCreatorInfo;
};

function ButtonWrapper({ creatorInfoObject }: ButtonWrapperProps) {
  const {
    globalState: { themeObject },
  } = useGlobalState();
  const {
    defaultGradient,
    components: { Button: ButtonComponent }, // avoids name conflict
  } = themeObject;
  const defaultProps = ButtonComponent.defaultProps as Record<string, any>;

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
    buttonVariant = defaultProps.variant,
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
      gradient={buttonVariant === 'gradient' ? defaultGradient : undefined}
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
