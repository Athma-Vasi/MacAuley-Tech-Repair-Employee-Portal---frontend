import { FormEvent, ReactNode } from 'react';

import { returnAccessibleButtonElements } from '../../jsxCreators';
import { AccessibleButtonCreatorInfo } from './ButtonWrapper';
import { Flex } from '@mantine/core';
import { useGlobalState } from '../../hooks';

type AccessibleFormCreatorInfo = {
  name: string;
  semanticName: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitButtonLabel: string;
  submitButtonIcon?: ReactNode | undefined;
  submitButtonDisabled?: boolean | undefined;
  children: ReactNode[];
};

type FormWrapperProps = {
  creatorInfoObject: AccessibleFormCreatorInfo;
};

function FormWrapper({ creatorInfoObject }: FormWrapperProps) {
  const {
    globalState: { width },
  } = useGlobalState();

  const {
    children,
    name,
    semanticName,
    onSubmit,
    submitButtonLabel,
    submitButtonIcon,
    submitButtonDisabled = false,
  } = creatorInfoObject;

  const submitButtonCreatorInfoObject: AccessibleButtonCreatorInfo = {
    semanticName: 'submit button',
    buttonLabel: submitButtonLabel,
    semanticDescription: `submit button for ${semanticName}`,
    leftIcon: submitButtonIcon,
    buttonDisabled: submitButtonDisabled,
    buttonType: 'submit',
  };

  const createdSubmitButton = returnAccessibleButtonElements([
    submitButtonCreatorInfoObject,
  ]);

  const rowGap = width < 480 ? 'sm' : width < 1024 ? 'sm' : 'md';

  return (
    <form
      onSubmit={onSubmit}
      name={name}
      aria-label={semanticName}
      style={{ width: '100%', border: '1px solid #e0e0e0', borderRadius: 4 }}
    >
      <Flex
        direction="column"
        align="flex-start"
        justify="space-between"
        w="100%"
        p={width < 480 ? 'xs' : width < 768 ? 'sm' : 'md'}
        rowGap={rowGap}
      >
        {children}
        {createdSubmitButton}
      </Flex>
    </form>
  );
}

export { FormWrapper };

export type { AccessibleFormCreatorInfo };
