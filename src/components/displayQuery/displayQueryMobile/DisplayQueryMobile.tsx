import { Flex, NavLink, Spoiler, Text } from '@mantine/core';
import { useEffect } from 'react';
import { TbArrowDown, TbArrowUp, TbChevronRight } from 'react-icons/tb';

import { useGlobalState } from '../../../hooks';
import { returnAccessibleButtonElements } from '../../../jsxCreators';
import { formatDate, splitCamelCase } from '../../../utils';
import { DisplayQueryMobileProps } from './types';

function DisplayQueryMobile({
  style = {},
  groupedByQueryResponseData,
  restOfGroupedQueryResponseData,
  componentQueryData,
}: DisplayQueryMobileProps): JSX.Element {
  const {
    globalState: { width, padding, rowGap },
  } = useGlobalState();
  useEffect(() => {
    console.log('groupedByQueryResponseData', groupedByQueryResponseData);

    console.log(
      'restOfGroupedQueryResponseData',
      restOfGroupedQueryResponseData
    );
  }, [groupedByQueryResponseData, restOfGroupedQueryResponseData]);

  const displayGroupedByQueryResponseData = Array.from(
    groupedByQueryResponseData
  ).map(([label, queryObjArr]) => {
    const displayLabel = <Text>{label}</Text>;

    const displayQueryObjArr = queryObjArr.map((queryObj) => {
      const displayKeyValues = Object.entries(queryObj)
        // .filter(
        //   ([filterKey, _]) =>
        //     filterKey !== '_id' &&
        //     filterKey !== 'action' &&
        //     filterKey !== 'category'
        // )
        .map(([key, value]) => {
          // grabs the label instead of the camelCased value and if it doesn't exist, it will split the camelCase
          const labelKey =
            componentQueryData.find(
              (queryDataObj) => queryDataObj.value === key
            )?.label ?? splitCamelCase(key);

          const formattedValue = labelKey.includes('date')
            ? formatDate({
                date: value,
                formatOptions: {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                },
                locale: 'en-US',
              })
            : value;

          const [createdShowMoreButton, createdHideButton] =
            returnAccessibleButtonElements([
              {
                buttonLabel: 'Show more',
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

          return (
            <Flex
              align="flex-end"
              justify="space-between"
              direction="column"
              style={{
                // border: '1px solid #e0e0e0',
                borderRadius: 4,
                backgroundColor: '#fff',
              }}
              rowGap="xs"
              w="100%"
              p={padding}
            >
              <Flex w="100%">
                <Text>{labelKey}</Text>
              </Flex>
              <Flex
                align="center"
                justify="flex-end"
                w="85%"
                // style={{ outline: '1px solid violet' }}
              >
                <Spoiler
                  maxHeight={25}
                  showLabel={createdShowMoreButton}
                  hideLabel={createdHideButton}
                >
                  <Text>
                    {formattedValue === true
                      ? 'Yes'
                      : formattedValue === false
                      ? 'No'
                      : formattedValue}
                  </Text>
                </Spoiler>
              </Flex>
            </Flex>
          );
        });

      return (
        <Flex
          direction="column"
          align="flex-start"
          justify="center"
          w="100%"
          rowGap={rowGap}
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: 4,
            // outline: '1px solid teal',
          }}
          p={padding}
        >
          {displayKeyValues}
        </Flex>
      );
    });

    return (
      // <Flex direction="column" p={padding} align="flex-start" justify="center">
      //   {displayLabel}
      //   <Flex
      //     direction="column"
      //     align="flex-start"
      //     justify="center"
      //     w="100%"
      //     rowGap={rowGap}
      //     // style={{ backgroundColor: '#f0f0f0', borderRadius: 4 }}
      //   >
      //     {displayQueryObjArr}
      //   </Flex>
      // </Flex>
      <Flex
        direction="column"
        p={padding}
        align="flex-start"
        justify="center"
        style={{ border: '1px solid #e0e0e0', borderRadius: 4 }}
        w="100%"
      >
        <NavLink
          label={label}
          rightSection={<TbChevronRight />}
          childrenOffset={0}
          w="100%"
        >
          <Flex
            direction="column"
            align="flex-start"
            justify="center"
            w="100%"
            rowGap={rowGap}
            // style={{ backgroundColor: '#f0f0f0', borderRadius: 4 }}
          >
            {displayQueryObjArr}
          </Flex>
        </NavLink>
      </Flex>
    );
  });

  return <>{displayGroupedByQueryResponseData}</>;
}

export { DisplayQueryMobile };

/**
 const displayGroupedByQueryResponseData = Array.from(
    groupedByQueryResponseData
  ).map(([label, queryObjArr]) => {
    const displayLabel = <Title>{label}</Title>;
    const displayQueryObjArr = queryObjArr.map((queryObj) => {
      const displayQueryObj = Object.entries(queryObj).map(([key, value]) => {
        return (
          <Group>
            <Text>{key}</Text>
            <Text>{value}</Text>
          </Group>
        );
      });

      return <FormLayoutWrapper>{displayQueryObj}</FormLayoutWrapper>;
    });

    return (
      <FormLayoutWrapper>
        {displayLabel}
        {displayQueryObjArr}
      </FormLayoutWrapper>
    );
  });
   */
