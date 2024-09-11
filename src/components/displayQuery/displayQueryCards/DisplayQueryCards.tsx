import {
  Accordion,
  Card,
  Flex,
  Grid,
  Group,
  Loader,
  LoadingOverlay,
  Modal,
  ScrollArea,
  Space,
  Spoiler,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useReducer } from "react";
import { IoMdOpen } from "react-icons/io";
import {
  TbArrowDown,
  TbArrowUp,
  TbEdit,
  TbStatusChange,
  TbTrash,
  TbUserSearch,
} from "react-icons/tb";

import { COLORS_SWATCHES } from "../../../constants/data";
import { useAuth, useGlobalState } from "../../../hooks";
import { returnAccessibleButtonElements } from "../../../jsxCreators";
import {
  FileUploadDocument,
  RequestStatus,
  UserDocument,
} from "../../../types";
import { logState, returnThemeColors, splitCamelCase } from "../../../utils";
import { CustomerDocument } from "../../customer/types";
import { EditRepairTicketInput } from "../displayQueryDesktop/types";
import { returnWhichResourceInView } from "../displayQueryDesktop/utils";
import EditRepairTicket from "../editRepairTicket/EditRepairTicket";
import { ProfileInfo } from "../profileInfo/ProfileInfo";
import UpdateRequestStatus from "../updateRequestStatus/UpdateRequestStatus";
import { addFieldsToQueryResponseObject, returnFormattedText } from "../utils";
import {
  displayQueryCardsAction,
  displayQueryCardsReducer,
  initialDisplayQueryCardsState,
} from "./state";
import { DisplayQueryCardsProps } from "./types";

type EntryProps = {
  deleteFormIdDispatch: React.Dispatch<{
    type: "setDeleteFormId";
    payload: string;
  }>;
  deleteResourceKindDispatch: React.Dispatch<{
    type: "setDeleteResourceKind";
    payload: "form" | "fileUpload" | "";
  }>;
  setCurrentDocumentIdDispatch: React.Dispatch<{
    type: "setCurrentDocumentId";
    payload: string;
  }>;
  setCurrentRequestStatusDispatch: React.Dispatch<{
    type: "setCurrentRequestStatus";
    payload: RequestStatus;
  }>;
  setCustomerDocumentDispatch: React.Dispatch<{
    type: "setCustomerDocument";
    payload: Omit<CustomerDocument, "password" | "paymentInformation">;
  }>;
  setEditRepairTicketInputDispatch: React.Dispatch<{
    type: "setEditRepairTicketInput";
    payload: EditRepairTicketInput;
  }>;
  setEmployeeDocumentDispatch: React.Dispatch<{
    type: "setEmployeeDocument";
    payload: UserDocument;
  }>;
  documentSectionInView: {
    isAnonymousRequestsSectionInView: boolean;
    isProductCategorySectionInView: boolean;
    isPurchaseSectionInView: boolean;
    isRMASectionInView: boolean;
    isRepairTicketSectionInView: boolean;
    isCustomerSectionInView: boolean;
    isProductReviewSectionInView: boolean;
  };
  fileUploadsData?: Array<{ [key: string]: FileUploadDocument[] }>;
  obj: Record<string | number | symbol, any>;
  openDeleteAcknowledge: () => void;
  openEditRepairTicketsModal: () => void;
  openProfileInfoModal: () => void;
  openUpdateRequestStatusModal: () => void;
  openFileUploads: () => void;
  queryValuesArray: string[];
  setFileUploadsForAFormDispatch: React.Dispatch<{
    type: "setFileUploadsForAForm";
    payload: FileUploadDocument[];
  }>;
};

function Entry({
  deleteFormIdDispatch,
  deleteResourceKindDispatch,
  documentSectionInView,
  fileUploadsData = [],
  obj,
  openDeleteAcknowledge,
  openEditRepairTicketsModal,
  openFileUploads,
  openProfileInfoModal,
  openUpdateRequestStatusModal,
  queryValuesArray,
  setCurrentDocumentIdDispatch,
  setCurrentRequestStatusDispatch,
  setCustomerDocumentDispatch,
  setEditRepairTicketInputDispatch,
  setEmployeeDocumentDispatch,
  setFileUploadsForAFormDispatch,
}: EntryProps) {
  const {
    globalState: { themeObject, padding },
  } = useGlobalState();

  const {
    authState: { roles },
  } = useAuth();

  const {
    appThemeColors: { borderColor },
    tablesThemeColors: { textHighlightColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const [createdShowMoreButton, createdHideButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: "Show",
        leftIcon: <TbArrowDown />,
        buttonType: "button",
        semanticDescription: "Reveal more information",
        semanticName: "Show more",
      },
      {
        buttonLabel: "Hide",
        leftIcon: <TbArrowUp />,
        buttonType: "button",
        semanticDescription: "Hide revealed information",
        semanticName: "Hide",
      },
    ]);

  const {
    isAnonymousRequestsSectionInView,
    isCustomerSectionInView,
    isProductCategorySectionInView,
    isProductReviewSectionInView,
    isPurchaseSectionInView,
    isRMASectionInView,
    isRepairTicketSectionInView,
  } = documentSectionInView;

  return (
    <Stack>
      {Object.entries(obj).map(([key, value], index) => {
        const rowBackgroundColorLight = index % 2 === 0
          ? "#f9f9f9"
          : "transparent";
        const rowBackgroundColorDark = "transparent";
        const rowBackgroundColor = themeObject.colorScheme === "dark"
          ? rowBackgroundColorDark
          : rowBackgroundColorLight;

        // only when user views repair notes section
        const [createdRepairTicketEditButton] = isRepairTicketSectionInView
          ? returnAccessibleButtonElements([
            {
              buttonLabel: <TbEdit />,
              semanticDescription:
                `Modify ${key} for username: ${obj.username} and form with id: ${obj._id}`,
              semanticName: `Modify ${key}`,
              buttonOnClick: () => {
                setEditRepairTicketInputDispatch({
                  type: displayQueryCardsAction.setEditRepairTicketInput,
                  payload: {
                    repairTicketFormId: obj._id,
                    repairNotes: obj.repairNotes,
                    testingResults: obj.testingResults,
                    finalRepairCost: obj.finalRepairCost,
                    finalRepairCostCurrency: obj.finalRepairCostCurrency,
                    repairStatus: obj.repairStatus,
                  },
                });

                openEditRepairTicketsModal();
              },
            },
          ])
          : [null];

        const [
          // createdViewProductReviewsButton,
          createdUpdateRequestStatusButton,
          createdViewProfileButton,
          createdDeleteButton,
          createdOpenFileUploadsModalButton,
        ] = returnAccessibleButtonElements([
          // update request status button
          {
            buttonLabel: <TbStatusChange />,
            semanticDescription:
              `Modify current request status of ${obj.requestStatus} for username: ${obj.username} and form with id: ${obj._id}`,
            semanticName: "Update request status",
            buttonOnClick: () => {
              setCurrentDocumentIdDispatch({
                type: displayQueryCardsAction.setCurrentDocumentId,
                payload: obj._id,
              });
              setCurrentRequestStatusDispatch({
                type: displayQueryCardsAction.setCurrentRequestStatus,
                payload: obj.requestStatus,
              });
              openUpdateRequestStatusModal();
            },
          },
          // view profile button
          {
            buttonLabel: <TbUserSearch />,
            semanticDescription: `View profile of username: ${obj.username}`,
            semanticName: "View profile",
            buttonOnClick: () => {
              // isProductReviewSectionInView
              //   ? setCustomerDocumentDispatch({
              //       type: displayQueryCardsAction.setCustomerDocument,
              //       payload:
              //         actionsDocuments?.customerData?.find(
              //           (customer) => customer.username === obj.username
              //         ) ??
              //         ({} as Omit<CustomerDocument, "password" | "paymentInformation">),
              //     })
              //   : isPurchaseSectionInView || isRMASectionInView
              //   ? setCustomerDocumentDispatch({
              //       type: displayQueryCardsAction.setCustomerDocument,
              //       payload:
              //         actionsDocuments?.customerData?.find(
              //           (customer) => customer._id === obj.customerId
              //         ) ??
              //         ({} as Omit<CustomerDocument, "password" | "paymentInformation">),
              //     })
              //   : setEmployeeDocumentDispatch({
              //       type: displayQueryCardsAction.setEmployeeDocument,
              //       payload: isCustomerSectionInView
              //         ? (obj as UserDocument)
              //         : (Array.from(actionsDocuments?.employeeData ?? new Map()).find(
              //             ([_key, value]) => value._id === obj.userId
              //           )?.[1] as UserDocument),
              //     });

              openProfileInfoModal();
            },
          },
          // delete button
          {
            buttonLabel: <TbTrash />,
            semanticDescription: "Delete this form",
            semanticName: "Delete",
            buttonOnClick: () => {
              deleteFormIdDispatch({
                type: "setDeleteFormId",
                payload: obj._id,
              });
              deleteResourceKindDispatch({
                type: "setDeleteResourceKind",
                payload: "form",
              });
              openDeleteAcknowledge();
            },
          },
          // open file uploads modal button
          {
            buttonLabel: "Open",
            // buttonDisabled: !fileUploadsData[index]?.fileUploads?.length,
            leftIcon: <IoMdOpen />,
            semanticDescription:
              "Open modal to display file uploads associated with this document",
            semanticName: "Open file uploads modal",
            buttonOnClick: () => {
              setFileUploadsForAFormDispatch({
                type: "setFileUploadsForAForm",
                payload: [obj as FileUploadDocument],
              });
              deleteFormIdDispatch({
                type: "setDeleteFormId",
                payload: obj._id,
              });
              openFileUploads();
            },
          },
        ]);

        // only managers can update request status
        const displayUpdateRequestStatusButton = roles.includes("Manager")
          ? key === "requestStatus" ? createdUpdateRequestStatusButton : null
          : null;

        const displayViewProfileButton = key === "viewProfile"
          ? (
            <Tooltip
              label={`View profile of ${obj.username ?? obj._id ?? obj.email}`}
            >
              <Group>{createdViewProfileButton}</Group>
            </Tooltip>
          )
          : null;

        const displayCreatedDeleteButton = key === "delete"
          ? (
            <Tooltip label={`Delete form with id: ${obj._id}`}>
              <Group>{createdDeleteButton}</Group>
            </Tooltip>
          )
          : null;

        const displayEditRepairTicketButton = key === "edit"
          ? (
            <Tooltip
              label={`Edit repair note for ${
                obj.customerName ?? obj._id ?? obj.username ?? obj.email ??
                  obj.brand
              }`}
            >
              <Group>{createdRepairTicketEditButton}</Group>
            </Tooltip>
          )
          : null;

        const displayCreatedOpenFileUploadsModalButton =
          key === "fileUploads" || key === "viewFile"
            ? (
              <Tooltip
                label={!fileUploadsData[index]?.fileUploads?.length
                  ? "No file uploads associated with this document"
                  : `Open file uploads modal for form with id: ${obj._id}`}
              >
                <Group>{createdOpenFileUploadsModalButton}</Group>
              </Tooltip>
            )
            : null;

        // regex to determine if value has any terms in queryValuesArray
        const regex = queryValuesArray?.length
          ? new RegExp(
            queryValuesArray
              .filter((value) => value) // remove empty strings
              .flatMap((value) => value.split(" "))
              .join("|"),
            "gi",
          )
          : null;

        return typeof value === "object" && value !== null &&
            !Array.isArray(value)
          ? (
            <Flex direction="column">
              <Space h="xl" />
              <Text size="md" weight={500}>
                {splitCamelCase(key) === "0" ? "" : splitCamelCase(key)}
              </Text>
              <Stack py={padding}>
                <Entry
                  deleteFormIdDispatch={deleteFormIdDispatch}
                  deleteResourceKindDispatch={deleteResourceKindDispatch}
                  documentSectionInView={documentSectionInView}
                  fileUploadsData={fileUploadsData}
                  obj={value}
                  openDeleteAcknowledge={openDeleteAcknowledge}
                  openProfileInfoModal={openProfileInfoModal}
                  openUpdateRequestStatusModal={openUpdateRequestStatusModal}
                  openEditRepairTicketsModal={openEditRepairTicketsModal}
                  openFileUploads={openFileUploads}
                  queryValuesArray={queryValuesArray}
                  setCurrentDocumentIdDispatch={setCurrentDocumentIdDispatch}
                  setCurrentRequestStatusDispatch={setCurrentRequestStatusDispatch}
                  setCustomerDocumentDispatch={setCustomerDocumentDispatch}
                  setEditRepairTicketInputDispatch={setEditRepairTicketInputDispatch}
                  setEmployeeDocumentDispatch={setEmployeeDocumentDispatch}
                  setFileUploadsForAFormDispatch={setFileUploadsForAFormDispatch}
                />
              </Stack>
            </Flex>
          )
          : Array.isArray(value)
          ? (
            typeof value[0] !== "object" && value[0] !== null
              ? (
                <Grid
                  columns={10}
                  w="100%"
                  style={{ borderBottom: borderColor }}
                >
                  <Grid.Col span={4} style={{ background: rowBackgroundColor }}>
                    <Text>{splitCamelCase(key)}</Text>
                  </Grid.Col>
                  <Grid.Col span={6} style={{ background: rowBackgroundColor }}>
                    <Spoiler
                      maxHeight={45}
                      showLabel={createdShowMoreButton}
                      hideLabel={createdHideButton}
                    >
                      <Flex direction="row" wrap="wrap" gap={4}>
                        {returnFormattedText({
                          key,
                          val: value,
                          queryValuesArray,
                          textHighlightColor,
                        })}
                      </Flex>
                    </Spoiler>
                  </Grid.Col>
                </Grid>
              )
              : key === "sku" ||
                  key === "productReviewsIds" ||
                  key === "uploadedFilesIds" ||
                  key === "uploadedFile"
              ? null
              : (
                <Accordion w="100%">
                  <Accordion.Item
                    value={key === "productCategoryDocs"
                      ? "Product Information"
                      : key === "starRatingsCount"
                      ? "Ratings Count"
                      : splitCamelCase(key)}
                  >
                    <Accordion.Control>
                      <Title order={5}>
                        {key === "productCategoryDocs"
                          ? "Product Information"
                          : key === "starRatingsCount"
                          ? "Ratings Count"
                          : splitCamelCase(key)}
                      </Title>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Flex direction="column" py={padding}>
                        {value.map((val, idx) => {
                          return typeof val === "object" && val !== null
                            ? (
                              <Stack key={`${val}-${idx}`}>
                                <Entry
                                  deleteFormIdDispatch={deleteFormIdDispatch}
                                  deleteResourceKindDispatch={deleteResourceKindDispatch}
                                  documentSectionInView={documentSectionInView}
                                  fileUploadsData={fileUploadsData}
                                  obj={value}
                                  openDeleteAcknowledge={openDeleteAcknowledge}
                                  openFileUploads={openFileUploads}
                                  openProfileInfoModal={openProfileInfoModal}
                                  openUpdateRequestStatusModal={openUpdateRequestStatusModal}
                                  openEditRepairTicketsModal={openEditRepairTicketsModal}
                                  queryValuesArray={queryValuesArray}
                                  setCurrentDocumentIdDispatch={setCurrentDocumentIdDispatch}
                                  setCurrentRequestStatusDispatch={setCurrentRequestStatusDispatch}
                                  setCustomerDocumentDispatch={setCustomerDocumentDispatch}
                                  setEditRepairTicketInputDispatch={setEditRepairTicketInputDispatch}
                                  setEmployeeDocumentDispatch={setEmployeeDocumentDispatch}
                                  setFileUploadsForAFormDispatch={setFileUploadsForAFormDispatch}
                                />
                              </Stack>
                            )
                            : (
                              <Stack key={`${String(val) ?? index}-${idx}`}>
                                <Spoiler
                                  maxHeight={45}
                                  showLabel={createdShowMoreButton}
                                  hideLabel={createdHideButton}
                                >
                                  <Flex direction="row" wrap="wrap" gap={4}>
                                    {returnFormattedText({
                                      key,
                                      val,
                                      queryValuesArray,
                                      textHighlightColor,
                                    })}
                                  </Flex>
                                </Spoiler>
                              </Stack>
                            );
                        })}
                      </Flex>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              )
          )
          : key === "uploadedFile"
          ? null
          : (
            <Grid columns={10} w="100%" style={{ borderBottom: borderColor }}>
              <Grid.Col span={4} style={{ background: rowBackgroundColor }}>
                <Text weight={regex?.test(value) ? 600 : void 0}>
                  {splitCamelCase(key)}
                </Text>
              </Grid.Col>
              <Grid.Col span={6} style={{ background: rowBackgroundColor }}>
                <Spoiler
                  maxHeight={45}
                  showLabel={createdShowMoreButton}
                  hideLabel={createdHideButton}
                >
                  <Flex direction="row" wrap="wrap" gap={4}>
                    {displayUpdateRequestStatusButton}
                    {displayViewProfileButton}
                    {displayCreatedOpenFileUploadsModalButton}
                    {displayCreatedDeleteButton}
                    {displayEditRepairTicketButton}

                    {returnFormattedText({
                      key,
                      val: value,
                      queryValuesArray,
                      textHighlightColor,
                    })}
                  </Flex>
                </Spoiler>
              </Grid.Col>
            </Grid>
          );
      })}
    </Stack>
  );
}

function DisplayQueryCards({
  componentQueryData,
  fileUploadsData = [],
  groupByRadioData,
  groupBySelection,
  groupedByQueryResponseData,
  queryValuesArray,
  deleteFormIdDispatch,
  deleteResourceKindDispatch,
  isLoading,
  openDeleteAcknowledge,
  openFileUploads,
  requestStatusDispatch,
  setFileUploadsForAFormDispatch,
  loadingMessage = "Please wait...loading data",
  style = {},
}: DisplayQueryCardsProps) {
  const [displayQueryCardsState, displayQueryCardsDispatch] = useReducer(
    displayQueryCardsReducer,
    initialDisplayQueryCardsState,
  );

  const {
    globalState: { width, themeObject },
  } = useGlobalState();

  const [
    openedUpdateRequestStatusModal,
    {
      open: openUpdateRequestStatusModal,
      close: closeUpdateRequestStatusModal,
    },
  ] = useDisclosure(false);

  // for repair note fields update only
  const [
    openedEditRepairTicketsModal,
    { open: openEditRepairTicketsModal, close: closeEditRepairTicketsModal },
  ] = useDisclosure(false);

  const [
    openedProfileInfoModal,
    { open: openProfileInfoModal, close: closeProfileInfoModal },
  ] = useDisclosure(false);

  const {
    generalColors: { themeColorShade },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const {
    currentDocumentId,
    currentRequestStatus,
    customerDocument,
    editRepairTicketInput,
    employeeDocument,
  } = displayQueryCardsState;

  useEffect(() => {
    logState({
      state: displayQueryCardsState,
      groupLabel: "DisplayQueryCards",
    });
  }, [displayQueryCardsState]);

  const {
    isAnonymousRequestsSectionInView,
    isCustomerSectionInView,
    isExpenseClaimSectionInView,
    isFileUploadsSectionInView,
    isProductCategorySectionInView,
    isProductReviewSectionInView,
    isPurchaseSectionInView,
    isRMASectionInView,
    isRepairTicketSectionInView,
  } = returnWhichResourceInView(groupedByQueryResponseData);

  const displayQueryCards = Array.from(groupedByQueryResponseData).map(
    (responseDataTuple) => {
      const [groupedFieldTerm, responseData] = responseDataTuple;

      const queryResponseObjsWithAddedFields = responseData.map((obj) =>
        addFieldsToQueryResponseObject({
          isAnonymousRequestsSectionInView,
          isCustomerSectionInView,
          isExpenseClaimSectionInView,
          isFileUploadsSectionInView,
          isProductCategorySectionInView,
          isProductReviewSectionInView,
          isPurchaseSectionInView,
          isRMASectionInView,
          isRepairTicketSectionInView,
          queryResponseObj: obj,
        })
      );

      const queryCards = queryResponseObjsWithAddedFields.map((document) => {
        const queryCard = (
          <Stack>
            <Space h="xl" />
            <Card key={document._id} withBorder radius="md">
              <Title order={4}>
                {document.username ??
                  document.name ??
                  document._id ??
                  document.email ??
                  document.title ??
                  "No Title"}
              </Title>
              <Space h="xl" />
              <Space h="xl" />
              <Entry
                deleteFormIdDispatch={deleteFormIdDispatch}
                deleteResourceKindDispatch={deleteResourceKindDispatch}
                documentSectionInView={{
                  isAnonymousRequestsSectionInView,
                  isProductCategorySectionInView,
                  isPurchaseSectionInView,
                  isRMASectionInView,
                  isRepairTicketSectionInView,
                  isCustomerSectionInView,
                  isProductReviewSectionInView,
                }}
                fileUploadsData={fileUploadsData}
                obj={document}
                openDeleteAcknowledge={openDeleteAcknowledge}
                openFileUploads={openFileUploads}
                openProfileInfoModal={openProfileInfoModal}
                openUpdateRequestStatusModal={openUpdateRequestStatusModal}
                openEditRepairTicketsModal={openEditRepairTicketsModal}
                queryValuesArray={queryValuesArray}
                setCurrentDocumentIdDispatch={displayQueryCardsDispatch}
                setCurrentRequestStatusDispatch={displayQueryCardsDispatch}
                setCustomerDocumentDispatch={displayQueryCardsDispatch}
                setEditRepairTicketInputDispatch={displayQueryCardsDispatch}
                setEmployeeDocumentDispatch={displayQueryCardsDispatch}
                setFileUploadsForAFormDispatch={setFileUploadsForAFormDispatch}
              />
            </Card>
          </Stack>
        );

        return queryCard;
      });

      const titledGroupedFieldTerm = `${
        groupedFieldTerm
          .toString()
          .charAt(0)
          .toUpperCase()
      }${groupedFieldTerm.toString().slice(1)}`;

      return (
        <Accordion w="100%">
          <Accordion.Item value={titledGroupedFieldTerm}>
            <Accordion.Control>
              <Title order={3}>{titledGroupedFieldTerm}</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack w="100%">{queryCards}</Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      );
    },
  );

  // StepperWrapper width plus extra paddingX
  const modalSize =
    // this component is only displayed on mobile (<= 1024)
    width < 480 // for iPhone 5/SE
      ? 375 - 20
      : width < 768 // for iPhone 6/7/8
      ? width * 0.9
      // at 768vw the navbar appears at width of 225px
      : (width - 225) * 0.9;

  const displayEditRepairTicketModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedEditRepairTicketsModal}
      onClose={closeEditRepairTicketsModal}
      size={modalSize}
    >
      <EditRepairTicket
        editRepairTicketInput={editRepairTicketInput}
        parentComponentCallbacks={[closeEditRepairTicketsModal]}
      />
    </Modal>
  );

  const selectedDocument = Array.from(groupedByQueryResponseData)
    .flatMap(([, queryResponseObjArrays]) => queryResponseObjArrays)
    .find((queryResponseObj) => queryResponseObj._id === currentDocumentId) ||
    {};

  const displayUpdateRequestStatusModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedUpdateRequestStatusModal}
      onClose={closeUpdateRequestStatusModal}
      size={modalSize}
      title={
        <Text size="xl" weight={500}>
          Update Request Status
        </Text>
      }
    >
      <UpdateRequestStatus
        closeUpdateRequestStatusModal={closeUpdateRequestStatusModal}
        currentRequestStatus={currentRequestStatus}
        document={selectedDocument}
        groupBySelection={groupBySelection}
        parentComponentDispatch={requestStatusDispatch}
        queryValuesArray={queryValuesArray}
      />
    </Modal>
  );

  const displayProfileInfoModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedProfileInfoModal}
      onClose={() => {
        closeProfileInfoModal();
      }}
      size={modalSize}
      title={
        <Text size="xl" weight={500}>
          Profile information
        </Text>
      }
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <ProfileInfo
        userDocument={isProductReviewSectionInView || isPurchaseSectionInView ||
            isRMASectionInView
          ? customerDocument
          : employeeDocument}
      />
    </Modal>
  );

  const displayLoadingOverlay = (
    <LoadingOverlay
      visible={isLoading}
      zIndex={2}
      overlayBlur={9}
      overlayOpacity={0.99}
      radius={4}
      loader={
        <Stack align="center">
          <Text>{loadingMessage}</Text>
          <Loader />
        </Stack>
      }
    />
  );

  return (
    <Stack w="100%">
      {displayEditRepairTicketModal}
      {displayUpdateRequestStatusModal}
      {displayProfileInfoModal}
      {displayLoadingOverlay}
      {displayQueryCards}
    </Stack>
  );
}

export default DisplayQueryCards;
