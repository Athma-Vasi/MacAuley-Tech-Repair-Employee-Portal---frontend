import {
  Accordion,
  Button,
  Divider,
  Flex,
  Group,
  Highlight,
  Popover,
  Spoiler,
  Text,
  Title,
} from '@mantine/core';
import { FormEvent, useEffect, useReducer } from 'react';
import { IoMdOpen } from 'react-icons/io';
import {
  TbArrowDown,
  TbArrowUp,
  TbEdit,
  TbStatusChange,
  TbTrash,
  TbUpload,
} from 'react-icons/tb';

import {
  COLORS_SWATCHES,
  FIELDNAMES_WITH_DATE_VALUES,
} from '../../../constants/data';
import { useAuth, useGlobalState } from '../../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleRadioGroupInputsElements,
} from '../../../jsxCreators';
import { RequestStatus } from '../../../types';
import {
  addFieldsToObject,
  formatDate,
  returnThemeColors,
  splitCamelCase,
} from '../../../utils';
import { DisplayQueryMobileProps } from './types';
import {
  displayQueryMobileAction,
  displayQueryMobileReducer,
  initialDisplayQueryMobileState,
} from './state';
import { useDisclosure } from '@mantine/hooks';

function DisplayQueryMobile({
  componentQueryData,
  deleteFileUploadIdDispatch,
  deleteFormIdDispatch,
  deleteResourceKindDispatch,
  fileUploadsData = [],
  groupedByQueryResponseData,
  groupBySelection,
  openDeleteAcknowledge,
  openFileUploads,
  setFileUploadsForAFormDispatch,
  popoversStateDispatch,
  popoversOpenCloseState,
  restOfGroupedQueryResponseData,
  requestStatusDispatch,
  style = {},
  tableViewSelection,
}: DisplayQueryMobileProps): JSX.Element {
  const [displayQueryMobileState, displayQueryMobileDispatch] = useReducer(
    displayQueryMobileReducer,
    initialDisplayQueryMobileState
  );
  const { editRepairNoteInput } = displayQueryMobileState;

  const {
    globalState: { width, padding, rowGap, themeObject },
  } = useGlobalState();
  const {
    authState: { roles },
  } = useAuth();

  // for repair note fields update only
  const [
    openedEditRepairNotesModal,
    { open: openEditRepairNotesModal, close: closeEditRepairNotesModal },
  ] = useDisclosure(false);

  const createdUpdateRequestStatusRadioGroup =
    returnAccessibleRadioGroupInputsElements([
      {
        columns: 1,
        dataObjectArray: [
          {
            label: 'Approved',
            value: 'approved',
          },
          {
            label: 'Pending',
            value: 'pending',
          },
          {
            label: 'Rejected',
            value: 'rejected',
          },
        ],
        description: 'Update request status',
        label: 'Update',
        onChange: () => {},
        name: 'requestStatus',
        semanticName: 'Update request status',
      },
    ]);

  const [
    createdShowMoreButton,
    createdHideButton,
    createdSubmitRequestStatusButton,
  ] = returnAccessibleButtonElements([
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

    {
      buttonLabel: 'Submit',
      leftIcon: <TbUpload />,
      buttonType: 'submit',
      semanticDescription: 'Submit request status changes',
      semanticName: 'Submit',
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

        const highlightedText = groupedByFieldValuesSet.has(
          `${value}` // value can be boolean and set contains strings
        ) ? (
          <Highlight
            highlight={formattedValue}
            highlightStyles={{
              backgroundColor: textHighlightColor,
            }}
          >
            {formattedValue}
          </Highlight>
        ) : (
          <Text>{formattedValue}</Text>
        );

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

        async function handleRequestStatusChangeFormSubmit(
          event: FormEvent<HTMLFormElement>
        ) {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const requestStatus = formData.get('requestStatus');

          requestStatusDispatch({
            type: 'setRequestStatus',
            payload: {
              id: queryObj._id,
              status: requestStatus as RequestStatus,
            },
          });

          popoversStateDispatch({
            type: 'setPopoversOpenCloseState',
            payload: {
              key: section.toString(),
              popoverState: {
                index: queryObjIdx,
                value: false,
              },
            },
          });
        }

        const createdRequestStatusPopover = (
          <Popover
            width={200}
            position={width < 480 ? 'bottom' : 'bottom-end'}
            withArrow
            shadow="lg"
            opened={
              popoversOpenCloseState?.get(section.toString())?.[queryObjIdx]
            }
          >
            <Popover.Target>
              <Button
                size="xs"
                onClick={() => {
                  popoversStateDispatch({
                    type: 'setPopoversOpenCloseState',
                    payload: {
                      key: section.toString(),
                      popoverState: {
                        index: queryObjIdx,
                        value: !popoversOpenCloseState?.get(
                          section.toString()
                        )?.[queryObjIdx],
                      },
                    },
                  });
                }}
              >
                <TbStatusChange />
              </Button>
            </Popover.Target>
            <Popover.Dropdown p={padding}>
              <form onSubmit={handleRequestStatusChangeFormSubmit}>
                <Flex
                  direction="column"
                  align="flex-end"
                  justify="center"
                  rowGap={rowGap}
                >
                  {createdUpdateRequestStatusRadioGroup}
                  {createdSubmitRequestStatusButton}
                </Flex>
              </form>
            </Popover.Dropdown>
          </Popover>
        );

        // only managers can update request status
        const displayUpdateRequestStatusButton = roles.includes('Manager')
          ? key === 'requestStatus'
            ? createdRequestStatusPopover
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

        const displayFullLabelValueRow = (
          <Flex w="100%">
            <Flex w="100%">
              <Text>{sectionKey === '_id' ? 'Document Id' : sectionKey}</Text>
            </Flex>
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
                <Text>{highlightedText}</Text>
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
            style={{ borderBottom: lastKeyValBorderBottom }}
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
          // style={{ border: borderColor }}
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

  return (
    <Flex
      direction="column"
      style={{ ...style }}
      align="flex-start"
      justify="center"
      w="100%"
      rowGap={rowGap}
    >
      {displayGroupedByQueryResponseData}
      {displayRestData}
    </Flex>
  );
}

export { DisplayQueryMobile };
