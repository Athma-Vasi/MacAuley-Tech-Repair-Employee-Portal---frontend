import { useEffect } from 'react';

import { useAuth, useGlobalState } from '../../../hooks';
import { DisplayQueryDesktopProps } from './types';
import {
  Center,
  Flex,
  Group,
  NavLink,
  Spoiler,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { formatDate, splitCamelCase } from '../../../utils';
import { TbArrowDown, TbArrowUp, TbChevronRight } from 'react-icons/tb';

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
                      {Object.values(queryResponseObj).map(
                        (value, valueIdx) => {
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
