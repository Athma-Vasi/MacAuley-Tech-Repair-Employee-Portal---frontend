/**
 * This barrel index file is used to import/export types from backend and frontend
 */

/**
 * Imports
 */
import type {
  Action,
  ActionsCompany,
  ActionsGeneral,
  ActionsOutreach,
} from './actions.types';
import type { Note } from './notes.types';
import type {
  CanadianPostalCode,
  Country,
  Department,
  JobPosition,
  PhoneNumber,
  PostalCode,
  PreferredPronouns,
  Province,
  StatesUS,
  User,
  UserDocument,
  UserRoles,
  UserSchema,
  USPostalCode,
} from './user.types';

type BreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Urgency = 'low' | 'medium' | 'high';
type SetStepsInErrorPayload = {
  kind: 'add' | 'delete';
  step: number;
};
type CheckBoxMultipleData = {
  value: string;
  label: string;
}[];

export type {
  Action,
  ActionsCompany,
  ActionsGeneral,
  ActionsOutreach,
  CanadianPostalCode,
  Country,
  Department,
  JobPosition,
  PhoneNumber,
  PostalCode,
  PreferredPronouns,
  Province,
  StatesUS,
  Urgency,
  User,
  UserDocument,
  UserRoles,
  UserSchema,
  USPostalCode,
};

export type { BreakPoints, CheckBoxMultipleData, Note, SetStepsInErrorPayload };
