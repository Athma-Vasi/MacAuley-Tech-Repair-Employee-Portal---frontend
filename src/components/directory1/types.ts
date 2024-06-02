import {
  Country,
  Department,
  JobPosition,
  PhoneNumber,
  PreferredPronouns,
  Province,
  StatesUS,
  StoreLocation,
  UserRole,
} from "../../types";
import { Directory1Action } from "./actions";

type Directory1UserDocument = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  preferredPronouns: PreferredPronouns;
  profilePictureUrl: string;
  contactNumber: PhoneNumber;
  address: {
    city: string;
    province?: Province;
    state?: StatesUS;
    country: Country;
  };
  jobPosition: JobPosition;
  department: Department;
  storeLocation: StoreLocation;
  role: UserRole;
  active: boolean;
};

type Directory1State = {
  department: DepartmentsWithDefaultKey;
  storeLocation: StoreLocationsWithDefaultKey;
};

// default keys needed for select inputs
type DepartmentsWithDefaultKey = Department | "All Departments";
type StoreLocationsWithDefaultKey = StoreLocation | "All Locations";

type Directory1Dispatch =
  | {
      action: Directory1Action["setDepartment"];
      payload: DepartmentsWithDefaultKey;
    }
  | {
      action: Directory1Action["setStoreLocation"];
      payload: StoreLocationsWithDefaultKey;
    };

export type {
  DepartmentsWithDefaultKey,
  Directory1Action,
  Directory1Dispatch,
  Directory1State,
  Directory1UserDocument,
  StoreLocationsWithDefaultKey,
};
