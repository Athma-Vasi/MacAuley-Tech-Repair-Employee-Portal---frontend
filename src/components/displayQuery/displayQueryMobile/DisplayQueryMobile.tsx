import {
  Accordion,
  Button,
  Flex,
  Group,
  Popover,
  Spoiler,
  Text,
  Title,
} from '@mantine/core';
import { FormEvent, useEffect } from 'react';
import { IoMdOpen } from 'react-icons/io';
import {
  TbArrowDown,
  TbArrowUp,
  TbStatusChange,
  TbTrash,
  TbUpload,
} from 'react-icons/tb';

import {
  COLORS_SWATCHES,
  FIELDNAMES_WITH_DATE_VALUES,
} from '../../../constants/data';
import { useAuth, useGlobalState } from '../../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleRadioGroupInputsElements,
} from '../../../jsxCreators';
import { RequestStatus } from '../../../types';
import { addFieldsToObject, formatDate, splitCamelCase } from '../../../utils';
import { DisplayQueryMobileProps } from './types';

function DisplayQueryMobile({
  componentQueryData,
  deleteFileUploadIdDispatch,
  deleteFormIdDispatch,
  deleteResourceKindDispatch,
  fileUploadsData = [],
  groupedByQueryResponseData,
  openDeleteAcknowledge,
  openFileUploads,
  setFileUploadsForAFormDispatch,
  popoversStateDispatch,
  popoversOpenCloseState,
  restOfGroupedQueryResponseData,
  requestStatusDispatch,
  style = {},
  tableViewSelection,
}: DisplayQueryMobileProps): JSX.Element {
  const {
    globalState: {
      width,
      padding,
      rowGap,
      themeObject: { colorScheme },
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

  const { dark, gray } = COLORS_SWATCHES;
  const borderColor =
    colorScheme === 'light' ? `1px solid ${gray[3]}` : `1px solid ${gray[8]}`;
  const backgroundColor =
    colorScheme === 'light'
      ? 'radial-gradient(circle, #f9f9f9 50%, #f5f5f5 100%)'
      : dark[6];

  const displayGroupedByQueryResponseData = Array.from(
    groupedByQueryResponseData
  ).map(([section, queryObjArr], responseDataIdx) => {
    const displayQueryObjArr = queryObjArr.map((queryObj, queryObjIdx) => {
      const queryResponseObjWithAddedFields =
        fileUploadsData.length > 0
          ? addFieldsToObject({
              object: queryObj,
              fieldValuesTuples: [
                ['fileUploads', ''],
                ['delete', ''],
              ],
            })
          : addFieldsToObject({
              object: queryObj,
              fieldValuesTuples: [['delete', '']],
            });

      const displayKeyValues = Object.entries(
        queryResponseObjWithAddedFields
      ).map((document, keyValIdx) => {
        const [key, value] = document;
        // grab the section instead of the camelCased value and if it doesn't exist, split the camelCase
        const sectionKey =
          componentQueryData.find((queryDataObj) => queryDataObj.value === key)
            ?.label ?? splitCamelCase(key);

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
            : FIELDNAMES_WITH_DATE_VALUES.has(key)
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

        const [createdDeleteButton, createdOpenFileUploadsModalButton] =
          returnAccessibleButtonElements([
            {
              buttonLabel: 'Delete',
              semanticDescription: 'Delete this form',
              semanticName: 'Delete',
              leftIcon: <TbTrash />,
              rightIcon: <TbUpload />,
              buttonOnClick: () => {
                deleteFormIdDispatch({
                  type: 'setDeleteFormId',
                  payload: queryObj._id,
                });
                deleteResourceKindDispatch({
                  type: 'setDeleteResourceKind',
                  payload: 'form',
                });
                openDeleteAcknowledge();
              },
            },
            {
              buttonLabel: 'Open',
              buttonDisabled:
                fileUploadsData[queryObjIdx]?.fileUploads.length < 1,
              leftIcon: <IoMdOpen />,
              semanticDescription:
                'Open modal to display file uploads associated with this document',
              semanticName: 'Open file uploads modal',
              buttonOnClick: () => {
                setFileUploadsForAFormDispatch({
                  type: 'setFileUploadsForAForm',
                  payload: fileUploadsData[queryObjIdx]?.fileUploads,
                });
                deleteFormIdDispatch({
                  type: 'setDeleteFormId',
                  payload: queryResponseObjWithAddedFields._id,
                });
                openFileUploads();
              },
            },
          ]);
        const displayCreatedDeleteButton =
          key === 'delete' ? createdDeleteButton : null;
        const displayCreatedOpenFileUploadsModalButton =
          key === 'fileUploads' ? createdOpenFileUploadsModalButton : null;

        const displayFullLabelValueRow = (
          <>
            <Flex w="100%">
              <Title order={6}>{sectionKey}</Title>
            </Flex>
            <Flex
              align="center"
              justify="flex-end"
              w="100%"
              columnGap={rowGap}
              pl={padding}
            >
              {displayUpdateRequestStatusButton}
              {displayCreatedOpenFileUploadsModalButton}
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

        const displayExpandedView = displayFullLabelValueRow;

        return (
          <Flex
            key={`${key}-${keyValIdx}`}
            direction={width < 768 ? 'column' : 'row'}
            align={width < 768 ? 'flex-start' : 'center'}
            justify={width < 768 ? 'flex-start' : 'space-between'}
            bg={backgroundColor}
            style={{
              borderRadius: 4,
              borderBottom: borderColor,
            }}
            rowGap={rowGap}
            w="100%"
            p={padding}
          >
            {displayExpandedView}
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
            borderBottom:
              colorScheme === 'light'
                ? `4px solid ${gray[3]}`
                : `4px solid ${gray[8]}`,
          }}
          py={padding}
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
        py={padding}
        align="flex-start"
        justify="center"
        style={{
          border: borderColor,
          borderRadius: 4,
        }}
        w="100%"
        rowGap={rowGap}
      >
        <Accordion w="100%">
          <Accordion.Item value={displaySection}>
            <Accordion.Control>
              <Title order={5}>{displaySection}</Title>
            </Accordion.Control>
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
                  bg={backgroundColor}
                  style={{
                    borderRadius: 4,
                  }}
                  rowGap={rowGap}
                  // w="100%"
                  // p={padding}
                >
                  <Flex
                    w="100%"
                    align="center"
                    justify="space-between"
                    columnGap={rowGap}
                    p={padding}
                    style={{
                      border: borderColor,
                      borderRadius: 4,
                    }}
                  >
                    <Text>{`${key.charAt(0).toUpperCase()}${key.slice(
                      1
                    )}`}</Text>
                    <Text>{value}</Text>
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
              bg={backgroundColor}
              align="flex-start"
              justify="center"
              style={{
                borderRadius: 4,
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
      py={padding}
      align="flex-start"
      justify="center"
      style={{
        border: borderColor,
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
              rowGap={rowGap}
              columnGap={rowGap}
              pt={padding}
              w="100%"
              wrap="wrap"
            >
              {displayRestOfGroupedQueryResponseData}
            </Flex>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Flex>
  );

  console.log('groupedByQueryResponseData', groupedByQueryResponseData);

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
