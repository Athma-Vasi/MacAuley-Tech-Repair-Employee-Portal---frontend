import { Pagination, Stack, Text } from "@mantine/core";
import { resourceReducer } from "./reducers";
import { initialResourceState } from "./state";
import React from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useFetchInterceptor } from "../../hooks/useFetchInterceptor";
import { useAuth } from "../../hooks";
import { ResourceAction, resourceAction } from "./actions";
import { PageNavigation } from "../pageNavigation/PageNavigation";
import { fetchResourceGET, urlBuilder } from "../../utils";
import {
  ErrorLogSchema,
  GetQueriedResourceRequestServerResponse,
  RoleResourceRoutePaths,
  UserRole,
} from "../../types";

type ResourceProps = {
  resourceName: string;
  roleResourceRoutePaths: RoleResourceRoutePaths;
};

function Resource({ resourceName, roleResourceRoutePaths }: ResourceProps) {
  const [resourceState, resourceDispatch] = React.useReducer(
    resourceReducer,
    initialResourceState
  );

  const {
    currentPage,
    isError,
    isLoading,
    isSubmitting,
    isSuccessful,
    limitPerPage,
    newQueryFlag,
    totalPages,
    queryString,
    totalDocuments,
  } = resourceState;

  const {
    authState: { sessionId, userId, username },
  } = useAuth();
  const { fetchInterceptor } = useFetchInterceptor();
  const { showBoundary } = useErrorBoundary();

  const fetchAbortControllerRef = React.useRef<AbortController | null>(null);
  const preFetchAbortControllerRef = React.useRef<AbortController | null>(null);
  const isComponentMountedRef = React.useRef(false);

  React.useEffect(() => {
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    preFetchAbortControllerRef.current?.abort();
    preFetchAbortControllerRef.current = new AbortController();
    const preFetchAbortController = preFetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    let isComponentMounted = isComponentMountedRef.current;

    fetchResourceGET({
      fetchAbortController,
      fetchInterceptor,
      isComponentMounted,
      loadingMessage: `Loading ${resourceName} page ${currentPage}`,
      parentDispatch: resourceDispatch,
      preFetchAbortController,
      roleResourceRoutePaths,
      sessionId,
      setResourceDataAction: resourceAction.setResourceData,
      setIsLoadingAction: resourceAction.setIsLoading,
      setTotalDocumentsAction: resourceAction.setTotalDocuments,
      setLoadingMessageAction: resourceAction.setLoadingMessage,
      setTotalPagesAction: resourceAction.setTotalPages,
      showBoundary,
      userId,
      username,
      userRole: "manager",
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

  const pageNavigation = (
    <PageNavigation
      limitPerPage={limitPerPage}
      parentDispatch={resourceDispatch}
      totalPages={totalPages}
      validValueAction={resourceAction.setCurrentPage}
    />
  );

  return (
    <Stack w={700}>
      <Text>Resource</Text>
      {pageNavigation}
    </Stack>
  );
}

export default Resource;
