import { Button, Center } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { useAuth } from '../../hooks';
import { logState, urlBuilder } from '../../utils';
import {
  CANADA_CITY_PROVINCES,
  USERS_DOC,
  USERS_DOC_CORRECT,
  US_CITY_STATES,
} from './constants';
import {
  devTestingAction,
  devTestingReducer,
  initialDevTestingState,
} from './state';
import {
  PARTS_NEEDED_CHECKBOX_DATA,
  REPAIR_STATUS_DATA,
  REQUIRED_REPAIRS_CHECKBOX_DATA,
} from '../repairNote/constants';
import {
  PROVINCES,
  REQUEST_STATUS,
  STATES_US,
  URGENCY_DATA,
} from '../../constants/data';
import { COUNTRIES_DATA } from '../addressChange/constants';
import { CURRENCY_DATA } from '../benefits/constants';
import { DevRepairNotes, devRepairNotesArray } from './repairNotes';
import {
  CANADA_CITY_PROVINCES_POSTALCODE,
  US_CITY_STATES_POSTALCODE,
  addressChangesArray,
} from './addressChange';

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
      const url: URL = urlBuilder({ path: 'actions/company/address-change' });

      const body = JSON.stringify(bodiesArr[bodiesArrCount]);

      const request: Request = new Request(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body,
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
    const bodiesArr = addressChangesArray.reduce(
      (addressChangesAcc, addressChange) => {
        const randomCanadianCityProvinceObj =
          CANADA_CITY_PROVINCES_POSTALCODE[
            Math.floor(Math.random() * CANADA_CITY_PROVINCES_POSTALCODE.length)
          ];
        const randomUsCityStateObj =
          US_CITY_STATES_POSTALCODE[
            Math.floor(Math.random() * US_CITY_STATES_POSTALCODE.length)
          ];

        const modifiedRequestStatusArr = ['approved', 'pending'];
        const randomRequestStatus =
          modifiedRequestStatusArr[
            Math.floor(Math.random() * modifiedRequestStatusArr.length)
          ];

        const randomUserDoc =
          USERS_DOC_CORRECT[
            Math.floor(Math.random() * USERS_DOC_CORRECT.length)
          ];
        const randomUserId = randomUserDoc._id;
        const randomUsername = randomUserDoc.username;
        const randomUserRole = randomUserDoc.roles;

        const addressChangeBody =
          randomUserDoc.address.country === 'Canada'
            ? {
                contactNumber: addressChange.contactNumber,
                addressLine: addressChange.addressLine,
                city: randomCanadianCityProvinceObj.city,
                province: randomCanadianCityProvinceObj.province,
                postalCode: randomCanadianCityProvinceObj.postalCode,
                country: randomCanadianCityProvinceObj.country,
                acknowledgement: addressChange.acknowledgement,
                requestStatus: randomRequestStatus,
              }
            : {
                contactNumber: addressChange.contactNumber,
                addressLine: addressChange.addressLine,
                city: randomUsCityStateObj.city,
                state: randomUsCityStateObj.state,
                postalCode: randomUsCityStateObj.postalCode,
                country: randomUsCityStateObj.country,
                acknowledgement: addressChange.acknowledgement,
                requestStatus: randomRequestStatus,
              };

        const newBody = {
          userInfo: {
            userId: randomUserId,
            username: randomUsername,
            roles: randomUserRole,
          },
          addressChange: addressChangeBody,
        };

        addressChangesAcc.push(newBody);

        return addressChangesAcc;
      },
      [] as any[]
    );

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
        disabled={bodiesArrCount === bodiesArr.length}
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
