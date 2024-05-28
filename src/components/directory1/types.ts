import {
  Country,
  Department,
  JobPosition,
  PhoneNumber,
  PreferredPronouns,
  Province,
  ResourceRequestServerResponse,
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
  storeLocation?: StoreLocation;
  role: UserRole;
  active: boolean;
};

type Directory1State = {
  dagreMinLen: number; // minimum edge length default: 1
  dagreNodeSep: number; // default 50
  dagreRankAlign: DagreRankAlign;
  dagreRankDir: DagreRankDir;
  dagreRankSep: number; // default 50
  dagreRanker: DagreRankerAlgorithm; // default 'network-simplex'
  department: DepartmentsWithDefaultKey;
  isLoading: boolean;
  jobPosition: JobPositionsWithDefaultKey;
  storeLocation: StoreLocationsWithDefaultKey;
};

type DagreRankDir = "TB" | "BT" | "LR" | "RL";
type DagreRankAlign = "UL" | "UR" | "DL" | "DR" | "undefined";
type DagreRankerAlgorithm = "network-simplex" | "tight-tree" | "longest-path";
type DagreLabelPos = "l" | "r" | "c";

type FetchUsersDirectoryResponse = ResourceRequestServerResponse<Directory1UserDocument>;

// default keys needed for select inputs
type DepartmentsWithDefaultKey = Department | "All Departments";
type JobPositionsWithDefaultKey = JobPosition | "All Job Positions";
type StoreLocationsWithDefaultKey = StoreLocation | "All Store Locations";

type Directory1Dispatch =
  | { action: Directory1Action["setDagreMinLen"]; payload: number }
  | {
      action: Directory1Action["setDagreNodeSep"];
      payload: number;
    }
  | {
      action: Directory1Action["setDagreRankAlign"];
      payload: DagreRankAlign;
    }
  | {
      action: Directory1Action["setDagreRankDir"];
      payload: DagreRankDir;
    }
  | {
      action: Directory1Action["setDagreRankSep"];
      payload: number;
    }
  | {
      action: Directory1Action["setDagreRanker"];
      payload: DagreRankerAlgorithm;
    }
  | {
      action: Directory1Action["setDepartment"];
      payload: DepartmentsWithDefaultKey;
    }
  | {
      action: Directory1Action["setIsLoading"];
      payload: boolean;
    }
  | {
      action: Directory1Action["setJobPosition"];
      payload: JobPositionsWithDefaultKey;
    }
  | {
      action: Directory1Action["setStoreLocation"];
      payload: StoreLocationsWithDefaultKey;
    };

export type {
  DagreLabelPos,
  DagreRankAlign,
  DagreRankDir,
  DagreRankerAlgorithm,
  DepartmentsWithDefaultKey,
  Directory1Action,
  Directory1Dispatch,
  Directory1State,
  Directory1UserDocument,
  FetchUsersDirectoryResponse,
  JobPositionsWithDefaultKey,
  StoreLocationsWithDefaultKey,
};
