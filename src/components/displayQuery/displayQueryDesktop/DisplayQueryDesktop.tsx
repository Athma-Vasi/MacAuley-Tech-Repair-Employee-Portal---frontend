function DisplayQueryDesktop() {
  return null;
}

export default DisplayQueryDesktop;

/**
import {
  Center,
  Flex,
  Grid,
  Group,
  Highlight,
  HoverCard,
  Loader,
  LoadingOverlay,
  Modal,
  ScrollArea,
  Space,
  Stack,
  Table,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CSSProperties, useEffect, useReducer } from "react";
import { IoMdOpen } from "react-icons/io";
import { LiaAddressBook, LiaExpandArrowsAltSolid } from "react-icons/lia";
import {
  TbEdit,
  TbStars,
  TbStatusChange,
  TbTrash,
  TbUserSearch,
} from "react-icons/tb";
import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";

import {
  COLORS_SWATCHES,
  FIELDNAMES_WITH_DATE_VALUES,
} from "../../../constants/data";
import { useAuth, useGlobalState } from "../../../hooks";
import {
  returnAccessibleButtonElements,
  returnHighlightedText,
  returnScrollableDocumentInfo,
} from "../../../jsxCreators";
import { FileUploadDocument } from "../../../types";
import {
  formatDate,
  logState,
  returnThemeColors,
  splitCamelCase,
} from "../../../utils";
import { FormLayoutWrapper } from "../../wrappers";
import EditRepairTicket from "../editRepairTicket/EditRepairTicket";
import { ProfileInfo } from "../profileInfo/ProfileInfo";
import UpdateRequestStatus from "../updateRequestStatus/UpdateRequestStatus";
import {
  addFieldsToHeaderValues,
  addFieldsToQueryResponseObject,
  returnFormattedDocValue,
  STAR_RATINGS_TO_ICONS_MAP,
} from "../utils";
import { HEADER_EXCLUSION_SET } from "./constants";
import {
  displayQueryDesktopAction,
  displayQueryDesktopReducer,
  initialDisplayQueryDesktopState,
} from "./state";
import { DisplayQueryDesktopProps } from "./types";
import {
  returnWhichResourceInView,
  sortGroupedByQueryResponseData,
} from "./utils";

function DisplayQueryDesktop({
  componentQueryData,
  deleteFormIdDispatch,
  deleteResourceKindDispatch,
  fileUploadsData = [],
  groupByRadioData,
  groupBySelection,
  groupedByQueryResponseData,
  isLoading,
  loadingMessage = "",
  openDeleteAcknowledge,
  openFileUploads,
  queryValuesArray,
  requestStatusDispatch,
  setFileUploadsForAFormDispatch,
  style = {},
}: DisplayQueryDesktopProps) {
  const [displayQueryDesktopState, displayQueryDesktopDispatch] = useReducer(
    displayQueryDesktopReducer,
    initialDisplayQueryDesktopState,
  );
  const {
    currentDocumentId,
    currentRequestStatus,
    editRepairTicketInput,
    employeeDocument,
    fieldToSortBy,
    sortDirection,
    customerDocument,
  } = displayQueryDesktopState;

  const {
    globalState: { width, padding, rowGap, themeObject },
  } = useGlobalState();

  const {
    authState: { roles },
  } = useAuth();

  const [
    openedUpdateRequestStatusModal,
    {
      open: openUpdateRequestStatusModal,
      close: closeUpdateRequestStatusModal,
    },
  ] = useDisclosure(false);

  // for repair note fields update only
  const [
    openedEditRepairTicketsModal,
    { open: openEditRepairTicketsModal, close: closeEditRepairTicketsModal },
  ] = useDisclosure(false);

  const [
    openedProfileInfoModal,
    { open: openProfileInfoModal, close: closeProfileInfoModal },
  ] = useDisclosure(false);

  // for product category section only
  const [
    openedAdditionalFieldsModal,
    { open: openAdditionalFieldsModal, close: closeAdditionalFieldsModal },
  ] = useDisclosure(false);
  const [
    openedViewStarRatingsModal,
    { open: openViewStarRatingsModal, close: closeViewStarRatingsModal },
  ] = useDisclosure(false);

  // for purchase section only
  const [
    openedViewPurchasesModal,
    { open: openViewPurchasesModal, close: closeViewPurchasesModal },
  ] = useDisclosure(false);
  const [
    openedShippingAddressModal,
    { open: openShippingAddressModal, close: closeShippingAddressModal },
  ] = useDisclosure(false);

  // for customer section only
  const [
    openedPersonalAddressModal,
    { open: openPersonalAddressModal, close: closePersonalAddressModal },
  ] = useDisclosure(false);

  // for file uploads section only
  const [
    openedFileUploadsModal,
    { open: openFileUploadsModal, close: closeFileUploadsModal },
  ] = useDisclosure(false);

  useEffect(() => {
    logState({
      state: displayQueryDesktopState,
      groupLabel: "displayQueryDesktopState",
    });
  }, [displayQueryDesktopState]);

  const {
    appThemeColors: { backgroundColor, borderColor },
    generalColors: { themeColorShade },
    scrollBarStyle,
    tablesThemeColors: {
      headerBorderColor,
      headersIconColor,
      rowsBorderColor,
      tableHeadersBgColor,
      textHighlightColor,
    },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  const {
    isAnonymousRequestsSectionInView,
    isCustomerSectionInView,
    isExpenseClaimSectionInView,
    isFileUploadsSectionInView,
    isProductCategorySectionInView,
    isProductReviewSectionInView,
    isPurchaseSectionInView,
    isRMASectionInView,
    isRepairTicketSectionInView,
  } = returnWhichResourceInView(groupedByQueryResponseData);

  // the data received is in a Map grouped by a field, header values are created separately to avoid creating multiple tables
  const tableHeaderValuesArr = groupedByQueryResponseData.size > 0
    ? Array.from(groupedByQueryResponseData).map(
      ([_groupedByFieldKey, queryResponseObjArrays]) => {
        const headerValuesSet = queryResponseObjArrays.reduce<Set<string>>(
          (acc, queryResponseObj) => {
            Object.keys(queryResponseObj).forEach((key) =>
              key === "productCategoryDocs" || key === "uploadedFile"
                ? acc
                : acc.add(key)
            );

            return acc;
          },
          new Set<string>(),
        );

        console.log("Header Values Set:", headerValuesSet);

        const headerValues = Array.from(headerValuesSet);

        const headerValuesWithFieldsInserted = addFieldsToHeaderValues({
          headerValues,
          isAnonymousRequestsSectionInView,
          isCustomerSectionInView,
          isExpenseClaimSectionInView,
          isProductCategorySectionInView,
          isProductReviewSectionInView,
          isPurchaseSectionInView,
          isRMASectionInView,
          isFileUploadsSectionInView,
          isRepairTicketSectionInView,
        });

        return headerValuesWithFieldsInserted;
      },
    )[0]
    : [];

  console.log("Table Header Values:", tableHeaderValuesArr);

  const groupByRadioDataLabels = new Set(
    groupByRadioData.map(({ label }) => label.toLowerCase()),
  );

  // filtering out grouped by data fields to allow sorting on non-grouped by fields (the grouped by field is already sorted)
  const headerValuesToGetSortArrows = tableHeaderValuesArr.reduce(
    (filteredHeaderValsAcc: string[], headerVal) => {
      // ignore any header values present in group by radio data
      if (
        groupByRadioDataLabels.has(headerVal.toLowerCase()) ||
        HEADER_EXCLUSION_SET.has(headerVal.toLowerCase())
      ) {
        return filteredHeaderValsAcc;
      }

      filteredHeaderValsAcc.push(headerVal);

      return filteredHeaderValsAcc;
    },
    [],
  );

  const sortedQueryResponseData = sortGroupedByQueryResponseData({
    componentQueryData,
    groupedByQueryResponseData,
    fieldToSortBy,
    sortDirection,
  });

  const displayLoadingOverlay = (
    <LoadingOverlay
      visible={isLoading}
      zIndex={500}
      overlayBlur={9}
      // overlayOpacity={0.99}
      radius={4}
      loader={
        <Stack align="center">
          <Text>{loadingMessage}</Text>
          <Loader />
        </Stack>
      }
    />
  );

  const displayTableHeader = (
    <thead
      style={{
        borderRadius: 4,
        position: "sticky",
        top: 0,
        zIndex: 3,
        height: 35,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <tr>
        {tableHeaderValuesArr.map((headerValue, headerIdx) => {
          const headerStyle: CSSProperties = {
            border: headerBorderColor,
            // borderRight: '1px solid transparent',
            backgroundColor: tableHeadersBgColor,
            padding: "4px 4px 4px 8px",
          };
          const headerGroupStyle: CSSProperties = {
            width: headerValue === "_id"
              ? "Document Id".length * 10 + 70
              : headerValue
              ? headerValue.length * 10 + 70
              : 150, // rough ch plus space for sort arrows
            backgroundColor: tableHeadersBgColor,
          };

          const ascendingIconColor =
            headerValue === fieldToSortBy && sortDirection === "asc"
              ? themeColorShade // on
              : headersIconColor; // off

          const ascendingIconWithTooltip = (
            <Tooltip
              label={`Sort ${headerValue} within ${
                splitCamelCase(
                  groupBySelection,
                )
              } in ascending order`}
            >
              <Group>
                <TiArrowUpThick
                  color={ascendingIconColor}
                  style={{ cursor: "pointer" }}
                  size={17}
                  onClick={() => {
                    displayQueryDesktopDispatch({
                      type: displayQueryDesktopAction.setFieldToSortBy,
                      payload: headerValue,
                    });
                    displayQueryDesktopDispatch({
                      type: displayQueryDesktopAction.setSortDirection,
                      payload: "asc",
                    });
                  }}
                />
              </Group>
            </Tooltip>
          );

          const descendingIconColor =
            headerValue === fieldToSortBy && sortDirection === "desc"
              ? themeColorShade // on
              : headersIconColor; // off

          const descendingIconWithTooltip = (
            <Tooltip
              label={`Sort ${headerValue} within ${
                splitCamelCase(
                  groupBySelection,
                )
              } in descending order`}
            >
              <Group>
                <TiArrowDownThick
                  color={descendingIconColor}
                  style={{ cursor: "pointer" }}
                  size={17}
                  onClick={() => {
                    displayQueryDesktopDispatch({
                      type: displayQueryDesktopAction.setFieldToSortBy,
                      payload: headerValue,
                    });
                    displayQueryDesktopDispatch({
                      type: displayQueryDesktopAction.setSortDirection,
                      payload: "desc",
                    });
                  }}
                />
              </Group>
            </Tooltip>
          );

          const headerRowWithSortArrows = headerValuesToGetSortArrows.includes(
              headerValue,
            )
            ? (
              <Group style={headerGroupStyle} position="center">
                {ascendingIconWithTooltip}
                <Title order={6}>
                  {headerValue === "_id"
                    ? "Document Id"
                    : splitCamelCase(headerValue)}
                </Title>
                {descendingIconWithTooltip}
              </Group>
            )
            : (
              <Group style={headerGroupStyle} position="center">
                <Title order={6}>
                  {headerValue === "_id"
                    ? "Document Id"
                    : splitCamelCase(headerValue)}
                </Title>
              </Group>
            );

          const displayHeaderRows = (
            <th key={`${headerIdx}`} style={headerStyle}>
              {headerRowWithSortArrows}
            </th>
          );

          return displayHeaderRows;
        })}
      </tr>
    </thead>
  );

  const displayTableBody = Array.from(sortedQueryResponseData).map(
    ([_groupedByFieldKey, queryResponseObjArrays], sectionIdx) => {
      return (
        <tbody>
          {queryResponseObjArrays.map((queryResponseObj, objIdx) => {
            const queryResponseObjWithAddedFields =
              addFieldsToQueryResponseObject({
                isAnonymousRequestsSectionInView,
                isCustomerSectionInView,
                isExpenseClaimSectionInView,
                isFileUploadsSectionInView,
                isProductCategorySectionInView,
                isProductReviewSectionInView,
                isPurchaseSectionInView,
                isRMASectionInView,
                isRepairTicketSectionInView,
                queryResponseObj,
              });

            const rowWithStringifiedValues = (
              <tr key={`${objIdx}`} style={{ borderBottom: rowsBorderColor }}>
                {Object.entries(queryResponseObjWithAddedFields)
                  .filter(([key, _val]) =>
                    key !== "productCategoryDocs"
                  )
                  .filter(([key, _val]) => key !== "uploadedFile")
                  .map(([key, value], keyValIdx) => {
                    const formattedValue = value === null || value === undefined
                      ? ""
                      : returnFormattedDocValue(key, value);

                    const sliceLength = 23;
                    const formattedValueSliced =
                      formattedValue?.length > sliceLength
                        ? `${
                          formattedValue
                            .toString()
                            .slice(
                              0,
                              key.toLowerCase().includes("id")
                                ? 11
                                : sliceLength,
                            )
                        }...`
                        : (formattedValue as string);

                    // regex to determine if formattedValue has any terms in queryValuesArray
                    const regex = queryValuesArray?.length
                      ? new RegExp(
                        queryValuesArray
                          .filter((value) => value) // remove empty strings
                          .flatMap((value) => value.split(" "))
                          .join("|"),
                        "gi",
                      )
                      : null;

                    // highlight text if formattedValue has any terms that were either filtered/searched for (queryValuesArray)
                    const highlightedText = regex
                      ? (
                        formattedValue.match(regex)
                          ? (
                            <Highlight
                              highlight={formattedValueSliced}
                              highlightStyles={{
                                backgroundColor: textHighlightColor,
                              }}
                            >
                              {formattedValueSliced}
                            </Highlight>
                          )
                          : <Text>{formattedValueSliced}</Text>
                      )
                      : <Text>{formattedValueSliced}</Text>;

                    const groupBySelectionValue =
                      queryResponseObjWithAddedFields[groupBySelection];

                    const groupedBySelectedValueHighlightedText =
                      returnHighlightedText({
                        textHighlightColor,
                        queryValuesArray,
                        fieldValue: groupBySelectionValue,
                      });

                    const displayDropdownAccordion =
                      returnScrollableDocumentInfo({
                        borderColor,
                        document: queryResponseObjWithAddedFields,
                        excludeKeys: [
                          "fileUploads",
                          "uploadedFile",
                          "edit",
                          "delete",
                          "viewProfile",
                          "viewReviews",
                          "viewFile",
                          groupBySelection,
                        ],
                        fieldNamesWithDateValues: FIELDNAMES_WITH_DATE_VALUES,
                        queryValuesArray,
                        rowGap,
                        scrollBarStyle,
                        textHighlightColor,
                      });

                    const dropDownFooter = (
                      <Flex wrap="wrap">
                        {groupBySelection === "none"
                          ? null
                          : (
                            <Group pb={padding}>
                              <Text>{splitCamelCase(groupBySelection)}:</Text>

                              <Flex gap={4} wrap="wrap">
                                <strong>
                                  {groupedBySelectedValueHighlightedText}
                                </strong>
                              </Flex>
                              <Space w="xs" />
                            </Group>
                          )}

                        <Space h="xs" />

                        <Stack>{displayDropdownAccordion}</Stack>
                      </Flex>
                    );

                    const footerHighlightedText = returnHighlightedText({
                      textHighlightColor,
                      queryValuesArray,
                      fieldValue: formattedValue,
                    });

                    const truncatedValuesWithHoverCards =
                      FIELDNAMES_WITH_DATE_VALUES.has(
                          key,
                        )
                        ? (
                          <HoverCard
                            width={500}
                            shadow="lg"
                            openDelay={150}
                            closeDelay={50}
                            withArrow
                          >
                            <HoverCard.Target>
                              <Text>{formattedValue}</Text>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                              <Stack>
                                <Group>
                                  <Text>{splitCamelCase(key)}:</Text>
                                  <Text>
                                    {formatDate({
                                      date: value,
                                      formatOptions: {
                                        dateStyle: "full",
                                        localeMatcher: "best fit",
                                        formatMatcher: "best fit",
                                      },
                                      locale: "en-US",
                                    })}
                                  </Text>
                                </Group>
                                {dropDownFooter}
                              </Stack>
                            </HoverCard.Dropdown>
                          </HoverCard>
                        )
                        : key === "createdAt" || key === "updatedAt"
                        ? (
                          <HoverCard
                            width={500}
                            shadow="lg"
                            openDelay={150}
                            closeDelay={50}
                            withArrow
                          >
                            <HoverCard.Target>
                              <Text>{formattedValue}</Text>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                              <Flex wrap="wrap" rowGap={rowGap}>
                                <Text>{splitCamelCase(key)}:</Text>
                                <Space w="xs" />
                                <Text>
                                  {formatDate({
                                    date: value,
                                    formatOptions: {
                                      dateStyle: "full",
                                      timeStyle: "long",
                                      hour12: false,
                                    },
                                    locale: "en-US",
                                  })}
                                </Text>
                                {dropDownFooter}
                              </Flex>
                            </HoverCard.Dropdown>
                          </HoverCard>
                        )
                        : (
                          <HoverCard
                            width={500}
                            shadow="lg"
                            openDelay={150}
                            closeDelay={50}
                            withArrow
                          >
                            <HoverCard.Target>
                              <Group>{highlightedText}</Group>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                              <Stack>
                                {
                                  <Flex w="100%" wrap="wrap" gap="xs">
                                    {key === "_id"
                                      ? <Text>{"Document Id"}:</Text>
                                      : <Text>{splitCamelCase(key)}:</Text>}

                                    <Flex gap={4} wrap="wrap" pl={padding}>
                                      {footerHighlightedText}
                                    </Flex>
                                  </Flex>
                                }
                                {dropDownFooter}
                              </Stack>
                            </HoverCard.Dropdown>
                          </HoverCard>
                        );

                    // only when user views repair notes section
                    const [createdRepairTicketEditButton] =
                      isRepairTicketSectionInView
                        ? returnAccessibleButtonElements([
                          {
                            buttonLabel: <TbEdit />,
                            semanticDescription:
                              `Modify ${key} for username: ${queryResponseObjWithAddedFields.username} and form with id: ${queryResponseObjWithAddedFields._id}`,
                            semanticName: `Modify ${key}`,
                            buttonOnClick: () => {
                              displayQueryDesktopDispatch({
                                type: displayQueryDesktopAction
                                  .setEditRepairTicketInput,
                                payload: {
                                  repairTicketFormId:
                                    queryResponseObjWithAddedFields._id,
                                  repairNotes:
                                    queryResponseObjWithAddedFields.repairNotes,
                                  testingResults:
                                    queryResponseObjWithAddedFields
                                      .testingResults,
                                  finalRepairCost:
                                    queryResponseObjWithAddedFields
                                      .finalRepairCost,
                                  finalRepairCostCurrency:
                                    queryResponseObjWithAddedFields
                                      .finalRepairCostCurrency,
                                  repairStatus: queryResponseObjWithAddedFields
                                    .repairStatus,
                                },
                              });

                              openEditRepairTicketsModal();
                            },
                          },
                        ])
                        : [null];

                    const displayRepairTicketEditButton =
                      createdRepairTicketEditButton
                        ? (
                          <Tooltip
                            label={`Edit repair note for ${
                              queryResponseObjWithAddedFields.customerName ??
                                queryResponseObjWithAddedFields._id
                            }`}
                          >
                            <Group>{createdRepairTicketEditButton}</Group>
                          </Tooltip>
                        )
                        : null;

                    // only when viewing product category section
                    const [createdViewAdditionalFieldsButton] =
                      isProductCategorySectionInView
                        ? returnAccessibleButtonElements([
                          {
                            buttonLabel: <LiaExpandArrowsAltSolid />,
                            semanticDescription:
                              `View additional fields for product with id: ${queryResponseObjWithAddedFields._id}`,
                            semanticName: "View additional fields",
                            buttonOnClick: () => {
                              displayQueryDesktopDispatch({
                                type: displayQueryDesktopAction
                                  .setCurrentDocumentId,
                                payload: queryResponseObjWithAddedFields._id,
                              });

                              openAdditionalFieldsModal();
                            },
                          },
                        ])
                        : [null];

                    const displayViewAdditionalFieldsButton =
                      createdViewAdditionalFieldsButton
                        ? (
                          <Tooltip
                            label={`View additional fields for product with id: ${queryResponseObjWithAddedFields._id}`}
                          >
                            <Group>{createdViewAdditionalFieldsButton}</Group>
                          </Tooltip>
                        )
                        : null;

                    // only when viewing product category section
                    const [viewStarRatingsButton] =
                      isProductCategorySectionInView
                        ? returnAccessibleButtonElements([
                          {
                            buttonLabel: <TbStars />,
                            semanticDescription:
                              `View reviews for product with id: ${queryResponseObjWithAddedFields._id}`,
                            semanticName: "View reviews",
                            buttonOnClick: () => {
                              displayQueryDesktopDispatch({
                                type: displayQueryDesktopAction
                                  .setCurrentDocumentId,
                                payload: queryResponseObjWithAddedFields._id,
                              });

                              openViewStarRatingsModal();
                            },
                          },
                        ])
                        : [null];

                    const displayViewStarRatingsButton = viewStarRatingsButton
                      ? (
                        <Tooltip
                          label={`View reviews for product with id: ${queryResponseObjWithAddedFields._id}`}
                        >
                          <Group>{viewStarRatingsButton}</Group>
                        </Tooltip>
                      )
                      : null;

                    // only when viewing purchase section
                    const [viewPurchasesModalButton] = isPurchaseSectionInView
                      ? returnAccessibleButtonElements([
                        {
                          buttonLabel: <LiaExpandArrowsAltSolid />,
                          semanticDescription:
                            `View purchase details for customer with id: ${queryResponseObjWithAddedFields.customerId}`,
                          semanticName: "View purchase details",
                          buttonOnClick: () => {
                            displayQueryDesktopDispatch({
                              type:
                                displayQueryDesktopAction.setCurrentDocumentId,
                              payload: queryResponseObjWithAddedFields._id,
                            });

                            openViewPurchasesModal();
                          },
                        },
                      ])
                      : [null];

                    const displayViewPurchasesModalButton =
                      viewPurchasesModalButton
                        ? (
                          <Tooltip
                            label={`View purchase details for customer with id: ${queryResponseObjWithAddedFields.customerId}`}
                          >
                            <Group>{viewPurchasesModalButton}</Group>
                          </Tooltip>
                        )
                        : null;

                    // only when viewing purchase section
                    const [viewShippingAddressModalButton] =
                      isPurchaseSectionInView
                        ? returnAccessibleButtonElements([
                          {
                            buttonLabel: <LiaAddressBook />,
                            semanticDescription:
                              `View shipping address for customer with id: ${queryResponseObjWithAddedFields.customerId}`,
                            semanticName: "View shipping address",
                            buttonOnClick: () => {
                              displayQueryDesktopDispatch({
                                type: displayQueryDesktopAction
                                  .setCurrentDocumentId,
                                payload: queryResponseObjWithAddedFields._id,
                              });

                              openShippingAddressModal();
                            },
                          },
                        ])
                        : [null];

                    const displayShippingAddressModalButton =
                      viewShippingAddressModalButton
                        ? (
                          <Tooltip
                            label={`View shipping address for customer with id: ${queryResponseObjWithAddedFields.customerId}`}
                          >
                            <Group>{viewShippingAddressModalButton}</Group>
                          </Tooltip>
                        )
                        : null;

                    // only when viewing customer section
                    const [viewPersonalAddressModalButton] =
                      isCustomerSectionInView
                        ? returnAccessibleButtonElements([
                          {
                            buttonLabel: <LiaAddressBook />,
                            semanticDescription:
                              `View personal address for username: ${queryResponseObjWithAddedFields.username}`,
                            semanticName: "View personal address",
                            buttonOnClick: () => {
                              displayQueryDesktopDispatch({
                                type: displayQueryDesktopAction
                                  .setCurrentDocumentId,
                                payload: queryResponseObjWithAddedFields._id,
                              });

                              openPersonalAddressModal();
                            },
                          },
                        ])
                        : [null];

                    const displayPersonalAddressModalButton =
                      viewPersonalAddressModalButton
                        ? (
                          <Tooltip
                            label={`View personal address for username: ${queryResponseObjWithAddedFields.username}`}
                          >
                            <Group>{viewPersonalAddressModalButton}</Group>
                          </Tooltip>
                        )
                        : null;

                    // only when viewing file uploads section
                    const [createdViewFilesModalButton] =
                      isFileUploadsSectionInView
                        ? returnAccessibleButtonElements([
                          {
                            buttonLabel: <IoMdOpen />,
                            semanticDescription: "View Files",
                            semanticName: "Open file uploads modal",
                            buttonOnClick: () => {
                              setFileUploadsForAFormDispatch({
                                type: "setFileUploadsForAForm",
                                payload: [
                                  queryResponseObjWithAddedFields as FileUploadDocument,
                                ],
                              });
                              deleteFormIdDispatch({
                                type: "setDeleteFormId",
                                payload: queryResponseObjWithAddedFields._id,
                              });

                              openFileUploads();
                            },
                          },
                        ])
                        : [null];

                    const displayViewFilesModalButton =
                      createdViewFilesModalButton
                        ? (
                          <Tooltip
                            label={`View file uploads belonging to username: ${queryResponseObjWithAddedFields.username} with form id: ${queryResponseObjWithAddedFields._id}`}
                          >
                            <Group>{createdViewFilesModalButton}</Group>
                          </Tooltip>
                        )
                        : null;

                    const [
                      createdUpdateRequestStatusButton,
                      createdViewProfileButton,
                      createdDeleteFormButton,
                      createdOpenFileUploadsModalButton,
                    ] = returnAccessibleButtonElements([
                      // update request status button
                      {
                        buttonLabel: <TbStatusChange />,
                        semanticDescription:
                          `Modify current request status of ${queryResponseObjWithAddedFields.requestStatus} for username: ${queryResponseObjWithAddedFields.username} and form with id: ${queryResponseObjWithAddedFields._id}`,
                        semanticName: "Update request status",
                        buttonOnClick: () => {
                          displayQueryDesktopDispatch({
                            type:
                              displayQueryDesktopAction.setCurrentDocumentId,
                            payload: queryResponseObjWithAddedFields._id,
                          });

                          displayQueryDesktopDispatch({
                            type:
                              displayQueryDesktopAction.setCurrentRequestStatus,
                            payload:
                              queryResponseObjWithAddedFields.requestStatus,
                          });

                          openUpdateRequestStatusModal();
                        },
                      },
                      // view profile button
                      {
                        buttonLabel: <TbUserSearch />,
                        semanticDescription:
                          `View profile of username: ${queryResponseObjWithAddedFields.username}`,
                        semanticName: "View profile",
                        buttonOnClick: () => {
                          // isProductReviewSectionInView
                          //   ? displayQueryDesktopDispatch({
                          //     type:
                          //       displayQueryDesktopAction.setCustomerDocument,
                          //     payload: actionsDocuments?.customerData?.find(
                          //       (customer) =>
                          //         customer.username ===
                          //           queryResponseObjWithAddedFields.username,
                          //     ) ??
                          //       ({} as Omit<
                          //         CustomerDocument,
                          //         "password" | "paymentInformation"
                          //       >),
                          //   })
                          //   : isPurchaseSectionInView || isRMASectionInView
                          //   ? displayQueryDesktopDispatch({
                          //     type:
                          //       displayQueryDesktopAction.setCustomerDocument,
                          //     payload: actionsDocuments?.customerData?.find(
                          //       (customer) =>
                          //         customer._id ===
                          //           queryResponseObjWithAddedFields.customerId,
                          //     ) ??
                          //       ({} as Omit<
                          //         CustomerDocument,
                          //         "password" | "paymentInformation"
                          //       >),
                          //   })
                          //   : displayQueryDesktopDispatch({
                          //     type:
                          //       displayQueryDesktopAction.setEmployeeDocument,
                          //     payload: isCustomerSectionInView
                          //       ? (queryResponseObj as UserDocument)
                          //       : (Array.from(
                          //         actionsDocuments?.employeeData ?? new Map(),
                          //       ).find(
                          //         ([_key, value]) =>
                          //           value._id ===
                          //             queryResponseObjWithAddedFields.userId ||
                          //           queryResponseObjWithAddedFields
                          //             .benefitUserId,
                          //       )?.[1] as UserDocument),
                          //   });

                          openProfileInfoModal();
                        },
                      },
                      // delete button
                      {
                        buttonLabel: <TbTrash />,
                        semanticDescription:
                          `Delete form with id: ${queryResponseObjWithAddedFields._id} belonging to username: ${queryResponseObjWithAddedFields.username}`,
                        semanticName: "Delete",
                        buttonOnClick: () => {
                          deleteFormIdDispatch({
                            type: "setDeleteFormId",
                            payload: queryResponseObjWithAddedFields._id,
                          });
                          deleteResourceKindDispatch({
                            type: "setDeleteResourceKind",
                            payload: "form",
                          });

                          openDeleteAcknowledge();
                        },
                      },
                      // open file uploads modal button
                      {
                        buttonLabel: <IoMdOpen />,
                        buttonDisabled: !fileUploadsData[objIdx]?.fileUploads
                          ?.length,
                        semanticDescription: `${
                          !fileUploadsData[objIdx]?.fileUploads?.length
                            ? `No file uploads associated with username: ${queryResponseObjWithAddedFields.username}with form id: ${queryResponseObjWithAddedFields._id}}`
                            : `View file uploads belonging to username: ${queryResponseObjWithAddedFields.username}with form id: ${queryResponseObjWithAddedFields._id}`
                        }`,
                        semanticName: "Open file uploads modal",
                        buttonOnClick: () => {
                          setFileUploadsForAFormDispatch({
                            type: "setFileUploadsForAForm",
                            payload: fileUploadsData[objIdx]?.fileUploads,
                          });
                          deleteFormIdDispatch({
                            type: "setDeleteFormId",
                            payload: queryResponseObjWithAddedFields._id,
                          });

                          openFileUploads();
                        },
                      },
                    ]);

                    const createdUpdateRequestStatusButtonWithTooltip = (
                      <Tooltip
                        label={`Modify request status of id: ${queryResponseObjWithAddedFields._id}`}
                      >
                        <Group>{createdUpdateRequestStatusButton}</Group>
                      </Tooltip>
                    );

                    const createdViewProfileButtonWithTooltip = (
                      <Tooltip
                        // label={`View profile of username: ${
                        //   queryResponseObjWithAddedFields.username ??
                        //     actionsDocuments?.customerData?.find(
                        //       (customer) =>
                        //         customer._id ===
                        //           queryResponseObjWithAddedFields.customerId,
                        //     )?.username
                        // }`}
                        label={`View profile of username: ${queryResponseObjWithAddedFields.username}`}
                      >
                        <Group>{createdViewProfileButton}</Group>
                      </Tooltip>
                    );

                    // only managers can update request status
                    const displayUpdateRequestStatusButton =
                      roles.includes("Manager")
                        ? key === "requestStatus"
                          ? createdUpdateRequestStatusButtonWithTooltip
                          : null
                        : null;

                    const displayBodyRows = (
                      <td key={`${objIdx}-${keyValIdx}`}>
                        {key === "requestStatus"
                          ? (
                            <Group w="100%" position="center">
                              <Text>{truncatedValuesWithHoverCards}</Text>
                              {displayUpdateRequestStatusButton}
                            </Group>
                          )
                          : key === "edit"
                          ? (
                            <Group w="100%" position="center">
                              <Text>{truncatedValuesWithHoverCards}</Text>
                              {displayRepairTicketEditButton}
                            </Group>
                          )
                          : key === "viewProfile"
                          ? (
                            <Group w="100%" position="center">
                              {createdViewProfileButtonWithTooltip}
                            </Group>
                          )
                          : key === "additionalFields"
                          ? (
                            <Group w="100%" position="center">
                              {displayViewAdditionalFieldsButton}
                            </Group>
                          )
                          : key === "starRatingsCount"
                          ? (
                            <Group w="100%" position="center">
                              {displayViewStarRatingsButton}
                            </Group>
                          )
                          : key === "products"
                          ? (
                            <Group w="100%" position="center">
                              {displayViewPurchasesModalButton}
                            </Group>
                          )
                          : key === "shippingAddress"
                          ? (
                            <Group w="100%" position="center">
                              {displayShippingAddressModalButton}
                            </Group>
                          )
                          : key === "address"
                          ? (
                            <Group w="100%" position="center">
                              {displayPersonalAddressModalButton}
                            </Group>
                          )
                          : key === "viewFile"
                          ? (
                            <Group w="100%" position="center">
                              {displayViewFilesModalButton}
                            </Group>
                          )
                          : (
                            <Group w="100%" position="center">
                              {truncatedValuesWithHoverCards}
                            </Group>
                          )}
                      </td>
                    );

                    const viewFileUploadsButtonToolTipLabel =
                      !fileUploadsData[objIdx]
                          ?.fileUploads?.length
                        ? `No file uploads associated with id: ${queryResponseObjWithAddedFields._id}`
                        : `View file uploads belonging to id: ${queryResponseObjWithAddedFields._id}`;

                    const displayOpenFileUploadsModalButton =
                      key === "fileUploads"
                        ? (
                          <td key={`${sectionIdx}-${objIdx}-${keyValIdx}`}>
                            <Center>
                              <Tooltip
                                label={viewFileUploadsButtonToolTipLabel}
                              >
                                <Group>
                                  {createdOpenFileUploadsModalButton}
                                </Group>
                              </Tooltip>
                            </Center>
                          </td>
                        )
                        : null;

                    const displayDeleteButton = key === "delete"
                      ? (
                        <td key={`${sectionIdx}-${objIdx}-${keyValIdx}`}>
                          <Center>
                            <Tooltip
                              label={`Delete form with id: ${queryResponseObjWithAddedFields._id}`}
                            >
                              <Group w="100%" position="center">
                                {createdDeleteFormButton}
                              </Group>
                            </Tooltip>
                          </Center>
                        </td>
                      )
                      : null;

                    return key === "delete"
                      ? displayDeleteButton
                      : key === "fileUploads"
                      ? displayOpenFileUploadsModalButton
                      : displayBodyRows;
                  })}
              </tr>
            );

            return rowWithStringifiedValues;
          })}
        </tbody>
      );
    },
  );

  const displayTable = (
    <ScrollArea styles={() => scrollBarStyle} type="always" offsetScrollbars>
      <Group
        w={width <= 991 ? width - 225 - 44 : width - 300 - 44}
        style={{
          minHeight: "500px", // allows popovers and tooltips to display
          maxHeight: "62vh",
        }}
        align="flex-start"
      >
        {displayLoadingOverlay}
        <Table captionSide="top" striped highlightOnHover>
          {displayTableHeader}

          {displayTableBody}
        </Table>
      </Group>
    </ScrollArea>
  );

  // StepperWrapper width plus extra paddingX
  const modalSize =
    // this component is only displayed on desktop (>=1024)
    width < 1200 ? (width - 300) * 0.95 : 920;

  const displayEditRepairTicketModal = (
    <Modal
      bg={backgroundColor}
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedEditRepairTicketsModal}
      onClose={closeEditRepairTicketsModal}
      size={modalSize}
    >
      <EditRepairTicket
        editRepairTicketInput={editRepairTicketInput}
        parentComponentCallbacks={[closeEditRepairTicketsModal]}
      />
    </Modal>
  );

  const selectedDocument = Array.from(groupedByQueryResponseData)
    .flatMap(([, queryResponseObjArrays]) => queryResponseObjArrays)
    .find((queryResponseObj) => queryResponseObj._id === currentDocumentId) ||
    Object.create(null);

  const displayUpdateRequestStatusModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedUpdateRequestStatusModal}
      onClose={closeUpdateRequestStatusModal}
      size={width < 480 ? width * 0.93 : 480}
      title={<Title order={5}>Update Request Status</Title>}
    >
      <UpdateRequestStatus
        closeUpdateRequestStatusModal={closeUpdateRequestStatusModal}
        currentRequestStatus={currentRequestStatus}
        document={selectedDocument}
        groupBySelection={groupBySelection}
        parentComponentDispatch={requestStatusDispatch}
        queryValuesArray={queryValuesArray}
      />
    </Modal>
  );

  const displayProfileInfoModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedProfileInfoModal}
      onClose={() => {
        closeProfileInfoModal();
      }}
      size={modalSize}
      title={<Text size="xl">Profile information</Text>}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <ProfileInfo
        userDocument={isProductReviewSectionInView || isPurchaseSectionInView ||
            isRMASectionInView
          ? customerDocument
          : employeeDocument}
      />
    </Modal>
  );

  const additionalFieldsFromQueryObj = Array.from(groupedByQueryResponseData)
    .at(-1)?.[1]
    .find((queryResponseObj) => queryResponseObj._id === currentDocumentId)
    ?.additionalFields ??
    (Object.create(null) as Record<string, string | number | boolean>);

  const displayAdditionalFields = Object.entries(additionalFieldsFromQueryObj)
    .map(
      ([key, value], idx) => {
        const rowBackgroundColorLight = idx % 2 === 0
          ? "#f9f9f9"
          : "transparent";
        const rowBackgroundColorDark = "transparent";
        const rowBackgroundColor = themeObject.colorScheme === "dark"
          ? rowBackgroundColorDark
          : rowBackgroundColorLight;

        return (
          <Grid columns={10} w="100%" style={{ borderBottom: borderColor }}>
            <Grid.Col span={4} style={{ background: rowBackgroundColor }}>
              <Text>{splitCamelCase(key)}:</Text>
            </Grid.Col>
            <Grid.Col span={6} style={{ background: rowBackgroundColor }}>
              <Flex direction="row" wrap="wrap" gap={4} rowGap={rowGap}>
                <Text>{value?.toString()}</Text>
              </Flex>
            </Grid.Col>
          </Grid>
        );
      },
    );

  const displayAdditionalFieldsModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedAdditionalFieldsModal}
      onClose={() => {
        closeAdditionalFieldsModal();
      }}
      size={modalSize}
      title={
        <Text size="xl">
          {`${
            Array.from(groupedByQueryResponseData)
              .at(-1)?.[1]
              .find((queryResponseObj) =>
                queryResponseObj._id === currentDocumentId
              )
              ?.model ?? ` ${currentDocumentId}`
          }`}
        </Text>
      }
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Stack>
        <Text size="lg">Additional Fields</Text>
        {displayAdditionalFields}
      </Stack>
    </Modal>
  );

  const starRatingsFromQueryObj = Array.from(groupedByQueryResponseData)
    .at(-1)?.[1]
    .find((queryResponseObj) => queryResponseObj._id === currentDocumentId)
    ?.starRatingsCount ?? (Object.create(null) as Record<string, number>);

  const starRatingsModal = Object.entries(starRatingsFromQueryObj).map(
    ([key, value], idx) => {
      const rowBackgroundColorLight = idx % 2 === 0 ? "#f9f9f9" : "transparent";
      const rowBackgroundColorDark = "transparent";
      const rowBackgroundColor = themeObject.colorScheme === "dark"
        ? rowBackgroundColorDark
        : rowBackgroundColorLight;

      return (
        <Grid columns={10} w="100%" style={{ borderBottom: borderColor }}>
          <Grid.Col span={4} style={{ background: rowBackgroundColor }}>
            <Group>
              {STAR_RATINGS_TO_ICONS_MAP[key].map((icon, idx) => (
                <Flex style={{ color: themeColorShade }} pt={4}>
                  {icon}
                </Flex>
              ))}
            </Group>
          </Grid.Col>
          <Grid.Col span={6} style={{ background: rowBackgroundColor }}>
            <Flex direction="row" wrap="wrap" gap={4} rowGap={rowGap}>
              <Text>{value?.toString()}</Text>
            </Flex>
          </Grid.Col>
        </Grid>
      );
    },
  );

  const displayViewStarRatingsModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedViewStarRatingsModal}
      onClose={() => {
        closeViewStarRatingsModal();
      }}
      size={modalSize}
      title={<Text size="xl">Star Ratings</Text>}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      {starRatingsModal}
    </Modal>
  );

  const productsFromQueryObj = Array.from(groupedByQueryResponseData)
    .at(-1)?.[1]
    .find((queryResponseObj) => queryResponseObj._id === currentDocumentId)
    ?.products ??
    ([] as Record<string, string | number>[]);

  const purchasesModal = productsFromQueryObj.map(
    (product: Record<string, string | number>) => {
      const productElement = Object.entries(product).map(
        ([key, value], idx) => {
          const rowBackgroundColorLight = idx % 2 === 0
            ? "#f9f9f9"
            : "transparent";
          const rowBackgroundColorDark = "transparent";
          const rowBackgroundColor = themeObject.colorScheme === "dark"
            ? rowBackgroundColorDark
            : rowBackgroundColorLight;

          return (
            <Grid columns={10} w="100%" style={{ borderBottom: borderColor }}>
              <Grid.Col span={4} style={{ background: rowBackgroundColor }}>
                <Text>{splitCamelCase(key) ?? ""}</Text>
              </Grid.Col>
              <Grid.Col span={6} style={{ background: rowBackgroundColor }}>
                <Flex direction="row" wrap="wrap" gap={4} rowGap={rowGap}>
                  <Text>{value?.toString()}</Text>
                </Flex>
              </Grid.Col>
            </Grid>
          );
        },
      );

      return (
        <Stack py={padding}>
          <FormLayoutWrapper>{productElement}</FormLayoutWrapper>
        </Stack>
      );
    },
  );

  const displayViewPurchasesModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedViewPurchasesModal}
      onClose={() => {
        closeViewPurchasesModal();
      }}
      size={modalSize}
      title={<Text size="xl">Purchases</Text>}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      {purchasesModal}
    </Modal>
  );

  const shippingAddressFromQueryObj = Array.from(groupedByQueryResponseData)
    .at(-1)?.[1]
    .find((queryResponseObj) => queryResponseObj._id === currentDocumentId)
    ?.shippingAddress ?? (Object.create(null) as Record<string, string>);

  const shippingAddressModal = Object.entries(shippingAddressFromQueryObj).map(
    ([key, value], idx) => {
      const rowBackgroundColorLight = idx % 2 === 0 ? "#f9f9f9" : "transparent";
      const rowBackgroundColorDark = "transparent";
      const rowBackgroundColor = themeObject.colorScheme === "dark"
        ? rowBackgroundColorDark
        : rowBackgroundColorLight;

      return (
        <Grid columns={10} w="100%" style={{ borderBottom: borderColor }}>
          <Grid.Col span={4} style={{ background: rowBackgroundColor }}>
            <Text>{splitCamelCase(key)}:</Text>
          </Grid.Col>
          <Grid.Col span={6} style={{ background: rowBackgroundColor }}>
            <Flex direction="row" wrap="wrap" gap={4} rowGap={rowGap}>
              <Text>{value?.toString()}</Text>
            </Flex>
          </Grid.Col>
        </Grid>
      );
    },
  );

  const displayShippingAddressModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedShippingAddressModal}
      onClose={() => {
        closeShippingAddressModal();
      }}
      size={modalSize}
      title={<Text size="xl">Shipping Address</Text>}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      {shippingAddressModal}
    </Modal>
  );

  const personalAddressFromQueryObj = Array.from(groupedByQueryResponseData)
    .at(-1)?.[1]
    .find((queryResponseObj) => queryResponseObj._id === currentDocumentId)
    ?.address ??
    (Object.create(null) as Record<string, string>);

  const personalAddressModal = Object.entries(personalAddressFromQueryObj).map(
    ([key, value], idx) => {
      const rowBackgroundColorLight = idx % 2 === 0 ? "#f9f9f9" : "transparent";
      const rowBackgroundColorDark = "transparent";
      const rowBackgroundColor = themeObject.colorScheme === "dark"
        ? rowBackgroundColorDark
        : rowBackgroundColorLight;

      return (
        <Grid columns={10} w="100%" style={{ borderBottom: borderColor }}>
          <Grid.Col span={4} style={{ background: rowBackgroundColor }}>
            <Text>{splitCamelCase(key)}:</Text>
          </Grid.Col>
          <Grid.Col span={6} style={{ background: rowBackgroundColor }}>
            <Flex direction="row" wrap="wrap" gap={4} rowGap={rowGap}>
              <Text>{value?.toString()}</Text>
            </Flex>
          </Grid.Col>
        </Grid>
      );
    },
  );

  const displayPersonalAddressModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedPersonalAddressModal}
      onClose={() => {
        closePersonalAddressModal();
      }}
      size={modalSize}
      title={<Text size="xl">Personal Address</Text>}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      {personalAddressModal}
    </Modal>
  );

  return (
    <Stack w="100%" style={{ ...style }} py={padding}>
      {displayUpdateRequestStatusModal}
      {displayProfileInfoModal}
      {displayEditRepairTicketModal}
      {displayAdditionalFieldsModal}
      {displayViewStarRatingsModal}
      {displayViewPurchasesModal}
      {displayShippingAddressModal}
      {displayPersonalAddressModal}
      {displayTable}
    </Stack>
  );
}

export { DisplayQueryDesktop };
*/
