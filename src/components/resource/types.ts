import { RoleResourceRoutePaths, StepperPage } from "../../types";
import { ResourceAction } from "./actions";

type ResourceProps = {
  stepperPages: StepperPage[];
  createResourceLink: string;
  resourceName: string;
  roleResourceRoutePaths: RoleResourceRoutePaths;
};

type ResourceState = {
  isError: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  isSuccessful: boolean;
  newQueryFlag: boolean;
  paginationsAmount: number;
  queryString: string;
  totalDocuments: number;
};

type ResourceDispatch =
  | {
      action: ResourceAction["setIsError"];
      payload: boolean;
    }
  | {
      action: ResourceAction["setIsLoading"];
      payload: boolean;
    }
  | {
      action: ResourceAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: ResourceAction["setIsSuccessful"];
      payload: boolean;
    }
  | {
      action: ResourceAction["setNewQueryFlag"];
      payload: boolean;
    }
  | {
      action: ResourceAction["setPaginationsAmount"];
      payload: number;
    }
  | {
      action: ResourceAction["setQueryString"];
      payload: string;
    }
  | {
      action: ResourceAction["setTotalDocuments"];
      payload: number;
    };

export type { ResourceDispatch, ResourceProps, ResourceState };
