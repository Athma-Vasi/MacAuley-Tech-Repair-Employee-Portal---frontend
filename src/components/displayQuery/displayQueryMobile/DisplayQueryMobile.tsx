import {
  Accordion,
  Divider,
  Flex,
  Loader,
  LoadingOverlay,
  Modal,
  ScrollArea,
  Spoiler,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useReducer } from "react";
import { IoMdOpen } from "react-icons/io";
import {
  TbArrowDown,
  TbArrowUp,
  TbEdit,
  TbStatusChange,
  TbTrash,
  TbUserSearch,
} from "react-icons/tb";

import { COLORS_SWATCHES, FIELDNAMES_WITH_DATE_VALUES } from "../../../constants/data";
import { useAuth, useGlobalState } from "../../../hooks";
import {
  returnAccessibleButtonElements,
  returnHighlightedText,
} from "../../../jsxCreators";
import { UserDocument } from "../../../types";
import {
  addFieldsToObject,
  formatDate,
  replaceLastCommaWithAnd,
  returnThemeColors,
  splitCamelCase,
} from "../../../utils";
import EditRepairTicket from "../editRepairTicket/EditRepairTicket";
import { ProfileInfo } from "../profileInfo/ProfileInfo";
import UpdateRequestStatus from "../updateRequestStatus/UpdateRequestStatus";
import {
  displayQueryMobileAction,
  displayQueryMobileReducer,
  initialDisplayQueryMobileState,
} from "./state";
import { DisplayQueryMobileProps } from "./types";

function DisplayQueryMobile({
  componentQueryData,
  deleteFormIdDispatch,
  deleteResourceKindDispatch,
  fileUploadsData = [],
  groupedByQueryResponseData,
  groupBySelection,
  isLoading,
  loadingMessage,
  openDeleteAcknowledge,
  openFileUploads,
  queryValuesArray,
  requestStatusDispatch,
  setFileUploadsForAFormDispatch,
  style = {},
}: DisplayQueryMobileProps): JSX.Element {
  const [displayQueryMobileState, displayQueryMobileDispatch] = useReducer(
    displayQueryMobileReducer,
    initialDisplayQueryMobileState
  );
  const {
    editRepairTicketInput,
    currentDocumentId,
    currentRequestStatus,
    employeeDocument,
  } = displayQueryMobileState;

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

  const [createdShowMoreButton, createdHideButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Show",
      leftIcon: <TbArrowDown />,
      buttonType: "button",
      semanticDescription: "Reveal more information",
      semanticName: "Show more",
    },
    {
      buttonLabel: "Hide",
      leftIcon: <TbArrowUp />,
      buttonType: "button",
      semanticDescription: "Hide revealed information",
      semanticName: "Hide",
    },
  ]);

  const {
    appThemeColors: { borderColor },
    tablesThemeColors: { textHighlightColor },
    generalColors: { themeColorShade },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  // determines that the user is viewing repair notes section
  const isRepairTicketSectionInView = Array.from(groupedByQueryResponseData).some(
    ([_groupedByFieldKey, queryResponseObjArrays]) => {
      return queryResponseObjArrays.some((queryResponseObj) => {
        return (
          Object.hasOwn(queryResponseObj, "repairTickets") &&
          Object.hasOwn(queryResponseObj, "testingResults") &&
          Object.hasOwn(queryResponseObj, "finalRepairCost") &&
          Object.hasOwn(queryResponseObj, "finalRepairCostCurrency") &&
          Object.hasOwn(queryResponseObj, "repairStatus")
        );
      });
    }
  );

  // determines if user is viewing anonymous requests section
  const isAnonymousRequestsSectionInView = Array.from(groupedByQueryResponseData).some(
    ([_groupedByFieldKey, queryResponseObjArrays]) => {
      return queryResponseObjArrays.some((queryResponseObj) => {
        return (
          Object.hasOwn(queryResponseObj, "secureContactNumber") &&
          Object.hasOwn(queryResponseObj, "secureContactEmail") &&
          Object.hasOwn(queryResponseObj, "requestKind") &&
          Object.hasOwn(queryResponseObj, "requestDescription")
        );
      });
    }
  );

  const displayGroupedByQueryResponseData = Array.from(groupedByQueryResponseData).map(
    ([section, queryObjArr], responseDataIdx) => {
      const displayQueryObjArr = queryObjArr.map((queryObj, queryObjIdx) => {
        const queryResponseObjWithAddedFields =
          fileUploadsData.length > 0
            ? addFieldsToObject({
                object: queryObj,
                fieldValuesTuples: [
                  ["viewProfile", ""],
                  ["fileUploads", ""],
                  ["delete", ""],
                ],
              })
            : isRepairTicketSectionInView
            ? addFieldsToObject({
                object: queryObj,
                fieldValuesTuples: [
                  ["viewProfile", ""],
                  ["edit", ""],
                  ["delete", ""],
                ],
              })
            : isAnonymousRequestsSectionInView
            ? addFieldsToObject({
                object: queryObj,
                fieldValuesTuples: [["delete", ""]],
              })
            : addFieldsToObject({
                object: queryObj,
                fieldValuesTuples: [
                  ["viewProfile", ""],
                  ["delete", ""],
                ],
              });

        const displayKeyValues = Object.entries(queryResponseObjWithAddedFields).map(
          (document, keyValIdx) => {
            const [key, value] = document;
            // grab the section instead of the camelCased value and if it doesn't exist, split the camelCase
            const sectionKey =
              componentQueryData.find((queryDataObj) => queryDataObj.value === key)
                ?.label ?? splitCamelCase(key);

            const formattedValue =
              value === true
                ? "Yes"
                : value === false
                ? "No"
                : Array.isArray(value)
                ? replaceLastCommaWithAnd(value.join(", "))
                : key.toLowerCase().includes("id")
                ? value
                : key === "createdAt" || key === "updatedAt"
                ? formatDate({
                    date: value,
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
                    date: value,
                    formatOptions: {
                      dateStyle: "short",
                    },
                    locale: "en-US",
                  })
                : `${value.toString().charAt(0).toUpperCase()}${value
                    .toString()
                    .slice(1)}`;

            const highlightedText = returnHighlightedText({
              textHighlightColor,
              fieldValue: formattedValue,
              queryValuesArray,
            });

            // only when user views repair notes section
            const [createdRepairTicketEditButton] = isRepairTicketSectionInView
              ? returnAccessibleButtonElements([
                  {
                    buttonLabel: <TbEdit />,
                    semanticDescription: `Modify ${key} for username: ${queryResponseObjWithAddedFields.username} and form with id: ${queryResponseObjWithAddedFields._id}`,
                    semanticName: `Modify ${key}`,
                    buttonOnClick: () => {
                      displayQueryMobileDispatch({
                        type: displayQueryMobileAction.setEditRepairTicketInput,
                        payload: {
                          repairTicketFormId: queryResponseObjWithAddedFields._id,
                          repairTickets: queryResponseObjWithAddedFields.repairTickets,
                          testingResults: queryResponseObjWithAddedFields.testingResults,
                          finalRepairCost:
                            queryResponseObjWithAddedFields.finalRepairCost,
                          finalRepairCostCurrency:
                            queryResponseObjWithAddedFields.finalRepairCostCurrency,
                          repairStatus: queryResponseObjWithAddedFields.repairStatus,
                        },
                      });

                      openEditRepairTicketsModal();
                    },
                  },
                ])
              : [null];

            const [
              createdUpdateRequestStatusButton,
              createdViewProfileButton,
              createdDeleteButton,
              createdOpenFileUploadsModalButton,
            ] = returnAccessibleButtonElements([
              // update request status button
              {
                buttonLabel: <TbStatusChange />,
                semanticDescription: `Modify current request status of ${queryResponseObjWithAddedFields.requestStatus} for username: ${queryResponseObjWithAddedFields.username} and form with id: ${queryResponseObjWithAddedFields._id}`,
                semanticName: "Update request status",
                buttonOnClick: () => {
                  displayQueryMobileDispatch({
                    type: displayQueryMobileAction.setCurrentDocumentId,
                    payload: queryResponseObjWithAddedFields._id,
                  });
                  displayQueryMobileDispatch({
                    type: displayQueryMobileAction.setCurrentRequestStatus,
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
                  displayQueryMobileDispatch({
                    type: displayQueryMobileAction.setEmployeeDocument,
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
                semanticDescription: "Delete this form",
                semanticName: "Delete",
                buttonOnClick: () => {
                  deleteFormIdDispatch({
                    type: "setDeleteFormId",
                    payload: queryObj._id,
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
                buttonLabel: "Open",
                buttonDisabled: fileUploadsData[queryObjIdx]?.fileUploads.length < 1,
                leftIcon: <IoMdOpen />,
                semanticDescription:
                  "Open modal to display file uploads associated with this document",
                semanticName: "Open file uploads modal",
                buttonOnClick: () => {
                  setFileUploadsForAFormDispatch({
                    type: "setFileUploadsForAForm",
                    payload: fileUploadsData[queryObjIdx]?.fileUploads,
                  });
                  deleteFormIdDispatch({
                    type: "setDeleteFormId",
                    payload: queryResponseObjWithAddedFields._id,
                  });
                  openFileUploads();
                },
              },
            ]);

            // only managers can update request status
            const displayUpdateRequestStatusButton = roles.includes("Manager")
              ? key === "requestStatus"
                ? createdUpdateRequestStatusButton
                : null
              : null;

            const displayViewProfileButton =
              key === "viewProfile" ? createdViewProfileButton : null;
            const displayCreatedDeleteButton =
              key === "delete" ? createdDeleteButton : null;
            const displayEditRepairTicketButton =
              key === "edit" ? createdRepairTicketEditButton : null;
            const displayCreatedOpenFileUploadsModalButton =
              key === "fileUploads" ? createdOpenFileUploadsModalButton : null;

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

            const highlightedSectionKey = regex?.test(formattedValue) ? (
              <Text weight={600}>
                {sectionKey === "_id" ? "Document Id" : sectionKey}
              </Text>
            ) : (
              <Text>{sectionKey === "_id" ? "Document Id" : sectionKey}</Text>
            );

            const displayFullLabelValueRow = (
              <Flex w="100%">
                <Flex w="100%">{highlightedSectionKey}</Flex>
                <Flex
                  align="center"
                  justify="flex-end"
                  w="100%"
                  columnGap={rowGap}
                  pl={padding}
                >
                  {displayUpdateRequestStatusButton}
                  {displayViewProfileButton}
                  {displayCreatedOpenFileUploadsModalButton}
                  {displayCreatedDeleteButton}
                  {displayEditRepairTicketButton}
                  <Spoiler
                    maxHeight={70}
                    showLabel={createdShowMoreButton}
                    hideLabel={createdHideButton}
                  >
                    <Flex direction="row" wrap="wrap" gap={4}>
                      {highlightedText}
                    </Flex>
                  </Spoiler>
                </Flex>
              </Flex>
            );

            const rowBackgroundColorLight =
              keyValIdx % 2 === 0 ? "#f9f9f9" : "transparent";
            const rowBackgroundColorDark = "transparent";
            const rowBackgroundColor =
              themeObject.colorScheme === "dark"
                ? rowBackgroundColorDark
                : rowBackgroundColorLight;

            const lastKeyValBorderBottom =
              Object.keys(queryResponseObjWithAddedFields).length - 1 === keyValIdx
                ? ""
                : borderColor;

            return (
              <Flex
                key={`${key}-${keyValIdx}`}
                direction={width < 768 ? "column" : "row"}
                align={width < 768 ? "flex-start" : "center"}
                justify={width < 768 ? "flex-start" : "space-between"}
                bg={rowBackgroundColor}
                style={{ borderBottom: lastKeyValBorderBottom }}
                rowGap={rowGap}
                w="100%"
                p={padding}
              >
                {displayFullLabelValueRow}
              </Flex>
            );
          }
        );

        const displayBeginDivider =
          queryObjIdx === 0 ? null : (
            <Divider
              label={<Text>Begin</Text>}
              labelPosition="center"
              w="100%"
              variant="dashed"
            />
          );

        const displayEndDivider =
          queryObjIdx === queryObj.length - 1 ? null : (
            <Divider
              label={<Text>End</Text>}
              labelPosition="center"
              w="100%"
              variant="dashed"
            />
          );

        return (
          <Flex
            key={`${String(section)}-${queryObjIdx}}`}
            direction="column"
            align="flex-start"
            justify="center"
            w="100%"
            rowGap={rowGap}
            py={padding}
          >
            {displayBeginDivider}
            {displayKeyValues}
            {displayEndDivider}
          </Flex>
        );
      });
      const displaySection =
        section === true
          ? "Yes"
          : section === false
          ? "No"
          : `${section.toString().charAt(0).toUpperCase()}${section.toString().slice(1)}`;

      return (
        <Flex
          key={`${String(section)}-${responseDataIdx}}`}
          direction="column"
          py={padding}
          align="flex-start"
          justify="center"
          // style={{ border: borderColor, borderRadius: 4 }}
          w="100%"
          rowGap={rowGap}
        >
          <Accordion w="100%">
            <Accordion.Item value={displaySection}>
              <Accordion.Control>
                <Text weight={500}>{displaySection}</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Flex
                  direction="column"
                  align="flex-start"
                  justify="center"
                  w="100%"
                  rowGap={rowGap}
                >
                  {displayQueryObjArr}
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Flex>
      );
    }
  );

  // StepperWrapper width plus extra paddingX
  const modalSize =
    // this component is only displayed on mobile (<= 1024)
    width < 480 // for iPhone 5/SE
      ? 375 - 20
      : width < 768 // for iPhone 6/7/8
      ? width * 0.9
      : // at 768vw the navbar appears at width of 225px
        (width - 225) * 0.9;

  const displayEditRepairTicketModal = (
    <Modal
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
      size={modalSize}
      title={
        <Text size="xl" weight={500}>
          Update Request Status
        </Text>
      }
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
      title={
        <Text size="xl" weight={500}>
          Profile information
        </Text>
      }
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <ProfileInfo employeeDocument={employeeDocument} />
    </Modal>
  );

  const displayLoadingOverlay = (
    <LoadingOverlay
      visible={isLoading}
      zIndex={2}
      overlayBlur={9}
      overlayOpacity={0.99}
      radius={4}
      loader={
        <Stack align="center">
          <Text>{loadingMessage}</Text>
          <Loader />
        </Stack>
      }
    />
  );

  return (
    <Flex
      direction="column"
      style={{ ...style, position: "relative" }}
      align="flex-start"
      justify="center"
      w="100%"
      rowGap={rowGap}
    >
      {displayLoadingOverlay}
      {displayUpdateRequestStatusModal}
      {displayEditRepairTicketModal}
      {displayProfileInfoModal}
      {displayGroupedByQueryResponseData}
    </Flex>
  );
}

export { DisplayQueryMobile };
