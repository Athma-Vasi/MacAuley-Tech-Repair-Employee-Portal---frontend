import type { StepperPage } from "../../types";
import type { ProductCategory } from "../dashboard/types";
import type { AdditionalFieldsMap } from "./types";

// type ReturnFormReviewObjectsFromUserDefinedFieldsInput = {
//   additionalFieldsMap: Map<number, [string, string]>;
//   areAdditionalFieldsValidMap: Map<number, [boolean, boolean]>;
//   productCategorySimple: string;
// };
// /**
//  * @description Returns an array of FormReviewObjects from the ${productCategory}FieldsAdditionalMap.
//  * - The FormReviewObjects are used to display the user's input in the FormReviewPage.
//  * @param productCategorySimple - this is not the ProductCategory type, but the simplified ProductCategory  (ex: CPU instead of Central Processing Unit (CPU))
//  */
// function returnFormReviewObjectsFromUserDefinedFields({
//   additionalFieldsMap,
//   areAdditionalFieldsValidMap,
//   productCategorySimple,
// }: ReturnFormReviewObjectsFromUserDefinedFieldsInput): FormReviewObject[] {
//   return Array.from(additionalFieldsMap).reduce<FormReviewObject[]>(
//     (formReviewObjAcc, tuple) => {
//       const [index, [key, value]] = tuple;

//       const keyFormReviewObject: FormReviewObject = {
//         inputName: `Additional ${productCategorySimple} field ${
//           index + 1
//         }: key`,
//         inputValue: key,
//         isInputValueValid: areAdditionalFieldsValidMap.get(index)?.[0] ?? true,
//       };
//       formReviewObjAcc.push(keyFormReviewObject);

//       const valueFormReviewObject: FormReviewObject = {
//         inputName: `Additional ${productCategorySimple} field ${
//           index + 1
//         }: value`,
//         inputValue: value,
//         isInputValueValid: areAdditionalFieldsValidMap.get(index)?.[1] ?? true,
//       };
//       formReviewObjAcc.push(valueFormReviewObject);

//       return formReviewObjAcc;
//     },
//     [],
//   );
// }

/**
 * @description Returns a Record<string, string> from the additionalFields Map.
 * - used in the 'additionalFields' field of the request body
 */
function returnRequestBodyfromUserDefinedFields(
  additionalFieldsMap: AdditionalFieldsMap,
): Record<string, string> {
  return Array.from(additionalFieldsMap).reduce<Record<string, string>>(
    (acc, [_mapIdx, tuple]) => {
      // const [key, value] = tuple;
      // acc[key] = value;

      return acc;
    },
    Object.create(null),
  );
}

function createPagesForStepper(
  { desktopComponents, productCategory, stepperPages }: {
    desktopComponents: Array<ProductCategory>;
    productCategory: ProductCategory;
    stepperPages: Array<StepperPage>;
  },
) {
  const requiredPages = new Set([
    "General product information",
    "Product Category",
    "Review",
  ]);

  if (productCategory === "Desktop Computer") {
    return stepperPages.reduce<Array<StepperPage>>((acc, page) => {
      const { description } = page;
      if (
        requiredPages.has(description) ||
        !new Set(desktopComponents).has(description as ProductCategory)
      ) {
        acc.push(page);
      }

      return acc;
    }, []);
  }

  return stepperPages.reduce<Array<StepperPage>>((acc, page) => {
    const { description } = page;
    if (
      requiredPages.has(description) ||
      description === productCategory
    ) {
      acc.push(page);
    }

    return acc;
  }, []);
}

function returnCreateProductPageElements(input: {
  Accessory: JSX.Element;
  "Computer Case": JSX.Element;
  "Central Processing Unit (CPU)": JSX.Element;
  desktopComponents: Array<ProductCategory>;
  Display: JSX.Element;
  firstPage: JSX.Element;
  "Graphics Processing Unit (GPU)": JSX.Element;
  Headphone: JSX.Element;
  Keyboard: JSX.Element;
  "Memory (RAM)": JSX.Element;
  Microphone: JSX.Element;
  Motherboard: JSX.Element;
  Mouse: JSX.Element;
  productCategory: ProductCategory;
  productCategoryPage: JSX.Element;
  "Power Supply Unit (PSU)": JSX.Element;
  Speaker: JSX.Element;
  Storage: JSX.Element;
  Webcam: JSX.Element;
}) {
  const {
    firstPage,
    desktopComponents,
    productCategory,
    productCategoryPage,
  } = input;

  const firstTwoPages = [firstPage, productCategoryPage];

  if (productCategory === "Accessory") {
    return [...firstTwoPages, input.Accessory];
  }

  if (productCategory === "Computer Case") {
    return [...firstTwoPages, input["Computer Case"]];
  }

  if (productCategory === "Central Processing Unit (CPU)") {
    return [...firstTwoPages, input["Central Processing Unit (CPU)"]];
  }

  if (productCategory === "Display") {
    return [...firstTwoPages, input.Display];
  }

  if (productCategory === "Graphics Processing Unit (GPU)") {
    return [...firstTwoPages, input["Graphics Processing Unit (GPU)"]];
  }

  if (productCategory === "Headphone") {
    return [...firstTwoPages, input.Headphone];
  }

  if (productCategory === "Keyboard") {
    return [...firstTwoPages, input.Keyboard];
  }

  if (productCategory === "Memory (RAM)") {
    return [...firstTwoPages, input["Memory (RAM)"]];
  }

  if (productCategory === "Microphone") {
    return [...firstTwoPages, input.Microphone];
  }

  if (productCategory === "Motherboard") {
    return [...firstTwoPages, input.Motherboard];
  }

  if (productCategory === "Mouse") {
    return [...firstTwoPages, input.Mouse];
  }

  if (productCategory === "Power Supply Unit (PSU)") {
    return [...firstTwoPages, input["Power Supply Unit (PSU)"]];
  }

  if (productCategory === "Speaker") {
    return [...firstTwoPages, input.Speaker];
  }

  if (productCategory === "Storage") {
    return [...firstTwoPages, input.Storage];
  }

  if (productCategory === "Webcam") {
    return [...firstTwoPages, input.Webcam];
  }

  // desktop computer
  const nonJSXExcluded = Object.fromEntries(
    Object.entries(input).filter(([key]) =>
      key !== "desktopComponents" && key !== "productCategory" &&
      key !== "firstPage" && key !== "productCategoryPage"
    ),
  ) as Record<string, JSX.Element>;

  const desktopComputerPages = [
    ...firstTwoPages,
    ...Object.entries(nonJSXExcluded).reduce<Array<JSX.Element>>(
      (acc, [key, value]) => {
        if (!desktopComponents.includes(key as ProductCategory)) {
          acc.push(value);
        }

        return acc;
      },
      [],
    ),
  ];

  return desktopComputerPages;
}

export {
  createPagesForStepper,
  returnCreateProductPageElements,
  returnRequestBodyfromUserDefinedFields,
};
