import {
  Accordion,
  Button,
  Center,
  Flex,
  Group,
  HoverCard,
  Popover,
  Spoiler,
  Stack,
  Table,
  Text,
  Tooltip,
} from '@mantine/core';
import { FormEvent } from 'react';
import { IoMdOpen } from 'react-icons/io';
import {
  TbArrowDown,
  TbArrowUp,
  TbStatusChange,
  TbTrash,
  TbUpload,
} from 'react-icons/tb';

import { useAuth, useGlobalState } from '../../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleRadioGroupInputsElements,
} from '../../../jsxCreators';
import { RequestStatus } from '../../../types';
import { addFieldsToObject, formatDate, splitCamelCase } from '../../../utils';
import { DisplayQueryDesktopProps } from './types';
import { FIELDNAMES_WITH_DATE_VALUES } from '../../../constants/data';

function DisplayQueryDesktop<Doc>({
  componentQueryData,
  deleteFileUploadIdDispatch,
  deleteFormIdDispatch,
  deleteResourceKindDispatch,
  fileUploadsData = [],
  groupedByQueryResponseData,

  openDeleteAcknowledge,
  openFileUploads,
  setFileUploadsForAFormDispatch,

  popoversOpenCloseState,
  popoversStateDispatch,

  restOfGroupedQueryResponseData,
  requestStatusDispatch,
  style = {},
  tableViewSelection,
}: DisplayQueryDesktopProps<Doc>) {
  const {
    globalState: { width, padding, rowGap },
  } = useGlobalState();
  const {
    authState: { roles },
  } = useAuth();

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
        description: 'Update request status of this form',
        onChange: () => {},
        name: 'requestStatus',
        label: 'Update',
        semanticName: 'Update request status',
      },
    ]);

  const [createdSubmitRequestStatusButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Submit',
      leftIcon: <TbUpload />,
      buttonType: 'submit',
      semanticDescription: 'Submit request status changes',
      semanticName: 'Submit',
      size: 'xs',
    },
  ]);

  const tableKeyExclusionSet = new Set(['_id', 'userId', 'action', 'category']);

  const displayTable = Array.from(groupedByQueryResponseData).map(
    ([section, queryResponseObjArrays], sectionIdx) => {
      const numOfFields =
        tableViewSelection === 'expanded'
          ? Object.keys(queryResponseObjArrays[0]).length
          : Object.keys(queryResponseObjArrays[0]).filter(
              (key) => !tableKeyExclusionSet.has(key)
            ).length;
      // to account for the delete field added on
      const widthPerField = `${(100 / (numOfFields + 1)).toFixed(2)}%`;

      const displaySection = `${section
        .toString()
        .charAt(0)
        .toUpperCase()}${section.toString().slice(1)}`;

      const tableHeaderRow =
        fileUploadsData.length > 0
          ? Object.keys(
              addFieldsToObject({
                object: queryResponseObjArrays[0],
                fieldValuesTuples: [
                  ['fileUploads', ''],
                  ['delete', ''],
                ],
              })
            )
          : Object.keys(
              addFieldsToObject({
                object: queryResponseObjArrays[0],
                fieldValuesTuples: [['delete', '']],
              })
            );

      return (
        <Flex
          key={`${sectionIdx}`}
          direction="column"
          align="flex-start"
          justify="center"
          w="100%"
          rowGap={rowGap}
          style={{
            overflowX: 'auto',
            outline: '1px solid teal',
          }}
        >
          <Accordion w="100%">
            <Accordion.Item value={displaySection}>
              <Accordion.Control>{displaySection}</Accordion.Control>
              <Accordion.Panel>
                <Table captionSide="top" striped highlightOnHover w="100%">
                  <thead
                    style={{
                      backgroundColor: '#e0e0e0',
                      borderRadius: 4,
                    }}
                  >
                    <tr>
                      {tableHeaderRow.map((key, keyIdx) => {
                        const displayExpandedHeaderRows = (
                          <th
                            key={`${keyIdx}`}
                            style={{
                              width: widthPerField,
                              outline: '1px solid violet',
                              padding: '4px 4px 4px 8px',
                            }}
                          >
                            <Text>{splitCamelCase(key)}</Text>
                          </th>
                        );

                        const displayCondensedHeaderRows =
                          !tableKeyExclusionSet.has(key) ? (
                            <th
                              key={`${keyIdx}`}
                              style={{
                                width: widthPerField,
                                outline: '1px solid violet',
                                padding: '4px 4px 4px 8px',
                              }}
                            >
                              <Text truncate>{splitCamelCase(key)}</Text>
                            </th>
                          ) : null;

                        return tableViewSelection === 'expanded'
                          ? displayExpandedHeaderRows
                          : displayCondensedHeaderRows;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {queryResponseObjArrays.map((queryResponseObj, objIdx) => {
                      const queryResponseObjWithAddedFields =
                        fileUploadsData.length > 0
                          ? addFieldsToObject({
                              object: queryResponseObj,
                              fieldValuesTuples: [
                                ['fileUploads', ''],
                                ['delete', ''],
                              ],
                            })
                          : addFieldsToObject({
                              object: queryResponseObj,
                              fieldValuesTuples: [['delete', '']],
                            });

                      const rowWithStringifiedValues = (
                        <tr key={`${objIdx}`}>
                          {Object.entries(queryResponseObjWithAddedFields).map(
                            ([key, value], keyValIdx) => {
                              const formattedValue =
                                value === true
                                  ? 'Yes'
                                  : value === false
                                  ? 'No'
                                  : Array.isArray(value)
                                  ? value.join(', ')
                                  : key.toLowerCase().includes('id')
                                  ? value
                                  : key === 'createdAt' || key === 'updatedAt'
                                  ? formatDate({
                                      date: value,
                                      formatOptions: {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
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
                                  : `${value
                                      .toString()
                                      .charAt(0)
                                      .toUpperCase()}${value
                                      .toString()
                                      .slice(1)}`;

                              const sliceLength =
                                tableViewSelection === 'expanded' ? 7 : 13;

                              const truncatedValuesWithHoverCards =
                                FIELDNAMES_WITH_DATE_VALUES.has(key) ? (
                                  <HoverCard
                                    width={382}
                                    shadow="lg"
                                    openDelay={250}
                                    closeDelay={100}
                                  >
                                    <HoverCard.Target>
                                      <Text>{formattedValue}</Text>
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown>
                                      <Text>
                                        {formatDate({
                                          date: value,
                                          formatOptions: {
                                            dateStyle: 'full',
                                            localeMatcher: 'best fit',
                                            formatMatcher: 'best fit',
                                          },
                                          locale: 'en-US',
                                        })}
                                      </Text>
                                    </HoverCard.Dropdown>
                                  </HoverCard>
                                ) : key === 'createdAt' ||
                                  key === 'updatedAt' ? (
                                  <HoverCard
                                    width={382}
                                    shadow="lg"
                                    openDelay={250}
                                    closeDelay={100}
                                  >
                                    <HoverCard.Target>
                                      <Text>{formattedValue}</Text>
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown>
                                      <Text>
                                        {formatDate({
                                          date: value,
                                          formatOptions: {
                                            dateStyle: 'full',
                                            timeStyle: 'long',
                                            hour12: false,
                                          },
                                          locale: 'en-US',
                                        })}
                                      </Text>
                                    </HoverCard.Dropdown>
                                  </HoverCard>
                                ) : key.toLowerCase().includes('id') ||
                                  formattedValue.length > 19 ? (
                                  <HoverCard
                                    width={500}
                                    shadow="lg"
                                    openDelay={250}
                                    closeDelay={100}
                                  >
                                    <HoverCard.Target>
                                      <Text>
                                        {`${formattedValue
                                          .toString()
                                          .slice(0, sliceLength)}...`}
                                      </Text>
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown>
                                      <Text>
                                        {splitCamelCase(key)}: {formattedValue}
                                      </Text>
                                    </HoverCard.Dropdown>
                                  </HoverCard>
                                ) : (
                                  <Spoiler
                                    maxHeight={25}
                                    showLabel={
                                      <Center>
                                        <TbArrowDown />
                                        <Text>Show</Text>
                                      </Center>
                                    }
                                    hideLabel={
                                      <Center>
                                        <TbArrowUp />
                                        <Text>Hide</Text>
                                      </Center>
                                    }
                                  >
                                    <Text>{formattedValue}</Text>
                                  </Spoiler>
                                );

                              async function handleRequestStatusChangeFormSubmit(
                                event: FormEvent<HTMLFormElement>
                              ) {
                                event.preventDefault();
                                const formData = new FormData(
                                  event.currentTarget
                                );
                                const requestStatus =
                                  formData.get('requestStatus');

                                requestStatusDispatch({
                                  type: 'setRequestStatus',
                                  payload: {
                                    id: queryResponseObjWithAddedFields._id,
                                    status: requestStatus as RequestStatus,
                                  },
                                });

                                popoversStateDispatch({
                                  type: 'setPopoversOpenCloseState',
                                  payload: {
                                    key: section.toString(),
                                    popoverState: {
                                      index: objIdx,
                                      value: false,
                                    },
                                  },
                                });
                              }

                              const createdRequestStatusPopover = (
                                <Popover
                                  width={200}
                                  position={
                                    width < 480 ? 'bottom' : 'bottom-end'
                                  }
                                  withArrow
                                  shadow="lg"
                                  opened={
                                    popoversOpenCloseState?.get(
                                      section.toString()
                                    )?.[objIdx]
                                  }
                                >
                                  <Popover.Target>
                                    <Tooltip
                                      label={`Modify request status of id: ${queryResponseObjWithAddedFields._id}`}
                                    >
                                      <Button
                                        variant="subtle"
                                        size="xs"
                                        onClick={() => {
                                          popoversStateDispatch({
                                            type: 'setPopoversOpenCloseState',
                                            payload: {
                                              key: section.toString(),
                                              popoverState: {
                                                index: objIdx,
                                                value:
                                                  !popoversOpenCloseState?.get(
                                                    section.toString()
                                                  )?.[objIdx],
                                              },
                                            },
                                          });
                                        }}
                                      >
                                        <TbStatusChange />
                                      </Button>
                                    </Tooltip>
                                  </Popover.Target>
                                  <Popover.Dropdown p={padding}>
                                    <form
                                      onSubmit={
                                        handleRequestStatusChangeFormSubmit
                                      }
                                    >
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
                              const displayUpdateRequestStatusButton =
                                roles.includes('Manager')
                                  ? key === 'requestStatus'
                                    ? createdRequestStatusPopover
                                    : null
                                  : null;

                              const displayExpandedBodyRows = (
                                <td
                                  key={`${keyValIdx}`}
                                  style={{ width: widthPerField }}
                                >
                                  {key === 'requestStatus' ? (
                                    <Flex
                                      wrap="wrap"
                                      align="center"
                                      justify="space-between"
                                      w="100%"
                                    >
                                      <Text>
                                        {truncatedValuesWithHoverCards}
                                      </Text>
                                      {displayUpdateRequestStatusButton}
                                    </Flex>
                                  ) : (
                                    truncatedValuesWithHoverCards
                                  )}
                                </td>
                              );

                              const displayCondensedBodyRows =
                                !tableKeyExclusionSet.has(
                                  Object.keys(queryResponseObjWithAddedFields)[
                                    keyValIdx
                                  ]
                                ) ? (
                                  <td
                                    key={`${keyValIdx}`}
                                    style={{ width: widthPerField }}
                                  >
                                    {key === 'requestStatus' ? (
                                      <Flex
                                        wrap="wrap"
                                        align="center"
                                        justify="space-between"
                                        w="100%"
                                      >
                                        <Text>
                                          {truncatedValuesWithHoverCards}
                                        </Text>
                                        {displayUpdateRequestStatusButton}
                                      </Flex>
                                    ) : (
                                      truncatedValuesWithHoverCards
                                    )}
                                  </td>
                                ) : null;

                              const [
                                createdDeleteFormButton,
                                createdOpenFileUploadsModalButton,
                              ] = returnAccessibleButtonElements([
                                {
                                  buttonLabel: <TbTrash />,
                                  semanticDescription: 'Delete this form',
                                  semanticName: 'Delete',
                                  buttonVariant: 'subtle',
                                  size: 'sm',
                                  buttonOnClick: () => {
                                    deleteFormIdDispatch({
                                      type: 'setDeleteFormId',
                                      payload:
                                        queryResponseObjWithAddedFields._id,
                                    });
                                    deleteResourceKindDispatch({
                                      type: 'setDeleteResourceKind',
                                      payload: 'form',
                                    });
                                    openDeleteAcknowledge();
                                  },
                                },
                                {
                                  buttonLabel: <IoMdOpen />,
                                  buttonVariant: 'subtle',
                                  buttonDisabled:
                                    !fileUploadsData[objIdx]?.fileUploads
                                      .length,
                                  semanticDescription:
                                    'Open modal to display file uploads associated with this document',
                                  semanticName: 'Open file uploads modal',
                                  buttonOnClick: () => {
                                    setFileUploadsForAFormDispatch({
                                      type: 'setFileUploadsForAForm',
                                      payload:
                                        fileUploadsData[objIdx]?.fileUploads,
                                    });
                                    deleteFormIdDispatch({
                                      type: 'setDeleteFormId',
                                      payload:
                                        queryResponseObjWithAddedFields._id,
                                    });
                                    openFileUploads();
                                  },
                                },
                              ]);

                              const viewFileUploadsButtonToolTipLabel =
                                !fileUploadsData[objIdx]?.fileUploads.length
                                  ? `No file uploads associated with id: ${queryResponseObjWithAddedFields._id}`
                                  : `View file uploads belonging to id: ${queryResponseObjWithAddedFields._id}`;

                              const displayOpenFileUploadsModalButton =
                                key === 'fileUploads' ? (
                                  <td
                                    key={`${sectionIdx}-${objIdx}-${keyValIdx}`}
                                    style={{ width: widthPerField }}
                                  >
                                    <Center>
                                      <Tooltip
                                        label={
                                          viewFileUploadsButtonToolTipLabel
                                        }
                                      >
                                        <Group>
                                          {createdOpenFileUploadsModalButton}
                                        </Group>
                                      </Tooltip>
                                    </Center>
                                  </td>
                                ) : null;

                              const displayDeleteButton =
                                key === 'delete' ? (
                                  <td
                                    key={`${sectionIdx}-${objIdx}-${keyValIdx}`}
                                    style={{ width: widthPerField }}
                                  >
                                    <Center>
                                      <Tooltip
                                        label={`Delete form with id: ${queryResponseObjWithAddedFields._id}`}
                                      >
                                        <Group>{createdDeleteFormButton}</Group>
                                      </Tooltip>
                                    </Center>
                                  </td>
                                ) : null;

                              return key === 'delete'
                                ? displayDeleteButton
                                : key === 'fileUploads'
                                ? displayOpenFileUploadsModalButton
                                : tableViewSelection === 'expanded'
                                ? displayExpandedBodyRows
                                : displayCondensedBodyRows;
                            }
                          )}
                        </tr>
                      );

                      return rowWithStringifiedValues;
                    })}
                  </tbody>
                </Table>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Flex>
      );
    }
  );

  const displayRestOfGroupedByData = (
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
          <Text>{`${
            groupedByQueryResponseData.size === 0
              ? 'No documents to display'
              : restOfGroupedQueryResponseData.length === 0
              ? 'All constrained values displayed'
              : 'Rest of constrained values'
          }`}</Text>
        </Accordion.Control>
        <Accordion.Panel>
          <Flex
            align="center"
            justify="flex-start"
            wrap="wrap"
            w="fit-content"
            columnGap={rowGap}
            rowGap={rowGap}
            p={padding}
            style={{
              overflowX: 'auto',
              overflowY: 'hidden',
              border: '1px solid #e0e0e0',
              borderRadius: 4,
            }}
          >
            {restOfGroupedQueryResponseData.map((queryResponseObj, objIdx) => {
              const keyValPairs = Object.entries(queryResponseObj).map(
                ([key, value], keyValIdx) => (
                  <Flex
                    align="center"
                    justify="flex-start"
                    columnGap={rowGap}
                    key={`${objIdx}-${keyValIdx}`}
                    p={padding}
                    style={{
                      backgroundColor: objIdx % 2 === 0 ? '#f5f5f5' : '#ffffff',
                      borderRadius: 4,
                    }}
                  >
                    <Group>
                      <Text size="xs">{splitCamelCase(key)}:</Text>
                      <Text size="xs">{value}</Text>
                    </Group>
                  </Flex>
                )
              );

              return keyValPairs;
            })}
          </Flex>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  return (
    <Stack w="100%" style={{ ...style }}>
      {displayTable}
      {displayRestOfGroupedByData}
    </Stack>
  );
}

export { DisplayQueryDesktop };
