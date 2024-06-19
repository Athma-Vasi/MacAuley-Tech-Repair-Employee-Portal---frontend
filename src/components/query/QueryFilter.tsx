import { ValidationKey } from "../../constants/validations";
import { CheckboxRadioSelectData, SetPageInErrorPayload } from "../../types";

type QueryFilterProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  fieldNamesOperatorsMap: Map<string, CheckboxRadioSelectData>;
  filterFieldSelectInputData: CheckboxRadioSelectData;
  invalidValueAction: InvalidValueAction;
  parentDispatch: React.Dispatch<
    | {
        action: ValidValueAction;
        payload: {
          index: number;
          action: "add" | "delete";
          value: [string, string, string];
        };
      }
    | {
        action: InvalidValueAction;
        payload: SetPageInErrorPayload;
      }
  >;
  projectedFieldsSet: Set<string>;
  selectInputsDataMap: Map<string, CheckboxRadioSelectData>;
  validatedInputsKeyMap: Map<string, ValidationKey>;
  validValueAction: ValidValueAction;
};

function QueryFilter<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({
  fieldNamesOperatorsMap,
  filterFieldSelectInputData,
  invalidValueAction,
  parentDispatch,
  projectedFieldsSet,
  validValueAction,
}: QueryFilterProps<ValidValueAction, InvalidValueAction>) {
  // const fieldSelectInput = <AccessibleSelectInput attributes={{
  //     data:Object.keys(filterSelectData).map((key) => {
  //         return { label: splitCamelCase(key), value: key };
  //     }),
  //     name: "field",
  //     parentDispatch,
  //     validValueAction,
  // }} />;
}

export { QueryFilter };
