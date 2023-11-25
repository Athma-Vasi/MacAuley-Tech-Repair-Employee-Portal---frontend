import { Button, Center, Group, Stack, Text } from '@mantine/core';
import jwtDecode from 'jwt-decode';
import { useEffect, useReducer } from 'react';

import { useAuth, useWrapFetch } from '../../hooks';
import { UserRoles } from '../../types';
import {
  flattenObjectIterative,
  groupByField,
  logState,
  urlBuilder,
} from '../../utils';

import {
  ACCESSORY_ARRAYS,
  returnAccessorySchemas,
} from './productCategory/accessory';

import {
  devTestingAction,
  devTestingReducer,
  initialDevTestingState,
} from './state';
import { USERS_DOCS } from './constants';
import { CPUS_ARRAY, returnCpuSchemas } from './productCategory/cpu';
import { CASE_ARRAY, returnCaseSchemas } from './productCategory/case';
import {
  DISPLAYS_ARRAY,
  returnDisplaySchemas,
} from './productCategory/display';
import { GPUS_ARRAY, returnGpuSchemas } from './productCategory/gpu';
import {
  HEADPHONES_ARRAY,
  returnHeadphoneSchemas,
} from './productCategory/headphone';
import {
  KEYBOARDS_ARRAY,
  returnKeyboardSchemas,
} from './productCategory/keyboard';
import { RAMS_ARRAY, returnRamSchemas } from './productCategory/ram';
import {
  MICROPHONES_ARRAY,
  returnMicrophoneSchemas,
} from './productCategory/microphone';
import {
  MOTHERBOARDS_ARRAY,
  returnMotherboardSchemas,
} from './productCategory/motherboard';
import { MOUSE_ARRAY, returnMouseSchemas } from './productCategory/mouse';
import { PSUS_ARRAY, returnPsuSchemas } from './productCategory/psu';
import {
  SMARTPHONES_ARRAY,
  returnSmartphoneSchemas,
} from './productCategory/smartphone';
import { TABLETS_ARRAY, returnTabletSchemas } from './productCategory/tablet';
import {
  SPEAKERS_ARRAY,
  returnSpeakerSchemas,
} from './productCategory/speaker';
import { STORAGE_ARRAY, returnStorageSchemas } from './productCategory/storage';
import { WEBCAMS_ARRAY, returnWebcamSchemas } from './productCategory/webcam';

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
        path: 'actions/dashboard/product-category/webcam/dev',
      });

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
        webcamSchemas: slicedBodiesArr,
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
    const bodiesArr = returnWebcamSchemas({
      usersDocs: USERS_DOCS,
      webcamsArray: WEBCAMS_ARRAY,
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
      <Stack>
        <Text>DEV TESTING</Text>

        {/* <Group>
          <Button
            disabled={bodiesArrCount === bodiesArr.length || triggerFormSubmit}
            onClick={() => {
              devTestingDispatch({
                type: devTestingAction.setTriggerFormSubmit,
                payload: true,
              });
            }}
          >
            Trigger
          </Button>
        </Group> */}
      </Stack>
    </Center>
  );
}

export default DevTesting;
