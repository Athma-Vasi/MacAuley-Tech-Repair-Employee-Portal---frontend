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
import { PROVINCES, STATES_US, URGENCY_DATA } from '../../constants/data';
import { COUNTRIES_DATA } from '../addressChange/constants';
import { CURRENCY_DATA } from '../benefits/constants';
import { DevRepairNotes, devRepairNotesArray } from './repairNotes';

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
      const url: URL = urlBuilder({ path: 'repair-note' });

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

        console.log({ data });
      } catch (error: any) {
        console.error(error);
      } finally {
        devTestingDispatch({
          type: devTestingAction.setTriggerFormSubmit,
          payload: false,
        });
        devTestingDispatch({
          type: devTestingAction.setBodiesArrCount,
          payload: bodiesArrCount + 1,
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
    const bodiesArr = devRepairNotesArray.reduce(
      (repairNotesAcc, repairNote) => {
        const requiredRepairsArr = REQUIRED_REPAIRS_CHECKBOX_DATA.map(
          (checkbox) => checkbox.value
        );
        const randomRequiredRepairsArr = requiredRepairsArr.filter(
          () => Math.random() < 0.5
        );

        const partsNeededArr = PARTS_NEEDED_CHECKBOX_DATA.map(
          (checkbox) => checkbox.value
        );
        const randomPartsNeededArr = partsNeededArr.filter(
          () => Math.random() < 0.5
        );

        const repairStatusArr = REPAIR_STATUS_DATA;
        const randomRepairStatus =
          repairStatusArr[Math.floor(Math.random() * repairStatusArr.length)];

        const randomCanadianCityProvinceObj =
          CANADA_CITY_PROVINCES[
            Math.floor(Math.random() * CANADA_CITY_PROVINCES.length)
          ];
        const randomUsCityStateObj =
          US_CITY_STATES[Math.floor(Math.random() * US_CITY_STATES.length)];

        const currenciesArr = CURRENCY_DATA;
        const randomCurrency =
          currenciesArr[Math.floor(Math.random() * currenciesArr.length)];

        const repairPriority = URGENCY_DATA;
        const randomRepairPriority =
          repairPriority[Math.floor(Math.random() * repairPriority.length)];

        const randomUserDoc =
          USERS_DOC_CORRECT[
            Math.floor(Math.random() * USERS_DOC_CORRECT.length)
          ];
        const randomUserId = randomUserDoc._id;
        const randomUsername = randomUserDoc.username;
        const randomUserRole = randomUserDoc.roles;

        const newRepairNoteDoc = {
          customerCity: randomCanadianCityProvinceObj.city,
          customerProvince: randomCanadianCityProvinceObj.province,
          customerCountry: randomCanadianCityProvinceObj.country,
          customerPostalCode: randomCanadianCityProvinceObj.postalCode,

          requiredRepairs: randomRequiredRepairsArr,
          partsNeeded: randomPartsNeededArr,
          estimatedRepairCostCurrency: randomCurrency,
          repairPriority: randomRepairPriority,

          finalRepairCostCurrency: randomCurrency,
          repairStatus: randomRepairStatus,
          ...repairNote,
        };

        const newBody = {
          userInfo: {
            userId: randomUserId,
            username: randomUsername,
            roles: randomUserRole,
          },
          repairNote: newRepairNoteDoc,
        };

        repairNotesAcc.push(newBody);

        return repairNotesAcc;
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
