import { Flex, Text, Title } from "@mantine/core";
import { TbStarFilled, TbStarHalfFilled } from "react-icons/tb";

import { FIELDNAMES_WITH_DATE_VALUES } from "../../constants/data";
import {
  addFieldsToObject,
  filterFieldsFromObject,
  formatDate,
  replaceLastCommaWithAnd,
} from "../../utils";

const GROUP_BY_HELP_MODAL_CONTENT = (
  <Flex direction="column" w="1005">
    <Title order={6}>How it works:</Title>
    <Flex direction="column" rowGap="xs">
      <Text>
        'Group by' allows grouping of documents based on fields that have values
        that are known beforehand (such as select, radio, or checkbox inputs).
      </Text>
      <Text>
        Each radio option corresponds to a field in the document. Upon selection
        of a field, the results displayed in the table are grouped (ascending
        order) by the field's corresponding values. Any values that are not
        present are gathered under 'Rest of constrained values'.
      </Text>
      <Text>
        This allows flexibility in sorting, as a document with many fields can
        be grouped together and then the grouped by results sorted using the
        Query Builder's sort (a sort within a sort).
      </Text>
    </Flex>
  </Flex>
);

function addFieldsToHeaderValues({
  headerValues,
  isAnonymousRequestsSectionInView,
  isCustomerSectionInView,
  isExpenseClaimSectionInView,
  isFileUploadsSectionInView,
  isProductCategorySectionInView,
  isProductReviewSectionInView,
  isPurchaseSectionInView,
  isRMASectionInView,
  isRepairTicketSectionInView,
}: {
  headerValues: string[];
  isAnonymousRequestsSectionInView: boolean;
  isCustomerSectionInView: boolean;
  isExpenseClaimSectionInView: boolean;
  isFileUploadsSectionInView: boolean;
  isProductCategorySectionInView: boolean;
  isProductReviewSectionInView: boolean;
  isPurchaseSectionInView: boolean;
  isRMASectionInView: boolean;
  isRepairTicketSectionInView: boolean;
}): string[] {
  if (isFileUploadsSectionInView) {
    return [...headerValues, "viewFile", "viewProfile", "delete"];
  }

  if (isRepairTicketSectionInView) {
    return [...headerValues, "edit", "delete"];
  }

  if (isAnonymousRequestsSectionInView) {
    return [...headerValues, "delete"];
  }

  if (isCustomerSectionInView) {
    return [...headerValues, "viewProfile", "delete"];
  }

  if (isProductReviewSectionInView) {
    return [...headerValues, "viewProfile", "delete"];
  }

  if (isProductCategorySectionInView) {
    return [...headerValues, "delete"];
  }

  if (isPurchaseSectionInView) {
    return [...headerValues, "viewProfile", "delete"];
  }

  if (isRMASectionInView) {
    return [...headerValues, "viewProfile", "delete"];
  }

  if (isExpenseClaimSectionInView) {
    return [...headerValues, "viewProfile", "fileUploads", "delete"];
  }

  return [...headerValues, "viewProfile", "delete"];
}

function addFieldsToQueryResponseObject({
  queryResponseObj,
  isRepairTicketSectionInView,
  isRMASectionInView,
  isPurchaseSectionInView,
  isProductReviewSectionInView,
  isProductCategorySectionInView,
  isFileUploadsSectionInView,
  isExpenseClaimSectionInView,
  isCustomerSectionInView,
  isAnonymousRequestsSectionInView,
}: {
  isAnonymousRequestsSectionInView: boolean;
  isCustomerSectionInView: boolean;
  isExpenseClaimSectionInView: boolean;
  isFileUploadsSectionInView: boolean;
  isProductCategorySectionInView: boolean;
  isProductReviewSectionInView: boolean;
  isPurchaseSectionInView: boolean;
  isRMASectionInView: boolean;
  isRepairTicketSectionInView: boolean;
  queryResponseObj: Record<string, any>;
}): Record<string, any> {
  if (isFileUploadsSectionInView) {
    // return addFieldsToObject({
    //   object: queryResponseObj,
    //   fieldValuesTuples: [
    //     ["viewFile", ""],
    //     ["viewProfile", ""],
    //     ["delete", ""],
    //   ],
    // });
    const fieldsAddedObject = Object.entries(queryResponseObj).reduce(
      (acc, [key, value]) => {
        if (key === "uploadedFile") {
          acc[key] = "";
        }

        acc[key] = value;

        return acc;
      },
      addFieldsToObject({
        object: queryResponseObj,
        fieldValuesTuples: [
          ["viewFile", ""],
          ["viewProfile", ""],
          ["delete", ""],
        ],
      }),
    );

    return fieldsAddedObject;
  }

  if (isRepairTicketSectionInView) {
    return addFieldsToObject({
      object: queryResponseObj,
      fieldValuesTuples: [
        ["edit", ""],
        ["delete", ""],
      ],
    });
  }

  if (isProductReviewSectionInView || isPurchaseSectionInView) {
    return addFieldsToObject({
      object: queryResponseObj,
      fieldValuesTuples: [
        ["viewProfile", ""],
        ["delete", ""],
      ],
    });
  }

  if (isRMASectionInView) {
    const fieldsRemovedObject = filterFieldsFromObject({
      object: queryResponseObj,
      fieldsToFilter: ["productCategoryDocs"],
    }) as Record<string, any>;

    return addFieldsToObject({
      object: fieldsRemovedObject,
      fieldValuesTuples: [
        ["viewProfile", ""],
        ["delete", ""],
      ],
    });
  }

  if (isAnonymousRequestsSectionInView) {
    return addFieldsToObject({
      object: queryResponseObj,
      fieldValuesTuples: [["delete", ""]],
    });
  }

  if (isProductCategorySectionInView) {
    return addFieldsToObject({
      object: queryResponseObj,
      fieldValuesTuples: [["delete", ""]],
    });
  }

  if (isCustomerSectionInView) {
    const fieldsAddedObject = Object.entries(queryResponseObj).reduce(
      (acc, [key, value], idx) => {
        if (key === "address") {
          acc[key] = "";
        }

        acc[key] = value;

        return acc;
      },
      addFieldsToObject({
        object: queryResponseObj,
        fieldValuesTuples: [
          ["viewProfile", ""],
          ["delete", ""],
        ],
      }),
    );

    return fieldsAddedObject;
  }

  if (isExpenseClaimSectionInView) {
    return addFieldsToObject({
      object: queryResponseObj,
      fieldValuesTuples: [
        ["viewProfile", ""],
        ["fileUploads", ""],
        ["delete", ""],
      ],
    });
  }

  return addFieldsToObject({
    object: queryResponseObj,
    fieldValuesTuples: [
      ["viewProfile", ""],
      ["delete", ""],
    ],
  });
}

function returnFormattedText({
  key,
  val,
  queryValuesArray,
  textHighlightColor,
}: {
  key: string;
  val: any;
  queryValuesArray: string[];
  textHighlightColor: string;
}): React.JSX.Element | React.JSX.Element[] {
  const formattedValue = val === true
    ? "Yes"
    : val === false
    ? "No"
    : Array.isArray(val)
    ? replaceLastCommaWithAnd(val.join(", "))
    : key.toLowerCase().includes("id")
    ? val
    : key === "createdAt" || key === "updatedAt"
    ? formatDate({
      date: val,
      formatOptions: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        timeZoneName: "long",
      },
      locale: "en-US",
    })
    : FIELDNAMES_WITH_DATE_VALUES.has(key)
    ? formatDate({
      date: val,
      formatOptions: {
        dateStyle: "medium",
      },
      locale: "en-US",
    })
    : val?.toString() ?? "";

  // return returnHighlightedText({
  //   textHighlightColor,
  //   fieldValue: formattedValue,
  //   queryValuesArray,
  // });

  return formattedValue;
}

const STAR_RATINGS_TO_ICONS_MAP: Record<string, JSX.Element[]> = {
  halfStar: [<TbStarHalfFilled key="halfStar1" />],
  oneStar: [<TbStarFilled key="oneStar2" />],
  oneAndHalfStars: [
    <TbStarFilled key="oneStar3" />,
    <TbStarHalfFilled key="halfStar4" />,
  ],
  twoStars: [<TbStarFilled key="twoStar5" />, <TbStarFilled key="twoStar6" />],
  twoAndHalfStars: [
    <TbStarFilled key="twoStar7" />,
    <TbStarFilled key="twoStar8" />,
    <TbStarHalfFilled key="halfStar9" />,
  ],
  threeStars: [
    <TbStarFilled key="threeStar10" />,
    <TbStarFilled key="threeStar11" />,
    <TbStarFilled key="threeStar12" />,
  ],
  threeAndHalfStars: [
    <TbStarFilled key="threeStar13" />,
    <TbStarFilled key="threeStar14" />,
    <TbStarFilled key="threeStar15" />,
    <TbStarHalfFilled key="halfStar16" />,
  ],
  fourStars: [
    <TbStarFilled key="fourStar17" />,
    <TbStarFilled key="fourStar18" />,
    <TbStarFilled key="fourStar19" />,
    <TbStarFilled key="fourStar20" />,
  ],
  fourAndHalfStars: [
    <TbStarFilled key="fourStar21" />,
    <TbStarFilled key="fourStar22" />,
    <TbStarFilled key="fourStar23" />,
    <TbStarFilled key="fourStar24" />,
    <TbStarHalfFilled key="halfStar25" />,
  ],
  fiveStars: [
    <TbStarFilled key="fiveStar26" />,
    <TbStarFilled key="fiveStar27" />,
    <TbStarFilled key="fiveStar28" />,
    <TbStarFilled key="fiveStar29" />,
    <TbStarFilled key="fiveStar30" />,
  ],
};

function returnFormattedDocValue(key: string, value: any) {
  return value === true
    ? "Yes"
    : value === false
    ? "No"
    : Array.isArray(value)
    ? replaceLastCommaWithAnd(value.join(", "))
    : typeof value === "object" && value !== null && !Array.isArray(value)
    ? ""
    : key.toLowerCase().includes("id")
    ? (value as string)
    : key === "createdAt" || key === "updatedAt"
    ? (formatDate({
      date: value,
      formatOptions: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      },
      locale: "en-US",
    }) as string)
    : FIELDNAMES_WITH_DATE_VALUES.has(key)
    ? (formatDate({
      date: value,
      formatOptions: {
        dateStyle: "short",
      },
      locale: "en-US",
    }) as string)
    : value?.toString() ?? "";
}

export {
  addFieldsToHeaderValues,
  addFieldsToQueryResponseObject,
  GROUP_BY_HELP_MODAL_CONTENT,
  returnFormattedDocValue,
  returnFormattedText,
  STAR_RATINGS_TO_ICONS_MAP,
};
