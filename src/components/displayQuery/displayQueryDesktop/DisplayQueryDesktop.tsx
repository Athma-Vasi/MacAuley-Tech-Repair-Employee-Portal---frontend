import {
  Button,
  Center,
  Flex,
  Group,
  HoverCard,
  NavLink,
  Popover,
  Spoiler,
  Stack,
  Table,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { FormEvent, useEffect } from 'react';
import {
  TbArrowDown,
  TbArrowUp,
  TbChevronRight,
  TbStatusChange,
  TbUpload,
} from 'react-icons/tb';

import { useAuth, useGlobalState } from '../../../hooks';
import { formatDate, splitCamelCase } from '../../../utils';
import { DisplayQueryDesktopProps } from './types';
import {
  returnAccessibleButtonElements,
  returnAccessibleRadioGroupInputsElements,
} from '../../../jsxCreators';
import { RequestStatus } from '../../../types';

function DisplayQueryDesktop<Doc>({
  style = {},
  groupedByQueryResponseData,
  restOfGroupedQueryResponseData,
  componentQueryData,
  tableViewSelection,
  requestStatusDispatch,
  popoversOpenCloseState,
  popoversStateDispatch,
}: DisplayQueryDesktopProps<Doc>) {
  const {
    globalState: { width, padding, rowGap },
  } = useGlobalState();
  const {
    authState: { roles },
  } = useAuth();

  useEffect(() => {
    console.group('DisplayQueryDesktop');
    console.log('groupedByQueryResponseData', groupedByQueryResponseData);

    console.log(
      'restOfGroupedQueryResponseData',
      restOfGroupedQueryResponseData
    );
    console.log('tableViewSelection', tableViewSelection);

    console.log('componentQueryData', componentQueryData);

    console.groupEnd();
  }, [
    groupedByQueryResponseData,
    restOfGroupedQueryResponseData,
    componentQueryData,
    tableViewSelection,
  ]);

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
        onChange: () => {},
        name: 'requestStatus',
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

  const expandedTableSet = new Set(['_id', 'userId', 'action', 'category']);
  const dateKeysSet = new Set([
    'createdAt',
    'updatedAt',
    'startDate',
    'endDate',
  ]);

  const displayTable = Array.from(groupedByQueryResponseData).map(
    ([section, queryResponseObjArrays], sectionIdx) => {
      const numOfFields =
        tableViewSelection === 'expanded'
          ? Object.keys(queryResponseObjArrays[0]).length
          : Object.keys(queryResponseObjArrays[0]).filter(
              (key) => !expandedTableSet.has(key)
            ).length;
      const widthPerField = `${100 / numOfFields}%`;

      return (
        <Flex
          key={`${sectionIdx}`}
          direction="column"
          align="flex-start"
          justify="center"
          w="100%"
          rowGap={rowGap}
          //   style={{ outline: '1px solid violet' }}
          style={{
            overflowX: 'auto',
          }}
        >
          <NavLink
            label={
              <Text>{`${section.toString().charAt(0).toUpperCase()}${section
                .toString()
                .slice(1)}`}</Text>
            }
            rightSection={<TbChevronRight />}
            childrenOffset={0}
            w="38%"
          >
            <Table captionSide="top" striped highlightOnHover>
              <thead
                style={{
                  backgroundColor: '#e0e0e0',
                  borderRadius: 4,
                }}
              >
                <tr>
                  {Object.keys(queryResponseObjArrays[0]).map((key, keyIdx) => {
                    const displayExpandedHeaderRows = (
                      <th
                        key={`${keyIdx}`}
                        style={{
                          width: widthPerField,
                          outline: '1px solid violet',
                        }}
                      >
                        <Text
                          style={{
                            textTransform: 'capitalize',
                          }}
                        >
                          {splitCamelCase(key)}
                        </Text>
                      </th>
                    );

                    const displayCondensedHeaderRows = !expandedTableSet.has(
                      key
                    ) ? (
                      <th
                        key={`${keyIdx}`}
                        style={{
                          width: widthPerField,
                          outline: '1px solid violet',
                        }}
                      >
                        <Text
                          style={{
                            textTransform: 'capitalize',
                          }}
                        >
                          {splitCamelCase(key)}
                        </Text>
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
                  return (
                    <tr key={`${objIdx}`}>
                      {Object.entries(queryResponseObj).map(
                        ([key, value], keyValIdx) => {
                          const formattedValue =
                            dateKeysSet.has(key) ||
                            key.includes('Date') ||
                            key.includes('date')
                              ? formatDate({
                                  date: value,
                                  formatOptions: {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                  },
                                  locale: 'en-US',
                                })
                              : value === true
                              ? 'Yes'
                              : value === false
                              ? 'No'
                              : `${value
                                  .toString()
                                  .charAt(0)
                                  .toUpperCase()}${value.toString().slice(1)}`;

                          const truncatedValuesWithHoverCards =
                            key === '_id' || key === 'userId' ? (
                              <HoverCard
                                width={300}
                                shadow="lg"
                                openDelay={250}
                                closeDelay={150}
                              >
                                <HoverCard.Target>
                                  <Text>
                                    {`${formattedValue
                                      .toString()
                                      .slice(0, 5)}...`}
                                  </Text>
                                </HoverCard.Target>
                                <HoverCard.Dropdown>
                                  <Text>
                                    {key}: {formattedValue}
                                  </Text>
                                </HoverCard.Dropdown>
                              </HoverCard>
                            ) : dateKeysSet.has(key) ||
                              key.includes('Date') ||
                              key.includes('date') ? (
                              <HoverCard
                                width={300}
                                shadow="lg"
                                openDelay={250}
                                closeDelay={150}
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
                                        timeStyle: 'long',
                                      },
                                      locale: 'en-US',
                                    })}
                                  </Text>
                                </HoverCard.Dropdown>
                              </HoverCard>
                            ) : (
                              formattedValue
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
                                id: queryResponseObj._id,
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
                              position={width < 480 ? 'bottom' : 'bottom-end'}
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
                                  label={`Modify request status of ${queryResponseObj._id}`}
                                >
                                  <Button variant="outline" size="xs">
                                    <TbStatusChange />
                                  </Button>
                                </Tooltip>
                              </Popover.Target>
                              <Popover.Dropdown>
                                <form
                                  onSubmit={handleRequestStatusChangeFormSubmit}
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
                                  align="center"
                                  justify="space-between"
                                  columnGap="xs"
                                >
                                  <Text>{truncatedValuesWithHoverCards}</Text>
                                  {displayUpdateRequestStatusButton}
                                </Flex>
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
                                  <Text>{truncatedValuesWithHoverCards}</Text>
                                </Spoiler>
                              )}
                            </td>
                          );

                          const displayCondensedBodyRows =
                            !expandedTableSet.has(
                              Object.keys(queryResponseObj)[keyValIdx]
                            ) ? (
                              <td
                                key={`${keyValIdx}`}
                                style={{ width: widthPerField }}
                              >
                                {key === 'requestStatus' ? (
                                  <Flex
                                    align="center"
                                    justify="space-between"
                                    columnGap="xs"
                                  >
                                    <Text>{truncatedValuesWithHoverCards}</Text>
                                    {displayUpdateRequestStatusButton}
                                  </Flex>
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
                                    <Text>{truncatedValuesWithHoverCards}</Text>
                                  </Spoiler>
                                )}
                              </td>
                            ) : null;

                          return tableViewSelection === 'expanded'
                            ? displayExpandedBodyRows
                            : displayCondensedBodyRows;
                        }
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </NavLink>
        </Flex>
      );
    }
  );

  return <Stack w="100%">{displayTable}</Stack>;
}

export { DisplayQueryDesktop };
