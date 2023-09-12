import {
  Accordion,
  Button,
  Center,
  Flex,
  Group,
  Highlight,
  HoverCard,
  Popover,
  ScrollArea,
  Space,
  Spoiler,
  Stack,
  Table,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { CSSProperties, FormEvent, useEffect, useReducer } from 'react';
import { IoMdOpen } from 'react-icons/io';
import {
  TbSortAscending,
  TbSortDescending,
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
import {
  addFieldsToObject,
  formatDate,
  logState,
  replaceLastCommaWithAnd,
  returnThemeColors,
  splitCamelCase,
} from '../../../utils';
import { DisplayQueryDesktopProps } from './types';
import {
  COLORS_SWATCHES,
  FIELDNAMES_WITH_DATE_VALUES,
} from '../../../constants/data';
import {
  displayQueryDesktopAction,
  displayQueryDesktopReducer,
  initialDisplayQueryDesktopState,
} from './state';
import { table } from 'console';
import { sortGroupedByQueryResponseData } from './utils';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import {
  TiArrowDownThick,
  TiArrowSortedDown,
  TiArrowUpThick,
} from 'react-icons/ti';

function DisplayQueryDesktop<Doc>({
  componentQueryData,
  deleteFileUploadIdDispatch,
  deleteFormIdDispatch,
  deleteResourceKindDispatch,
  fileUploadsData = [],
  groupedByQueryResponseData,
  groupByRadioData,
  groupBySelection,

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
  const [displayQueryDesktopState, displayQueryDesktopDispatch] = useReducer(
    displayQueryDesktopReducer,
    initialDisplayQueryDesktopState
  );
  const { fieldToSortBy, sortDirection } = displayQueryDesktopState;
  const {
    globalState: { width, padding, rowGap, themeObject },
  } = useGlobalState();
  const {
    authState: { roles },
  } = useAuth();

  const {
    appThemeColors: { backgroundColor },
    generalColors: { grayColorShade, themeColorShade },
    scrollBarStyle,
    tablesThemeColors: {
      tableHeadersBgColor,
      headerBorderColor,
      headersIconColor,
      rowsBorderColor,
      textHighlightColor,
    },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

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
        label: <Title order={5}>Update</Title>,
        semanticName: 'Update request status',
        widthRadioGroup: '100%',
      },
    ]);

  const [createdSubmitRequestStatusButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Submit',
      leftIcon: <TbUpload />,
      buttonType: 'submit',
      semanticDescription: 'Submit request status changes',
      semanticName: 'Submit',
    },
  ]);

  const tableHeaderValueExclusionSet = new Set(['_id', 'userId']); // used for expanded / condensed table view

  console.log('componentQueryData: ', componentQueryData);

  // because the component query data does not contain values of usernames
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

  console.log('groupedByFieldValuesSet: ', groupedByFieldValuesSet);

  // because the data received is in a Map grouped by a field, header values are created separately to avoid creating multiple tables
  const tableHeaderValuesArr =
    groupedByQueryResponseData.size > 0
      ? Array.from(groupedByQueryResponseData).map(
          ([_groupedByFieldKey, queryResponseObjArrays]) => {
            const headerValues =
              tableViewSelection === 'expanded'
                ? Object.keys(queryResponseObjArrays[0])
                : Object.keys(queryResponseObjArrays[0]).filter(
                    (key) => !tableHeaderValueExclusionSet.has(key)
                  );

            const headerValuesWithFieldsInserted =
              // allows for modification of file uploads and deletion of documents
              fileUploadsData.length > 0
                ? [...headerValues, 'fileUploads', 'delete']
                : [...headerValues, 'delete'];

            return headerValuesWithFieldsInserted.map((headerValue) =>
              splitCamelCase(headerValue)
            );
          }
        )[0]
      : [];
  console.log('tableHeaderValuesArr: ', tableHeaderValuesArr);
  console.log('groupBySelection: ', groupBySelection);

  // used to prevent display of sort arrows on groupedBy or id fields
  const headerExclusionSet = new Set([
    '_id',
    'user id',
    'benefit user id',
    'file uploads',
    'delete',
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

  console.log('headerValuesToGetSortArrows: ', headerValuesToGetSortArrows);

  console.log('groupedByQueryResponseData: ', groupedByQueryResponseData);
  const sortedGroupedQueryResponseData = sortGroupedByQueryResponseData({
    componentQueryData,
    groupedByQueryResponseData,
    fieldToSortBy,
    sortDirection,
  });
  console.log(
    'sortedGroupedQueryResponseData: ',
    sortedGroupedQueryResponseData
  );

  const displayTable = (
    <ScrollArea styles={() => scrollBarStyle} type="auto">
      <Table captionSide="top" striped highlightOnHover w="100%">
        <thead
          style={{
            borderRadius: 4,
          }}
        >
          <tr>
            {tableHeaderValuesArr.map((headerValue, headerIdx) => {
              const headerStyle: CSSProperties = {
                // border:
                //   colorScheme === 'light' ? '' : `1px solid ${scrollBarColor}`,
                // borderLeft: headerBorderColor,
                // borderRight: headerBorderColor,
                border: headerBorderColor,
                backgroundColor: tableHeadersBgColor,
                padding: '4px 4px 4px 8px',
              };
              const headerGroupStyle: CSSProperties = {
                width:
                  headerValue === '_id'
                    ? 'Document Id'.length * 10 + 60
                    : headerValue.length * 10 + 60, // rough ch plus space for sort arrows
                backgroundColor: tableHeadersBgColor,
              };

              const ascendingIconColor =
                headerValue === fieldToSortBy && sortDirection === 'asc'
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
                      style={{ cursor: 'pointer' }}
                      size={17}
                      onClick={() => {
                        displayQueryDesktopDispatch({
                          type: displayQueryDesktopAction.setFieldToSortBy,
                          payload: headerValue,
                        });
                        displayQueryDesktopDispatch({
                          type: displayQueryDesktopAction.setSortDirection,
                          payload: 'asc',
                        });
                      }}
                    />
                  </Group>
                </Tooltip>
              );

              const descendingIconColor =
                headerValue === fieldToSortBy && sortDirection === 'desc'
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
                      style={{ cursor: 'pointer' }}
                      size={17}
                      onClick={() => {
                        displayQueryDesktopDispatch({
                          type: displayQueryDesktopAction.setFieldToSortBy,
                          payload: headerValue,
                        });
                        displayQueryDesktopDispatch({
                          type: displayQueryDesktopAction.setSortDirection,
                          payload: 'desc',
                        });
                      }}
                    />
                  </Group>
                </Tooltip>
              );

              const headerRowWithSortArrows =
                headerValuesToGetSortArrows.includes(headerValue) ? (
                  <Group style={headerGroupStyle} position="center">
                    {ascendingIconWithTooltip}
                    <Title order={6}>
                      {headerValue === '_id' ? 'Document Id' : headerValue}
                    </Title>
                    {descendingIconWithTooltip}
                  </Group>
                ) : (
                  <Group style={headerGroupStyle} position="center">
                    <Title order={6}>
                      {headerValue === '_id' ? 'Document Id' : headerValue}
                    </Title>
                  </Group>
                );

              const displayExpandedHeaderRows = (
                <th key={`${headerIdx}`} style={headerStyle}>
                  {headerRowWithSortArrows}
                </th>
              );

              const displayCondensedHeaderRows =
                !tableHeaderValueExclusionSet.has(headerValue) ? (
                  <th key={`${headerIdx}`} style={headerStyle}>
                    {headerRowWithSortArrows}
                  </th>
                ) : null;

              return tableViewSelection === 'expanded'
                ? displayExpandedHeaderRows
                : displayCondensedHeaderRows;
            })}
          </tr>
        </thead>
        {Array.from(sortedGroupedQueryResponseData).map(
          ([groupedByFieldKey, queryResponseObjArrays], sectionIdx) => {
            return (
              <tbody>
                {queryResponseObjArrays.map((queryResponseObj, objIdx) => {
                  // delete field is added to the query response object to display delete button
                  // fileUploads field is added to the query response object to display open file uploads modal button
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
                    <tr
                      key={`${objIdx}`}
                      style={{ borderBottom: rowsBorderColor }}
                    >
                      {Object.entries(queryResponseObjWithAddedFields).map(
                        ([key, value], keyValIdx) => {
                          const formattedValue =
                            value === true
                              ? 'Yes'
                              : value === false
                              ? 'No'
                              : Array.isArray(value)
                              ? replaceLastCommaWithAnd(value.join(', '))
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
                                  .toUpperCase()}${value.toString().slice(1)}`;

                          const sliceLength = 23;
                          const formattedValueSliced =
                            formattedValue.length > sliceLength
                              ? formattedValue
                                  .toString()
                                  .slice(
                                    0,
                                    key.toLowerCase().includes('id')
                                      ? 11
                                      : sliceLength
                                  ) + '...'
                              : formattedValue;

                          const highlightedText = groupedByFieldValuesSet.has(
                            `${value}` // because value can be boolean and set contains strings
                          ) ? (
                            <Highlight
                              highlight={formattedValue}
                              highlightStyles={{
                                backgroundColor: textHighlightColor,
                              }}
                            >
                              {formattedValueSliced}
                            </Highlight>
                          ) : (
                            <Text>{formattedValueSliced}</Text>
                          );

                          // allows for convenient access to username, userId and groupBySelectionField when viewing a large table
                          const username =
                            queryResponseObjWithAddedFields.username ??
                            // anonymousRequest documents do not have username field
                            'Anonymous';

                          const userId =
                            queryResponseObjWithAddedFields.userId ??
                            // benefits document does not have userId field and instead has benefitUserId field
                            queryResponseObjWithAddedFields.benefitUserId;
                          const groupBySelectionValue =
                            queryResponseObjWithAddedFields[groupBySelection];

                          const dropDownFooter = (
                            <Flex wrap="wrap">
                              {groupBySelection === 'username' ? null : (
                                <Group>
                                  <Text>
                                    {splitCamelCase(groupBySelection)}:
                                  </Text>
                                  {/* because some values are boolean but are displayed as 'Yes' or 'No' */}
                                  <Text>
                                    <strong>{`${
                                      groupBySelectionValue === true
                                        ? 'Yes'
                                        : groupBySelectionValue === false
                                        ? 'No'
                                        : `${groupBySelectionValue
                                            .charAt(0)
                                            .toUpperCase()}${groupBySelectionValue.slice(
                                            1
                                          )}`
                                    }`}</strong>
                                  </Text>
                                  <Space w="xs" />
                                </Group>
                              )}

                              <Group>
                                <Text>Username: </Text>

                                <Text>
                                  {groupBySelection === 'username' ? (
                                    <strong>{`${splitCamelCase(
                                      username
                                    )}`}</strong>
                                  ) : (
                                    `${splitCamelCase(username)}`
                                  )}
                                </Text>

                                <Text>{`User Id: ${userId}`}</Text>
                              </Group>
                            </Flex>
                          );

                          const truncatedValuesWithHoverCards =
                            FIELDNAMES_WITH_DATE_VALUES.has(key) ? (
                              <HoverCard
                                width={500}
                                shadow="lg"
                                openDelay={250}
                                closeDelay={100}
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
                                            dateStyle: 'full',
                                            localeMatcher: 'best fit',
                                            formatMatcher: 'best fit',
                                          },
                                          locale: 'en-US',
                                        })}
                                      </Text>
                                    </Group>
                                    {dropDownFooter}
                                  </Stack>
                                </HoverCard.Dropdown>
                              </HoverCard>
                            ) : key === 'createdAt' || key === 'updatedAt' ? (
                              <HoverCard
                                width={500}
                                shadow="lg"
                                openDelay={250}
                                closeDelay={100}
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
                                          dateStyle: 'full',
                                          timeStyle: 'long',
                                          hour12: false,
                                        },
                                        locale: 'en-US',
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
                                openDelay={250}
                                closeDelay={100}
                                withArrow
                              >
                                <HoverCard.Target>
                                  {highlightedText}
                                </HoverCard.Target>
                                <HoverCard.Dropdown>
                                  <Stack>
                                    {/* prevents displaying username twice in dropdown */}
                                    {key === 'username' ? null : (
                                      <Text>
                                        {key === '_id'
                                          ? 'Document Id'
                                          : splitCamelCase(key)}
                                        : {formattedValue}
                                      </Text>
                                    )}
                                    {dropDownFooter}
                                  </Stack>
                                </HoverCard.Dropdown>
                              </HoverCard>
                            );

                          async function handleRequestStatusChangeFormSubmit(
                            event: FormEvent<HTMLFormElement>
                          ) {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const requestStatus = formData.get('requestStatus');

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
                                key: groupedByFieldKey.toString(),
                                popoverState: {
                                  index: objIdx,
                                  value: false,
                                },
                              },
                            });
                          }

                          const createdRequestStatusPopover = (
                            <Popover
                              width={480}
                              position="left"
                              withArrow
                              shadow="lg"
                              opened={
                                popoversOpenCloseState?.get(
                                  groupedByFieldKey.toString()
                                )?.[objIdx]
                              }
                            >
                              <Popover.Target>
                                <Tooltip
                                  label={`Modify request status of id: ${queryResponseObjWithAddedFields._id}`}
                                >
                                  {/* most relevant info will be read out first */}
                                  <Button
                                    aria-label={`Modify current request status of ${queryResponseObjWithAddedFields.requestStatus} for username: ${queryResponseObjWithAddedFields.username} and form with id: ${queryResponseObjWithAddedFields._id}`}
                                    size="xs"
                                    onClick={() => {
                                      popoversStateDispatch({
                                        type: 'setPopoversOpenCloseState',
                                        payload: {
                                          key: groupedByFieldKey.toString(),
                                          popoverState: {
                                            index: objIdx,
                                            value: !popoversOpenCloseState?.get(
                                              groupedByFieldKey.toString()
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
                                  onSubmit={handleRequestStatusChangeFormSubmit}
                                >
                                  <Stack w="100%">
                                    {createdUpdateRequestStatusRadioGroup}
                                    <Group w="100%" position="right">
                                      {createdSubmitRequestStatusButton}
                                    </Group>
                                  </Stack>
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
                            <td key={`${objIdx}-${keyValIdx}`}>
                              {key === 'requestStatus' ? (
                                <Group w="100%" position="right">
                                  <Text>{truncatedValuesWithHoverCards}</Text>
                                  {displayUpdateRequestStatusButton}
                                </Group>
                              ) : (
                                <Group w="100%" position="right">
                                  {truncatedValuesWithHoverCards}
                                </Group>
                              )}
                            </td>
                          );

                          const displayCondensedBodyRows =
                            !tableHeaderValueExclusionSet.has(
                              Object.keys(queryResponseObjWithAddedFields)[
                                keyValIdx
                              ]
                            ) ? (
                              <td key={`${objIdx}-${keyValIdx}`}>
                                {key === 'requestStatus' ? (
                                  <Group position="right" w="100%">
                                    <Text>{truncatedValuesWithHoverCards}</Text>
                                    {displayUpdateRequestStatusButton}
                                  </Group>
                                ) : (
                                  <Group w="100%" position="right">
                                    {truncatedValuesWithHoverCards}
                                  </Group>
                                )}
                              </td>
                            ) : null;

                          const [
                            createdDeleteFormButton,
                            createdOpenFileUploadsModalButton,
                          ] = returnAccessibleButtonElements([
                            {
                              buttonLabel: <TbTrash />,
                              semanticDescription: `Delete form with id: ${queryResponseObjWithAddedFields._id} belonging to username: ${queryResponseObjWithAddedFields.username}`,
                              semanticName: 'Delete',
                              buttonOnClick: () => {
                                deleteFormIdDispatch({
                                  type: 'setDeleteFormId',
                                  payload: queryResponseObjWithAddedFields._id,
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
                              buttonDisabled:
                                !fileUploadsData[objIdx]?.fileUploads.length,
                              semanticDescription: `${
                                !fileUploadsData[objIdx]?.fileUploads.length
                                  ? `No file uploads associated with username: ${queryResponseObjWithAddedFields.username}with form id: ${queryResponseObjWithAddedFields._id}}`
                                  : `View file uploads belonging to username: ${queryResponseObjWithAddedFields.username}with form id: ${queryResponseObjWithAddedFields._id}`
                              }`,
                              semanticName: 'Open file uploads modal',
                              buttonOnClick: () => {
                                setFileUploadsForAFormDispatch({
                                  type: 'setFileUploadsForAForm',
                                  payload: fileUploadsData[objIdx]?.fileUploads,
                                });
                                deleteFormIdDispatch({
                                  type: 'setDeleteFormId',
                                  payload: queryResponseObjWithAddedFields._id,
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
                            ) : null;

                          const displayDeleteButton =
                            key === 'delete' ? (
                              <td key={`${sectionIdx}-${objIdx}-${keyValIdx}`}>
                                <Center>
                                  <Tooltip
                                    label={`Delete form with id: ${queryResponseObjWithAddedFields._id}`}
                                  >
                                    <Group w="100%" position="right">
                                      {createdDeleteFormButton}
                                    </Group>
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
            );
          }
        )}
      </Table>
    </ScrollArea>
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
            wrap="wrap"
            w="fit-content"
            columnGap={rowGap}
            rowGap={rowGap}
            p={padding}
            style={{
              overflowX: 'auto',
              overflowY: 'hidden',
              // border: headerBorderColor,
              // borderRadius: 4,
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
                    bg={backgroundColor}
                    style={{
                      borderRadius: 4,
                      borderRight: headerBorderColor,
                    }}
                  >
                    <Group>
                      <Text>{splitCamelCase(key)}:</Text>
                      <Text>{value}</Text>
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

  useEffect(() => {
    logState({
      state: displayQueryDesktopState,
      groupLabel: 'displayQueryDesktopState',
    });
  }, [displayQueryDesktopState]);

  return (
    <Stack w="100%" style={{ ...style }}>
      {displayTable}
      {displayRestOfGroupedByData}
    </Stack>
  );
}

export { DisplayQueryDesktop };
