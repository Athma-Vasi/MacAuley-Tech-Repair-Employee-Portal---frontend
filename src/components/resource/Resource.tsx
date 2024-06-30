import { Text } from "@mantine/core";
import { ResourceProps } from "./types";
import { resourceReducer } from "./reducers";
import { initialResourceState } from "./state";
import React from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useFetchInterceptor } from "../../hooks/useFetchInterceptor";
import { useAuth } from "../../hooks";
import { resourceAction } from "./actions";

function Resource({
  createResourceLink,
  resourceName,
  roleResourceRoutePaths,
  stepperPages,
}: ResourceProps) {
  const [resourceState, resourceDispatch] = React.useReducer(
    resourceReducer,
    initialResourceState
  );

  const {
    isError,
    isLoading,
    isSubmitting,
    isSuccessful,
    newQueryFlag,
    paginationsAmount,
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

    async function fetchResourceGET() {
      try {
      } catch (error: any) {
        if (!isComponentMounted) {
          return;
        }

        showBoundary(error);
      }
    }

    return () => {
      fetchAbortController.abort();
      preFetchAbortController.abort();
      isComponentMountedRef.current = false;
    };
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return <Text>Resource</Text>;
}
