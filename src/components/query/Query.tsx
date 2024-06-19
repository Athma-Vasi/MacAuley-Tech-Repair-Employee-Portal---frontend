import { QueryProps } from "./types";

function Query({
  collectionName,
  invalidValueAction,
  parentDispatch,
  stepperPages,
  validValueAction,
  disableProjection = false,
}: QueryProps) {}

export { Query };
