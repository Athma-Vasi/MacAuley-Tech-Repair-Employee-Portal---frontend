import {
  Accordion,
  Button,
  Flex,
  Group,
  NavLink,
  Popover,
  Spoiler,
  Text,
} from '@mantine/core';
import { FormEvent } from 'react';
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
  deleteFormIdDispatch,
  openDeleteAcknowledge,
}: DisplayQueryMobileProps): JSX.Element {
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
  const dateKeysSet = new Set([
    'createdAt',
    'updatedAt',
    'startDate',
    'endDate',
  ]);

  const displayGroupedByQueryResponseData = Array.from(
    groupedByQueryResponseData
  ).map(([section, queryObjArr], responseDataIdx) => {
    const displayQueryObjArr = queryObjArr.map((queryObj, queryObjIdx) => {
      const displayKeyValues = [
        ...Object.entries(queryObj),
        ['Delete', ''],
      ].map(([key, value], keyValIdx) => {
        // grab the section instead of the camelCased value and if it doesn't exist, split the camelCase
        const sectionKey =
          componentQueryData.find((queryDataObj) => queryDataObj.value === key)
            ?.label ?? splitCamelCase(key);

        // const formattedValue =
        //   dateKeysSet.has(sectionKey) ||
        //   sectionKey.toLowerCase().includes('date')
        //     ? formatDate({
        //         date: value,
        //         formatOptions: {
        //           dateStyle: 'full',
        //         },
        //         locale: 'en-US',
        //       })
        //     : Array.isArray(value)
        //     ? value.map((val, valIdx) => {
        //         return (
        //           <Text key={`${valIdx}`}>
        //             {`${val.toString().charAt(0).toUpperCase()}${val
        //               .toString()
        //               .slice(1)}${valIdx === value.length - 1 ? '' : ', '}`}
        //           </Text>
        //         );
        //       })
        //     : value === true
        //     ? 'Yes'
        //     : value === false
        //     ? 'No'
        //     : `${value.toString().charAt(0).toUpperCase()}${value
        //         .toString()
        //         .slice(1)}`;
        const formattedValue =
          value === true
            ? 'Yes'
            : value === false
            ? 'No'
            : Array.isArray(value)
            ? value.map((val, valIdx) => {
                return (
                  <Text key={`${valIdx}`}>
                    {`${val.toString().charAt(0).toUpperCase()}${val
                      .toString()
                      .slice(1)}${valIdx === value.length - 1 ? '' : ', '}`}
                  </Text>
                );
              })
            : key.toLowerCase().includes('id')
            ? value
            : key === 'createdAt' || key === 'updatedAt'
            ? formatDate({
                date: value,
                formatOptions: {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: false,
                  timeZoneName: 'long',
                },
                locale: 'en-US',
              })
            : splitCamelCase(key).includes('Date')
            ? formatDate({
                date: value,
                formatOptions: {
                  dateStyle: 'short',
                },
                locale: 'en-US',
              })
            : `${value.toString().charAt(0).toUpperCase()}${value
                .toString()
                .slice(1)}`;

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
                index: queryObjIdx,
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
              popoversOpenCloseState?.get(section.toString())?.[queryObjIdx]
            }
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
                        index: queryObjIdx,
                        value: !popoversOpenCloseState?.get(
                          section.toString()
                        )?.[queryObjIdx],
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

        const createdDeleteButton = returnAccessibleButtonElements([
          {
            buttonLabel: 'Delete',
            semanticDescription: 'Delete this form',
            semanticName: 'Delete',
            buttonVariant: 'outline',
            leftIcon: <TbTrash />,
            rightIcon: <TbUpload />,
            buttonOnClick: () => {
              openDeleteAcknowledge();
              deleteFormIdDispatch({
                type: 'setDeleteFormId',
                payload: queryObj._id,
              });
            },
          },
        ]);
        const displayCreatedDeleteButton =
          key === 'Delete' ? createdDeleteButton : null;

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
              {displayCreatedDeleteButton}
              <Spoiler
                maxHeight={25}
                showLabel={createdShowMoreButton}
                hideLabel={createdHideButton}
              >
                <Text>{formattedValue}</Text>
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
            {displayCreatedDeleteButton}
            <Text>{formattedValue}</Text>
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
            key={`${key}-${keyValIdx}`}
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
      });

      return (
        <Flex
          key={`${section}-${queryObjIdx}}`}
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
    const displaySection = `${section
      .toString()
      .charAt(0)
      .toUpperCase()}${section.toString().slice(1)}`;

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
        <Accordion w="100%">
          <Accordion.Item value={displaySection}>
            <Accordion.Control>{displaySection}</Accordion.Control>
            <Accordion.Panel>
              <Flex
                direction="column"
                align="flex-start"
                justify="center"
                w="100%"
                rowGap={rowGap}
              >
                {displayQueryObjArr}
              </Flex>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Flex>
    );
  });

  const displayRestOfGroupedQueryResponseData =
    restOfGroupedQueryResponseData.length > 0
      ? restOfGroupedQueryResponseData.map((queryObj, queryObjIdx) => {
          const displayKeyValues = Object.entries(queryObj).map(
            ([key, value], objIdx) => {
              return (
                <Flex
                  key={`${objIdx}`}
                  align="flex-start"
                  justify="center"
                  direction="column"
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 4,
                  }}
                  rowGap={rowGap}
                  // w="100%"
                  p={padding}
                >
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
                </Flex>
              );
            }
          );

          return (
            <Flex
              key={`${queryObjIdx}`}
              direction="column"
              p={padding}
              align="flex-start"
              justify="center"
              style={{
                borderRadius: 4,
                backgroundColor: '#f0f0f0',
              }}
              // w="100%"
            >
              {displayKeyValues}
            </Flex>
          );
        })
      : null;

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
            disabled={restOfGroupedQueryResponseData.length === 0}
          >
            <Text>{`${
              groupedByQueryResponseData.size === 0
                ? 'No documents to display'
                : restOfGroupedQueryResponseData.length === 0
                ? 'All constrained values displayed'
                : 'Rest of constrained values'
            }`}</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Flex
              align="center"
              justify="flex-start"
              rowGap={rowGap}
              columnGap={rowGap}
              pt={padding}
              w="100%"
              wrap="wrap"
              style={{ outline: '1px solid teal' }}
            >
              {displayRestOfGroupedQueryResponseData}
            </Flex>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Flex>
  );

  return (
    <Flex
      direction="column"
      style={{ ...style }}
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
