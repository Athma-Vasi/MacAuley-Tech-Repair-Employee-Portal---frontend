import {
  Button,
  Center,
  Flex,
  Group,
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
  parentComponentDispatch,
  tableViewSelection,
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

  const displayTable = Array.from(groupedByQueryResponseData).map(
    ([section, queryResponseObjArrays], sectionIdx) => {
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
                    return tableViewSelection === 'expanded' ? (
                      <th key={`${keyIdx}`}>
                        <Text
                          style={{
                            textTransform: 'capitalize',
                          }}
                        >
                          {splitCamelCase(key)}
                        </Text>
                      </th>
                    ) : !expandedTableSet.has(key) ? (
                      <th key={`${keyIdx}`}>
                        <Text
                          style={{
                            textTransform: 'capitalize',
                          }}
                        >
                          {splitCamelCase(key)}
                        </Text>
                      </th>
                    ) : null;
                  })}
                </tr>
              </thead>
              <tbody>
                {queryResponseObjArrays.map((queryResponseObj, objIdx) => {
                  return (
                    <tr key={`${objIdx}`}>
                      {Object.entries(queryResponseObj).map(
                        ([key, value], valueIdx) => {
                          const createdRequestStatusPopover = (
                            <Popover
                              width={200}
                              position={width < 480 ? 'bottom' : 'bottom-end'}
                              withArrow
                              shadow="lg"
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
                                  onSubmit={async (
                                    event: FormEvent<HTMLFormElement>
                                  ) => {
                                    event.preventDefault();

                                    const formData = new FormData(
                                      event.currentTarget
                                    );
                                    const requestStatus =
                                      formData.get('requestStatus');

                                    parentComponentDispatch({
                                      type: 'setRequestStatus',
                                      payload: {
                                        id: queryResponseObj._id,
                                        status: requestStatus as RequestStatus,
                                      },
                                    });
                                  }}
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

                          const formattedValue = componentQueryData
                            .find(({ label, value }) =>
                              label === Object.keys(queryResponseObj)[valueIdx]
                                ? value
                                : ''
                            )
                            ?.label?.includes('date')
                            ? new Date(value).toLocaleString()
                            : value === true
                            ? 'Yes'
                            : value === false
                            ? 'No'
                            : `${value
                                .toString()
                                .charAt(0)
                                .toUpperCase()}${value.toString().slice(1)}`;

                          return (
                            (tableViewSelection === 'expanded' && (
                              <td key={`${valueIdx}`}>
                                {displayUpdateRequestStatusButton}
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
                              </td>
                            )) ||
                            (tableViewSelection === 'condensed' &&
                              !expandedTableSet.has(
                                Object.keys(queryResponseObj)[valueIdx]
                              ) && (
                                <td key={`${valueIdx}`}>
                                  {displayUpdateRequestStatusButton}
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
                                </td>
                              ))
                          );
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

/**
 *{label.split(' ').map((word, idx) => {
                        return (
                          <Text
                            key={`${idx}`}
                            style={{
                              textTransform: 'capitalize',
                            }}
                          >
                            {word}
                          </Text>
                        );
                      })} 
 */

/**
                       * {componentQueryData.map(({ label, value }, idx) => {
                  //   return <th key={`${idx}`}>{label}</th>;

                  return Object.keys(
                    Array.from(groupedByQueryResponseData)[1][0]
                  ).includes(label) ? (
                    <th key={`${idx}`}>{label}</th>
                  ) : null;
                })}
                       */

/**
                 * {queryResponseObjArrays.map((queryResponseObj, idx) => {
                return (
                  <tr key={`${idx}`}>
                    {componentQueryData.map(({ label, value }, idx) => {
                      //   const formattedValue = label.includes('date')
                      //     ? formatDate({
                      //         date: queryResponseObj[value],
                      //         formatOptions: {
                      //           year: 'numeric',
                      //           month: 'numeric',
                      //           day: 'numeric',
                      //         },
                      //         locale: 'en-US',
                      //       })
                      //     : `${queryResponseObj[value]
                      //         .toString()
                      //         .charAt(0)
                      //         .toUpperCase()}${queryResponseObj[value]
                      //         .toString()
                      //         .slice(1)}`;

                      const formattedValue = label.includes('date')
                        ? new Date(queryResponseObj[value]).toLocaleString()
                        : `${queryResponseObj[value]
                            .toString()
                            .charAt(0)
                            .toUpperCase()}${queryResponseObj[value]
                            .toString()
                            .slice(1)}`;

                      return (
                        <td key={`${idx}`}>
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
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
                 */
