import type { PreferredPronouns } from '../../../types';
import type { RegisterAction, RegisterDispatch } from '../types';

type RegisterStepPersonalProps = {
  firstName: string;
  isValidFirstName: boolean;
  isFirstNameFocused: boolean;

  middleName: string;
  isValidMiddleName: boolean;
  isMiddleNameFocused: boolean;

  lastName: string;
  isValidLastName: boolean;
  isLastNameFocused: boolean;

  preferredName: string;
  isValidPreferredName: boolean;
  isPreferredNameFocused: boolean;

  preferredPronouns: PreferredPronouns;

  registerAction: RegisterAction;
  registerDispatch: React.Dispatch<RegisterDispatch>;
};

export type { RegisterStepPersonalProps };
