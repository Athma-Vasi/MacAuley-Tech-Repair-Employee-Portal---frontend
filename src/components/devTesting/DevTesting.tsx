import { Button, Center } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { useAuth } from '../../hooks';
import { groupByField, logState, urlBuilder } from '../../utils';
import { benefitsArray, returnBenefitsRequestBodies } from './benefits';
import { CANADA_CITY_PROVINCES, US_CITY_STATES, USERS_DOC } from './constants';
import {
  devTestingAction,
  devTestingReducer,
  initialDevTestingState,
} from './state';
import jwtDecode from 'jwt-decode';
import { UserRoles } from '../../types';
import {
  expenseClaimArray,
  returnExpenseClaimRequestBodies,
} from './expenseClaim';
import { leaveRequestsArray, returnLeaveRequestsBodies } from './leaveRequests';
import {
  requestResourcesArray,
  returnRequestResourcesBodies,
} from './requestResource';
import {
  endorsementsArray,
  returnEndorsementsRequestBodies,
} from './endorsement';
import {
  printerIssuesArray,
  returnPrinterIssuesRequestBodies,
} from './printerIssue';
import { anonymousRequestsArray } from './anonymousRequests';
import { refermentsArray, returnRefermentsRequestBodies } from './referment';
import { eventsArray, returnEventsRequestBodies } from './event';
import {
  announcementsArray,
  returnAnnouncementsRequestBodies,
} from './announcements';
import {
  commentsArray,
  returnCommentsRequestBodies,
  returnCommentsWithoutQuotedUsername,
} from './comments';

function DevTesting() {
  const [devTestingState, devTestingDispatch] = useReducer(
    devTestingReducer,
    initialDevTestingState
  );
  const { triggerFormSubmit, bodiesArr, bodiesArrCount } = devTestingState;

  const {
    authState: { accessToken },
  } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function submitDevTestingForm() {
      const url: URL = urlBuilder({
        path: 'comment/dev',
      });

      const newBodiesArrCount =
        bodiesArr.length - bodiesArrCount > 100
          ? bodiesArrCount + 100
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
        comments: slicedBodiesArr,
      };

      console.log({ slicedBodiesArr });

      const request: Request = new Request(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(reqBody),
        signal: controller.signal,
      });

      try {
        const response: Response = await fetch(request);
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
    const bodiesArr = returnCommentsRequestBodies({
      commentsArray: commentsArray,
      userDocs: USERS_DOC,
      returnCommentsWithoutQuotedUsername,
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
