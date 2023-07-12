import { Button } from '@mantine/core';

import { AccessibleButtonCreatorInfo } from '../../jsxCreators';

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
