/**
 * This barrel index file is used to import/export types from backend and frontend
 */

/**
 * Imports
 */
import type {
  User,
  Country,
  Department,
  JobPosition,
  PhoneNumber,
  PostalCode,
  Province,
  StatesUS,
  UserRoles,
  CanadianPostalCode,
  USPostalCode,
  UserDocument,
  UserSchema,
} from './user.types';
import type { Note } from './notes.types';

type BreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type {
  User,
  Country,
  Department,
  JobPosition,
  PhoneNumber,
  PostalCode,
  Province,
  UserRoles,
  StatesUS,
  CanadianPostalCode,
  USPostalCode,
  UserDocument,
  UserSchema,
};

export type { Note, BreakPoints };
