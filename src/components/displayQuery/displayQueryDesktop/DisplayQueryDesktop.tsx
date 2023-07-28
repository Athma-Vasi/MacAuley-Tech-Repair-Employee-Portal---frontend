import {
  Button,
  Center,
  Flex,
  Group,
  HoverCard,
  Modal,
  NavLink,
  Popover,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';
import { FormEvent, useEffect } from 'react';
import {
  TbArrowDown,
  TbArrowUp,
  TbChevronRight,
  TbStatusChange,
  TbTrash,
  TbUpload,
} from 'react-icons/tb';

import { useAuth, useGlobalState } from '../../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleRadioGroupInputsElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import { RequestStatus } from '../../../types';
import { formatDate, splitCamelCase } from '../../../utils';
import { DisplayQueryDesktopProps } from './types';
import { useDisclosure } from '@mantine/hooks';
import { TextWrapper } from '../../wrappers';

function DisplayQueryDesktop<Doc>({
  style = {},
  groupedByQueryResponseData,
  restOfGroupedQueryResponseData,
  componentQueryData,
  tableViewSelection,

  requestStatusDispatch,
  popoversOpenCloseState,
  popoversStateDispatch,

  openDeleteAcknowledge,
  parentDeleteFormDispatch,
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

  const [createdSubmitRequestStatusButton, createdDeleteButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Submit',
        leftIcon: <TbUpload />,
        buttonType: 'submit',
        semanticDescription: 'Submit request status changes',
        semanticName: 'Submit',
        size: 'xs',
      },
      {
        buttonLabel: <TbTrash />,
        semanticDescription: 'Delete this form',
        semanticName: 'Delete',
        size: 'xs',
        buttonOnClick: () => {
          openDeleteAcknowledge();
        },
      },
    ]);

  const tableKeyExclusionSet = new Set(['_id', 'userId', 'action', 'category']);
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
              (key) => !tableKeyExclusionSet.has(key)
            ).length;
      const widthPerField = `${(100 / numOfFields).toFixed(2)}%`;

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
          <NavLink
            label={
              <Text>{`${section.toString().charAt(0).toUpperCase()}${section
                .toString()
                .slice(1)}`}</Text>
            }
            rightSection={<TbChevronRight />}
            childrenOffset={padding}
            w="38%"
          >
            <Table captionSide="top" striped highlightOnHover w="100%">
              <thead
                style={{
                  backgroundColor: '#e0e0e0',
                  borderRadius: 4,
                }}
              >
                <tr>
                  {[...Object.keys(queryResponseObjArrays[0]), 'Delete'].map(
                    (key, keyIdx) => {
                      const displayExpandedHeaderRows = (
                        <th
                          key={`${keyIdx}`}
                          style={{
                            width: widthPerField,
                            outline: '1px solid violet',
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
                            }}
                          >
                            <Text>{splitCamelCase(key)}</Text>
                          </th>
                        ) : null;

                      return tableViewSelection === 'expanded'
                        ? displayExpandedHeaderRows
                        : displayCondensedHeaderRows;
                    }
                  )}
                </tr>
              </thead>
              <tbody>
                {queryResponseObjArrays.map((queryResponseObj, objIdx) => {
                  return (
                    <tr key={`${objIdx}`}>
                      {[
                        ...Object.entries(queryResponseObj),
                        ['Delete', ''],
                      ].map(([key, value], keyValIdx) => {
                        const formattedValue =
                          dateKeysSet.has(key) ||
                          key.toLowerCase().includes('date')
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
                            : Array.isArray(value)
                            ? value.map((val, valIdx) => {
                                return (
                                  <Text key={`${valIdx}`}>
                                    {`${val
                                      .toString()
                                      .charAt(0)
                                      .toUpperCase()}${val
                                      .toString()
                                      .slice(1)}${
                                      valIdx === value.length - 1 ? '' : ', '
                                    }`}
                                  </Text>
                                );
                              })
                            : `${value
                                .toString()
                                .charAt(0)
                                .toUpperCase()}${value.toString().slice(1)}`;

                        const truncatedValuesWithHoverCards =
                          key === '_id' ||
                          key === 'userId' ||
                          formattedValue.length > 23 ? (
                            <HoverCard
                              width={382}
                              shadow="lg"
                              openDelay={250}
                              closeDelay={100}
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
                                  {splitCamelCase(key)}: {formattedValue}
                                </Text>
                              </HoverCard.Dropdown>
                            </HoverCard>
                          ) : dateKeysSet.has(key) ||
                            key.includes('Date') ||
                            key.includes('date') ? (
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
                              popoversOpenCloseState?.get(section.toString())?.[
                                objIdx
                              ]
                            }
                          >
                            <Popover.Target>
                              <Tooltip
                                label={`Modify request status of id: ${queryResponseObj._id}`}
                              >
                                <Button
                                  variant="outline"
                                  size="xs"
                                  onClick={() => {
                                    popoversStateDispatch({
                                      type: 'setPopoversOpenCloseState',
                                      payload: {
                                        key: section.toString(),
                                        popoverState: {
                                          index: objIdx,
                                          value: !popoversOpenCloseState?.get(
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
                        const displayUpdateRequestStatusButton = roles.includes(
                          'Manager'
                        )
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
                          !tableKeyExclusionSet.has(
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

                        const objLen = Object.keys(queryResponseObj).length;
                        const displayDeleteButton = (
                          <td
                            key={`${sectionIdx}-${objIdx}-${keyValIdx}`}
                            style={{ width: widthPerField }}
                          >
                            <Center>
                              <Tooltip
                                label={`Delete form with id: ${queryResponseObj._id}`}
                              >
                                <Group>{createdDeleteButton}</Group>
                              </Tooltip>
                            </Center>
                          </td>
                        );

                        return objLen === keyValIdx
                          ? displayDeleteButton
                          : tableViewSelection === 'expanded'
                          ? displayExpandedBodyRows
                          : displayCondensedBodyRows;
                      })}
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
