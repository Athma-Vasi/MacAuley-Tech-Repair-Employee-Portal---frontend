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
      const url: URL = urlBuilder({ path: 'actions/company/benefit/dev' });

      // const body = JSON.stringify(bodiesArr[bodiesArrCount]);
      const { userInfo } = jwtDecode<{
        exp: number;
        iat: number;
        userInfo: { userId: string; username: string; roles: UserRoles };
      }>(accessToken);

      const reqBody = {
        userInfo,
        benefits: bodiesArr,
      };

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
          payload: bodiesArrCount + 1,
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
    const groupedByBenefitKind = groupByField({
      objectArray: benefitsArray,
      field: 'planKind',
    });

    console.log({ groupedByBenefitKind });

    const bodiesArr = returnBenefitsRequestBodies({
      groupedByBenefits: groupedByBenefitKind,
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
      <Button
        // disabled={bodiesArrCount === bodiesArr.length || triggerFormSubmit}
        onClick={() => {
          devTestingDispatch({
            type: devTestingAction.setTriggerFormSubmit,
            payload: true,
          });
        }}
      >
        Trigger
      </Button>
    </Center>
  );
}

export default DevTesting;
