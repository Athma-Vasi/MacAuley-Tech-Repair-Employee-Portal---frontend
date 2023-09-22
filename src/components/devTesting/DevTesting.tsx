import { useEffect, useReducer } from 'react';
import {
  devTestingAction,
  devTestingReducer,
  initialDevTestingState,
} from './state';
import { logState, urlBuilder } from '../../utils';
import { useAuth, useGlobalState } from '../../hooks';
import { Button, Group } from '@mantine/core';
import { USERS_DOCS } from './constants';

function DevTesting() {
  const [devTestingState, devTestingDispatch] = useReducer(
    devTestingReducer,
    initialDevTestingState
  );
  const { triggerFormSubmit, updatedUserDocuments } = devTestingState;

  const {
    authState: { accessToken },
  } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function submitDevTestingForm() {
      const url: URL = urlBuilder({ path: 'user' });

      await Promise.all(
        USERS_DOCS.map(async (userDocument) => {
          // remove _id from userDocument
          const userDocWithoutId = Object.entries(userDocument).reduce(
            (userDocAcc, userDoc) => {
              const [key, value] = userDoc;
              if (key !== '_id') {
                userDocAcc[key] = value;
              }

              return userDocAcc;
            },
            Object.create(null)
          );

          const body = JSON.stringify({
            userFields: { ...userDocWithoutId },
          });

          const request: Request = new Request(url.toString(), {
            method: 'PATCH',
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
          }
        })
      );
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
    logState({
      state: devTestingState,
      groupLabel: 'Dev Testing',
    });
  }, [devTestingState]);

  return (
    <Group>
      <Button
        onClick={() => {
          devTestingDispatch({
            type: devTestingAction.setTriggerFormSubmit,
            payload: true,
          });
        }}
      >
        Trigger
      </Button>
    </Group>
  );
}

export default DevTesting;
