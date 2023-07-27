import { useEffect } from 'react';

import { useAuth, useGlobalState } from '../../../hooks';
import { DisplayQueryDesktopProps } from './types';
import {
  Center,
  Flex,
  Group,
  Spoiler,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { formatDate } from '../../../utils';
import { TbArrowDown, TbArrowUp } from 'react-icons/tb';

function DisplayQueryDesktop<Doc>({
  style = {},
  groupedByQueryResponseData,
  restOfGroupedQueryResponseData,
  componentQueryData,
  parentComponentDispatch,
}: DisplayQueryDesktopProps<Doc>) {
  const {
    globalState: { width, padding, rowGap },
  } = useGlobalState();
  const {
    authState: { roles },
  } = useAuth();

  useEffect(() => {
    console.log('groupedByQueryResponseData', groupedByQueryResponseData);

    console.log(
      'restOfGroupedQueryResponseData',
      restOfGroupedQueryResponseData
    );

    console.log('componentQueryData', componentQueryData);
  }, [
    groupedByQueryResponseData,
    restOfGroupedQueryResponseData,
    componentQueryData,
  ]);

  const displayTable = Array.from(groupedByQueryResponseData).map(
    ([section, queryResponseObjArrays], sectionIdx) => {
      return (
        <Flex
          key={`${sectionIdx}`}
          direction="column"
          align="flex-start"
          justify="center"
          w="100%"
          p={padding}
          rowGap={rowGap}
          //   style={{ outline: '1px solid violet' }}
          style={{
            overflowX: 'auto',
          }}
        >
          <Text>{`${section.toString().charAt(0).toUpperCase()}${section
            .toString()
            .slice(1)}`}</Text>
          <Table captionSide="top" striped highlightOnHover>
            <thead
              style={{
                backgroundColor: '#e0e0e0',
                borderRadius: 4,
                // border: '1px solid #e0e0e0',
              }}
            >
              <tr>
                {componentQueryData.map(({ label, value }, idx) => {
                  return (
                    <th key={`${idx}`}>
                      {label.split(' ').map((word, idx) => {
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
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {queryResponseObjArrays.map((queryResponseObj, idx) => {
                return (
                  <tr key={`${idx}`}>
                    {componentQueryData.map(({ label, value }, idx) => {
                      const formattedValue = label.includes('date')
                        ? formatDate({
                            date: queryResponseObj[value],
                            formatOptions: {
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                            },
                            locale: 'en-US',
                          })
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
            </tbody>
          </Table>
        </Flex>
      );
    }
  );

  return (
    <Flex
      w="100%"
      p={padding}
      direction="column"
      align="flex-start"
      justify="center"
      rowGap={rowGap}
      style={{
        ...style,
        border: '1px solid #e0e0e0',
        borderRadius: 4,
      }}
    >
      {displayTable}
    </Flex>
  );
}

export { DisplayQueryDesktop };
