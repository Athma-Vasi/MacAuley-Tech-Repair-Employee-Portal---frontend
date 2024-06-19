import { QueryProps } from "./types";
import { separateQueryInputsData } from "./utils";

function Query({
  collectionName,
  invalidValueAction,
  parentDispatch,
  stepperPages,
  validValueAction,
  disableProjection = false,
}: QueryProps) {}

export { Query };
