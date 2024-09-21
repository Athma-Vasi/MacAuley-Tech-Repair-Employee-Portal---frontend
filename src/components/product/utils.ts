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

function returnCreateProductPageElements(props: {
  accessoryPage: JSX.Element;
  casePage: JSX.Element;
  cpuPage: JSX.Element;
  desktopComponents: Array<ProductCategory>;
  displayPage: JSX.Element;
  firstPage: JSX.Element;
  gpuPage: JSX.Element;
  headphonePage: JSX.Element;
  keyboardPage: JSX.Element;
  microphonePage: JSX.Element;
  motherboardPage: JSX.Element;
  mousePage: JSX.Element;
  productCategory: ProductCategory;
  productCategoryPage: JSX.Element;
  psuPage: JSX.Element;
  ramPage: JSX.Element;
  speakerPage: JSX.Element;
  storagePage: JSX.Element;
  webcamPage: JSX.Element;
}) {
  const {
    accessoryPage,
    casePage,
    cpuPage,
    desktopComponents = props.desktopComponents.map((component) =>
      component.toLowerCase()
    ),
    displayPage,
    firstPage,
    gpuPage,
    headphonePage,
    keyboardPage,
    microphonePage,
    motherboardPage,
    mousePage,
    productCategory,
    productCategoryPage,
    psuPage,
    ramPage,
    speakerPage,
    storagePage,
    webcamPage,
  } = props;

  const firstTwoPages = [firstPage, productCategoryPage];

  if (productCategory === "Accessory") {
    return [...firstTwoPages, accessoryPage];
  }

  if (productCategory === "Computer Case") {
    return [...firstTwoPages, casePage];
  }

  if (productCategory === "Central Processing Unit (CPU)") {
    return [...firstTwoPages, cpuPage];
  }

  if (productCategory === "Display") {
    return [...firstTwoPages, displayPage];
  }

  if (productCategory === "Graphics Processing Unit (GPU)") {
    return [...firstTwoPages, gpuPage];
  }

  if (productCategory === "Headphone") {
    return [...firstTwoPages, headphonePage];
  }

  if (productCategory === "Keyboard") {
    return [...firstTwoPages, keyboardPage];
  }

  if (productCategory === "Microphone") {
    return [...firstTwoPages, microphonePage];
  }

  if (productCategory === "Motherboard") {
    return [...firstTwoPages, motherboardPage];
  }

  if (productCategory === "Mouse") {
    return [...firstTwoPages, mousePage];
  }

  if (productCategory === "Power Supply Unit (PSU)") {
    return [...firstTwoPages, psuPage];
  }

  if (productCategory === "Memory (RAM)") {
    return [...firstTwoPages, ramPage];
  }

  if (productCategory === "Speaker") {
    return [...firstTwoPages, speakerPage];
  }

  if (productCategory === "Storage") {
    return [...firstTwoPages, storagePage];
  }

  if (productCategory === "Webcam") {
    return [...firstTwoPages, webcamPage];
  }

  // desktop computer
  const nonJSXExcluded = Object.fromEntries(
    Object.entries(props).filter(([key]) =>
      key !== "desktopComponents" && key !== "productCategory"
    ),
  ) as Record<string, JSX.Element>;

  console.group("returnCreateProductPageElements");
  console.log("nonJSXExcluded", nonJSXExcluded);
  console.groupEnd();

  const desktopComputerPages = [
    ...firstTwoPages,
    ...Object.entries(nonJSXExcluded).reduce<Array<JSX.Element>>(
      (acc, [key, value]) => {
        if (!desktopComponents.includes(key.toLowerCase() as ProductCategory)) {
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
