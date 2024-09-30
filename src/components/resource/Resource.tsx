import React, { useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { Card, Stack, Text } from "@mantine/core";
import { COLORS_SWATCHES } from "../../constants/data";
import { useAuth, useGlobalState } from "../../hooks";
import type { RoleResourceRoutePaths, StepperPage } from "../../types";
import { logState, returnThemeColors, splitCamelCase } from "../../utils";
import { GoldenGrid } from "../accessibleInputs/GoldenGrid";
import { PageNavigation } from "../pageNavigation/PageNavigation";
import { resourceAction } from "./actions";
import { resourceReducer } from "./reducers";
import { initialResourceState } from "./state";

type ResourceProps = {
  resourceName: string;
  responseDocs: Array<Record<string, unknown>>;
  roleResourceRoutePaths: RoleResourceRoutePaths;
  stepperPages: Array<StepperPage>;
};

function Resource(
  {
    responseDocs,
    resourceName,
    roleResourceRoutePaths,
    stepperPages,
  }: ResourceProps,
) {
  const [resourceState, resourceDispatch] = React.useReducer(
    resourceReducer,
    initialResourceState,
  );

  const {
    currentPage,
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
    sortDirection,
    totalDocuments,
    totalPages,
  } = resourceState;

  const {
    authState: {
      accessToken,
      decodedToken: { sessionId, userInfo: { userId, username, roles } },
    },
  } = useAuth();

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    resourceDispatch({
      action: resourceAction.setNewQueryFlag,
      payload: true,
    });
  }, [queryString]);

  const isComponentMountedRef = React.useRef(false);
  const fetchAbortControllerRef = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    const isComponentMounted = isComponentMountedRef.current;

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

    return () => {
      fetchAbortController.abort();
      isComponentMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  logState({
    state: resourceState,
    groupLabel: "Resource State",
  });

  return (
    <Stack>
      <Text>Resource</Text>

      <DisplayResource
        actionString={resourceAction.setSelectedDocument}
        parentDispatch={resourceDispatch}
        resourceData={responseDocs}
        selectedDocumentId={selectedDocument?._id}
      />
    </Stack>
  );
}

function Entry(
  { index, field, style = {}, uniqueId, value }: {
    index: number;
    field: string;
    style?: React.CSSProperties;
    uniqueId: string;
    value: React.ReactNode;
  },
) {
  return (
    <GoldenGrid
      key={uniqueId}
      style={{
        ...style,
        backgroundColor: index % 2 === 0 ? "transparent" : "silver",
      }}
    >
      <Text>
        {splitCamelCase(field)}
      </Text>
      <Text>{value}</Text>
    </GoldenGrid>
  );
}

function displayCard<
  Action extends string = string,
  Payload extends string = string,
  D = { action: Action; payload: Payload },
>(
  action: string,
  document: Record<string, unknown>,
  parentDispatch: React.Dispatch<D>,
  selectedDocumentId?: string,
  themeColorShade?: string,
) {
  const docElement = Object.entries(document).map(([key, value], keyIndex) => {
    // primitive value
    if (
      !Array.isArray(value) && typeof value !== "object" &&
      value !== null && value !== undefined
    ) {
      return (
        <Entry
          index={keyIndex}
          field={key}
          uniqueId={`${keyIndex}-${key}`}
          value={value.toString() ?? ""}
        />
      );
    }

    // array value
    if (Array.isArray(value)) {
      const valueElements = value.map((item, itemIndex) => {
        return (
          <Text key={`${item.toString()}-${itemIndex.toString()}`}>
            {item.toString() ?? ""}
          </Text>
        );
      });

      return (
        <Entry
          index={keyIndex}
          field={key}
          uniqueId={`${keyIndex}-${key}`}
          value={valueElements}
        />
      );
    }

    // object value
    if (typeof value === "object" && value !== null) {
      return (
        <Stack>
          {Object.entries(value).map(([subKey, subValue], subKeyIndex) => {
            return (
              <Entry
                key={`${subKeyIndex}-${subKey}`}
                index={subKeyIndex}
                field={subKey}
                style={{ paddingTop: subKeyIndex === 0 ? 8 : 0 }}
                uniqueId={`${keyIndex.toString()}-${subKeyIndex.toString()}${key}-${subKey}`}
                value={subValue.toString() ?? ""}
              />
            );
          })}
        </Stack>
      );
    }
  });

  const card = (
    <Card
      shadow="sm"
      onClick={() => parentDispatch({ action, payload: document } as D)}
      radius="md"
      style={{
        cursor: selectedDocumentId && selectedDocumentId === document._id
          ? "default"
          : "pointer",
        border: selectedDocumentId && selectedDocumentId === document._id
          ? `2px solid ${themeColorShade}`
          : "2px solid transparent",
      }}
      withBorder
    >
      {docElement}
    </Card>
  );

  return card;
}

function DisplayResource<
  Action extends string = string,
  Payload extends string = string,
  D = { action: Action; payload: Payload },
>(
  { actionString, parentDispatch, resourceData, selectedDocumentId }: {
    actionString: string;
    resourceData: Array<Record<string, unknown>>;
    parentDispatch: React.Dispatch<D>;
    selectedDocumentId?: string;
  },
) {
  const { globalState: { themeObject } } = useGlobalState();
  const { generalColors: { themeColorShade } } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  return (
    <Stack>
      {resourceData.map((data, index) => {
        return (
          <Stack key={index.toString()}>
            {displayCard(
              actionString,
              data,
              parentDispatch,
              selectedDocumentId,
              themeColorShade,
            )}
          </Stack>
        );
      })}
    </Stack>
  );
}

export default Resource;
