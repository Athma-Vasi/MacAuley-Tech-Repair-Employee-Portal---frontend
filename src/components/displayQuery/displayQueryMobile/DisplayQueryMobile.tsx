import {
  Accordion,
  Divider,
  Flex,
  Group,
  Highlight,
  Modal,
  Spoiler,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useReducer } from 'react';
import { IoMdOpen } from 'react-icons/io';
import {
  TbArrowDown,
  TbArrowUp,
  TbEdit,
  TbStatusChange,
  TbTrash,
} from 'react-icons/tb';

import {
  COLORS_SWATCHES,
  FIELDNAMES_WITH_DATE_VALUES,
} from '../../../constants/data';
import { useAuth, useGlobalState } from '../../../hooks';
import { returnAccessibleButtonElements } from '../../../jsxCreators';
import {
  addFieldsToObject,
  formatDate,
  returnThemeColors,
  splitCamelCase,
} from '../../../utils';
import EditRepairNote from '../editRepairNote/EditRepairNote';
import UpdateRequestStatus from '../updateRequestStatus/UpdateRequestStatus';
import {
  displayQueryMobileAction,
  displayQueryMobileReducer,
  initialDisplayQueryMobileState,
} from './state';
import { DisplayQueryMobileProps } from './types';
import { returnHighlightedText } from '../displayQueryDesktop/utils';

function DisplayQueryMobile({
  componentQueryData,
  deleteFormIdDispatch,
  deleteResourceKindDispatch,
  fileUploadsData = [],
  groupedByQueryResponseData,
  groupBySelection,
  openDeleteAcknowledge,
  openFileUploads,
  queryValuesArray,
  restOfGroupedQueryResponseData,
  requestStatusDispatch,
  setFileUploadsForAFormDispatch,
  style = {},
}: DisplayQueryMobileProps): JSX.Element {
  const [displayQueryMobileState, displayQueryMobileDispatch] = useReducer(
    displayQueryMobileReducer,
    initialDisplayQueryMobileState
  );
  const { editRepairNoteInput, currentDocumentId, currentRequestStatus } =
    displayQueryMobileState;

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
    openedEditRepairNotesModal,
    { open: openEditRepairNotesModal, close: closeEditRepairNotesModal },
  ] = useDisclosure(false);

  const [createdShowMoreButton, createdHideButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Show',
        leftIcon: <TbArrowDown />,
        buttonType: 'button',
        semanticDescription: 'Reveal more information',
        semanticName: 'Show more',
      },
      {
        buttonLabel: 'Hide',
        leftIcon: <TbArrowUp />,
        buttonType: 'button',
        semanticDescription: 'Hide revealed information',
        semanticName: 'Hide',
      },
    ]);

  const {
    appThemeColors: { backgroundColor, borderColor },
    tablesThemeColors: { textHighlightColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  // determines that the user is viewing repair notes section
  const isRepairNoteSectionInView = Array.from(groupedByQueryResponseData).some(
    ([_groupedByFieldKey, queryResponseObjArrays]) => {
      return queryResponseObjArrays.some((queryResponseObj) => {
        return (
          Object.hasOwn(queryResponseObj, 'repairNotes') &&
          Object.hasOwn(queryResponseObj, 'testingResults') &&
          Object.hasOwn(queryResponseObj, 'finalRepairCost') &&
          Object.hasOwn(queryResponseObj, 'finalRepairCostCurrency') &&
          Object.hasOwn(queryResponseObj, 'repairStatus')
        );
      });
    }
  );

  // the component query data does not contain values of usernames
  const usernames =
    groupBySelection === 'username'
      ? Array.from(groupedByQueryResponseData).map(
          ([username, _queryResponseObjArrays]) => username
        )
      : [];
  // used to highlight grouped by field values
  const groupedByFieldValues =
    componentQueryData.find((queryData) => queryData.value === groupBySelection)
      ?.selectData ?? [];
  const groupedByFieldValuesSet =
    groupBySelection === 'username'
      ? new Set(usernames)
      : new Set(groupedByFieldValues);

  const displayGroupedByQueryResponseData = Array.from(
    groupedByQueryResponseData
  ).map(([section, queryObjArr], responseDataIdx) => {
    const displayQueryObjArr = queryObjArr.map((queryObj, queryObjIdx) => {
      const queryResponseObjWithAddedFields =
        fileUploadsData.length > 0
          ? addFieldsToObject({
              object: queryObj,
              fieldValuesTuples: [
                ['fileUploads', ''],
                ['delete', ''],
              ],
            })
          : isRepairNoteSectionInView
          ? addFieldsToObject({
              object: queryObj,
              fieldValuesTuples: [
                ['edit', ''],
                ['delete', ''],
              ],
            })
          : addFieldsToObject({
              object: queryObj,
              fieldValuesTuples: [['delete', '']],
            });

      const displayKeyValues = Object.entries(
        queryResponseObjWithAddedFields
      ).map((document, keyValIdx) => {
        const [key, value] = document;
        // grab the section instead of the camelCased value and if it doesn't exist, split the camelCase
        const sectionKey =
          componentQueryData.find((queryDataObj) => queryDataObj.value === key)
            ?.label ?? splitCamelCase(key);

        const formattedValue =
          value === true
            ? 'Yes'
            : value === false
            ? 'No'
            : Array.isArray(value)
            ? value.map((val, valIdx) => {
                return (
                  <Text key={`${valIdx}`}>
                    {`${val.toString().charAt(0).toUpperCase()}${val
                      .toString()
                      .slice(1)}${valIdx === value.length - 1 ? '' : ', '}`}
                  </Text>
                );
              })
            : key.toLowerCase().includes('id')
            ? value
            : key === 'createdAt' || key === 'updatedAt'
            ? formatDate({
                date: value,
                formatOptions: {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: false,
                  timeZoneName: 'long',
                },
                locale: 'en-US',
              })
            : FIELDNAMES_WITH_DATE_VALUES.has(key)
            ? formatDate({
                date: value,
                formatOptions: {
                  dateStyle: 'short',
                },
                locale: 'en-US',
              })
            : `${value.toString().charAt(0).toUpperCase()}${value
                .toString()
                .slice(1)}`;

        const highlightedText = returnHighlightedText({
          backgroundColor: textHighlightColor,
          fieldValue: formattedValue,
          queryValuesArray,
        });

        // only when user views repair notes section
        const [createdRepairNoteEditButton] = isRepairNoteSectionInView
          ? returnAccessibleButtonElements([
              {
                buttonLabel: <TbEdit />,
                semanticDescription: `Modify ${key} for username: ${queryResponseObjWithAddedFields.username} and form with id: ${queryResponseObjWithAddedFields._id}`,
                semanticName: `Modify ${key}`,
                buttonOnClick: () => {
                  displayQueryMobileDispatch({
                    type: displayQueryMobileAction.setEditRepairNoteInput,
                    payload: {
                      repairNoteFormId: queryResponseObjWithAddedFields._id,
                      repairNotes: queryResponseObjWithAddedFields.repairNotes,
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

                  openEditRepairNotesModal();
                },
              },
            ])
          : [null];

        const [createdUpdateRequestStatusButton] =
          returnAccessibleButtonElements([
            {
              buttonLabel: <TbStatusChange />,
              semanticDescription: `Modify current request status of ${queryResponseObjWithAddedFields.requestStatus} for username: ${queryResponseObjWithAddedFields.username} and form with id: ${queryResponseObjWithAddedFields._id}`,
              semanticName: 'Update request status',
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
          ]);

        // only managers can update request status
        const displayUpdateRequestStatusButton = roles.includes('Manager')
          ? key === 'requestStatus'
            ? createdUpdateRequestStatusButton
            : null
          : null;

        const [createdDeleteButton, createdOpenFileUploadsModalButton] =
          returnAccessibleButtonElements([
            {
              buttonLabel: <TbTrash />,
              semanticDescription: 'Delete this form',
              semanticName: 'Delete',
              buttonOnClick: () => {
                deleteFormIdDispatch({
                  type: 'setDeleteFormId',
                  payload: queryObj._id,
                });
                deleteResourceKindDispatch({
                  type: 'setDeleteResourceKind',
                  payload: 'form',
                });
                openDeleteAcknowledge();
              },
            },
            {
              buttonLabel: 'Open',
              buttonDisabled:
                fileUploadsData[queryObjIdx]?.fileUploads.length < 1,
              leftIcon: <IoMdOpen />,
              semanticDescription:
                'Open modal to display file uploads associated with this document',
              semanticName: 'Open file uploads modal',
              buttonOnClick: () => {
                setFileUploadsForAFormDispatch({
                  type: 'setFileUploadsForAForm',
                  payload: fileUploadsData[queryObjIdx]?.fileUploads,
                });
                deleteFormIdDispatch({
                  type: 'setDeleteFormId',
                  payload: queryResponseObjWithAddedFields._id,
                });
                openFileUploads();
              },
            },
          ]);
        const displayCreatedDeleteButton =
          key === 'delete' ? createdDeleteButton : null;
        const displayEditRepairNoteButton =
          key === 'edit' ? createdRepairNoteEditButton : null;
        const displayCreatedOpenFileUploadsModalButton =
          key === 'fileUploads' ? createdOpenFileUploadsModalButton : null;

        // regex to determine if formattedValue has any terms in queryValuesArray
        const regex = queryValuesArray.length
          ? new RegExp(
              queryValuesArray
                .filter((value) => value) // remove empty strings
                .flatMap((value) => value.split(' ')) // split strings into words
                .join('|'),
              'gi'
            )
          : null;

        const highlightedSectionKey = regex?.test(formattedValue) ? (
          <Text weight={600}>
            {sectionKey === '_id' ? 'Document Id' : sectionKey}
          </Text>
        ) : (
          <Text>{sectionKey === '_id' ? 'Document Id' : sectionKey}</Text>
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
              {displayCreatedOpenFileUploadsModalButton}
              {displayCreatedDeleteButton}
              {displayEditRepairNoteButton}
              <Spoiler
                maxHeight={70}
                showLabel={createdShowMoreButton}
                hideLabel={createdHideButton}
              >
                {/* <Text>{highlightedText}</Text> */}
                <Flex direction="row" wrap="wrap" gap={4}>
                  {highlightedText}
                </Flex>
              </Spoiler>
            </Flex>
          </Flex>
        );

        const lastKeyValBorderBottom =
          Object.keys(queryResponseObjWithAddedFields).length - 1 === keyValIdx
            ? ''
            : borderColor;

        return (
          <Flex
            key={`${key}-${keyValIdx}`}
            direction={width < 768 ? 'column' : 'row'}
            align={width < 768 ? 'flex-start' : 'center'}
            justify={width < 768 ? 'flex-start' : 'space-between'}
            bg={backgroundColor}
            style={{ borderBottom: lastKeyValBorderBottom, borderRadius: 4 }}
            rowGap={rowGap}
            w="100%"
            p={padding}
          >
            {displayFullLabelValueRow}
          </Flex>
        );
      });

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
          key={`${section}-${queryObjIdx}}`}
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
    const displaySection = `${section
      .toString()
      .charAt(0)
      .toUpperCase()}${section.toString().slice(1)}`;

    return (
      <Flex
        key={`${section}-${responseDataIdx}}`}
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
              <Title order={5}>{displaySection}</Title>
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
  });

  const displayRestOfGroupedQueryResponseData =
    restOfGroupedQueryResponseData.length > 0
      ? restOfGroupedQueryResponseData.map((queryObj, queryObjIdx) => {
          const displayKeyValues = Object.entries(queryObj).map(
            ([key, value], objIdx) => {
              return (
                <Flex
                  key={`${objIdx}`}
                  align="flex-start"
                  justify="center"
                  direction="column"
                  bg={backgroundColor}
                  style={{
                    borderRadius: 4,
                  }}
                  rowGap={rowGap}
                  // w="100%"
                  // p={padding}
                >
                  <Flex
                    w="100%"
                    align="center"
                    justify="space-between"
                    columnGap={rowGap}
                    p={padding}
                    style={{
                      borderRight: borderColor,
                      borderRadius: 4,
                    }}
                  >
                    <Text>{`${key.charAt(0).toUpperCase()}${key.slice(
                      1
                    )}`}</Text>
                    <Text>{value}</Text>
                  </Flex>
                </Flex>
              );
            }
          );

          return (
            <Flex
              key={`${queryObjIdx}`}
              direction="column"
              p={padding}
              bg={backgroundColor}
              align="flex-start"
              justify="center"
              style={{
                borderRadius: 4,
              }}
              // w="100%"
            >
              {displayKeyValues}
            </Flex>
          );
        })
      : null;

  const displayRestData = (
    <Flex
      direction="column"
      py={padding}
      align="flex-start"
      justify="center"
      style={{
        border: borderColor,
        borderRadius: 4,
      }}
      w="100%"
    >
      <Accordion w="100%">
        <Accordion.Item
          value={`${
            groupedByQueryResponseData.size === 0
              ? 'No documents to display'
              : restOfGroupedQueryResponseData.length === 0
              ? 'All constrained values displayed'
              : 'Rest of constrained values'
          }`}
        >
          <Accordion.Control
            disabled={
              groupedByQueryResponseData.size === 0 ||
              restOfGroupedQueryResponseData.length === 0
            }
          >
            <Title order={5}>{`${
              groupedByQueryResponseData.size === 0
                ? 'No documents to display'
                : restOfGroupedQueryResponseData.length === 0
                ? 'All constrained values displayed'
                : 'Rest of constrained values'
            }`}</Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Flex
              align="center"
              justify="flex-start"
              rowGap={rowGap}
              columnGap={rowGap}
              pt={padding}
              w="100%"
              wrap="wrap"
            >
              {displayRestOfGroupedQueryResponseData}
            </Flex>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Flex>
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

  const displayEditRepairNoteModal = (
    <Modal
      opened={openedEditRepairNotesModal}
      onClose={closeEditRepairNotesModal}
      centered
      size={modalSize}
    >
      <EditRepairNote
        editRepairNoteInput={editRepairNoteInput}
        parentComponentCallbacks={[closeEditRepairNotesModal]}
      />
    </Modal>
  );

  const displayUpdateRequestStatusModal = (
    <Modal
      opened={openedUpdateRequestStatusModal}
      onClose={closeUpdateRequestStatusModal}
      centered
      size={modalSize}
    >
      <UpdateRequestStatus
        documentId={currentDocumentId}
        currentRequestStatus={currentRequestStatus}
        parentComponentDispatch={requestStatusDispatch}
        closeUpdateRequestStatusModal={closeUpdateRequestStatusModal}
      />
    </Modal>
  );

  return (
    <Flex
      direction="column"
      style={{ ...style }}
      align="flex-start"
      justify="center"
      w="100%"
      rowGap={rowGap}
    >
      {displayUpdateRequestStatusModal}
      {displayEditRepairNoteModal}
      {displayGroupedByQueryResponseData}
      {displayRestData}
    </Flex>
  );
}

export { DisplayQueryMobile };
