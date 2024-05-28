import {
  DEPARTMENT_DATA,
  JOB_POSITION_DATA,
  STORE_LOCATION_DATA,
} from "../../constants/data";
import { StepperChild, StepperPage } from "../../types";
import {
  DAGRE_LAYOUT_RANKALIGN_SELECT_OPTIONS,
  DAGRE_LAYOUT_RANKDIR_SELECT_OPTIONS,
  DAGRE_LAYOUT_RANKER_SELECT_OPTIONS,
} from "../directory/constants";

/** Directory does not implement Stepper, the inputs require it however */
function returnDirectoryStepperPages(): StepperPage[] {
  const departmentChild: StepperChild = {
    inputType: "select",
    name: "department",
    selectInputData: DEPARTMENT_DATA,
  };

  const jobPositionChild: StepperChild = {
    inputType: "select",
    name: "jobPosition",
    selectInputData: JOB_POSITION_DATA,
  };

  const storeLocationChild: StepperChild = {
    inputType: "select",
    name: "storeLocation",
    selectInputData: STORE_LOCATION_DATA,
  };

  const rankerAlgorithmChild: StepperChild = {
    inputType: "select",
    name: "rankerAlgorithm",
    selectInputData: DAGRE_LAYOUT_RANKER_SELECT_OPTIONS,
  };

  const rankDirectionChild: StepperChild = {
    inputType: "select",
    name: "rankDirection",
    selectInputData: DAGRE_LAYOUT_RANKDIR_SELECT_OPTIONS,
  };

  const rankAlignmentChild: StepperChild = {
    inputType: "select",
    name: "rankAlignment",
    selectInputData: DAGRE_LAYOUT_RANKALIGN_SELECT_OPTIONS,
  };

  const nodeSeparationChild: StepperChild = {
    inputType: "slider",
    name: "nodeSeparation",
    sliderInputData: { max: 300, min: 25 },
  };

  const rankSeparationChild: StepperChild = {
    inputType: "slider",
    name: "rankSeparation",
    sliderInputData: { max: 300, min: 25 },
  };

  const minLengthChild: StepperChild = {
    inputType: "slider",
    name: "minLength",
    sliderInputData: { max: 10, min: 1 },
  };

  return [
    {
      children: [
        departmentChild,
        jobPositionChild,
        storeLocationChild,
        rankerAlgorithmChild,
        rankDirectionChild,
        rankAlignmentChild,
        nodeSeparationChild,
        rankSeparationChild,
        minLengthChild,
      ],
      description: "Directory Layout Settings",
    },
  ];
}

export { returnDirectoryStepperPages };
