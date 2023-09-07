import {
  Accordion,
  Card,
  Flex,
  Group,
  HoverCard,
  Image,
  Modal,
  SegmentedControl,
  Spoiler,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChangeEvent, FormEvent, useEffect, useReducer } from 'react';
import { TbArrowDown, TbArrowUp, TbTrash, TbUpload } from 'react-icons/tb';

import { ACKNOWLEDGEMENT_TEXT_INPUT_REGEX } from '../../constants/regex';
import { useGlobalState } from '../../hooks';
import {
  returnAccessibleButtonElements,
  AccessibleErrorValidTextElements,
  returnAccessibleRadioGroupInputsElements,
  returnAccessibleTextInputElements,
} from '../../jsxCreators';
import {
  formatDate,
  groupQueryResponse,
  logState,
  returnAcknowledgementValidationText,
} from '../../utils';
import {
  AccessibleButtonCreatorInfo,
  AccessibleRadioGroupInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  TextWrapper,
} from '../wrappers';
import { DisplayQueryDesktop } from './displayQueryDesktop/DisplayQueryDesktop';
import { DisplayQueryMobile } from './displayQueryMobile/DisplayQueryMobile';
import {
  displayQueryAction,
  displayQueryReducer,
  initialDisplayQueryState,
} from './state';
import { DisplayQueryProps } from './types';
import { COLORS_SWATCHES } from '../../constants/data';

function DisplayQuery<Doc>({
  componentQueryData,
  fileUploadsData = [],
  parentComponentName,
  parentRequestStatusDispatch,
  parentDeleteResourceDispatch,
  queryResponseData,
  style = {},
  totalDocuments,
}: DisplayQueryProps<Doc>) {
  const {
    globalState: {
      padding,
      width,
      rowGap,
      themeObject: { colorScheme },
    },
  } = useGlobalState();

  const [
    openedDeleteAcknowledge,
    { open: openDeleteAcknowledge, close: closeDeleteAcknowledge },
  ] = useDisclosure(false);
  const [
    openedDisplayFileUploads,
    { open: openFileUploads, close: closeFileUploads },
  ] = useDisclosure(false);

  const [displayQueryState, displayQueryDispatch] = useReducer(
    displayQueryReducer,
    initialDisplayQueryState
  );

  const {
    groupByRadioData,
    currentSelectionData,
    groupBySelection,
    groupedByQueryResponseData,
    restOfGroupedQueryResponseData,
    fileUploadsForAForm,
    currentSegmentedSelection,
    popoversOpenCloseState,
    acknowledgementText,
    isAcknowledgementTextFocused,
    isValidAcknowledgementText,
    deleteFileUploadId,
    deleteFormId,

    deleteResourceKind,
  } = displayQueryState;

  async function handleDeleteFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('delete form submitted');

    if (!isValidAcknowledgementText) {
      return;
    }

    parentDeleteResourceDispatch({
      type: 'setDeleteResource',
      payload: {
        formId: deleteFormId,
        kind: deleteResourceKind,
        fileUploadId:
          deleteResourceKind === 'fileUpload' ? deleteFileUploadId : undefined,
        value: true,
      },
    });
  }

  // validate acknowledgement text on every change
  useEffect(() => {
    const isValid = ACKNOWLEDGEMENT_TEXT_INPUT_REGEX.test(acknowledgementText);

    displayQueryDispatch({
      type: displayQueryAction.setIsValidAcknowledgementText,
      payload: isValid,
    });
  }, [acknowledgementText]);

  // create initial groupByRadioData state
  useEffect(() => {
    const initialGroupByRadioData = componentQueryData
      .reduce(
        (
          acc: Array<{ value: string; label: string }>,
          { inputKind, label, value }
        ) => {
          if (inputKind === 'selectInput' || inputKind === 'booleanInput') {
            // only push if it is also present in query response data
            const isFieldExcluded = queryResponseData.filter(
              (queryResponseObj) => {
                return Object.entries(queryResponseObj).find(
                  ([key, _]) => key === value
                );
              }
            );

            if (isFieldExcluded.length > 0) {
              acc.push({ label, value });
            }
          }

          return acc;
        },
        [{ label: 'Username', value: 'username' }]
      )
      // username is not displayed when resource is anonymousRequest
      .filter(({ value }) => {
        return parentComponentName === 'Anonymous Request'
          ? value !== 'username'
          : true;
      });

    displayQueryDispatch({
      type: displayQueryAction.setGroupByRadioData,
      payload: initialGroupByRadioData,
    });
  }, [queryResponseData, componentQueryData]);

  // assign current groupBy selection's corresponding options data
  useEffect(() => {
    const currentSelectData =
      groupBySelection === 'username'
        ? ['']
        : componentQueryData.reduce(
            (acc, componentQueryObj) => {
              if (groupBySelection === componentQueryObj.value) {
                if (componentQueryObj.selectData) {
                  // rome-ignore lint:
                  acc = componentQueryObj.selectData;
                }
              }

              return acc;
            },
            ['']
          );

    displayQueryDispatch({
      type: displayQueryAction.setCurrentSelectionData,
      payload: currentSelectData,
    });
  }, [groupBySelection, componentQueryData]);

  // group the queries on every selection or query change
  useEffect(() => {
    const { groupedBy, rest } = groupQueryResponse({
      queryResponseData,
      groupBySelection,
      currentSelectionData,
    });

    displayQueryDispatch({
      type: displayQueryAction.setGroupedByQueryResponseData,
      payload: groupedBy,
    });

    displayQueryDispatch({
      type: displayQueryAction.setRestOfGroupedQueryResponseData,
      payload: rest,
    });
  }, [queryResponseData, groupBySelection, currentSelectionData]);

  /** ------------- accessible error/valid text elems ------------- */

  const [acknowledgementInputErrorText, acknowledgementInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'acknowledgement',
      inputText: acknowledgementText,
      isValidInputText: isValidAcknowledgementText,
      isInputTextFocused: isAcknowledgementTextFocused,
      regexValidationText:
        returnAcknowledgementValidationText(acknowledgementText),
    });

  /** ------------- end accessible error/valid text elems ------------- */

  /** ------------- input creator info objects ------------- */

  const groupByRadioGroupCreatorInfo: AccessibleRadioGroupInputCreatorInfo = {
    dataObjectArray: groupByRadioData,
    description: 'Group by fields with constrained values',
    onChange: (value: string) => {
      displayQueryDispatch({
        type: displayQueryAction.setGroupBySelection,
        payload: value,
      });
    },
    semanticName: 'group by',
    value: groupBySelection,
    label: <Title order={5}>Group by</Title>,
  };

  const segmentedControl = (
    <SegmentedControl
      data={[
        { label: 'Condensed', value: 'condensed' },
        { label: 'Expanded', value: 'expanded' },
      ]}
      value={currentSegmentedSelection}
      onChange={(value: string) => {
        displayQueryDispatch({
          type: displayQueryAction.setCurrentSegmentedSelection,
          payload: value as 'condensed' | 'expanded',
        });
      }}
      radius="lg"
    />
  );

  const acknowledgementTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: acknowledgementInputErrorText,
      valid: acknowledgementInputValidText,
    },
    inputText: acknowledgementText,
    isValidInputText: isValidAcknowledgementText,
    label: 'Acknowledgement',
    name: 'acknowledgement',
    onBlur: () => {
      displayQueryDispatch({
        type: displayQueryAction.setIsAcknowledgementTextFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      displayQueryDispatch({
        type: displayQueryAction.setAcknowledgementText,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      displayQueryDispatch({
        type: displayQueryAction.setIsAcknowledgementTextFocused,
        payload: true,
      });
    },
    placeholder: 'Enter your acknowledgement',
    required: true,
    withAsterisk: true,
    semanticName: 'acknowledgement',
    customWidth: 300,
  };

  const deleteButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Delete',
    semanticDescription: 'confirm delete form submit button',
    semanticName: 'confirm delete button',
    buttonType: 'submit',
    leftIcon: <TbTrash />,
    rightIcon: <TbUpload />,
    buttonOnClick: () => {
      closeDeleteAcknowledge();
    },
    // buttonOnKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => {
    //   if (event.key === 'U+000A' || event.key === 'Enter') {
    //     event.preventDefault();
    //     return;
    //   }
    // },
    buttonDisabled: !isValidAcknowledgementText,
  };

  const showMoreSpoilerButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Show',
    leftIcon: <TbArrowDown />,
    buttonType: 'button',
    semanticDescription: 'Reveal more information',
    semanticName: 'Show more',
  };

  const hideSpoilerButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Hide',
    leftIcon: <TbArrowUp />,
    buttonType: 'button',
    semanticDescription: 'Hide revealed information',
    semanticName: 'Hide',
  };

  /** ------------- end input creator info objects ------------- */

  /** ------------- created inputs------------- */

  const [createdGroupByRadioGroup] = returnAccessibleRadioGroupInputsElements([
    groupByRadioGroupCreatorInfo,
  ]);

  const [createdAcknowledgementTextInput] = returnAccessibleTextInputElements([
    acknowledgementTextInputCreatorInfo,
  ]);

  const [
    createdDeleteButton,
    createdShowMoreSpoilerButton,
    createdHideSpoilerButton,
  ] = returnAccessibleButtonElements([
    deleteButtonCreatorInfo,
    showMoreSpoilerButtonCreatorInfo,
    hideSpoilerButtonCreatorInfo,
  ]);

  /** ------------- end created inputs------------- */

  const sectionWidth =
    width < 480
      ? 375 - 20
      : width < 640
      ? 480 - 20
      : width < 768
      ? 640 - 20
      : width < 1024
      ? (width - 200) * 0.75
      : 1024 - 250;

  const { gray } = COLORS_SWATCHES;
  const borderColor =
    colorScheme === 'light' ? `1px solid ${gray[3]}` : `1px solid ${gray[8]}`;

  const displayGroupByRadioGroup = (
    <Flex
      align="center"
      justify="flex-start"
      w={sectionWidth}
      style={{
        border: borderColor,
        borderRadius: 4,
      }}
      columnGap={rowGap}
      p={padding}
    >
      {createdGroupByRadioGroup}
    </Flex>
  );

  const displayTableViewSegmentControl = (
    <Flex
      align="center"
      justify="flex-start"
      w={sectionWidth}
      style={{
        border: borderColor,
        borderRadius: 4,
      }}
      columnGap={rowGap}
      p={padding}
    >
      <Title order={5}>Table view</Title>
      {segmentedControl}
    </Flex>
  );

  const displayAcknowledgementModal = (
    <Modal
      opened={openedDeleteAcknowledge}
      onClose={closeDeleteAcknowledge}
      centered
      size={375}
    >
      <form onSubmit={handleDeleteFormSubmit}>
        <Flex
          w="100%"
          style={{
            border: borderColor,
            borderRadius: 4,
          }}
          rowGap={rowGap}
          p={padding}
          direction="column"
        >
          <Title order={5}>Delete file</Title>
          <Text>
            To delete this file, please enter: 'I solemnly swear that I am up to
            no good.'
          </Text>
          {createdAcknowledgementTextInput}
          <Flex
            w="100%"
            justify="flex-end"
            align="center"
            columnGap={rowGap}
            p={padding}
          >
            {createdDeleteButton}
          </Flex>
        </Flex>
      </form>
    </Modal>
  );

  const displayFileUploadsModal = (
    <Modal
      opened={openedDisplayFileUploads}
      onClose={closeFileUploads}
      centered
      size={width * 0.85}
    >
      <Flex
        w="100%"
        style={{
          border: borderColor,
          borderRadius: 4,
        }}
        rowGap={rowGap}
        columnGap={rowGap}
        p={padding}
        align="baseline"
        justify="flex-start"
        wrap="wrap"
      >
        {fileUploadsForAForm.map((fileUpload, fileIdx) => {
          const {
            fileName,
            fileEncoding,
            fileSize,
            createdAt,
            fileExtension,
            fileMimeType,
            updatedAt,
            uploadedFile,
            username,
            userId,
            _id,
          } = fileUpload;

          // src={`data:${file.fileMimetype};base64,${file.uploadedFile}`}
          const displayImage = (
            <Image
              src={`data:${fileMimeType};base64,${uploadedFile}`}
              width={325}
              fit="contain"
              withPlaceholder
            />
          );

          const displayFileNameDesktop = (
            <HoverCard
              width="calc(100% - 2rem)"
              shadow="lg"
              openDelay={250}
              closeDelay={100}
            >
              <HoverCard.Target>
                <Flex
                  align="center"
                  justify="space-between"
                  wrap="wrap"
                  w="100%"
                  style={{ borderBottom: borderColor }}
                >
                  <Text>File name: </Text>
                  <Text>
                    {fileName.length > 11
                      ? `${fileName.slice(0, 11)}...`
                      : fileName}
                  </Text>
                </Flex>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Flex align="center" justify="flex-end" wrap="wrap" w="100%">
                  <Text>{fileName}</Text>
                </Flex>
              </HoverCard.Dropdown>
            </HoverCard>
          );

          /**
           * <Spoiler
                maxHeight={25}
                showLabel={createdShowMoreButton}
                hideLabel={createdHideButton}
              >
                <Text size="sm" color="dark">
                    {fileName.length > 11
                      ? `${fileName.slice(0, 11)}...`
                      : fileName}
                  </Text>
              </Spoiler>
           */

          const displayFileNameMobile = (
            <Flex
              align="center"
              justify="space-between"
              wrap="wrap"
              w="100%"
              style={{ borderBottom: borderColor }}
            >
              <Text>File name: </Text>
              <Text pl={padding}>{fileName}</Text>
            </Flex>
          );

          const displayFileExtension = (
            <Flex
              align="center"
              justify="space-between"
              wrap="wrap"
              w="100%"
              style={{ borderBottom: borderColor }}
            >
              <Text>File extension: </Text>
              <Text>{fileExtension}</Text>
            </Flex>
          );

          const displayFileMimeType = (
            <Flex
              align="center"
              justify="space-between"
              wrap="wrap"
              w="100%"
              style={{ borderBottom: borderColor }}
            >
              <Text>File mime type: </Text>
              <Text>{fileMimeType}</Text>
            </Flex>
          );

          const displayFileEncoding = (
            <Flex
              align="center"
              justify="space-between"
              wrap="wrap"
              w="100%"
              style={{ borderBottom: borderColor }}
            >
              <Text>File encoding: </Text>
              <Text>{fileEncoding}</Text>
            </Flex>
          );

          const displayFileSize = (
            <Flex
              align="center"
              justify="space-between"
              wrap="wrap"
              w="100%"
              style={{ borderBottom: borderColor }}
            >
              <Text>File size: </Text>
              <Text>{(fileSize / 1_000).toFixed(2)} KB</Text>
            </Flex>
          );

          const formattedCreatedDate = formatDate({
            date: createdAt,
            formatOptions: {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            },
            locale: 'en-US',
          });
          const dropDownFullCreatedDate = formatDate({
            date: createdAt,
            formatOptions: {
              dateStyle: 'full',
              timeStyle: 'long',
              hour12: false,
            },
            locale: 'en-US',
          });

          const displayCreatedAtDesktop = (
            <HoverCard
              width="calc(100% - 2rem)"
              shadow="lg"
              openDelay={250}
              closeDelay={100}
            >
              <HoverCard.Target>
                <Flex
                  align="center"
                  justify="space-between"
                  wrap="wrap"
                  w="100%"
                  style={{ borderBottom: '1px solid #e0e0e0' }}
                >
                  <Text>Created date: </Text>
                  <Text>{formattedCreatedDate}</Text>
                </Flex>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Flex align="center" justify="flex-end" wrap="wrap" w="100%">
                  <Text>{dropDownFullCreatedDate}</Text>
                </Flex>
              </HoverCard.Dropdown>
            </HoverCard>
          );

          const displayCreatedAtMobile = (
            <Flex
              align="center"
              justify="space-between"
              wrap="wrap"
              w="100%"
              style={{ borderBottom: '1px solid #e0e0e0' }}
            >
              <Text>Created date: </Text>
              <Text size="sm" color="dark" pl={padding}>
                {dropDownFullCreatedDate}
              </Text>
            </Flex>
          );

          const formattedUpdatedDate = formatDate({
            date: updatedAt,
            formatOptions: {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            },
            locale: 'en-US',
          });

          const dropdownFullUpdatedDate = formatDate({
            date: updatedAt,
            formatOptions: {
              dateStyle: 'full',
              timeStyle: 'long',
              hour12: false,
            },
            locale: 'en-US',
          });
          const displayUpdatedAtDesktop = (
            <HoverCard
              width="calc(100% - 2rem)"
              shadow="lg"
              openDelay={250}
              closeDelay={100}
            >
              <HoverCard.Target>
                <Flex
                  align="center"
                  justify="space-between"
                  wrap="wrap"
                  w="100%"
                  style={{ borderBottom: '1px solid #e0e0e0' }}
                >
                  <Text>Updated date: </Text>
                  <Text>{formattedUpdatedDate}</Text>
                </Flex>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Flex align="center" justify="flex-end" wrap="wrap" w="100%">
                  <Text>{dropdownFullUpdatedDate}</Text>
                </Flex>
              </HoverCard.Dropdown>
            </HoverCard>
          );

          const displayUpdatedAtMobile = (
            <Flex
              align="center"
              justify="space-between"
              wrap="wrap"
              w="100%"
              style={{ borderBottom: '1px solid #e0e0e0' }}
            >
              <Text>Updated date: </Text>
              <Text size="sm" color="dark" pl={padding}>
                {dropdownFullUpdatedDate}
              </Text>
            </Flex>
          );

          const displayCreatorInfo = (
            <Flex
              align="center"
              justify="space-between"
              wrap="wrap"
              w="100%"
              style={{ borderBottom: '1px solid #e0e0e0' }}
            >
              <Text>Creator: </Text>
              <Text>{username}</Text>
            </Flex>
          );

          const displayFileIdDesktop = (
            <HoverCard
              width="calc(100% - 2rem)"
              shadow="lg"
              openDelay={250}
              closeDelay={100}
            >
              <HoverCard.Target>
                <Flex
                  align="center"
                  justify="space-between"
                  wrap="wrap"
                  w="100%"
                  style={{ borderBottom: '1px solid #e0e0e0' }}
                >
                  <Text>File ID: </Text>
                  <Text size="sm" color="dark">
                    {_id.slice(0, 11)}...
                  </Text>
                </Flex>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Flex align="center" justify="flex-end" wrap="wrap" w="100%">
                  <Text size="sm" color="dark">
                    {_id}
                  </Text>
                </Flex>
              </HoverCard.Dropdown>
            </HoverCard>
          );

          const displayFileIdMobile = (
            <Flex
              align="center"
              justify="space-between"
              wrap="wrap"
              w="100%"
              style={{ borderBottom: '1px solid #e0e0e0' }}
            >
              <Text>File ID: </Text>
              <Text size="sm" color="dark" pl={padding}>
                {_id}
              </Text>
            </Flex>
          );

          const displayUserIdDesktop = (
            <HoverCard
              width="calc(100% - 2rem)"
              shadow="lg"
              openDelay={250}
              closeDelay={100}
            >
              <HoverCard.Target>
                <Flex
                  align="center"
                  justify="space-between"
                  wrap="wrap"
                  w="100%"
                  style={{ borderBottom: '1px solid #e0e0e0' }}
                >
                  <Text>User ID: </Text>
                  <Text size="sm" color="dark">
                    {userId.slice(0, 11)}...
                  </Text>
                </Flex>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Flex align="center" justify="flex-end" wrap="wrap" w="100%">
                  <Text size="sm" color="dark">
                    {userId}
                  </Text>
                </Flex>
              </HoverCard.Dropdown>
            </HoverCard>
          );

          const displayUserIdMobile = (
            <Flex
              align="center"
              justify="space-between"
              wrap="wrap"
              w="100%"
              style={{ borderBottom: '1px solid #e0e0e0' }}
            >
              <Text>User ID: </Text>
              <Text size="sm" color="dark" pl={padding}>
                {userId}
              </Text>
            </Flex>
          );

          const displayFileUploadInfo = (
            <Stack w="100%" py={padding}>
              {width <= 1024 ? displayFileNameMobile : displayFileNameDesktop}
              {displayFileExtension}
              {displayFileMimeType}
              {displayFileEncoding}
              {displayFileSize}
              {displayCreatorInfo}
              {width <= 1024 ? displayCreatedAtMobile : displayCreatedAtDesktop}
              {width <= 1024 ? displayUpdatedAtMobile : displayUpdatedAtDesktop}
              {width <= 1024 ? displayFileIdMobile : displayFileIdDesktop}
              {width <= 1024 ? displayUserIdMobile : displayUserIdDesktop}
            </Stack>
          );

          const displayFileUploadInfoAccordion = (
            <Accordion py={padding}>
              <Accordion.Item
                value={`${
                  fileName.length > 23
                    ? `${fileName.slice(0, 23)}...`
                    : fileName
                } info`}
              >
                <Accordion.Control>
                  <Text>
                    {fileName.length > 23
                      ? `${fileName.slice(0, 23)}...`
                      : fileName}
                  </Text>
                </Accordion.Control>
                <Accordion.Panel>{displayFileUploadInfo}</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          );

          const createdDeleteFileButton = returnAccessibleButtonElements([
            {
              buttonLabel: 'Delete',
              leftIcon: <TbTrash />,
              semanticDescription: `Click button to delete ${fileName}`,
              semanticName: `delete ${fileName}`,
              buttonOnClick: () => {
                displayQueryDispatch({
                  type: displayQueryAction.setDeleteResourceKind,
                  payload: 'fileUpload',
                });
                displayQueryDispatch({
                  type: displayQueryAction.setDeleteFileUploadId,
                  payload: _id,
                });
                closeFileUploads();
                openDeleteAcknowledge();
              },
            },
          ]);

          const displayFileCard = (
            <Card
              key={`${fileIdx}-${fileName}`}
              shadow="md"
              padding={padding}
              radius="md"
              withBorder
            >
              <Card.Section>{displayImage}</Card.Section>
              {displayFileUploadInfoAccordion}
              <Group w="100%" position="center" pt={padding}>
                <Tooltip
                  label={`Delete file ${
                    fileName.length > 23
                      ? `${fileName.slice(0, 23)}...`
                      : fileName
                  }`}
                >
                  <Group>{createdDeleteFileButton}</Group>
                </Tooltip>
              </Group>
            </Card>
          );

          return displayFileCard;
        })}
      </Flex>
    </Modal>
  );

  const displayQueryComponent =
    width <= 1024 ? (
      <DisplayQueryMobile
        componentQueryData={componentQueryData}
        deleteFormIdDispatch={displayQueryDispatch}
        fileUploadsData={fileUploadsData}
        deleteFileUploadIdDispatch={displayQueryDispatch}
        deleteResourceKindDispatch={displayQueryDispatch}
        groupedByQueryResponseData={groupedByQueryResponseData}
        openDeleteAcknowledge={openDeleteAcknowledge}
        openFileUploads={openFileUploads}
        setFileUploadsForAFormDispatch={displayQueryDispatch}
        popoversOpenCloseState={popoversOpenCloseState}
        popoversStateDispatch={displayQueryDispatch}
        requestStatusDispatch={parentRequestStatusDispatch}
        restOfGroupedQueryResponseData={restOfGroupedQueryResponseData}
        tableViewSelection={currentSegmentedSelection}
      />
    ) : (
      <DisplayQueryDesktop
        componentQueryData={componentQueryData}
        deleteFormIdDispatch={displayQueryDispatch}
        deleteFileUploadIdDispatch={displayQueryDispatch}
        deleteResourceKindDispatch={displayQueryDispatch}
        fileUploadsData={fileUploadsData}
        groupedByQueryResponseData={groupedByQueryResponseData}
        openDeleteAcknowledge={openDeleteAcknowledge}
        openFileUploads={openFileUploads}
        setFileUploadsForAFormDispatch={displayQueryDispatch}
        popoversOpenCloseState={popoversOpenCloseState}
        popoversStateDispatch={displayQueryDispatch}
        requestStatusDispatch={parentRequestStatusDispatch}
        restOfGroupedQueryResponseData={restOfGroupedQueryResponseData}
        tableViewSelection={currentSegmentedSelection}
      />
    );

  useEffect(() => {
    logState({
      state: displayQueryState,
      groupLabel: 'displayQueryState',
    });
  }, [displayQueryState]);

  return (
    <Flex
      direction="column"
      rowGap={rowGap}
      w="100%"
      align="flex-start"
      justify="center"
      style={{
        ...style,
      }}
    >
      {displayGroupByRadioGroup}
      {width >= 1024 ? displayTableViewSegmentControl : null}
      {displayAcknowledgementModal}
      {displayFileUploadsModal}
      <Flex align="center" justify="space-between" w="100%">
        <Text>{parentComponentName}</Text>
        <Text>Total documents: {totalDocuments}</Text>
      </Flex>
      {displayQueryComponent}
    </Flex>
  );
}

export { DisplayQuery };

/**
 *   const groupBySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
      data: groupBySelectData,
      description: 'Group by fields with constrained values',
      label: 'Group by',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        displayQueryDispatch({
          type: displayQueryAction.setGroupBySelection,
          // find the corresponding label for the value
          payload:
            componentQueryData.find(({ label, value }) =>
              label === event.currentTarget.value ? value : ''
            )?.value || 'username',
        });
      },
      // assign the label and not the value
      value:
        componentQueryData.find(({ label, value }) =>
          value === groupBySelection ? label : ''
        )?.label || 'Username',
    };
 */

/**
     * componentQueryData.forEach(({ label, inputKind, value, selectData }) => {
      if (inputKind === 'selectInput') {
        // only push if it is also present in query response data
        const isFieldExcluded = queryResponseData.filter((queryResponseObj) => {
          return Object.entries(queryResponseObj).find(([key, _]) => {
            if (key === value) {
              return true;
            }
            return false;
          });
        });

        if (isFieldExcluded.length > 0) {
          initialGroupByRadioData.push({
            label,
            value,
          });
        }
      }
    });
     */
