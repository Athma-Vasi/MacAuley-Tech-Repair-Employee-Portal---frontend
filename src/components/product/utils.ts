import { FormReviewObject } from '../formReviewPage/FormReviewPage';
import { AdditionalFieldsMap } from './types';

/**
 * @description Returns an array of FormReviewObjects from the additionalFields Map.
 * - The FormReviewObjects are used to display the user's input in the FormReviewPage.
 */
function returnFormReviewObjectsFromUserDefinedFields({
  additionalFields,
  areAdditionalFieldsValid,
}: {
  additionalFields: Map<number, [string, string]>;
  areAdditionalFieldsValid: Map<number, [boolean, boolean]>;
}): FormReviewObject[] {
  return Array.from(additionalFields).reduce<FormReviewObject[]>(
    (formReviewObjAcc, tuple) => {
      const [index, [key, value]] = tuple;

      const keyFormReviewObject: FormReviewObject = {
        inputName: `Additional field ${index + 1}: key`,
        inputValue: key,
        isInputValueValid: areAdditionalFieldsValid.get(index)?.[0] ?? true,
      };
      formReviewObjAcc.push(keyFormReviewObject);

      const valueFormReviewObject: FormReviewObject = {
        inputName: `Additional field ${index + 1}: value`,
        inputValue: value,
        isInputValueValid: areAdditionalFieldsValid.get(index)?.[1] ?? true,
      };
      formReviewObjAcc.push(valueFormReviewObject);

      return formReviewObjAcc;
    },
    []
  );
}

/**
 * @description Returns a Record<string, string> from the additionalFields Map.
 * - used in the 'additionalFields' field of the request body
 */
function returnRequestBodyfromUserDefinedFields(
  additionalFieldsMap: AdditionalFieldsMap
): Record<string, string> {
  return Array.from(additionalFieldsMap).reduce((acc, [key, tuple]) => {
    const [field, value] = tuple;
    acc[field] = value;

    return acc;
  }, Object.create(null));
}

export {
  returnFormReviewObjectsFromUserDefinedFields,
  returnRequestBodyfromUserDefinedFields,
};
