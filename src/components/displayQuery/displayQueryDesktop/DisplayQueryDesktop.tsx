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
import { CSSProperties, FormEvent } from 'react';
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
import {
  addFieldsToObject,
  formatDate,
  replaceLastCommaWithAnd,
  splitCamelCase,
} from '../../../utils';
import { DisplayQueryDesktopProps } from './types';
import {
  COLORS_SWATCHES,
  FIELDNAMES_WITH_DATE_VALUES,
} from '../../../constants/data';

function DisplayQueryDesktop<Doc>({
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

  popoversOpenCloseState,
  popoversStateDispatch,

  restOfGroupedQueryResponseData,
  requestStatusDispatch,
  style = {},
  tableViewSelection,
}: DisplayQueryDesktopProps<Doc>) {
  const {
    globalState: {
      width,
      padding,
      rowGap,
      themeObject: { colorScheme, primaryColor, primaryShade },
    },
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
      // size: 'xs',
    },
  ]);

  const { dark, gray } = COLORS_SWATCHES;
  const borderColor =
    colorScheme === 'light' ? `1px solid ${gray[3]}` : `1px solid ${gray[8]}`;
  const backgroundColor =
    colorScheme === 'light'
      ? 'radial-gradient(circle, #f9f9f9 50%, #f5f5f5 100%)'
      : dark[6];

  const colorShade =
    colorScheme === 'light' ? primaryShade.light : primaryShade.dark;
  const themeColor = Object.entries(COLORS_SWATCHES).find(
    ([color, _shades]) => color === primaryColor
  )?.[1];
  const scrollBarColor = themeColor ? themeColor[colorShade] : gray[5];
  const tableHeadersBgColor = themeColor ? themeColor[3] : gray[0];
  const highlightColor = themeColor
    ? colorScheme === 'light'
      ? themeColor[2]
      : gray[6]
    : gray[6];

  console.log('colorScheme: ', colorScheme);
  console.log('highlightColor: ', highlightColor);

  const scrollBarStyle = {
    scrollbar: {
      '&, &:hover': {
        background: colorScheme === 'dark' ? dark[6] : gray[0],
      },

      '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
        backgroundColor: scrollBarColor,
      },

      '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
        backgroundColor: scrollBarColor,
      },
    },

    corner: {
      opacity: 1,
      background: colorScheme === 'dark' ? dark[6] : gray[0],
    },
  };

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

  // because the data received is in a Map grouped by a field, header is created separately to avoid creating multiple tables
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
                border:
                  colorScheme === 'light' ? '' : `1px solid ${scrollBarColor}`,
                backgroundColor:
                  colorScheme === 'light' ? tableHeadersBgColor : '',
                padding: '4px 4px 4px 8px',
              };
              const headerGroupStyle: CSSProperties = {
                width:
                  headerValue === '_id'
                    ? 'Document Id'.length * 10
                    : headerValue.length * 10, // rough ch
                backgroundColor:
                  colorScheme === 'light' ? tableHeadersBgColor : '',
              };

              const displayExpandedHeaderRows = (
                <th key={`${headerIdx}`} style={headerStyle}>
                  <Group style={headerGroupStyle}>
                    <Title order={6}>
                      {headerValue === '_id' ? 'Document Id' : headerValue}
                    </Title>
                  </Group>
                </th>
              );

              const displayCondensedHeaderRows =
                !tableHeaderValueExclusionSet.has(headerValue) ? (
                  <th key={`${headerIdx}`} style={headerStyle}>
                    <Group style={headerGroupStyle}>
                      <Title order={6}>{headerValue}</Title>
                    </Group>
                  </th>
                ) : null;

              return tableViewSelection === 'expanded'
                ? displayExpandedHeaderRows
                : displayCondensedHeaderRows;
            })}
          </tr>
        </thead>
        {Array.from(groupedByQueryResponseData).map(
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
                    <tr key={`${objIdx}`} style={{ borderBottom: borderColor }}>
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
                                backgroundColor: highlightColor,
                              }}
                            >
                              {formattedValueSliced}
                            </Highlight>
                          ) : (
                            <Text>{formattedValueSliced}</Text>
                          );

                          // allows for convenient access to username, userId and groupBySelectionField in a large table
                          const username =
                            queryResponseObjWithAddedFields.username;
                          const userId = queryResponseObjWithAddedFields.userId;
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
                                </Group>
                              )}

                              <Group>
                                <Text>{`Username: ${splitCamelCase(
                                  username
                                )}`}</Text>
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
                                    <Text>
                                      {key === '_id'
                                        ? 'Document Id'
                                        : splitCamelCase(key)}
                                      : {formattedValue}
                                    </Text>
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
                                  <Button
                                    variant="subtle"
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
                            <td key={`${keyValIdx}`}>
                              {key === 'requestStatus' ? (
                                <Group w="100%" position="left">
                                  <Text>{truncatedValuesWithHoverCards}</Text>
                                  {displayUpdateRequestStatusButton}
                                </Group>
                              ) : (
                                truncatedValuesWithHoverCards
                              )}
                            </td>
                          );

                          const displayCondensedBodyRows =
                            !tableHeaderValueExclusionSet.has(
                              Object.keys(queryResponseObjWithAddedFields)[
                                keyValIdx
                              ]
                            ) ? (
                              <td key={`${keyValIdx}`}>
                                {key === 'requestStatus' ? (
                                  <Flex
                                    wrap="wrap"
                                    align="center"
                                    justify="space-between"
                                    w="100%"
                                  >
                                    <Text>{truncatedValuesWithHoverCards}</Text>
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
                              buttonVariant: 'subtle',
                              buttonDisabled:
                                !fileUploadsData[objIdx]?.fileUploads.length,
                              semanticDescription:
                                'Open modal to display file uploads associated with this document',
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
                                    <Group w="100%" position="left">
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
              // border: borderColor,
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
                      borderRight: borderColor,
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

  return (
    <Stack w="100%" style={{ ...style }}>
      {displayTable}
      {displayRestOfGroupedByData}
    </Stack>
  );
}

export { DisplayQueryDesktop };
