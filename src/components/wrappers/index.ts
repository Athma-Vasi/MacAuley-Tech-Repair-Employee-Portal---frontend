/**
 * This barrel index file is used to import/export wrappers
 */

/**
 * The wrappers provide a centralized location to modify functionality and propagate changes based on state/contexts.They are typically called by the creator functions in jsxCreators/, which are not react function components.
 */

import type { AccessibleButtonCreatorInfo } from './ButtonWrapper';
import { ButtonWrapper } from './ButtonWrapper';
import type { AccessibleCheckboxInputCreatorInfo } from './CheckboxInputWrapper';
import { CheckboxInputWrapper } from './CheckboxInputWrapper';
import type { AccessibleDateTimeInputCreatorInfo } from './DateTimeInputWrapper';
import { DateTimeInputWrapper } from './DateTimeInputWrapper';
import type { AccessibleSelectInputCreatorInfo } from './NativeSelectWrapper';
import { NativeSelectWrapper } from './NativeSelectWrapper';
import type { AccessiblePasswordInputCreatorInfo } from './PasswordInputWrapper';
import { PasswordInputWrapper } from './PasswordInputWrapper';
import type { AccessiblePhoneNumberTextInputCreatorInfo } from './PhoneTextInputWrapper';
import { PhoneTextInputWrapper } from './PhoneTextInputWrapper';
import type {
  AccessibleRadioGroupInputCreatorInfo,
  AccessibleRadioSingleInputCreatorInfo,
} from './RadioInputWrapper';
import {
  RadioGroupInputsWrapper,
  RadioSingleInputWrapper,
} from './RadioInputWrapper';
import { StepperWrapper } from './stepperWrapper';
import type { DescriptionMap } from './stepperWrapper/types';
import type { AccessibleTextAreaInputCreatorInfo } from './TextAreaInputWrapper';
import { TextAreaInputWrapper } from './TextAreaInputWrapper';
import type { AccessibleTextInputCreatorInfo } from './TextInputWrapper';
import { TextInputWrapper } from './TextInputWrapper';

export {
  ButtonWrapper,
  CheckboxInputWrapper,
  DateTimeInputWrapper,
  NativeSelectWrapper,
  PasswordInputWrapper,
  PhoneTextInputWrapper,
  RadioGroupInputsWrapper,
  RadioSingleInputWrapper,
  StepperWrapper,
  TextAreaInputWrapper,
  TextInputWrapper,
};

export type {
  AccessibleButtonCreatorInfo,
  AccessibleCheckboxInputCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessiblePasswordInputCreatorInfo,
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleRadioGroupInputCreatorInfo,
  AccessibleRadioSingleInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  DescriptionMap,
};
