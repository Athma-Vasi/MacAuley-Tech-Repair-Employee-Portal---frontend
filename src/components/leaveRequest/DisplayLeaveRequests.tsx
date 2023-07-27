import { DisplayResource } from '../displayResource';
import { LeaveRequestDocument } from './types';
import { LEAVE_REQUESTS_QUERY_DATA } from './constants';

function DisplayLeaveRequests() {
  return (
    <DisplayResource<LeaveRequestDocument>
      componentQueryData={LEAVE_REQUESTS_QUERY_DATA}
      requestBodyHeading="leaveRequest"
      paths={{
        manager: '/api/v1/actions/company/leave-request/',
        admin: '/api/v1/actions/company/leave-request/',
        employee: '/api/v1/actions/company/leave-request/user/',
      }}
    />
  );
}

export { DisplayLeaveRequests };

/**
 *  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      w="100%"
      h="100%"
      style={{
        backgroundColor: '#fff',
        borderRadius: 4,
      }}
      p={padding}
      rowGap={rowGap}
    >
      <QueryBuilder
        setQueryBuilderString={displayLeaveRequestsAction.setQueryBuilderString}
        parentComponentDispatch={displayLeaveRequestsDispatch}
        componentQueryData={LEAVE_REQUESTS_QUERY_DATA}
        collectionName="leave requests"
      />
      <DisplayQuery
        parentComponentName="Leave Requests"
        parentComponentDispatch={displayLeaveRequestsDispatch}
        componentQueryData={LEAVE_REQUESTS_QUERY_DATA}
        queryResponseData={leaveRequests}
      />
      <PageBuilder
        total={10}
        setPageQueryString={displayLeaveRequestsAction.setPageQueryString}
        parentComponentDispatch={displayLeaveRequestsDispatch}
      />
    </Flex>
  );
 */

/**
 * {leaveRequests.length > 0
        ? leaveRequests.map((leaveRequest, index) => (
            <Group
              key={`leave-request-${index}`}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: 4,
              }}
              p={padding}
            >
              <FormLayoutWrapper>
                <Text size="xs">{JSON.stringify(leaveRequest, null, 2)}</Text>
              </FormLayoutWrapper>
            </Group>
          ))
        : null}
 */

/**
         * const [displayLeaveRequestsState, displayLeaveRequestsDispatch] = useReducer(
    displayLeaveRequestsReducer,
    initialDisplayLeaveRequestsState
  );
  const {
    leaveRequests,
    pages,
    totalDocuments,
    newQueryFlag,
    queryBuilderString,
    pageQueryString,

    requestStatus,
    triggerRefresh,

    isError,
    errorMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = displayLeaveRequestsState;

  const {
    globalState: { padding, rowGap },
  } = useGlobalState();
  const {
    authState: { accessToken, roles },
  } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchLeaveRequests() {
      // employees can view their own leave requests only
      const path =
        roles.includes('Admin') || roles.includes('Manager')
          ? '/api/v1/actions/company/leave-request/'
          : '/api/v1/actions/company/leave-request/user/';

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
        const data: GetQueriedResourceRequestServerResponse<LeaveRequestDocument> =
          await response.json();
        console.log('response json data', data);
        displayLeaveRequestsDispatch({
          type: displayLeaveRequestsAction.setLeaveRequests,
          payload: data.resourceData,
        });
      } catch (error) {
        console.log(error);
      } finally {
        console.log('finally');
      }
    }

    fetchLeaveRequests();

    return () => {
      controller.abort();
    };
  }, [newQueryFlag, queryBuilderString, pageQueryString, triggerRefresh]);

  // backend is set to trigger countDocuments scan on a new query only, not on page changes
  useEffect(() => {
    displayLeaveRequestsDispatch({
      type: displayLeaveRequestsAction.setNewQueryFlag,
      payload: true,
    });
  }, [queryBuilderString]);
  // set new query flag to false on page changes
  useEffect(() => {
    displayLeaveRequestsDispatch({
      type: displayLeaveRequestsAction.setNewQueryFlag,
      payload: false,
    });
  }, [pageQueryString]);

  // submit request status form on change
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function updateRequestStatus() {
      const urlString: URL = urlBuilder({
        path: `/api/v1/actions/company/leave-request/${requestStatus.id}`,
      });

      const body = JSON.stringify({
        leaveRequest: {
          requestStatus: requestStatus.status,
        },
      });

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
        const data: ResourceRequestServerResponse<LeaveRequestDocument> =
          await response.json();
        console.log('request status update response', data);
        // trigger component refresh
        displayLeaveRequestsDispatch({
          type: displayLeaveRequestsAction.setTriggerRefresh,
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
        updateRequestStatus();
      }
    }

    return () => {
      controller.abort();
    };
  }, [requestStatus]);
         */
