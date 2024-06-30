import { RoleResourceRoutePaths, StepperPage } from "../../types";

type ResourceProps = {
  stepperPages: StepperPage[];
  createResourceLink: string;
  resourceName: string;
  roleResourceRoutePaths: RoleResourceRoutePaths;
};

type ResourceState = {
  newQueryFlag: boolean;
  /** The number of pages to display in the pagination component. */
  pages: number;
  queryString: string;
  /** The total number of documents in the database. */
  totalDocuments: number;
};
