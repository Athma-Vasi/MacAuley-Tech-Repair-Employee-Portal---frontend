import { InputType, StepperPage } from "../../types";
import { splitCamelCase } from "../../utils";

type NameValueData = {
  inputName: Array<{
    label: string;
    value: string;
  }>; // select | checkbox input data, rest are empty
};

type QueryInputsData = [
  Array<NameValueData>, // filterSelectData
  Array<NameValueData>, // projectionCheckboxData
  Array<NameValueData>, // searchSelectData
  Array<NameValueData> // sortSelectData
];

/**
 * - Extracts the names of the inputs from the stepper pages and used in the corresponding input data
 */
function separateQueryInputsData(stepperPages: StepperPage[]): QueryInputsData {
  // these input types can have filter operators applied to them
  const filterInputsTypeSet = new Set<InputType>([
    "boolean", // in
    "date", // equal to, less than, greater than, greater than or equal to, less than or equal to
    "number", // same as date
    "select", // in
    "time", // same as date
  ]);
  const projectionInputSet = new Set<InputType>(["checkbox"]); // can apply projection: exclusion | inclusion
  const searchInputSet = new Set<InputType>(["text"]); // can apply search
  const sortInputsSet = new Set<InputType>(["date", "number"]); // can apply sort

  return stepperPages.reduce<QueryInputsData>(
    (acc, page) => {
      const [
        filterSelectDataAcc,
        projectionCheckboxDataAcc,
        searchSelectDataAcc,
        sortSelectDataAcc,
      ] = acc;

      page.children.forEach((child) => {
        const {
          inputType,
          name,
          checkboxInputData,
          isRequired,
          selectInputData,
          sliderInputData,
          validationKey,
        } = child;

        const splitName = splitCamelCase(name);
        // const nameValueData: NameValueData = {
        //   inputName:
        //     inputType === "select"
        //       ? selectInputData
        //         ? [...selectInputData]
        //         : []
        //       : inputType === "checkbox"
        //       ? checkboxInputData
        //         ? [...checkboxInputData]
        //         : []
        //       : [],
        // };

        // filterInputsTypeSet.has(inputType)
        //   ? filterSelectDataAcc.push(nameValueData)
        //   : projectionInputSet.has(inputType)
        //   ? projectionCheckboxDataAcc.push(nameValueData)
        //   : searchInputSet.has(inputType)
        //   ? searchSelectDataAcc.push(nameValueData)
        //   : sortInputsSet.has(inputType)
        //   ? sortSelectDataAcc.push(nameValueData)
        //   : void 0;
      });

      return acc;
    },
    [[], [], [], []]
  );
}

export {};

/**
 * switch (inputType) {
          case "select": {
            if (selectInputData) {
              filterSelectDataAcc.push(splitName);
            }
            break;
          }
          case "checkbox": {
            if (checkboxInputData) {
              projectionCheckboxDataAcc.push(splitName);
            }
            break;
          }
          case "text": {
            searchSelectDataAcc.push(splitName);
          }
        }
 */
