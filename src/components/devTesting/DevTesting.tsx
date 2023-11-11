import { Button, Center, Text } from '@mantine/core';
import jwtDecode from 'jwt-decode';
import { useEffect, useReducer } from 'react';

import { useAuth, useWrapFetch } from '../../hooks';
import { UserRoles } from '../../types';
import { groupByField, logState, urlBuilder } from '../../utils';
import {
  announcementsArray,
  returnAnnouncementsRequestBodies,
} from './announcements';
import { anonymousRequestsArray } from './anonymousRequests';
import { benefitsArray, returnBenefitsRequestBodies } from './benefits';
import {
  commentsArray,
  returnCommentsRequestBodies,
  returnCommentsWithoutQuotedUsername,
} from './comments';
import { CANADA_CITY_PROVINCES, US_CITY_STATES, USERS_DOC } from './constants';
import {
  endorsementsArray,
  returnEndorsementsRequestBodies,
} from './endorsement';
import { eventsArray, returnEventsRequestBodies } from './event';
import {
  expenseClaimArray,
  returnExpenseClaimRequestBodies,
} from './expenseClaim';
import { leaveRequestsArray, returnLeaveRequestsBodies } from './leaveRequests';
import {
  printerIssuesArray,
  returnPrinterIssuesRequestBodies,
} from './printerIssue';
import {
  refermentsArray,
  RefermentsGroupedByDepartments,
  returnRefermentsRequestBodies,
} from './referment';
import {
  requestResourcesArray,
  returnRequestResourcesBodies,
} from './requestResource';
import {
  devTestingAction,
  devTestingReducer,
  initialDevTestingState,
} from './state';
import { returnUsersRequestBodies } from './users';

function DevTesting() {
  const [devTestingState, devTestingDispatch] = useReducer(
    devTestingReducer,
    initialDevTestingState
  );
  const { triggerFormSubmit, bodiesArr, bodiesArrCount } = devTestingState;

  const {
    authState: { accessToken },
  } = useAuth();

  const { wrappedFetch } = useWrapFetch();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function submitDevTestingForm() {
      const url: URL = urlBuilder({
        path: 'actions/outreach/event/dev',
      });
      // const url: URL = new URL(
      //   'http://localhost:5500/api/v1/user/dev/add-field'
      // );

      const newBodiesArrCount =
        bodiesArr.length - bodiesArrCount > 50
          ? bodiesArrCount + 50
          : bodiesArr.length;
      const slicedBodiesArr = bodiesArr.slice(
        bodiesArrCount,
        newBodiesArrCount
      );
      const { userInfo } = jwtDecode<{
        exp: number;
        iat: number;
        userInfo: { userId: string; username: string; roles: UserRoles };
      }>(accessToken);

      const reqBody = {
        userInfo,
        events: slicedBodiesArr,
      };

      console.log({ slicedBodiesArr });

      const requestInit: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      };

      try {
        const response: Response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: controller.signal,
          url,
        });
        const data = await response.json();

        if (!isMounted) {
          return;
        }

        if (!response.ok) {
          throw new Error(data.message);
        }

        devTestingDispatch({
          type: devTestingAction.setBodiesArrCount,
          payload: newBodiesArrCount,
        });

        console.log({ data });
      } catch (error: any) {
        console.error(error);
      } finally {
        devTestingDispatch({
          type: devTestingAction.setTriggerFormSubmit,
          payload: false,
        });
      }
    }

    if (triggerFormSubmit) {
      submitDevTestingForm();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [triggerFormSubmit]);

  useEffect(() => {
    const bodiesArr = returnEventsRequestBodies({
      eventsArray,
      userDocs: USERS_DOC,
    });

    devTestingDispatch({
      type: devTestingAction.setBodiesArr,
      payload: bodiesArr,
    });
  }, []);

  useEffect(() => {
    logState({
      state: devTestingState,
      groupLabel: 'Dev Testing',
    });
  }, [devTestingState]);

  return (
    <Center w="100%">
      <Text>DEV TESTING</Text>
      {/* <Button
        disabled={bodiesArrCount === bodiesArr.length || triggerFormSubmit}
        onClick={() => {
          devTestingDispatch({
            type: devTestingAction.setTriggerFormSubmit,
            payload: true,
          });
        }}
      >
        Trigger
      </Button> */}
    </Center>
  );
}

export default DevTesting;
