import { Flex } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { useAuth, useGlobalState } from '../../hooks';
import {
  FileUploadDocument,
  GetQueriedResourceRequestServerResponse,
  QueryResponseData,
  ResourceRequestServerResponse,
} from '../../types';
import {
  addFieldsToObject,
  filterFieldsFromObject,
  logState,
  splitCamelCase,
  urlBuilder,
} from '../../utils';
import { DisplayFileUploads } from '../displayFileUploads';
import { DisplayQuery } from '../displayQuery';
import { PageBuilder } from '../pageBuilder';
import { QueryBuilder } from '../queryBuilder';
import { displayResourceAction, displayResourceReducer } from './state';
import {
  DisplayResourceProps,
  DisplayResourceState,
  UpdateRequestStatusInput,
} from './types';

function DisplayResource<Doc>({
  style = {},
  componentQueryData,
  isDisplayFilesOnly = false,
  fileUploadFieldName = 'fileUploads',
  fileUploadIdFieldName = 'uploadedFilesIds',
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

    deleteResource: {
      formId: '',
      fileUploadId: undefined,
      kind: '',
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

    fileUploads,
    requestStatus,
    deleteResource,
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

        // if there are file uploads, split the data into two arrays
        // one for the resource data and the other for the file uploads
        if (isFileUploadsWithResource && fileUploadFieldName) {
          const [resourceDataWithoutFileUploadsArr, fileUploadsArr] =
            data.resourceData.reduce(
              (
                acc: [
                  QueryResponseData<Doc>[],
                  Array<{ [key: string]: FileUploadDocument[] }>
                ],
                currObj: QueryResponseData<Doc>
              ) => {
                // reduce over the object entries of the current resource data
                // to separate the file uploads from the rest of the data
                const [fileUploadsObj, resourceDataWithoutFileUploadsObj] =
                  Object.entries(currObj).reduce(
                    (
                      objTuples: [
                        { fileUploads: FileUploadDocument[] },
                        QueryResponseData<Doc>
                      ],
                      [key, value]
                    ) => {
                      key === fileUploadFieldName
                        ? // ? Object.defineProperty(objTuples[0], key, {
                          //     value: structuredClone(value),
                          //     enumerable: true,
                          //   })
                          addFieldsToObject({
                            object: objTuples[0],
                            fieldValuesTuples: [[key, structuredClone(value)]],
                          })
                        : // : Object.defineProperty(objTuples[1], key, {
                          //     value: structuredClone(value),
                          //     enumerable: true,
                          //   });
                          addFieldsToObject({
                            object: objTuples[1],
                            fieldValuesTuples: [[key, structuredClone(value)]],
                          });

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
            payload: data.resourceData,
          });
        }

        displayResourceDispatch({
          type: displayResourceAction.setPages,
          payload: data.pages ?? pages,
        });
        displayResourceDispatch({
          type: displayResourceAction.setTotalDocuments,
          payload: data.totalDocuments ?? totalDocuments,
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
      // Object.defineProperty(resourceBody, requestBodyHeading, {
      //   value: {
      //     requestStatus: status,
      //   },
      //   writable: true,
      //   enumerable: true,
      //   configurable: true,
      // });
      addFieldsToObject({
        object: resourceBody,
        fieldValuesTuples: [[requestBodyHeading, { requestStatus: status }]],
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

  // delete resource on deleteResource status change
  // ALSO MAKE A PUT REQUEST WITH MODIFIED FORM DATA
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const { formId, fileUploadId, kind, value } = deleteResource;

    async function deleteResourceRequest() {
      const path =
        kind === 'form'
          ? `${paths.manager}/${formId}`
          : `/api/v1/file-upload/${fileUploadId}`;
      const urlString: URL = urlBuilder({ path });

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
        const data: { message: string; resourceData?: [] } =
          await response.json();
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
      if (formId.length > 0 && kind.length > 0 && value === true) {
        deleteResourceRequest();
      }
    }

    return () => {
      controller.abort();
    };
  }, [deleteResource]);

  // when an uploaded file is deleted, patch request is made to update the asociated resource
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function updateAssociatedResource() {
      // find the associated resource with the fileUploadId
      const associatedResource = resourceData.reduce(
        (acc: QueryResponseData<Doc> | null, obj) => {
          Object.entries(obj).forEach(([key, value]) => {
            // if the resource obj has the file upload ids field
            if (key === fileUploadIdFieldName) {
              // if the value is an array, check if the array includes the fileUploadId
              if (Array.isArray(value)) {
                if (value.includes(deleteResource.fileUploadId)) {
                  // remove the fileUploadId from the array
                  const filteredValue = value.filter(
                    (id) => id !== deleteResource.fileUploadId
                  );
                  // add the filtered array to the resource obj
                  const clone = structuredClone(obj);
                  addFieldsToObject({
                    object: clone,
                    fieldValuesTuples: [[key, filteredValue]],
                  });
                  acc = clone;
                }
              }
              // if the value is a string, check if the value is the fileUploadId
              else {
                if (value === deleteResource.fileUploadId) {
                  const clone = structuredClone(obj);
                  addFieldsToObject({
                    object: clone,
                    fieldValuesTuples: [[key, '']],
                  });
                  acc = clone;
                }
              }
            }
          });

          return acc;
        },
        null
      );

      // if the associated resource is not found, do not make request
      if (!associatedResource) {
        return;
      }

      const { _id } = associatedResource;
      const filteredAssociatedResource = filterFieldsFromObject({
        object: associatedResource,
        // delete was added at front end
        // fileUploads does not belong in the resource schema, and is added to response by server
        fieldsToFilter: ['delete', 'fileUploads'],
      });

      const urlString: URL = urlBuilder({
        path: `${paths.manager}/${_id}`,
      });

      const resourceBody = Object.create(null);

      addFieldsToObject({
        object: resourceBody,
        fieldValuesTuples: [[requestBodyHeading, filteredAssociatedResource]],
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
        console.log('update associated resource response', data);
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

    if (deleteResource.fileUploadId) {
      updateAssociatedResource();
    }

    return () => {
      controller.abort();
    };
  }, [deleteResource.fileUploadId]);

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
      parentDeleteResourceDispatch={displayResourceDispatch}
      totalDocuments={totalDocuments}
    />
  ) : (
    <DisplayQuery
      componentQueryData={filteredComponentQueryData}
      fileUploadsData={fileUploads}
      parentComponentName={splitCamelCase(requestBodyHeading)}
      parentRequestStatusDispatch={displayResourceDispatch}
      parentDeleteResourceDispatch={displayResourceDispatch}
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
