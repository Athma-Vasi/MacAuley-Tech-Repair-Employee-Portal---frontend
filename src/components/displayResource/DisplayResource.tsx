import {
  Flex,
  Group,
  Modal,
  Notification,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { InvalidTokenError } from 'jwt-decode';
import { ChangeEvent, useEffect, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { TbCheck } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES, PROPERTY_DESCRIPTOR } from '../../constants/data';
import { globalAction } from '../../context/globalProvider/state';
import { useAuth, useGlobalState } from '../../hooks';
import { returnAccessibleSelectInputElements } from '../../jsxCreators';
import {
  FileUploadDocument,
  GetQueriedResourceRequestServerResponse,
  QueryResponseData,
  ResourceRequestServerResponse,
} from '../../types';
import {
  filterFieldsFromObject,
  logState,
  returnThemeColors,
  splitCamelCase,
  urlBuilder,
} from '../../utils';
import { DisplayFileUploads } from '../displayFileUploads';
import { DisplayQuery } from '../displayQuery';
import { PageBuilder } from '../pageBuilder';
import { QueryBuilder } from '../queryBuilder';
import { AccessibleSelectInputCreatorInfo } from '../wrappers';
import { QUERY_LIMIT_PER_PAGE_SELECT_DATA } from './constants';
import { displayResourceAction, displayResourceReducer } from './state';
import { DisplayResourceProps, DisplayResourceState } from './types';
import { NotificationModal } from '../notificationModal';

function DisplayResource<Doc>({
  style = {},
  componentQueryData,
  createResourcePath,
  isDisplayFilesOnly = false,
  fileUploadFieldName = 'fileUploads',
  fileUploadIdFieldName = 'uploadedFilesIds',
  isFileUploadsWithResource = false,
  requestBodyHeading,
  resourceUrlPaths,
}: DisplayResourceProps<Doc>) {
  const initialDisplayResourceState: DisplayResourceState<Doc> = {
    resourceData: [],
    pages: 0,
    totalDocuments: 0,

    queryValuesArray: [],
    newQueryFlag: true,
    queryBuilderString: '?',
    pageQueryString: '',
    limitPerPage: '10',
    resetPage: false,

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
    triggerRefresh: true,
    triggerUpdateRequestStatus: false,

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
    queryValuesArray,
    newQueryFlag,
    queryBuilderString,
    pageQueryString,
    limitPerPage,
    resetPage,

    fileUploads,
    requestStatus,
    deleteResource,
    triggerRefresh,
    triggerUpdateRequestStatus,

    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = displayResourceState;

  const {
    globalState: { padding, rowGap, themeObject, width },
    globalDispatch,
  } = useGlobalState();
  const {
    authState: { accessToken, roles, isAccessTokenExpired },
  } = useAuth();

  // submit success notification modal
  const [
    openedSubmitSuccessNotificationModal,
    {
      open: openSubmitSuccessNotificationModal,
      close: closeSubmitSuccessNotificationModal,
    },
  ] = useDisclosure(false);

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchResource() {
      displayResourceDispatch({
        type: displayResourceAction.setIsLoading,
        payload: true,
      });
      const pageNumber = pageQueryString.split('=')[1] ?? '1';
      displayResourceDispatch({
        type: displayResourceAction.setLoadingMessage,
        payload: `Loading ${splitCamelCase(
          requestBodyHeading
        )}s: page ${pageNumber} ...`,
      });

      // employees can view their own resources only
      const path =
        roles.includes('Admin') || roles.includes('Manager')
          ? resourceUrlPaths.manager
          : resourceUrlPaths.employee;

      const urlString: URL = urlBuilder({
        path,
        query: `${queryBuilderString}${pageQueryString}&newQueryFlag=${newQueryFlag}&totalDocuments=${totalDocuments}&limit=${limitPerPage}&projection=-action&projection=-category`,
      });

      const request: Request = new Request(urlString, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      });

      try {
        const response = await fetch(request);
        const data: GetQueriedResourceRequestServerResponse<Doc> =
          await response.json();
        console.log('response json data', data);
        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        if (!isFileUploadsWithResource || !fileUploadFieldName) {
          // if there are no file uploads, set the resource data as is
          displayResourceDispatch({
            type: displayResourceAction.setResourceData,
            payload: data.resourceData,
          });

          // do this regardless of whether there are file uploads or not
          displayResourceDispatch({
            type: displayResourceAction.setPages,
            payload: data.pages ?? pages,
          });
          displayResourceDispatch({
            type: displayResourceAction.setTotalDocuments,
            payload: data.totalDocuments ?? totalDocuments,
          });

          return;
        }

        // if there are file uploads, split the data into two arrays
        // one for the resource data and the other for the file uploads
        const [resourceDataWithoutFileUploadsArr, fileUploadsArr] =
          data.resourceData.reduce(
            (
              splitResourceDataTupleAcc: [
                QueryResponseData<Doc>[],
                Array<Record<string, FileUploadDocument[]>>
              ],
              currObj: QueryResponseData<Doc>
            ) => {
              const [resourceDataWithoutFileUploadsArrAcc, fileUploadsArrAcc] =
                splitResourceDataTupleAcc;

              // reduce over the object entries of the current resource data
              // to separate the file uploads from the rest of the data
              const [fileUploadsObj, resourceDataWithoutFileUploadsObj] =
                Object.entries(currObj).reduce(
                  (objTuplesAcc, [docKey, docValue]) => {
                    const [
                      fileUploadsObjAcc,
                      resourceDataWithoutFileUploadsObjAcc,
                    ] = objTuplesAcc as [
                      { fileUploads: FileUploadDocument[] },
                      QueryResponseData<Doc>
                    ];

                    docKey === fileUploadFieldName
                      ? Object.defineProperty(fileUploadsObjAcc, docKey, {
                          ...PROPERTY_DESCRIPTOR,
                          value: structuredClone(docValue),
                        })
                      : Object.defineProperty(
                          resourceDataWithoutFileUploadsObjAcc,
                          docKey,
                          {
                            ...PROPERTY_DESCRIPTOR,
                            value: structuredClone(docValue),
                          }
                        );

                    return objTuplesAcc;
                  },
                  [Object.create(null), Object.create(null)]
                );

              resourceDataWithoutFileUploadsArrAcc.push(
                resourceDataWithoutFileUploadsObj
              );
              fileUploadsArrAcc.push(fileUploadsObj);

              return splitResourceDataTupleAcc;
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

        // do this regardless of whether there are file uploads or not
        displayResourceDispatch({
          type: displayResourceAction.setPages,
          payload: data.pages ?? pages,
        });
        displayResourceDispatch({
          type: displayResourceAction.setTotalDocuments,
          payload: data.totalDocuments ?? totalDocuments,
        });
      } catch (error: any) {
        if (!isMounted || error.name === 'AbortError') {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? 'Invalid token. Please login again.'
            : !error.response
            ? 'Network error. Please try again.'
            : error?.message ?? 'Unknown error occurred. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/home');

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: '',
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          displayResourceDispatch({
            type: displayResourceAction.setTriggerRefresh,
            payload: false,
          });
        }
      }
    }

    if (triggerRefresh && !isAccessTokenExpired) {
      fetchResource();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
    // only trigger fetchResource on triggerRefresh change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRefresh, isAccessTokenExpired]);

  useEffect(() => {
    displayResourceDispatch({
      type: displayResourceAction.setTriggerRefresh,
      payload: true,
    });
  }, [newQueryFlag, queryBuilderString, pageQueryString, limitPerPage]);

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

  // separate instead of inside finally block to avoid causing flicker by previous page state displaying then updating after overlay disappears
  useEffect(() => {
    displayResourceDispatch({
      type: displayResourceAction.setIsLoading,
      payload: false,
    });
    displayResourceDispatch({
      type: displayResourceAction.setLoadingMessage,
      payload: '',
    });
  }, [resourceData]);

  // submit request status form on change
  useEffect(() => {
    if (isAccessTokenExpired) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    async function updateRequestStatus() {
      displayResourceDispatch({
        type: displayResourceAction.setIsSubmitting,
        payload: true,
      });
      displayResourceDispatch({
        type: displayResourceAction.setSubmitMessage,
        payload: `Submitting request status update of id: ${requestStatus.id}to ${requestStatus.status} ...`,
      });
      openSubmitSuccessNotificationModal();

      const urlString: URL = urlBuilder({
        path: `${resourceUrlPaths.manager}/${requestStatus.id}`,
        query: `${queryBuilderString}${pageQueryString}&newQueryFlag=${newQueryFlag}&totalDocuments=${totalDocuments}&projection=-action&projection=-category`,
      });

      const resourceBody = Object.create(null);
      Object.defineProperty(resourceBody, requestBodyHeading, {
        ...PROPERTY_DESCRIPTOR,
        value: { requestStatus: requestStatus.status },
      });
      const body = JSON.stringify(resourceBody);

      const request: Request = new Request(urlString, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
        body,
      });

      try {
        const response = await fetch(request);
        const data: ResourceRequestServerResponse<Doc> = await response.json();
        console.log('request status update response', data);
        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        const [updatedResource] = data.resourceData;
        displayResourceDispatch({
          type: displayResourceAction.updateResourceData,
          payload: {
            id: updatedResource._id,
            kind: 'update',
            data: updatedResource,
          },
        });
      } catch (error: any) {
        if (!isMounted || error.name === 'AbortError') {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? 'Invalid token. Please login again.'
            : !error.response
            ? 'Network error. Please try again.'
            : error?.message ?? 'Unknown error occurred. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/home');

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: '',
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          displayResourceDispatch({
            type: displayResourceAction.setIsSubmitting,
            payload: false,
          });
          displayResourceDispatch({
            type: displayResourceAction.setSubmitMessage,
            payload: '',
          });
          displayResourceDispatch({
            type: displayResourceAction.setIsSuccessful,
            payload: true,
          });
          displayResourceDispatch({
            type: displayResourceAction.setSuccessMessage,
            payload: `Successfully updated request status of id: ${requestStatus.id} to ${requestStatus.status}`,
          });
          displayResourceDispatch({
            type: displayResourceAction.setRequestStatus,
            payload: {
              id: '',
              status: 'pending',
            },
          });
          displayResourceDispatch({
            type: displayResourceAction.setTriggerUpdateRequestStatus,
            payload: false,
          });
        }
      }
    }

    // only allow Admin and Manager to update request status
    if (roles.includes('Admin') || roles.includes('Manager')) {
      if (triggerUpdateRequestStatus) {
        updateRequestStatus();
      }
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // only trigger updateRequestStatus on triggerUpdateRequestStatus change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerUpdateRequestStatus, isAccessTokenExpired]);

  useEffect(() => {
    if (requestStatus.id.length > 0) {
      displayResourceDispatch({
        type: displayResourceAction.setTriggerUpdateRequestStatus,
        payload: true,
      });
    }
  }, [requestStatus]);

  // delete resource on deleteResource status change
  // ALSO MAKE A PUT REQUEST WITH MODIFIED FORM DATA
  useEffect(() => {
    if (isAccessTokenExpired) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const { formId, fileUploadId, kind, value } = deleteResource;

    async function deleteResourceRequest() {
      displayResourceDispatch({
        type: displayResourceAction.setIsSubmitting,
        payload: true,
      });
      displayResourceDispatch({
        type: displayResourceAction.setSubmitMessage,
        payload: `Deleting ${kind} of id: ${formId} ...`,
      });
      openSubmitSuccessNotificationModal();

      const path =
        kind === 'form'
          ? `${resourceUrlPaths.manager}/${formId}`
          : `file-upload/${fileUploadId}`;
      const urlString: URL = urlBuilder({ path });

      const request: Request = new Request(urlString, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      });

      try {
        const response = await fetch(request);
        const data: { message: string; resourceData?: [] } =
          await response.json();

        console.log('delete response', data);

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        displayResourceDispatch({
          type: displayResourceAction.updateResourceData,
          payload: {
            id: formId,
            kind: 'delete',
            data: Object.create(null),
          },
        });
      } catch (error: any) {
        if (!isMounted || error.name === 'AbortError') {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? 'Invalid token. Please login again.'
            : !error.response
            ? 'Network error. Please try again.'
            : error?.message ?? 'Unknown error occurred. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/home');

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: '',
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          displayResourceDispatch({
            type: displayResourceAction.setIsSubmitting,
            payload: false,
          });
          displayResourceDispatch({
            type: displayResourceAction.setSubmitMessage,
            payload: '',
          });
          displayResourceDispatch({
            type: displayResourceAction.setIsSuccessful,
            payload: true,
          });
          displayResourceDispatch({
            type: displayResourceAction.setSuccessMessage,
            payload: `Successfully deleted ${kind} of id: ${formId}`,
          });
        }
      }
    }

    // only allow Managers to delete forms
    if (roles.includes('Manager')) {
      if (formId.length > 0 && kind.length > 0 && value === true) {
        deleteResourceRequest();
      }
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [deleteResource, isAccessTokenExpired]);

  // when an uploaded file is deleted, patch request is made to update the asociated resource
  useEffect(() => {
    if (isAccessTokenExpired) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    async function updateAssociatedResource() {
      displayResourceDispatch({
        type: displayResourceAction.setIsSubmitting,
        payload: true,
      });
      displayResourceDispatch({
        type: displayResourceAction.setSubmitMessage,
        payload: `Deleting file upload of id: ${deleteResource.fileUploadId} ...`,
      });
      openSubmitSuccessNotificationModal();

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
                  Object.defineProperty(clone, key, {
                    ...PROPERTY_DESCRIPTOR,
                    value: filteredValue,
                  });
                  acc = clone;
                }
              }
              // if the value is a string, check if the value is the fileUploadId
              else {
                if (value === deleteResource.fileUploadId) {
                  const clone = structuredClone(obj);

                  Object.defineProperty(clone, key, {
                    ...PROPERTY_DESCRIPTOR,
                    value: '',
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
      const filteredAssociatedResource = filterFieldsFromObject<
        Record<string, any>
      >({
        object: associatedResource,
        // delete was added at front end
        // fileUploads does not belong in the resource schema, and is added to response by server
        fieldsToFilter: ['delete', 'fileUploads'],
      });

      const urlString: URL = urlBuilder({
        path: `${resourceUrlPaths.manager}/${_id}`,
      });

      const resourceBody = Object.create(null);
      // addFieldsToObject({
      //   object: resourceBody,
      //   fieldValuesTuples: [[requestBodyHeading, filteredAssociatedResource]],
      // });
      Object.defineProperty(resourceBody, requestBodyHeading, {
        ...PROPERTY_DESCRIPTOR,
        value: filteredAssociatedResource,
      });
      const body = JSON.stringify(resourceBody);

      const request: Request = new Request(urlString, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
        body,
      });

      try {
        const response = await fetch(request);
        const data: ResourceRequestServerResponse<Doc> = await response.json();

        console.log('update associated resource response', data);

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        const [updatedResource] = data.resourceData;
        displayResourceDispatch({
          type: displayResourceAction.updateResourceData,
          payload: {
            id: updatedResource._id,
            kind: 'update',
            data: updatedResource,
          },
        });
      } catch (error: any) {
        if (!isMounted || error.name === 'AbortError') {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? 'Invalid token. Please login again.'
            : !error.response
            ? 'Network error. Please try again.'
            : error?.message ?? 'Unknown error occurred. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/home');

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: '',
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          displayResourceDispatch({
            type: displayResourceAction.setIsSubmitting,
            payload: false,
          });
          displayResourceDispatch({
            type: displayResourceAction.setSubmitMessage,
            payload: '',
          });
          displayResourceDispatch({
            type: displayResourceAction.setIsSuccessful,
            payload: true,
          });
          displayResourceDispatch({
            type: displayResourceAction.setSuccessMessage,
            payload: `Successfully deleted file upload of id: ${deleteResource.fileUploadId} and updated form`,
          });
        }
      }
    }

    if (deleteResource.fileUploadId) {
      updateAssociatedResource();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [deleteResource.fileUploadId, isAccessTokenExpired]);

  const {
    appThemeColors: { backgroundColor, borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const limitPerPageSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: QUERY_LIMIT_PER_PAGE_SELECT_DATA,
    description: 'Select number of documents to display per page',
    disabled: resourceData.length === 0,
    label: '',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      displayResourceDispatch({
        type: displayResourceAction.setLimitPerPage,
        payload: event.currentTarget.value,
      });
      displayResourceDispatch({
        type: displayResourceAction.setResetPage,
        payload: true,
      });
    },
    value: limitPerPage,
  };

  const createdLimitPerPageSelectInput = returnAccessibleSelectInputElements([
    limitPerPageSelectInputCreatorInfo,
  ]);

  const sectionWidth =
    width < 480 // for iPhone 5/SE
      ? width * 0.95
      : width < 768 // for iPhones 6 - 15
      ? width - 40
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225) * 0.8
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 225) * 0.8
      : 900 - 40;

  const displayLimitPerPage = (
    <Group
      w={sectionWidth}
      style={{
        border: borderColor,
        borderRadius: 4,
      }}
      spacing={rowGap}
      p={padding}
    >
      <Title order={5}>Limit per page</Title>
      {createdLimitPerPageSelectInput}
    </Group>
  );

  const displayPagination = (
    <Group
      w={sectionWidth}
      spacing={rowGap}
      p={padding}
      position="center"
      align="center"
    >
      <PageBuilder
        total={pages}
        resetPage={resetPage}
        setPageQueryString={displayResourceAction.setPageQueryString}
        parentComponentDispatch={displayResourceDispatch}
      />
    </Group>
  );

  // prevent display of option to groupBy/projection exclusion of username field if the resource is anonymousRequest

  const filteredComponentQueryData =
    requestBodyHeading === 'anonymousRequest'
      ? componentQueryData?.filter((obj) => obj.value !== 'username')
      : componentQueryData;

  const displayQueryBuilder = (
    <QueryBuilder
      setQueryBuilderString={displayResourceAction.setQueryBuilderString}
      queryBuilderStringDispatch={displayResourceDispatch}
      queryValuesArrayDispatch={displayResourceDispatch}
      componentQueryData={filteredComponentQueryData}
      collectionName={splitCamelCase(requestBodyHeading)}
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[closeSubmitSuccessNotificationModal]}
      opened={openedSubmitSuccessNotificationModal}
      notificationProps={{
        loading: isSubmitting,
        text: isSubmitting ? submitMessage : successMessage,
      }}
      title={
        <Title order={4}>{isSuccessful ? 'Success!' : 'Submitting ...'}</Title>
      }
    />
  );

  const displayResource = isDisplayFilesOnly ? (
    <DisplayFileUploads
      createResourcePath={createResourcePath}
      fileUploadsData={fileUploads}
      componentQueryData={filteredComponentQueryData}
      parentComponentName={splitCamelCase(requestBodyHeading)}
      parentDeleteResourceDispatch={displayResourceDispatch}
      totalDocuments={totalDocuments}
    />
  ) : (
    <DisplayQuery
      componentQueryData={filteredComponentQueryData}
      createResourcePath={createResourcePath}
      fileUploadsData={fileUploads}
      isLoading={isLoading}
      loadingMessage={loadingMessage}
      parentComponentName={splitCamelCase(requestBodyHeading)}
      parentRequestStatusDispatch={displayResourceDispatch}
      parentDeleteResourceDispatch={displayResourceDispatch}
      queryResponseData={resourceData}
      queryValuesArray={queryValuesArray}
      totalDocuments={totalDocuments}
    />
  );

  const displayResourceComponent = (
    <Stack
      w="100%"
      bg={backgroundColor}
      style={{
        ...style,
        borderRadius: 4,
      }}
      align="center"
      p={padding}
    >
      {displaySubmitSuccessNotificationModal}

      {displayQueryBuilder}

      {displayLimitPerPage}

      {displayResource}

      {displayPagination}
    </Stack>
  );

  useEffect(() => {
    logState({
      state: displayResourceState,
      groupLabel: 'displayResourceState',
    });
  }, [displayResourceState]);

  return displayResourceComponent;
}

export { DisplayResource };
