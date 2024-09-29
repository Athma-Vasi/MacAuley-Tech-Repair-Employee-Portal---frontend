import { Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { useErrorBoundary } from "react-error-boundary";

import { useAuth } from "../../hooks";
import type { RoleResourceRoutePaths, StepperPage } from "../../types";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { GoldenGrid } from "../accessibleInputs/GoldenGrid";
import { returnEventStepperPages } from "../event/constants";
import { PageNavigation } from "../pageNavigation/PageNavigation";
import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";
import { LEAVE_REQUEST_RESOURCE_DATA } from "./TEMPDATA";
import { resourceAction } from "./actions";
import { resourceReducer } from "./reducers";
import { initialResourceState } from "./state";
import { createEditDocumentInput } from "./utils";

type ResourceProps = {
  resourceName: string;
  roleResourceRoutePaths: RoleResourceRoutePaths;
  stepperPages: Array<StepperPage>;
};

function Resource() {
  const [resourceState, resourceDispatch] = React.useReducer(
    resourceReducer,
    initialResourceState,
  );

  const {
    currentPage,
    editFieldValue,
    editFieldValues,
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
    authState: {
      accessToken,
      decodedToken: { sessionId, userInfo: { userId, username, roles } },
    },
  } = useAuth();

  const { showBoundary } = useErrorBoundary();

  const isComponentMountedRef = React.useRef(false);
  const fetchAbortControllerRef = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

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
      isComponentMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Text>{loadingMessage}</Text>;
  }

  if (isError) {
    return <Text>Error...</Text>;
  }

  if (isSuccessful) {
    return <Text>Success...</Text>;
  }

  if (isSubmitting) {
    return <Text>Submitting...</Text>;
  }

  const stepperPages = returnEventStepperPages();

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

  const editDocumentInput = createEditDocumentInput({
    editFieldValue,
    editFieldValues,
    resourceAction,
    resourceDispatch,
    selectedField,
    stepperPages,
  });

  const editDocumentSubmitButton = (
    <AccessibleButton
      attributes={{
        disabled: isSubmitting || pagesInError.size > 0,
        disabledScreenreaderText:
          "Please fix errors before submitting edited document",
        enabledScreenreaderText: "Click to submit edited document",
        kind: "submit",
        onClick: (
          event:
            | React.MouseEvent<HTMLButtonElement>
            | React.PointerEvent<HTMLButtonElement>,
        ) => {
          event?.preventDefault();

          fetchAbortControllerRef.current?.abort();
          fetchAbortControllerRef.current = new AbortController();
          const fetchAbortController = fetchAbortControllerRef.current;

          isComponentMountedRef.current = true;
          let isComponentMounted = isComponentMountedRef.current;

          // TODO: fetchRequestPATCHSafe({})
        },
        type: "submit",
      }}
    />
  );

  const editDocumentForm = (
    <form action="" method="patch" name="editDocumentForm">
      <Stack>
        {editDocumentInput}
        {editDocumentSubmitButton}
      </Stack>
    </form>
  );

  const documentEditModal = (
    <Modal
      centered
      opened={openedDocumentEditModal}
      onClose={() => {
        resourceDispatch({
          action: resourceAction.setEditFieldValue,
          payload: "",
        });
        resourceDispatch({
          action: resourceAction.setEditFieldValues,
          payload: [],
        });
        resourceDispatch({
          action: resourceAction.setSelectedDocument,
          payload: null,
        });
        resourceDispatch({
          action: resourceAction.setSelectedField,
          payload: "",
        });

        closeDocumentEditModal();
      }}
      title={<Text>Edit Document</Text>}
    >
      <Stack w={350}>
        {editDocumentForm}
        {Object.entries(selectedDocument ?? {}).map(([key, value], index) => (
          <GoldenGrid
            key={`${index}-${key}-${value?.toString().slice(17) ?? ""}`}
          >
            <Text>{key}</Text>
            <Text>{value?.toString() ?? ""}</Text>
          </GoldenGrid>
        ))}
      </Stack>
    </Modal>
  );

  console.group("Resource");
  console.log("resourceState", resourceState);
  console.groupEnd();

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
