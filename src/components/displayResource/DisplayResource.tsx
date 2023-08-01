import { Flex } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { useAuth, useGlobalState } from '../../hooks';
import {
  FileUploadDocument,
  GetQueriedResourceRequestServerResponse,
  QueryResponseData,
  ResourceRequestServerResponse,
} from '../../types';
import { logState, splitCamelCase, urlBuilder } from '../../utils';
import { DisplayQuery } from '../displayQuery';
import { PageBuilder } from '../pageBuilder';
import { QueryBuilder } from '../queryBuilder';
import { displayResourceAction, displayResourceReducer } from './state';
import {
  DisplayResourceProps,
  DisplayResourceState,
  UpdateRequestStatusInput,
} from './types';
import { DisplayFileUploads } from '../displayFileUploads';

function DisplayResource<Doc>({
  style = {},
  componentQueryData,
  isDisplayFilesOnly = false,
  fileUploadFieldName = 'fileUploads',
  isFileUploadsWithResource = false,
  requestBodyHeading,
  paths,
}: DisplayResourceProps<Doc>) {
  const initialDisplayResourceState: DisplayResourceState<Doc> = {
    resourceData: [],
    pages: 0,
    totalDocuments: 0,

    newQueryFlag: true,
    queryBuilderString: '?',
    pageQueryString: '',

    fileUploads: [],

    requestStatus: {
      id: '',
      status: 'pending',
    },
    deleteForm: {
      id: '',
      value: false,
    },
    triggerRefresh: false,

    isError: false,
    errorMessage: '',
    isSubmitting: false,
    submitMessage: '',
    isSuccessful: false,
    successMessage: '',
    isLoading: false,
    loadingMessage: '',
  };

  const [displayResourceState, displayResourceDispatch] = useReducer(
    displayResourceReducer,
    initialDisplayResourceState as DisplayResourceState<Doc>
  );
  const {
    resourceData,
    pages,
    totalDocuments,
    newQueryFlag,
    queryBuilderString,
    pageQueryString,

    requestStatus,
    fileUploads,
    deleteForm,
    triggerRefresh,

    isError,
    errorMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = displayResourceState;

  const {
    globalState: { padding, rowGap },
  } = useGlobalState();
  const {
    authState: { accessToken, roles },
  } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchResource() {
      // employees can view their own resources only
      const path =
        roles.includes('Admin') || roles.includes('Manager')
          ? paths.manager
          : paths.employee;

      const urlString: URL = urlBuilder({
        path,
        query: `${queryBuilderString}${pageQueryString}&newQueryFlag=${newQueryFlag}&totalDocuments=${totalDocuments}`,
      });

      const request: Request = new Request(urlString, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
      });

      try {
        const response = await fetch(request);
        const data: GetQueriedResourceRequestServerResponse<Doc> =
          await response.json();
        console.log('response json data', data);
        const { message, pages, resourceData, totalDocuments } = data;

        // if there are file uploads, split the data into two arrays
        // one for the resource data and the other for the file uploads
        if (isFileUploadsWithResource && fileUploadFieldName) {
          const [resourceDataWithoutFileUploadsArr, fileUploadsArr] =
            resourceData.reduce(
              (
                acc: [QueryResponseData<Doc>[], FileUploadDocument[]],
                currObj: QueryResponseData<Doc>
              ) => {
                // reduce over the object entries of the current resource data
                // to separate the file uploads from the rest of the data
                const [fileUploadsObj, resourceDataWithoutFileUploadsObj] =
                  Object.entries(currObj).reduce(
                    (
                      objTuples: [FileUploadDocument, QueryResponseData<Doc>],
                      [key, value]
                    ) => {
                      if (key === fileUploadFieldName) {
                        Object.defineProperty(objTuples[0], key, {
                          value: structuredClone(value),
                          enumerable: true,
                        });
                      } else {
                        Object.defineProperty(objTuples[1], key, {
                          value: structuredClone(value),
                          enumerable: true,
                        });
                      }

                      return objTuples;
                    },
                    [Object.create(null), Object.create(null)]
                  );

                acc[0].push(resourceDataWithoutFileUploadsObj);
                acc[1].push(fileUploadsObj);

                return acc;
              },
              [[], []]
            );

          displayResourceDispatch({
            type: displayResourceAction.setResourceData,
            payload: resourceDataWithoutFileUploadsArr,
          });
          displayResourceDispatch({
            type: displayResourceAction.setFileUploads,
            payload: fileUploadsArr,
          });
        }
        // if there are no file uploads, set the resource data as is
        else {
          displayResourceDispatch({
            type: displayResourceAction.setResourceData,
            payload: resourceData,
          });
        }

        displayResourceDispatch({
          type: displayResourceAction.setPages,
          payload: pages ?? pages,
        });
        displayResourceDispatch({
          type: displayResourceAction.setTotalDocuments,
          payload: totalDocuments,
        });
      } catch (error) {
        console.log(error);
      } finally {
        console.log('finally');
      }
    }

    fetchResource();

    return () => {
      controller.abort();
    };
  }, [newQueryFlag, queryBuilderString, pageQueryString, triggerRefresh]);

  // backend is set to trigger countDocuments scan on a new query only, not on page changes
  useEffect(() => {
    displayResourceDispatch({
      type: displayResourceAction.setNewQueryFlag,
      payload: true,
    });
  }, [queryBuilderString]);
  // set new query flag to false on page changes
  useEffect(() => {
    displayResourceDispatch({
      type: displayResourceAction.setNewQueryFlag,
      payload: false,
    });
  }, [pageQueryString]);

  // submit request status form on change
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function updateRequestStatus({
      accessToken,
      paths,
      requestStatus: { id, status },
      requestBodyHeading,
      signal,
    }: UpdateRequestStatusInput) {
      const urlString: URL = urlBuilder({
        path: `${paths.manager}/${id}`,
      });

      const resourceBody = Object.create(null);
      Object.defineProperty(resourceBody, requestBodyHeading, {
        value: {
          requestStatus: status,
        },
        writable: true,
        enumerable: true,
        configurable: true,
      });
      const body = JSON.stringify(resourceBody);

      const request: Request = new Request(urlString, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
        body,
      });

      try {
        const response = await fetch(request);
        const data: ResourceRequestServerResponse<Doc> = await response.json();
        console.log('request status update response', data);
        // trigger component refresh
        displayResourceDispatch({
          type: displayResourceAction.setTriggerRefresh,
          payload: !triggerRefresh,
        });
      } catch (error) {
        console.log(error);
      } finally {
        console.log('finally');
      }
    }

    // only allow Admin and Manager to update request status
    if (roles.includes('Manager')) {
      if (requestStatus.id !== '') {
        updateRequestStatus({
          accessToken,
          requestStatus,
          paths,
          requestBodyHeading,
          signal,
        });
      }
    }

    return () => {
      controller.abort();
    };
  }, [requestStatus]);

  // delete form on deleteForm status change
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function deleteResource() {
      const urlString: URL = urlBuilder({
        path: `${paths.manager}/${deleteForm.id}`,
      });

      const request: Request = new Request(urlString, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
      });

      try {
        const response = await fetch(request);
        const data: ResourceRequestServerResponse<Doc> = await response.json();
        console.log('delete response', data);
        // trigger component refresh
        displayResourceDispatch({
          type: displayResourceAction.setTriggerRefresh,
          payload: !triggerRefresh,
        });
      } catch (error) {
        console.log(error);
      } finally {
        console.log('finally');
      }
    }

    // only allow Managers to delete forms
    if (roles.includes('Manager')) {
      if (deleteForm.id !== '' && deleteForm.value === true) {
        deleteResource();
      }
    }

    return () => {
      controller.abort();
    };
  }, [deleteForm]);

  useEffect(() => {
    logState({
      state: displayResourceState,
      groupLabel: 'displayResourceState',
    });
  }, [displayResourceState]);

  // prevent display of option to groupBy/projection exclusion of username field if the resource is anonymousRequest
  const filteredComponentQueryData =
    requestBodyHeading === 'anonymousRequest'
      ? componentQueryData.filter((obj) => obj.value !== 'username')
      : componentQueryData;

  const displayResource = isDisplayFilesOnly ? (
    <DisplayFileUploads
      fileUploadsData={fileUploads}
      componentQueryData={filteredComponentQueryData}
      parentComponentName={splitCamelCase(requestBodyHeading)}
      parentDeleteFormDispatch={displayResourceDispatch}
      totalDocuments={totalDocuments}
    />
  ) : (
    <DisplayQuery
      componentQueryData={filteredComponentQueryData}
      fileUploadsData={fileUploads}
      parentComponentName={splitCamelCase(requestBodyHeading)}
      parentRequestStatusDispatch={displayResourceDispatch}
      parentDeleteFormDispatch={displayResourceDispatch}
      queryResponseData={resourceData}
      totalDocuments={totalDocuments}
    />
  );

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      w="100%"
      h="100%"
      style={{
        ...style,
        backgroundColor: '#fff',
        borderRadius: 4,
      }}
      p={padding}
      rowGap={rowGap}
    >
      <QueryBuilder
        setQueryBuilderString={displayResourceAction.setQueryBuilderString}
        parentComponentDispatch={displayResourceDispatch}
        componentQueryData={filteredComponentQueryData}
        collectionName={splitCamelCase(requestBodyHeading)}
      />

      {displayResource}
      <PageBuilder
        total={pages}
        setPageQueryString={displayResourceAction.setPageQueryString}
        parentComponentDispatch={displayResourceDispatch}
      />
    </Flex>
  );
}

export { DisplayResource };
