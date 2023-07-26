import {
  Button,
  Flex,
  Group,
  NavLink,
  Popover,
  Spoiler,
  Text,
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

import { useGlobalState } from '../../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleRadioGroupInputsElements,
} from '../../../jsxCreators';
import { RequestStatus } from '../../../types';
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
  ).map(([label, queryObjArr], responseDataIdx) => {
    const displayLabel = <Text>{label}</Text>;

    const displayQueryObjArr = queryObjArr.map((queryObj, arrIdx) => {
      const displayKeyValues = Object.entries(queryObj)
        // .filter(
        //   ([filterKey, _]) =>
        //     filterKey !== '_id' &&
        //     filterKey !== 'action' &&
        //     filterKey !== 'category'
        // )
        .map(([key, value], index) => {
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

          const createdUpdateRequestStatusRadioGroup =
            returnAccessibleRadioGroupInputsElements([
              {
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
                value: 'pending',
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

          const updateRequestStatusPopover = (
            <Popover
              width={200}
              position={width < 480 ? 'bottom' : 'bottom-end'}
              withArrow
              shadow="lg"
            >
              <Popover.Target>
                <Button variant="outline" size="xs">
                  <TbStatusChange />
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <form
                  onSubmit={(event: FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    console.log('submitting');
                    console.log(queryObj._id);
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

          const displayUpdateRequestStatusButton =
            key === 'requestStatus' ? updateRequestStatusPopover : null;

          return (
            <Flex
              key={`${key}-${index}`}
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
                columnGap={rowGap}
                // style={{ outline: '1px solid violet' }}
              >
                {displayUpdateRequestStatusButton}
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
          key={`${label}-${arrIdx}}`}
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
        key={`${label}-${responseDataIdx}}`}
        direction="column"
        p={padding}
        align="flex-start"
        justify="center"
        style={{ border: '1px solid #e0e0e0', borderRadius: 4 }}
        w="100%"
      >
        <NavLink
          label={displayLabel}
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
