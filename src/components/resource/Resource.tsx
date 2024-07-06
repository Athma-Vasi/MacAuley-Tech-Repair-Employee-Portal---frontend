import { Modal, Pagination, Stack, Text, Textarea } from "@mantine/core";
import { resourceReducer } from "./reducers";
import { initialResourceState } from "./state";
import React from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useFetchInterceptor } from "../../hooks/useFetchInterceptor";
import { useAuth } from "../../hooks";
import { ResourceAction, resourceAction } from "./actions";
import { PageNavigation } from "../pageNavigation/PageNavigation";
import { fetchResourceGET, logState, splitCamelCase, urlBuilder } from "../../utils";
import {
  CheckboxRadioSelectData,
  ErrorLogSchema,
  GetQueriedResourceRequestServerResponse,
  InputType,
  RoleResourceRoutePaths,
  StepperPage,
  UserRole,
  ValidationFunctionsTable,
} from "../../types";
import { Desktop } from "./Desktop";
import { LEAVE_REQUEST_RESOURCE_DATA } from "./TEMPDATA";
import { Mobile } from "./Mobile";
import { useDisclosure } from "@mantine/hooks";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { GoldenGrid } from "../accessibleInputs/GoldenGrid";
import { AccessibleTextAreaInput } from "../accessibleInputs/AccessibleTextAreaInput";
import { VALIDATION_FUNCTIONS_TABLE, ValidationKey } from "../../constants/validations";
import { returnBenefitStepperPages } from "../benefit/constants";
import { returnLeaveRequestStepperPages } from "../leaveRequest/constants";
import { InputsValidationsMap } from "../query/utils";
import { addSelectedFieldValidation, createResourceInputsData } from "./utils";

type ResourceProps = {
  resourceName: string;
  roleResourceRoutePaths: RoleResourceRoutePaths;
  stepperPages: Array<StepperPage>;
};

function Resource() {
  const [resourceState, resourceDispatch] = React.useReducer(
    resourceReducer,
    initialResourceState
  );

  const {
    currentPage,
    editFieldValue,
    isError,
    isLoading,
    isSubmitting,
    isSuccessful,
    limitPerPage,
    loadingMessage,
    newQueryFlag,
    pagesInError,
    queryString,
    resourceData,
    selectedDocument,
    selectedField,
    sortField,
    sortFieldDirection,
    sortDirection,
    totalDocuments,
    totalPages,
  } = resourceState;

  const [
    openedDocumentEditModal,
    { open: openDocumentEditModal, close: closeDocumentEditModal },
  ] = useDisclosure(false);

  const {
    authState: { sessionId, userId, username },
  } = useAuth();
  const { fetchInterceptor } = useFetchInterceptor();
  const { showBoundary } = useErrorBoundary();

  const isComponentMountedRef = React.useRef(false);
  const fetchAbortControllerRef = React.useRef<AbortController | null>(null);
  const preFetchAbortControllerRef = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    preFetchAbortControllerRef.current?.abort();
    preFetchAbortControllerRef.current = new AbortController();
    const preFetchAbortController = preFetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    let isComponentMounted = isComponentMountedRef.current;

    // fetchResourceGET({
    //   fetchAbortController,
    //   fetchInterceptor,
    //   isComponentMounted,
    //   loadingMessage: `Loading ${resourceName} page ${currentPage}`,
    //   parentDispatch: resourceDispatch,
    //   preFetchAbortController,
    //   roleResourceRoutePaths,
    //   sessionId,
    //   setResourceDataAction: resourceAction.setResourceData,
    //   setIsLoadingAction: resourceAction.setIsLoading,
    //   setTotalDocumentsAction: resourceAction.setTotalDocuments,
    //   setLoadingMessageAction: resourceAction.setLoadingMessage,
    //   setTotalPagesAction: resourceAction.setTotalPages,
    //   showBoundary,
    //   userId,
    //   username,
    //   userRole: "manager",
    // });

    resourceDispatch({
      action: resourceAction.setResourceData,
      payload: LEAVE_REQUEST_RESOURCE_DATA.resourceData,
    });

    return () => {
      fetchAbortController.abort();
      preFetchAbortController.abort();
      isComponentMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const stepperPages = returnLeaveRequestStepperPages();

  console.log(`Resource.tsx stepperPages: ${JSON.stringify(stepperPages)}`);

  const {
    checkboxInputsSet,
    dateInputsSet,
    inputsValidationsMap,
    selectInputsDataMap,
    selectInputsSet,
    textInputsSet,
  } = createResourceInputsData(stepperPages);

  const pageNavigation = (
    <PageNavigation
      limitPerPage={limitPerPage}
      parentDispatch={resourceDispatch}
      totalPages={totalPages}
      validValueAction={resourceAction.setCurrentPage}
    />
  );

  const desktop = (
    <Desktop
      openDocumentEditModal={openDocumentEditModal}
      resourceData={resourceData}
      resourceDispatch={resourceDispatch}
    />
  );

  const mobile = (
    <Mobile
      openDocumentEditModal={openDocumentEditModal}
      resourceData={resourceData}
      resourceDispatch={resourceDispatch}
      sortDirection={sortDirection}
      sortField={sortField}
    />
  );

  function createEditDocumentInput({}: { selectedField: string }) {}

  const editDocumentTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: resourceAction.setPageInError,
        name: "editFieldValue",
        parentDispatch: resourceDispatch,
        stepperPages,
        validationFunctionsTable: addSelectedFieldValidation(
          inputsValidationsMap,
          selectedField,
          VALIDATION_FUNCTIONS_TABLE
        ),
        validValueAction: resourceAction.setEditFieldValue,
        value: editFieldValue,
      }}
    />
  );

  const editDocumentSubmitButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Click to submit edited document",
        kind: "submit",
        onClick: (
          event:
            | React.MouseEvent<HTMLButtonElement>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          // console.log(`Edit Document Submit Button clicked: ${editFieldValue}`);
          event?.preventDefault();
        },
        type: "submit",
      }}
    />
  );

  const editDocumentForm = (
    <form action="" method="patch">
      <Stack>
        {editDocumentTextAreaInput}
        {editDocumentSubmitButton}
      </Stack>
    </form>
  );

  const documentEditModal = (
    <Modal
      centered
      opened={openedDocumentEditModal}
      onClose={closeDocumentEditModal}
      title={<Text>Edit Document</Text>}
    >
      <Stack>
        {editDocumentForm}
        {Object.entries(selectedDocument ?? {}).map(([key, value], index) => (
          <GoldenGrid key={`${index}-${key}-${value?.toString().slice(17) ?? ""}`}>
            <Text>{key}</Text>
            <Text>{value?.toString() ?? ""}</Text>
          </GoldenGrid>
        ))}
      </Stack>
    </Modal>
  );

  logState({
    state: resourceState,
    groupLabel: "Resource",
  });

  return (
    <Stack w={700}>
      <Text>Resource</Text>
      {documentEditModal}
      {pageNavigation}
      {desktop}
      {mobile}
    </Stack>
  );
}

export default Resource;
