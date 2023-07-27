import {
  Accordion,
  Button,
  Flex,
  Group,
  NavLink,
  Popover,
  Radio,
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

import { useAuth, useGlobalState } from '../../../hooks';
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
  tableViewSelection,
  requestStatusDispatch,
  popoversStateDispatch,
  popoversOpenCloseState,
}: DisplayQueryMobileProps): JSX.Element {
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
  }, [groupedByQueryResponseData, restOfGroupedQueryResponseData]);

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
        label: 'Update',
        onChange: () => {},
        name: 'requestStatus',
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

  const tableKeyExclusionSet = new Set(['_id', 'userId', 'action', 'category']);

  const displayGroupedByQueryResponseData = Array.from(
    groupedByQueryResponseData
  ).map(([section, queryObjArr], responseDataIdx) => {
    const displayLabel = (
      <Text>{`${section.toString().charAt(0).toUpperCase()}${section
        .toString()
        .slice(1)}`}</Text>
    );

    const displayQueryObjArr = queryObjArr.map((queryObj, arrIdx) => {
      const displayKeyValues = Object.entries(queryObj).map(
        ([key, value], index) => {
          // grab the section instead of the camelCased value and if it doesn't exist, split the camelCase
          const sectionKey =
            componentQueryData.find(
              (queryDataObj) => queryDataObj.value === key
            )?.label ?? splitCamelCase(key);

          const formattedValue = sectionKey.includes('date')
            ? formatDate({
                date: value,
                formatOptions: {
                  dateStyle: 'full',
                },
                locale: 'en-US',
              })
            : value;

          async function handleRequestStatusChangeFormSubmit(
            event: FormEvent<HTMLFormElement>
          ) {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const requestStatus = formData.get('requestStatus');

            requestStatusDispatch({
              type: 'setRequestStatus',
              payload: {
                id: queryObj._id,
                status: requestStatus as RequestStatus,
              },
            });

            popoversStateDispatch({
              type: 'setPopoversOpenCloseState',
              payload: {
                key: section.toString(),
                popoverState: {
                  index: arrIdx,
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
              opened={popoversOpenCloseState?.get(section.toString())?.[arrIdx]}
            >
              <Popover.Target>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => {
                    popoversStateDispatch({
                      type: 'setPopoversOpenCloseState',
                      payload: {
                        key: section.toString(),
                        popoverState: {
                          index: arrIdx,
                          value: !popoversOpenCloseState?.get(
                            section.toString()
                          )?.[arrIdx],
                        },
                      },
                    });
                  }}
                >
                  <TbStatusChange />
                </Button>
              </Popover.Target>
              <Popover.Dropdown p={padding}>
                <form onSubmit={handleRequestStatusChangeFormSubmit}>
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
          const displayUpdateRequestStatusButton = roles.includes('Manager')
            ? key === 'requestStatus'
              ? createdRequestStatusPopover
              : null
            : null;

          const displayFullLabelValueRow = (
            <>
              <Flex w="100%">
                <Text>{sectionKey}</Text>
              </Flex>
              <Flex
                align="center"
                justify="flex-end"
                w="100%"
                columnGap={rowGap}
                pl={padding}
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
                      : `${formattedValue
                          .charAt(0)
                          .toUpperCase()}${formattedValue.slice(1)}`}
                  </Text>
                </Spoiler>
              </Flex>
            </>
          );

          const displayValueOnlyRow = (
            <Flex
              align="center"
              justify="flex-end"
              w="100%"
              columnGap={rowGap}
              pl={padding}
              style={{ outline: '1px solid violet' }}
            >
              <Text>
                {formattedValue === true
                  ? 'Yes'
                  : formattedValue === false
                  ? 'No'
                  : `${formattedValue
                      .charAt(0)
                      .toUpperCase()}${formattedValue.slice(1)}`}
              </Text>
            </Flex>
          );

          const displayCondensedView = tableKeyExclusionSet.has(key) ? (
            <Accordion w="100%">
              <Accordion.Item value={sectionKey}>
                <Accordion.Control>{sectionKey}</Accordion.Control>
                <Accordion.Panel>{displayValueOnlyRow}</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          ) : (
            displayFullLabelValueRow
          );

          const displayExpandedView = displayFullLabelValueRow;

          return (
            <Flex
              key={`${key}-${index}`}
              direction={width < 768 ? 'column' : 'row'}
              align={width < 768 ? 'flex-start' : 'center'}
              justify={width < 768 ? 'flex-start' : 'space-between'}
              style={{
                borderRadius: 4,
                backgroundColor: '#fff',
                outline: '1px solid teal',
              }}
              rowGap={rowGap}
              w="100%"
              p={padding}
            >
              {tableViewSelection === 'condensed'
                ? displayCondensedView
                : displayExpandedView}
            </Flex>
          );
        }
      );

      return (
        <Flex
          key={`${section}-${arrIdx}}`}
          direction="column"
          align="flex-start"
          justify="center"
          w="100%"
          rowGap={rowGap}
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: 4,
          }}
          p={padding}
        >
          {displayKeyValues}
        </Flex>
      );
    });

    return (
      <Flex
        key={`${section}-${responseDataIdx}}`}
        direction="column"
        p={padding}
        align="flex-start"
        justify="center"
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: 4,
          outline: '1px solid violet',
        }}
        w="100%"
        rowGap={rowGap}
      >
        <NavLink
          label={displayLabel}
          rightSection={<TbChevronRight />}
          childrenOffset={0}
          w="62%"
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

  const displayRestOfGroupedQueryResponseData =
    restOfGroupedQueryResponseData.map((queryObj, arrIdx) => {
      const displayKeyValues = Object.entries(queryObj).map(
        ([key, value], objIdx) => {
          return (
            <Flex
              key={`${arrIdx}-${objIdx}`}
              align="flex-start"
              justify="center"
              direction="column"
              style={{
                backgroundColor: '#fff',
                borderRadius: 4,
              }}
              rowGap={rowGap}
              w="100%"
              p={padding}
            >
              {key === '' ? (
                <Flex w="100%">
                  <Text size="xs">All constrained values displayed</Text>
                </Flex>
              ) : (
                <Flex
                  w="100%"
                  align="center"
                  justify="space-between"
                  columnGap={rowGap}
                >
                  <Group>
                    <Text>{`${key.charAt(0).toUpperCase()}${key.slice(
                      1
                    )}`}</Text>
                  </Group>
                  <Group>
                    <Text>{value}</Text>
                  </Group>
                </Flex>
              )}
            </Flex>
          );
        }
      );

      return (
        <Flex
          direction="column"
          p={padding}
          align="flex-start"
          justify="center"
          style={{
            borderRadius: 4,
            backgroundColor: '#f0f0f0',
          }}
          w="100%"
        >
          {displayKeyValues}
        </Flex>
      );
    });

  const displayRestData = (
    <Flex
      direction="column"
      p={padding}
      align="flex-start"
      justify="center"
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: 4,
      }}
      w="100%"
    >
      <NavLink
        label="Rest of constrained values"
        rightSection={<TbChevronRight />}
        childrenOffset={0}
        w="62%"
      >
        <Flex
          direction="column"
          align="flex-start"
          justify="center"
          rowGap={rowGap}
          pt={padding}
          w="100%"
        >
          {displayRestOfGroupedQueryResponseData}
        </Flex>
      </NavLink>
    </Flex>
  );

  return (
    <Flex
      direction="column"
      // p={padding}
      align="flex-start"
      justify="center"
      w="100%"
      rowGap={rowGap}
    >
      {displayGroupedByQueryResponseData}
      {displayRestData}
    </Flex>
  );
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

/**
  <Flex direction="column" p={padding} align="flex-start" justify="center">
        {displayLabel}
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
      </Flex>
 */

/**
       * const displayCondensedView = tableKeyExclusionSet.has(key) ? (
            <NavLink
              label={<Text>{labelKey}</Text>}
              rightSection={<TbChevronRight />}
              childrenOffset={0}
              w="62%"
            >
              {displayValueOnlyRow}
            </NavLink>
          ) : (
            displayFullLabelValueRow
          );
       */
