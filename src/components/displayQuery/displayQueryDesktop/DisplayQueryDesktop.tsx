import {
  Center,
  Flex,
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
import { TbEdit, TbStatusChange, TbTrash, TbUserSearch } from "react-icons/tb";
import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";

import { COLORS_SWATCHES, FIELDNAMES_WITH_DATE_VALUES } from "../../../constants/data";
import { useAuth, useGlobalState } from "../../../hooks";
import {
  returnAccessibleButtonElements,
  returnHighlightedText,
  returnScrollableDocumentInfo,
} from "../../../jsxCreators";
import { UserDocument } from "../../../types";
import {
  addFieldsToObject,
  flattenObjectIterative,
  formatDate,
  logState,
  replaceLastCommaWithAnd,
  returnThemeColors,
  splitCamelCase,
} from "../../../utils";
import EditRepairTicket from "../editRepairTicket/EditRepairTicket";
import { ProfileInfo } from "../profileInfo/ProfileInfo";
import UpdateRequestStatus from "../updateRequestStatus/UpdateRequestStatus";
import {
  displayQueryDesktopAction,
  displayQueryDesktopReducer,
  initialDisplayQueryDesktopState,
} from "./state";
import { DisplayQueryDesktopProps } from "./types";
import { returnWhichResourceInView, sortGroupedByQueryResponseData } from "./utils";

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
    initialDisplayQueryDesktopState
  );
  const {
    currentDocumentId,
    currentRequestStatus,
    editRepairTicketInput,
    employeeDocument,
    fieldToSortBy,
    sortDirection,
  } = displayQueryDesktopState;
  const {
    globalState: { width, padding, rowGap, themeObject, actionsDocuments },
  } = useGlobalState();

  const {
    authState: { roles },
  } = useAuth();

  const [
    openedUpdateRequestStatusModal,
    { open: openUpdateRequestStatusModal, close: closeUpdateRequestStatusModal },
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

  // // determines that the user is viewing repair notes section
  // const isRepairTicketSectionInView = Array.from(groupedByQueryResponseData).some(
  //   ([_groupedByFieldKey, queryResponseObjArrays]) => {
  //     return queryResponseObjArrays.some((queryResponseObj) => {
  //       return (
  //         Object.hasOwn(queryResponseObj, "repairTickets") &&
  //         Object.hasOwn(queryResponseObj, "testingResults") &&
  //         Object.hasOwn(queryResponseObj, "finalRepairCost") &&
  //         Object.hasOwn(queryResponseObj, "finalRepairCostCurrency") &&
  //         Object.hasOwn(queryResponseObj, "repairStatus")
  //       );
  //     });
  //   }
  // );

  // // determines if user is viewing anonymous requests section
  // const isAnonymousRequestsSectionInView = Array.from(groupedByQueryResponseData).some(
  //   ([_groupedByFieldKey, queryResponseObjArrays]) => {
  //     return queryResponseObjArrays.some((queryResponseObj) => {
  //       return (
  //         Object.hasOwn(queryResponseObj, "secureContactNumber") &&
  //         Object.hasOwn(queryResponseObj, "secureContactEmail") &&
  //         Object.hasOwn(queryResponseObj, "requestKind") &&
  //         Object.hasOwn(queryResponseObj, "requestDescription")
  //       );
  //     });
  //   }
  // );

  const {
    isAnonymousRequestsSectionInView,
    isProductCategorySectionInView,
    isPurchaseSectionInView,
    isRMASectionInView,
    isRepairTicketSectionInView,
  } = returnWhichResourceInView(groupedByQueryResponseData);

  // the data received is in a Map grouped by a field, header values are created separately to avoid creating multiple tables
  const tableHeaderValuesArr =
    groupedByQueryResponseData.size > 0
      ? Array.from(groupedByQueryResponseData).map(
          ([_groupedByFieldKey, queryResponseObjArrays]) => {
            const headerValues = Object.keys(
              flattenObjectIterative(queryResponseObjArrays[0])
            );

            const headerValuesWithFieldsInserted =
              // allows for modification of file uploads and deletion of documents
              fileUploadsData.length > 0
                ? [...headerValues, "viewProfile", "fileUploads", "delete"]
                : isRepairTicketSectionInView
                ? [...headerValues, "viewProfile", "edit", "delete"]
                : isAnonymousRequestsSectionInView
                ? [...headerValues, "delete"]
                : [...headerValues, "viewProfile", "delete"];

            return headerValuesWithFieldsInserted.map((headerValue) =>
              splitCamelCase(headerValue)
            );
          }
        )[0]
      : [];

  console.log({ tableHeaderValuesArr });

  // used to prevent display of sort arrows on groupedBy or id fields
  const headerExclusionSet = new Set([
    "_id",
    "user id",
    "benefit user id",
    "uploaded files ids",
    "view profile",
    "file uploads",
    "edit",
    "delete",
  ]);
  const groupByRadioDataLabels = new Set(
    groupByRadioData.map(({ label }) => label.toLowerCase())
  );

  // filtering out grouped by data fields to allow sorting on non-grouped by fields (the grouped by field is already sorted)
  const headerValuesToGetSortArrows = tableHeaderValuesArr.reduce(
    (filteredHeaderValsAcc: string[], headerVal) => {
      // ignore any header values present in group by radio data
      if (
        groupByRadioDataLabels.has(headerVal.toLowerCase()) ||
        headerExclusionSet.has(headerVal.toLowerCase())
      ) {
        return filteredHeaderValsAcc;
      }
      filteredHeaderValsAcc.push(headerVal);

      return filteredHeaderValsAcc;
    },
    []
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
            width:
              headerValue === "_id"
                ? "Document Id".length * 10 + 70
                : headerValue.length * 10 + 70, // rough ch plus space for sort arrows
            backgroundColor: tableHeadersBgColor,
          };

          const ascendingIconColor =
            headerValue === fieldToSortBy && sortDirection === "asc"
              ? themeColorShade // on
              : headersIconColor; // off

          const ascendingIconWithTooltip = (
            <Tooltip
              label={`Sort ${headerValue} within ${splitCamelCase(
                groupBySelection
              )} in ascending order`}
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
              label={`Sort ${headerValue} within ${splitCamelCase(
                groupBySelection
              )} in descending order`}
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
            headerValue
          ) ? (
            <Group style={headerGroupStyle} position="center">
              {ascendingIconWithTooltip}
              <Title order={6}>
                {headerValue === "_id" ? "Document Id" : headerValue}
              </Title>
              {descendingIconWithTooltip}
            </Group>
          ) : (
            <Group style={headerGroupStyle} position="center">
              <Title order={6}>
                {headerValue === "_id" ? "Document Id" : headerValue}
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
    ([groupedByFieldKey, queryResponseObjArrays], sectionIdx) => {
      return (
        <tbody>
          {queryResponseObjArrays.map((queryResponseObj, objIdx) => {
            // delete field is added to the query response object to display delete button
            // edit field is added to the query response object to display edit repair notes button
            // fileUploads field is added to the query response object to display open file uploads modal button
            const queryResponseObjWithAddedFields =
              fileUploadsData.length > 0
                ? addFieldsToObject({
                    object: queryResponseObj,
                    fieldValuesTuples: [
                      ["viewProfile", ""],
                      ["fileUploads", ""],
                      ["delete", ""],
                    ],
                  })
                : isRepairTicketSectionInView
                ? addFieldsToObject({
                    object: queryResponseObj,
                    fieldValuesTuples: [
                      ["viewProfile", ""],
                      ["edit", ""],
                      ["delete", ""],
                    ],
                  })
                : isAnonymousRequestsSectionInView
                ? addFieldsToObject({
                    object: queryResponseObj,
                    fieldValuesTuples: [["delete", ""]],
                  })
                : addFieldsToObject({
                    object: queryResponseObj,
                    fieldValuesTuples: [
                      ["viewProfile", ""],
                      ["delete", ""],
                    ],
                  });

            const rowWithStringifiedValues = (
              <tr key={`${objIdx}`} style={{ borderBottom: rowsBorderColor }}>
                {Object.entries(queryResponseObjWithAddedFields).map(
                  ([key, value], keyValIdx) => {
                    const formattedValue =
                      value === true
                        ? "Yes"
                        : value === false
                        ? "No"
                        : Array.isArray(value)
                        ? replaceLastCommaWithAnd(value.join(", "))
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
                        : (`${value.toString().charAt(0).toUpperCase()}${value
                            .toString()
                            .slice(1)}` as string);

                    // slice based on length of key to prevent overflow
                    // const sliceLength =
                    //   tableHeaderValuesArr[keyValIdx]?.length - 3 ?? 23;
                    const sliceLength = 23;
                    const formattedValueSliced =
                      formattedValue.length > sliceLength
                        ? `${formattedValue
                            .toString()
                            .slice(
                              0,
                              key.toLowerCase().includes("id") ? 11 : sliceLength
                            )}...`
                        : (formattedValue as string);

                    // regex to determine if formattedValue has any terms in queryValuesArray
                    const regex = queryValuesArray.length
                      ? new RegExp(
                          queryValuesArray
                            .filter((value) => value) // remove empty strings
                            .flatMap((value) => value.split(" ")) // split strings into words
                            .join("|"),
                          "gi"
                        )
                      : null;

                    // highlight text if formattedValue has any terms that were either filtered/searched for (queryValuesArray)
                    const highlightedText = regex ? (
                      formattedValue.match(regex) ? (
                        <Highlight
                          highlight={formattedValueSliced}
                          highlightStyles={{
                            backgroundColor: textHighlightColor,
                          }}
                        >
                          {formattedValueSliced}
                        </Highlight>
                      ) : (
                        <Text>{formattedValueSliced}</Text>
                      )
                    ) : (
                      <Text>{formattedValueSliced}</Text>
                    );

                    const groupBySelectionValue =
                      queryResponseObjWithAddedFields[groupBySelection];

                    const groupedBySelectedValueHighlightedText = returnHighlightedText({
                      textHighlightColor,
                      queryValuesArray,
                      fieldValue: groupBySelectionValue,
                    });

                    const displayDropdownAccordion = returnScrollableDocumentInfo({
                      borderColor,
                      document: queryResponseObjWithAddedFields,
                      excludeKeys: [
                        "fileUploads",
                        "edit",
                        "delete",
                        "viewProfile",
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
                        {groupBySelection === "none" ? null : (
                          <Group pb={padding}>
                            <Text>{splitCamelCase(groupBySelection)}:</Text>

                            <Flex gap={4} wrap="wrap">
                              <strong>{groupedBySelectedValueHighlightedText}</strong>
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

                    const truncatedValuesWithHoverCards = FIELDNAMES_WITH_DATE_VALUES.has(
                      key
                    ) ? (
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
                    ) : key === "createdAt" || key === "updatedAt" ? (
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
                    ) : (
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
                                {key === "_id" ? (
                                  <Text>{"Document Id"}: </Text>
                                ) : (
                                  <Text>{splitCamelCase(key)}: </Text>
                                )}

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
                    const [createdRepairTicketEditButton] = isRepairTicketSectionInView
                      ? returnAccessibleButtonElements([
                          {
                            buttonLabel: <TbEdit />,
                            semanticDescription: `Modify ${key} for username: ${queryResponseObjWithAddedFields.username} and form with id: ${queryResponseObjWithAddedFields._id}`,
                            semanticName: `Modify ${key}`,
                            buttonOnClick: () => {
                              displayQueryDesktopDispatch({
                                type: displayQueryDesktopAction.setEditRepairTicketInput,
                                payload: {
                                  repairTicketFormId: queryResponseObjWithAddedFields._id,
                                  repairTickets:
                                    queryResponseObjWithAddedFields.repairTickets,
                                  testingResults:
                                    queryResponseObjWithAddedFields.testingResults,
                                  finalRepairCost:
                                    queryResponseObjWithAddedFields.finalRepairCost,
                                  finalRepairCostCurrency:
                                    queryResponseObjWithAddedFields.finalRepairCostCurrency,
                                  repairStatus:
                                    queryResponseObjWithAddedFields.repairStatus,
                                },
                              });

                              openEditRepairTicketsModal();
                            },
                          },
                        ])
                      : [null];

                    const displayRepairTicketEditButton =
                      createdRepairTicketEditButton ? (
                        <Tooltip
                          label={`Edit repair note for ${
                            queryResponseObjWithAddedFields.customerName ??
                            queryResponseObjWithAddedFields._id
                          }`}
                        >
                          <Group>{createdRepairTicketEditButton}</Group>
                        </Tooltip>
                      ) : null;

                    const [
                      createdUpdateRequestStatusButton,
                      createdViewProfileButton,
                      createdDeleteFormButton,
                      createdOpenFileUploadsModalButton,
                    ] = returnAccessibleButtonElements([
                      // update request status button
                      {
                        buttonLabel: <TbStatusChange />,
                        semanticDescription: `Modify current request status of ${queryResponseObjWithAddedFields.requestStatus} for username: ${queryResponseObjWithAddedFields.username} and form with id: ${queryResponseObjWithAddedFields._id}`,
                        semanticName: "Update request status",
                        buttonOnClick: () => {
                          displayQueryDesktopDispatch({
                            type: displayQueryDesktopAction.setCurrentDocumentId,
                            payload: queryResponseObjWithAddedFields._id,
                          });
                          displayQueryDesktopDispatch({
                            type: displayQueryDesktopAction.setCurrentRequestStatus,
                            payload: queryResponseObjWithAddedFields.requestStatus,
                          });

                          openUpdateRequestStatusModal();
                        },
                      },
                      // view profile button
                      {
                        buttonLabel: <TbUserSearch />,
                        semanticDescription: `View profile of username: ${queryResponseObjWithAddedFields.username}`,
                        semanticName: "View profile",
                        buttonOnClick: () => {
                          displayQueryDesktopDispatch({
                            type: displayQueryDesktopAction.setEmployeeDocument,
                            payload:
                              actionsDocuments?.employeeData?.get(
                                queryResponseObjWithAddedFields.userId ??
                                  queryResponseObjWithAddedFields.benefitUserId
                              ) ?? ({} as UserDocument),
                          });

                          openProfileInfoModal();
                        },
                      },
                      // delete button
                      {
                        buttonLabel: <TbTrash />,
                        semanticDescription: `Delete form with id: ${queryResponseObjWithAddedFields._id} belonging to username: ${queryResponseObjWithAddedFields.username}`,
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
                        buttonDisabled: !fileUploadsData[objIdx]?.fileUploads.length,
                        semanticDescription: `${
                          !fileUploadsData[objIdx]?.fileUploads.length
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
                        label={`View profile of username: ${queryResponseObjWithAddedFields.username}`}
                      >
                        <Group>{createdViewProfileButton}</Group>
                      </Tooltip>
                    );

                    // only managers can update request status
                    const displayUpdateRequestStatusButton = roles.includes("Manager")
                      ? key === "requestStatus"
                        ? createdUpdateRequestStatusButtonWithTooltip
                        : null
                      : null;

                    // if fieldname is 'requestStatus', display popover with radio group and submit button, else if the document viewed is a repair note, display edit button, else display truncated values with hover cards

                    const displayBodyRows = (
                      <td key={`${objIdx}-${keyValIdx}`}>
                        {key === "requestStatus" ? (
                          <Group w="100%" position="center">
                            <Text>{truncatedValuesWithHoverCards}</Text>
                            {displayUpdateRequestStatusButton}
                          </Group>
                        ) : key === "edit" ? (
                          <Group w="100%" position="center">
                            <Text>{truncatedValuesWithHoverCards}</Text>
                            {displayRepairTicketEditButton}
                          </Group>
                        ) : key === "viewProfile" ? (
                          <Group w="100%" position="center">
                            {truncatedValuesWithHoverCards}
                            {createdViewProfileButtonWithTooltip}
                          </Group>
                        ) : (
                          <Group w="100%" position="center">
                            {truncatedValuesWithHoverCards}
                          </Group>
                        )}
                      </td>
                    );

                    const viewFileUploadsButtonToolTipLabel = !fileUploadsData[objIdx]
                      ?.fileUploads.length
                      ? `No file uploads associated with id: ${queryResponseObjWithAddedFields._id}`
                      : `View file uploads belonging to id: ${queryResponseObjWithAddedFields._id}`;

                    const displayOpenFileUploadsModalButton =
                      key === "fileUploads" ? (
                        <td key={`${sectionIdx}-${objIdx}-${keyValIdx}`}>
                          <Center>
                            <Tooltip label={viewFileUploadsButtonToolTipLabel}>
                              <Group>{createdOpenFileUploadsModalButton}</Group>
                            </Tooltip>
                          </Center>
                        </td>
                      ) : null;

                    const displayDeleteButton =
                      key === "delete" ? (
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
                      ) : null;

                    return key === "delete"
                      ? displayDeleteButton
                      : key === "fileUploads"
                      ? displayOpenFileUploadsModalButton
                      : displayBodyRows;
                  }
                )}
              </tr>
            );

            return rowWithStringifiedValues;
          })}
        </tbody>
      );
    }
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

  const selectedDocument =
    Array.from(groupedByQueryResponseData)
      .flatMap(([, queryResponseObjArrays]) => queryResponseObjArrays)
      .find((queryResponseObj) => queryResponseObj._id === currentDocumentId) || {};

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
      <ProfileInfo employeeDocument={employeeDocument} />
    </Modal>
  );

  useEffect(() => {
    logState({
      state: displayQueryDesktopState,
      groupLabel: "displayQueryDesktopState",
    });
  }, [displayQueryDesktopState]);

  return (
    <Stack w="100%" style={{ ...style }} py={padding}>
      {displayUpdateRequestStatusModal}
      {displayProfileInfoModal}
      {displayEditRepairTicketModal}
      {displayTable}
    </Stack>
  );
}

export { DisplayQueryDesktop };
