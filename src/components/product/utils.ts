import { FormReviewObject } from '../formReviewPage/FormReviewPage';
import { AdditionalFieldsMap } from './types';

type ReturnFormReviewObjectsFromUserDefinedFieldsInput = {
  additionalFieldsMap: Map<number, [string, string]>;
  areAdditionalFieldsValidMap: Map<number, [boolean, boolean]>;
  productCategorySimple: string;
};
/**
 * @description Returns an array of FormReviewObjects from the ${productCategory}FieldsAdditionalMap.
 * - The FormReviewObjects are used to display the user's input in the FormReviewPage.
 * @param productCategorySimple - this is not the ProductCategory type, but the simplified ProductCategory  (ex: CPU instead of Central Processing Unit (CPU))
 */
function returnFormReviewObjectsFromUserDefinedFields({
  additionalFieldsMap,
  areAdditionalFieldsValidMap,
  productCategorySimple,
}: ReturnFormReviewObjectsFromUserDefinedFieldsInput): FormReviewObject[] {
  return Array.from(additionalFieldsMap).reduce<FormReviewObject[]>(
    (formReviewObjAcc, tuple) => {
      const [index, [key, value]] = tuple;

      const keyFormReviewObject: FormReviewObject = {
        inputName: `Additional ${productCategorySimple} field ${
          index + 1
        }: key`,
        inputValue: key,
        isInputValueValid: areAdditionalFieldsValidMap.get(index)?.[0] ?? true,
      };
      formReviewObjAcc.push(keyFormReviewObject);

      const valueFormReviewObject: FormReviewObject = {
        inputName: `Additional ${productCategorySimple} field ${
          index + 1
        }: value`,
        inputValue: value,
        isInputValueValid: areAdditionalFieldsValidMap.get(index)?.[1] ?? true,
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
  return Array.from(additionalFieldsMap).reduce<Record<string, string>>(
    (acc, [_mapIdx, tuple]) => {
      const [key, value] = tuple;
      acc[key] = value;

      return acc;
    },
    Object.create(null)
  );
}

export {
  returnFormReviewObjectsFromUserDefinedFields,
  returnRequestBodyfromUserDefinedFields,
};
