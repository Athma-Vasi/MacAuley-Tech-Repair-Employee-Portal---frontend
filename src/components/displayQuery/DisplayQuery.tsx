import {
  Accordion,
  Card,
  Flex,
  Group,
  HoverCard,
  Image,
  Modal,
  ScrollArea,
  Space,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, FormEvent, useEffect, useReducer } from "react";
import { TbNewSection, TbQuestionMark, TbTrash, TbUpload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import { COLORS_SWATCHES } from "../../constants/data";
import { ACKNOWLEDGEMENT_TEXT_INPUT_REGEX } from "../../constants/regex";
import { useGlobalState } from "../../hooks";
import {
  AccessibleErrorValidTextElements,
  returnAccessibleButtonElements,
  returnAccessibleRadioGroupInputsElements,
  returnAccessibleTextInputElements,
} from "../../jsxCreators";
import {
  formatDate,
  groupQueryResponse,
  logState,
  returnAcknowledgementValidationText,
  returnThemeColors,
} from "../../utils";
import {
  AccessibleButtonCreatorInfo,
  AccessibleRadioGroupInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
} from "../wrappers";
import { DisplayQueryDesktop } from "./displayQueryDesktop/DisplayQueryDesktop";
import { DisplayQueryMobile } from "./displayQueryMobile/DisplayQueryMobile";
import {
  displayQueryAction,
  displayQueryReducer,
  initialDisplayQueryState,
} from "./state";
import { DisplayQueryProps } from "./types";
import { GROUP_BY_HELP_MODAL_CONTENT } from "./utils";
import DisplayQueryCards from "./displayQueryCards/DisplayQueryCards";

function DisplayQuery<
  Doc extends Record<string | symbol | number, any> = Record<
    string | symbol | number,
    any
  >
>({
  componentQueryData,
  createResourcePath,
  fileUploadsData = [],
  isLoading,
  loadingMessage,
  parentComponentName,
  parentRequestStatusDispatch,
  parentDeleteResourceDispatch,
  queryResponseData,
  queryValuesArray,
  style = {},
  totalDocuments,
}: DisplayQueryProps<Doc>) {
  const [displayQueryState, displayQueryDispatch] = useReducer(
    displayQueryReducer,
    initialDisplayQueryState
  );
  const {
    groupByRadioData,
    currentSelectionData,
    groupBySelection,
    groupedByQueryResponseData,
    displayDocumentsView,
    fileUploadsForAForm,
    acknowledgementText,
    isAcknowledgementTextFocused,
    isValidAcknowledgementText,
    deleteFileUploadId,
    deleteFormId,
    deleteResourceKind,
  } = displayQueryState;

  const {
    globalState: { padding, width, rowGap, themeObject },
  } = useGlobalState();

  const [
    openedDeleteAcknowledge,
    { open: openDeleteAcknowledge, close: closeDeleteAcknowledge },
  ] = useDisclosure(false);
  const [openedDisplayFileUploads, { open: openFileUploads, close: closeFileUploads }] =
    useDisclosure(false);
  const [
    openedGroupByHelpModal,
    { open: openGroupByHelpModal, close: closeGroupByHelpModal },
  ] = useDisclosure(false);

  const navigate = useNavigate();

  async function handleDeleteFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("delete form submitted");

    if (!isValidAcknowledgementText) {
      return;
    }

    parentDeleteResourceDispatch({
      type: "setDeleteResource",
      payload: {
        formId: deleteFormId,
        kind: deleteResourceKind,
        fileUploadId:
          deleteResourceKind === "fileUpload" ? deleteFileUploadId : undefined,
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
        (acc: Array<{ value: string; label: string }>, { inputKind, label, value }) => {
          if (inputKind === "selectInput" || inputKind === "booleanInput") {
            // only push if it is also present in query response data
            const isFieldExcluded = queryResponseData.filter((queryResponseObj) => {
              return Object.entries(queryResponseObj).find(([key, _]) => key === value);
            });

            if (isFieldExcluded.length > 0) {
              acc.push({ label, value });
            }
          }

          return acc;
        },
        [
          { label: "None", value: "none" },
          { label: "Username", value: "username" },
        ]
      )
      // username is not displayed when resource is anonymousRequest
      .filter(({ value }) => {
        return parentComponentName === "Anonymous Request" ? value !== "username" : true;
      });

    displayQueryDispatch({
      type: displayQueryAction.setGroupByRadioData,
      payload: initialGroupByRadioData,
    });
  }, [queryResponseData, componentQueryData]);

  // assign current groupBy selection's corresponding options data
  useEffect(() => {
    const currentSelectData =
      groupBySelection === "username" || groupBySelection === "none"
        ? [""]
        : componentQueryData.reduce(
            (acc, componentQueryObj) => {
              if (groupBySelection === componentQueryObj.value) {
                if (componentQueryObj.selectData) {
                  acc = componentQueryObj.selectData;
                }
              }

              return acc;
            },
            [""]
          );

    displayQueryDispatch({
      type: displayQueryAction.setCurrentSelectionData,
      payload: currentSelectData,
    });
  }, [groupBySelection, componentQueryData]);

  // group the queries on every selection or query change
  useEffect(() => {
    const { groupedBy } = groupQueryResponse({
      queryResponseData,
      groupBySelection,
      currentSelectionData,
    });

    displayQueryDispatch({
      type: displayQueryAction.setGroupedByQueryResponseData,
      payload: groupedBy,
    });
  }, [queryResponseData, groupBySelection, currentSelectionData]);

  /** ------------- accessible error/valid text elems ------------- */

  const [acknowledgementInputErrorText, acknowledgementInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "acknowledgement",
      inputText: acknowledgementText,
      isValidInputText: isValidAcknowledgementText,
      isInputTextFocused: isAcknowledgementTextFocused,
      regexValidationText: returnAcknowledgementValidationText(acknowledgementText),
    });

  /** ------------- end accessible error/valid text elems ------------- */

  /** ------------- input creator info objects ------------- */

  const [createdGroupByButton] = returnAccessibleButtonElements([
    {
      buttonLabel: <TbQuestionMark />,
      semanticDescription: "Open group by help modal",
      semanticName: "group by help",
      buttonOnClick: () => {
        openGroupByHelpModal();
      },
    },
  ]);

  const groupByRadioLabel = (
    <Group spacing={padding} py="xs">
      <Title order={5}>Group by</Title>
      <Tooltip label="Group By help">
        <Group>{createdGroupByButton}</Group>
      </Tooltip>
    </Group>
  );

  const groupByRadioGroupCreatorInfo: AccessibleRadioGroupInputCreatorInfo = {
    dataObjectArray: groupByRadioData,
    description: "Group by fields with constrained values",
    onChange: (value: string) => {
      displayQueryDispatch({
        type: displayQueryAction.setGroupBySelection,
        payload: value,
      });
    },
    semanticName: "group by",
    value: groupBySelection,
    label: groupByRadioLabel,
  };

  const acknowledgementTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: acknowledgementInputErrorText,
      valid: acknowledgementInputValidText,
    },
    inputText: acknowledgementText,
    isValidInputText: isValidAcknowledgementText,
    label: "Acknowledgement",
    name: "acknowledgement",
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
    placeholder: "Enter your acknowledgement",
    required: true,
    withAsterisk: true,
    semanticName: "acknowledgement",
    textInputWidth: 300,
  };

  const deleteButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Delete",
    semanticDescription: "confirm delete form submit button",
    semanticName: "confirm delete button",
    buttonType: "submit",
    leftIcon: <TbTrash />,
    rightIcon: <TbUpload />,
    buttonOnClick: () => {
      closeDeleteAcknowledge();
    },
    buttonDisabled: !isValidAcknowledgementText,
  };

  const createResourceButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Create",
    semanticDescription: `create ${parentComponentName} form button`,
    semanticName: `create ${parentComponentName} button`,
    leftIcon: <TbNewSection />,
    buttonOnClick: () => {
      navigate(createResourcePath);
    },
  };

  /** ------------- end input creator info objects ------------- */

  /** ------------- created inputs------------- */

  const [createdGroupByRadioGroup] = returnAccessibleRadioGroupInputsElements([
    groupByRadioGroupCreatorInfo,
  ]);

  const [createdAcknowledgementTextInput] = returnAccessibleTextInputElements([
    acknowledgementTextInputCreatorInfo,
  ]);

  const [createdDeleteButton, createdCreateResourceButton] =
    returnAccessibleButtonElements([
      deleteButtonCreatorInfo,
      createResourceButtonCreatorInfo,
    ]);

  /** ------------- end created inputs------------- */

  const sectionWidth =
    width < 480 // for iPhone 5/SE
      ? width * 0.93
      : width < 768 // for iPhones 6 - 15
      ? width - 40
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225) * 0.8
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 225) * 0.8
      : 900 - 40;

  const {
    appThemeColors: { borderColor },
    generalColors: { themeColorShade },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const displayGroupByRadioGroup = (
    <Group
      w={sectionWidth}
      style={{
        border: borderColor,
        borderRadius: 4,
      }}
      spacing={rowGap}
      p={padding}
    >
      {createdGroupByRadioGroup}
    </Group>
  );

  const displayAcknowledgementModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedDeleteAcknowledge}
      onClose={closeDeleteAcknowledge}
      size={350}
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
            To delete this file, please enter: 'I solemnly swear that I am up to no good.'
          </Text>
          {createdAcknowledgementTextInput}
          <Flex w="100%" justify="flex-end" align="center" columnGap={rowGap} p={padding}>
            {createdDeleteButton}
          </Flex>
        </Flex>
      </form>
    </Modal>
  );

  const displayFileUploadsModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedDisplayFileUploads}
      onClose={closeFileUploads}
      size={width < 1200 ? width * 0.9 : 1150}
      title={<Title order={4}>File Uploads</Title>}
      scrollAreaComponent={ScrollArea.Autosize}
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
                    {fileName.length > 11 ? `${fileName.slice(0, 11)}...` : fileName}
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
              year: "numeric",
              month: "numeric",
              day: "numeric",
            },
            locale: "en-US",
          });
          const dropDownFullCreatedDate = formatDate({
            date: createdAt,
            formatOptions: {
              dateStyle: "full",
              timeStyle: "long",
              hour12: false,
            },
            locale: "en-US",
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
                  style={{ borderBottom: borderColor }}
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
              style={{ borderBottom: borderColor }}
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
              year: "numeric",
              month: "numeric",
              day: "numeric",
            },
            locale: "en-US",
          });

          const dropdownFullUpdatedDate = formatDate({
            date: updatedAt,
            formatOptions: {
              dateStyle: "full",
              timeStyle: "long",
              hour12: false,
            },
            locale: "en-US",
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
                  style={{ borderBottom: borderColor }}
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
              style={{ borderBottom: borderColor }}
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
              style={{ borderBottom: borderColor }}
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
                  style={{ borderBottom: borderColor }}
                >
                  <Text>File ID: </Text>
                  <Text>{_id.slice(0, 11)}...</Text>
                </Flex>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Flex align="center" justify="flex-end" wrap="wrap" w="100%">
                  <Text>{_id}</Text>
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
              style={{ borderBottom: borderColor }}
            >
              <Text>File ID: </Text>
              <Text pl={padding}>{_id}</Text>
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
                  style={{ borderBottom: borderColor }}
                >
                  <Text>User ID: </Text>
                  <Text>{userId.slice(0, 11)}...</Text>
                </Flex>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Flex align="center" justify="flex-end" wrap="wrap" w="100%">
                  <Text>{userId}</Text>
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
              style={{ borderBottom: borderColor }}
            >
              <Text>User ID: </Text>
              <Text pl={padding}>{userId}</Text>
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
                  fileName.length > 23 ? `${fileName.slice(0, 23)}...` : fileName
                } info`}
              >
                <Accordion.Control>
                  <Text>
                    {fileName.length > 23 ? `${fileName.slice(0, 23)}...` : fileName}
                  </Text>
                </Accordion.Control>
                <Accordion.Panel>{displayFileUploadInfo}</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          );

          const createdDeleteFileButton = returnAccessibleButtonElements([
            {
              buttonLabel: "Delete",
              leftIcon: <TbTrash />,
              semanticDescription: `Click button to delete ${fileName}`,
              semanticName: `delete ${fileName}`,
              buttonOnClick: () => {
                displayQueryDispatch({
                  type: displayQueryAction.setDeleteResourceKind,
                  payload: "fileUpload",
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
                    fileName.length > 23 ? `${fileName.slice(0, 23)}...` : fileName
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
        deleteResourceKindDispatch={displayQueryDispatch}
        groupedByQueryResponseData={groupedByQueryResponseData}
        groupBySelection={groupBySelection}
        isLoading={isLoading}
        loadingMessage={loadingMessage}
        openDeleteAcknowledge={openDeleteAcknowledge}
        openFileUploads={openFileUploads}
        queryValuesArray={queryValuesArray}
        requestStatusDispatch={parentRequestStatusDispatch}
        setFileUploadsForAFormDispatch={displayQueryDispatch}
      />
    ) : displayDocumentsView === "table" ? (
      <DisplayQueryDesktop
        componentQueryData={componentQueryData}
        deleteFormIdDispatch={displayQueryDispatch}
        deleteResourceKindDispatch={displayQueryDispatch}
        fileUploadsData={fileUploadsData}
        groupedByQueryResponseData={groupedByQueryResponseData}
        groupByRadioData={groupByRadioData}
        groupBySelection={groupBySelection}
        isLoading={isLoading}
        loadingMessage={loadingMessage}
        openDeleteAcknowledge={openDeleteAcknowledge}
        openFileUploads={openFileUploads}
        queryValuesArray={queryValuesArray}
        requestStatusDispatch={parentRequestStatusDispatch}
        setFileUploadsForAFormDispatch={displayQueryDispatch}
      />
    ) : (
      <DisplayQueryCards
        componentQueryData={componentQueryData}
        groupByRadioData={groupByRadioData}
        groupBySelection={groupBySelection}
        groupedByQueryResponseData={groupedByQueryResponseData}
      />
    );

  useEffect(() => {
    logState({
      state: displayQueryState,
      groupLabel: "displayQueryState",
    });
  }, [displayQueryState]);

  const displayCreateResourceButton = createResourcePath.length ? (
    <Tooltip label={`Create ${parentComponentName}`}>
      <Group>{createdCreateResourceButton}</Group>
    </Tooltip>
  ) : null;

  const groupByHelpModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedGroupByHelpModal}
      onClose={closeGroupByHelpModal}
      title={<Title order={4}>Group By help</Title>}
      size={width <= 1024 ? "auto" : 1024 - 200}
    >
      {GROUP_BY_HELP_MODAL_CONTENT}
    </Modal>
  );

  return (
    <Flex
      direction="column"
      rowGap={rowGap}
      align="center"
      justify="center"
      style={{
        ...style,
      }}
      w="100%"
    >
      {displayAcknowledgementModal}
      {groupByHelpModal}
      {displayFileUploadsModal}

      {displayGroupByRadioGroup}
      <Space h="md" />
      <Space h="md" />
      <Flex align="center" justify="space-between" w="100%" py={padding} pr={padding}>
        <Group spacing={rowGap}>
          <Title order={2}>{parentComponentName}s</Title>
          {displayCreateResourceButton}
        </Group>
        <Text>Total documents: {totalDocuments}</Text>
      </Flex>
      {displayQueryComponent}
    </Flex>
  );
}

export { DisplayQuery };
